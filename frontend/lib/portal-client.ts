'use client';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Cliente Supabase do navegador (anon key) — SO pro login do aluno.
// Toda regra de negocio (enrollment, gabarito) fica no servidor; aqui so autentica.
let _client: SupabaseClient | null = null;

export function portalSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null; // degrada com elegancia: sem env, login indisponivel
  if (_client) return _client;
  _client = createClient(url, anon, { auth: { persistSession: true, autoRefreshToken: true } });
  return _client;
}

export function portalConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

// getSession com timeout. O Supabase usa um "lock" (navigator.locks) pra coordenar o refresh de
// token entre abas; em certas situacoes esse lock prende e o getSession() NUNCA resolve, travando
// a tela em "Carregando". O Promise.race garante que sempre resolve (no pior caso, sem sessao).
export async function getSessionSafe(sb: SupabaseClient, timeoutMs = 6000): Promise<any> {
  try {
    const res: any = await Promise.race([
      sb.auth.getSession(),
      new Promise((resolve) => setTimeout(() => resolve({ data: { session: null } }), timeoutMs)),
    ]);
    return res?.data?.session ?? null;
  } catch {
    return null;
  }
}

// Fetch autenticado: anexa o Bearer token do aluno em todas as chamadas da API do portal.
export async function authedFetch(input: string, init: RequestInit = {}): Promise<Response> {
  const sb = portalSupabase();
  const headers = new Headers(init.headers || {});
  if (sb) {
    const session = await getSessionSafe(sb);
    const token = session?.access_token;
    if (token) headers.set('Authorization', `Bearer ${token}`);
  }
  return fetch(input, { ...init, headers, cache: 'no-store' });
}
