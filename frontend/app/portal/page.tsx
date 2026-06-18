'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BRAND } from '../../lib/brand';
import { portalSupabase, authedFetch } from '../../lib/portal-client';
import { Level } from '../../components/portal-types';
import PortalAuth from '../../components/PortalAuth';
import PortalSimulados from '../../components/PortalSimulados';
import PortalPerformance from '../../components/PortalPerformance';
import PortalLessons, { PM_AULAS, CONSTRUTOR_AULAS } from '../../components/PortalLessons';
import PortalQuiz from '../../components/PortalQuiz';
import SiteFooter from '../../components/SiteFooter';

// Portal do aluno — DOIS portais por produto comprado (checagem server-side via /api/portal/access).
//  - 'project_manager' -> Portal Project Manager: so "Minhas aulas" (Netflix). Sem quiz.
//  - 'construtor'       -> Portal Construtor: "Minhas aulas" + "Simulados" + "Desempenho".
// Quem comprou os DOIS ve um seletor de portais no topo. O aluno so enxerga o que comprou
// (o servidor manda a lista de produtos; o client so renderiza o que foi liberado).
//
// O motor de quiz consome quiz_questions (SO verified=true) em runtime.
// Degrada com elegancia: sem Supabase conectado, mostra a tela de login com aviso.

type Produto = 'project_manager' | 'construtor';
type Sessao = 'verificando' | 'deslogado' | 'sem_acesso' | 'dentro';

// Sub-navegacao dentro do Portal Construtor.
type AbaConstrutor = 'aulas' | 'simulados' | 'desempenho';

// Tela ativa do quiz (full-screen sobre o portal construtor).
type QuizView =
  | { tela: null }
  | { tela: 'quiz'; category: string; label: string }
  | { tela: 'prova' };

const NOMES: Record<Produto, string> = {
  project_manager: 'Project Manager',
  construtor: 'Construtor',
};

