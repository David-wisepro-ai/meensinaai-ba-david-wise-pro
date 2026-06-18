// Helper de rastreamento client-side (GTM dataLayer + Meta Pixel).
// Tudo degrada com elegância: se o GTM/Pixel não carregaram (env var vazia),
// as funções viram no-op sem lançar erro.
//
// Os IDs reais entram por variável de ambiente na Vercel (NEXT_PUBLIC_*).
// Este arquivo NUNCA contém ID hardcoded.

export type Produto = 'project_manager' | 'construtor' | 'wise_day';

// Metadados dos 3 produtos pra enriquecer os eventos (nome + valor em USD).
// Valores em USD batem com as landings (Project Manager 250, Construtor 597, Wise Day 497).
const PRODUTO_META: Record<Produto, { nome: string; valor: number }> = {
  project_manager: { nome: 'Project Manager', valor: 250 },
  construtor: { nome: 'Curso de Construtor', valor: 597 },
  wise_day: { nome: 'Wise Day', valor: 497 },
};

const CURRENCY = 'USD';

type DataLayerObject = Record<string, unknown>;

// Acesso seguro ao window (SSR-safe).
function w(): (Window & {
  dataLayer?: DataLayerObject[];
  fbq?: (...args: unknown[]) => void;
}) | null {
  return typeof window === 'undefined' ? null : (window as never);
}

// Empurra um evento no dataLayer do GTM (no-op se GTM não estiver presente).
function pushDataLayer(evento: string, payload: DataLayerObject) {
  const win = w();
  if (!win) return;
  win.dataLayer = win.dataLayer || [];
  win.dataLayer.push({ event: evento, ...payload });
}

// Dispara um evento no Meta Pixel (no-op se fbq não estiver carregado).
function fbqTrack(
  evento: string,
  payload: DataLayerObject,
  opts?: { eventID?: string },
) {
  const win = w();
  if (!win || typeof win.fbq !== 'function') return;
  if (opts?.eventID) {
    win.fbq('track', evento, payload, { eventID: opts.eventID });
  } else {
    win.fbq('track', evento, payload);
  }
}

// Gera um event_id único pra deduplicação Pixel (client) x CAPI (server).
// Usa crypto.randomUUID quando disponível, com fallback simples.
export function gerarEventId(): string {
  const win = w();
  const c = win?.crypto as Crypto | undefined;
  if (c && typeof c.randomUUID === 'function') return c.randomUUID();
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

// ViewContent — ao carregar uma página de venda.
export function trackViewContent(produto: Produto) {
  const meta = PRODUTO_META[produto];
  if (!meta) return;
  const payload = {
    content_name: meta.nome,
    content_ids: [produto],
    content_type: 'product',
    value: meta.valor,
    currency: CURRENCY,
  };
  pushDataLayer('view_content', { produto, ...payload });
  fbqTrack('ViewContent', payload);
}

// Lead — no submit do formulário de captura.
// O event_id casa com o evento Lead disparado server-side pelo CAPI (dedup).
export function trackLead(produto: Produto, eventId: string) {
  const meta = PRODUTO_META[produto];
  if (!meta) return;
  const payload = {
    content_name: meta.nome,
    content_ids: [produto],
    content_type: 'product',
    value: meta.valor,
    currency: CURRENCY,
  };
  pushDataLayer('lead', { produto, event_id: eventId, ...payload });
  fbqTrack('Lead', payload, { eventID: eventId });
}

// InitiateCheckout — quando o lead é redirecionado pro Stripe.
export function trackInitiateCheckout(produto: Produto, eventId: string) {
  const meta = PRODUTO_META[produto];
  if (!meta) return;
  const payload = {
    content_name: meta.nome,
    content_ids: [produto],
    content_type: 'product',
    value: meta.valor,
    currency: CURRENCY,
  };
  pushDataLayer('initiate_checkout', { produto, event_id: eventId, ...payload });
  fbqTrack('InitiateCheckout', payload, { eventID: eventId });
}
