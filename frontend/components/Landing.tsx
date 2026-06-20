import Link from 'next/link';
import Vsl from './Vsl';
import LeadForm from './LeadForm';
import WhatsAppFloat from './WhatsAppFloat';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import { BRAND } from '../lib/brand';

export type Beneficio = { titulo: string; texto: string };
export type Incluso = string;
export type Upsell = { texto: string; href: string; rotulo: string };
export type ConteudoItem = { titulo: string; texto: string };
export type FaqItem = { q: string; a: string };

export type LandingProps = {
  product: 'project_manager' | 'construtor' | 'wise_day';
  nome: string;
  preco: string;
  selo: string; // ex.: "Porta de entrada", "Curso principal", "Experiência premium"
  headline: string;
  subheadline: string;
  vslTitulo?: string;
  vslLegenda?: string;
  // bloco narrativo de venda (parágrafos longos e persuasivos)
  copyBlocos?: string[];
  dores: string[]; // bloco "isto é pra você se..."
  beneficios: Beneficio[];
  conteudo?: ConteudoItem[]; // grade numerada (o que você vai aprender / como funciona)
  conteudoTitulo?: string;
  incluso: Incluso[];
  formato: string; // resumo do formato (presencial/ao vivo, duração, acesso)
  // frase de fechamento antes do formulário
  garantia?: string;
  faq?: FaqItem[];
  ctaPrincipal: string;
  ctaForm: string;
  upsell?: Upsell;
};

const wrap: React.CSSProperties = { maxWidth: 980, margin: '0 auto', padding: '0 20px' };
const wrapNarrow: React.CSSProperties = { maxWidth: 760, margin: '0 auto', padding: '0 20px' };

// Botão âncora que rola até o formulário (#inscricao). Reutilizado ao longo da página.
function CtaInscricao({ children, variant = 'gold' }: { children: React.ReactNode; variant?: 'gold' | 'light' }) {
  const base: React.CSSProperties = {
    display: 'inline-block',
    fontWeight: 800,
    fontSize: 17,
    padding: '16px 34px',
    borderRadius: 999,
    textDecoration: 'none',
    cursor: 'pointer',
  };
  const styles: React.CSSProperties =
    variant === 'light'
      ? { ...base, background: '#fff', color: BRAND.royal, border: `1px solid ${BRAND.gold}` }
      : { ...base, background: BRAND.gradient, color: '#fff', boxShadow: '0 10px 26px rgba(75,63,228,0.4)' };
  return (
    <a href="#inscricao" className="wpa-btn" style={styles}>
      {children}
    </a>
  );
}

