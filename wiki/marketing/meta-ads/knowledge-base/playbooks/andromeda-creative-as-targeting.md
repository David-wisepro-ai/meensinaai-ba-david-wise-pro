---
tags:
  - meta-ads
  - playbook
  - andromeda
fontes:
  - [[../fontes/2026-andromeda-logical-position]]
  - [[../fontes/2026-andromeda-segwise]]
  - [[../fontes/2026-andromeda-anchour]]
  - [[../fontes/2026-andromeda-affect-group]]
versao: 1.0.0
ultima_atualizacao: 2026-06-01
---

# Playbook: Andromeda — Criativo é o Targeting

## A mudança fundamental (outubro/2025 → 2026)
Antes: anunciante escolhia interesses, demografia, lookalikes. Meta entregava.
Agora: **Meta lê o CRIATIVO pra decidir quem vê o anúncio**. Audience-based virou creative-based.

> "Seu criativo agora é seu targeting."

## Arquitetura técnica (2 estágios)
1. **Retrieval (Andromeda):** reduz milhões de candidatos pra milhares relevantes
2. **Ranking (GEM):** calcula valor esperado entre ~1.000 anúncios pré-selecionados

## Por que funciona
- Powered by NVIDIA Grace Hopper Superchip + chip próprio MTIA
- 100x mais rápido que o sistema antigo
- Lida com 10.000x mais variações de anúncio em paralelo
- Retrieval algorithm matcha pessoa-anúncio em tempo real
- Model Elasticity: usuário alta-conv usa modelo complexo, baixa-conv usa simplificado (+10x eficiência)

## Entity ID (impressão digital do significado)
Andromeda analisa:
- **Visão computacional:** imagens (cores, composição, pessoas)
- **NLP:** texto e mensagem
- **Análise de áudio:** trilhas, tom, ritmo, valência emocional

Resultado: Entity ID atribuído ao SIGNIFICADO, não ao arquivo.
- 10 anúncios com mesma mensagem = 1 Entity ID = 1 oportunidade
- 4 anúncios com conceitos distintos = 4 Entity IDs = 4 oportunidades

**Creative Similarity Score > 60%** entre 2 anúncios = Andromeda agrupa e suprime entrega.

## O que mudou na prática

### Quantidade de criativos
- Antes: 3-5 criativos por ad set
- Agora: **10-15 ativos conceitualmente distintos por campanha Advantage+**
- Em conta de scale: **25 criativos ativos** num único ad set bate 5 ad sets com 5 criativos cada (+17% conv, -16% custo)
- "Conceitualmente distintos" = ângulos radicalmente diferentes, não variação de cor

### Fadiga
- Antes: 6+ semanas
- Agora: **2-3 semanas** (Segwise) ou **10-14 dias** com high spend (Logical Position)
- Ciclo de produção precisa acelerar, exploração mensal vira semanal

### Métrica rei
- **CPMr (cost per 1000 reach)** separa scale de stagnation
- Alvo: **< $20**
- > $20 = pagando pra mostrar o mesmo anúncio pra mesma gente

### Audience
- Wide por default
- Advantage+ Audience supera manual na maioria dos casos
- Fatiar audience demais → Breakdown Effect. Ver [[breakdown-effect]]

### Estrutura de campanha (Anchour)
Default Andromeda 2026:
- 1 Campanha de Vendas (Advantage+ broad full-funnel)
- 1 Campanha de Awareness (ThruPlay)
- 1 Campanha de Remarketing (View Content, ATC, engajados)

## Diversidade de ângulos (sistema portfólio 6 tipos)
Cada campanha precisa cobrir 4+ dos 6: Problema/Solução, Prova Social, Oferta, Educacional, UGC, Fundador.

## Gatilhos emocionais que Andromeda premia
- Aspiração
- Urgência
- Confiança
- Curiosidade

## Aplicação prática pro squad
- **strategist:** default = Advantage+, audience wide, focar volume de criativos, estrutura 3 campanhas
- **creative-director:** aumentar diversidade radical, não variação leve. Variar SIGNIFICADO, não cor
- **analyst:** vigiar CPMr semanal, alertar > $20. Adicionar Hook Rate (3s/imp) + Hold Rate (15s/3s)
- **optimizer:** ciclo de fadiga 2-3 semanas é gatilho de troca
- **pixel-tracker:** GEM precisa de dados de conversão precisos. Pixel + CAPI bem configurados é PRÉ-REQUISITO

## Estatística cravada
- Advantage+ Shopping: **−17% CPA vs manual em média** (ver [[advantage-plus-shopping]])
- Contas alinhadas com Andromeda: **+20-35% ROAS** vs estruturas legadas
- 70-80% do performance Meta vem da FORÇA DO CRIATIVO, não de budget/targeting

## Combinação com expansão/exploração
- Expansão ([[expansao-criativa]]) continua válida MAS reduzir peso
- Exploração ([[exploracao-criativa]]) ganha peso porque Andromeda absorve diversidade melhor
