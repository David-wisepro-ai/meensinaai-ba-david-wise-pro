import Link from 'next/link';
import { BRAND, PRODUCTS } from '../lib/brand';

export const metadata = {
  title: 'Wise Pro Academy — Licença de Construtor (CSL) em Massachusetts, em português',
  description:
    'Prepare-se pra tirar sua Construction Supervisor License (CSL) em Massachusetts. Portal de simulados, curso presencial e mentoria prática. Em português, pra brasileiros que constroem nos EUA.',
};

// SEO: schema EducationalOrganization. Endereço/telefone/redes ficam como placeholder
// até o David confirmar os dados oficiais (não inventar).
const schema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Wise Pro Academy',
  url: 'https://wiseproacademy.io',
  description:
    'Escola de preparação para a Construction Supervisor License (CSL) em Massachusetts, em português, para brasileiros que trabalham com construção nos EUA.',
  areaServed: 'Massachusetts, USA',
  knowsLanguage: ['pt-BR', 'en-US'],
};

const wrap: React.CSSProperties = { maxWidth: 1080, margin: '0 auto', padding: '0 20px' };

export default function Home() {
  const card: React.CSSProperties = {
    background: '#fff',
    borderRadius: 14,
    padding: 24,
    border: `1px solid ${BRAND.gold}`,
    flex: 1,
    minWidth: 260,
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <main style={{ color: BRAND.navy }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* HERO */}
      <header style={{ background: BRAND.navy, color: '#fff', padding: '64px 0 72px', textAlign: 'center' }}>
        <div style={wrap}>
          <h1 style={{ fontSize: 44, margin: 0, lineHeight: 1.1 }}>Wise Pro Academy</h1>
          <p style={{ color: BRAND.gold, fontSize: 22, marginTop: 12, fontWeight: 700 }}>
            Sua licença de construtor (CSL) em Massachusetts, em português, do jeito certo.
          </p>
          <p style={{ maxWidth: 680, margin: '18px auto 0', opacity: 0.92, fontSize: 18, lineHeight: 1.55 }}>
            O caminho pra passar na prova de Construction Supervisor License com portal de simulados,
            curso presencial e mentoria prática. Feito pra brasileiros que constroem nos EUA.
          </p>
          <a
            href="#cursos"
            style={{
              display: 'inline-block',
              marginTop: 28,
              background: BRAND.gold,
              color: BRAND.navy,
              fontWeight: 800,
              fontSize: 17,
              padding: '15px 28px',
              borderRadius: 10,
              textDecoration: 'none',
            }}
          >
            Ver os caminhos pra sua CSL
          </a>
        </div>
      </header>

      {/* AUTORIDADE */}
      <section style={{ padding: '52px 0' }}>
        <div style={wrap}>
          <h2 style={{ fontSize: 28, marginTop: 0 }}>Por que a Wise Pro Academy</h2>
          <p style={{ fontSize: 17.5, lineHeight: 1.6, maxWidth: 760 }}>
            A escola foi criada por quem viveu o mesmo caminho: o David passou na prova de CSL e hoje
            atua na construção em Massachusetts. Mais do que aulas, a Wise Pro forma alunos que
            realmente passam, treinando com simulados de verdade até dominarem o código.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 16,
              marginTop: 24,
            }}
          >
            {[
              {
                t: 'Quem já passou te ensina',
                d: 'O David tirou a CSL e construiu carreira no ramo. Você aprende com a experiência real, não só com teoria.',
              },
              {
                t: 'Tudo em português',
                d: 'O inglês técnico do código é a barreira. Aqui você aprende no seu idioma e ganha confiança pra prova.',
              },
              {
                t: 'Foco em aprovação',
                d: 'O portal de simulados treina você até achar a resposta no livro rápido. É isso que faz passar.',
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: '#fff',
                  border: `1px solid ${BRAND.gold}`,
                  borderRadius: 12,
                  padding: 20,
                }}
              >
                <h3 style={{ margin: '0 0 8px', fontSize: 18 }}>{item.t}</h3>
                <p style={{ margin: 0, color: BRAND.navyLight, lineHeight: 1.55 }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURSOS */}
      <section id="cursos" style={{ background: '#fff', padding: '52px 0' }}>
        <div style={wrap}>
          <h2 style={{ fontSize: 28, marginTop: 0 }}>Os 3 caminhos</h2>
          <p style={{ color: BRAND.navyLight, marginTop: 0, fontSize: 16.5 }}>
            Do primeiro passo no ramo até a sua licença e a prática no campo.
          </p>
          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginTop: 16 }}>
            {Object.values(PRODUCTS).map((p) => (
              <div key={p.slug} style={card}>
                <h3 style={{ marginTop: 0, fontSize: 21 }}>{p.name}</h3>
                <div style={{ color: BRAND.gold, fontWeight: 800, fontSize: 24 }}>{p.price}</div>
                <div style={{ flex: 1 }} />
                <Link
                  href={`/${p.slug}`}
                  style={{
                    marginTop: 16,
                    display: 'inline-block',
                    color: BRAND.navy,
                    fontWeight: 800,
                  }}
                >
                  Saber mais &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIAL: PORTAL */}
      <section style={{ padding: '52px 0' }}>
        <div style={wrap}>
          <h2 style={{ fontSize: 28, marginTop: 0 }}>O que faz a diferença: o portal de simulados</h2>
          <p style={{ fontSize: 17.5, lineHeight: 1.6, maxWidth: 760 }}>
            Não basta a aula. O que faz você passar é treinar com simulados de verdade. Cada questão
            é ancorada no código oficial (780 CMR, IRC, IBC, IECC, OSHA), com a explicação e a
            referência pra você aprender a achar a resposta no livro. No nível iniciante a gente
            mostra a seção; no avançado, você acha sozinho.
          </p>
        </div>
      </section>

      {/* PROVA SOCIAL */}
      <section style={{ background: '#fff', padding: '52px 0' }}>
        <div style={wrap}>
          <h2 style={{ fontSize: 28, marginTop: 0 }}>O que dizem nossos alunos</h2>
          {/*
            REVIEWS REAIS DO GOOGLE ENTRAM AQUI.
            David / squad gbp-escola: substituir os cards abaixo por reviews verdadeiras do Google
            (nome, nota, texto). Não inventar depoimento.
          */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 18,
              marginTop: 16,
            }}
          >
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                style={{
                  background: BRAND.cream,
                  border: `1px solid ${BRAND.gold}`,
                  borderRadius: 12,
                  padding: 20,
                }}
              >
                <div style={{ color: BRAND.gold, fontSize: 18 }}>
                  &#9733;&#9733;&#9733;&#9733;&#9733;
                </div>
                <p style={{ color: BRAND.navyLight, lineHeight: 1.55, fontStyle: 'italic' }}>
                  &ldquo;Espaço reservado para a avaliação real de um aluno (Google Reviews).&rdquo;
                </p>
                <div style={{ fontWeight: 700, fontSize: 14 }}>
                  Aluno Wise Pro &middot; CSL aprovado
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ padding: '36px 0', color: BRAND.navyLight, fontSize: 13, textAlign: 'center' }}>
        <div style={wrap}>
          {BRAND.name} &middot; {BRAND.domain}
        </div>
      </footer>
    </main>
  );
}
