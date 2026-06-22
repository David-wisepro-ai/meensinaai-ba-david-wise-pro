import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabase';
import { checkPortalAccess, accessDeniedStatus } from '../../../../lib/portal-access';

// Correcao EM LOTE da prova completa (mode 'exam'), SEMPRE server-side.
// O aluno navega/pula livremente e so finaliza no fim: aqui o servidor compara
// TODAS as respostas com o gabarito (que nunca foi pro client), grava as
// tentativas respondidas em quiz_attempts e devolve a revisao completa.
//
// Em branco (answer=null) conta como ERRADA na nota, mas NAO e gravada em
// quiz_attempts (nao polui o painel de desempenho).
//
// Nivel pedagogico:
//  - iniciante  -> devolve code_reference (mostra a secao do codigo).
//  - avancado   -> esconde code_reference (aluno acha no livro).
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Choice = 'A' | 'B' | 'C' | 'D';
const VALID = new Set<Choice>(['A', 'B', 'C', 'D']);

export async function POST(req: NextRequest) {
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

  let body: { items?: { questionId?: string; answer?: string | null }[]; level?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'corpo invalido' }, { status: 400 });
  }

  const level = body.level === 'avancado' ? 'avancado' : 'iniciante';
  const rawItems = Array.isArray(body.items) ? body.items : null;
  if (!rawItems || rawItems.length === 0) {
    return NextResponse.json({ error: 'items (lista de respostas) obrigatorio' }, { status: 400 });
  }

  // Normaliza: questionId obrigatorio; answer vira Choice valida ou null (em branco).
  const items = rawItems.map((it) => {
    const questionId = String(it?.questionId || '').trim();
    const a = String(it?.answer ?? '').trim().toUpperCase() as Choice;
    const answer: Choice | null = VALID.has(a) ? a : null;
    return { questionId, answer };
  }).filter((it) => it.questionId);

  if (items.length === 0) {
    return NextResponse.json({ error: 'nenhum questionId valido' }, { status: 400 });
  }

  const ids = Array.from(new Set(items.map((it) => it.questionId)));
  const sb = supabaseAdmin();

  // Busca os gabaritos de TODAS as questoes num unico query.
  // Exige verified=true: questao nao verificada nunca e corrigida (linha vermelha do portal).
  const { data: rows, error } = await sb
    .from('quiz_questions')
    .select('id, correct, explanation, code_reference, verified')
    .in('id', ids)
    .eq('verified', true);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const byId = new Map(
    (rows ?? []).map((r) => [
      r.id,
      { correct: r.correct as Choice, explanation: r.explanation as string, codeReference: r.code_reference as string | null },
    ]),
  );

  // Monta a revisao na ordem em que a prova foi entregue.
  const results = items.map((it) => {
    const gab = byId.get(it.questionId);
    const correctAnswer = (gab?.correct ?? null) as Choice | null;
    const isCorrect = it.answer != null && gab != null && it.answer === gab.correct;
    return {
      questionId: it.questionId,
      answer: it.answer,
      correct: isCorrect,
      correctAnswer,
      explanation: gab?.explanation ?? '',
      // Nivel avancado esconde a referencia; iniciante/intermediario mostram.
      codeReference: level === 'avancado' ? null : (gab?.codeReference ?? null),
    };
  });

  // Grava SO os itens respondidos (answer != null) em lote.
  const respondidos = items.filter((it) => it.answer != null && byId.has(it.questionId));
  if (respondidos.length > 0) {
    const inserts = respondidos.map((it) => ({
      student_email: access.email,
      question_id: it.questionId,
      answer: it.answer,
      correct: it.answer === byId.get(it.questionId)!.correct,
    }));
    await sb.from('quiz_attempts').insert(inserts);
  }

  const acertos = results.filter((r) => r.correct).length;

  return NextResponse.json(
    { results, acertos, total: items.length },
    { headers: { 'Cache-Control': 'no-store, max-age=0' } },
  );
}
