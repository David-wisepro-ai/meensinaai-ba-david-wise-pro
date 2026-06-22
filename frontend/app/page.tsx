import Link from 'next/link';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import Marquee from '../components/Marquee';
import WhatsAppFloat from '../components/WhatsAppFloat';
import StatBand from '../components/StatBand';
import { Stars } from '../components/Avatars';
import { BRAND, WHATSAPP_URL, PRODUCTS } from '../lib/brand';

export const metadata = {
  title: 'Wise Pro Academy | Cursos de Construção e CSL para Brasileiros nos EUA',
  description:
    'A escola que prepara brasileiros para crescer e se profissionalizar na construção civil dos Estados Unidos. Curso de Project Manager e Curso de Construtor (CSL), em português, em Massachusetts, com quem já fez acontecer no mercado americano.',
};

// SEO: schema EducationalOrganization. Endereço/telefone ficam fora até o David confirmar.
const schema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Wise Pro Academy',
  url: 'https://wiseproacademy.io',
  description:
    'Escola de preparação para a construção civil dos Estados Unidos, em português, para brasileiros. Cursos de Project Manager e Construtor (CSL) em Massachusetts.',
  areaServed: 'United States',
  knowsLanguage: ['pt-BR', 'en-US'],
};

const wrap: React.CSSProperties = { maxWidth: 1140, margin: '0 auto', padding: '0 20px' };
const wrapNarrow: React.CSSProperties = { maxWidth: 960, margin: '0 auto', padding: '0 20px' };

// ---------- átomos visuais (dark premium) ----------

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

function TagPill({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: 'inline-block',
        background: 'rgba(255,255,255,0.05)',
        color: 'rgba(255,255,255,0.88)',
        border: '1px solid rgba(255,255,255,0.12)',
        padding: '7px 14px',
        borderRadius: 999,
        fontSize: 13.5,
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  );
}

