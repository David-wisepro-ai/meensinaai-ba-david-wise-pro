'use client';

import { useState } from 'react';
import { BRAND } from '../lib/brand';
import { portalSupabase, portalConfigured } from '../lib/portal-client';

// Login / cadastro do aluno via Supabase Auth (email + senha).
// Se as env vars do Supabase nao estao configuradas, mostra aviso elegante (pendencia do David),
// sem quebrar a tela.
export default function PortalAuth({ onAuthed }: { onAuthed: () => void }) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  const configurado = portalConfigured();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    const sb = portalSupabase();
    if (!sb) {
      setMsg('Login ainda nao conectado. O Supabase Auth sera ativado em breve.');
      return;
    }
    setCarregando(true);
    try {
      if (mode === 'signup') {
        const { error } = await sb.auth.signUp({ email, password: senha });
        if (error) throw error;
        setMsg('Cadastro criado. Confirme o e-mail (se exigido) e faca login.');
        setMode('login');
      } else {
        const { error } = await sb.auth.signInWithPassword({ email, password: senha });
        if (error) throw error;
        onAuthed();
      }
    } catch (err: any) {
      setMsg(err?.message ? `Nao deu certo: ${err.message}` : 'Nao deu certo. Confira os dados.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section
      style={{
        background: '#fff',
        border: `1px solid ${BRAND.gold}`,
        borderRadius: 14,
        padding: 28,
        maxWidth: 440,
        margin: '24px auto',
      }}
    >
      <h2 style={{ marginTop: 0, color: BRAND.navy }}>
        {mode === 'login' ? 'Entrar no portal' : 'Criar acesso'}
      </h2>
      <p style={{ opacity: 0.75, fontSize: 14, marginTop: 0 }}>
        Acesso exclusivo de quem comprou o Curso de Construtor.
      </p>

      {!configurado && (
        <div
          style={{
            background: BRAND.cream,
            border: `1px solid ${BRAND.gold}`,
            borderRadius: 10,
            padding: 12,
            fontSize: 13,
            marginBottom: 16,
          }}
        >
          Login em ativacao. O acesso sera liberado assim que a conta for conectada.
        </div>
      )}

      <form onSubmit={submit}>
        <label style={{ display: 'block', fontSize: 13, marginBottom: 4 }}>E-mail</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          autoComplete="email"
        />
        <label style={{ display: 'block', fontSize: 13, margin: '12px 0 4px' }}>Senha</label>
        <input
          type="password"
          required
          minLength={6}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={inputStyle}
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
        />

        <button type="submit" disabled={carregando} style={primaryBtn}>
          {carregando ? 'Aguarde...' : mode === 'login' ? 'Entrar' : 'Criar acesso'}
        </button>
      </form>

      {msg && <p style={{ fontSize: 13, color: BRAND.navyLight, marginTop: 12 }}>{msg}</p>}

      <p style={{ fontSize: 13, marginTop: 16 }}>
        {mode === 'login' ? 'Ainda nao tem acesso? ' : 'Ja tem acesso? '}
        <button
          type="button"
          onClick={() => {
            setMode(mode === 'login' ? 'signup' : 'login');
            setMsg(null);
          }}
          style={linkBtn}
        >
          {mode === 'login' ? 'Criar agora' : 'Fazer login'}
        </button>
      </p>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: 8,
  border: '1px solid #d6d6d6',
  fontSize: 15,
  boxSizing: 'border-box',
};

const primaryBtn: React.CSSProperties = {
  marginTop: 20,
  width: '100%',
  padding: '12px 16px',
  borderRadius: 10,
  border: 'none',
  background: BRAND.navy,
  color: BRAND.gold,
  fontSize: 16,
  fontWeight: 600,
  cursor: 'pointer',
};

const linkBtn: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: BRAND.navy,
  textDecoration: 'underline',
  cursor: 'pointer',
  fontSize: 13,
  padding: 0,
};
