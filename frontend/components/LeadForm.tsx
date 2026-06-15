'use client';
import { useState } from 'react';
import { BRAND } from '../lib/brand';

// Captura nome/email/telefone ANTES do Stripe. Grava o lead -> habilita recuperação de carrinho.
// Modo seguro: se o Stripe ainda não estiver conectado, a API grava o lead e devolve checkoutUrl = null.
// Nesse caso confirmamos o cadastro pro aluno (sem inventar pagamento). David conecta o Stripe na call.
export default function LeadForm({
  product,
  cta,
}: {
  product: 'project_manager' | 'construtor' | 'wise_day';
  cta: string;
}) {
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError(null);
    const f = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: f.get('name'),
          email: f.get('email'),
          phone: f.get('phone'),
          product,
        }),
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl; // -> Stripe
        return;
      }
      // Modo seguro (Stripe ainda não conectado): lead foi gravado, confirmamos o cadastro.
      setDone(true);
    } catch {
      setError('Não conseguimos enviar agora. Tente novamente em instantes.');
    } finally {
      setSending(false);
    }
  }

  const input: React.CSSProperties = {
    width: '100%',
    padding: 14,
    margin: '8px 0',
    borderRadius: 12,
    border: `1px solid #d9dcea`,
    fontSize: 16,
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  };

  if (done) {
    return (
      <div
        style={{
          background: BRAND.cream,
          border: `1px solid ${BRAND.gold}`,
          borderRadius: 14,
          padding: 20,
        }}
      >
        <strong style={{ color: BRAND.navy }}>Cadastro recebido!</strong>
        <p style={{ margin: '8px 0 0', color: BRAND.navyLight }}>
          Reservamos seu interesse. Em breve nossa equipe entra em contato pelo WhatsApp pra
          confirmar sua vaga e os próximos passos.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 460 }}>
      <input name="name" placeholder="Seu nome completo" required style={input} />
      <input name="email" type="email" placeholder="Seu melhor e-mail" required style={input} />
      <input name="phone" placeholder="Seu WhatsApp (com DDD)" required style={input} />
      <button
        disabled={sending}
        className="wpa-btn"
        style={{
          width: '100%',
          padding: 16,
          marginTop: 12,
          borderRadius: 999,
          border: 'none',
          background: BRAND.gradient,
          color: '#fff',
          fontWeight: 800,
          fontSize: 17,
          cursor: sending ? 'wait' : 'pointer',
          fontFamily: 'inherit',
          boxShadow: '0 8px 22px rgba(75,63,228,0.32)',
        }}
      >
        {sending ? 'Enviando...' : cta}
      </button>
      {error && <p style={{ color: '#b00020', fontSize: 14, marginTop: 8 }}>{error}</p>}
      <p style={{ fontSize: 12.5, color: BRAND.navyLight, marginTop: 10, lineHeight: 1.5 }}>
        Seus dados ficam seguros. Usamos apenas pra confirmar sua vaga e te enviar as informações da
        turma.
      </p>
    </form>
  );
}
