import { BRAND } from '../../lib/brand';

// Portal do aluno (shell v1). Login restrito Supabase Auth + checagem de enrollment 'construtor'.
// O motor de quiz consome quiz_questions (so verified=true) via API/MCP.
export default function Portal() {
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
          <li>IRC — Residencial</li>
          <li>IBC — Comercial</li>
          <li>IECC — Energia</li>
          <li>OSHA — Seguranca</li>
          <li>AAB — Acessibilidade (521 CMR)</li>
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
