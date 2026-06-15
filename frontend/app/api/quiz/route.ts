import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';
import { checkPortalAccess, accessDeniedStatus } from '../../../lib/portal-access';

// Leitura do banco de questoes EM TEMPO DE EXECUCAO (runtime), nunca em build.
// Por isso: questao nova carregada via /carregar-questoes aparece NA HORA, SEM redeploy.
//
// Regra de ouro: SO retorna verified=true (o que pode chegar no aluno).
// Anti-cola: as questoes servidas ao aluno NUNCA trazem correct/explanation/code_reference.
// O gabarito + feedback so vem do endpoint de correcao (POST /api/quiz/attempt), server-side.
// Service role fica no servidor (esta rota e server-side); nunca expor ao client.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const CATEGORIES = new Set(['IRC', 'IBC', 'IECC', 'OSHA', 'AAB']);
const DIFFICULTIES = new Set(['iniciante', 'intermediario', 'avancado']);

// Embaralha in-place (Fisher-Yates) — prova/quiz sempre em ordem diferente.
function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const mode = params.get('mode') || 'category'; // 'category' | 'exam' | 'count'
  const category = params.get('category');
  const difficulty = params.get('difficulty');
  const limitRaw = Number(params.get('limit') || 0);
  const limit = Number.isFinite(limitRaw) && limitRaw > 0 ? Math.min(limitRaw, 200) : null;

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: 'Supabase ainda nao conectado (STEP 1 do dashboard).' },
      { status: 503 },
    );
  }

  // Modo 'count' e leve e alimenta o dashboard de categorias (so o numero, sem questao).
  // Mesmo o count exige acesso de construtor — nada do portal vaza pra fora.
  const access = await checkPortalAccess(req);
  if (!access.ok) {
    return NextResponse.json(
      { error: 'Acesso restrito ao Curso de Construtor.', reason: access.reason },
      { status: accessDeniedStatus(access.reason) },
    );
  }

  const sb = supabaseAdmin();

  // Modo count: quantas questoes verificadas existem por categoria (pro painel).
  if (mode === 'count') {
    const out: Record<string, number> = {};
    for (const cat of CATEGORIES) {
      const { count } = await sb
        .from('quiz_questions')
        .select('id', { count: 'exact', head: true })
        .eq('verified', true)
        .eq('category', cat);
      out[cat] = count ?? 0;
    }
    return NextResponse.json({ counts: out }, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
  }

  // Campos servidos ao aluno — SEM correct/explanation/code_reference (anti-cola).
  let q = sb
    .from('quiz_questions')
    .select('id, category, subtopic, question, options, difficulty')
    .eq('verified', true); // NUNCA verified=false pro aluno

  if (mode === 'exam') {
    // Prova completa: 70-75 questoes misturadas de todas as categorias.
    // Puxa um teto generoso, embaralha em runtime e corta no tamanho da prova.
    const examSize = limit && limit <= 75 ? limit : 75;
    if (difficulty && DIFFICULTIES.has(difficulty)) q = q.eq('difficulty', difficulty);
    const { data, error } = await q.limit(400);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    const questions = shuffle(data ?? []).slice(0, examSize);
    return NextResponse.json(
      { count: questions.length, requested: examSize, questions },
      { headers: { 'Cache-Control': 'no-store, max-age=0' } },
    );
  }

  // Modo category (default): quiz de uma categoria.
  if (category && CATEGORIES.has(category)) q = q.eq('category', category);
  if (difficulty && DIFFICULTIES.has(difficulty)) q = q.eq('difficulty', difficulty);
  const { data, error } = await q.limit(limit ? Math.max(limit, 50) : 50);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const questions = shuffle(data ?? []);
  const sliced = limit ? questions.slice(0, limit) : questions;

  return NextResponse.json(
    { count: sliced.length, questions: sliced },
    { headers: { 'Cache-Control': 'no-store, max-age=0' } },
  );
}
