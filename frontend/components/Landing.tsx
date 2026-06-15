import Link from 'next/link';
import Vsl from './Vsl';
import LeadForm from './LeadForm';
import { BRAND } from '../lib/brand';

export type Beneficio = { titulo: string; texto: string };
export type Incluso = string;
export type Upsell = { texto: string; href: string; rotulo: string };

export type LandingProps = {
  product: 'project_manager' | 'construtor' | 'wise_day';
  nome: string;
  preco: string;
  selo: string; // ex.: "Porta de entrada", "Curso principal", "Experiência premium"
  headline: string;
  subheadline: string;
  vslLegenda?: string;
  dores: string[]; // bloco "isto é pra você se..."
  beneficios: Beneficio[];
  incluso: Incluso[];
  formato: string; // resumo do formato (presencial/ao vivo, duração, acesso)
  ctaPrincipal: string;
  ctaForm: string;
  upsell?: Upsell;
};

const wrap: React.CSSProperties = { maxWidth: 920, margin: '0 auto', padding: '0 20px' };

export default function Landing(props: LandingProps) {
  const {
    product,
    nome,
    preco,
    selo,
    headline,
    subheadline,
    vslLegenda,
    dores,
    beneficios,
    incluso,
    formato,
    ctaPrincipal,
    ctaForm,
    upsell,
  } = props;

  return (
    <main style={{ color: BRAND.navy }}>
      {/* HERO */}
      <section style={{ background: BRAND.navy, color: '#fff', padding: '20px 0 56px' }}>
        <div style={wrap}>
          <nav
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 0 32px',
            }}
          >
            <Link href="/" style={{ color: '#fff', fontWeight: 800, textDecoration: 'none' }}>
              {BRAND.name}
            </Link>
            <span style={{ color: BRAND.gold, fontSize: 13, fontWeight: 700 }}>{selo}</span>
          </nav>

          <div
            style={{
              display: 'inline-block',
              background: BRAND.gold,
              color: BRAND.navy,
              fontWeight: 800,
              fontSize: 13,
              padding: '6px 12px',
              borderRadius: 999,
            }}
          >
            {nome} &middot; {preco}
          </div>

          <h1 style={{ fontSize: 38, lineHeight: 1.15, margin: '18px 0 12px', maxWidth: 760 }}>
            {headline}
          </h1>
          <p style={{ fontSize: 19, opacity: 0.92, maxWidth: 680, lineHeight: 1.5 }}>
            {subheadline}
          </p>

          <Vsl titulo={`Apresentação · ${nome}`} legenda={vslLegenda} />

          <a
            href="#inscricao"
            style={{
              display: 'inline-block',
              background: BRAND.gold,
              color: BRAND.navy,
              fontWeight: 800,
              fontSize: 17,
              padding: '15px 28px',
              borderRadius: 10,
              textDecoration: 'none',
            }}
          >
            {ctaPrincipal}
          </a>
          <div style={{ fontSize: 13.5, opacity: 0.8, marginTop: 12 }}>{formato}</div>
        </div>
      </section>

      {/* DORES — isto é pra você se */}
      <section style={{ padding: '48px 0' }}>
        <div style={wrap}>
          <h2 style={{ fontSize: 26, marginTop: 0 }}>Isto é pra você se...</h2>
          <ul style={{ lineHeight: 1.9, fontSize: 17, paddingLeft: 22 }}>
            {dores.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* BENEFÍCIOS / TRANSFORMAÇÃO */}
      <section style={{ background: '#fff', padding: '48px 0' }}>
        <div style={wrap}>
          <h2 style={{ fontSize: 26, marginTop: 0 }}>O que você ganha</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 18,
              marginTop: 16,
            }}
          >
            {beneficios.map((b, i) => (
              <div
                key={i}
                style={{
                  border: `1px solid ${BRAND.gold}`,
                  borderRadius: 12,
                  padding: 20,
                  background: BRAND.cream,
                }}
              >
                <h3 style={{ margin: '0 0 8px', fontSize: 18, color: BRAND.navy }}>{b.titulo}</h3>
                <p style={{ margin: 0, color: BRAND.navyLight, lineHeight: 1.55 }}>{b.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROVA SOCIAL — reviews do Google (placeholder pro David/gbp-escola preencher) */}
      <section style={{ padding: '48px 0' }}>
        <div style={wrap}>
          <h2 style={{ fontSize: 26, marginTop: 0 }}>O que dizem nossos alunos</h2>
          <p style={{ color: BRAND.navyLight, marginTop: 0 }}>
            Alunos que estudaram com a gente e passaram na prova de CSL.
          </p>
          {/*
            REVIEWS REAIS DO GOOGLE ENTRAM AQUI.
            David / squad gbp-escola: substituir os 3 cards abaixo por reviews verdadeiras
            (nome do aluno, nota, texto). Não inventar depoimento — usar somente reviews reais.
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
                  background: '#fff',
                  border: `1px solid ${BRAND.gold}`,
                  borderRadius: 12,
                  padding: 20,
                }}
              >
                <div style={{ color: BRAND.gold, fontSize: 18 }}>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <p style={{ color: BRAND.navyLight, lineHeight: 1.55, fontStyle: 'italic' }}>
                  &ldquo;Espaço reservado para a avaliação real de um aluno (Google Reviews).&rdquo;
                </p>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Aluno Wise Pro &middot; CSL aprovado</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFERTA + INSCRIÇÃO */}
      <section id="inscricao" style={{ background: BRAND.navy, color: '#fff', padding: '56px 0' }}>
        <div style={wrap}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 28,
              alignItems: 'start',
            }}
          >
            <div>
              <h2 style={{ fontSize: 26, marginTop: 0 }}>O que está incluso</h2>
              <ul style={{ lineHeight: 1.9, fontSize: 16.5, paddingLeft: 20 }}>
                {incluso.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <div
                style={{
                  marginTop: 20,
                  fontSize: 30,
                  fontWeight: 800,
                  color: BRAND.gold,
                }}
              >
                {preco}
              </div>
              <div style={{ fontSize: 13.5, opacity: 0.85 }}>{formato}</div>
            </div>

            <div
              style={{
                background: '#fff',
                color: BRAND.navy,
                borderRadius: 14,
                padding: 26,
                border: `2px solid ${BRAND.gold}`,
              }}
            >
              <h3 style={{ marginTop: 0, fontSize: 22 }}>Garanta sua vaga</h3>
              <p style={{ color: BRAND.navyLight, marginTop: 0, fontSize: 14.5 }}>
                Preencha seus dados. Você recebe a confirmação e as instruções da turma.
              </p>
              <LeadForm product={product} cta={ctaForm} />
            </div>
          </div>
        </div>
      </section>

      {/* UPSELL SUTIL */}
      {upsell && (
        <section style={{ padding: '40px 0' }}>
          <div style={wrap}>
            <div
              style={{
                background: '#fff',
                border: `1px solid ${BRAND.gold}`,
                borderRadius: 12,
                padding: 22,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 12,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ color: BRAND.navyLight, fontSize: 16, maxWidth: 560 }}>{upsell.texto}</span>
              <Link
                href={upsell.href}
                style={{ color: BRAND.navy, fontWeight: 800, whiteSpace: 'nowrap' }}
              >
                {upsell.rotulo} &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      <footer style={{ padding: '32px 0', textAlign: 'center', color: BRAND.navyLight, fontSize: 13 }}>
        <div style={wrap}>
          {BRAND.name} &middot; {BRAND.domain}
        </div>
      </footer>
    </main>
  );
}
