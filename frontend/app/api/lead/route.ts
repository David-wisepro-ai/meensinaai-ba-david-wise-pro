import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';
import Stripe from 'stripe';

// Captura nome/email/telefone ANTES do Stripe -> grava lead -> cria sessao Stripe.
// Se Stripe nao configurado ainda, grava o lead e devolve sem checkoutUrl (David conecta na call).
const PRICE_IDS: Record<string, string | undefined> = {
  project_manager: process.env.STRIPE_PRICE_PROJECT_MANAGER,
  construtor: process.env.STRIPE_PRICE_CONSTRUTOR,
  wise_day: process.env.STRIPE_PRICE_WISE_DAY,
};

export async function POST(req: NextRequest) {
  const { name, email, phone, product } = await req.json();
  if (!name || !email || !product) {
    return NextResponse.json({ error: 'dados incompletos' }, { status: 400 });
  }

  // 1. grava lead ANTES do Stripe (habilita recuperacao de carrinho)
  const sb = supabaseAdmin();
  await sb.from('leads').upsert(
    { name, email, phone, product, status: 'checkout_iniciado', updated_at: new Date().toISOString() },
    { onConflict: 'email' },
  );
  await sb.from('checkout_events').insert({ lead_email: email, product, event: 'checkout_iniciado' });

  // 2. cria sessao Stripe (se configurado)
  const secret = process.env.STRIPE_SECRET_KEY;
  const priceId = PRICE_IDS[product];
  if (!secret || !priceId) {
    return NextResponse.json({ checkoutUrl: null, note: 'Stripe ainda nao conectado (STEP do dashboard).' });
  }
  const stripe = new Stripe(secret);
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${req.nextUrl.origin}/portal?paid=1`,
    cancel_url: `${req.nextUrl.origin}/${product.replace('_', '-')}`,
    metadata: { product, email },
  });
  return NextResponse.json({ checkoutUrl: session.url });
}
