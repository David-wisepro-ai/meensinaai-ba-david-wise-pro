<!--
TEMPLATE WORKFLOW — adapte aos seus contextos.
Substitua [SUA EMPRESA], [CEO], [SEU PUBLICO] e demais placeholders pelos seus dados reais.
Workflow original validado pela [SUA EMPRESA]; estrutura mantida, dados sanitizados.
-->

# Workflow: Identificar Público para Novos Produtos

Execute este workflow para descobrir e validar o público ideal antes de criar ou lançar um novo produto na [SUA EMPRESA].

## Quando Usar
- Antes de criar qualquer novo produto ou curso
- Antes de lançar para um nicho novo
- Para validar se uma ideia tem mercado suficiente
- Para encontrar o melhor ângulo de entrada

---

## FASE 1 — ANÁLISE DE DADOS INTERNOS (data-squad)

**Acione:** `/data-squad identificar-publico`

**Perguntas que o data-squad deve responder com dados do Supabase:**

1. Quais nichos de alunos têm maior LTV? (peter-fader)
2. Quais alunos engajam mais? Qual perfil? (avinash-kaushik)
3. Quais produtos/conteúdos têm mais demanda orgânica? (sean-ellis)
4. Quais segmentos têm mais carrinho abandonado? (dados de `cart_abandonments`)
5. Qual nicho (cleaning/construction/aesthetics/real estate) representa mais vendas? (dados de `sales_data`)

**Output esperado:**
- Top 3 nichos com maior potencial
- Perfil do aluno com maior LTV
- Gaps de produto identificados nos dados

---

## FASE 2 — ANÁLISE DE MERCADO E TENDÊNCIAS (hormozi-squad + advisory-board)

**Acione:** `/hormozi-squad gerar-leads` + `/advisory-board diagnosticar`

**Hormozi-leads investiga:**
1. Onde está esse público online? (grupos, fóruns, redes)
2. Qual é a maior dor não resolvida do nicho?
3. Qual é o resultado que mais desejam?
4. Que produto está vendendo bem para esse público atualmente?
5. Qual é o nível de consciência do público sobre IA?

**Advisory Board consulta:**
- Naval Ravikant: existe alavancagem de tecnologia nesse nicho?
- Peter Thiel: o produto pode criar um monopólio de categoria?
- Reid Hoffman: há potencial de network effect?

**Output esperado:**
- Mapa de consciência do público (Eugene Schwartz)
- Top 3 dores em linguagem do cliente
- Top 3 desejos em linguagem do cliente
- Análise de concorrência e gaps

---

## FASE 3 — CONSTRUÇÃO DO ICP (Ideal Customer Profile) (data-squad + hormozi-squad)

**Acione:** `/data-squad construir-audiencia`

Construir o ICP com:

### Dados Demográficos
- Nicho de atuação (cleaning/construction/aesthetics/real estate)
- Localização (EUA — qual estado? Flórida, Texas, Califórnia?)
- Faixa de receita atual do negócio
- Tempo no mercado

### Dados Psicográficos
- Maior frustração do dia a dia
- Maior sonho para o negócio
- O que já tentou e não funcionou
- O que consome de conteúdo online

### Nível de Consciência de IA
- Nunca usou IA
- Testou mas não implementou
- Usa pontualmente
- Quer escalar com IA

### Poder de Compra
- Investe em educação? Quanto por ano?
- Já comprou curso similar?
- Tomador de decisão no negócio?

---

## FASE 4 — VALIDAÇÃO DE DEMANDA (hormozi-squad + traffic-masters)

**Acione:** `/hormozi-squad criar-oferta` (versão MVP) + `/traffic-masters estrategia-brasil-latam`

1. hormozi-offers cria uma oferta MVP para validação (sem investimento total ainda)
2. Criar 3 ângulos de mensagem diferentes para testar
3. traffic-masters (pedro-sobral) define estratégia de validação no Meta Ads
4. Definir orçamento mínimo de teste ($300-500 USD para validar)
5. KPIs de validação: CTR > 1.5%, CPL < $15, taxa de conversão > 3%

---

## FASE 5 — BRIEFING PARA PRODUTO (Renata + Thiago)

Após validação, entregar para:
- **Renata (Product Ideator):** briefing completo do público + ideia de produto
- **Thiago (Product Builder):** especificações técnicas do produto
- **Patricia (Course Creator):** estrutura de conteúdo baseada nas dores do ICP

**Formato do Briefing:**
```
PRODUTO: [nome]
PÚBLICO: [ICP detalhado]
PROMESSA CENTRAL: [resultado + prazo + sem sacrifício]
DORES ATACADAS: [top 3]
DESEJOS ATIVADOS: [top 3]
OBJEÇÕES A TRATAR: [top 3]
PREÇO SUGERIDO: [USD/BRL]
VALIDAÇÃO: [dados coletados]
POTENCIAL: [estimativa de mercado]
```

---

## FASE 6 — RELATÓRIO EXECUTIVO PARA [NOME_CEO]

[CEO_ORQUESTRADOR] consolida e apresenta ao [CEO]:
- Público recomendado para o novo produto
- Dados que sustentam a decisão
- Risco estimado
- Próximos passos

---

## REGRAS
- Nunca criar produto sem passar pelo Fase 1 e 3
- Nunca lançar sem a Fase 4 de validação
- Sempre basear em dados do Supabase + pesquisa de mercado

## Entregável Final
- ICP completo em documento
- 3 ângulos de mensagem testados
- Decisão de GO / NO-GO com justificativa
- Depositar em `agent_reports` (report_type: 'market_research')
- Depositar ideia em `product_ideas`

$ARGUMENTS
