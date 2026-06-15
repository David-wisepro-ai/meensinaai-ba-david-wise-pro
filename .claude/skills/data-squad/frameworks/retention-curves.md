# Retention Curves — Smile, Flat, Declining

> Curva de retention e o teste mais honesto de PMF. Andrew Chen e Sean Ellis usam isso como filtro: produto sem curva saudavel nao tem PMF, e nao adianta investir em aquisicao. A curva diz se voce tem produto ou tem promessa.

## Como construir

A partir do cohort table (ver `cohort-analysis.md`), trace o eixo Y (% de usuarios ativos) contra o eixo X (idade do cohort em dias/semanas/meses).

```
%
100 │●
    │ ●
 80 │  ●
    │   ●
 60 │    ●
    │     ●
 40 │      ●●●●●●●●●●●●●●●●●●●  ← curva smile (estabiliza)
    │
 20 │
    │
  0 └────────────────────────────►
     D0  D7  D30  D60  D90  D180     dias
```

## As 3 curvas

### 1. Smile / hockey stick (PMF saudavel)

Forma: cai rapido nas primeiras semanas, depois estabiliza num plateau, e em alguns casos volta a subir (resurrection).

```
%
100 │●
    │ ●
    │  ●
 50 │   ●●
    │     ●●●●●●●●●●●●●●●●●●  ← plateau saudavel
    │                    ●●●  ← resurrection (raro, premium)
  0 └─────────────────────────►
```

- Significado: usuarios que sobrevivem aos primeiros 30 dias se tornam usuarios fieis. Produto entregou valor real.
- SaaS B2B saudavel: plateau em 60-80% no M3+
- App consumer saudavel: plateau em 25-40% no D30+
- Marketplace saudavel: plateau varia muito por categoria

Quando voce ve smile estabilizado, voce tem PMF. Pode investir em aquisicao com confianca.

### 2. Flat (good but not great)

Forma: cai e estabiliza, mas em nivel baixo (10-20%).

- Significado: tem nicho que ama, mas mainstream nao gruda. Produto util mas nao essencial.
- Acao: ou fortalece o aha moment pra ampliar quem chega no plateau, ou aceita o nicho e otimiza CAC pra ficar dentro do CLV daquele nicho

### 3. Declining (no PMF)

Forma: cai e continua caindo. Nunca estabiliza.

```
%
100 │●
    │ ●
    │  ●
    │   ●
    │    ●
    │     ●
    │      ●
    │       ●
  0 └────────●────────────────►
```

- Significado: nao tem PMF. Cada cohort eventualmente vira zero.
- Acao: PARE de investir em aquisicao. Volte pra produto. Sean Ellis Test (ver abaixo). Aquisicao pra produto sem PMF e queimar dinheiro com sorriso no rosto.

## Aha moment

Aha moment = acao especifica que correlaciona fortemente com retention de longo prazo. E o gatilho do smile.

Casos classicos:
- **Facebook**: 7 amigos em 10 dias
- **Slack**: 2.000 mensagens enviadas em um time
- **Twitter**: seguir 30 contas
- **Dropbox**: 1 arquivo em 1 device
- **Airbnb**: primeira reserva concluida com sucesso

Como descobrir o seu:
1. Pegue cohort de 6+ meses
2. Separe em 2 grupos: retidos vs churnados
3. Compare comportamento nas primeiras 2 semanas
4. Procure acao + magnitude que aparece em > 80% dos retidos e < 20% dos churnados

A acao deve ser **comportamental** (algo que o usuario faz no produto), nao demografica (idade, segmento). Demografica nao escala.

## Magic number (Sean Ellis)

Magic number = combinacao de acao + magnitude + janela. Ex: "convidar 3 colegas em 7 dias", nao so "convidar colegas".

Magic number bom tem 3 componentes:
- **Acao especifica** (verbo claro)
- **Magnitude** (quantidade que faz diferenca)
- **Janela curta** (dias, nao meses)

Janela curta porque acao tardia perde efeito. Onboarding tem que dirigir o usuario AO magic number na primeira sessao ou primeira semana.

## Sean Ellis Test (40% threshold)

Pergunta unica: "Como voce se sentiria se nao pudesse mais usar [produto]?"

Opcoes: muito decepcionado / um pouco decepcionado / nao decepcionado / nao uso mais

Threshold: **>= 40% respondem "muito decepcionado"** = sinal forte de PMF.

Roda em cohort de usuarios ativos (nao em base toda, nao em churnados). Amostra minima ~100 respostas.

Util quando retention curve ainda e jovem demais pra estabilizar (produto < 6 meses). Sean Ellis Test e leading indicator de PMF, retention curve e lagging.

## Retention de feature vs produto

Produto inteiro pode ter smile, mas feature individual pode ter declining. Por isso medir retention por feature.

Exemplo Notion:
- Produto: smile saudavel em 50% no M3
- Feature "AI": pode ter declining se virou novidade que cansa
- Feature "Database": smile alto, e core

Decisao: feature com declining vira candidata a remover ou repensar. Feature com smile vira candidata a expandir.

## Anti-patterns

- Declarar smile em 30 dias. Curva precisa de 90+ dias pra estabilizar de verdade.
- Comparar curvas de cohorts de tamanhos muito diferentes. Cohort < 200 usuarios e ruido.
- Misturar canais. Organic vs paid Google Ads vs paid Meta tem curvas totalmente diferentes.
- Cohort de power users sem comparar com cohort de usuarios casuais. Power user sempre retem — nao prova PMF.
- Comemorar plateau sem comparar com benchmark do setor. Plateau 15% e otimo pra app de fitness, terrivel pra Slack.

## Quando usar este framework

- Diagnostico de PMF — antes de qualquer decisao grande de growth ou fundraising
- Antes/depois de mudanca grande de onboarding
- Em decisao de cortar feature (feature declining vs feature smile)
- Em segmentacao de canais — se canal traz cohort declining, pare ou re-target
- Em audit pos-mortem (declining mascarado por crescimento de aquisicao)

## Princípio nao-negociavel

Smile = PMF, vai escalar. Flat = nicho real, otimize CAC pra caber. Declining = volte pra produto, nao queime dinheiro em aquisicao. A curva nao mente — quem mente e o agregado MAU sem cohort.
