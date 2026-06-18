'use client';

import { useEffect, useState } from 'react';
import { BRAND } from '../lib/brand';
import { authedFetch } from '../lib/portal-client';
import { Level } from './portal-types';

// "Simulados" do Portal Construtor: quiz por categoria (IRC/IBC/IECC/OSHA/AAB)
// + prova completa, consumindo a API de quiz (so verified=true chega ao aluno).
// Inclui o seletor de nivel (iniciante mostra referencia / avancado esconde).

const CATEGORIES: { key: string; label: string }[] = [
  { key: 'IRC', label: 'IRC — Residencial' },
  { key: 'IBC', label: 'IBC — Comercial' },
  { key: 'IECC', label: 'IECC — Energia' },
  { key: 'OSHA', label: 'OSHA — Segurança' },
  { key: 'AAB', label: 'AAB — Acessibilidade (521 CMR)' },
];

export default function PortalSimulados({
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

  useEffect(() => {
    let cancelado = false;
    (async () => {
      try {
        const rc = await authedFetch('/api/quiz?mode=count');
        const jc = await rc.json();
        if (!cancelado && rc.ok) setCounts(jc.counts || {});
      } catch {
        /* degrada em silencio: cards mostram "Verificando..." */
      }
    })();
    return () => {
      cancelado = true;
    };
  }, []);

  return (
    <section style={{ marginBottom: 28 }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <h2 style={{ color: BRAND.navy, fontSize: 22, margin: 0 }}>Simulados</h2>

        {/* Seletor de nivel pedagogico. */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: BRAND.navyLight }}>Nível:</span>
          {(['iniciante', 'avancado'] as Level[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => onChangeLevel(l)}
              style={{
                padding: '7px 14px',
                borderRadius: 8,
                border: `1.5px solid ${BRAND.navy}`,
                background: level === l ? BRAND.navy : 'transparent',
                color: level === l ? BRAND.gold : BRAND.navy,
                fontWeight: 600,
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0, marginBottom: 16 }}>
        {level === 'iniciante'
          ? 'Nível iniciante: o feedback mostra a referência do código oficial.'
          : 'Nível avançado: a referência fica escondida — você acha no livro.'}
      </p>

      {/* Categorias */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
        {CATEGORIES.map((c) => {
          const qtd = counts?.[c.key];
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
                {qtd == null ? 'Verificando...' : `${qtd} questões verificadas`}
              </div>
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
      <div
        style={{
          marginTop: 18,
          background: '#fff',
          border: `1px solid ${BRAND.gold}`,
          borderRadius: 14,
          padding: 22,
        }}
      >
        <h3 style={{ marginTop: 0, color: BRAND.navy }}>Prova completa</h3>
        <p style={{ opacity: 0.8, marginTop: 0 }}>
          Simulado de até 75 questões misturadas, no formato real do exame CSL.
        </p>
        <button
          type="button"
          onClick={onIniciarProva}
          style={{
            padding: '12px 24px',
            borderRadius: 10,
            border: 'none',
            background: BRAND.gold,
            color: BRAND.navy,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Iniciar prova completa
        </button>
      </div>
    </section>
  );
}
