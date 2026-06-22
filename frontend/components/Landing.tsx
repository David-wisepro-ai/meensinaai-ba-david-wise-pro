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
export type Professor = { nome: string; papel: string; bio?: string; foto?: string };
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
  imagemTopo?: string; // imagem do tema no lugar do VSL (enquanto o David não grava o vídeo)
  // bloco narrativo de venda (parágrafos longos e persuasivos)
  copyBlocos?: string[];
  dores: string[]; // bloco "isto é pra você se..."
  beneficios: Beneficio[];
  conteudo?: ConteudoItem[]; // grade numerada (o que você vai aprender / como funciona)
  conteudoTitulo?: string;
  // Se vier preenchido, a seção "Professores" substitui a grade de conteúdo.
  professores?: Professor[];
  professoresTitulo?: string;
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

// Iniciais do nome pro placeholder de foto (ex.: "David Piazzarollo" -> "DP").
function iniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return '?';
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}

// Pílula dourada (mesmo átomo da home) — usada como rótulo de seção.
function GoldPill({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        background: 'rgba(201,162,39,0.10)',
        color: BRAND.goldBright,
        border: '1px solid rgba(201,162,39,0.35)',
        padding: '7px 15px',
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
      }}
    >
      {children}
    </span>
  );
}

// Título de seção no padrão da home (peso 900, tracking apertado, branco).
function SectionTitle({ children, center = true }: { children: React.ReactNode; center?: boolean }) {
  return (
    <h2
      style={{
        fontSize: 'clamp(23px, 4.6vw, 32px)',
        lineHeight: 1.15,
        margin: 0,
        fontWeight: 900,
        letterSpacing: '-0.02em',
        color: '#fff',
        textAlign: center ? 'center' : 'left',
      }}
    >
      {children}
    </h2>
  );
}

