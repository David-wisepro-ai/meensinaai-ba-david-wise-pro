import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabase';
import { checkPortalAccess, accessDeniedStatus } from '../../../../lib/portal-access';

// Correcao da questao + feedback imediato, SEMPRE server-side.
// O aluno responde -> aqui o servidor compara com o gabarito (que nunca foi pro client),
// grava a tentativa em quiz_attempts e devolve gabarito + explicacao.
//
// Nivel pedagogico:
//  - iniciante  -> devolve code_reference (mostra a secao do codigo).
//  - avancado   -> esconde code_reference (aluno acha no livro).
//  - intermediario -> mostra (comportamento de iniciante).
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

  let body: { questionId?: string; answer?: string; level?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'corpo invalido' }, { status: 400 });
  }

  const questionId = String(body.questionId || '').trim();
  const answer = String(body.answer || '').trim().toUpperCase();
  const level = body.level === 'avancado' ? 'avancado' : 'iniciante';

  if (!questionId || !['A', 'B', 'C', 'D'].includes(answer)) {
    return NextResponse.json({ error: 'questionId e answer (A-D) obrigatorios' }, { status: 400 });
  }

  const sb = supabaseAdmin();

  // Busca o gabarito SO no servidor. E exige verified=true: questao nao verificada
  // nunca e corrigida nem contabilizada (linha vermelha do portal).
  const { data: question, error } = await sb
    .from('quiz_questions')
    .select('id, correct, explanation, code_reference, verified')
    .eq('id', questionId)
    .eq('verified', true)
    .single();

  if (error || !question) {
    return NextResponse.json({ error: 'questao nao encontrada ou nao verificada' }, { status: 404 });
  }

  const isCorrect = answer === question.correct;

  // Grava a tentativa (alimenta o painel de desempenho).
  await sb.from('quiz_attempts').insert({
    student_email: access.email,
    question_id: question.id,
    answer,
    correct: isCorrect,
  });

  return NextResponse.json(
    {
      correct: isCorrect,
      correctAnswer: question.correct,
      explanation: question.explanation,
      // Nivel avancado esconde a referencia; iniciante/intermediario mostram.
      codeReference: level === 'avancado' ? null : question.code_reference,
    },
    { headers: { 'Cache-Control': 'no-store, max-age=0' } },
  );
}
