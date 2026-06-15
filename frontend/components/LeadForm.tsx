'use client';
import { useState } from 'react';
import { BRAND } from '../lib/brand';

// Captura nome/email/telefone ANTES do Stripe. Grava lead -> habilita recuperacao de carrinho.
export default function LeadForm({ product, cta }: { product: 'project_manager'|'construtor'|'wise_day'; cta: string }) {
  const [sending, setSending] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    const f = new FormData(e.currentTarget);
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: f.get('name'), email: f.get('email'), phone: f.get('phone'), product,
      }),
    });
    const { checkoutUrl } = await res.json();
    if (checkoutUrl) window.location.href = checkoutUrl; // -> Stripe
    setSending(false);
  }
  const input = { width: '100%', padding: 12, margin: '8px 0', borderRadius: 8, border: `1px solid ${BRAND.navyLight}` };
  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 420 }}>
      <input name="name" placeholder="Seu nome" required style={input} />
      <input name="email" type="email" placeholder="Seu melhor e-mail" required style={input} />
      <input name="phone" placeholder="Seu WhatsApp" required style={input} />
      <button disabled={sending} style={{
        width: '100%', padding: 14, marginTop: 12, borderRadius: 8, border: 'none',
        background: BRAND.gold, color: BRAND.navy, fontWeight: 800, cursor: 'pointer',
      }}>{sending ? 'Enviando...' : cta}</button>
    </form>
  );
}
