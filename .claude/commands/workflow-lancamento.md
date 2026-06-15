<!--
TEMPLATE WORKFLOW — adapte aos seus contextos.
Substitua [SUA EMPRESA], [CEO], [SEU PUBLICO] e demais placeholders pelos seus dados reais.
Workflow original validado pela [SUA EMPRESA]; estrutura mantida, dados sanitizados.
-->

# Workflow: Lançamento de Produto

Playbook completo de lançamento da [SUA EMPRESA], do pré-lançamento ao pós-venda.

## Quando Usar
- Lançamento de novo produto ou curso
- Relançamento de produto existente
- Lançamento para nova audiência/nicho

---

## PRÉ-REQUISITOS (antes de iniciar)
- [ ] ICP identificado (`/workflow-identificar-publico`)
- [ ] Oferta criada (`/hormozi-squad criar-oferta`)
- [ ] Página de vendas pronta (`/workflow-pagina-de-vendas`)
- [ ] Produto construído (Thiago) ou pronto para vender

---

## FASE 1 — ESTRATÉGIA DE LANÇAMENTO (hormozi-squad + advisory-board)

**Acione:** `/hormozi-squad planejar-lancamento`

Definir:
1. Tipo de lançamento: PLF (Product Launch Formula) / Webinário / Oferta direta / Challenge
2. Janela de lançamento: quantos dias?
3. Meta de receita do lançamento
4. Meta de alunos
5. Estratégia de urgência/escassez

**Advisory Board consulta:** `/advisory-board framework-decisao`
- Reid Hoffman: estamos em blitzscaling ou crescimento sustentável?
- Charlie Munger: qual o risco de falha e como inverter?

---

## FASE 2 — CONTEÚDO DE AQUECIMENTO (Ana Paula + Rafael + Marina)

**Duração: 7-14 dias antes**

### Semana -2 (aquecimento frio)
- Ana Paula: 3 carrosseis sobre o problema que o produto resolve
- Rafael: 2 vídeos YouTube sobre o tema central
- Marina: calendário editorial de aquecimento

### Semana -1 (aquecimento quente)
- Ana Paula: 3 carrosseis sobre a solução e prova social
- Rafael: 1 vídeo de bastidores / making-of
- Beatriz: sequência de 3 emails de aquecimento (andre-chaperon do Copy Squad)
- Marina: stories diários com contagem regressiva

**Storytelling Squad apoia:** `/storytelling story-para-video`
- Narrativa de aquecimento usando Jornada do Herói

---

## FASE 3 — TRÁFEGO PAGO DE AQUECIMENTO (traffic-masters + Fernando + Camila)

**Acione:** `/traffic-masters lancamento-campanha`

1. pedro-sobral: estratégia para lista de leads brasileiros nos EUA
2. Campanha de leads (CPL meta: < $8)
3. Retargeting para lista de emails existente
4. Lookalike de compradores anteriores (dados de `sales_data`)
5. Orçamento: 20% do budget total na fase de aquecimento

---

## FASE 4 — DIA(S) DE LANÇAMENTO

### Abertura do Carrinho

**Beatriz (Newsletter):**
- Email 1 (abertura): "Carrinho aberto — [produto] está disponível"
- Email 2 (+12h): prova social + depoimentos
- Email 3 (+24h): história de transformação de aluno

**Copy Squad suporta:** `/copy-squad criar-email-sequencia`

**Ana Paula:** posts de lançamento (urgência + oferta)
**Marina:** stories de lançamento em tempo real
**Rafael:** vídeo de lançamento no YouTube

### Tráfego Pago de Conversão
- traffic-masters: escalar campanhas de conversão
- Retargeting pesado para quem visitou a página
- Meta ROAS: 3x mínimo

---

## FASE 5 — RECUPERAÇÃO E URGÊNCIA (Juliana + Rodrigo)

**Carrinho Abandonado (Juliana):**
- Email 1 (+1h do abandono): lembrete simples
- Email 2 (+24h): objeção principal respondida
- Email 3 (+48h): urgência + escassez

**Copy Squad suporta:** `/copy-squad criar-copy-carrinho`

**Vendas Ativas (Rodrigo):**
- Follow-up para leads quentes
- Framework CLOSER do hormozi-closer
- DMs para interessados que não compraram

---

## FASE 6 — FECHAMENTO DO CARRINHO

**Beatriz:**
- Email "últimas horas" (+último dia -6h)
- Email "última chance" (+último dia -1h)
- Email "carrinho fechado" (pós-encerramento — nurture para próximo lançamento)

**Marina:** contagem regressiva nos stories
**tráfego:** desligar campanhas ou redirecionar para lista de espera

---

## FASE 7 — PÓS-LANÇAMENTO (Pedro + Marcos + [CEO_ORQUESTRADOR])

**Pedro (CRM/GHL):**
- Onboarding automático dos novos alunos
- Sequência de boas-vindas no GHL
- Pesquisa de satisfação +3 dias

**Marcos (CFO):**
- Relatório financeiro do lançamento
- ROI por canal
- Comparação com meta

**[CEO_ORQUESTRADOR]:**
- Briefing completo em `ceo_briefings`
- Decisão: relançar? Escalar? Pivotar?

---

## KPIs DO LANÇAMENTO

| Métrica | Meta Mínima | Meta Ideal |
|---------|-------------|------------|
| Taxa abertura email | 30% | 45%+ |
| Taxa clique email | 5% | 10%+ |
| CTR anúncios | 1.5% | 3%+ |
| Taxa conversão página | 2% | 5%+ |
| ROAS campanhas | 3x | 5x+ |
| Carrinho recuperado | 10% | 20%+ |

## Entregável Final
- Relatório de lançamento em `agent_reports` (report_type: 'launch_report')
- Dados financeiros em `financial_reports`
- Briefing em `ceo_briefings`

$ARGUMENTS
