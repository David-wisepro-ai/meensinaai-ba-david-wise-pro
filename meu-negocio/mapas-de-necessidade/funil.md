---
pilar: Funil de captação → venda → upsell
data: 2026-06-15
fonte: diagrama desenhado pelo Fábio (reunião/instalação 15/jun)
status: transcrito fielmente + mapeado pros agentes construídos
---

# Mapa de Necessidade — Funil Wise Pro Academy

![Mapa](./funil.png) <!-- placeholder: anexar o PNG do diagrama aqui -->

## Transcrição fiel do diagrama

**Tronco (entrada):**
`Escola Entrada de Lead` → `Tráfego` → bifurca em 2 caminhos:

### Caminho A — Facebook → WhatsApp
`Facebook` → `WhatsApp` → `Não Cadastra, solução CRM` → bifurca:
- **A1 (virou aluno):** `Se se tornou Aluno (vai para o Grupo do WhatsApp)` → `Solução é Pipeline` → `Colocar todos os dados do Aluno no CRM` → `O prazo de curso é de 2 meses` → `Vendeu por $250` → *(Próximo Curso ou Upsell)* → `Curso de Construtor $597 — Presencial dura 6 dias` → *(Próximo Curso ou Upsell)* → `Wiseday (presencial) $497 — Um dia com David`
- **A2 (não virou aluno):** `Não se tornou Aluno` → `Solução vai pro Pipeline`

### Caminho B — Site → Stripe → recuperação
`Tentou site mas não deu certo (wiseproacademy.io)` → `Pra fazer o pagamento, colocar ponte de interesse e mandar para o CRM (Stripe)` → `Colocar integração com o Stripe` → *(rótulo: Recuperação de Carrinho e pra quem vendeu)* → `Colocar integração com o Stripe` → bifurca:
- `Resend — Free até 3.000 emails por mês`
- `U-WhatsApp — R$ 50 (Stevo)`

## Leitura do funil (o que o desenho quer dizer)
1. Lead entra por tráfego (Facebook). Vai pro WhatsApp **ou** pro site.
2. Hoje "não cadastra" → a dor é capturar e organizar no **CRM**.
3. Antes do Stripe, captura nome/email/telefone (ponte de interesse) → entra no CRM mesmo se não pagar.
4. Não pagou → **recuperação de carrinho** por **e-mail (Resend)** + **WhatsApp (Stevo)**.
5. Virou aluno → entra no grupo do WhatsApp + dados completos no CRM + **escada de upsell**: PM ($250) → Construtor ($597) → Wise Day ($497).
6. Não virou → fica no pipeline pra nutrição/reabordagem.

## Mapeamento pros agentes/entregáveis JÁ construídos
| Nó do funil | Coberto por |
|---|---|
| Tráfego / Facebook | squad **traffic-masters** + Meta Ads (carimbados) |
| WhatsApp atendimento (atendente entra depois) | integração WhatsApp (Stevo/Z-API) no `funil-checkout-escola` |
| "Não cadastra" → captura | `/api/lead` (captura nome/email/telefone ANTES do Stripe) |
| CRM / Pipeline (aluno e não-aluno) | Pedro (o CRM) + `crm-escola-coordenador` — pipeline dos 3 produtos |
| Dados do aluno no CRM + grupo WhatsApp | enrollment + `crm-escola-coordenador` |
| Integração Stripe + ponte pré-pagamento | `funil-checkout-escola` + `/api/stripe-webhook` (pago/abandonado) |
| Recuperação de carrinho (e-mail + WhatsApp) | `recuperacao-carrinho` + Resend + Stevo (~3h pós-abandono) |
| 3 landing pages (PM / Construtor / Wiseday) + upsell | `builder-landing-escola` + escada no pipeline |
| Site institucional (wiseproacademy.io) | site v1 + `gbp-escola` (Google/reviews) |

## Onde o PORTAL DO ALUNO entra (não está no desenho — é o fulfillment)
O funil acima é o fluxo de **venda/CRM**. O **portal de simulados CSL** (598 questões) é o **produto entregue** quando alguém compra o **Curso de Construtor** — fica "depois" do nó `Curso de Construtor $597`. É o diferencial que destrava anunciar o curso de construtor.

## Vira o PLANO DE AÇÃO
Este mapa é o insumo do plano de ação que o CEO IA executa: cada nó → um agente já sabe o que fazer. Ver `meu-negocio/plano-de-acao.md`. Pendente: anexar o PNG do diagrama.
