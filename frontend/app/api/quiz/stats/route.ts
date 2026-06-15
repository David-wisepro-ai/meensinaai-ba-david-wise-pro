import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabase';
import { checkPortalAccess, accessDeniedStatus } from '../../../../lib/portal-access';

// Painel de desempenho: % de acerto por categoria + total de tentativas do aluno.
// Tudo server-side, restrito ao proprio aluno (usa o email do token, nunca query param).
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const CATEGORIES = ['IRC', 'IBC', 'IECC', 'OSHA', 'AAB'] as const;

export async function GET(req: NextRequest) {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: 'Supabase ainda nao conectado (STEP 1 do dashboard).' },
      { status: 503 },
    );
  }

  const access = await checkPortalAccess(req);
  if (!access.ok) {
    return NextResponse.json(
      { error: 'Acesso restrito ao Curso de Construtor.', reason: access.reason },
      { status: accessDeniedStatus(access.reason) },
    );
  }

  const sb = supabaseAdmin();

  // Junta tentativas do aluno com a categoria da questao (so verified=true).
  const { data, error } = await sb
    .from('quiz_attempts')
    .select('correct, quiz_questions!inner(category, verified)')
    .eq('student_email', access.email)
    .eq('quiz_questions.verified', true);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Inicializa o agregado por categoria.
  const agg: Record<string, { total: number; acertos: number }> = {};
  for (const c of CATEGORIES) agg[c] = { total: 0, acertos: 0 };

  let totalGeral = 0;
  let acertosGeral = 0;
  for (const row of data ?? []) {
    // O join pode vir como objeto ou array dependendo do shape do PostgREST.
    const qRaw = (row as any).quiz_questions;
    const cat = Array.isArray(qRaw) ? qRaw[0]?.category : qRaw?.category;
    if (!cat || !agg[cat]) continue;
    agg[cat].total += 1;
    totalGeral += 1;
    if ((row as any).correct) {
      agg[cat].acertos += 1;
      acertosGeral += 1;
    }
  }

  const porCategoria = CATEGORIES.map((c) => {
    const { total, acertos } = agg[c];
    return {
      category: c,
      total,
      acertos,
      percentual: total > 0 ? Math.round((acertos / total) * 100) : null,
    };
  });

  // Recomendacao: categoria com pior aproveitamento (e ao menos 1 tentativa).
  const comDados = porCategoria.filter((p) => p.percentual != null);
  const recomendacao =
    comDados.length > 0
      ? comDados.reduce((pior, atual) => (atual.percentual! < pior.percentual! ? atual : pior)).category
      : null;

  return NextResponse.json(
    {
      totalTentativas: totalGeral,
      percentualGeral: totalGeral > 0 ? Math.round((acertosGeral / totalGeral) * 100) : null,
      porCategoria,
      recomendacao,
    },
    { headers: { 'Cache-Control': 'no-store, max-age=0' } },
  );
}
