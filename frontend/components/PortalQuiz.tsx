'use client';

import { useEffect, useState } from 'react';
import { BRAND } from '../lib/brand';
import { authedFetch } from '../lib/portal-client';
import { Question, Level } from './portal-types';
import PortalQuestion from './PortalQuestion';

// Runner generico de quiz/prova.
//  - mode 'category' + category -> quiz de uma categoria.
//  - mode 'exam' -> prova completa (70-75 questoes misturadas).
// Carrega da API (so verified=true), conduz questao a questao, contabiliza acertos e fecha
// com a tela de resultado. O gabarito vem so na correcao server-side.
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
  const [idx, setIdx] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [respondidas, setRespondidas] = useState(0);
  const [finalizado, setFinalizado] = useState(false);

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

  if (finalizado) {
    const pct = respondidas > 0 ? Math.round((acertos / respondidas) * 100) : 0;
    return (
      <Wrap titulo={titulo} onSair={onSair}>
        <div
          style={{
            background: '#fff',
            border: `1px solid ${BRAND.gold}`,
            borderRadius: 14,
            padding: 28,
            textAlign: 'center',
          }}
        >
          <h2 style={{ color: BRAND.navy, marginTop: 0 }}>Resultado</h2>
          <p style={{ fontSize: 48, fontWeight: 700, color: BRAND.navy, margin: '8px 0' }}>{pct}%</p>
          <p style={{ opacity: 0.8 }}>
            {acertos} de {respondidas} corretas
            {mode === 'exam' ? ' nesta prova.' : ' neste bloco.'}
          </p>
          <p style={{ fontSize: 13, opacity: 0.7 }}>
            Cada resposta ja foi salva no seu painel de desempenho.
          </p>
          <button type="button" onClick={onSair} style={btnPrimary}>
            Voltar ao painel
          </button>
        </div>
      </Wrap>
    );
  }

  const atual = questions[idx];

  function avancar() {
    if (idx + 1 >= questions!.length) {
      setFinalizado(true);
    } else {
      setIdx((n) => n + 1);
    }
  }

  return (
    <Wrap titulo={titulo} onSair={onSair}>
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
    </Wrap>
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

const btnGhost: React.CSSProperties = {
  padding: '8px 16px',
  borderRadius: 8,
  border: `1.5px solid ${BRAND.navy}`,
  background: '#fff',
  color: BRAND.navy,
  fontWeight: 600,
  cursor: 'pointer',
};
