# Auditoria do pipeline x sistema (o que ja roda x o que falta)

> Comparacao entre as 7 etapas do pipeline e o que o codigo + schema realmente fazem hoje.
> Base: `frontend/app/api/lead/route.ts`, `frontend/app/api/stripe-webhook/route.ts`, `scripts/migrations/001_quiz_schema.sql`.
> NAO altera codigo, landing nem portal (fora do escopo deste agente).

## Cobertura por etapa

| Etapa | Status alvo | Coberto pelo sistema hoje? | Observacao |
|-------|-------------|----------------------------|------------|
| Lead novo | `lead_novo` | NAO automatico | Enum existe no schema, mas nenhum codigo seta `lead_novo`. Lead de WhatsApp (Facebook Ads) precisa de entrada manual. |
| Atendimento | `atendimento` | NAO automatico | Enum existe; transicao 100% manual da atendente no Pedro. |
| Checkout iniciado | `checkout_iniciado` | SIM | `/api/lead` grava antes do Stripe + evento. Funciona. |
| Nao pagou | `abandonado` | PARCIAL | Webhook seta `abandonado` no `checkout.session.expired`. Falta o passo que marca `recuperacao_enviada`. |
| Recuperacao enviada | `recuperacao_enviada` | NAO | Enum existe; nenhum codigo escreve. Depende de `recuperacao-carrinho`. |
| Aluno (pagou) | `pago` | SIM | Webhook `completed` seta `pago` + cria `enrollment`. Funciona. |
| Ativo | `ativo` | NAO | Enum existe; nenhum codigo promove `pago` -> `ativo`. Falta regra de ativacao. |
| Upsell | (etiqueta) | NAO | Sem campo de conclusao de produto; sem disparo de oferta. |

Resumo: 2 das 7 etapas rodam sozinhas (checkout_iniciado, pago). O esqueleto de dados (enum completo) JA existe no schema, entao nao falta migration; falta a logica/operacao que escreve esses status.

## Lacuna importante (coerencia codigo x schema)

O enum de `leads.status` ja preve `lead_novo`, `atendimento`, `recuperacao_enviada`, `ativo`, mas NENHUMA rota escreve esses 4 valores. Hoje o `leads.status` so transita entre `checkout_iniciado`, `pago`, `abandonado`. As outras 4 etapas existem so no papel/CRM. Isso nao e bug de codigo (o schema esta certo e generoso), e sim trabalho de operacao/integracao que ainda nao foi feito.

## Pendencias humanas / config no Pedro

### P1 (alta): Entrada de lead de WhatsApp no pipeline
- Lead que vem do Facebook Ads direto pro WhatsApp (sem passar pelo LeadForm) nao entra no Supabase nem no Pedro hoje. Esse e exatamente o furo antigo da escola.
- **Acao:** definir com o David como a atendente cadastra esse lead. Opcoes: (a) form interno simples, (b) cadastro manual no Pedro que o coordenador espelha pro Supabase como `lead_novo`. Decisao do David.

### P2 (alta): Sinal de "concluiu o produto" (dispara upsell)
- Nao existe campo que marque conclusao de Project Manager ou Construtor. Sem ele, o upsell e por data ou manual.
- **Acao:** David define como marcar conclusao (turma encerrada / presenca / progresso no portal). Ate la, coordenador usa janela por data + confirmacao manual.

### P3 (media): Regra de ativacao (`pago` -> `ativo`)
- Definir o que e "ativo" por produto: PM (login/presenca ao vivo), Construtor (login no portal de simulados), Wise Day (presenca no dia).
- **Acao:** David confirma o criterio. Para o Construtor, `quiz_attempts` ja serve de sinal de login.

### P4 (media): Fechar o loop da recuperacao
- `recuperacao-carrinho` precisa marcar `recuperacao_enviada` apos disparar (evita reenvio) e definir a janela de handoff pra atendente (sugestao: 48h).
- **Acao:** parametrizar janela com o David.

### P5 (config): Conexao Pedro <-> Supabase
- `crm-escola-coordenador` espelha `leads`/`enrollments` no Pedro via MCP/REST (token na call). Falta: token do Pedro + mapeamento das 7 etapas como estagios no Pedro + mapeamento das etiquetas de upsell.
- **Acao:** criar os 7 estagios no Pedro e fornecer token. NUNCA SQL pro David.

### P6 (config): Stripe ainda nao conectado
- `/api/lead` e o webhook ja tem fallback "Stripe nao conectado". Sem `STRIPE_SECRET_KEY` / price IDs / webhook secret, nada de `pago`/`abandonado` chega.
- **Acao:** David cola chaves test+live + price IDs dos 3 produtos na call (.env gitignored). Sem isso o pipeline para no `checkout_iniciado`.

## Recomendacao
Ordem de ataque: P6 (sem Stripe nada flui) -> P1 (parar de perder lead de WhatsApp) -> P5 (espelhar no Pedro) -> P4 (fechar recuperacao) -> P3 -> P2 (upsell).