export default function Portal() {
  const [sessao, setSessao] = useState<Sessao>('verificando');
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [portalAtivo, setPortalAtivo] = useState<Produto | null>(null);
  const [level, setLevel] = useState<Level>('iniciante');
  const [aba, setAba] = useState<AbaConstrutor>('aulas');
  const [quizView, setQuizView] = useState<QuizView>({ tela: null });

  // Checa sessao Supabase + descobre os portais liberados (server-side).
  async function revalidar() {
    const sb = portalSupabase();
    if (!sb) {
      setSessao('deslogado'); // sem env -> cai na tela de login com aviso
      return;
    }
    const { data } = await sb.auth.getSession();
    if (!data.session) {
      setSessao('deslogado');
      return;
    }
    try {
      const r = await authedFetch('/api/portal/access');
      if (r.ok) {
        const j = await r.json();
        const lista: Produto[] = Array.isArray(j.products) ? j.products : [];
        setProdutos(lista);
        // Default: Construtor primeiro (portal mais completo); senao o primeiro liberado.
        setPortalAtivo(lista.includes('construtor') ? 'construtor' : lista[0] ?? null);
        setSessao(lista.length > 0 ? 'dentro' : 'sem_acesso');
      } else if (r.status === 403) {
        setSessao('sem_acesso');
      } else {
        setSessao('deslogado');
      }
    } catch {
      setSessao('sem_acesso');
    }
  }

  useEffect(() => {
    revalidar();
    const sb = portalSupabase();
    if (!sb) return;
    const { data: sub } = sb.auth.onAuthStateChange(() => revalidar());
    return () => sub.subscription.unsubscribe();
  }, []);

  async function sair() {
    const sb = portalSupabase();
    if (sb) await sb.auth.signOut();
    setQuizView({ tela: null });
    setProdutos([]);
    setPortalAtivo(null);
    setSessao('deslogado');
  }

  function trocarPortal(p: Produto) {
    setPortalAtivo(p);
    setQuizView({ tela: null });
    setAba('aulas');
  }

  return (
    <>
      <main style={{ maxWidth: 1080, margin: '0 auto', padding: 24 }}>
        {/* Logo clicável volta pra home */}
        <Link
          href="/"
          style={{ display: 'inline-block', color: BRAND.navy, fontWeight: 800, fontSize: 17, letterSpacing: 0.5, textDecoration: 'none', marginBottom: 16 }}
        >
          WISE PRO <span style={{ color: BRAND.gold }}>ACADEMY</span>
        </Link>

        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, gap: 12, flexWrap: 'wrap' }}>
          <h1 style={{ color: BRAND.navy, margin: 0, fontSize: 26 }}>
            {sessao === 'dentro' && portalAtivo
              ? `Portal ${NOMES[portalAtivo]}`
              : 'Portal do Aluno'}
          </h1>
          {sessao === 'dentro' && (
            <button type="button" onClick={sair} style={btnGhost}>
              Sair
            </button>
          )}
        </header>

        {sessao === 'verificando' && <p style={{ opacity: 0.7 }}>Carregando...</p>}

        {sessao === 'deslogado' && <PortalAuth onAuthed={revalidar} />}

        {sessao === 'sem_acesso' && <SemAcesso onSair={sair} />}

        {sessao === 'dentro' && portalAtivo && (
          <>
            {/* Seletor de portais (so aparece pra quem tem mais de um). */}
            {produtos.length > 1 && (
              <div style={{ display: 'flex', gap: 10, marginBottom: 22, flexWrap: 'wrap' }}>
                {produtos.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => trocarPortal(p)}
                    style={{
                      padding: '9px 18px',
                      borderRadius: 999,
                      border: `1.5px solid ${BRAND.navy}`,
                      background: portalAtivo === p ? BRAND.navy : '#fff',
                      color: portalAtivo === p ? BRAND.gold : BRAND.navy,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Portal {NOMES[p]}
                  </button>
                ))}
              </div>
            )}

            {/* ---------- Portal PROJECT MANAGER (so aulas) ---------- */}
            {portalAtivo === 'project_manager' && <PortalLessons aulas={PM_AULAS} />}

            {/* ---------- Portal CONSTRUTOR ---------- */}
            {portalAtivo === 'construtor' && (
              <>
                {/* Se um quiz/prova esta aberto, ocupa a tela. Senao, navegacao por abas. */}
                {quizView.tela === 'quiz' && (
                  <PortalQuiz
                    mode="category"
                    category={quizView.category}
                    level={level}
                    titulo={quizView.label}
                    onSair={() => setQuizView({ tela: null })}
                  />
                )}
                {quizView.tela === 'prova' && (
                  <PortalQuiz
                    mode="exam"
                    level={level}
                    titulo="Prova completa"
                    examSize={75}
                    onSair={() => setQuizView({ tela: null })}
                  />
                )}

                {quizView.tela === null && (
                  <>
                    {/* Abas internas do portal construtor */}
                    <div style={{ display: 'flex', gap: 8, marginBottom: 22, borderBottom: `1px solid ${BRAND.lilac}`, flexWrap: 'wrap' }}>
                      {(
                        [
                          ['aulas', 'Minhas aulas'],
                          ['simulados', 'Simulados'],
                          ['desempenho', 'Desempenho'],
                        ] as [AbaConstrutor, string][]
                      ).map(([key, label]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setAba(key)}
                          style={{
                            padding: '10px 16px',
                            border: 'none',
                            borderBottom: aba === key ? `3px solid ${BRAND.gold}` : '3px solid transparent',
                            background: 'transparent',
                            color: aba === key ? BRAND.navy : BRAND.navyLight,
                            fontWeight: aba === key ? 700 : 500,
                            fontSize: 15,
                            cursor: 'pointer',
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>

                    {aba === 'aulas' && <PortalLessons aulas={CONSTRUTOR_AULAS} />}

                    {aba === 'simulados' && (
                      <PortalSimulados
                        level={level}
                        onChangeLevel={setLevel}
                        onIniciarCategoria={(category, label) => setQuizView({ tela: 'quiz', category, label })}
                        onIniciarProva={() => setQuizView({ tela: 'prova' })}
                      />
                    )}

                    {aba === 'desempenho' && <PortalPerformance />}
                  </>
                )}
              </>
            )}
          </>
        )}
      </main>

      <SiteFooter />
    </>
  );
}

function SemAcesso({ onSair }: { onSair: () => void }) {
  return (
    <section
      style={{
        background: '#fff',
        border: `1px solid ${BRAND.gold}`,
        borderRadius: 14,
        padding: 28,
        marginTop: 16,
      }}
    >
      <h2 style={{ marginTop: 0, color: BRAND.navy }}>Acesso exclusivo de alunos</h2>
      <p style={{ opacity: 0.85 }}>
        O portal libera o conteúdo de quem comprou o Project Manager ou o Curso de Construtor.
        Sua conta está logada, mas ainda não encontramos uma matrícula ativa.
      </p>
      <p style={{ fontSize: 14, opacity: 0.8 }}>
        Se você já comprou, confirme que usou o mesmo e-mail da compra. Em caso de dúvida, fale com a equipe.
      </p>
      <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
        <Link
          href="/curso-construtor"
          style={{
            padding: '11px 20px',
            borderRadius: 10,
            background: BRAND.navy,
            color: BRAND.gold,
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          Conhecer o Curso de Construtor
        </Link>
        <button type="button" onClick={onSair} style={btnGhost}>
          Sair
        </button>
      </div>
    </section>
  );
}

const btnGhost: React.CSSProperties = {
  padding: '8px 16px',
  borderRadius: 8,
  border: `1.5px solid ${BRAND.navy}`,
  background: '#fff',
  color: BRAND.navy,
  fontWeight: 600,
  cursor: 'pointer',
};