function SectionTitle({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <h2
      style={{
        fontSize: 'clamp(24px, 4.6vw, 33px)',
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

// CTA dourado cheio
const goldCta: React.CSSProperties = {
  display: 'inline-block',
  textAlign: 'center',
  background: BRAND.goldGradient,
  color: BRAND.ink,
  fontWeight: 900,
  fontSize: 15.5,
  padding: '16px 30px',
  borderRadius: 999,
  textDecoration: 'none',
  letterSpacing: 0.4,
  boxShadow: '0 10px 30px rgba(201,162,39,0.32)',
};

// CTA contorno claro
const ghostCta: React.CSSProperties = {
  display: 'inline-block',
  textAlign: 'center',
  background: 'transparent',
  color: '#fff',
  fontWeight: 800,
  fontSize: 15.5,
  padding: '16px 30px',
  borderRadius: 999,
  textDecoration: 'none',
  border: '1px solid rgba(255,255,255,0.35)',
  letterSpacing: 0.4,
};

// ---------- dados ----------

const MARQUEE_ITEMS = [
  'Project Manager',
  'Curso de Construtor',
  'CSL em Massachusetts',
  'Portal de simulados',
  'Construção nos EUA',
  'Em português',
];

// As 2 categorias de oferta da escola (cada uma com suas opções). Cards grandes na seção #cursos.
const CATEGORIAS = [
  {
    titulo: 'Construction Project Manager',
    objetivo:
      'Prepare-se para atuar como Project Manager na construção civil dos Estados Unidos: gestão de obra, plantas, permits e liderança de equipes.',
    icon: '🧭',
    selo: 'Porta de entrada',
    opcoes: [
      {
        nome: 'Curso Preparatório (On-line)',
        formato: 'Curso preparatório',
        chamada:
          'Aulas ao vivo, em português, para você sair da execução pesada e aprender a gerir a obra, ler plantas, lidar com permits e liderar equipes. Acesso por 1 ano.',
        href: `/${PRODUCTS.project_manager.slug}`,
      },
      {
        nome: 'Wise Day — Experiência na prática (Presencial)',
        formato: 'Presencial',
        chamada:
          'Um dia inteiro presencial com o David, na prática, resolvendo as suas dúvidas reais de obra, permit e código. Para quem quer acelerar com atenção direta.',
        href: `/${PRODUCTS.wise_day.slug}`,
      },
    ],
  },
  {
    titulo: 'Construction Supervisor License (CSL)',
    objetivo:
      'Prepare-se para tirar a sua licença de construtor em Massachusetts. O mesmo conteúdo nos dois formatos, mais o portal de simulados que treina você até passar.',
    icon: '🏗️',
    selo: 'Curso principal',
    opcoes: [
      {
        nome: 'Curso Preparatório — 5 dias on-line',
        formato: 'On-line',
        chamada:
          'Turma online de segunda a sexta, das 6 PM às 9 PM (horário de Massachusetts). Em português, mais o portal de simulados com 598 questões originais ancoradas no código.',
        href: `/${PRODUCTS.construtor.slug}`,
      },
      {
        nome: 'Curso Preparatório — 4 dias presencial',
        formato: 'Presencial',
        chamada:
          'Turma presencial em 4 sábados, das 7:30 AM às 12 PM (horário de Massachusetts). O mesmo conteúdo, mais o portal de simulados que faz o aluno passar na prova de CSL.',
        href: `/${PRODUCTS.construtor.slug}`,
      },
    ],
  },
];

const NAO_E = [
  'Não é promessa de dinheiro fácil',
  'Não é enriquecimento rápido',
  'Não promete emprego garantido',
  'Não promete visto ou imigração',
  'Não substitui documentação ou licenças exigidas',
];

const O_QUE_E = [
  'Preparação prática para a construção nos EUA',
  'Clareza sobre a rotina e a gestão de obras',
  'Caminho organizado até a sua licença de CSL',
  'Visão profissional para organização e liderança',
  'Direção para se posicionar melhor no mercado',
];

// Prova social — placeholders. REVIEWS: David/squad SEO sobem os reviews reais do Google aqui.
const REVIEWS = [
  {
    nome: 'Aluno Wise Pro',
    cidade: 'Massachusetts',
    texto:
      'Espaço reservado para uma avaliação real do Google. O squad de SEO conecta os reviews da escola aqui.',
  },
  {
    nome: 'Aluno Wise Pro',
    cidade: 'Massachusetts',
    texto:
      'Espaço reservado para uma avaliação real do Google. O squad de SEO conecta os reviews da escola aqui.',
  },
  {
    nome: 'Aluno Wise Pro',
    cidade: 'Massachusetts',
    texto:
      'Espaço reservado para uma avaliação real do Google. O squad de SEO conecta os reviews da escola aqui.',
  },
];

const FAQ = [
  {
    q: 'O que é a Wise Pro Academy?',
    a: 'É uma escola que prepara brasileiros para crescer e se profissionalizar na construção civil dos Estados Unidos. Todo o conteúdo é em português e baseado na vida real da obra americana, com foco em quem atua em Massachusetts.',
  },
  {
    q: 'Quais cursos a escola oferece?',
    a: 'Dois cursos preparatórios e uma experiência premium. O Project Manager é a porta de entrada, focado em gestão de obra. O Curso de Construtor é o principal: prepara você para a licença de CSL em Massachusetts e libera o portal de simulados. Além deles, o Wise Day é uma imersão de 1 dia presencial com o David.',
  },
  {
    q: 'A Wise Pro Academy emite a licença de CSL?',
    a: 'Não. Somos uma escola preparatória. Preparamos você para a prova de Construction Supervisor License e para a rotina da construção nos EUA. A licença é emitida pelo órgão oficial de Massachusetts.',
  },
  {
    q: 'Por qual curso eu começo?',
    a: 'Se você está começando, o Project Manager é a porta de entrada. Se o seu objetivo é a licença, o Curso de Construtor com o portal de simulados é o caminho. O Wise Day é para quem quer um dia inteiro presencial com o David, resolvendo dúvidas reais de obra.',
  },
  {
    q: 'Quem dá as aulas?',
    a: 'As aulas são conduzidas por David Piazzarollo, com mais de 10 anos no mercado americano da construção e CSL aprovada. Fábio Borges entra como professor convidado para mostrar aplicações práticas de IA nos negócios.',
  },
];

// ---------- página ----------

export default function Home() {
  return (
    <main style={{ background: BRAND.pageGradient, color: '#fff', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <SiteHeader />

      {/* HERO split (texto + foto). Grid pattern + glow dourado sutil ao fundo. */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        {/* textura grid sutil */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
            backgroundSize: '54px 54px',
            maskImage: 'radial-gradient(70% 60% at 50% 30%, #000 0%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(70% 60% at 50% 30%, #000 0%, transparent 80%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            ...wrap,
            padding: '70px 20px 84px',
            position: 'relative',
            zIndex: 2,
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
            gap: 48,
            alignItems: 'center',
          }}
          className="wpa-hero-grid wpa-hero-section"
        >
          {/* Coluna texto */}
          <div className="wpa-reveal">
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
              <GoldPill>
                <span
                  className="wpa-dot-pulse"
                  aria-hidden
                  style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }}
                />
                Escola em operação
              </GoldPill>
              <GoldPill>Massachusetts &middot; em português</GoldPill>
            </div>

            <h1
              style={{
                fontSize: 'clamp(30px, 7vw, 50px)',
                lineHeight: 1.08,
                margin: '0 0 20px',
                fontWeight: 900,
                letterSpacing: '-0.03em',
              }}
            >
              A escola que prepara brasileiros para crescer na{' '}
              <span style={{ color: BRAND.goldBright }}>construção civil dos Estados Unidos</span>.
            </h1>

            <p style={{ fontSize: 'clamp(16px, 2.6vw, 18.5px)', lineHeight: 1.7, maxWidth: 560, color: BRAND.textSoft, margin: 0 }}>
              Da gestão de obras à conquista da sua licença de CSL em Massachusetts. Tudo em português,
              com conteúdo prático e com quem já faz acontecer no mercado americano.
            </p>

            <div className="wpa-hero-ctas" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 32 }}>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background: '#25D366',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: 16,
                  letterSpacing: 0.3,
                  padding: '16px 32px',
                  borderRadius: 999,
                  textDecoration: 'none',
                  boxShadow: '0 12px 30px rgba(37,211,102,0.35)',
                }}
              >
                <span aria-hidden style={{ fontSize: 18 }}>&#9742;</span> Falar no WhatsApp
              </a>
            </div>
          </div>

          {/* Coluna foto (placeholder elegante) */}
          {/* IMAGEM: foto do David — substituir o bloco com gradiente abaixo por <Image>. */}
          <div className="wpa-reveal wpa-hero-photo" style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                aspectRatio: '4 / 5',
                borderRadius: 24,
                background:
                  'radial-gradient(120% 80% at 70% 0%, rgba(201,162,39,0.22), transparent 60%), linear-gradient(160deg, #16335f 0%, #0A1326 70%)',
                border: '1px solid rgba(201,162,39,0.4)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: 24,
                overflow: 'hidden',
              }}
            >
              <img
                src="/david-plantas.jpg"
                alt="David Piazzarollo, fundador da Wise Pro Academy"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <div
                style={{
                  width: '100%',
                  background: 'rgba(8,13,26,0.55)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 16,
                  padding: '16px 18px',
                }}
              >
                <div style={{ fontWeight: 900, fontSize: 17, color: '#fff' }}>David Piazzarollo</div>
                <div style={{ color: BRAND.goldBright, fontSize: 13.5, fontWeight: 700, marginTop: 2 }}>
                  +10 anos no mercado americano &middot; CSL aprovada
                </div>
              </div>
            </div>
            {/* selo flutuante */}
            <div
              style={{
                position: 'absolute',
                top: -14,
                right: -8,
                background: 'rgba(8,13,26,0.85)',
                border: '1px solid rgba(201,162,39,0.45)',
                borderRadius: 999,
                padding: '8px 14px',
                fontSize: 12.5,
                fontWeight: 800,
                color: BRAND.goldBright,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
              }}
            >
              <span
                className="wpa-dot-pulse"
                aria-hidden
                style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }}
              />
              ESCOLA EM OPERAÇÃO
            </div>
          </div>
        </div>
      </section>

      {/* FAIXA DE NÚMEROS */}
      <StatBand />

      {/* POR QUE A ESCOLA / AUTORIDADE — David Piazzarollo */}
      <section id="professor" className="wpa-section" style={{ padding: '80px 0' }}>
        <div style={wrap} className="wpa-wrap">
          <GoldPill>Por que a Wise Pro Academy</GoldPill>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(240px, 360px) 1fr',
              gap: 44,
              alignItems: 'start',
              marginTop: 24,
            }}
            className="wpa-hero-grid"
          >
            {/* Foto do David (placeholder) */}
            {/* IMAGEM: David sobe a foto dele em moldura — trocar este bloco. */}
            <div
              style={{
                position: 'relative',
                aspectRatio: '4 / 5',
                borderRadius: 20,
                border: '1px solid rgba(201,162,39,0.4)',
                boxShadow: '0 26px 70px rgba(0,0,0,0.5)',
                overflow: 'hidden',
              }}
            >
              <img
                src="/david-seminario.jpg"
                alt="David Piazzarollo apresentando um seminário da Wise Pro Academy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div>
              <h2 style={{ fontSize: 'clamp(24px, 4.4vw, 31px)', margin: '0 0 18px', fontWeight: 900, letterSpacing: '-0.02em' }}>
                Uma escola criada por quem viveu a obra de verdade
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: BRAND.textSoft }}>
                Quem conduz a escola é{' '}
                <strong style={{ color: '#fff' }}>David Piazzarollo</strong>, com mais de 10 anos no
                mercado americano da construção. Ele começou como imigrante, sem experiência,
                trabalhando na execução pesada da obra.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: BRAND.textSoft }}>
                David passou na prova de CSL, construiu a própria carteira de clientes diretos e hoje
                ensina o caminho que ele mesmo percorreu. Por isso o conteúdo é prático, em português e
                baseado na vida real da construção nos Estados Unidos.
              </p>

              {/* Card de autoridade (Google) — glass */}
              <div
                style={{
                  background: BRAND.glass,
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(201,162,39,0.35)',
                  borderRadius: 16,
                  padding: 22,
                  margin: '22px 0',
                  display: 'flex',
                  gap: 16,
                  alignItems: 'flex-start',
                }}
              >
                <span aria-hidden style={{ fontSize: 30, fontWeight: 900, lineHeight: 1 }}>
                  <span style={{ color: '#4285F4' }}>G</span>
                </span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 16.5, lineHeight: 1.4, color: '#fff' }}>
                    +10 anos no mercado americano e CSL aprovada.
                  </div>
                  <div style={{ color: BRAND.textSoft, marginTop: 6, fontSize: 14.5 }}>
                    Empresa de construção com mais de 86 avaliações 5 estrelas no Google.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', marginBottom: 18 }}>
                {['OSHA', 'CSL License', 'Construção nos EUA', 'Gestão de obras'].map((t) => (
                  <TagPill key={t}>{t}</TagPill>
                ))}
              </div>

              <div
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderLeft: `3px solid ${BRAND.goldBright}`,
                  borderRadius: 10,
                  padding: '16px 18px',
                  fontWeight: 700,
                  fontSize: 16,
                  marginTop: 8,
                  color: '#fff',
                }}
              >
                Sem teoria vazia. Conteúdo baseado na vida real da construção civil americana.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NOSSOS CURSOS — 2 cards grandes (id=cursos) */}
      <section id="cursos" className="wpa-section" style={{ padding: '80px 0' }}>
        <div style={wrap} className="wpa-wrap">
          <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
            <GoldPill>Nossos cursos</GoldPill>
            <h2
              style={{
                fontSize: 'clamp(24px, 4.8vw, 34px)',
                lineHeight: 1.15,
                margin: '18px 0 0',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                color: '#fff',
              }}
            >
              Dois caminhos, cada um com a sua opção
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: BRAND.textSoft, marginTop: 14 }}>
              Escolha entre se preparar para atuar como Project Manager na construção dos EUA ou para
              tirar a sua licença de CSL em Massachusetts. Em cada caminho você escolhe o formato que
              combina com você.
            </p>
          </div>

          <div
            className="wpa-grid-1col"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
              gap: 26,
              marginTop: 44,
              maxWidth: 960,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {CATEGORIAS.map((cat) => (
              <div
                key={cat.titulo}
                className="wpa-card wpa-pad-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background:
                    'linear-gradient(165deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  color: '#fff',
                  border: '1px solid rgba(201,162,39,0.32)',
                  borderRadius: 22,
                  padding: 34,
                  boxShadow: '0 18px 50px rgba(0,0,0,0.4)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                  <span
                    aria-hidden
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 12,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(201,162,39,0.12)',
                      border: '1px solid rgba(201,162,39,0.35)',
                      fontSize: 22,
                    }}
                  >
                    {cat.icon}
                  </span>
                  <span
                    style={{
                      background: 'rgba(201,162,39,0.14)',
                      color: BRAND.goldBright,
                      border: '1px solid rgba(201,162,39,0.35)',
                      fontSize: 12,
                      fontWeight: 800,
                      padding: '5px 12px',
                      borderRadius: 999,
                      letterSpacing: 0.4,
                      textTransform: 'uppercase',
                    }}
                  >
                    {cat.selo}
                  </span>
                </div>
                <h3 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 900, letterSpacing: '-0.02em' }}>
                  {cat.titulo}
                </h3>
                <p style={{ margin: '0 0 22px', color: BRAND.textSoft, lineHeight: 1.65, fontSize: 15.5 }}>
                  {cat.objetivo}
                </p>

                {/* Opções da categoria (mini-cards) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flexGrow: 1 }}>
                  {cat.opcoes.map((op) => (
                    <div
                      key={op.nome}
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: 16,
                        padding: '18px 20px',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <span
                        style={{
                          alignSelf: 'flex-start',
                          background: 'rgba(201,162,39,0.12)',
                          color: BRAND.goldBright,
                          border: '1px solid rgba(201,162,39,0.30)',
                          fontSize: 11,
                          fontWeight: 800,
                          padding: '3px 10px',
                          borderRadius: 999,
                          marginBottom: 10,
                          letterSpacing: 0.4,
                          textTransform: 'uppercase',
                        }}
                      >
                        {op.formato}
                      </span>
                      <div style={{ fontWeight: 800, fontSize: 16.5, color: '#fff', lineHeight: 1.35 }}>
                        {op.nome}
                      </div>
                      <p style={{ margin: '8px 0 14px', color: BRAND.textSoft, lineHeight: 1.6, fontSize: 14.5 }}>
                        {op.chamada}
                      </p>
                      <Link
                        href={op.href}
                        style={{
                          marginTop: 'auto',
                          alignSelf: 'flex-start',
                          color: BRAND.goldBright,
                          fontWeight: 800,
                          fontSize: 14.5,
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        Saber mais &rarr;
                      </Link>
                    </div>
                  ))}
                </div>

                <div style={{ color: BRAND.goldBright, fontWeight: 800, fontSize: 15, marginTop: 22 }}>
                  Valores no WhatsApp
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIAL — portal de simulados (item-rei) */}
      <section className="wpa-section-tight" style={{ padding: '20px 0 80px' }}>
        <div style={wrapNarrow} className="wpa-wrap">
          <div
            className="wpa-grid-1col wpa-pad-panel"
            style={{
              position: 'relative',
              background:
                'radial-gradient(100% 120% at 100% 0%, rgba(201,162,39,0.16), transparent 55%), linear-gradient(160deg, #0B1A30, #0A1326)',
              color: '#fff',
              borderRadius: 26,
              border: '1px solid rgba(201,162,39,0.4)',
              padding: '48px 42px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 34,
              alignItems: 'center',
              boxShadow: '0 26px 70px rgba(0,0,0,0.5)',
              overflow: 'hidden',
            }}
          >
            <div>
              <GoldPill>O diferencial da escola</GoldPill>
              <h2
                style={{
                  fontSize: 'clamp(23px, 4.4vw, 30px)',
                  lineHeight: 1.15,
                  margin: '18px 0 12px',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                }}
              >
                O portal de simulados que te aprova na CSL
              </h2>
              <p style={{ fontSize: 16.5, lineHeight: 1.7, color: BRAND.textSoft }}>
                Incluso no Curso de Construtor: um portal com{' '}
                <strong style={{ color: BRAND.goldBright }}>598 questões originais</strong>, ancoradas
                no código oficial, que treinam você até a aprovação. A aula te ensina; o portal te
                aprova.
              </p>
              <Link
                href={`/${PRODUCTS.construtor.slug}`}
                className="wpa-gold-cta"
                style={{ ...goldCta, marginTop: 24, fontSize: 15, padding: '14px 26px' }}
              >
                Ver o Curso de Construtor &rarr;
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                ['598', 'questões originais ancoradas no código'],
                ['100%', 'em português, treinando o vocabulário técnico'],
                ['1', 'caminho organizado até a sua aprovação'],
              ].map(([num, desc]) => (
                <div
                  key={desc}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 14,
                    padding: '16px 18px',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 12,
                  }}
                >
                  <span style={{ color: BRAND.goldBright, fontWeight: 900, fontSize: 26, lineHeight: 1 }}>
                    {num}
                  </span>
                  <span style={{ fontSize: 14.5, color: BRAND.textSoft, lineHeight: 1.45 }}>{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee items={MARQUEE_ITEMS} />

      {/* PROVA SOCIAL — reviews placeholder */}
      <section className="wpa-section" style={{ padding: '80px 0' }}>
        <div style={wrap} className="wpa-wrap">
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
            <GoldPill>Prova social</GoldPill>
            <h2
              style={{
                fontSize: 'clamp(24px, 4.8vw, 34px)',
                lineHeight: 1.15,
                margin: '18px 0 0',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                color: '#fff',
              }}
            >
              Quem aprende com a gente recomenda
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: BRAND.textSoft, marginTop: 14 }}>
              Avaliações reais dos alunos e da empresa de construção do David no Google.
            </p>
          </div>

          {/* REVIEWS: squad de SEO / GBP conecta os reviews reais do Google aqui. */}
          <div
            className="wpa-grid-1col"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 22,
              marginTop: 38,
            }}
          >
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                className="wpa-card"
                style={{
                  background: BRAND.glass,
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 18,
                  padding: 26,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Stars size={17} />
                <p style={{ margin: '12px 0 18px', color: BRAND.textSoft, lineHeight: 1.7, fontSize: 15.5, flexGrow: 1 }}>
                  {r.texto}
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
                    <div style={{ fontWeight: 800, fontSize: 15, color: '#fff' }}>{r.nome}</div>
                    <div style={{ color: BRAND.textMute, fontSize: 13.5 }}>{r.cidade}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLAREZA ANTES DE ENTRAR */}
      <section className="wpa-section-tight" style={{ padding: '20px 0 80px' }}>
        <div style={wrap} className="wpa-wrap">
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
            <SectionTitle center>Clareza antes de entrar</SectionTitle>
            <p style={{ fontSize: 17, color: BRAND.textSoft, marginTop: 12 }}>
              O que a escola é, e o que não é.
            </p>
          </div>
          <div
            className="wpa-grid-1col"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 22,
              marginTop: 34,
            }}
          >
            <div
              style={{
                background: 'rgba(184,71,74,0.08)',
                border: '1px solid rgba(184,71,74,0.35)',
                borderRadius: 16,
                padding: 26,
              }}
            >
              <div style={{ fontWeight: 800, color: '#f08a8c', marginBottom: 14, fontSize: 17 }}>O que NÃO é</div>
              {NAO_E.map((t) => (
                <div key={t} style={{ display: 'flex', gap: 10, padding: '7px 0', color: BRAND.textSoft }}>
                  <span aria-hidden style={{ color: '#f08a8c' }}>&#10007;</span>
                  {t}
                </div>
              ))}
            </div>
            <div
              style={{
                background: 'rgba(74,222,128,0.06)',
                border: '1px solid rgba(201,162,39,0.35)',
                borderRadius: 16,
                padding: 26,
              }}
            >
              <div style={{ fontWeight: 800, color: '#5ee08f', marginBottom: 14, fontSize: 17 }}>O que É</div>
              {O_QUE_E.map((t) => (
                <div key={t} style={{ display: 'flex', gap: 10, padding: '7px 0', color: BRAND.textSoft }}>
                  <span aria-hidden style={{ color: '#5ee08f' }}>&#10003;</span>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="wpa-section-tight" style={{ padding: '20px 0 80px' }}>
        <div style={wrapNarrow} className="wpa-wrap">
          <SectionTitle center>Perguntas frequentes</SectionTitle>
          <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQ.map((item, i) => (
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
                <p style={{ color: BRAND.textSoft, lineHeight: 1.7, marginBottom: 0, marginTop: 12, fontSize: 15.5 }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="wpa-section-tight" style={{ padding: '20px 0 90px' }}>
        <div style={wrapNarrow} className="wpa-wrap">
          <div
            className="wpa-pad-panel"
            style={{
              position: 'relative',
              overflow: 'hidden',
              textAlign: 'center',
              borderRadius: 26,
              border: '1px solid rgba(201,162,39,0.4)',
              background:
                'radial-gradient(90% 130% at 50% 0%, rgba(201,162,39,0.18), transparent 55%), linear-gradient(160deg, #0B1A30, #0A1326)',
              padding: '60px 32px',
              boxShadow: '0 26px 70px rgba(0,0,0,0.5)',
            }}
          >
            <h2 style={{ fontSize: 'clamp(24px, 4.8vw, 33px)', lineHeight: 1.15, margin: 0, fontWeight: 900, letterSpacing: '-0.02em', color: '#fff' }}>
              Dê o próximo passo na construção dos EUA
            </h2>
            <p
              style={{
                fontSize: 17.5,
                lineHeight: 1.7,
                color: BRAND.textSoft,
                marginTop: 16,
                maxWidth: 620,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Escolha o seu curso ou fale com a gente no WhatsApp. A escola está em operação e pronta
              para te receber.
            </p>
            <div className="wpa-cta-stack" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginTop: 32 }}>
              <a href="#cursos" className="wpa-gold-cta" style={goldCta}>
                VER OS CURSOS
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="wpa-ghost-cta"
                style={ghostCta}
              >
                FALAR NO WHATSAPP
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />

      <WhatsAppFloat />
    </main>
  );
}
