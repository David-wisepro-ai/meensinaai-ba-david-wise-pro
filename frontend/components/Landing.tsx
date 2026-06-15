import Link from 'next/link';
import Vsl from './Vsl';
import LeadForm from './LeadForm';
import WhatsAppFloat from './WhatsAppFloat';
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

const wrap: React.CSSProperties = { maxWidth: 980, margin: '0 auto', padding: '0 20px' };

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
      {/* HERO escuro com gradiente royal */}
      <section
        style={{
          background: `linear-gradient(135deg, ${BRAND.navy} 0%, ${BRAND.royal} 100%)`,
          color: '#fff',
          padding: '18px 0 60px',
        }}
      >
        <div style={wrap}>
          <nav
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 0 32px',
            }}
          >
            <Link href="/" style={{ color: '#fff', fontWeight: 800, textDecoration: 'none', letterSpacing: 0.5 }}>
              WISE PRO <span style={{ color: BRAND.gold }}>ACADEMY</span>
            </Link>
            <span
              style={{
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.24)',
                color: '#fff',
                fontSize: 12.5,
                fontWeight: 600,
                padding: '6px 13px',
                borderRadius: 999,
              }}
            >
              {selo}
            </span>
          </nav>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: BRAND.gold,
              color: BRAND.navy,
              fontWeight: 800,
              fontSize: 13,
              padding: '7px 14px',
              borderRadius: 999,
            }}
          >
            {nome} &middot; {preco}
          </div>

          <h1 style={{ fontSize: 40, lineHeight: 1.13, margin: '20px 0 14px', maxWidth: 780, fontWeight: 800 }}>
            {headline}
          </h1>
          <p style={{ fontSize: 19, opacity: 0.93, maxWidth: 700, lineHeight: 1.55 }}>{subheadline}</p>

          <Vsl titulo={`Apresentacao - ${nome}`} legenda={vslLegenda} />

          <a
            href="#inscricao"
            className="wpa-btn"
            style={{
              display: 'inline-block',
              background: BRAND.gradient,
              color: '#fff',
              fontWeight: 800,
              fontSize: 17,
              padding: '16px 32px',
              borderRadius: 999,
              textDecoration: 'none',
              boxShadow: '0 10px 26px rgba(75,63,228,0.4)',
            }}
          >
            {ctaPrincipal}
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13.5, opacity: 0.85, marginTop: 14 }}>
            <span aria-hidden style={{ color: BRAND.gold }}>&#9679;</span>
            {formato}
          </div>
        </div>
      </section>

      {/* DORES — isto é pra você se */}
      <section style={{ background: '#fff', padding: '56px 0' }}>
        <div style={wrap}>
          <h2 style={{ fontSize: 28, marginTop: 0, fontWeight: 800 }}>Isto e pra voce se...</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14 }}>
            {dores.map((d, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 17, color: BRAND.navyLight, lineHeight: 1.5 }}>
                <span aria-hidden style={{ color: BRAND.gold, fontSize: 18 }}>&#9679;</span>
                {d}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS / TRANSFORMAÇÃO */}
      <section style={{ background: BRAND.cream, padding: '56px 0' }}>
        <div style={wrap}>
          <h2 style={{ fontSize: 28, marginTop: 0, fontWeight: 800 }}>O que voce ganha</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 18,
              marginTop: 20,
            }}
          >
            {beneficios.map((b, i) => (
              <div
                key={i}
                style={{
                  border: `1px solid ${BRAND.gold}`,
                  borderRadius: 16,
                  padding: 22,
                  background: '#fff',
                }}
              >
                <h3 style={{ margin: '0 0 8px', fontSize: 18, color: BRAND.navy, fontWeight: 700 }}>{b.titulo}</h3>
                <p style={{ margin: 0, color: BRAND.navyLight, lineHeight: 1.55 }}>{b.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROVA SOCIAL — reviews do Google (placeholder pro David/gbp-escola preencher) */}
      <section style={{ background: '#fff', padding: '56px 0' }}>
        <div style={wrap}>
          <h2 style={{ fontSize: 28, marginTop: 0, fontWeight: 800 }}>O que dizem nossos alunos</h2>
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
              marginTop: 18,
            }}
          >
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                style={{
                  background: BRAND.cream,
                  border: `1px solid ${BRAND.gold}`,
                  borderRadius: 16,
                  padding: 22,
                }}
              >
                <div style={{ color: BRAND.gold, fontSize: 18 }}>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <p style={{ color: BRAND.navyLight, lineHeight: 1.55, fontStyle: 'italic' }}>
                  &ldquo;Espaco reservado para a avaliacao real de um aluno (Google Reviews).&rdquo;
                </p>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Aluno Wise Pro &middot; CSL aprovado</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFERTA + INSCRIÇÃO */}
      <section
        id="inscricao"
        style={{
          background: `linear-gradient(135deg, ${BRAND.navy} 0%, ${BRAND.royal} 100%)`,
          color: '#fff',
          padding: '60px 0',
        }}
      >
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
              <h2 style={{ fontSize: 28, marginTop: 0, fontWeight: 800 }}>O que esta incluso</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
                {incluso.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 11, alignItems: 'flex-start', fontSize: 16.5, lineHeight: 1.5 }}>
                    <span aria-hidden style={{ color: BRAND.gold }}>&#10003;</span>
                    {item}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 22, fontSize: 32, fontWeight: 800, color: BRAND.gold }}>{preco}</div>
              <div style={{ fontSize: 13.5, opacity: 0.85 }}>{formato}</div>
            </div>

            <div
              style={{
                background: '#fff',
                color: BRAND.navy,
                borderRadius: 18,
                padding: 28,
                border: `2px solid ${BRAND.gold}`,
              }}
            >
              <h3 style={{ marginTop: 0, fontSize: 22, fontWeight: 800 }}>Garanta sua vaga</h3>
              <p style={{ color: BRAND.navyLight, marginTop: 0, fontSize: 14.5 }}>
                Preencha seus dados. Voce recebe a confirmacao e as instrucoes da turma.
              </p>
              <LeadForm product={product} cta={ctaForm} />
            </div>
          </div>
        </div>
      </section>

      {/* UPSELL SUTIL */}
      {upsell && (
        <section style={{ background: '#fff', padding: '44px 0' }}>
          <div style={wrap}>
            <div
              style={{
                background: BRAND.cream,
                border: `1px solid ${BRAND.gold}`,
                borderRadius: 16,
                padding: 24,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 14,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ color: BRAND.navyLight, fontSize: 16, maxWidth: 600, lineHeight: 1.5 }}>{upsell.texto}</span>
              <Link
                href={upsell.href}
                className="wpa-btn"
                style={{
                  background: BRAND.gradient,
                  color: '#fff',
                  fontWeight: 800,
                  padding: '12px 22px',
                  borderRadius: 999,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {upsell.rotulo} &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      <footer style={{ background: BRAND.navy, color: '#fff', padding: '36px 0', textAlign: 'center' }}>
        <div style={wrap}>
          <div style={{ fontWeight: 800, fontSize: 17, letterSpacing: 0.5 }}>
            WISE PRO <span style={{ color: BRAND.gold }}>ACADEMY</span>
          </div>
          <div style={{ opacity: 0.7, fontSize: 13, marginTop: 6 }}>{BRAND.domain}</div>
        </div>
      </footer>

      <WhatsAppFloat />
    </main>
  );
}