// Botão âncora que rola até o formulário (#inscricao). Reutilizado ao longo da página.
// 'gold' = CTA dourado cheio (texto ink). 'light' = contorno claro.
function CtaInscricao({ children, variant = 'gold' }: { children: React.ReactNode; variant?: 'gold' | 'light' }) {
  const base: React.CSSProperties = {
    display: 'inline-block',
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 15.5,
    padding: '16px 32px',
    borderRadius: 999,
    textDecoration: 'none',
    letterSpacing: 0.4,
    cursor: 'pointer',
  };
  const styles: React.CSSProperties =
    variant === 'light'
      ? {
          ...base,
          background: 'transparent',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.35)',
        }
      : {
          ...base,
          background: BRAND.goldGradient,
          color: BRAND.ink,
          boxShadow: '0 10px 30px rgba(201,162,39,0.32)',
        };
  return (
    <a href="#inscricao" className={variant === 'light' ? 'wpa-ghost-cta' : 'wpa-gold-cta'} style={styles}>
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
    imagemTopo,
    copyBlocos = [],
    dores,
    beneficios,
    conteudo = [],
    conteudoTitulo = 'O que você vai aprender',
    professores = [],
    professoresTitulo = 'Quem vai te ensinar',
    incluso,
    formato,
    garantia,
    faq = [],
    ctaPrincipal,
    ctaForm,
    upsell,
  } = props;

  return (
    <main style={{ background: BRAND.pageGradient, color: '#fff', minHeight: '100vh' }}>
      <SiteHeader />

      {/* HERO dark premium + VSL no topo. Grid pattern + glow dourado sutil ao fundo. */}
      <section className="wpa-landing-hero" style={{ position: 'relative', overflow: 'hidden', padding: '56px 0 64px' }}>
        {/* textura grid sutil (igual à home) */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
            backgroundSize: '54px 54px',
            maskImage: 'radial-gradient(70% 60% at 50% 20%, #000 0%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(70% 60% at 50% 20%, #000 0%, transparent 80%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ ...wrap, position: 'relative', zIndex: 2 }} className="wpa-wrap">
          <div className="wpa-reveal" style={{ textAlign: 'center' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(201,162,39,0.12)',
                color: BRAND.goldBright,
                border: '1px solid rgba(201,162,39,0.35)',
                fontWeight: 800,
                fontSize: 12.5,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                padding: '7px 15px',
                borderRadius: 999,
              }}
            >
              <span
                className="wpa-dot-pulse"
                aria-hidden
                style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }}
              />
              {selo} &middot; {nome}
            </span>

            <h1
              style={{
                fontSize: 'clamp(28px, 6.4vw, 44px)',
                lineHeight: 1.1,
                margin: '22px auto 16px',
                maxWidth: 820,
                fontWeight: 900,
                letterSpacing: '-0.03em',
              }}
            >
              {headline}
            </h1>
            <p
              style={{
                fontSize: 'clamp(16px, 2.8vw, 19px)',
                color: BRAND.textSoft,
                maxWidth: 700,
                margin: '0 auto',
                lineHeight: 1.7,
              }}
            >
              {subheadline}
            </p>
          </div>

          {/* Imagem do tema na moldura dourada. Sem VSL por enquanto (David começa sem vídeo).
              Quando ele gravar, é só remover `imagemTopo` da página e passar o vídeo no Vsl. */}
          <div
            style={{
              maxWidth: 860,
              margin: '32px auto 0',
              borderRadius: 22,
              padding: 10,
              background: 'linear-gradient(165deg, rgba(201,162,39,0.18), rgba(255,255,255,0.02))',
              border: '1px solid rgba(201,162,39,0.4)',
              boxShadow: '0 26px 70px rgba(0,0,0,0.5)',
            }}
          >
            {imagemTopo ? (
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '56.25%',
                  borderRadius: 14,
                  overflow: 'hidden',
                  border: `1px solid ${BRAND.glassBorder}`,
                  background: BRAND.ink2,
                }}
              >
                <img
                  src={imagemTopo}
                  alt={vslTitulo ?? `Wise Pro Academy — ${nome}`}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            ) : (
              <Vsl titulo={vslTitulo ?? `Apresentação - ${nome}`} legenda={vslLegenda} />
            )}
          </div>

          <div className="wpa-cta-stack" style={{ textAlign: 'center', marginTop: 30 }}>
            <CtaInscricao>{ctaPrincipal}</CtaInscricao>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 9,
                fontSize: 13.5,
                color: BRAND.textMute,
                marginTop: 16,
              }}
            >
              <span aria-hidden style={{ color: BRAND.goldBright }}>&#9679;</span>
              {formato}
            </div>
          </div>
        </div>
      </section>

      {/* COPY DE VENDA — blocos narrativos, painel glass sutil */}
      {copyBlocos.length > 0 && (
        <section className="wpa-landing-section wpa-section-tight" style={{ padding: '20px 0 70px' }}>
          <div style={wrapNarrow} className="wpa-wrap">
            <div
              className="wpa-pad-panel"
              style={{
                background: BRAND.glass,
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: 22,
                padding: '40px 38px',
              }}
            >
              {copyBlocos.map((bloco, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: 'clamp(16px, 2.6vw, 18px)',
                    lineHeight: 1.8,
                    color: BRAND.textSoft,
                    margin: i === copyBlocos.length - 1 ? 0 : '0 0 20px',
                  }}
                >
                  {bloco}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DORES — isto é pra você se (cards glass com check dourado) */}
      <section className="wpa-landing-section wpa-section-tight" style={{ padding: '20px 0 76px' }}>
        <div style={wrap} className="wpa-wrap">
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
            <GoldPill>Para você</GoldPill>
            <div style={{ marginTop: 16 }}>
              <SectionTitle>Isto é pra você se...</SectionTitle>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              marginTop: 30,
              maxWidth: 720,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {dores.map((d, i) => (
              <div
                key={i}
                className="wpa-card"
                style={{
                  display: 'flex',
                  gap: 13,
                  alignItems: 'flex-start',
                  fontSize: 16.5,
                  color: BRAND.textSoft,
                  lineHeight: 1.6,
                  background: BRAND.glass,
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: `1px solid ${BRAND.glassBorder}`,
                  borderRadius: 16,
                  padding: '18px 20px',
                }}
              >
                <span aria-hidden style={{ color: BRAND.goldBright, fontSize: 18, flexShrink: 0, marginTop: 1 }}>&#10003;</span>
                {d}
              </div>
            ))}
          </div>
          <div className="wpa-cta-stack" style={{ textAlign: 'center', marginTop: 34 }}>
            <CtaInscricao>{ctaPrincipal}</CtaInscricao>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS / TRANSFORMAÇÃO — cards glass */}
      <section className="wpa-landing-section wpa-section-tight" style={{ padding: '20px 0 76px' }}>
        <div style={wrap} className="wpa-wrap">
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
            <GoldPill>Transformação</GoldPill>
            <div style={{ marginTop: 16 }}>
              <SectionTitle>O que você ganha</SectionTitle>
            </div>
          </div>
          <div
            className="wpa-grid-1col"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 18,
              marginTop: 34,
            }}
          >
            {beneficios.map((b, i) => (
              <div
                key={i}
                className="wpa-card wpa-pad-card"
                style={{
                  background:
                    'linear-gradient(165deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(201,162,39,0.32)',
                  borderRadius: 18,
                  padding: 26,
                  boxShadow: '0 18px 50px rgba(0,0,0,0.4)',
                }}
              >
                <h3 style={{ margin: '0 0 8px', fontSize: 18, color: '#fff', fontWeight: 800, letterSpacing: '-0.01em' }}>
                  {b.titulo}
                </h3>
                <p style={{ margin: 0, color: BRAND.textSoft, lineHeight: 1.65, fontSize: 15.5 }}>{b.texto}</p>
              </div>
            ))}
          </div>
          <div className="wpa-cta-stack" style={{ textAlign: 'center', marginTop: 36 }}>
            <CtaInscricao>{ctaPrincipal}</CtaInscricao>
          </div>
        </div>
      </section>

      {/* PROFESSORES — cards dark premium (foto + nome + papel + bio). Substitui a grade
          de conteúdo quando a prop "professores" é passada. */}
      {professores.length > 0 && (
        <section className="wpa-landing-section wpa-section-tight" style={{ padding: '20px 0 76px' }}>
          <div style={wrap} className="wpa-wrap">
            <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
              <GoldPill>Professores</GoldPill>
              <div style={{ marginTop: 16 }}>
                <SectionTitle>{professoresTitulo}</SectionTitle>
              </div>
              <p style={{ color: BRAND.textSoft, marginTop: 14, fontSize: 16.5, lineHeight: 1.7 }}>
                Profissionais que já atuam no mercado e dividem com você o que aprenderam na prática.
              </p>
            </div>
            <div
              className="wpa-grid-1col"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 18,
                marginTop: 34,
              }}
            >
              {professores.map((p, i) => (
                <div
                  key={i}
                  className="wpa-card wpa-pad-card"
                  style={{
                    background:
                      'linear-gradient(165deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(201,162,39,0.32)',
                    borderRadius: 18,
                    padding: 26,
                    boxShadow: '0 18px 50px rgba(0,0,0,0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  {p.foto ? (
                    // FOTO real do professor — círculo com borda dourada
                    <img
                      src={p.foto}
                      alt={`Foto de ${p.nome}`}
                      style={{
                        width: 104,
                        height: 104,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid rgba(201,162,39,0.6)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.45)',
                      }}
                    />
                  ) : (
                    // IMAGEM: foto do professor (placeholder até o David enviar) — círculo navy + iniciais douradas
                    <div
                      aria-hidden
                      style={{
                        width: 104,
                        height: 104,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #16335f, #0A1326)',
                        border: '2px solid rgba(201,162,39,0.45)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: BRAND.goldBright,
                        fontWeight: 900,
                        fontSize: 34,
                        letterSpacing: '0.02em',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.45)',
                      }}
                    >
                      {iniciais(p.nome)}
                    </div>
                  )}
                  <h3 style={{ margin: '18px 0 4px', fontSize: 18.5, color: '#fff', fontWeight: 800, letterSpacing: '-0.01em' }}>
                    {p.nome}
                  </h3>
                  <div style={{ color: BRAND.goldBright, fontWeight: 700, fontSize: 14, lineHeight: 1.5 }}>
                    {p.papel}
                  </div>
                  {p.bio ? (
                    <p style={{ margin: '14px 0 0', color: BRAND.textSoft, lineHeight: 1.65, fontSize: 14.5 }}>
                      {p.bio}
                    </p>
                  ) : (
                    <p style={{ margin: '12px 0 0', color: BRAND.textMute, lineHeight: 1.6, fontSize: 13.5, fontStyle: 'italic' }}>
                      Bio em breve.
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="wpa-cta-stack" style={{ textAlign: 'center', marginTop: 36 }}>
              <CtaInscricao>{ctaPrincipal}</CtaInscricao>
            </div>
          </div>
        </section>
      )}

      {/* CONTEÚDO / COMO FUNCIONA — grade numerada (cards glass + número dourado).
          Suprimida quando há professores (a seção acima ocupa o lugar dela). */}
      {professores.length === 0 && conteudo.length > 0 && (
        <section className="wpa-landing-section wpa-section-tight" style={{ padding: '20px 0 76px' }}>
          <div style={wrap} className="wpa-wrap">
            <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
              <GoldPill>Conteúdo</GoldPill>
              <div style={{ marginTop: 16 }}>
                <SectionTitle>{conteudoTitulo}</SectionTitle>
              </div>
            </div>
            <div
              className="wpa-grid-1col"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 16,
                marginTop: 34,
              }}
            >
              {conteudo.map((c, i) => (
                <div
                  key={i}
                  className="wpa-card"
                  style={{
                    background: BRAND.glass,
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 16,
                    padding: '20px 22px',
                    display: 'flex',
                    gap: 14,
                    alignItems: 'flex-start',
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      flexShrink: 0,
                      width: 32,
                      height: 32,
                      borderRadius: 10,
                      background: 'rgba(201,162,39,0.14)',
                      border: '1px solid rgba(201,162,39,0.35)',
                      color: BRAND.goldBright,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                      fontSize: 14,
                    }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 style={{ margin: '0 0 6px', fontSize: 16.5, fontWeight: 800, color: '#fff' }}>{c.titulo}</h3>
                    <p style={{ margin: 0, color: BRAND.textSoft, lineHeight: 1.6, fontSize: 14.5 }}>{c.texto}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="wpa-cta-stack" style={{ textAlign: 'center', marginTop: 36 }}>
              <CtaInscricao>{ctaPrincipal}</CtaInscricao>
            </div>
          </div>
        </section>
      )}

      {/* PROVA SOCIAL — reviews do Google (placeholder pro David/gbp-escola preencher) */}
      <section className="wpa-landing-section wpa-section-tight" style={{ padding: '20px 0 76px' }}>
        <div style={wrap} className="wpa-wrap">
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
            <GoldPill>Prova social</GoldPill>
            <div style={{ marginTop: 16 }}>
              <SectionTitle>O que dizem nossos alunos</SectionTitle>
            </div>
            <p style={{ color: BRAND.textSoft, marginTop: 14, fontSize: 16.5, lineHeight: 1.7 }}>
              Alunos que estudaram com a gente e cresceram na construção em Massachusetts.
            </p>
          </div>
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
              marginTop: 34,
            }}
          >
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="wpa-card wpa-pad-card"
                style={{
                  background: BRAND.glass,
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 18,
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ color: BRAND.goldBright, fontSize: 18 }}>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <p style={{ color: BRAND.textSoft, lineHeight: 1.7, fontStyle: 'italic', fontSize: 15.5, flexGrow: 1, margin: '12px 0 18px' }}>
                  &ldquo;Espaço reservado para a avaliação real de um aluno (Google Reviews).&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span
                    aria-hidden
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #16335f, #2E2ECC)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: 14,
                    }}
                  >
                    WP
                  </span>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 14.5, color: '#fff' }}>Aluno Wise Pro</div>
                    <div style={{ color: BRAND.textMute, fontSize: 13 }}>Massachusetts</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFERTA + FORMULÁRIO DE CAPTURA (id=inscricao) — painel dark premium destacado */}
      <section id="inscricao" className="wpa-landing-section wpa-section-tight" style={{ padding: '20px 0 80px' }}>
        <div style={wrap} className="wpa-wrap">
          <div
            className="wpa-grid-1col wpa-pad-panel"
            style={{
              position: 'relative',
              overflow: 'hidden',
              background:
                'radial-gradient(100% 120% at 100% 0%, rgba(201,162,39,0.16), transparent 55%), linear-gradient(160deg, #0B1A30, #0A1326)',
              color: '#fff',
              borderRadius: 26,
              border: '1px solid rgba(201,162,39,0.4)',
              padding: '48px 42px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 36,
              alignItems: 'start',
              boxShadow: '0 26px 70px rgba(0,0,0,0.5)',
            }}
          >
            <div>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(201,162,39,0.12)',
                  color: BRAND.goldBright,
                  border: '1px solid rgba(201,162,39,0.35)',
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: 0.5,
                  textTransform: 'uppercase',
                  padding: '6px 13px',
                  borderRadius: 999,
                  marginBottom: 18,
                }}
              >
                <span
                  className="wpa-dot-pulse"
                  aria-hidden
                  style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }}
                />
                Inscrições abertas
              </span>
              <h2 style={{ fontSize: 'clamp(22px, 4.4vw, 29px)', marginTop: 0, fontWeight: 900, letterSpacing: '-0.02em', color: '#fff' }}>
                O que está incluso
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 16 }}>
                {incluso.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 11, alignItems: 'flex-start', fontSize: 16, lineHeight: 1.6, color: BRAND.textSoft }}>
                    <span aria-hidden style={{ color: BRAND.goldBright, flexShrink: 0, marginTop: 1 }}>&#10003;</span>
                    {item}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 26, fontSize: 21, fontWeight: 900, color: BRAND.goldBright, letterSpacing: '-0.01em' }}>
                Valores no WhatsApp
              </div>
              <div style={{ fontSize: 13.5, color: BRAND.textMute, marginTop: 4 }}>{formato}</div>
              {garantia && (
                <p style={{ marginTop: 20, fontSize: 15, color: BRAND.textSoft, lineHeight: 1.7, maxWidth: 440 }}>{garantia}</p>
              )}
            </div>

            <div
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                color: '#fff',
                borderRadius: 20,
                padding: 30,
                border: `1px solid ${BRAND.glassBorder}`,
                boxShadow: '0 18px 50px rgba(0,0,0,0.4)',
              }}
            >
              <h3 style={{ marginTop: 0, fontSize: 22, fontWeight: 900, letterSpacing: '-0.01em', color: '#fff' }}>
                Garanta sua vaga
              </h3>
              <p style={{ color: BRAND.textSoft, marginTop: 8, fontSize: 14.5, lineHeight: 1.65 }}>
                Preencha seus dados pra reservar sua vaga. Você recebe a confirmação e as instruções da turma.
              </p>
              <LeadForm product={product} cta={ctaForm} />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — dark premium (igual à home) */}
      {faq.length > 0 && (
        <section className="wpa-landing-section wpa-section-tight" style={{ padding: '20px 0 76px' }}>
          <div style={wrapNarrow} className="wpa-wrap">
            <SectionTitle>Perguntas frequentes</SectionTitle>
            <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {faq.map((item, i) => (
                <details
                  key={i}
                  className="wpa-faq"
                  style={{
                    background: BRAND.glass,
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    borderRadius: 14,
                    padding: '18px 22px',
                  }}
                >
                  <summary
                    style={{
                      fontWeight: 700,
                      fontSize: 16.5,
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 12,
                    }}
                  >
                    {item.q}
                    <span
                      aria-hidden
                      className="wpa-faq-plus"
                      style={{
                        color: BRAND.goldBright,
                        fontSize: 22,
                        fontWeight: 800,
                        transition: 'transform .2s ease',
                        display: 'inline-block',
                      }}
                    >
                      +
                    </span>
                  </summary>
                  <p style={{ color: BRAND.textSoft, lineHeight: 1.7, marginBottom: 0, marginTop: 12, fontSize: 15.5 }}>{item.a}</p>
                </details>
              ))}
            </div>
            <div className="wpa-cta-stack" style={{ textAlign: 'center', marginTop: 36 }}>
              <CtaInscricao>{ctaPrincipal}</CtaInscricao>
            </div>
          </div>
        </section>
      )}

      {/* UPSELL SUTIL — painel glass com CTA dourado */}
      {upsell && (
        <section className="wpa-landing-section wpa-section-tight" style={{ padding: '20px 0 80px' }}>
          <div style={wrap} className="wpa-wrap">
            <div
              className="wpa-upsell-row wpa-pad-card"
              style={{
                background: BRAND.glass,
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: `1px solid ${BRAND.glassBorder}`,
                borderRadius: 18,
                padding: 26,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 16,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ color: BRAND.textSoft, fontSize: 16, maxWidth: 600, lineHeight: 1.6 }}>{upsell.texto}</span>
              <Link
                href={upsell.href}
                className="wpa-gold-cta"
                style={{
                  background: BRAND.goldGradient,
                  color: BRAND.ink,
                  fontWeight: 900,
                  fontSize: 14.5,
                  padding: '13px 24px',
                  borderRadius: 999,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  letterSpacing: 0.3,
                  boxShadow: '0 10px 30px rgba(201,162,39,0.3)',
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
