# Pipeline CRM dos 3 produtos (carimbado no Pedro)

> Fonte de verdade do funil da Wise Pro Academy dentro do Pedro (CRM da Me Ensina AI Solutions, liberado pro David).
> NAO reconstroi o Pedro. Carimba o setup dele com este pipeline.
> Amarrado nos status reais que o sistema ja gera (Supabase: `leads`, `checkout_events`, `enrollments`).
> Auditoria de coerencia codigo x schema: ver `auditoria-pipeline.md`.

## 1. Estrutura de dados real (o que o sistema gera hoje)

Confirmado em `scripts/migrations/001_quiz_schema.sql` + rotas da API.

**Tabela `leads`** (1 linha por email, upsert por email):
- Campos: `name`, `email`, `phone`, `product`, `status`, `created_at`, `updated_at`.
- Enum de `status` (constraint do schema): `lead_novo`, `atendimento`, `checkout_iniciado`, `abandonado`, `recuperacao_enviada`, `pago`, `ativo`.

**Tabela `checkout_events`** (log append-only, 1 linha por evento):
- Campos: `lead_email`, `product`, `event`, `stripe_session_id`, `created_at`.
- Enum de `event`: `checkout_iniciado`, `pago`, `abandonado`.

**Tabela `enrollments`** (quem comprou qual produto):
- Campos: `email`, `product`, `active`.
- Enum de `product`: `project_manager`, `construtor`, `wise_day`.
- `enrollment` de `construtor` com `active=true` destrava o portal de simulados.

Quem grava o que (do codigo):
- `POST /api/lead` (LeadForm) -> upsert `leads` com `status=checkout_iniciado` + insere `checkout_events.checkout_iniciado`. Depois cria sessao Stripe.
- `stripe-webhook` `checkout.session.completed` -> `leads.status=pago` + `checkout_events.pago` + upsert `enrollments` `active=true`.
- `stripe-webhook` `checkout.session.expired` -> `leads.status=abandonado` + `checkout_events.abandonado`.

## 2. Etapas do pipeline (mapeadas no status real)

```
lead novo -> atendimento -> checkout iniciado -> nao pagou (recuperacao) -> aluno (pagou) -> ativo -> upsell
```

| # | Etapa no Pedro | `leads.status` | Gatilho de entrada (evento real) | Quem move |
|---|----------------|----------------|----------------------------------|-----------|
| 1 | Lead novo | `lead_novo` | Lead capturado mas ainda sem checkout (ex: Facebook Ads -> WhatsApp, ou form sem ir pro Stripe) | `funil-checkout-escola` / entrada manual da atendente |
| 2 | Atendimento (WhatsApp) | `atendimento` | Atendente humana iniciou conversa no WhatsApp | atendente humana (manual no Pedro) |
| 3 | Checkout iniciado | `checkout_iniciado` | `checkout_events.checkout_iniciado` (LeadForm enviou pro Stripe) | sistema (automatico) |
| 4 | Nao pagou (recuperacao) | `abandonado` -> `recuperacao_enviada` | `checkout_events.abandonado` (sessao Stripe expirou) | sistema -> `recuperacao-carrinho` |
| 5 | Aluno (pagou) | `pago` | `checkout_events.pago` (Stripe completed) + cria `enrollment` | sistema (automatico) |
| 6 | Ativo | `ativo` | Aluno comecou a consumir o produto (login no portal / presenca na turma) | `crm-escola-coordenador` (regra de ativacao, ver secao 5) |
| 7 | Upsell | (mantem `ativo`, etiqueta de upsell) | Concluiu o produto atual -> elegivel pro proximo | `crm-escola-coordenador` -> playbook de upsell |

Observacoes:
- O caminho 100% automatico hoje e: `checkout_iniciado` -> (`pago` ou `abandonado`). Etapas 1, 2, 6, 7 dependem de regras/acoes ainda nao escritas no codigo (ver `auditoria-pipeline.md`).
- `abandonado` e `recuperacao_enviada` sao a mesma etapa de pipeline ("nao pagou"); `recuperacao_enviada` so marca que a sequencia ja saiu, pra nao reenviar.

