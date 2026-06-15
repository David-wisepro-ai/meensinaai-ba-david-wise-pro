import Link from 'next/link';
import { BRAND, PRODUCTS } from '../lib/brand';

export default function Home() {
  const card = { background: '#fff', borderRadius: 14, padding: 24, border: `1px solid ${BRAND.gold}`, flex: 1 };
  return (
    <main style={{ maxWidth: 1080, margin: '0 auto', padding: 24 }}>
      <header style={{ background: BRAND.navy, color: '#fff', borderRadius: 16, padding: '48px 32px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 40, margin: 0 }}>Wise Pro Academy</h1>
        <p style={{ color: BRAND.gold, fontSize: 20, marginTop: 8 }}>
          Sua licenca de construtor (CSL) em Massachusetts — em portugues, do jeito certo.
        </p>
        <p style={{ maxWidth: 640, margin: '16px auto', opacity: 0.9 }}>
          O caminho pra passar na prova de Construction Supervisor License com portal de simulados,
          curso presencial e mentoria pratica. Feito pra brasileiros que constroem nos EUA.
        </p>
      </header>

      <h2 style={{ marginTop: 48 }}>Os 3 caminhos</h2>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {Object.values(PRODUCTS).map((p) => (
          <div key={p.slug} style={card}>
            <h3 style={{ marginTop: 0 }}>{p.name}</h3>
            <div style={{ color: BRAND.gold, fontWeight: 800, fontSize: 22 }}>{p.price}</div>
            <Link href={`/${p.slug}`} style={{ color: BRAND.navy, fontWeight: 700 }}>Saber mais &rarr;</Link>
          </div>
        ))}
      </div>

      <section style={{ marginTop: 48 }}>
        <h2>O que faz a diferenca: o portal de simulados</h2>
        <p>
          Nao basta a aula. O que faz voce passar e treinar com simulados de verdade — cada questao
          ancorada no codigo oficial (780 CMR, IRC, IBC, IECC, OSHA), com a explicacao e a referencia
          pra voce aprender a achar a resposta no livro. No nivel iniciante a gente mostra a secao;
          no avancado, voce acha sozinho.
        </p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2>O que dizem nossos alunos</h2>
        {/* Reviews/Google entram aqui (gbp-escola popula). */}
        <p style={{ opacity: 0.7 }}>(reviews do Google entram aqui)</p>
      </section>

      <footer style={{ marginTop: 48, padding: 24, color: BRAND.navyLight, fontSize: 13 }}>
        {BRAND.name} — {BRAND.domain}
      </footer>
    </main>
  );
}
