# Attribution Models — Traffic Masters Framework

> Framework de atribuicao pra trafego pago. Cada modelo conta historia diferente sobre o mesmo dado. Decisao errada de atribuicao = decisao errada de budget. Pixel Specialist e referencia primaria, mas toda a squad precisa entender.

## Os 6 modelos principais

### 1. Last-click
Da 100% do credito ao ultimo touchpoint antes da conversao.
- Default historico do Google Analytics (UA), default antigo do Google Ads
- Bom pra: bottom-funnel evaluation, retargeting puro
- Ruim pra: avaliar awareness, top-of-funnel, multi-touch journeys
- Vies: superestima retargeting + brand search, subestima cold

### 2. First-click
Da 100% do credito ao primeiro touchpoint.
- Bom pra: avaliar discovery channels (cold paid, content, SEO)
- Ruim pra: avaliar fechamento (esses canais nao recebem credito)
- Vies: superestima awareness, subestima retargeting

### 3. Linear
Distribui credito igualmente entre todos os touchpoints.
- Bom pra: visao balanceada de funil multi-step
- Ruim pra: avaliar canal especifico (todo mundo recebe igual)
- Vies: tira credito de canais que sao realmente decisivos

### 4. Time-decay
Da mais credito a touchpoints proximos da conversao.
- Bom pra: ciclos de venda longos onde recencia importa
- Configuracao tipica: half-life de 7 dias
- Vies: ainda subestima awareness (mas menos que last-click)

### 5. Position-based (U-shaped)
40% pro primeiro touchpoint, 40% pro ultimo, 20% distribuido no meio.
- Bom pra: reconhecer que descoberta + fechamento sao os momentos chave
- Ruim pra: jornadas com muitos touchpoints intermediarios decisivos
- Vies: assume que meio do funil e menos importante

### 6. Data-driven (DDA)
Algoritmo (geralmente Shapley value) calcula contribuicao real de cada touchpoint baseado em dados.
- Default atual do Google Ads e GA4
- Bom pra: contas com volume alto (50+ conversoes/mes minimo no Google)
- Ruim pra: contas com pouco volume (volta pra last-click)
- Vies: caixa preta, voce nao consegue auditar facil

## Quando usar cada um

| Cenario | Modelo recomendado |
|---|---|
| E-commerce com 30 dias de janela | Data-driven ou time-decay |
| Lead gen B2B com ciclo longo | Linear ou position-based |
| Avaliando channel novo (cold) | First-click ou data-driven |
| Avaliando retargeting | Last-click |
| Audit completo de funil | Comparar 3+ modelos lado a lado |
| Budget baixo, pouco volume | Last-click (DDA precisa de dado) |

**Regra:** nunca tome decisao com 1 modelo so. Compare pelo menos 2 (ex: data-driven + first-click) pra ver se a historia bate.

## iOS 14.5 + privacy sandbox: o que mudou

iOS 14.5 (abril 2021) e ATT (App Tracking Transparency) destruiram atribuicao client-side em iOS:
- 70-90% dos usuarios iOS optam por nao serem rastreados
- Pixel client-side perde maioria dos eventos pos-clique em iOS
- Janelas de atribuicao reduzidas (Meta: 7-day click + 1-day view default)
- Aggregated Event Measurement: maximo 8 eventos priorizados por dominio

**Privacy Sandbox (Chrome):** vai matar third-party cookies em 2025-2026. Mesma logica do iOS chega ao desktop.

**Solucao:** server-side tracking obrigatorio.

## Server-side tracking: CAPI + GTM SS

**Conversion API (CAPI) Meta:**
- Eventos disparam do servidor pra Meta direto, sem depender de browser
- Recupera 30-50% de eventos perdidos pelo iOS
- Match quality alto (email, telefone, IP, fbp/fbc) e critico
- Setup: Stape, Shopify CAPI, Stripe webhook, ou direto via API

**Google Tag Manager Server-Side (GTM SS):**
- GTM rodando em container server-side (Cloud Run, App Engine)
- Cookies first-party, eventos validados antes de enviar
- Reduz dependencia de tags client-side
- Setup mais complexo, mas e o padrao pos-cookies

**Eventos chave server-side:**
- Purchase / conversao final (sempre)
- Lead / form submit (se lead gen)
- InitiateCheckout / AddToCart (e-commerce)

Sem CAPI ou GTM SS, qualquer modelo de atribuicao em 2025+ esta degradado.

## MMM vs MTA: nivel macro vs micro

**MTA (Multi-Touch Attribution):**
- User-level, touchpoint by touchpoint
- Os 6 modelos acima sao MTA
- Bom pra: contas com tracking limpo, otimizacao tatica
- Limite: privacy sandbox e iOS quebram MTA progressivamente

**MMM (Marketing Mix Modeling):**
- Top-down, regressao estatistica de spend vs revenue por canal
- NAO depende de tracking individual
- Bom pra: contas grandes ($100k+/mes), decisoes de alocacao macro
- Resistente a privacy changes
- Limite: precisa de 12+ meses de dados, demora pra reagir

**Quando usar cada:**
- Spend abaixo de $50k/mes: MTA com data-driven + comparacao multi-modelo
- Spend $50k-$500k/mes: MTA + MMM trimestral pra calibrar
- Spend acima de $500k/mes: MMM como decisao primaria, MTA como otimizacao tatica

**Solucoes:** Robyn (Meta open source), Google LightweightMMM, Recast, Northbeam, Triple Whale (com MMM module).

## Incrementality testing

Padrao ouro de atribuicao: teste A/B real pra medir lift incremental.

- Geo split: liga ad em mercado A, nao liga em B, mede diferenca de revenue
- Holdout audience: 10-20% do publico nao recebe ad, compara conversao
- Lift studies (Meta nativo, Google Conversion Lift)

Roda 1-2x por trimestre por canal principal. So assim voce sabe quanto do ROAS reportado e real vs canibalizacao.

## Quando usar este framework

- SEMPRE antes de definir ROAS target (modelo errado = target errado)
- SEMPRE em audit de conta multi-channel
- Quando cliente diz "Meta nao funciona" mas Google "vai bem" (provavel: last-click tirando credito de Meta)
- Quando spend cresce acima de $50k/mes e decisoes de alocacao ficam pesadas