## 3. Transicoes de status (maquina de estados)

```
lead_novo --(atendente abre WhatsApp)--> atendimento
atendimento --(clicou e foi pro Stripe)--> checkout_iniciado
lead_novo --(form -> Stripe direto)--> checkout_iniciado   (caminho do LeadForm hoje)
checkout_iniciado --(Stripe completed)--> pago
checkout_iniciado --(Stripe expired)--> abandonado
abandonado --(recuperacao-carrinho disparou)--> recuperacao_enviada
recuperacao_enviada --(voltou e pagou)--> pago
recuperacao_enviada --(atendente retomou no WhatsApp)--> atendimento
pago --(consumiu o produto / login portal)--> ativo
ativo --(concluiu produto)--> ativo + etiqueta upsell
```

Regra de ouro: o status NUNCA regride sozinho. Recuperacao que volta a falar com a atendente vira `atendimento` (etapa humana), nao volta pra `lead_novo`.

## 4. Como o lead capturado nunca se perde (do LeadForm ate o Pedro)

A dor central da escola era leads sumindo no WhatsApp sem cadastro. Blindagem:

1. **Captura ANTES do Stripe.** `POST /api/lead` grava o lead no Supabase (`status=checkout_iniciado`) ANTES de redirecionar pro Stripe. Se o cara desistir na tela do cartao, ele JA esta no banco. Codigo confirma: lead gravado na etapa 1 da rota, Stripe so na etapa 2.
2. **Upsert por email.** O lead nunca duplica: se o mesmo email voltar, atualiza a linha existente. Historico de tentativas fica em `checkout_events` (append-only).
3. **Espelhamento no Pedro.** `crm-escola-coordenador` espelha `leads` + `enrollments` no pipeline do Pedro (via MCP/REST do Pedro). Todo lead capturado entra como contato numa etapa, sem excecao.
4. **Lead de fora do form (Facebook -> WhatsApp).** Lead que chega direto no WhatsApp (sem passar pelo form) precisa entrar como `lead_novo` no pipeline. Hoje isso e MANUAL (atendente cadastra) -> ver pendencia P1 na auditoria. Sem isso, esse lead "se perde" do mesmo jeito de antes.
5. **Sincronizacao de eventos.** Cada `checkout_events` (iniciado/pago/abandonado) atualiza a etapa do contato no Pedro. O CRM e sempre reflexo do Supabase, nunca diverge.

## 5. Onde a atendente humana entra

A automacao cobre captura, checkout e a PRIMEIRA tentativa de recuperacao. A humana entra depois disso:

- **Etapa 2 (atendimento):** lead que chega via WhatsApp (Facebook Ads). Atendente cadastra/move pra `atendimento` e conduz a venda.
- **Pos recuperacao automatica:** `recuperacao-carrinho` dispara a sequencia automatica em cima de `status=abandonado` e marca `recuperacao_enviada`. Se mesmo assim NAO pagar dentro da janela (sugestao: 48h apos `recuperacao_enviada`), o `crm-escola-coordenador` levanta a flag e a atendente assume no WhatsApp (volta pra `atendimento`, agora 1:1 humano). A automacao tenta primeiro; a humana fecha o que a maquina nao fechou.
- **Ativacao manual quando nao ha login digital:** Construtor e presencial (6 dias) e Wise Day e 1 dia presencial. Pra esses, "ativo" pode depender de presenca confirmada pela atendente, nao de login no portal.

## 6. Gargalos que o coordenador aponta

`crm-escola-coordenador` monitora e alerta:
- Leads parados em `atendimento` sem evoluir pra `checkout_iniciado` (atendente nao converteu).
- Leads parados em `checkout_iniciado` sem `pago` nem `abandonado` (sessao Stripe nem expirou nem fechou -> cliente travou na tela de pagamento).
- `recuperacao_enviada` que nao virou `pago` na janela -> handoff pra atendente.
- `pago` que nao virou `ativo` (comprou e sumiu, nao comecou) -> risco de churn/reembolso -> aciona `isabela` (retention) se necessario.
