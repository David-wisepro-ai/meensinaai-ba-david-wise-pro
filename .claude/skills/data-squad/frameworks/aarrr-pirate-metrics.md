# AARRR Pirate Metrics — Dave McClure

> Framework foundational do Dave McClure (500 Startups, 2007). Cinco metricas que cobrem o funil completo de qualquer produto digital. Reutilizavel por toda a squad — Sean Ellis ancora growth machine aqui, Kaushik mapeia dashboard contra isso.

## As 5 metricas

```
Acquisition  → Activation  → Retention  → Referral  → Revenue
   (chega)      (entende)     (volta)      (indica)    (paga)
```

Le-se "AARRR" como um pirata. Nao e ordem de prioridade fixa — e ordem de funil.

## Definicao por etapa

### 1. Acquisition (chega)
- **Pergunta:** quem chega ao produto e por qual canal?
- **Metricas:** visitantes unicos, signups, CAC por canal, share por canal (organic, paid, referral, direct)
- **Anti-pattern:** medir "visitas" sem segmentar canal. Trafego sem origem nao da pra escalar.

### 2. Activation (entende)
- **Pergunta:** o usuario teve uma primeira experiencia que mostra o valor?
- **Metricas:** % que completa onboarding, % que chega ao aha moment, time-to-first-value
- **Aha moment** e a acao especifica que correlaciona com retencao. Ex: Facebook = "7 amigos em 10 dias", Slack = "2.000 mensagens enviadas em um time", Dropbox = "1 arquivo em 1 device".
- **Anti-pattern:** considerar signup como ativacao. Signup e aquisicao concluida, nao ativacao.

### 3. Retention (volta)
- **Pergunta:** o usuario volta a usar o produto na frequencia natural dele?
- **Metricas:** D1/D7/D30 retention, weekly active users / monthly active users (WAU/MAU), retention curve por cohort
- **Frequencia natural** depende do produto. Slack e diaria, Airbnb e mensal/anual, app de IRPF e anual. Medir retention na frequencia errada gera falso negativo.
- **Anti-pattern:** medir DAU em produto de uso semanal. Errado, sempre.

### 4. Referral (indica)
- **Pergunta:** o usuario traz outros usuarios?
- **Metricas:** K-factor (numero de novos usuarios gerados por usuario existente), NPS, share rate
- **K-factor > 1** significa crescimento viral organico. Raro. K-factor 0.3-0.5 ja e excelente como amplificador.
- **Anti-pattern:** assumir referral organico sem instrumentar. Se nao tem UTM ou referral code, nao mede.

### 5. Revenue (paga)
- **Pergunta:** o usuario paga, e quanto, e quantas vezes?
- **Metricas:** ARPU, ARPPU (average revenue per PAYING user), MRR, conversion-to-paid, expansion revenue
- **Anti-pattern:** olhar so MRR agregado. Decompor em new + expansion + churn (NRR de Mehta).

## Como aplicar por modelo de negocio

### SaaS (Slack, Notion, Linear)
- Acquisition: signups por canal, CAC blended e por canal
- Activation: chegou ao aha moment (ex: criou primeiro projeto + convidou 1 pessoa)
- Retention: WAU/MAU > 0.5 (DAU/MAU > 0.5 e excelente)
- Referral: % de signups via invite ou workspace expansion
- Revenue: conversion-to-paid, MRR, NRR (>110% e saudavel)

### E-commerce (Shopify store, D2C)
- Acquisition: sessoes por canal, CAC por canal
- Activation: add-to-cart ou primeira compra
- Retention: repeat purchase rate em janela 90/180 dias
- Referral: K-factor via codigo de indicacao
- Revenue: AOV, LTV (Fader), revenue per visitor

### Marketplace (Airbnb, Uber, Etsy)
- Mede em DOIS LADOS: oferta e demanda
- Acquisition: novos hosts vs novos guests
- Activation: host com primeiro listing publicado / guest com primeira reserva
- Retention: hosts ativos mes a mes / guests recorrentes
- Referral: K-factor cross-side (host indica host, guest indica guest)
- Revenue: GMV, take rate, contribuicao por lado

## North Star Metric vs AARRR

AARRR e o **mapa do funil**. North Star Metric (NSM) e o **um numero** que captura o valor entregue ao cliente.

- NSM Slack: messages sent in a workspace per week
- NSM Airbnb: nights booked
- NSM Spotify: time spent listening

NSM mora dentro de uma das 5 etapas (geralmente Retention ou Revenue). NSM nao SUBSTITUI AARRR — ele e o KPI executivo, AARRR e o painel diagnostico.

## Funnel diagnosis (qual etapa esta vazando)

Olhar conversao etapa-a-etapa:

```
1.000 visitantes
  ↓ 10% (acquisition → activation gap)
100 ativados
  ↓ 40% (activation → retention gap)
40 retidos D30
  ↓ 25% (retention → revenue gap)
10 pagam
```

Onde a queda e desproporcional ao benchmark do segmento, esta o gargalo. SaaS B2B: signup-to-activation > 40% e bom. E-commerce: visit-to-purchase 1-3% e normal. Se voce tem signup-to-activation 8%, ativacao e o gargalo, nao aquisicao.

## Anti-patterns (vanity metrics)

- "Visitantes totais" sem decompor canal e activation
- "Followers" sem medir tap-to-link ou tap-to-buy
- "Downloads" de app sem D7 retention
- "MRR total" sem decompor new + expansion + churn
- "NPS" sem segmentar por cohort de uso

Toda vez que alguem reporta uma metrica e voce nao consegue dizer **qual decisao operacional muda** se o numero subir ou cair, e vanity. Devolva pra reformular.

## Quando usar este framework

- SEMPRE no diagnostico inicial de produto — mapear se cada etapa esta instrumentada
- Quando crescimento estagna e nao se sabe onde
- Antes de aprovar gastos de aquisicao — se retention e furada, gastar em acquisition queima dinheiro
- Em audit pos-mortem de campanha — tracar onde o trafego pago caiu no funil

## Princípio nao-negociavel

AARRR sem North Star vira dashboard sem decisao. NSM sem AARRR vira numero solto. Os dois juntos: NSM diz pra onde ir, AARRR diz onde esta o gargalo pra chegar la.
