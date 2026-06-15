'use client';

import { useState } from 'react';
import { BRAND } from '../lib/brand';
import { authedFetch } from '../lib/portal-client';
import { Question, Feedback, Level, OPTION_KEYS } from './portal-types';

// Uma questao: opcoes A-D -> envia resposta -> servidor corrige -> feedback imediato.
// O gabarito NUNCA chega aqui antes de responder (vem so do POST /api/quiz/attempt).
// onGraded avisa o runner pai (quiz ou prova) pra avancar e contabilizar acerto.
export default function PortalQuestion({
  question,
  level,
  numero,
  total,
  onGraded,
  onNext,
}: {
  question: Question;
  level: Level;
  numero: number;
  total: number;
  onGraded?: (acertou: boolean) => void;
  onNext?: () => void;
}) {
  const [escolha, setEscolha] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function responder() {
    if (!escolha || feedback) return;
    setEnviando(true);
    setErro(null);
    try {
      const r = await authedFetch('/api/quiz/attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: question.id, answer: escolha, level }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || 'erro ao corrigir');
      setFeedback(j as Feedback);
      onGraded?.(Boolean(j.correct));
    } catch (e: any) {
      setErro(e?.message || 'Nao foi possivel corrigir agora.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div
      style={{
        background: '#fff',
        border: `1px solid ${BRAND.gold}`,
        borderRadius: 14,
        padding: 24,
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 8 }}>
        Questao {numero} de {total} · {question.category}
        {question.subtopic ? ` · ${question.subtopic}` : ''}
      </div>
      <h3 style={{ marginTop: 0, color: BRAND.navy, lineHeight: 1.4 }}>{question.question}</h3>

      <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
        {OPTION_KEYS.map((k) => {
          const selecionada = escolha === k;
          const ehCorreta = feedback?.correctAnswer === k;
          const ehErroDoAluno = feedback && selecionada && !feedback.correct;
          let borda = '#d6d6d6';
          let fundo = '#fff';
          if (feedback) {
            if (ehCorreta) {
              borda = '#1e7d4f';
              fundo = '#eaf6ef';
            } else if (ehErroDoAluno) {
              borda = '#b3261e';
              fundo = '#fbecec';
            }
          } else if (selecionada) {
            borda = BRAND.navy;
            fundo = BRAND.cream;
          }
          return (
            <button
              key={k}
              type="button"
              disabled={Boolean(feedback)}
              onClick={() => setEscolha(k)}
              style={{
                textAlign: 'left',
                padding: '12px 14px',
                borderRadius: 10,
                border: `1.5px solid ${borda}`,
                background: fundo,
                cursor: feedback ? 'default' : 'pointer',
                fontSize: 15,
              }}
            >
              <strong style={{ color: BRAND.navy }}>{k})</strong> {question.options[k]}
            </button>
          );
        })}
      </div>

      {erro && <p style={{ color: '#b3261e', fontSize: 13, marginTop: 12 }}>{erro}</p>}

      {!feedback ? (
        <button
          type="button"
          onClick={responder}
          disabled={!escolha || enviando}
          style={{
            marginTop: 18,
            padding: '11px 22px',
            borderRadius: 10,
            border: 'none',
            background: escolha ? BRAND.navy : '#bcbcbc',
            color: BRAND.gold,
            fontSize: 15,
            fontWeight: 600,
            cursor: escolha && !enviando ? 'pointer' : 'default',
          }}
        >
          {enviando ? 'Corrigindo...' : 'Responder'}
        </button>
      ) : (
        <div
          style={{
            marginTop: 18,
            padding: 16,
            borderRadius: 10,
            background: BRAND.cream,
            border: `1px solid ${BRAND.gold}`,
          }}
        >
          <p style={{ margin: '0 0 8px', fontWeight: 600, color: feedback.correct ? '#1e7d4f' : '#b3261e' }}>
            {feedback.correct ? 'Correto!' : `Resposta correta: ${feedback.correctAnswer}`}
          </p>
          <p style={{ margin: '0 0 8px', fontSize: 14, lineHeight: 1.5 }}>{feedback.explanation}</p>
          {feedback.codeReference && (
            <p style={{ margin: 0, fontSize: 13, color: BRAND.navyLight }}>
              Referencia: <strong>{feedback.codeReference}</strong>
            </p>
          )}
          {!feedback.codeReference && level === 'avancado' && (
            <p style={{ margin: 0, fontSize: 12, opacity: 0.6, fontStyle: 'italic' }}>
              Nivel avancado: ache a secao no livro do codigo.
            </p>
          )}
          {onNext && (
            <button
              type="button"
              onClick={onNext}
              style={{
                marginTop: 14,
                padding: '10px 20px',
                borderRadius: 10,
                border: `1.5px solid ${BRAND.navy}`,
                background: '#fff',
                color: BRAND.navy,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {numero >= total ? 'Ver resultado' : 'Proxima questao'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
