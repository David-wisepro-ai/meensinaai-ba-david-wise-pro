import Link from 'next/link';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import Marquee from '../components/Marquee';
import WhatsAppFloat from '../components/WhatsAppFloat';
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

// ---------- átomos visuais ----------

function GoldPill({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        background: dark ? 'rgba(255,255,255,0.10)' : BRAND.lilac,
        color: dark ? '#fff' : BRAND.navy,
        border: dark ? '1px solid rgba(255,255,255,0.25)' : 'none',
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

function TagPill({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: 'inline-block',
        background: BRAND.lilac,
        color: BRAND.navy,
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
        fontSize: 32,
        lineHeight: 1.15,
        margin: 0,
        fontWeight: 800,
        textAlign: center ? 'center' : 'left',
      }}
    >
      {children}
    </h2>
  );
}

// ---------- dados ----------

const MARQUEE_ITEMS = [
  'Project Manager',
  'Curso de Construtor',
  'CSL em Massachusetts',
  'Portal de simulados',
  'Construção nos EUA',
  'Em português',
];

// Os 2 cursos da escola. Cards grandes na seção #cursos.
const CURSOS = [
  {
    nome: PRODUCTS.project_manager.name,
    preco: PRODUCTS.project_manager.price,
    selo: 'Porta de entrada',
    chamada:
      'O primeiro passo pra sair da execução pesada e aprender a gerir obra nos Estados Unidos. Aulas ao vivo, em português, com acesso por 1 ano.',
    href: `/${PRODUCTS.project_manager.slug}`,
    rotulo: 'Conhecer o Project Manager',
  },
  {
    nome: PRODUCTS.construtor.name,
    preco: PRODUCTS.construtor.price,
    selo: 'Curso principal',
    chamada:
      'Tire a sua licença de CSL em Massachusetts com 6 dias presenciais mais o portal de simulados com 598 questões. A aula te ensina; o portal te aprova.',
    href: `/${PRODUCTS.construtor.slug}`,
    rotulo: 'Conhecer o Curso de Construtor',
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
    a: 'Dois cursos. O Project Manager é a porta de entrada, focado em gestão de obra. O Curso de Construtor é o principal: prepara você para a licença de CSL em Massachusetts e libera o portal de simulados.',
  },
  {
    q: 'A Wise Pro Academy emite a licença de CSL?',
    a: 'Não. Somos uma escola preparatória. Preparamos você para a prova de Construction Supervisor License e para a rotina da construção nos EUA. A licença é emitida pelo órgão oficial de Massachusetts.',
  },
  {
    q: 'Por qual curso eu começo?',
    a: 'Se você está começando, o Project Manager é a porta de entrada. Se o seu objetivo é a licença, o Curso de Construtor com o portal de simulados é o caminho.',
  },
  {
    q: 'Quem dá as aulas?',
    a: 'As aulas são conduzidas por David Piazzarollo, com mais de 10 anos no mercado americano da construção e CSL aprovada. Fábio Borges entra como professor convidado para mostrar aplicações práticas de IA nos negócios.',
  },
];

// ---------- página ----------

