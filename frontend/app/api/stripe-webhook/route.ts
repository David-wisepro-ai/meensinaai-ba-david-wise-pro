import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';
import { sendCapiEvent } from '../../../lib/meta-capi';
import Stripe from 'stripe';

// Webhook Stripe: pago -> enrollment + status pago; expirado -> abandonado (dispara recuperacao).
export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !whSecret) return NextResponse.json({ note: 'Stripe nao conectado ainda.' });

  const stripe = new Stripe(secret);
  const sig = req.headers.get('stripe-signature')!;
  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, whSecret);
  } catch (e: any) {
    return NextResponse.json({ error: `assinatura invalida: ${e.message}` }, { status: 400 });
  }

  const sb = supabaseAdmin();
  if (event.type === 'checkout.session.completed') {
    const s = event.data.object as Stripe.Checkout.Session;
    const email = s.customer_email || (s.metadata?.email as string);
    const product = s.metadata?.product as string;
    await sb.from('leads').update({ status: 'pago', updated_at: new Date().toISOString() }).eq('email', email);
    await sb.from('checkout_events').insert({ lead_email: email, product, event: 'pago', stripe_session_id: s.id });
    await sb.from('enrollments').upsert({ email, product, active: true });

    // CAPI server-side: Purchase com value/currency USD.
    // event_id derivado do session.id -> deduplica em retries do webhook.
    // No-op silencioso se META_PIXEL_ID / META_CAPI_TOKEN nao estiverem configurados.
    const value = typeof s.amount_total === 'number' ? s.amount_total / 100 : undefined;
    const currency = (s.currency || 'usd').toUpperCase();
    await sendCapiEvent({
      eventName: 'Purchase',
      eventId: `purchase_${s.id}`,
      user: { email },
      customData: {
        ...(value !== undefined ? { value } : {}),
        currency,
        ...(product ? { content_ids: [product] } : {}),
      },
    });
  }
  if (event.type === 'checkout.session.expired') {
    const s = event.data.object as Stripe.Checkout.Session;
    const email = s.customer_email || (s.metadata?.email as string);
    const product = s.metadata?.product as string;
    await sb.from('leads').update({ status: 'abandonado', updated_at: new Date().toISOString() }).eq('email', email);
    await sb.from('checkout_events').insert({ lead_email: email, product, event: 'abandonado', stripe_session_id: s.id });
    // -> recuperacao-carrinho roda em cima de leads status=abandonado
  }
  return NextResponse.json({ received: true });
}
