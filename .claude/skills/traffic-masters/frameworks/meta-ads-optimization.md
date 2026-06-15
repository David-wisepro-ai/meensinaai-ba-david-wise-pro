# Meta Ads Optimization — Traffic Masters Framework

> Framework consolidado de Meta Ads (Facebook + Instagram + Reels). Reutilizavel pela squad: Molly Pittman, Ralph Burns, Depesh Mandalia, Nicholas Kusmich e Pedro Sobral compartilham essa base e divergem em estilo, nao em fundamento.

## CBO vs ABO: quando usar cada um

**CBO (Campaign Budget Optimization):** budget no nivel da campanha, Meta distribui entre ad sets.
- Usar quando: ja tem 3+ ad sets validados, quer Meta otimizar mix, escala acima de $500/dia
- Risco: Meta concentra spend em 1-2 ad sets, mata os outros sem dar chance

**ABO (Ad Set Budget Optimization):** budget por ad set, controle manual.
- Usar quando: testando audiencias novas, validando criativo, budget abaixo de $200/dia
- Risco: gestao manual mais pesada, mas voce decide alocacao

**Regra pratica:** comeca em ABO ate ter 2-3 ad sets ganhadores claros, migra pra CBO pra escalar.

## Advantage+ Shopping Campaigns (ASC)

Campanha automatizada Meta para e-commerce e DTC. Usa AI pra targeting, criativo dinamico, placements.

- Usar quando: catalogo grande, conversoes consistentes (50+/semana), budget acima de $1k/dia
- NAO usar: oferta nova sem historico, lead gen B2B, servicos high-ticket
- Configuracao: existing customer cap (15-30%), audience suggestions ON, no exclusions iniciais
- KPI: ROAS blended, NAO ROAS por ad set (Meta nao expoe granularidade)

## Audience Expansion (Advantage Audience)

Default agora em quase todos os objetivos. Meta expande alem de interesses/lookalikes.

- Manter ON em budgets pequenos (menos de $100/dia): Meta precisa de espaco pra aprender
- Manter OFF em campanhas de retarget puro (warm audience definida)
- Lookalikes 1-3% ainda funcionam, 1-10% so com volume alto

## Pixel + CAPI + Conversion API (obrigatorio, nao opcional)

Sem CAPI, voce perde 30-50% de eventos pos-iOS 14.5. Setup minimo:

1. Pixel base no site (GTM ou direto)
2. CAPI server-side via Stape, Stripe webhook, Shopify, ou direto via Conversion API
3. Match quality minimo 7.0 (idealmente 8.5+): email, telefone, fbp, fbc hashed
4. Eventos chave dedupados: PageView, AddToCart, InitiateCheckout, Purchase, Lead
5. Aggregated Event Measurement: priorizar 8 eventos por dominio (Purchase no slot 1)

**Diagnostico rapido:** Events Manager → Diagnostics. Se ve "low match quality" ou "missing parameters", parar a campanha e arrumar antes.

## Creative Testing: framework 3-5-7

Sistematica de teste pra nao queimar budget no chute.

- **3 angulos** por oferta: cada angulo e um beneficio/dor diferente, nao variacao visual
- **5 hooks** por angulo: primeiros 3 segundos diferentes, mesma promessa
- **7 dias minimos** de teste por bateria: menos que isso e ruido estatistico

Estrutura: 1 ad set, 3-15 ads, budget $50-150/dia, otimizando pra conversao (ou ATC se volume baixo).

Vencedor = top 1-2 por CPA + CTR. Mata o resto. Refaz com novos angulos.

## Campaign budget rules (por escala)

**$50/dia:**
- 1 campanha, 1 ad set, 3-5 ads
- ABO, audiencia ampla, Advantage+ ON
- Foco: validar oferta, achar ad ganhador
- KPI: CTR acima de 1.5%, CPA abaixo de breakeven

**$500/dia:**
- 1-2 campanhas, 3-5 ad sets, 5-10 ads ativos
- ABO migrando pra CBO conforme valida
- Lookalikes 1-3% + interesses + ampla
- KPI: ROAS blended acima de 2x, frequencia abaixo de 2.5

**$5k/dia e acima:**
- Campaign duplicacao por audiencia, CBO predominante
- ASC + campanhas tradicionais em paralelo
- Refresh de criativo a cada 7-14 dias
- KPI: ROAS marginal acima de breakeven, CAC payback abaixo de 60 dias

## Aprendizado phase + breakeven CPA

**Aprendizado:** ad set precisa de 50 conversoes em 7 dias pra sair de "learning". Se nao atinge, considera consolidar audiencias ou aumentar budget.

**Breakeven CPA:** CPA maximo que ainda da margem positiva. Formula:

```
Breakeven CPA = AOV × Margem Bruta − Custo Fixo Marginal
```

Toda campanha tem que rodar abaixo do breakeven. Acima = queima cash, mesmo se ROAS parece "ok".

**Regra de ouro:** se CPA esta 20% abaixo do breakeven por 7 dias, escala 20% por dia. Se passa breakeven por 3 dias, pausa e revisa.

## Sinais de fadiga (kill or refresh)

- Frequencia acima de 3.0 em audiencia fria
- CTR cai mais de 30% em 7 dias
- CPA sobe mais de 25% sem mudar nada
- Comments negativos aumentam (Quality ranking cai)

Acao: refresh de criativo (novo hook, novo angulo) ou expandir audiencia.

## Quando usar este framework

- SEMPRE antes de subir campanha Meta nova
- SEMPRE quando CPA estoura ou ROAS despenca
- Quando cliente diz "Meta nao funciona pra mim" (geralmente: pixel quebrado ou criativo fraco)
- Em audit de conta pre-handoff entre agencias
