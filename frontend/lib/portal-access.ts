import { createClient } from '@supabase/supabase-js';
import { supabaseAdmin } from './supabase';

// Acesso restrito do portal (server-side).
// Regra de negocio: SO entra quem tem enrollment de 'construtor' ativo.
// Project Manager e Wise Day NAO dao acesso ao portal de simulados.

export type AccessResult =
  | { ok: true; email: string }
  | { ok: false; reason: 'sem_supabase' | 'sem_token' | 'token_invalido' | 'sem_enrollment' };

function supabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

// Le o Bearer token (JWT do Supabase Auth) do header Authorization.
function bearer(req: Request): string | null {
  const h = req.headers.get('authorization') || req.headers.get('Authorization');
  if (!h) return null;
  const m = h.match(/^Bearer\s+(.+)$/i);
  return m ? m[1].trim() : null;
}

// Valida o token do aluno contra o Supabase Auth e devolve o email confirmado.
// Usa a anon key + o JWT do usuario (getUser valida assinatura no servidor do Supabase).
async function emailFromToken(token: string): Promise<string | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  try {
    const sb = createClient(url, anon, { auth: { persistSession: false } });
    const { data, error } = await sb.auth.getUser(token);
    if (error || !data?.user?.email) return null;
    return data.user.email.toLowerCase();
  } catch {
    return null;
  }
}

// Checagem central de acesso: token valido + enrollment 'construtor' ativo.
// Degrada com elegancia: se Supabase nao esta conectado, devolve reason 'sem_supabase'
// (vira pendencia do David, nao quebra o build nem estoura excecao).
export async function checkPortalAccess(req: Request): Promise<AccessResult> {
  if (!supabaseConfigured()) return { ok: false, reason: 'sem_supabase' };

  const token = bearer(req);
  if (!token) return { ok: false, reason: 'sem_token' };

  const email = await emailFromToken(token);
  if (!email) return { ok: false, reason: 'token_invalido' };

  const sb = supabaseAdmin();
  const { data, error } = await sb
    .from('enrollments')
    .select('id')
    .eq('email', email)
    .eq('product', 'construtor')
    .eq('active', true)
    .limit(1);

  if (error || !data || data.length === 0) return { ok: false, reason: 'sem_enrollment' };
  return { ok: true, email };
}

// Resposta HTTP padrao quando o acesso e negado (sem vazar detalhe pro client).
export function accessDeniedStatus(reason: Exclude<AccessResult, { ok: true }>['reason']): number {
  if (reason === 'sem_supabase') return 503;
  return 403;
}
