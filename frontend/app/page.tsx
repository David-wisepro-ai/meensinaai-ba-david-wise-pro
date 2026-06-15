import SiteHeader from '../components/SiteHeader';
import Marquee from '../components/Marquee';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { BRAND, WHATSAPP_URL } from '../lib/brand';

export const metadata = {
  title: 'Curso Preparatorio para Project Manager nos EUA | Wise Pro Academy',
  description:
    'Saia da execucao pesada da obra e se torne um Project Manager valorizado na construcao civil dos EUA. Treinamento online e ao vivo, gravacoes disponiveis e cronograma pratico. Em portugues, para brasileiros nos EUA.',
};

// SEO: schema EducationalOrganization + Course. Endereco/telefone ficam fora ate o David confirmar.
const schema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Wise Pro Academy',
  url: 'https://wiseproacademy.io',
  description:
    'Curso preparatorio para Project Manager na construcao civil dos Estados Unidos, em portugues, para brasileiros.',
  areaServed: 'United States',
  knowsLanguage: ['pt-BR', 'en-US'],
};

const wrap: React.CSSProperties = { maxWidth: 1140, margin: '0 auto', padding: '0 20px' };
const wrapNarrow: React.CSSProperties = { maxWidth: 960, margin: '0 auto', padding: '0 20px' };

// ---------- atomos visuais ----------

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
  'Curso Preparatorio',
  'Project Manager',
  'Construcao nos EUA',
  'Aulas ao vivo',
  'Gestao de obras',
  'Comunicacao com cliente',
];

const ACESSO_CARDS = [
  { n: '01', t: 'Aulas ao vivo e gravadas', d: 'Participe ao vivo e revise depois para fixar o conteudo.' },
  { n: '02', t: 'Rotina real de obra nos EUA', d: 'Aprenda com situacoes praticas da construcao residencial americana.' },
  { n: '03', t: 'Comunicacao profissional', d: 'Saiba como falar com clientes, equipe e subcontratados.' },
  { n: '04', t: 'Visao de crescimento', d: 'Desenvolva postura e clareza para buscar melhores oportunidades.' },
];

const CONTEUDO = [
  { t: 'Papel do PM e Mentalidade Profissional', d: 'Funcao do project manager, postura profissional e visao estrategica na obra.' },
  { t: 'Comunicacao com Cliente e Time', d: 'Alinhamento, clareza na comunicacao e gestao do relacionamento com equipe e cliente.' },
  { t: 'Sequencia da Obra e Planejamento', d: 'Etapas corretas da execucao, organizacao da obra e planejamento pratico.' },
  { t: 'Leitura de Plantas e Controle de Escopo', d: 'Interpretacao de plantas, definicao do escopo e prevencao de erros de execucao.' },
  { t: 'Aplicacao de Permits na Prefeitura', d: 'Processo de aplicacao de permits junto a prefeitura e atencao aos detalhes.' },
  { t: 'Subcontratos e Qualidade', d: 'Gestao de subcontractors, acompanhamento da entrega e controle de qualidade.' },
  { t: 'Ingles Basico na Construcao', d: 'Vocabulario essencial para conversacao profissional no dia a dia da construcao.' },
  { t: 'Perfil Forte para Emprego', d: 'Como se posicionar melhor e montar um perfil mais forte para buscar oportunidades.' },
  { t: 'IA no seu negocio com Fabio Borges', d: 'Aplicacoes praticas de inteligencia artificial para potencializar seu negocio, com Fabio Borges.' },
];

const NAO_E = [
  'Nao e promessa de dinheiro facil',
  'Nao e enriquecimento rapido',
  'Nao promete emprego garantido',
  'Nao promete visto ou imigracao',
  'Nao substitui documentacao ou licencas exigidas',
];

const O_QUE_E = [
  'Preparacao pratica para entender a funcao de PM',
  'Clareza sobre a rotina da construcao nos EUA',
  'Conteudo voltado a construcao nos EUA',
  'Visao profissional para organizacao e lideranca',
  'Direcao para se posicionar melhor no mercado',
];

const FAQ = [
  {
    q: 'O curso e uma formacao ou um curso preparatorio?',
    a: 'E um curso preparatorio. Ele te prepara para entender a funcao de Project Manager e a rotina da construcao nos EUA. Nao emite diploma nem licenca oficial.',
  },
  {
    q: 'Quem serao os professores?',
    a: 'As aulas sao conduzidas por David Piazzarollo, com mais de 10 anos no mercado americano da construcao. Fabio Borges entra como professor convidado para mostrar aplicacoes praticas de IA nos negocios.',
  },
  {
    q: 'As aulas ficam gravadas?',
    a: 'Sim. Voce participa ao vivo e tem as gravacoes disponiveis na plataforma para revisar quando quiser e fixar o conteudo.',
  },
  {
    q: 'Preciso morar nos Estados Unidos?',
    a: 'O conteudo e voltado a realidade da construcao nos EUA. Morar nos Estados Unidos ajuda a aplicar tudo na pratica, mas o curso e online e ao vivo, entao voce acompanha de onde estiver.',
  },
  {
    q: 'O curso garante emprego?',
    a: 'Nao. O curso prepara voce com clareza, postura profissional e visao de gestao para buscar melhores oportunidades. Conquistar a vaga depende do seu esforco e do mercado.',
  },
];

