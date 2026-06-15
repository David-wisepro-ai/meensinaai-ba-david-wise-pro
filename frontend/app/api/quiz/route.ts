import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';

// Leitura do banco de questoes EM TEMPO DE EXECUCAO (runtime), nunca em build.
// Por isso: questao nova carregada via /carregar-questoes aparece NA HORA, SEM redeploy.
// Regra de ouro: SO retorna verified=true (o que pode chegar no aluno). Service role fica
// no servidor (esta rota e server-side); nunca expor ao client.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const CATEGORIES = new Set(['IRC', 'IBC', 'IECC', 'OSHA', 'AAB']);

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get('category');
  const limitRaw = Number(req.nextUrl.searchParams.get('limit') || 0);
  const limit = Number.isFinite(limitRaw) && limitRaw > 0 ? Math.min(limitRaw, 200) : null;

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Supabase ainda nao conectado (STEP 1 do dashboard).' }, { status: 503 });
  }

  const sb = supabaseAdmin();
  let q = sb
    .from('quiz_questions')
    .select('id, category, subtopic, question, options, correct, explanation, code_reference, source_url, difficulty')
    .eq('verified', true); // NUNCA verified=false pro aluno

  if (category && CATEGORIES.has(category)) q = q.eq('category', category);
  if (limit) q = q.limit(limit);

  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // no-store: cada request le o banco fresco -> reflete o que /carregar-questoes acabou de subir.
  return NextResponse.json(
    { count: data?.length ?? 0, questions: data ?? [] },
    { headers: { 'Cache-Control': 'no-store, max-age=0' } },
  );
}
