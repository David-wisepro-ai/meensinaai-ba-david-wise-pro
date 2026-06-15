<!--
TEMPLATE WORKFLOW — adapte aos seus contextos.
Substitua [SUA EMPRESA], [CEO], [SEU PUBLICO] e demais placeholders pelos seus dados reais.
Workflow original validado pela [SUA EMPRESA]; estrutura mantida, dados sanitizados.
-->

# Workflow: Crescimento Orgânico + Pago

Sprint semanal de crescimento integrado: orgânico (Marina) + pago (Fernando/Camila) + dados (data-squad).

## Quando Usar
- Toda segunda-feira para planejar a semana
- Quando crescimento estiver abaixo da meta
- Para escalar o que está funcionando

---

## SEGUNDA — ANÁLISE + PLANEJAMENTO

### Análise Orgânica (Marina)
**Acione:** `/marina` (relatório semanal)
1. Performance da semana anterior vs. média 7 dias
2. Top 3 posts e por que funcionaram
3. Horários com mais alcance
4. Temas com mais engajamento

### Análise Pago (Fernando)
**Acione:** `/fernando` (relatório semanal)
1. ROAS por campanha
2. CPL e CAC da semana
3. Campanhas para escalar vs. pausar
4. Oportunidades de otimização

### Análise de Dados (data-squad)
**Acione:** `/data-squad analisar-dados`
1. Cohort de novos alunos (de onde vieram?)
2. Taxa de conversão orgânico vs. pago
3. LTV por canal de aquisição

---

## TERÇA — CRIAÇÃO DE CONTEÚDO

### Briefing da Semana ([CEO_ORQUESTRADOR] coordena)
Com base nos dados de segunda, definir:
- 1 tema central da semana (o que está performando)
- Formatos por funcionário

### Execução Paralela

**Ana Paula** → 3 carrosseis
- Storytelling Squad apoia: `/storytelling story-carrossel`
- hormozi-hooks apoia: `/hormozi-squad criar-hooks`

**Rafael** → 1 vídeo YouTube + roteiro
- Storytelling Squad apoia: `/storytelling story-para-video`

**Lucas** → 2-3 Reels curtos
- Baseado nos hooks que performaram na semana anterior

**Beatriz** → 1 newsletter semanal
- Copy Squad apoia: `/copy-squad criar-email-sequencia` (se semana de lançamento)

---

## QUARTA — TRÁFEGO PAGO

**Fernando + Camila + traffic-masters:**
**Acione:** `/traffic-masters analisar-performance`

1. Revisar campanhas ativas
2. Escalar o que tem ROAS > 3x
3. Testar novo criativo (Camila executa briefing do traffic-masters)
4. pedro-sobral: ajuste de segmentação para brasileiro nos EUA

**Regra de escala:**
- ROAS > 3x por 3 dias seguidos = aumentar budget 20%
- ROAS < 2x por 2 dias = pausar e revisar

---

## QUINTA — VENDAS + CRM

**Rodrigo:**
- Follow-up de leads quentes da semana
- Análise de objeções mais comuns
- Relatório para [CEO_ORQUESTRADOR]

**Pedro (CRM/GHL):**
- Sequências automatizadas de nurture rodando?
- Alunos inativos nos últimos 7 dias = reengajamento automático

**Juliana:**
- Carrinhos abandonados da semana recuperados?
- Taxa de recuperação < 15% = revisar copy com Copy Squad

---

## SEXTA — REVISÃO + META DA SEMANA

**Marcos (CFO):**
- Receita da semana vs. meta semanal ($10k/mês = $2.5k/semana)
- Projeção para o mês
- Alerta se abaixo de 80% da meta semanal

**[CEO_ORQUESTRADOR]:**
- Briefing semanal em `ceo_briefings`
- Decisão de ajuste para próxima semana
- Alerta ao [CEO] se qualquer coisa estiver crítica

---

## KPIs SEMANAIS

| Métrica | Meta |
|---------|------|
| Novos seguidores Instagram | +300/semana rumo a 100k |
| Taxa de engajamento | > 3% |
| Leads gerados (pago) | > 50/semana |
| Receita semanal | > $2.500 |
| ROAS geral | > 3x |
| Emails abertos | > 35% |

---

## ALERTAS AUTOMÁTICOS
Qualquer funcionário cria alerta em `alerts` quando:
- Métrica cai > 20% da média de 7 dias
- ROAS < 2x por 2 dias seguidos
- Crescimento de seguidores < 100 na semana
- Receita semanal < $1.500

## Entregável
- Relatório semanal consolidado em `agent_reports` (report_type: 'weekly_growth')
- Briefing do CEO em `ceo_briefings`

$ARGUMENTS
