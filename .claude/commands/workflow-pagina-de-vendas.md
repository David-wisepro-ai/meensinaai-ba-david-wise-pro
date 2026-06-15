<!--
TEMPLATE WORKFLOW — adapte aos seus contextos.
Substitua [SUA EMPRESA], [CEO], [SEU PUBLICO] e demais placeholders pelos seus dados reais.
Workflow original validado pela [SUA EMPRESA]; estrutura mantida, dados sanitizados.
-->

# Workflow: Página de Vendas Persuasiva

Execute este workflow completo para criar uma página de vendas de alta conversão para a [SUA EMPRESA].

## Quando Usar
- Lançamento de novo produto
- Renovação de página de vendas existente
- Criação de página para upsell ou downsell

---

## FASE 1 — INTELIGÊNCIA DE OFERTA (hormozi-squad)

**Acione:** `/hormozi-squad criar-oferta`

Tarefa do hormozi-offers:
1. Definir a Promessa Irresistível (Grand Slam Offer)
2. Mapear o valor percebido vs. preço
3. Criar os bônus estratégicos (stacking)
4. Definir a garantia ideal
5. Identificar o mecanismo único do produto

**Output esperado:**
- Nome do produto + tagline
- Promessa central (resultado específico + prazo + sem sacrifício)
- Lista de bônus com valor percebido
- Estrutura de preço + garantia
- Mecanismo único diferenciador

---

## FASE 2 — IDENTIFICAÇÃO DE PÚBLICO (data-squad + hormozi-squad)

**Acione:** `/data-squad identificar-publico` + `/hormozi-squad gerar-leads`

Tarefas:
1. data-squad → identificar ICP (Ideal Customer Profile) com dados do Supabase
2. hormozi-leads → mapear onde esse público está e como atingi-lo
3. Definir as 3 maiores dores do público-alvo
4. Definir os 3 maiores desejos/sonhos
5. Identificar objeções principais

**Output esperado:**
- ICP detalhado (nicho, dor, desejo, objeção)
- Top 3 dores em linguagem do cliente
- Top 3 desejos em linguagem do cliente
- Objeções mapeadas com respostas

---

## FASE 3 — COPYWRITING DA PÁGINA (copy-squad)

**Acione:** `/copy-squad criar-pagina-de-vendas`

Estrutura padrão da página (copy-chief coordena):

### Bloco 1 — HEADLINE + SUBHEADLINE
- Responsável: eugene-schwartz + gary-halbert
- Criar 5 versões de headline para teste
- Headline deve conter: resultado + público + prazo

### Bloco 2 — LEAD / GANCHO (primeiros parágrafos)
- Responsável: gary-halbert + john-carlton
- Ativar a maior dor ou o maior desejo
- Criar urgência de atenção imediata

### Bloco 3 — HISTÓRIA DO FUNDADOR
- Responsável: kindra-hall (do Storytelling Squad se acionado)
- Jornada do [CEO]: de [JORNADA DO CEO]
- Usar modelo Storyworthy (momento de mudança)

### Bloco 4 — O PROBLEMA (agitação)
- Responsável: dan-kennedy
- Descrever a vida sem o produto
- Amplificar a dor sem solução

### Bloco 5 — A SOLUÇÃO + MECANISMO ÚNICO
- Responsável: russell-brunson + todd-brown
- Apresentar o produto como única saída lógica
- Explicar o mecanismo único de forma simples

### Bloco 6 — O QUE VOCÊ VAI RECEBER (bullets)
- Responsável: gary-bencivenga
- 10-15 bullets no formato "Como [resultado] mesmo se [objeção]"
- Cada bullet deve criar desejo específico

### Bloco 7 — PROVA SOCIAL
- Responsável: joe-sugarman
- Depoimentos reais de alunos (mais de 1.000 alunos)
- Resultados específicos com números

### Bloco 8 — APRESENTAÇÃO DA OFERTA COMPLETA
- Responsável: dan-kennedy + frank-kern
- Valor total do produto + bônus
- Ancoragem de preço
- Preço final com justificativa

### Bloco 9 — GARANTIA
- Responsável: gary-halbert
- Garantia irresistível que elimina risco do comprador

### Bloco 10 — CTA (Call to Action)
- Responsável: russell-brunson
- Botão + urgência + o que acontece depois do clique
- Copy do botão: ação específica (ex: "Quero Automatizar Meu Negócio Hoje")

### Bloco 11 — FAQ
- Responsável: david-deutsch
- Responder as 5-7 objeções mais comuns
- Última pergunta deve reforçar a compra

---

## FASE 4 — NARRATIVA E HISTÓRIA (storytelling — opcional, recomendado)

**Acione:** `/storytelling historia-pessoal` + `/storytelling story-para-vendas`

Tarefas:
1. Estruturar a história do [CEO] na Jornada do Herói
2. Criar 3 micro-histórias de alunos para usar na página
3. Criar a narrativa "antes e depois" do produto

---

## FASE 5 — REVISÃO E OTIMIZAÇÃO

**Acione:** `/copy-squad revisar-copy`

1. copy-chief revisa a página completa
2. Verificar: clareza, desejo, urgência, credibilidade, CTA
3. Score mínimo: 8/10 antes de publicar
4. [CEO_ORQUESTRADOR] aprova versão final

---

## REGRAS INVIOLÁVEIS
- NUNCA usar hífens (—) em nenhuma parte da página
- Tom: autoritário, de referência
- Preços: USD para público US, BRL para Brasil
- NUNCA citar nomes de empresas clientes
- Alunos: "mais de 1.000 alunos"

## Entregável Final
- Arquivo `.md` com a página completa estruturada por blocos
- 5 versões de headline para A/B test
- Copy do botão CTA testado
- Depositar em `agent_reports` (report_type: 'sales_page')

$ARGUMENTS
