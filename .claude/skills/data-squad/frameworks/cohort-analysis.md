# Cohort Analysis — Como construir e ler

> Cohort = grupo de usuarios que compartilham um evento de origem na mesma janela de tempo. Cohort analysis isola o efeito do tempo de uso e permite ver se o produto esta melhorando, estavel ou degradando. Sem cohort, agregados mentem.

## O que e e por que importa

Agregado tipico: "MAU subiu 20% no trimestre". Pode ser:
- Produto melhorando (cohorts novos retem mais)
- Produto piorando, mascarado por aquisicao paga (cohorts novos retem menos, mas chegam em volume maior)

So cohort distingue. Sem cohort, voce nao sabe se esta crescendo ou queimando dinheiro pra parecer que cresce.

## Construir cohort table

Estrutura padrao:

```
Cohort       Size   M0    M1    M2    M3    M4    M5    M6
Jan 2026     1.000  100%  60%   45%   38%   34%   32%   31%
Fev 2026     1.200  100%  62%   48%   40%   36%   33%   —
Mar 2026     1.500  100%  65%   50%   42%   38%   —     —
Abr 2026     1.800  100%  68%   53%   45%   —     —     —
Mai 2026     2.100  100%  70%   55%   —     —     —     —
```

- **Linha** = cohort de signup (mes em que o usuario entrou)
- **Coluna** = idade do cohort (M0 = mes da entrada, M1 = primeiro mes apos)
- **Celula** = % do cohort que ainda esta ativo na coluna

Le-se diagonal e vertical:
- **Diagonal** (mesma idade, cohorts diferentes) = produto esta melhorando? Compare M3 de Jan (38%) com M3 de Abr (45%) — sim, melhorou.
- **Vertical** (mesmo cohort ao longo do tempo) = curva de retention daquele cohort especifico

## Janelas: semanal, mensal, trimestral

Escolha pela frequencia natural do produto:

- **Diaria/semanal** — apps de uso diario (Slack, Notion, jogos mobile). Cohort por semana de signup, colunas D1/D7/D30 ou W1/W2/W3.
- **Mensal** — SaaS B2B, e-commerce com repeat baixo. Cohort por mes de signup.
- **Trimestral** — produtos de venda anual, B2B enterprise. Cohort por trimestre.

Janela errada = cohort fica vazio (frequencia maior que natural) ou plano (frequencia menor que natural). Ambos inuteis.

## Engagement cohorts vs revenue cohorts

### Engagement cohort
Mede % que ainda **usa** o produto. Activation events: login, mensagem enviada, projeto criado.

### Revenue cohort
Mede receita acumulada por cohort ao longo do tempo. Util pra calcular CLV cohort-based (ver `clv-calculation.md`).

```
Cohort       M0     M3      M6      M12
Jan 2026     $50    $180    $340    $620
Fev 2026     $52    $190    $355    —
```

Se revenue cohort cresce monotonamente e estabiliza em alto valor, voce tem expansion revenue (NRR > 100%). Se decresce ou plateia cedo, e contractao.

Engagement cohort SEM revenue cohort engana — pode ter usuario ativo gratuito infinito sem receita. Revenue SEM engagement engana inverso — pode ter receita por inercia (assinatura zumbi).

## Cohort para diagnosticar product changes

Mudancas grandes de produto (novo onboarding, mudanca de pricing, novo aha moment) devem aparecer no cohort POSTERIOR ao deploy.

Padrao: lance mudanca em 15/Mar. Compare:
- Cohorts pre-mudanca (Jan, Fev, ate metade de Mar): baseline
- Cohorts pos-mudanca (Abr, Mai, Jun): efeito

Se M1 dos cohorts pos > M1 dos pre, a mudanca melhorou ativacao. Se M3 dos pos > M3 dos pre, melhorou retencao.

Cuidado: efeito pode levar 60-90 dias pra aparecer em retention curve. Nao declare vitoria em 2 semanas.

## Tools

### SQL (banco proprio)
Padrao basico:

```sql
WITH cohorts AS (
  SELECT user_id,
         DATE_TRUNC('month', signup_at) AS cohort_month
  FROM users
),
activity AS (
  SELECT user_id,
         DATE_TRUNC('month', event_at) AS activity_month
  FROM events
  GROUP BY user_id, activity_month
)
SELECT c.cohort_month,
       a.activity_month,
       COUNT(DISTINCT c.user_id) AS active_users,
       DATEDIFF('month', c.cohort_month, a.activity_month) AS month_index
FROM cohorts c
JOIN activity a USING (user_id)
GROUP BY 1, 2
ORDER BY 1, 2;
```

Pivota o resultado em planilha pra ver o triangulo.

### Mixpanel / Amplitude
Built-in cohort analysis, sem precisar SQL. Bom pra exploracao rapida e times sem analyst dedicado. Cuidado: definicao de "ativo" varia por ferramenta — sempre validar.

### Looker / Metabase
Dashboards persistidos com cohort table. Bom pra comunicacao com leadership.

### Planilha
Pra empresa com < 10k usuarios, planilha basta. Vira armadilha quando volume cresce — migrar pra SQL.

## Anti-patterns

- Cohort de janela errada (mensal num app de uso diario, semanal num produto anual)
- Comparar cohort imaturo (M2) com cohort maduro (M12) e concluir que produto piorou — mais tempo, mais decaimento natural
- Misturar canais sem decompor (cohort do Google Ads vs organic tem retention totalmente diferente)
- Reportar cohort de tamanho 50 — ruido domina sinal. Minimo 200-500 por cohort pra ler tendencia.
- Ler cohort sem segmentar persona — top 20% (Fader whale) tem retention totalmente diferente da base

## Quando usar este framework

- SEMPRE no diagnostico de retention / PMF (ver `retention-curves.md`)
- Antes/depois de qualquer mudanca grande de produto
- Em audit de paid acquisition por canal
- Em planejamento de capacidade (cohort prediz quantos usuarios estarao ativos em 6 meses dado o ritmo de signup)
- Em valuation — cohort table e o documento que investidor sofisticado pede

## Princípio nao-negociavel

Sem cohort table, voce nao tem analise de retention — voce tem opiniao sobre retention. Cohort e o ground truth do produto. Toda decisao de growth, pricing e CAC depende dele.
