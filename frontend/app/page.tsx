import Link from 'next/link';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import Marquee from '../components/Marquee';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { BRAND, WHATSAPP_URL, PRODUCTS } from '../lib/brand';

export const metadata = {
  title: 'Curso Preparatório para Project Manager nos EUA | Wise Pro Academy',
  description:
    'Saia da execução pesada da obra e se torne um Project Manager valorizado na construção civil dos EUA. Treinamento online e ao vivo, gravações disponíveis e cronograma prático. Em português, para brasileiros nos EUA.',
};

// SEO: schema EducationalOrganization + Course. Endereço/telefone ficam fora até o David confirmar.
const schema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Wise Pro Academy',
  url: 'https://wiseproacademy.io',
  description:
    'Curso preparatório para Project Manager na construção civil dos Estados Unidos, em português, para brasileiros.',
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
  'Curso Preparatório',
  'Project Manager',
  'Construção nos EUA',
  'Aulas ao vivo',
  'Gestão de obras',
  'Comunicação com cliente',
];

const ACESSO_CARDS = [
  { n: '01', t: 'Aulas ao vivo e gravadas', d: 'Participe ao vivo e revise depois para fixar o conteúdo.' },
  { n: '02', t: 'Rotina real de obra nos EUA', d: 'Aprenda com situações práticas da construção residencial americana.' },
  { n: '03', t: 'Comunicação profissional', d: 'Saiba como falar com clientes, equipe e subcontratados.' },
  { n: '04', t: 'Visão de crescimento', d: 'Desenvolva postura e clareza para buscar melhores oportunidades.' },
];

const CONTEUDO = [
  { t: 'Papel do PM e Mentalidade Profissional', d: 'Função do project manager, postura profissional e visão estratégica na obra.' },
  { t: 'Comunicação com Cliente e Time', d: 'Alinhamento, clareza na comunicação e gestão do relacionamento com equipe e cliente.' },
  { t: 'Sequência da Obra e Planejamento', d: 'Etapas corretas da execução, organização da obra e planejamento prático.' },
  { t: 'Leitura de Plantas e Controle de Escopo', d: 'Interpretação de plantas, definição do escopo e prevenção de erros de execução.' },
  { t: 'Aplicação de Permits na Prefeitura', d: 'Processo de aplicação de permits junto à prefeitura e atenção aos detalhes.' },
  { t: 'Subcontratos e Qualidade', d: 'Gestão de subcontractors, acompanhamento da entrega e controle de qualidade.' },
  { t: 'Inglês Básico na Construção', d: 'Vocabulário essencial para conversação profissional no dia a dia da construção.' },
  { t: 'Perfil Forte para Emprego', d: 'Como se posicionar melhor e montar um perfil mais forte para buscar oportunidades.' },
  { t: 'IA no seu negócio com Fábio Borges', d: 'Aplicações práticas de inteligência artificial para potencializar seu negócio, com Fábio Borges.' },
];

const NAO_E = [
  'Não é promessa de dinheiro fácil',
  'Não é enriquecimento rápido',
  'Não promete emprego garantido',
  'Não promete visto ou imigração',
  'Não substitui documentação ou licenças exigidas',
];

const O_QUE_E = [
  'Preparação prática para entender a função de PM',
  'Clareza sobre a rotina da construção nos EUA',
  'Conteúdo voltado à construção nos EUA',
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
    q: 'O curso é uma formação ou um curso preparatório?',
    a: 'É um curso preparatório. Ele te prepara para entender a função de Project Manager e a rotina da construção nos EUA. Não emite diploma nem licença oficial.',
  },
  {
    q: 'Quem serão os professores?',
    a: 'As aulas são conduzidas por David Piazzarollo, com mais de 10 anos no mercado americano da construção. Fábio Borges entra como professor convidado para mostrar aplicações práticas de IA nos negócios.',
  },
  {
    q: 'As aulas ficam gravadas?',
    a: 'Sim. Você participa ao vivo e tem as gravações disponíveis na plataforma para revisar quando quiser e fixar o conteúdo.',
  },
  {
    q: 'Preciso morar nos Estados Unidos?',
    a: 'O conteúdo é voltado à realidade da construção nos EUA. Morar nos Estados Unidos ajuda a aplicar tudo na prática, mas o curso é online e ao vivo, então você acompanha de onde estiver.',
  },
  {
    q: 'O curso garante emprego?',
    a: 'Não. O curso prepara você com clareza, postura profissional e visão de gestão para buscar melhores oportunidades. Conquistar a vaga depende do seu esforço e do mercado.',
  },
];