export default function Home() {
  return (
    <main style={{ color: BRAND.navy }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <SiteHeader />

      {/* HERO institucional escuro */}
      {/* IMAGEM: David sobe a foto de fundo (obra nos EUA + bandeira americana) — trocar o background abaixo. */}
      <section
        style={{
          position: 'relative',
          color: '#fff',
          background: `linear-gradient(135deg, rgba(10,31,68,0.92), rgba(22,51,95,0.88)), linear-gradient(135deg, ${BRAND.navy} 0%, ${BRAND.royal} 100%)`,
          overflow: 'hidden',
        }}
      >
        <div style={{ ...wrap, padding: '64px 20px 76px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 22 }}>
            <GoldPill dark>
              <span className="wpa-dot-pulse" aria-hidden style={{ width: 9, height: 9, borderRadius: '50%', background: '#ff4d4f', display: 'inline-block' }} />
              ESCOLA EM OPERAÇÃO
            </GoldPill>
            <GoldPill dark>Massachusetts &middot; em português</GoldPill>
          </div>

          <h1 style={{ fontSize: 46, lineHeight: 1.1, margin: '0 0 18px', maxWidth: 880, fontWeight: 800 }}>
            A escola que prepara brasileiros para crescer e se profissionalizar na{' '}
            <span style={{ color: BRAND.gold }}>construção civil dos EUA</span>.
          </h1>

          <p style={{ fontSize: 18.5, lineHeight: 1.6, maxWidth: 720, opacity: 0.94, margin: 0 }}>
            Da gestão de obras à conquista da sua licença de CSL em Massachusetts. Tudo em português,
            com conteúdo prático e com quem já faz acontecer no mercado americano.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 30 }}>
            <a
              href="#cursos"
              className="wpa-btn"
              style={{
                background: BRAND.gradient,
                color: '#fff',
                fontWeight: 800,
                fontSize: 16,
                padding: '16px 30px',
                borderRadius: 999,
                textDecoration: 'none',
                boxShadow: '0 10px 26px rgba(75,63,228,0.4)',
              }}
            >
              VER OS CURSOS
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="wpa-btn"
              style={{
                background: '#fff',
                color: BRAND.navy,
                fontWeight: 800,
                fontSize: 16,
                padding: '16px 30px',
                borderRadius: 999,
                textDecoration: 'none',
                border: `1px solid ${BRAND.gold}`,
              }}
            >
              FALAR NO WHATSAPP
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 26, fontSize: 14.5, opacity: 0.92 }}>
            <span aria-hidden style={{ color: BRAND.gold }}>&#9679;</span>
            Aulas em português &middot; Portal de simulados &middot; Presencial em Massachusetts
          </div>
        </div>
      </section>

      {/* POR QUE A ESCOLA / AUTORIDADE — David Piazzarollo */}
      <section id="professor" style={{ background: BRAND.cream, padding: '72px 0' }}>
        <div style={wrap}>
          <GoldPill>Por que a Wise Pro Academy</GoldPill>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(240px, 360px) 1fr',
              gap: 40,
              alignItems: 'start',
              marginTop: 22,
            }}
          >
            {/* Foto do David (placeholder) */}
            {/* IMAGEM: David sobe a foto dele em moldura — trocar este bloco. */}
            <div
              style={{
                aspectRatio: '4 / 5',
                borderRadius: 18,
                background: `linear-gradient(135deg, ${BRAND.navy}, ${BRAND.royal})`,
                color: BRAND.gold,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `3px solid ${BRAND.gold}`,
                fontWeight: 700,
                fontSize: 15,
                textAlign: 'center',
                padding: 20,
              }}
            >
              Foto de David Piazzarollo
            </div>

            <div>
              <h2 style={{ fontSize: 30, margin: '0 0 18px', fontWeight: 800 }}>
                Uma escola criada por quem viveu a obra de verdade
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: BRAND.navyLight }}>
                Quem conduz a escola é <strong style={{ color: BRAND.navy }}>David Piazzarollo</strong>,
                com mais de 10 anos no mercado americano da construção. Ele começou como imigrante, sem
                experiência, trabalhando na execução pesada da obra.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: BRAND.navyLight }}>
                David passou na prova de CSL, construiu a própria carteira de clientes diretos e hoje
                ensina o caminho que ele mesmo percorreu. Por isso o conteúdo é prático, em português e
                baseado na vida real da construção nos Estados Unidos.
              </p>

              {/* Card de autoridade (Google) */}
              <div
                style={{
                  background: '#fff',
                  border: `1px solid ${BRAND.gold}`,
                  borderRadius: 16,
                  padding: 22,
                  margin: '20px 0',
                  display: 'flex',
                  gap: 16,
                  alignItems: 'flex-start',
                }}
              >
                <span aria-hidden style={{ fontSize: 30, fontWeight: 800, lineHeight: 1 }}>
                  <span style={{ color: '#4285F4' }}>G</span>
                </span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 16.5, lineHeight: 1.4 }}>
                    +10 anos no mercado americano e CSL aprovada.
                  </div>
                  <div style={{ color: BRAND.navyLight, marginTop: 6, fontSize: 14.5 }}>
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
                  background: '#fff',
                  borderLeft: `4px solid ${BRAND.gold}`,
                  borderRadius: 10,
                  padding: '16px 18px',
                  fontWeight: 700,
                  fontSize: 16,
                  marginTop: 8,
                }}
              >
                Sem teoria vazia. Conteúdo baseado na vida real da construção civil americana.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NOSSOS CURSOS — 2 cards grandes (id=cursos) */}
      <section id="cursos" style={{ background: '#fff', padding: '72px 0' }}>
        <div style={wrap}>
          <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
            <GoldPill>Nossos cursos</GoldPill>
            <h2 style={{ fontSize: 32, lineHeight: 1.15, margin: '16px 0 0', fontWeight: 800 }}>
              Dois cursos, um caminho claro
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: BRAND.navyLight, marginTop: 14 }}>
              Comece pela gestão de obra ou vá direto para a sua licença de CSL. Cada curso te leva um
              passo mais perto de crescer na construção dos Estados Unidos.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 26,
              marginTop: 42,
              maxWidth: 880,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {CURSOS.map((c) => (
              <div
                key={c.href}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: BRAND.navy,
                  color: '#fff',
                  border: `2px solid ${BRAND.gold}`,
                  borderRadius: 22,
                  padding: 34,
                  boxShadow: '0 12px 32px rgba(10,31,68,0.14)',
                }}
              >
                <span
                  style={{
                    alignSelf: 'flex-start',
                    background: BRAND.lilac,
                    color: BRAND.navy,
                    fontSize: 12.5,
                    fontWeight: 700,
                    padding: '5px 12px',
                    borderRadius: 999,
                    marginBottom: 18,
                  }}
                >
                  {c.selo}
                </span>
                <h3 style={{ margin: '0 0 8px', fontSize: 26, fontWeight: 800 }}>{c.nome}</h3>
                <div style={{ color: BRAND.gold, fontWeight: 800, fontSize: 30, marginBottom: 16 }}>{c.preco}</div>
                <p style={{ margin: '0 0 28px', color: 'rgba(255,255,255,0.88)', lineHeight: 1.6, fontSize: 16, flexGrow: 1 }}>
                  {c.chamada}
                </p>
                <Link
                  href={c.href}
                  className="wpa-btn"
                  style={{
                    display: 'inline-block',
                    textAlign: 'center',
                    background: BRAND.gradient,
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: 16,
                    padding: '15px 28px',
                    borderRadius: 999,
                    textDecoration: 'none',
                    boxShadow: '0 8px 22px rgba(75,63,228,0.35)',
                  }}
                >
                  {c.rotulo}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIAL — portal de simulados (item-rei) */}
      <section style={{ background: BRAND.cream, padding: '72px 0' }}>
        <div style={wrapNarrow}>
          <div
            style={{
              background: BRAND.navy,
              color: '#fff',
              borderRadius: 24,
              border: `2px solid ${BRAND.gold}`,
              padding: '44px 40px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 32,
              alignItems: 'center',
            }}
          >
            <div>
              <GoldPill dark>O diferencial da escola</GoldPill>
              <h2 style={{ fontSize: 30, lineHeight: 1.15, margin: '16px 0 12px', fontWeight: 800 }}>
                O portal de simulados que te aprova na CSL
              </h2>
              <p style={{ fontSize: 16.5, lineHeight: 1.6, color: 'rgba(255,255,255,0.9)' }}>
                Incluso no Curso de Construtor: um portal com <strong style={{ color: BRAND.gold }}>598 questões originais</strong>,
                ancoradas no código oficial, que treinam você até a aprovação. A aula te ensina; o
                portal te aprova.
              </p>
              <Link
                href={`/${PRODUCTS.construtor.slug}`}
                className="wpa-btn"
                style={{
                  display: 'inline-block',
                  marginTop: 22,
                  background: BRAND.gradient,
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: 15.5,
                  padding: '14px 26px',
                  borderRadius: 999,
                  textDecoration: 'none',
                  boxShadow: '0 8px 22px rgba(75,63,228,0.35)',
                }}
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
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: 14,
                    padding: '16px 18px',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 12,
                  }}
                >
                  <span style={{ color: BRAND.gold, fontWeight: 800, fontSize: 26, lineHeight: 1 }}>{num}</span>
                  <span style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.9)', lineHeight: 1.45 }}>{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee items={MARQUEE_ITEMS} />

      {/* PROVA SOCIAL — reviews placeholder */}
      <section style={{ background: '#fff', padding: '72px 0' }}>
        <div style={wrap}>
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
            <GoldPill>Prova social</GoldPill>
            <h2 style={{ fontSize: 32, lineHeight: 1.15, margin: '16px 0 0', fontWeight: 800 }}>
              Quem aprende com a gente recomenda
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: BRAND.navyLight, marginTop: 14 }}>
              Avaliações reais dos alunos e da empresa de construção do David no Google.
            </p>
          </div>

          {/* REVIEWS: squad de SEO / GBP conecta os reviews reais do Google aqui. */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 22,
              marginTop: 36,
            }}
          >
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                style={{
                  background: BRAND.cream,
                  border: `1px solid ${BRAND.gold}`,
                  borderRadius: 18,
                  padding: 26,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div aria-hidden style={{ color: BRAND.gold, fontSize: 18, letterSpacing: 2, marginBottom: 12 }}>
                  &#9733;&#9733;&#9733;&#9733;&#9733;
                </div>
                <p style={{ margin: '0 0 18px', color: BRAND.navyLight, lineHeight: 1.6, fontSize: 15.5, flexGrow: 1 }}>
                  {r.texto}
                </p>
                <div style={{ fontWeight: 800, fontSize: 15.5 }}>{r.nome}</div>
                <div style={{ color: BRAND.navyLight, fontSize: 13.5 }}>{r.cidade}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLAREZA ANTES DE ENTRAR */}
      <section style={{ background: BRAND.cream, padding: '72px 0' }}>
        <div style={wrap}>
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
            <SectionTitle center>Clareza antes de entrar</SectionTitle>
            <p style={{ fontSize: 17, color: BRAND.navyLight, marginTop: 12 }}>O que a escola é, e o que não é.</p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 22,
              marginTop: 32,
            }}
          >
            <div style={{ background: '#fbf3f3', border: '1px solid #f0d4d4', borderRadius: 16, padding: 26 }}>
              <div style={{ fontWeight: 800, color: '#b8474a', marginBottom: 14, fontSize: 17 }}>O que NÃO é</div>
              {NAO_E.map((t) => (
                <div key={t} style={{ display: 'flex', gap: 10, padding: '7px 0', color: BRAND.navyLight }}>
                  <span aria-hidden style={{ color: '#b8474a' }}>&#10007;</span>
                  {t}
                </div>
              ))}
            </div>
            <div style={{ background: '#fff', border: `1px solid ${BRAND.gold}`, borderRadius: 16, padding: 26 }}>
              <div style={{ fontWeight: 800, color: '#1f7a4d', marginBottom: 14, fontSize: 17 }}>O que É</div>
              {O_QUE_E.map((t) => (
                <div key={t} style={{ display: 'flex', gap: 10, padding: '7px 0', color: BRAND.navyLight }}>
                  <span aria-hidden style={{ color: '#1f7a4d' }}>&#10003;</span>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: '#fff', padding: '72px 0' }}>
        <div style={wrapNarrow}>
          <SectionTitle center>Perguntas frequentes</SectionTitle>
          <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQ.map((item, i) => (
              <details
                key={i}
                style={{
                  background: BRAND.cream,
                  border: `1px solid ${BRAND.gold}`,
                  borderRadius: 14,
                  padding: '18px 22px',
                }}
              >
                <summary style={{ fontWeight: 700, fontSize: 16.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  {item.q}
                  <span aria-hidden style={{ color: BRAND.gold, fontSize: 20, fontWeight: 800 }}>+</span>
                </summary>
                <p style={{ color: BRAND.navyLight, lineHeight: 1.6, marginBottom: 0, fontSize: 15.5 }}>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section
        style={{
          background: `linear-gradient(135deg, ${BRAND.navy} 0%, ${BRAND.royal} 100%)`,
          color: '#fff',
          padding: '72px 0',
        }}
      >
        <div style={{ ...wrapNarrow, textAlign: 'center' }}>
          <h2 style={{ fontSize: 32, lineHeight: 1.15, margin: 0, fontWeight: 800 }}>
            Dê o próximo passo na construção dos EUA
          </h2>
          <p style={{ fontSize: 17.5, lineHeight: 1.6, opacity: 0.94, marginTop: 16, maxWidth: 620, marginLeft: 'auto', marginRight: 'auto' }}>
            Escolha o seu curso ou fale com a gente no WhatsApp. A escola está em operação e pronta para
            te receber.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginTop: 30 }}>
            <a
              href="#cursos"
              className="wpa-btn"
              style={{
                background: '#fff',
                color: BRAND.royal,
                fontWeight: 800,
                fontSize: 16,
                padding: '16px 30px',
                borderRadius: 999,
                textDecoration: 'none',
              }}
            >
              VER OS CURSOS
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="wpa-btn"
              style={{
                background: BRAND.whatsapp,
                color: '#fff',
                fontWeight: 800,
                fontSize: 16,
                padding: '16px 30px',
                borderRadius: 999,
                textDecoration: 'none',
              }}
            >
              FALAR NO WHATSAPP
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />

      <WhatsAppFloat />
    </main>
  );
}
