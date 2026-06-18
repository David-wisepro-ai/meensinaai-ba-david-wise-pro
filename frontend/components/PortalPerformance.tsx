'use client';

import { useEffect, useState } from 'react';
import { BRAND } from '../lib/brand';
import { authedFetch } from '../lib/portal-client';

// Painel "Desempenho" do Portal Construtor.
// Mostra ao aluno, de forma visual: nota geral + % de acerto por categoria +
// categoria mais fraca (onde precisa estudar). Le quiz_attempts do PROPRIO aluno
// via /api/quiz/stats (server-side, restrito ao email do token).

const LABELS: Record<string, string> = {
  IRC: 'IRC — Residencial',
  IBC: 'IBC — Comercial',
  IECC: 'IECC — Energia',
  OSHA: 'OSHA — Segurança',
  AAB: 'AAB — Acessibilidade (521 CMR)',
};

type StatCat = { category: string; total: number; acertos: number; percentual: number | null };
type Stats = {
  totalTentativas: number;
  percentualGeral: number | null;
  porCategoria: StatCat[];
  recomendacao: string | null;
};

function corPorPct(pct: number | null): string {
  if (pct == null) return '#cfcfcf';
  if (pct >= 80) return '#1f8a4c'; // verde — dominado
  if (pct >= 60) return BRAND.gold; // dourado — atenção
  return '#b3261e'; // vermelho — precisa estudar
}

export default function PortalPerformance() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;
    (async () => {
      try {
        const r = await authedFetch('/api/quiz/stats');
        const j = await r.json();
        if (cancelado) return;
        if (r.ok) setStats(j as Stats);
        else setErro(j?.error || 'Não foi possível carregar seu desempenho agora.');
      } catch {
        if (!cancelado) setErro('Não foi possível carregar seu desempenho agora.');
      }
    })();
    return () => {
      cancelado = true;
    };
  }, []);

  return (
    <section style={{ marginBottom: 28 }}>
      <h2 style={{ color: BRAND.navy, fontSize: 22, margin: '4px 0 14px' }}>Desempenho</h2>

      {/* Cartão de nota geral + categoria mais fraca. */}
      <div
        style={{
          background: BRAND.navy,
          color: '#fff',
          borderRadius: 16,
          padding: 24,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 20,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ fontSize: 13, opacity: 0.8 }}>Nota geral</div>
          <div style={{ fontSize: 46, fontWeight: 700, color: BRAND.gold, lineHeight: 1 }}>
            {stats?.percentualGeral != null ? `${stats.percentualGeral}%` : '—'}
          </div>
          <div style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>
            {stats?.totalTentativas
              ? `${stats.totalTentativas} questões respondidas`
              : 'Responda um simulado pra ver sua nota'}
          </div>
        </div>
        <div style={{ maxWidth: 280 }}>
          <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>Onde estudar primeiro</div>
          {stats?.recomendacao ? (
            <div style={{ fontSize: 18, fontWeight: 700, color: BRAND.gold }}>
              {LABELS[stats.recomendacao] || stats.recomendacao}
            </div>
          ) : (
            <div style={{ fontSize: 14, opacity: 0.75 }}>
              Sua categoria mais fraca aparece aqui depois dos primeiros simulados.
            </div>
          )}
        </div>
      </div>

      {erro && (
        <p style={{ fontSize: 13, color: '#b3261e', marginTop: 12 }}>{erro}</p>
      )}

      {/* Barras por categoria. */}
      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {(stats?.porCategoria ?? Object.keys(LABELS).map((c) => ({
          category: c,
          total: 0,
          acertos: 0,
          percentual: null as number | null,
        }))).map((p) => {
          const cor = corPorPct(p.percentual);
          const largura = p.percentual != null ? Math.max(p.percentual, 3) : 0;
          return (
            <div key={p.category}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}>
                <span style={{ color: BRAND.navy, fontWeight: 600 }}>
                  {LABELS[p.category] || p.category}
                </span>
                <span style={{ color: BRAND.navyLight }}>
                  {p.percentual != null ? `${p.percentual}% (${p.acertos}/${p.total})` : 'sem dados'}
                </span>
              </div>
              <div style={{ height: 12, borderRadius: 999, background: '#eceff5', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${largura}%`,
                    height: '100%',
                    background: cor,
                    borderRadius: 999,
                    transition: 'width 0.4s ease',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p style={{ fontSize: 12, opacity: 0.6, marginTop: 14 }}>
        Verde acima de 80% (dominado), dourado entre 60 e 79% (revisar), vermelho abaixo de 60% (priorize).
      </p>
    </section>
  );
}