export default function Landing(props: LandingProps) {
  const {
    product,
    nome,
    preco,
    selo,
    headline,
    subheadline,
    vslTitulo,
    vslLegenda,
    copyBlocos = [],
    dores,
    beneficios,
    conteudo = [],
    conteudoTitulo = 'O que você vai aprender',
    incluso,
    formato,
    garantia,
    faq = [],
    ctaPrincipal,
    ctaForm,
    upsell,
  } = props;

  return (
    <main style={{ color: BRAND.navy }}>
      <SiteHeader />

      {/* HERO escuro + VSL no topo */}
      <section
        className="wpa-landing-hero"
        style={{
          background: `linear-gradient(135deg, ${BRAND.navy} 0%, ${BRAND.royal} 100%)`,
          color: '#fff',
          padding: '52px 0 60px',
        }}
      >
        <div style={wrap} className="wpa-wrap">
          <div style={{ textAlign: 'center' }}>
            <span
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
              {selo} &middot; {nome}
            </span>

            <h1 style={{ fontSize: 'clamp(28px, 6.4vw, 40px)', lineHeight: 1.13, margin: '20px auto 14px', maxWidth: 820, fontWeight: 800 }}>
              {headline}
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2.8vw, 19px)', opacity: 0.93, maxWidth: 700, margin: '0 auto', lineHeight: 1.55 }}>
              {subheadline}
            </p>
          </div>

          {/* VSL via Panda Video (placeholder até o David subir o vídeo) */}
          <Vsl titulo={vslTitulo ?? `Apresentação - ${nome}`} legenda={vslLegenda} />

          <div style={{ textAlign: 'center' }}>
            <CtaInscricao>{ctaPrincipal}</CtaInscricao>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 9, fontSize: 13.5, opacity: 0.85, marginTop: 16 }}>
              <span aria-hidden style={{ color: BRAND.gold }}>&#9679;</span>
              {formato}
            </div>
          </div>
        </div>
      </section>

      {/* COPY DE VENDA — blocos narrativos */}
      {copyBlocos.length > 0 && (
        <section className="wpa-landing-section" style={{ background: '#fff', padding: '60px 0' }}>
          <div style={wrapNarrow} className="wpa-wrap">
            {copyBlocos.map((bloco, i) => (
              <p
                key={i}
                style={{
                  fontSize: 'clamp(16px, 2.6vw, 18px)',
                  lineHeight: 1.7,
                  color: BRAND.navyLight,
                  margin: i === 0 ? '0 0 18px' : '0 0 18px',
                }}
              >
                {bloco}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* DORES — isto é pra você se */}
      <section className="wpa-landing-section" style={{ background: BRAND.cream, padding: '56px 0' }}>
        <div style={wrap} className="wpa-wrap">
          <h2 style={{ fontSize: 'clamp(22px, 4.4vw, 28px)', marginTop: 0, fontWeight: 800, textAlign: 'center' }}>Isto é pra você se...</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 22, maxWidth: 720, marginLeft: 'auto', marginRight: 'auto' }}>
            {dores.map((d, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                  fontSize: 17,
                  color: BRAND.navyLight,
                  lineHeight: 1.5,
                  background: '#fff',
                  border: `1px solid ${BRAND.gold}`,
                  borderRadius: 14,
                  padding: '16px 18px',
                }}
              >
                <span aria-hidden style={{ color: BRAND.gold, fontSize: 18 }}>&#9679;</span>
                {d}
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <CtaInscricao>{ctaPrincipal}</CtaInscricao>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS / TRANSFORMAÇÃO */}
      <section className="wpa-landing-section" style={{ background: '#fff', padding: '60px 0' }}>
        <div style={wrap} className="wpa-wrap">
          <h2 style={{ fontSize: 'clamp(22px, 4.4vw, 28px)', marginTop: 0, fontWeight: 800, textAlign: 'center' }}>O que você ganha</h2>
          <div
            className="wpa-grid-1col"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 18,
              marginTop: 30,
            }}
          >
            {beneficios.map((b, i) => (
              <div
                key={i}
                style={{
                  border: `1px solid ${BRAND.gold}`,
                  borderRadius: 16,
                  padding: 24,
                  background: BRAND.cream,
                }}
              >
                <h3 style={{ margin: '0 0 8px', fontSize: 18, color: BRAND.navy, fontWeight: 700 }}>{b.titulo}</h3>
                <p style={{ margin: 0, color: BRAND.navyLight, lineHeight: 1.55 }}>{b.texto}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 34 }}>
            <CtaInscricao>{ctaPrincipal}</CtaInscricao>
          </div>
        </div>
      </section>

      {/* CONTEÚDO / COMO FUNCIONA — grade numerada */}
      {conteudo.length > 0 && (
        <section className="wpa-landing-section" style={{ background: BRAND.cream, padding: '60px 0' }}>
          <div style={wrap} className="wpa-wrap">
            <h2 style={{ fontSize: 'clamp(22px, 4.4vw, 28px)', marginTop: 0, fontWeight: 800, textAlign: 'center' }}>{conteudoTitulo}</h2>
            <div
              className="wpa-grid-1col"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 16,
                marginTop: 30,
              }}
            >
              {conteudo.map((c, i) => (
                <div
                  key={i}
                  style={{
                    background: '#fff',
                    borderRadius: 14,
                    padding: '20px 22px',
                    display: 'flex',
                    gap: 14,
                    alignItems: 'flex-start',
                    boxShadow: '0 2px 10px rgba(10,31,68,0.05)',
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      flexShrink: 0,
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      background: BRAND.gradient,
                      color: '#fff',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: 14,
                    }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 style={{ margin: '0 0 6px', fontSize: 16.5, fontWeight: 700 }}>{c.titulo}</h3>
                    <p style={{ margin: 0, color: BRAND.navyLight, lineHeight: 1.5, fontSize: 14.5 }}>{c.texto}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 34 }}>
              <CtaInscricao>{ctaPrincipal}</CtaInscricao>
            </div>
          </div>
        </section>
      )}

      {/* PROVA SOCIAL — reviews do Google (placeholder pro David/gbp-escola preencher) */}
      <section className="wpa-landing-section" style={{ background: '#fff', padding: '60px 0' }}>
        <div style={wrap} className="wpa-wrap">
          <h2 style={{ fontSize: 'clamp(22px, 4.4vw, 28px)', marginTop: 0, fontWeight: 800, textAlign: 'center' }}>O que dizem nossos alunos</h2>
          <p style={{ color: BRAND.navyLight, marginTop: 10, textAlign: 'center' }}>
            Alunos que estudaram com a gente e cresceram na construção em Massachusetts.
          </p>
          {/*
            REVIEWS REAIS DO GOOGLE ENTRAM AQUI.
            David / squad gbp-escola: substituir os 3 cards abaixo por reviews verdadeiras
            (nome do aluno, nota, texto). Não inventar depoimento — usar somente reviews reais.
          */}
          <div
            className="wpa-grid-1col"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 18,
              marginTop: 28,
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
                  &ldquo;Espaço reservado para a avaliação real de um aluno (Google Reviews).&rdquo;
                </p>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Aluno Wise Pro</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFERTA + FORMULÁRIO DE CAPTURA (id=inscricao) */}
      <section
        id="inscricao"
        className="wpa-landing-section"
        style={{
          background: `linear-gradient(135deg, ${BRAND.navy} 0%, ${BRAND.royal} 100%)`,
          color: '#fff',
          padding: '64px 0',
        }}
      >
        <div style={wrap} className="wpa-wrap">
          <div
            className="wpa-grid-1col"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 32,
              alignItems: 'start',
            }}
          >
            <div>
              <span
                style={{
                  display: 'inline-block',
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.24)',
                  color: '#fff',
                  fontSize: 12.5,
                  fontWeight: 700,
                  padding: '6px 13px',
                  borderRadius: 999,
                  marginBottom: 16,
                }}
              >
                Inscrições abertas
              </span>
              <h2 style={{ fontSize: 'clamp(22px, 4.4vw, 28px)', marginTop: 0, fontWeight: 800 }}>O que está incluso</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
                {incluso.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 11, alignItems: 'flex-start', fontSize: 16.5, lineHeight: 1.5 }}>
                    <span aria-hidden style={{ color: BRAND.gold }}>&#10003;</span>
                    {item}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24, fontSize: 20, fontWeight: 800, color: BRAND.gold }}>Valores no WhatsApp</div>
              <div style={{ fontSize: 13.5, opacity: 0.85 }}>{formato}</div>
              {garantia && (
                <p style={{ marginTop: 18, fontSize: 15.5, opacity: 0.92, lineHeight: 1.6, maxWidth: 420 }}>{garantia}</p>
              )}
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
              <p style={{ color: BRAND.navyLight, marginTop: 0, fontSize: 14.5, lineHeight: 1.6 }}>
                Preencha seus dados pra reservar sua vaga. Você recebe a confirmação e as instruções da turma.
              </p>
              <LeadForm product={product} cta={ctaForm} />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faq.length > 0 && (
        <section className="wpa-landing-section" style={{ background: '#fff', padding: '60px 0' }}>
          <div style={wrapNarrow} className="wpa-wrap">
            <h2 style={{ fontSize: 'clamp(22px, 4.4vw, 28px)', marginTop: 0, fontWeight: 800, textAlign: 'center' }}>Perguntas frequentes</h2>
            <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {faq.map((item, i) => (
                <details
                  key={i}
                  style={{
                    background: BRAND.cream,
                    border: `1px solid ${BRAND.gold}`,
                    borderRadius: 14,
                    padding: '18px 22px',
                  }}
                >
                  <summary
                    style={{
                      fontWeight: 700,
                      fontSize: 16.5,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 12,
                    }}
                  >
                    {item.q}
                    <span aria-hidden style={{ color: BRAND.gold, fontSize: 20, fontWeight: 800 }}>+</span>
                  </summary>
                  <p style={{ color: BRAND.navyLight, lineHeight: 1.6, marginBottom: 0, fontSize: 15.5 }}>{item.a}</p>
                </details>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 34 }}>
              <CtaInscricao>{ctaPrincipal}</CtaInscricao>
            </div>
          </div>
        </section>
      )}

      {/* UPSELL SUTIL */}
      {upsell && (
        <section style={{ background: BRAND.cream, padding: '44px 0' }}>
          <div style={wrap} className="wpa-wrap">
            <div
              className="wpa-upsell-row"
              style={{
                background: '#fff',
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

      <SiteFooter />

      <WhatsAppFloat />
    </main>
  );
}
