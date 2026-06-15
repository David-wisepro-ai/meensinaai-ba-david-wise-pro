'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BRAND } from '../../lib/brand';
import { portalSupabase, authedFetch } from '../../lib/portal-client';
import { Level } from '../../components/portal-types';
import PortalAuth from '../../components/PortalAuth';
import PortalDashboard from '../../components/PortalDashboard';
import PortalQuiz from '../../components/PortalQuiz';
import SiteFooter from '../../components/SiteFooter';

// Portal do aluno — orquestra: sessao (Supabase Auth) -> gate de enrollment 'construtor'
// (checado server-side via /api/quiz/stats) -> painel / quiz / prova.
// O motor consome quiz_questions (SO verified=true) em runtime: questao carregada via
// /carregar-questoes aparece NA HORA, sem redeploy.
//
// Degrada com elegancia: sem Supabase conectado, mostra a tela de login com aviso (pendencia do David).

type Sessao = 'verificando' | 'deslogado' | 'sem_acesso' | 'dentro';
type View =
  | { tela: 'painel' }
  | { tela: 'quiz'; category: string; label: string }
  | { tela: 'prova' };

export default function Portal() {
  const [sessao, setSessao] = useState<Sessao>('verificando');
  const [level, setLevel] = useState<Level>('iniciante');
  const [view, setView] = useState<View>({ tela: 'painel' });

  // Checa sessao Supabase + acesso (enrollment) server-side.
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
    // Tem sessao: confirma enrollment de construtor batendo no servidor.
    try {
      const r = await authedFetch('/api/quiz/stats');
      if (r.ok) setSessao('dentro');
      else if (r.status === 403) setSessao('sem_acesso');
      else setSessao('deslogado');
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
    setView({ tela: 'painel' });
    setSessao('deslogado');
  }

  return (
    <>
      <main style={{ maxWidth: 920, margin: '0 auto', padding: 24 }}>
        {/* Logo clicável volta pra home */}
        <Link
          href="/"
          style={{ display: 'inline-block', color: BRAND.navy, fontWeight: 800, fontSize: 17, letterSpacing: 0.5, textDecoration: 'none', marginBottom: 16 }}
        >
          WISE PRO <span style={{ color: BRAND.gold }}>ACADEMY</span>
        </Link>

        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <h1 style={{ color: BRAND.navy, margin: 0, fontSize: 26 }}>Portal do Aluno — Simulados CSL</h1>
          {sessao === 'dentro' && (
            <button
              type="button"
              onClick={sair}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: `1.5px solid ${BRAND.navy}`,
                background: '#fff',
                color: BRAND.navy,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Sair
            </button>
          )}
        </header>

        {sessao === 'verificando' && <p style={{ opacity: 0.7 }}>Carregando...</p>}

        {sessao === 'deslogado' && <PortalAuth onAuthed={revalidar} />}

        {sessao === 'sem_acesso' && (
          <section
            style={{
              background: '#fff',
              border: `1px solid ${BRAND.gold}`,
              borderRadius: 14,
              padding: 28,
              marginTop: 16,
            }}
          >
            <h2 style={{ marginTop: 0, color: BRAND.navy }}>Acesso exclusivo do Curso de Construtor</h2>
            <p style={{ opacity: 0.85 }}>
              O portal de simulados libera só pra quem comprou o Curso de Construtor. Sua conta está
              logada, mas ainda não encontramos a matrícula ativa.
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
              <button
                type="button"
                onClick={sair}
                style={{
                  padding: '11px 20px',
                  borderRadius: 10,
                  border: `1.5px solid ${BRAND.navy}`,
                  background: '#fff',
                  color: BRAND.navy,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Sair
              </button>
            </div>
          </section>
        )}

        {sessao === 'dentro' && view.tela === 'painel' && (
          <PortalDashboard
            level={level}
            onChangeLevel={setLevel}
            onIniciarCategoria={(category, label) => setView({ tela: 'quiz', category, label })}
            onIniciarProva={() => setView({ tela: 'prova' })}
          />
        )}

        {sessao === 'dentro' && view.tela === 'quiz' && (
          <PortalQuiz
            mode="category"
            category={view.category}
            level={level}
            titulo={view.label}
            onSair={() => setView({ tela: 'painel' })}
          />
        )}

        {sessao === 'dentro' && view.tela === 'prova' && (
          <PortalQuiz
            mode="exam"
            level={level}
            titulo="Prova completa"
            examSize={75}
            onSair={() => setView({ tela: 'painel' })}
          />
        )}
      </main>

      <SiteFooter />
    </>
  );
}
