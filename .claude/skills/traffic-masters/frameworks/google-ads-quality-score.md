# Google Ads Quality Score — Traffic Masters Framework

> Framework de Quality Score (QS) e bidding pra Google Ads. Reutilizavel pela squad, com Kasim Aslam como referencia primaria. QS define CPC, posicao e elegibilidade. Sem QS alto, voce paga mais caro pelo mesmo clique.

## Os 3 componentes do Quality Score

QS vai de 1 a 10 por keyword. Composto por:

### 1. Expected CTR
Probabilidade de o anuncio receber clique quando aparece pra essa keyword.
- Melhora com: keyword no headline, RSAs com 15 headlines + 4 descriptions, extensions completas, intent match
- Piora com: keyword generica, ad copy desconectado, low ad strength

### 2. Ad Relevance
Quao alinhado o ad esta com a intencao da keyword.
- Melhora com: SKAG ou STAG (single/small theme ad groups), ad copy com keyword exata
- Piora com: ad group com 50 keywords misturadas, copy generico tipo "We do everything"

### 3. Landing Page Experience
Qualidade da pagina de destino.
- Melhora com: keyword na URL/H1, mobile speed acima de 80 (PageSpeed), match entre promessa do ad e LP
- Piora com: bounce rate alto, LP generica, mobile travado, formularios longos

**Diagnostico rapido:** Keywords tab → adicionar colunas Quality Score, Expected CTR, Ad Relevance, Landing Page Experience. Tudo "Average" ou "Below average" significa fix imediato.

## Como melhorar cada componente

**Expected CTR baixo:**
- Reescrever RSA com keyword exata em 3+ headlines
- Adicionar todas extensions disponiveis (sitelinks, callouts, structured snippets, call, location)
- Pausar keywords com QS abaixo de 5 que nao melhoram em 14 dias

**Ad Relevance baixo:**
- Quebrar ad group: maximo 10-15 keywords por tema
- Criar RSA dedicado por intent
- Negativar termos irrelevantes que estao matchando

**Landing Page Experience baixo:**
- LP dedicada por ad group (nao homepage)
- Speed mobile acima de 80
- Above-the-fold com headline = ad headline

## Smart Bidding: tCPA, tROAS, Max Conv, Max Conv Value

**Maximize Conversions:**
- Sem alvo, Google gasta tudo pra trazer maximo de conversoes
- Usar quando: budget pequeno (menos de $100/dia), ainda validando conversao
- Risco: CPA pode estourar

**Target CPA (tCPA):**
- Voce define CPA alvo, Google ajusta bid
- Usar quando: tem 30+ conversoes em 30 dias, CPA target conhecido
- Setar tCPA 10-20% acima do CPA atual pra dar espaco

**Maximize Conversion Value:**
- Otimiza pra valor total (revenue), nao volume
- Usar quando: tickets variam (e-commerce com produtos diferentes)

**Target ROAS (tROAS):**
- Voce define ROAS alvo, Google ajusta bid
- Usar quando: tem 50+ conversoes em 30 dias, valor por conversao bem rastreado
- Setar tROAS 10-20% abaixo do ROAS atual pra dar espaco de aprendizado

**Regra de transicao:** Maximize Conv → tCPA → tROAS. Cada step exige mais volume e dado limpo.

## Negative keyword strategy

Sem negatives, voce paga por trafego lixo. Camadas:

1. **Universal negatives:** "free", "cheap", "jobs", "salary", "wikipedia", "youtube" (account level)
2. **Brand negatives:** se nao quer competir com afiliados em brand search
3. **Search term review semanal:** Reports → Search Terms. Negativar tudo que nao faz sentido
4. **N-gram analysis:** rodar em volume alto pra achar padroes (ex: "diy", "tutorial", "how to")

**Regra:** zero campanha sem lista de negatives. SKAG/STAG exige negatives entre ad groups (cross-negation).

## Search vs PMax: arvore de decisao

```
Tem catalogo de produtos com feed?
  Sim → Performance Max + Search brand
  Nao →
    Lead gen ou servico?
      Sim → Search puro com tCPA
      Nao →
        Awareness/cold?
          Sim → Demand Gen ou YouTube
          Nao → Search retarget + Display retarget
```

**Performance Max (PMax):**
- Usa todos os inventarios Google (Search, Display, YouTube, Discover, Gmail, Maps)
- Black box: voce nao ve granularidade
- Audience signals OBRIGATORIOS: customer list, lookalikes, interesses (sem isso, PMax queima)
- Nao concorre com Search brand quando voce tem campanha Search brand ativa (boa pratica: brand campaign separada com budget proprio)

**Search:**
- Controle granular, ideal pra B2B, servicos, lead gen
- Estrutura SKAG ou STAG, RSAs com 15/4
- Combina com Display retargeting e RLSA pra fechar funil

## Match types em 2025

Match types mudaram. Realidade atual:
- **Exact match:** ainda matcha variantes proximas, mas e o mais restrito
- **Phrase match:** absorveu broad match modifier, e o sweet spot
- **Broad match:** so com Smart Bidding bem treinado e audience signals fortes

**Recomendacao:** Phrase como default, Exact pra termos high-intent, Broad apenas com tCPA/tROAS rodando ha 30+ dias.

## Quando usar este framework

- SEMPRE antes de subir campanha Google nova
- SEMPRE quando CPC estoura sem motivo claro (provavel QS baixo)
- Em audit pre-handoff: olhar QS medio da conta inteira
- Quando cliente diz "Google Ads e caro" (geralmente: QS baixo + ad group inchado + zero negatives)
