# Scaling Playbooks — Traffic Masters Framework

> Playbook de escala de spend de $100/dia ate $100k/dia. Scale Optimizer e Depesh Mandalia sao referencia primaria. Regra: escalar sem sistema = queimar cash mais rapido.

## Os 4 niveis de escala

### Nivel 1: $100/dia (validacao)
- Objetivo: validar oferta, criativo, audiencia
- Conta: 1 campanha, 1-2 ad sets, 3-5 ads
- Estrutura: ABO, audiencia ampla, Advantage+ ON
- KPI primario: CPA abaixo de breakeven, CTR acima de 1.5%
- Decisao: 7 dias com CPA estavel = subir pra nivel 2. Senao, refresh ou kill.

### Nivel 2: $1k/dia (consolidacao)
- Objetivo: encontrar 2-3 audiencias e 3-5 criativos vencedores
- Conta: 1-2 campanhas, 3-5 ad sets, 5-10 ads ativos
- Estrutura: ABO predominante, comecar testar CBO em 1 campanha
- KPI: ROAS blended acima de 2x (ajustar por margem), frequencia abaixo de 2.5
- Decisao: ad set com 50+ conversoes/semana e CPA estavel = candidato pra escala

### Nivel 3: $10k/dia (escala vertical + horizontal)
- Objetivo: escalar vencedores sem matar ROAS
- Conta: 3-5 campanhas, segmentacao por audiencia/objetivo
- Estrutura: CBO predominante, ad sets duplicados em campanhas separadas (campaign dup pattern)
- Refresh de criativo a cada 7-14 dias (cadencia obrigatoria)
- KPI: ROAS marginal acima de breakeven, CAC payback abaixo de 60 dias

### Nivel 4: $100k/dia (escala industrial)
- Objetivo: ocupar inventory disponivel sem queimar margem
- Conta: 10+ campanhas, multi-plataforma (Meta + Google + TikTok + YouTube)
- Estrutura: ASC/PMax + tradicional em paralelo, AI-powered bidding
- Time dedicado: media buyer + creative ops + analytics + financeiro
- KPI: MMM-driven, marginal ROAS, CAC blended cross-channel

**Regra:** voce nao salta nivel. Pular de nivel 1 pra nivel 3 quebra a conta em 2-4 semanas.

## Vertical scale vs Horizontal scale

**Vertical scale (aumentar budget):**
- Subir budget no mesmo ad set/campanha
- Regra: maximo 20-30% por dia em ABO, 50% por semana em CBO
- Risco: Meta/Google ressetam aprendizado se subir muito rapido
- Quando usar: ad set com 50+ conversoes, CPA 20%+ abaixo do breakeven

**Horizontal scale (duplicar audiencias/criativos):**
- Criar novos ad sets com audiencias adjacentes (lookalikes 1-3%, 3-5%, interesses correlatos)
- Criar novos criativos (refresh de hook/angulo)
- Regra: cada novo ad set comeca com budget pequeno (10-20% do ad set ganhador) e prova
- Quando usar: ad set ganhador esta saturando (frequencia subindo, CPM subindo)

**Combinacao ideal:** vertical em vencedores estaveis + horizontal pra abrir novos vencedores. Sem horizontal, vertical eventualmente quebra.

## Creative refresh cadence

Sem refresh de criativo, conta morre. Cadencia por nivel:

| Nivel | Refresh cadence | Volume de criativos novos/semana |
|---|---|---|
| $100/dia | A cada 14-21 dias | 3-5 |
| $1k/dia | A cada 7-14 dias | 5-10 |
| $10k/dia | A cada 5-7 dias | 10-20 |
| $100k/dia | Diario, sistema continuo | 30-50 |

**Tipos de refresh:**
1. **Hook refresh:** mesmo angulo, primeiros 3 segundos novos (mais rapido, mais barato)
2. **Angulo refresh:** beneficio/dor diferente (mais profundo, mais arriscado)
3. **Format refresh:** UGC vs branded vs static vs video (testa formato em si)

**Sinal de necessidade:** frequencia acima de 3.0, CTR caindo mais de 20%, CPA subindo mais de 25%.

## Consolidar vs duplicar campanhas

**Consolidar (CBO + menos ad sets):**
- Quando: muitos ad sets com volume baixo (menos de 50 conversoes/semana cada)
- Beneficio: Meta sai do learning phase mais rapido
- Risco: perde granularidade de dado por audiencia

**Duplicar campanhas (mesma estrutura, multiplas campanhas):**
- Quando: ad set ja saturou e voce quer mais inventory
- Padrao: campaign dup com 2-4 copias da mesma estrutura
- Beneficio: Meta trata cada campanha como nova oportunidade
- Risco: canibalizacao se audiencias overlapam (usar audience overlap tool)

**Regra:** consolida primeiro pra sair do learning, duplica depois pra escalar.

## Account structure por escala

### $100-1k/dia
```
1 conta de ads
├── 1 campanha (Conversion)
│   ├── 1-3 ad sets (ABO)
│   │   └── 3-5 ads
```

### $1k-10k/dia
```
1 conta de ads
├── Brand/Search campaign (Google) ou Retarget (Meta)
├── Cold acquisition campaign
│   ├── 3-5 ad sets (ABO ou CBO)
│   │   └── 5-10 ads (refresh 7-14 dias)
└── Lookalike campaign
    └── 2-3 ad sets
```

### $10k-100k/dia
```
1 conta de ads (ou Business Manager com multi-conta)
├── Brand/Search (Google + Meta brand)
├── Cold acquisition (multi-campaign, CBO)
│   └── Campaign dup pattern (2-4 copias)
├── Retargeting (warm + cart abandon)
├── ASC/PMax (catalogo)
└── Test campaign (sandbox de criativo novo)
```

### $100k+/dia
```
Multi-conta + multi-BM (redundancia)
├── Plataforma Meta (CBO + ASC, multi-campaign)
├── Plataforma Google (Search + PMax + YouTube)
├── Plataforma TikTok (Spark Ads + tradicional)
├── Plataforma LinkedIn (B2B se aplicavel)
└── MMM-driven budget allocation
```

## Sinais de quebra na escala

- ROAS marginal cai abaixo de breakeven em 3 dias seguidos: pausar escala, investigar
- CPM sobe mais de 50% em 7 dias: mercado saturou ou criativo morreu
- Frequencia acima de 4.0 em cold: audiencia esgotada, expandir horizontal
- Aprendizado phase nao sai em 7 dias: budget alto demais pro volume de conversao
- CAC payback ultrapassa 90 dias: escala esta destruindo cash flow

**Acao em qualquer sinal:** pausar escala vertical, voltar ao ultimo nivel estavel, diagnosticar (criativo? audiencia? tracking? oferta?).

## Quando usar este framework

- SEMPRE antes de aumentar budget de campanha existente
- SEMPRE em planejamento de escala mensal/trimestral
- Quando cliente quer "dobrar o spend": validar se conta esta no nivel certo pra suportar
- Em audit pos-quebra: identificar em qual nivel a conta saturou e voltar pro anterior
