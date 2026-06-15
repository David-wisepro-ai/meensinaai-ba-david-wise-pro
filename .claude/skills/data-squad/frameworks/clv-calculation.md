# CLV Calculation — Customer Lifetime Value

> Framework central de Peter Fader (Wharton, "Customer Centricity"). CLV e a previsao do lucro liquido total que um cliente vai gerar ao longo do relacionamento. Sem CLV nao se sabe quanto se pode pagar pra adquirir um cliente — entao CAC vira chute.

## A formula simplificada

```
CLV = (ARPU × Margem Bruta × Vida Util Media) − CAC
```

Onde:
- ARPU = receita media por usuario na janela (mes ou ano)
- Margem Bruta = % de cada dolar de receita que sobra apos COGS
- Vida Util Media = 1 / churn rate (ex: churn 5% ao mes → vida 20 meses)
- CAC = custo de aquisicao do cliente

Exemplo SaaS B2B:
- ARPU $200/mes, margem 80%, churn 3%/mes, CAC $400
- Vida util = 1/0.03 = 33 meses
- CLV bruto = $200 × 0.80 × 33 = $5,280
- CLV liquido = $5,280 − $400 = $4,880

## Historic vs Predicted CLV

### Historic CLV
Soma o que cada cliente JA gastou ate hoje. Util pra reportar passado, inutil pra decisao de aquisicao.

### Predicted CLV
Estima o que cada cliente VAI gastar. Decisao de aquisicao depende disso. Pode ser feito de tres formas:

1. **Formula simples** (acima) — assume churn constante. Bom pra primeira aproximacao.
2. **Cohort-based** — calcula curva de retention real por cohort, integra a area sob a curva. Mais preciso.
3. **BTYD models (Fader)** — Pareto/NBD, BG/NBD, Gamma-Gamma. Modelos probabilisticos que tratam cada cliente individualmente. Padrao ouro pra e-commerce e contratual com churn variavel.

BTYD (Buy Til You Die) modela duas coisas: probabilidade do cliente ainda estar "vivo" (nao churnou) + frequencia esperada de transacao + ticket esperado. Implementacao: pacote `lifetimes` em Python ou `BTYD` em R.

## LTV/CAC ratio

Numero saudavel pra SaaS:

| Ratio | Diagnostico | Acao |
|---|---|---|
| < 1:1 | Queimando dinheiro | Pare aquisicao paga ja, conserte produto |
| 1:1 a 1:3 | Marginal | Otimizar onboarding e retention antes de escalar |
| 1:3 | Saudavel | Pode escalar aquisicao com confianca |
| 1:5+ | Sub-investindo | Esta deixando crescimento na mesa, acelere paid |

Atencao: 1:5 PARECE otimo, mas indica que voce nao esta investindo o suficiente em aquisicao. Concorrente bem capitalizado vai te passar.

Payback period complementa o ratio. Saudavel: < 12 meses pra SMB SaaS, < 18 meses pra mid-market, < 24 pra enterprise.

## Cohort-based CLV

A formula simples falha quando churn nao e constante. Ela quase NUNCA e constante:

- Churn alto nos primeiros 30 dias (ma ativacao), depois estabiliza
- Cohorts mais novos podem ter retention pior (deterioracao do produto) ou melhor (melhor onboarding)

Cohort-based CLV:
1. Pegue cohort de signup (ex: usuarios que entraram em jan/2026)
2. Trace receita acumulada por usuario em M1, M2, M3...
3. Quando a curva estabiliza (delta < 5% mes a mes), voce tem CLV maduro daquele cohort
4. Compare cohorts: cohorts mais novos sao melhores ou piores?

Se cohort mais novo > cohort mais velho na mesma idade → produto esta melhorando. Verde pra escalar paid. Se inverso → conserte produto antes.

## Como aplicar em decisao de orcamento de aquisicao

Regra: **CAC maximo permitido = CLV / 3**

Exemplo:
- CLV liquido = $4,880
- CAC max = $1,627
- Hoje voce paga $400 → tem espaco enorme pra escalar paid
- Se mercado encarece e CAC vai pra $1,800 → corta canal ou melhora produto

Decisoes que CLV destrava:
- Quanto da pra pagar em Meta/Google sem queimar dinheiro
- Vale a pena programa de afiliado a 30% recurring? (sim se CAC pago < CLV/3)
- Vale onboarding done-for-you a $500? (sim se aumenta CLV em $1,500+)
- Qual segmento pagar mais? (segmentar CLV por persona, nao tratar todos iguais)

## Whale curve (segmentacao)

Plote clientes ordenados por CLV (eixo X) vs receita acumulada (eixo Y). O padrao tipico:

- Top 20% dos clientes geram 60-80% da receita
- Bottom 50% pode gerar receita liquida NEGATIVA (suporte custa mais que pagam)

Implicacao: customer-centricity de Fader = focar aquisicao e retencao no top 20%. Nao tratar todos cliente igual.

## Anti-patterns

- Calcular CLV sobre receita bruta (sem margem). Infla numero, leva a CAC suicida.
- Usar ARPU agregado (ignora segmento). Top 20% e bottom 80% tem CLV 10× diferente.
- CLV sem cohort. Mascara deterioracao temporal.
- LTV/CAC sobre cohort imaturo. Antes de 12 meses, CLV ainda nao estabilizou.
- Ignorar payback. Ratio bom com payback 36 meses quebra fluxo de caixa.

## Quando usar este framework

- Antes de aprovar orcamento de paid acquisition
- Em decisoes de pricing (CLV por tier define quem aguenta upgrade)
- Em segmentacao de aquisicao (focar canal que traz cohort de CLV alto)
- Em decisao de retention investment (DFY onboarding caro paga se aumenta CLV)
- Em valuation (CLV total da base × multiplier do setor)

## Princípio nao-negociavel

CAC sem CLV e gambling. CLV historic sem cohort e nostalgia. CLV agregado sem segmento e media — e media engana. Sempre: predicted, cohort-based, segmentado.
