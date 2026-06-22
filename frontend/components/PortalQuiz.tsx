'use client';

import { useEffect, useMemo, useState } from 'react';
import { BRAND } from '../lib/brand';
import { authedFetch } from '../lib/portal-client';
import { Question, Level, OPTION_KEYS } from './portal-types';
import PortalQuestion from './PortalQuestion';

type Choice = 'A' | 'B' | 'C' | 'D';

// Resultado de cada questao devolvido pelo /api/quiz/grade.
type GradeItem = {
  questionId: string;
  answer: Choice | null;
  correct: boolean;
  correctAnswer: Choice | null;
  explanation: string;
  codeReference: string | null;
};
type GradeResponse = { results: GradeItem[]; acertos: number; total: number };

// Runner generico de quiz/prova.
//  - mode 'category' + category -> quiz de TREINO: correcao imediata questao a questao
//    (via PortalQuestion). Mostra gabarito/explicacao na hora. NAO mudou.
//  - mode 'exam' -> prova completa estilo CSL real: navegacao livre, pular, trocar
//    resposta, navegador de questoes, correcao SO no fim (via /api/quiz/grade).
export default function PortalQuiz({
  mode,
  category,
  level,
  titulo,
  examSize = 75,
  onSair,
}: {
  mode: 'category' | 'exam';
  category?: string;
  level: Level;
  titulo: string;
  examSize?: number;
  onSair: () => void;
}) {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;
    (async () => {
      try {
        const params = new URLSearchParams({ mode });
        if (mode === 'category' && category) {
          params.set('category', category);
          params.set('limit', '20');
        }
        if (mode === 'exam') params.set('limit', String(examSize));
        const r = await authedFetch(`/api/quiz?${params.toString()}`);
        const j = await r.json();
        if (!r.ok) throw new Error(j?.error || 'erro ao carregar questoes');
        if (!cancelado) setQuestions(j.questions || []);
      } catch (e: any) {
        if (!cancelado) setErro(e?.message || 'Nao foi possivel carregar as questoes.');
      }
    })();
    return () => {
      cancelado = true;
    };
  }, [mode, category, level, examSize]);

  if (erro) {
    return (
      <Wrap titulo={titulo} onSair={onSair}>
        <p style={{ color: '#b3261e' }}>{erro}</p>
      </Wrap>
    );
  }

  if (!questions) {
    return (
      <Wrap titulo={titulo} onSair={onSair}>
        <p style={{ opacity: 0.7 }}>Carregando questoes...</p>
      </Wrap>
    );
  }

  if (questions.length === 0) {
    return (
      <Wrap titulo={titulo} onSair={onSair}>
        <p style={{ opacity: 0.8 }}>
          Ainda nao ha questoes verificadas disponiveis aqui. O banco esta sendo carregado em ondas.
        </p>
      </Wrap>
    );
  }

  if (mode === 'exam') {
    return (
      <Wrap titulo={titulo} onSair={onSair}>
        <ExamRunner questions={questions} level={level} onSair={onSair} />
      </Wrap>
    );
  }

  return (
    <Wrap titulo={titulo} onSair={onSair}>
      <CategoryRunner questions={questions} level={level} onSair={onSair} />
    </Wrap>
  );
}

