'use client';

import { useEffect, useState } from 'react';
import { BRAND } from '../../lib/brand';

// Portal do aluno (shell v1). Login restrito Supabase Auth + checagem de enrollment 'construtor'.
// O motor de quiz consome quiz_questions (SO verified=true) via /api/quiz EM RUNTIME (force-dynamic,
// no-store): questao carregada pelo /carregar-questoes aparece aqui NA HORA, SEM redeploy.
const CATEGORIES: { key: string; label: string }[] = [
  { key: 'IRC', label: 'IRC — Residencial' },
  { key: 'IBC', label: 'IBC — Comercial' },
  { key: 'IECC', label: 'IECC — Energia' },
  { key: 'OSHA', label: 'OSHA — Seguranca' },
  { key: 'AAB', label: 'AAB — Acessibilidade (521 CMR)' },
];

type Counts = Record<string, number | null>;

export default function Portal() {
  const [counts, setCounts] = useState<Counts>({});

  useEffect(() => {
    // Le quantas questoes verificadas existem por categoria, em runtime (sem redeploy).
    let cancelled = false;
    (async () => {
      const next: Counts = {};
      for (const c of CATEGORIES) {
        try {
          const r = await fetch(`/api/quiz?category=${c.key}&limit=1`, { cache: 'no-store' });
          const j = await r.json();
          next[c.key] = r.ok ? (typeof j.count === 'number' ? j.count : null) : null;
        } catch {
          next[c.key] = null;
        }
      }
      if (!cancelled) setCounts(next);
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <main style={{ maxWidth: 920, margin: '0 auto', padding: 24 }}>
      <h1 style={{ color: BRAND.navy }}>Portal do Aluno — Simulados CSL</h1>
      <p style={{ opacity: 0.8 }}>
        Acesso restrito a quem comprou o Curso de Construtor. Faca login pra treinar.
      </p>

      {/* Login (Supabase Auth) entra aqui. */}
      <section style={{ background: '#fff', border: `1px solid ${BRAND.gold}`, borderRadius: 14, padding: 24, marginTop: 16 }}>
        <h3 style={{ marginTop: 0 }}>Categorias</h3>
        <ul style={{ lineHeight: 1.9 }}>
          {CATEGORIES.map((c) => (
            <li key={c.key}>
              {c.label}
              {counts[c.key] != null && (
                <span style={{ opacity: 0.6, fontSize: 13 }}> — {counts[c.key]} questoes</span>
              )}
            </li>
          ))}
        </ul>
        <p style={{ fontSize: 13, opacity: 0.7 }}>
          Cada questao vem com explicacao + referencia ao codigo. Nivel iniciante mostra a secao;
          avancado esconde (voce aprende a achar no livro).
        </p>
      </section>

      <section style={{ marginTop: 16 }}>
        <h3>Provas completas</h3>
        <p style={{ opacity: 0.8 }}>Simulados de 70-75 questoes, no formato real do exame.</p>
      </section>

      <footer style={{ marginTop: 48, color: BRAND.navyLight, fontSize: 13 }}>{BRAND.name} — {BRAND.domain}</footer>
    </main>
  );
}