// ---------- pagina ----------

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
            <GoldPill dark>Preparatorio profissional nos EUA</GoldPill>
          </div>

          <h1 style={{ fontSize: 46, lineHeight: 1.1, margin: '0 0 18px', maxWidth: 880, fontWeight: 800 }}>
            Saia da execucao pesada da obra e se torne um{' '}
            <span style={{ color: BRAND.gold }}>Project Manager</span> valorizado e bem remunerado na
            construcao civil dos EUA.
          </h1>

          <p style={{ fontSize: 18.5, lineHeight: 1.6, maxWidth: 720, opacity: 0.94, margin: 0 }}>
            O Wise Project Manager e um treinamento online e ao vivo criado para brasileiros que
            querem parar de depender apenas da forca fisica, aprender como funciona a gestao de obras
            no mercado americano e conquistar oportunidades maiores, mais valorizadas e que remuneram
            muito bem na construcao civil.
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
            Aulas ao vivo &middot; Gravacoes disponiveis &middot; Cronograma pratico
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
          <GoldPill>Criador do metodo</GoldPill>
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
                David comecou na construcao civil dos Estados Unidos do jeito mais dificil: como
                imigrante, sem experiencia e trabalhando como ajudante de obra.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: BRAND.navyLight }}>
                Aprendeu tudo na pratica, se especializou em instalacao de ceramica e depois expandiu
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
                    +10 anos no mercado americano e mais de US$ 1 milhao em faturamento no ultimo ano.
                  </div>
                  <div style={{ color: BRAND.navyLight, marginTop: 6, fontSize: 14.5 }}>
                    Empresa de construcao com mais de 86 avaliacoes 5 estrelas no Google.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', marginBottom: 18 }}>
                {['OSHA', 'CSL License', 'Construcao nos EUA', 'Gestao de obras'].map((t) => (
                  <TagPill key={t}>{t}</TagPill>
                ))}
              </div>

              <p style={{ fontSize: 17, lineHeight: 1.6, color: BRAND.navyLight }}>
                Com o tempo, David deixou de depender de contratos de outras empresas e construiu sua
                propria carteira de clientes diretos.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: BRAND.navyLight }}>
                Foi dessa experiencia real que nasceu o{' '}
                <strong style={{ color: BRAND.navy }}>Wise Project Manager</strong>: uma metodologia
                pratica para ajudar brasileiros a sairem apenas da execucao da obra e entenderem como
                funciona a gestao de obras nos EUA.
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
                Sem teoria vazia. Conteudo baseado na vida real da construcao civil americana.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROFESSOR CONVIDADO — Fabio Borges */}
      <section style={{ background: BRAND.cream, padding: '64px 0' }}>
        <div style={wrapNarrow}>
          <GoldPill>Professor convidado</GoldPill>
          <h2 style={{ fontSize: 30, margin: '16px 0 8px', fontWeight: 800 }}>
            Fabio Borges &middot; IA para Negocios nos EUA
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: BRAND.navyLight }}>
            Fabio entra como convidado para mostrar aplicacoes praticas de IA no contexto profissional
            e empresarial.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: BRAND.navyLight }}>
            Fabio Borges atua com inteligencia artificial aplicada a negocios nos Estados Unidos.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: BRAND.navyLight }}>
            No curso, ele mostra formas praticas de usar IA para ganhar produtividade, organizar
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
            Quem aprende a usar IA com inteligencia sai na frente.
          </div>
        </div>
      </section>

      {/* A VERDADE E SIMPLES */}
      <section style={{ background: '#fff', padding: '72px 0' }}>
        <div style={wrap}>
          <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
            <SectionTitle center>
              Voce nao precisa trabalhar mais pesado. Precisa se preparar melhor.
            </SectionTitle>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: BRAND.navyLight, marginTop: 16 }}>
              Inspirado na realidade da construcao americana: quem aprende a se posicionar, organizar e
              liderar deixa de ser apenas mao de obra e comeca a ser visto como profissional
              estrategico.
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
              <div style={{ fontWeight: 800, color: '#b8474a', marginBottom: 14 }}>Preso na execucao</div>
              {['Continua limitado a execucao', 'Continua sem visao de gestao', 'Continua sem saber se posicionar'].map((t) => (
                <div key={t} style={{ display: 'flex', gap: 10, padding: '7px 0', color: BRAND.navyLight }}>
                  <span aria-hidden style={{ color: '#b8474a' }}>&#10007;</span>
                  {t}
                </div>
              ))}
            </div>
            <div style={{ background: BRAND.cream, border: `1px solid ${BRAND.gold}`, borderRadius: 16, padding: 26 }}>
              <div style={{ fontWeight: 800, color: '#1f7a4d', marginBottom: 14 }}>Preparado para crescer</div>
              {['Mais clareza profissional', 'Mais seguranca para conversar com clientes', 'Mais preparo para buscar oportunidades melhores'].map((t) => (
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

      {/* O QUE VOCE TERA ACESSO */}
      <section id="acesso" style={{ background: '#fff', padding: '72px 0' }}>
        <div style={wrap}>
          <SectionTitle>O que voce tera acesso</SectionTitle>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: BRAND.navyLight, maxWidth: 760, marginTop: 14 }}>
            Uma preparacao direta ao ponto, sem enrolacao. Conteudo focado no que voce precisa
            entender para comecar a pensar e agir como Project Manager no mercado americano da
            construcao.
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

      {/* CONTEUDO DO CURSO */}
      <section id="curso" style={{ background: BRAND.cream, padding: '72px 0' }}>
        <div style={wrap}>
          <SectionTitle>Conteudo do curso</SectionTitle>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: BRAND.navyLight, maxWidth: 760, marginTop: 14 }}>
            Uma trilha pratica para preparar sua comunicacao, leitura de obra, gestao e uso de
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
            Apos a matricula, o aluno recebera o cronograma das aulas ao vivo e o acesso a plataforma
            com as aulas gravadas.
          </p>
        </div>
      </section>

      {/* CLAREZA ANTES DE ENTRAR */}
      <section style={{ background: '#fff', padding: '72px 0' }}>
        <div style={wrap}>
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
            <SectionTitle center>Clareza antes de entrar</SectionTitle>
            <p style={{ fontSize: 17, color: BRAND.navyLight, marginTop: 12 }}>O que isso e, e o que nao e.</p>
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
              <div style={{ fontWeight: 800, color: '#b8474a', marginBottom: 14, fontSize: 17 }}>O que NAO e</div>
              {NAO_E.map((t) => (
                <div key={t} style={{ display: 'flex', gap: 10, padding: '7px 0', color: BRAND.navyLight }}>
                  <span aria-hidden style={{ color: '#b8474a' }}>&#10007;</span>
                  {t}
                </div>
              ))}
            </div>
            <div style={{ background: BRAND.cream, border: `1px solid ${BRAND.gold}`, borderRadius: 16, padding: 26 }}>
              <div style={{ fontWeight: 800, color: '#1f7a4d', marginBottom: 14, fontSize: 17 }}>O que E</div>
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

      {/* OFERTA / INSCRICAO */}
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
            <GoldPill dark>Inscricoes abertas</GoldPill>
            <h2 style={{ fontSize: 34, margin: '18px 0 12px', fontWeight: 800 }}>
              Condicao diferenciada membro fundador
            </h2>
            <p style={{ fontSize: 17.5, opacity: 0.94, maxWidth: 620, margin: '0 auto', lineHeight: 1.6 }}>
              Fale pelo WhatsApp para garantir sua vaga e receber as orientacoes de matricula.
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
              Condicao membro fundador
            </div>
            <h3 style={{ fontSize: 26, margin: '12px 0 8px', fontWeight: 800 }}>Faca sua matricula</h3>
            <p style={{ color: BRAND.navyLight, fontSize: 15.5, lineHeight: 1.6, margin: '0 0 22px' }}>
              Garanta sua vaga e receba as orientacoes de matricula direto pelo WhatsApp.
            </p>
            {/* WHATSAPP: David troca o numero em lib/brand.ts (WHATSAPP_URL). */}
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
              Aulas ao vivo toda quarta, com gravacoes disponiveis na plataforma.
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

      {/* FOOTER */}
      <footer style={{ background: BRAND.navy, color: '#fff', padding: '40px 0', textAlign: 'center' }}>
        <div style={wrap}>
          <div style={{ fontWeight: 800, fontSize: 18, letterSpacing: 0.5 }}>
            WISE PRO <span style={{ color: BRAND.gold }}>ACADEMY</span>
          </div>
          <div style={{ opacity: 0.7, fontSize: 13.5, marginTop: 8 }}>{BRAND.domain}</div>
        </div>
      </footer>

      <WhatsAppFloat />
    </main>
  );
}