// -------------------- MODO CATEGORIA (TREINO) — comportamento inalterado --------------------
function CategoryRunner({
  questions,
  level,
  onSair,
}: {
  questions: Question[];
  level: Level;
  onSair: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [respondidas, setRespondidas] = useState(0);
  const [finalizado, setFinalizado] = useState(false);

  if (finalizado) {
    const pct = respondidas > 0 ? Math.round((acertos / respondidas) * 100) : 0;
    return (
      <div style={cardResultado}>
        <h2 style={{ color: BRAND.navy, marginTop: 0 }}>Resultado</h2>
        <p style={{ fontSize: 48, fontWeight: 700, color: BRAND.navy, margin: '8px 0' }}>{pct}%</p>
        <p style={{ opacity: 0.8 }}>
          {acertos} de {respondidas} corretas neste bloco.
        </p>
        <p style={{ fontSize: 13, opacity: 0.7 }}>Cada resposta ja foi salva no seu painel de desempenho.</p>
        <button type="button" onClick={onSair} style={btnPrimary}>
          Voltar ao painel
        </button>
      </div>
    );
  }

  const atual = questions[idx];

  function avancar() {
    if (idx + 1 >= questions.length) {
      setFinalizado(true);
    } else {
      setIdx((n) => n + 1);
    }
  }

  return (
    <PortalQuestion
      key={atual.id}
      question={atual}
      level={level}
      numero={idx + 1}
      total={questions.length}
      onGraded={(acertou) => {
        setRespondidas((n) => n + 1);
        if (acertou) setAcertos((n) => n + 1);
      }}
      onNext={avancar}
    />
  );
}

// -------------------- MODO PROVA (CSL REAL) — navegacao livre, correcao no fim --------------------
function ExamRunner({
  questions,
  level,
  onSair,
}: {
  questions: Question[];
  level: Level;
  onSair: () => void;
}) {
  const total = questions.length;
  const [answers, setAnswers] = useState<Record<string, Choice>>({});
  const [idx, setIdx] = useState(0);
  const [corrigindo, setCorrigindo] = useState(false);
  const [resultado, setResultado] = useState<GradeResponse | null>(null);
  const [finalizado, setFinalizado] = useState(false);
  const [confirmando, setConfirmando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const respondidasCount = useMemo(
    () => questions.filter((q) => answers[q.id]).length,
    [questions, answers],
  );
  const brancos = total - respondidasCount;

  // --------- Tela de RESULTADO + REVISAO ---------
  if (finalizado && resultado) {
    const pct = resultado.total > 0 ? Math.round((resultado.acertos / resultado.total) * 100) : 0;
    // Mapa pra casar a revisao com a ordem/enunciado de cada questao.
    const byId = new Map(resultado.results.map((r) => [r.questionId, r]));
    return (
      <div>
        <div style={cardResultado}>
          <h2 style={{ color: BRAND.navy, marginTop: 0 }}>Resultado</h2>
          <p style={{ fontSize: 48, fontWeight: 700, color: BRAND.navy, margin: '8px 0' }}>{pct}%</p>
          <p style={{ opacity: 0.8 }}>
            {resultado.acertos} de {resultado.total} corretas nesta prova.
          </p>
          <p style={{ fontSize: 13, opacity: 0.7 }}>
            As respostas que voce marcou ja foram salvas no seu painel de desempenho.
          </p>
          <button type="button" onClick={onSair} style={btnPrimary}>
            Voltar ao painel
          </button>
        </div>

        <h3 style={{ color: BRAND.navy, margin: '28px 0 14px' }}>Revisao da prova</h3>
        <div style={{ display: 'grid', gap: 12 }}>
          {questions.map((q, i) => {
            const r = byId.get(q.id);
            const acertou = Boolean(r?.correct);
            const respostaAluno = r?.answer ?? null;
            return (
              <div
                key={q.id}
                style={{
                  background: '#fff',
                  border: `1px solid ${acertou ? '#1e7d4f' : '#b3261e'}`,
                  borderLeft: `5px solid ${acertou ? '#1e7d4f' : '#b3261e'}`,
                  borderRadius: 12,
                  padding: 16,
                }}
              >
                <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 6 }}>
                  Questao {i + 1} de {total} · {q.category}
                  {q.subtopic ? ` · ${q.subtopic}` : ''}
                </div>
                <p style={{ margin: '0 0 10px', fontWeight: 600, color: BRAND.navy, lineHeight: 1.4 }}>
                  {q.question}
                </p>
                <p style={{ margin: '0 0 4px', fontWeight: 700, color: acertou ? '#1e7d4f' : '#b3261e' }}>
                  {acertou ? '✓ Correta' : '✗ Errada'}
                </p>
                <p style={{ margin: '0 0 4px', fontSize: 14 }}>
                  Sua resposta:{' '}
                  <strong>
                    {respostaAluno ? `${respostaAluno}) ${q.options[respostaAluno]}` : 'em branco'}
                  </strong>
                </p>
                {!acertou && r?.correctAnswer && (
                  <p style={{ margin: '0 0 8px', fontSize: 14 }}>
                    Correta:{' '}
                    <strong style={{ color: '#1e7d4f' }}>
                      {r.correctAnswer}) {q.options[r.correctAnswer]}
                    </strong>
                  </p>
                )}
                {r?.explanation && (
                  <p style={{ margin: '6px 0 0', fontSize: 14, lineHeight: 1.5, opacity: 0.9 }}>
                    {r.explanation}
                  </p>
                )}
                {r?.codeReference ? (
                  <p style={{ margin: '6px 0 0', fontSize: 13, color: BRAND.navyLight }}>
                    Referencia: <strong>{r.codeReference}</strong>
                  </p>
                ) : (
                  level === 'avancado' && (
                    <p style={{ margin: '6px 0 0', fontSize: 12, opacity: 0.6, fontStyle: 'italic' }}>
                      Nivel avancado: ache a secao no livro do codigo.
                    </p>
                  )
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const atual = questions[idx];

  function selecionar(k: Choice) {
    setAnswers((prev) => ({ ...prev, [atual.id]: k }));
  }
  function ir(n: number) {
    setIdx(Math.max(0, Math.min(total - 1, n)));
  }
  function irPrimeiraEmBranco() {
    const i = questions.findIndex((q) => !answers[q.id]);
    if (i >= 0) ir(i);
    setConfirmando(false);
  }

  function tentarFinalizar() {
    if (brancos > 0) {
      setConfirmando(true);
    } else {
      finalizar();
    }
  }

  async function finalizar() {
    setConfirmando(false);
    setCorrigindo(true);
    setErro(null);
    try {
      const items = questions.map((q) => ({ questionId: q.id, answer: answers[q.id] ?? null }));
      const r = await authedFetch('/api/quiz/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, level }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || 'erro ao corrigir a prova');
      setResultado(j as GradeResponse);
      setFinalizado(true);
    } catch (e: any) {
      setErro(e?.message || 'Nao foi possivel corrigir a prova agora.');
    } finally {
      setCorrigindo(false);
    }
  }

  if (corrigindo) {
    return (
      <div style={{ ...cardResultado, textAlign: 'center' }}>
        <p style={{ fontSize: 18, color: BRAND.navy, fontWeight: 600 }}>Corrigindo prova...</p>
        <p style={{ opacity: 0.7, fontSize: 14 }}>Comparando suas respostas com o gabarito oficial.</p>
      </div>
    );
  }

  const selecaoAtual = answers[atual.id] ?? null;
  const naUltima = idx + 1 >= total;

  return (
    <div>
      {/* Questao atual — opcoes clicaveis e trocaveis, SEM feedback */}
      <div style={{ background: '#fff', border: `1px solid ${BRAND.gold}`, borderRadius: 14, padding: 24 }}>
        <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 8 }}>
          Questao {idx + 1} de {total} · {atual.category}
          {atual.subtopic ? ` · ${atual.subtopic}` : ''}
        </div>
        <h3 style={{ marginTop: 0, color: BRAND.navy, lineHeight: 1.4 }}>{atual.question}</h3>

        <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
          {OPTION_KEYS.map((k) => {
            const selecionada = selecaoAtual === k;
            return (
              <button
                key={k}
                type="button"
                onClick={() => selecionar(k)}
                style={{
                  textAlign: 'left',
                  padding: '12px 14px',
                  borderRadius: 10,
                  border: `1.5px solid ${selecionada ? BRAND.navy : '#d6d6d6'}`,
                  background: selecionada ? BRAND.cream : '#fff',
                  cursor: 'pointer',
                  fontSize: 15,
                }}
              >
                <strong style={{ color: BRAND.navy }}>{k})</strong> {atual.options[k]}
              </button>
            );
          })}
        </div>

        {/* Controles de navegacao */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 18, alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => ir(idx - 1)}
            disabled={idx === 0}
            style={{ ...btnNav, opacity: idx === 0 ? 0.4 : 1, cursor: idx === 0 ? 'default' : 'pointer' }}
          >
            Anterior
          </button>
          {!naUltima && (
            <button type="button" onClick={() => ir(idx + 1)} style={btnNavGhost}>
              Pular
            </button>
          )}
          {naUltima ? (
            <button type="button" onClick={tentarFinalizar} style={btnPrimaryInline}>
              Finalizar prova
            </button>
          ) : (
            <button type="button" onClick={() => ir(idx + 1)} style={btnNav}>
              Proxima
            </button>
          )}
        </div>
      </div>

      {/* Navegador de questoes */}
      <div style={{ background: '#fff', border: `1px solid ${BRAND.gold}`, borderRadius: 14, padding: 18, marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 13, color: BRAND.navy, fontWeight: 600 }}>
            Respondidas: {respondidasCount} de {total} · Em branco: {brancos}
          </span>
          <button type="button" onClick={tentarFinalizar} style={btnPrimaryInline}>
            Finalizar prova
          </button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {questions.map((q, i) => {
            const respondida = Boolean(answers[q.id]);
            const ehAtual = i === idx;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => ir(i)}
                title={`Questao ${i + 1}${respondida ? ' (respondida)' : ' (em branco)'}`}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 8,
                  border: ehAtual ? `2px solid ${BRAND.gold}` : `1.5px solid ${BRAND.navy}`,
                  boxShadow: ehAtual ? `0 0 0 2px ${BRAND.gold}55` : 'none',
                  background: respondida ? BRAND.navy : '#fff',
                  color: respondida ? BRAND.gold : BRAND.navy,
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      {erro && <p style={{ color: '#b3261e', fontSize: 14, marginTop: 12 }}>{erro}</p>}

      {/* Confirmacao de finalizar com brancos */}
      {confirmando && (
        <div
          style={{
            marginTop: 16,
            background: BRAND.cream,
            border: `1.5px solid ${BRAND.gold}`,
            borderRadius: 12,
            padding: 18,
          }}
        >
          <p style={{ margin: '0 0 12px', color: BRAND.navy, fontWeight: 600 }}>
            Voce ainda tem {brancos} {brancos === 1 ? 'questao em branco' : 'questoes em branco'}. Em
            branco conta como errada na nota.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <button type="button" onClick={irPrimeiraEmBranco} style={btnNav}>
              Ir pra primeira em branco
            </button>
            <button type="button" onClick={finalizar} style={btnPrimaryInline}>
              Finalizar mesmo assim
            </button>
            <button type="button" onClick={() => setConfirmando(false)} style={btnNavGhost}>
              Continuar respondendo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Wrap({ titulo, onSair, children }: { titulo: string; onSair: () => void; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ color: BRAND.navy, margin: 0 }}>{titulo}</h2>
        <button type="button" onClick={onSair} style={btnGhost}>
          Sair
        </button>
      </div>
      {children}
    </div>
  );
}

const cardResultado: React.CSSProperties = {
  background: '#fff',
  border: `1px solid ${BRAND.gold}`,
  borderRadius: 14,
  padding: 28,
  textAlign: 'center',
};

const btnPrimary: React.CSSProperties = {
  marginTop: 20,
  padding: '12px 28px',
  borderRadius: 10,
  border: 'none',
  background: BRAND.navy,
  color: BRAND.gold,
  fontSize: 15,
  fontWeight: 600,
  cursor: 'pointer',
};

const btnPrimaryInline: React.CSSProperties = {
  padding: '11px 22px',
  borderRadius: 10,
  border: 'none',
  background: BRAND.navy,
  color: BRAND.gold,
  fontSize: 15,
  fontWeight: 600,
  cursor: 'pointer',
};

const btnNav: React.CSSProperties = {
  padding: '11px 22px',
  borderRadius: 10,
  border: `1.5px solid ${BRAND.navy}`,
  background: '#fff',
  color: BRAND.navy,
  fontSize: 15,
  fontWeight: 600,
  cursor: 'pointer',
};

const btnNavGhost: React.CSSProperties = {
  padding: '11px 18px',
  borderRadius: 10,
  border: `1.5px dashed ${BRAND.navy}`,
  background: '#fff',
  color: BRAND.navy,
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
};

const btnGhost: React.CSSProperties = {
  padding: '8px 16px',
  borderRadius: 8,
  border: `1.5px solid ${BRAND.navy}`,
  background: '#fff',
  color: BRAND.navy,
  fontWeight: 600,
  cursor: 'pointer',
};
