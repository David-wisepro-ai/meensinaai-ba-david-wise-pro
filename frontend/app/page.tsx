import Link from 'next/link';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import Marquee from '../components/Marquee';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { BRAND, WHATSAPP_URL, PRODUCTS } from '../lib/brand';

export const metadata = {
  title: 'Wise Pro Academy | Cursos de Construção e CSL para Brasileiros nos EUA',
  description:
    'A escola que prepara brasileiros para crescer na construção civil dos Estados Unidos. Curso de Project Manager, Curso de Construtor (CSL) e Wise Day. Em português, com quem já fez acontecer no mercado americano.',
};

// SEO: schema EducationalOrganization. Endereço/telefone ficam fora até o David confirmar.
const schema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Wise Pro Academy',
  url: 'https://wiseproacademy.io',
  description:
    'Escola de preparação para a construção civil dos Estados Unidos, em português, para brasileiros. Cursos de Project Manager, Construtor (CSL) e a imersão Wise Day.',
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

// Os 2 cursos em destaque na vitrine da home (seção #curso). Wise Day fica em "Conheça também".
const VITRINE = [
  {
    nome: PRODUCTS.project_manager.name,
    preco: PRODUCTS.project_manager.price,
    selo: 'Porta de entrada',
    chamada:
      'O primeiro passo pra sair da execução pesada e entender a gestão de obras nos EUA. 8 aulas ao vivo, em português, com acesso por 1 ano.',
    href: `/${PRODUCTS.project_manager.slug}`,
  },
  {
    nome: PRODUCTS.construtor.name,
    preco: PRODUCTS.construtor.price,
    selo: 'Curso principal',
    chamada:
      '6 dias presenciais mais o portal de simulados que treina você até passar na prova de CSL. A aula te ensina; o portal te aprova.',
    href: `/${PRODUCTS.construtor.slug}`,
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

// Cards da seção "Conheça também" — os 3 caminhos da escola.
const OUTROS_CAMINHOS = [
  {
    nome: PRODUCTS.project_manager.name,
    preco: PRODUCTS.project_manager.price,
    selo: 'Porta de entrada',
    desc: 'O primeiro passo para entender a função de Project Manager na construção dos EUA.',
    href: `/${PRODUCTS.project_manager.slug}`,
  },
  {
    nome: PRODUCTS.construtor.name,
    preco: PRODUCTS.construtor.price,
    selo: 'Principal',
    desc: 'Formação presencial de 6 dias que destrava o portal de simulados para a prova de CSL.',
    href: `/${PRODUCTS.construtor.slug}`,
  },
  {
    nome: PRODUCTS.wise_day.name,
    preco: PRODUCTS.wise_day.price,
    selo: 'Premium',
    desc: 'Um dia presencial intensivo ao lado do David, focado na prática real de obra.',
    href: `/${PRODUCTS.wise_day.slug}`,
  },
];

const FAQ = [
  {
    q: 'A Wise Pro Academy emite a licença de CSL?',
    a: 'Não. Somos uma escola preparatória. Preparamos você para a prova de Construction Supervisor License e para a rotina da construção nos EUA. A licença é emitida pelo órgão oficial de Massachusetts.',
  },
  {
    q: 'Quem dá as aulas?',
    a: 'As aulas são conduzidas por David Piazzarollo, com mais de 10 anos no mercado americano da construção. Fábio Borges entra como professor convidado para mostrar aplicações práticas de IA nos negócios.',
  },
  {
    q: 'Por qual curso eu começo?',
    a: 'Se você está começando, o Project Manager é a porta de entrada. Se o seu objetivo é a licença, o Curso de Construtor com o portal de simulados é o caminho. O Wise Day é a imersão presencial premium com o David.',
  },
  {
    q: 'Preciso morar nos Estados Unidos?',
    a: 'O conteúdo é voltado à realidade da construção nos EUA. O Project Manager é ao vivo e online; o Curso de Construtor e o Wise Day têm parte presencial em Massachusetts.',
  },
];

// ---------- página ----------

export default function Home() {
  return (
    <main style={{ color: BRAND.navy }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <SiteHeader />

      {/* HERO escuro */}
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
            <GoldPill dark>Construção nos EUA &middot; em português</GoldPill>
          </div>

          <h1 style={{ fontSize: 46, lineHeight: 1.1, margin: '0 0 18px', maxWidth: 880, fontWeight: 800 }}>
            A escola que prepara brasileiros para crescer na{' '}
            <span style={{ color: BRAND.gold }}>construção civil dos EUA</span>.
          </h1>

          <p style={{ fontSize: 18.5, lineHeight: 1.6, maxWidth: 720, opacity: 0.94, margin: 0 }}>
            Da gestão de obras à conquista da sua licença de CSL em Massachusetts. Três cursos, um
            caminho claro, tudo em português e com quem já faz acontecer no mercado americano.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 30 }}>
            <Link
              href={`/${PRODUCTS.project_manager.slug}`}
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
              GARANTIR VAGA
            </Link>
            <a
              href="#curso"
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
              VER OS CURSOS
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 26, fontSize: 14.5, opacity: 0.92 }}>
            <span aria-hidden style={{ color: BRAND.gold }}>&#9679;</span>
            Aulas em português &middot; Portal de simulados &middot; Presencial em Massachusetts
          </div>
        </div>
      </section>

      {/* VITRINE DE CURSOS — 2 cards que direcionam (id=curso) */}
      <section id="curso" style={{ background: '#fff', padding: '72px 0' }}>
        <div style={wrap}>
          <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
            <GoldPill>Nossos cursos</GoldPill>
            <h2 style={{ fontSize: 32, lineHeight: 1.15, margin: '16px 0 0', fontWeight: 800 }}>
              Escolha o seu ponto de partida
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: BRAND.navyLight, marginTop: 14 }}>
              Cada curso te leva um passo mais perto de crescer na construção dos Estados Unidos.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 24,
              marginTop: 40,
              maxWidth: 820,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {VITRINE.map((c) => (
              <div
                key={c.href}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: BRAND.cream,
                  border: `1px solid ${BRAND.gold}`,
                  borderRadius: 20,
                  padding: 30,
                  boxShadow: '0 2px 14px rgba(10,31,68,0.06)',
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
                    marginBottom: 16,
                  }}
                >
                  {c.selo}
                </span>
                <h3 style={{ margin: '0 0 6px', fontSize: 23, fontWeight: 800 }}>{c.nome}</h3>
                <div style={{ color: BRAND.gold, fontWeight: 800, fontSize: 26, marginBottom: 14 }}>{c.preco}</div>
                <p style={{ margin: '0 0 24px', color: BRAND.navyLight, lineHeight: 1.6, fontSize: 15.5, flexGrow: 1 }}>
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
                    padding: '14px 28px',
                    borderRadius: 999,
                    textDecoration: 'none',
                    boxShadow: '0 8px 22px rgba(75,63,228,0.3)',
                  }}
                >
                  Saber mais
                </Link>
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', color: BRAND.navyLight, fontSize: 15, marginTop: 26 }}>
            Quer a imersão presencial premium com o David? Conheça o{' '}
            <Link href={`/${PRODUCTS.wise_day.slug}`} style={{ color: BRAND.royal, fontWeight: 700, textDecoration: 'none' }}>
              Wise Day
            </Link>
            .
          </p>
        </div>
      </section>

      {/* SOBRE O CRIADOR — David Piazzarollo */}
      <section id="professor" style={{ background: BRAND.cream, padding: '72px 0' }}>
        <div style={wrap}>
          <GoldPill>Criador do método</GoldPill>
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
              <h2 style={{ fontSize: 30, margin: '0 0 18px', fontWeight: 800 }}>David Piazzarollo</h2>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: BRAND.navyLight }}>
                David começou na construção civil dos Estados Unidos do jeito mais difícil: como
                imigrante, sem experiência e trabalhando como ajudante de obra.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: BRAND.navyLight }}>
                Aprendeu tudo na prática, se especializou em instalação de cerâmica e depois expandiu
                para reformas completas de banheiros, cozinhas, basements, decks e additions.
              </p>

              {/* Card de review (creme + Google) */}
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
                    +10 anos no mercado americano e mais de US$ 1 milhão em faturamento no último ano.
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

              <p style={{ fontSize: 17, lineHeight: 1.6, color: BRAND.navyLight }}>
                Com o tempo, David deixou de depender de contratos de outras empresas e construiu sua
                própria carteira de clientes diretos.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: BRAND.navyLight }}>
                Foi dessa experiência real que nasceu a{' '}
                <strong style={{ color: BRAND.navy }}>Wise Pro Academy</strong>: uma escola prática
                para ajudar brasileiros a saírem apenas da execução da obra e crescerem na construção
                dos EUA.
              </p>

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

      {/* PROFESSOR CONVIDADO — Fábio Borges */}
      <section style={{ background: '#fff', padding: '64px 0' }}>
        <div style={wrapNarrow}>
          <GoldPill>Professor convidado</GoldPill>
          <h2 style={{ fontSize: 30, margin: '16px 0 8px', fontWeight: 800 }}>
            Fábio Borges &middot; IA para Negócios nos EUA
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: BRAND.navyLight }}>
            Fábio entra como convidado para mostrar aplicações práticas de IA no contexto profissional
            e empresarial.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: BRAND.navyLight }}>
            Fábio Borges atua com inteligência artificial aplicada a negócios nos Estados Unidos.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: BRAND.navyLight }}>
            No curso, ele mostra formas práticas de usar IA para ganhar produtividade, organizar
            processos e apoiar o crescimento profissional.
          </p>
          <div
            style={{
              background: BRAND.cream,
              borderLeft: `4px solid ${BRAND.gold}`,
              borderRadius: 10,
              padding: '16px 18px',
              fontWeight: 700,
              fontSize: 16,
              marginTop: 8,
            }}
          >
            Quem aprende a usar IA com inteligência sai na frente.
          </div>
        </div>
      </section>

      {/* A VERDADE É SIMPLES */}
      <section style={{ background: BRAND.cream, padding: '72px 0' }}>
        <div style={wrap}>
          <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
            <SectionTitle center>
              Você não precisa trabalhar mais pesado. Precisa se preparar melhor.
            </SectionTitle>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: BRAND.navyLight, marginTop: 16 }}>
              Inspirado na realidade da construção americana: quem aprende a se posicionar, organizar e
              liderar deixa de ser apenas mão de obra e começa a ser visto como profissional
              estratégico.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 22,
              marginTop: 36,
            }}
          >
            <div style={{ background: '#fbf3f3', border: '1px solid #f0d4d4', borderRadius: 16, padding: 26 }}>
              <div style={{ fontWeight: 800, color: '#b8474a', marginBottom: 14 }}>Preso na execução</div>
              {['Continua limitado à execução', 'Continua sem visão de gestão', 'Continua sem saber se posicionar'].map((t) => (
                <div key={t} style={{ display: 'flex', gap: 10, padding: '7px 0', color: BRAND.navyLight }}>
                  <span aria-hidden style={{ color: '#b8474a' }}>&#10007;</span>
                  {t}
                </div>
              ))}
            </div>
            <div style={{ background: '#fff', border: `1px solid ${BRAND.gold}`, borderRadius: 16, padding: 26 }}>
              <div style={{ fontWeight: 800, color: '#1f7a4d', marginBottom: 14 }}>Preparado para crescer</div>
              {['Mais clareza profissional', 'Mais segurança para conversar com clientes', 'Mais preparo para buscar oportunidades melhores'].map((t) => (
                <div key={t} style={{ display: 'flex', gap: 10, padding: '7px 0', color: BRAND.navyLight }}>
                  <span aria-hidden style={{ color: '#1f7a4d' }}>&#10003;</span>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee items={MARQUEE_ITEMS} />

      {/* CLAREZA ANTES DE ENTRAR */}
      <section style={{ background: '#fff', padding: '72px 0' }}>
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
            <div style={{ background: BRAND.cream, border: `1px solid ${BRAND.gold}`, borderRadius: 16, padding: 26 }}>
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
      <section style={{ background: BRAND.cream, padding: '72px 0' }}>
        <div style={wrapNarrow}>
          <SectionTitle center>Perguntas frequentes</SectionTitle>
          <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQ.map((item, i) => (
              <details
                key={i}
                style={{
                  background: '#fff',
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

      {/* CONHEÇA TAMBÉM — os 3 caminhos da escola */}
      <section style={{ background: '#fff', padding: '72px 0' }}>
        <div style={wrap}>
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
            <SectionTitle center>Conheça também os outros caminhos</SectionTitle>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: BRAND.navyLight, marginTop: 14 }}>
              Cada formação da Wise Pro Academy te leva um passo mais perto de crescer na construção
              civil dos Estados Unidos. Escolha por onde começar.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 22,
              marginTop: 36,
            }}
          >
            {OUTROS_CAMINHOS.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="wpa-btn"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: BRAND.cream,
                  border: `1px solid ${BRAND.gold}`,
                  borderRadius: 18,
                  padding: 26,
                  textDecoration: 'none',
                  color: BRAND.navy,
                  boxShadow: '0 2px 12px rgba(10,31,68,0.06)',
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
                    marginBottom: 14,
                  }}
                >
                  {c.selo}
                </span>
                <h3 style={{ margin: '0 0 6px', fontSize: 21, fontWeight: 800 }}>{c.nome}</h3>
                <div style={{ color: BRAND.gold, fontWeight: 800, fontSize: 22, marginBottom: 12 }}>{c.preco}</div>
                <p style={{ margin: '0 0 20px', color: BRAND.navyLight, lineHeight: 1.55, fontSize: 15, flexGrow: 1 }}>
                  {c.desc}
                </p>
                <span style={{ color: BRAND.royal, fontWeight: 800, fontSize: 15 }}>Saiba mais &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />

      <WhatsAppFloat />
    </main>
  );
}
