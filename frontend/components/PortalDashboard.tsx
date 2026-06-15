'use client';

import { useEffect, useState } from 'react';
import { BRAND } from '../lib/brand';
import { authedFetch } from '../lib/portal-client';
import { Level } from './portal-types';

const CATEGORIES: { key: string; label: string }[] = [
  { key: 'IRC', label: 'IRC — Residencial' },
  { key: 'IBC', label: 'IBC — Comercial' },
  { key: 'IECC', label: 'IECC — Energia' },
  { key: 'OSHA', label: 'OSHA — Seguranca' },
  { key: 'AAB', label: 'AAB — Acessibilidade (521 CMR)' },
];

type StatCat = { category: string; total: number; acertos: number; percentual: number | null };
type Stats = {
  totalTentativas: number;
  percentualGeral: number | null;
  porCategoria: StatCat[];
  recomendacao: string | null;
};

// Painel do aluno: nivel, desempenho por categoria, contagem de questoes, recomendacao
// e botoes pra iniciar quiz por categoria ou prova completa.
export default function PortalDashboard({
  level,
  onChangeLevel,
  onIniciarCategoria,
  onIniciarProva,
}: {
  level: Level;
  onChangeLevel: (l: Level) => void;
  onIniciarCategoria: (cat: string, label: string) => void;
  onIniciarProva: () => void;
}) {
  const [counts, setCounts] = useState<Record<string, number> | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    let cancelado = false;
    (async () => {
      try {
        const [rc, rs] = await Promise.all([
          authedFetch('/api/quiz?mode=count'),
          authedFetch('/api/quiz/stats'),
        ]);
        const jc = await rc.json();
        const js = await rs.json();
        if (!cancelado) {
          if (rc.ok) setCounts(jc.counts || {});
          if (rs.ok) setStats(js as Stats);
        }
      } catch {
        /* degrada em silencio: painel mostra o que conseguir */
      }
    })();
    return () => {
      cancelado = true;
    };
  }, []);

  const statDe = (cat: string) => stats?.porCategoria.find((p) => p.category === cat) || null;

  return (
    <div>
      {/* Resumo + seletor de nivel */}
      <section
        style={{
          background: BRAND.navy,
          color: '#fff',
          borderRadius: 14,
          padding: 24,
          marginBottom: 20,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ fontSize: 13, opacity: 0.8 }}>Aproveitamento geral</div>
          <div style={{ fontSize: 40, fontWeight: 700, color: BRAND.gold }}>
            {stats?.percentualGeral != null ? `${stats.percentualGeral}%` : '—'}
          </div>
          <div style={{ fontSize: 13, opacity: 0.8 }}>
            {stats?.totalTentativas ? `${stats.totalTentativas} questoes respondidas` : 'Comece um bloco pra ver seu progresso'}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 6 }}>Nivel</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['iniciante', 'avancado'] as Level[]).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => onChangeLevel(l)}
                style={{
                  padding: '8px 14px',
                  borderRadius: 8,
                  border: `1.5px solid ${BRAND.gold}`,
                  background: level === l ? BRAND.gold : 'transparent',
                  color: level === l ? BRAND.navy : '#fff',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {l}
              </button>
            ))}
          </div>
          <div style={{ fontSize: 11, opacity: 0.7, marginTop: 6, maxWidth: 200 }}>
            {level === 'iniciante'
              ? 'Mostra a referencia do codigo no feedback.'
              : 'Esconde a referencia: voce acha no livro.'}
          </div>
        </div>
      </section>

      {stats?.recomendacao && (
        <p style={{ fontSize: 14, marginBottom: 16 }}>
          Sugestao: foque em <strong>{stats.recomendacao}</strong> — e onde voce mais erra.
        </p>
      )}

      {/* Categorias */}
      <h3 style={{ color: BRAND.navy }}>Treinar por categoria</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
        {CATEGORIES.map((c) => {
          const qtd = counts?.[c.key];
          const st = statDe(c.key);
          const indisponivel = qtd === 0;
          return (
            <div
              key={c.key}
              style={{
                background: '#fff',
                border: `1px solid ${BRAND.gold}`,
                borderRadius: 14,
                padding: 18,
              }}
            >
              <div style={{ fontWeight: 600, color: BRAND.navy }}>{c.label}</div>
              <div style={{ fontSize: 13, opacity: 0.7, margin: '4px 0' }}>
                {qtd == null ? 'Verificando...' : `${qtd} questoes verificadas`}
              </div>
              {st && st.percentual != null && (
                <div style={{ fontSize: 13, color: BRAND.navyLight }}>
                  Seu aproveitamento: <strong>{st.percentual}%</strong> ({st.acertos}/{st.total})
                </div>
              )}
              <button
                type="button"
                disabled={indisponivel}
                onClick={() => onIniciarCategoria(c.key, c.label)}
                style={{
                  marginTop: 12,
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 10,
                  border: 'none',
                  background: indisponivel ? '#cfcfcf' : BRAND.navy,
                  color: BRAND.gold,
                  fontWeight: 600,
                  cursor: indisponivel ? 'default' : 'pointer',
                }}
              >
                {indisponivel ? 'Em breve' : 'Iniciar quiz'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Prova completa */}
      <section
        style={{
          marginTop: 24,
          background: '#fff',
          border: `1px solid ${BRAND.gold}`,
          borderRadius: 14,
          padding: 22,
        }}
      >
        <h3 style={{ marginTop: 0, color: BRAND.navy }}>Prova completa</h3>
        <p style={{ opacity: 0.8, marginTop: 0 }}>
          Simulado de ate 75 questoes misturadas, no formato real do exame CSL.
        </p>
        <button type="button" onClick={onIniciarProva} style={{
          padding: '12px 24px',
          borderRadius: 10,
          border: 'none',
          background: BRAND.gold,
          color: BRAND.navy,
          fontWeight: 700,
          cursor: 'pointer',
        }}>
          Iniciar prova completa
        </button>
      </section>
    </div>
  );
}
