---
versao: 1.0.0
ultima_atualizacao: 2026-06-15
gerado_por: juliana (Cart Recovery)
status: codigo pronto (depende de credenciais do David pra ligar)
---

# Recuperacao de Carrinho - Spec de disparo

## Visao geral

Sequencia curta por lead que abandonou o checkout: **e-mail na hora** + **WhatsApp ~3h depois** + **handoff humano**. Roda sobre o status do lead no Supabase. Sem terceira mensagem automatica (linha vermelha: nao spammar).

```
checkout_iniciado ──(Stripe pago)──> pago        (sai da recuperacao)
        │
        └──(Stripe expired, webhook)──> abandonado
                                            │  STAGE 1: e-mail Resend (proximo tick do cron)
                                            ▼
                              recuperacao_email_enviada
                                            │  STAGE 2: WhatsApp Stevo/Z-API (>= 3h depois)
                                            ▼
                              recuperacao_enviada  ──> ATENDENTE entra manual (handoff humano)
```

- `abandonado` ja e gravado pelo `frontend/app/api/stripe-webhook/route.ts` (evento `checkout.session.expired`). NAO mexi nesse arquivo.
- `checkout_iniciado` e gravado pelo `frontend/app/api/lead/route.ts`. NAO mexi nesse arquivo.

## Arquivos criados

| Arquivo | O que e |
|---|---|
| `frontend/app/api/recuperacao/route.ts` | Rota de disparo idempotente, dirigida por cron. Faz STAGE 1 (e-mail) e STAGE 2 (WhatsApp) em cada execucao. |
| `frontend/app/api/recuperacao/copy.ts` | Copy dos 3 produtos (versao "de maquina" com placeholders) + helpers de preenchimento e escape HTML. |
| `frontend/vercel.json` | Vercel Cron chamando `/api/recuperacao` a cada 15 min. |
| `meu-negocio/recuperacao-carrinho/copy-recuperacao.md` | Copy legivel (fonte de verdade humana). |

## Logica (idempotente, sem duplicar disparo)

Cada estagio so age sobre UM status especifico e, ao terminar, move o lead pro proximo status. Isso garante que um lead nunca recebe o mesmo disparo duas vezes, mesmo com o cron rodando a cada 15 min.

- **STAGE 1 (e-mail T+0):** seleciona `status='abandonado'`. Como o cron roda a cada 15 min, "na hora" = em ate ~15 min do abandono (Stripe leva minutos pra emitir o `expired` de qualquer forma). Envia via Resend. Move pra `recuperacao_email_enviada` e carimba `updated_at`.
- **STAGE 2 (WhatsApp T+~3h):** seleciona `status='recuperacao_email_enviada'` com `updated_at <= agora - 3h`. Envia via Stevo ou Z-API. Move pra `recuperacao_enviada` (handoff).
- **Pagou no meio:** o webhook ja move pra `pago`, entao o lead some das duas filas. Nenhum disparo extra.
- **Sem telefone:** pula o WhatsApp e vai direto pro handoff (`recuperacao_enviada`), pra atendente decidir.
- **Provider/Resend nao configurado:** o disparo falha "soft" (lead fica no mesmo status, tenta no proximo tick quando as credenciais existirem). App nunca quebra.

Cada disparo tambem grava uma linha em `checkout_events` (`recuperacao_email_enviada`, `recuperacao_enviada`) pra auditoria/CRM (Pedro).

## Provider de WhatsApp (Stevo OU Z-API)

Escolhido pela env `WHATSAPP_PROVIDER` (`stevo` ou `zapi`). So um fica ativo. O numero usado e o da atendente (mesma conta de onde ela atende), pra conversa continuar natural no handoff.

## Variaveis de ambiente (TODAS placeholder - David preenche)

> `.env` e gitignored. Nenhuma credencial vai pro repo. David cola na call -> `.env` local + envs na Vercel.

```
# --- Supabase (ja usado no resto do app) ---
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

# --- Site (link de retomada). Se vazio, usa o origin da request ---
PUBLIC_SITE_URL=https://wiseproacademy.io

# --- Resend (e-mail T+0) ---
RESEND_API_KEY=
RESEND_FROM=Wise Pro Academy <inscricao@wiseproacademy.io>

# --- WhatsApp: escolher UM provider ---
WHATSAPP_PROVIDER=        # "stevo" ou "zapi"

# Stevo (se WHATSAPP_PROVIDER=stevo)
STEVO_API_URL=
STEVO_TOKEN=
STEVO_INSTANCE=

# Z-API (se WHATSAPP_PROVIDER=zapi)
ZAPI_INSTANCE=
ZAPI_TOKEN=
ZAPI_CLIENT_TOKEN=        # opcional, conforme conta Z-API

# --- Protecao do cron ---
CRON_SECRET=              # Vercel injeta como "Authorization: Bearer <CRON_SECRET>" no cron
```

## Como ligar (passo a passo pro David)

1. Confirmar dominio verificado na Resend (`wiseproacademy.io`) pra usar `RESEND_FROM` proprio. Free ate 3k/mes basta.
2. Escolher Stevo ou Z-API, criar a instancia ligada ao numero da atendente, pegar token.
3. Preencher as envs acima no `.env` local e na Vercel (Project Settings -> Environment Variables).
4. Deploy. O `vercel.json` ja registra o cron a cada 15 min.
5. Teste manual autenticado: `GET /api/recuperacao?key=<CRON_SECRET>` (ou `curl -H "Authorization: Bearer <CRON_SECRET>"`). Retorna contagem de e-mails/WhatsApp enviados.

## Notas de seguranca

- Endpoint protegido por `CRON_SECRET` (header Bearer ou query `?key=`). Sem secret configurado, ainda roda (util em dev local), mas em producao SEMPRE setar o secret.
- Service role do Supabase so no servidor (rota server-side), nunca exposto ao client.
- Corpo do e-mail escapa HTML do nome e usa `encodeURI` no link (anti-injecao).
- Sequencia limitada a 1 e-mail + 1 WhatsApp por lead. Sem reenvio enquanto status nao muda.

## Ajustes possiveis

- Cadencia do cron: mudar `*/15 * * * *` em `vercel.json` (ex: `*/30` pra cada 30 min).
- Atraso do WhatsApp: `WHATSAPP_DELAY_MS` no `route.ts` (default 3h).
- Tamanho do lote: `BATCH` no `route.ts` (default 50 por execucao).
