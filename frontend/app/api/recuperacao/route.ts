import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';
import { fillEmail, fillWhatsapp, isProductKey, firstName, type ProductKey } from './copy';

// RECUPERACAO DE CARRINHO - disparo idempotente, dirigido por cron.
//
// Como funciona (ver meu-negocio/recuperacao-carrinho/):
//   STAGE 1 (e-mail): leads com status='abandonado' -> envia e-mail (Resend) -> status='recuperacao_email_enviada'
//   STAGE 2 (whatsapp): leads com status='recuperacao_email_enviada' ha >= 3h -> envia WhatsApp (Stevo/Z-API)
//                       -> status='recuperacao_enviada' (a partir daqui e handoff humano: atendente entra manual)
//
// Idempotencia: cada estagio so age sobre um status especifico e move o lead pro proximo status no fim.
// Se o lead pagar no meio, o webhook ja moveu pra 'pago' e ele sai da fila automaticamente.
// Seguranca: protegido por CRON_SECRET. Roda server-side (service role). Nenhuma credencial hardcoded.

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const WHATSAPP_DELAY_MS = 3 * 60 * 60 * 1000; // ~3h
const BATCH = 50;

type Lead = {
  email: string;
  name: string | null;
  phone: string | null;
  product: string | null;
  status: string;
  updated_at: string | null;
};

function checkoutLink(origin: string, product: ProductKey): string {
  // retoma na landing do produto (mesma convencao do cancel_url do checkout)
  return `${origin}/${product.replace('_', '-')}`;
}

// ---- Resend (e-mail T+0) ----
async function sendEmail(to: string, subject: string, html: string, text: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM; // ex: "Wise Pro Academy <inscricao@wiseproacademy.io>"
  if (!apiKey || !from) return false;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], subject, html, text }),
  });
  return res.ok;
}

// ---- WhatsApp T+~3h: Stevo OU Z-API (provider escolhido por env WHATSAPP_PROVIDER) ----
async function sendWhatsapp(phone: string, message: string): Promise<boolean> {
  const provider = (process.env.WHATSAPP_PROVIDER || '').toLowerCase();
  const digits = phone.replace(/\D/g, '');
  if (!digits) return false;

  if (provider === 'stevo') {
    const base = process.env.STEVO_API_URL; // ex: https://api.stevo.chat/...
    const token = process.env.STEVO_TOKEN;
    const instance = process.env.STEVO_INSTANCE;
    if (!base || !token || !instance) return false;
    const res = await fetch(`${base}/message/sendText/${instance}`, {
      method: 'POST',
      headers: { apikey: token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ number: digits, text: message }),
    });
    return res.ok;
  }

  if (provider === 'zapi') {
    const instance = process.env.ZAPI_INSTANCE;
    const token = process.env.ZAPI_TOKEN;
    const clientToken = process.env.ZAPI_CLIENT_TOKEN; // header Client-Token (conta Z-API)
    if (!instance || !token) return false;
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (clientToken) headers['Client-Token'] = clientToken;
    const res = await fetch(`https://api.z-api.io/instances/${instance}/token/${token}/send-text`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ phone: digits, message }),
    });
    return res.ok;
  }

  return false; // provider nao configurado
}

async function runRecovery(req: NextRequest) {
  // guarda de credenciais base
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ note: 'Supabase ainda nao conectado (STEP do dashboard).' }, { status: 200 });
  }

  const sb = supabaseAdmin();
  const origin = process.env.PUBLIC_SITE_URL || req.nextUrl.origin;
  const nowIso = new Date().toISOString();

  const result = {
    emails_enviados: 0,
    emails_pulados: 0,
    whatsapp_enviados: 0,
    whatsapp_pulados: 0,
    erros: [] as string[],
  };

  // ===== STAGE 1: e-mail (T+0) para status='abandonado' =====
  const { data: paraEmail, error: e1 } = await sb
    .from('leads')
    .select('email,name,phone,product,status,updated_at')
    .eq('status', 'abandonado')
    .limit(BATCH);
  if (e1) result.erros.push(`stage1 select: ${e1.message}`);

  for (const lead of (paraEmail || []) as Lead[]) {
    if (!isProductKey(lead.product) || !lead.email) {
      result.emails_pulados++;
      continue;
    }
    const nome = firstName(lead.name);
    const link = checkoutLink(origin, lead.product);
    const { subject, html, text } = fillEmail(lead.product, nome, link);
    const ok = await sendEmail(lead.email, subject, html, text);
    if (!ok) {
      result.emails_pulados++;
      result.erros.push(`email nao enviado (Resend nao configurado ou falhou): ${lead.email}`);
      continue;
    }
    await sb
      .from('leads')
      .update({ status: 'recuperacao_email_enviada', updated_at: nowIso })
      .eq('email', lead.email);
    await sb.from('checkout_events').insert({
      lead_email: lead.email,
      product: lead.product,
      event: 'recuperacao_email_enviada',
    });
    result.emails_enviados++;
  }

  // ===== STAGE 2: WhatsApp (T+~3h) para status='recuperacao_email_enviada' com >= 3h =====
  const cutoff = new Date(Date.now() - WHATSAPP_DELAY_MS).toISOString();
  const { data: paraWa, error: e2 } = await sb
    .from('leads')
    .select('email,name,phone,product,status,updated_at')
    .eq('status', 'recuperacao_email_enviada')
    .lte('updated_at', cutoff)
    .limit(BATCH);
  if (e2) result.erros.push(`stage2 select: ${e2.message}`);

  for (const lead of (paraWa || []) as Lead[]) {
    if (!isProductKey(lead.product) || !lead.phone) {
      // sem telefone: nao da pra mandar WhatsApp -> ja vai pro handoff humano
      await sb
        .from('leads')
        .update({ status: 'recuperacao_enviada', updated_at: nowIso })
        .eq('email', lead.email);
      result.whatsapp_pulados++;
      continue;
    }
    const nome = firstName(lead.name);
    const link = checkoutLink(origin, lead.product);
    const msg = fillWhatsapp(lead.product, nome, link);
    const ok = await sendWhatsapp(lead.phone, msg);
    if (!ok) {
      result.whatsapp_pulados++;
      result.erros.push(`whatsapp nao enviado (provider nao configurado ou falhou): ${lead.email}`);
      continue; // mantem status pra tentar no proximo tick quando o provider estiver configurado
    }
    // marca pro handoff humano: a atendente entra manual na conversa do WhatsApp
    await sb
      .from('leads')
      .update({ status: 'recuperacao_enviada', updated_at: nowIso })
      .eq('email', lead.email);
    await sb.from('checkout_events').insert({
      lead_email: lead.email,
      product: lead.product,
      event: 'recuperacao_enviada',
    });
    result.whatsapp_enviados++;
  }

  return NextResponse.json({ ok: true, ...result });
}

// GET acionado por cron (Vercel Cron) - protegido por CRON_SECRET.
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get('authorization');
    const qs = req.nextUrl.searchParams.get('key');
    const ok = auth === `Bearer ${secret}` || qs === secret;
    if (!ok) return NextResponse.json({ error: 'nao autorizado' }, { status: 401 });
  }
  return runRecovery(req);
}

// POST: mesma logica (util pra disparo manual/teste autenticado).
export async function POST(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get('authorization');
    if (auth !== `Bearer ${secret}`) return NextResponse.json({ error: 'nao autorizado' }, { status: 401 });
  }
  return runRecovery(req);
}
