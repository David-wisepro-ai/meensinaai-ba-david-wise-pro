import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';
import { sendCapiEvent } from '../../../lib/meta-capi';
import Stripe from 'stripe';

// Valores em USD por produto (batem com as landings) — usados no evento Lead do CAPI.
const PRODUCT_VALUE: Record<string, number> = {
  project_manager: 250,
  construtor: 597,
  wise_day: 497,
};

// Captura nome/email/telefone ANTES do Stripe -> grava lead -> cria sessao Stripe.
// Se Stripe nao configurado ainda, grava o lead e devolve sem checkoutUrl (David conecta na call).
const PRICE_IDS: Record<string, string | undefined> = {
  project_manager: process.env.STRIPE_PRICE_PROJECT_MANAGER,
  construtor: process.env.STRIPE_PRICE_CONSTRUTOR,
  wise_day: process.env.STRIPE_PRICE_WISE_DAY,
};

export async function POST(req: NextRequest) {
  const { name, email, phone, product, event_id } = await req.json();
  if (!name || !email || !product) {
    return NextResponse.json({ error: 'dados incompletos' }, { status: 400 });
  }

  // 1. grava lead ANTES do Stripe (habilita recuperacao de carrinho)
  const sb = supabaseAdmin();
  await sb.from('leads').upsert(
    { name, email, phone, product, status: 'checkout_iniciado', updated_at: new Date().toISOString() },
    { onConflict: 'email' },
  );
  await sb.from('checkout_events').insert({ lead_email: email, product, event: 'checkout_iniciado' });

  // 1b. CAPI server-side: evento Lead com o mesmo event_id do Pixel client-side (dedup).
  // No-op silencioso se META_PIXEL_ID / META_CAPI_TOKEN nao estiverem configurados.
  if (event_id) {
    await sendCapiEvent({
      eventName: 'Lead',
      eventId: event_id,
      user: { email, phone },
      eventSourceUrl: req.headers.get('referer'),
      customData: { value: PRODUCT_VALUE[product] ?? 0, currency: 'USD', content_ids: [product] },
    });
  }

  // 2. cria sessao Stripe (se configurado)
  const secret = process.env.STRIPE_SECRET_KEY;
  const priceId = PRICE_IDS[product];
  if (!secret || !priceId) {
    return NextResponse.json({ checkoutUrl: null, note: 'Stripe ainda nao conectado (STEP do dashboard).' });
  }
  const stripe = new Stripe(secret);
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${req.nextUrl.origin}/portal?paid=1`,
    cancel_url: `${req.nextUrl.origin}/${product.replace('_', '-')}`,
    metadata: { product, email },
  });
  return NextResponse.json({ checkoutUrl: session.url });
}
