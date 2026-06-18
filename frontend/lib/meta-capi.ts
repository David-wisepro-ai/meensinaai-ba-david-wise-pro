// Conversion API (CAPI) da Meta — server-side.
// Dispara eventos pelo servidor com deduplicação: o mesmo event_id é compartilhado
// entre o Pixel (client-side) e o CAPI (server-side), pra Meta não contar duas vezes.
//
// Credenciais SÓ de servidor (sem NEXT_PUBLIC): META_PIXEL_ID + META_CAPI_TOKEN.
// Se faltar pixel ou token, é no-op silencioso (não quebra o fluxo de lead/compra).
//
// Sem libs npm novas: fetch nativo (Node 18+) + crypto nativo do Node.

import { createHash } from 'crypto';

const GRAPH_VERSION = 'v19.0';

type UserInfo = {
  email?: string | null;
  phone?: string | null;
};

type CapiEventInput = {
  eventName: 'Lead' | 'Purchase';
  eventId: string;
  user: UserInfo;
  // dados do evento (value/currency etc.)
  customData?: Record<string, unknown>;
  // URL de origem, quando disponível (melhora o match da Meta)
  eventSourceUrl?: string | null;
};

// Normaliza e aplica SHA-256 (exigência da Meta pra dados pessoais).
function hash(value: string): string {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

// Telefone: só dígitos antes do hash.
function hashPhone(value: string): string {
  const digits = value.replace(/[^0-9]/g, '');
  if (!digits) return '';
  return createHash('sha256').update(digits).digest('hex');
}

// Envia um evento ao CAPI da Meta. No-op silencioso se faltar config.
export async function sendCapiEvent(input: CapiEventInput): Promise<void> {
  const pixelId = process.env.META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!pixelId || !token) return; // não configurado -> no-op

  const userData: Record<string, string[] | string> = {};
  if (input.user.email) userData.em = [hash(input.user.email)];
  if (input.user.phone) {
    const ph = hashPhone(input.user.phone);
    if (ph) userData.ph = [ph];
  }

  const body = {
    data: [
      {
        event_name: input.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId, // <- casa com o Pixel client-side (dedup)
        action_source: 'website',
        ...(input.eventSourceUrl ? { event_source_url: input.eventSourceUrl } : {}),
        user_data: userData,
        ...(input.customData ? { custom_data: input.customData } : {}),
      },
    ],
  };

  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(
    token,
  )}`;

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    // Falha de rede no CAPI nunca pode derrubar o fluxo de lead/compra.
  }
}