// ---------- página ----------

export default function Home() {
  return (
    <main style={{ color: BRAND.navy }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <SiteHeader />

      {/* HERO escuro com foto de obra + bandeira EUA (placeholder) */}
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
              AO VIVO
            </GoldPill>
            <GoldPill dark>Preparatório profissional nos EUA</GoldPill>
          </div>

          <h1 style={{ fontSize: 46, lineHeight: 1.1, margin: '0 0 18px', maxWidth: 880, fontWeight: 800 }}>
            Saia da execução pesada da obra e se torne um{' '}
            <span style={{ color: BRAND.gold }}>Project Manager</span> valorizado e bem remunerado na
            construção civil dos EUA.
          </h1>

          <p style={{ fontSize: 18.5, lineHeight: 1.6, maxWidth: 720, opacity: 0.94, margin: 0 }}>
            O Wise Project Manager é um treinamento online e ao vivo criado para brasileiros que
            querem parar de depender apenas da força física, aprender como funciona a gestão de obras
            no mercado americano e conquistar oportunidades maiores, mais valorizadas e que remuneram
            muito bem na construção civil.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 30 }}>
            <a
              href="#inscricao"
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
            </a>
            <a
              href="#acesso"
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
              VER O QUE VOU APRENDER
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 26, fontSize: 14.5, opacity: 0.92 }}>
            <span aria-hidden style={{ color: BRAND.gold }}>&#9679;</span>
            Aulas ao vivo &middot; Gravações disponíveis &middot; Cronograma prático
          </div>

          {/* Badge flutuante */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 9,
              marginTop: 30,
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.22)',
              padding: '9px 16px',
              borderRadius: 999,
              fontSize: 13.5,
            }}
          >
            <span className="wpa-dot-pulse" aria-hidden style={{ width: 9, height: 9, borderRadius: '50%', background: '#3ddc6b', display: 'inline-block' }} />
            26 pessoas olhando o site agora
          </div>
        </div>
      </section>

      {/* SOBRE O CRIADOR — David Piazzarollo */}
      <section id="professor" style={{ background: '#fff', padding: '72px 0' }}>
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
                  background: BRAND.cream,
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
                Foi dessa experiência real que nasceu o{' '}
                <strong style={{ color: BRAND.navy }}>Wise Project Manager</strong>: uma metodologia
                prática para ajudar brasileiros a saírem apenas da execução da obra e entenderem como
                funciona a gestão de obras nos EUA.
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
                Sem teoria vazia. Conteúdo baseado na vida real da construção civil americana.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROFESSOR CONVIDADO — Fábio Borges */}
      <section style={{ background: BRAND.cream, padding: '64px 0' }}>
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
              background: '#fff',
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
      <section style={{ background: '#fff', padding: '72px 0' }}>
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
            <div style={{ background: BRAND.cream, border: `1px solid ${BRAND.gold}`, borderRadius: 16, padding: 26 }}>
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

      {/* O QUE VOCÊ TERÁ ACESSO */}
      <section id="acesso" style={{ background: '#fff', padding: '72px 0' }}>
        <div style={wrap}>
          <SectionTitle>O que você terá acesso</SectionTitle>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: BRAND.navyLight, maxWidth: 760, marginTop: 14 }}>
            Uma preparação direta ao ponto, sem enrolação. Conteúdo focado no que você precisa
            entender para começar a pensar e agir como Project Manager no mercado americano da
            construção.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 20,
              marginTop: 30,
            }}
          >
            {ACESSO_CARDS.map((c) => (
              <div
                key={c.n}
                style={{
                  background: BRAND.cream,
                  border: `1px solid ${BRAND.gold}`,
                  borderRadius: 16,
                  padding: 24,
                }}
              >
                <div style={{ color: BRAND.gold, fontWeight: 800, fontSize: 30, lineHeight: 1 }}>{c.n}</div>
                <h3 style={{ margin: '12px 0 8px', fontSize: 18.5, fontWeight: 700 }}>{c.t}</h3>
                <p style={{ margin: 0, color: BRAND.navyLight, lineHeight: 1.55, fontSize: 15 }}>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTEÚDO DO CURSO */}
      <section id="curso" style={{ background: BRAND.cream, padding: '72px 0' }}>
        <div style={wrap}>
          <SectionTitle>Conteúdo do curso</SectionTitle>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: BRAND.navyLight, maxWidth: 760, marginTop: 14 }}>
            Uma trilha prática para preparar sua comunicação, leitura de obra, gestão e uso de
            tecnologia no mercado americano.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 18,
              marginTop: 30,
            }}
          >
            {CONTEUDO.map((c, i) => (
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
                  <h3 style={{ margin: '0 0 6px', fontSize: 16.5, fontWeight: 700 }}>{c.t}</h3>
                  <p style={{ margin: 0, color: BRAND.navyLight, lineHeight: 1.5, fontSize: 14.5 }}>{c.d}</p>
                </div>
              </div>
            ))}
          </div>
          <p
            style={{
              marginTop: 26,
              fontSize: 15,
              color: BRAND.navyLight,
              fontStyle: 'italic',
              textAlign: 'center',
            }}
          >
            Após a matrícula, o aluno receberá o cronograma das aulas ao vivo e o acesso à plataforma
            com as aulas gravadas.
          </p>
        </div>
      </section>

      {/* CLAREZA ANTES DE ENTRAR */}
      <section style={{ background: '#fff', padding: '72px 0' }}>
        <div style={wrap}>
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
            <SectionTitle center>Clareza antes de entrar</SectionTitle>
            <p style={{ fontSize: 17, color: BRAND.navyLight, marginTop: 12 }}>O que isso é, e o que não é.</p>
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

      {/* OFERTA / INSCRIÇÃO */}
      <section
        id="inscricao"
        style={{
          background: `linear-gradient(135deg, ${BRAND.navy} 0%, ${BRAND.royal} 100%)`,
          color: '#fff',
          padding: '76px 0',
        }}
      >
        <div style={wrapNarrow}>
          <div style={{ textAlign: 'center' }}>
            <GoldPill dark>Inscrições abertas</GoldPill>
            <h2 style={{ fontSize: 34, margin: '18px 0 12px', fontWeight: 800 }}>
              Condição diferenciada membro fundador
            </h2>
            <p style={{ fontSize: 17.5, opacity: 0.94, maxWidth: 620, margin: '0 auto', lineHeight: 1.6 }}>
              Fale pelo WhatsApp para garantir sua vaga e receber as orientações de matrícula.
            </p>
          </div>

          <div
            style={{
              background: '#fff',
              color: BRAND.navy,
              borderRadius: 20,
              padding: 36,
              margin: '34px auto 0',
              maxWidth: 560,
              border: `2px solid ${BRAND.gold}`,
              textAlign: 'center',
            }}
          >
            <div style={{ color: BRAND.gold, fontWeight: 800, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase' }}>
              Condição membro fundador
            </div>
            <h3 style={{ fontSize: 26, margin: '12px 0 8px', fontWeight: 800 }}>Faça sua matrícula</h3>
            <p style={{ color: BRAND.navyLight, fontSize: 15.5, lineHeight: 1.6, margin: '0 0 22px' }}>
              Garanta sua vaga e receba as orientações de matrícula direto pelo WhatsApp.
            </p>
            {/* WHATSAPP: David troca o número em lib/brand.ts (WHATSAPP_URL). */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="wpa-btn"
              style={{
                display: 'inline-block',
                background: BRAND.gradient,
                color: '#fff',
                fontWeight: 800,
                fontSize: 17,
                padding: '16px 38px',
                borderRadius: 999,
                textDecoration: 'none',
                boxShadow: '0 10px 26px rgba(75,63,228,0.35)',
              }}
            >
              GARANTIR VAGA
            </a>
            <p id="cronograma" style={{ color: BRAND.navyLight, fontSize: 13.5, marginTop: 18, marginBottom: 0 }}>
              Aulas ao vivo toda quarta, com gravações disponíveis na plataforma.
            </p>
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

      {/* CONHEÇA TAMBÉM — os 3 caminhos da escola */}
      <section style={{ background: BRAND.cream, padding: '72px 0' }}>
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
                  background: '#fff',
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
