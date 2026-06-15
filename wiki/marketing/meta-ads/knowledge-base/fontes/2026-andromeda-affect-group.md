---
tags:
  - meta-ads
  - fonte-canonica
  - andromeda
fonte_original: https://affectgroup.com/blog/andromeda-2026-how-meta-ads-algorithms-now-deliver-our-ads/
data_publicacao: 2026
data_absorcao: 2026-06-01
autor: Affect Group
---

# Fonte: Affect Group — Andromeda Explained (técnico)

## Resumo
Análise técnica profunda do algoritmo. Explica que sistema agora opera em 2 estágios (Retrieval Andromeda + Ranking GEM), usa NVIDIA Grace Hopper + chip próprio MTIA, organiza anúncios em índice hierárquico em árvore. Mudança fundamental: de "quem deve ver" pra "qual anúncio essa pessoa deve ver agora".

## Arquitetura em 2 estágios
1. **Retrieval (Andromeda):** reduz milhões de candidatos pra milhares relevantes
2. **Ranking (GEM):** calcula valor esperado entre ~1.000 anúncios pré-selecionados (eCPM, CTR, conversão)

## Hardware e infraestrutura
- **NVIDIA Grace Hopper Superchip:** CPU + GPU em pacote único, elimina gargalo de memória
- **MTIA (Meta in-house chip):** silício especializado em recomendação
- Ganho: complexidade até 10.000x maior, velocidade 3x superior

## Como Andromeda lê o criativo
- **Visão computacional:** analisa imagens (cores, composição, pessoas)
- **NLP:** avalia texto e mensagem
- **Análise de áudio:** processa trilhas sonoras
- Resultado: Entity ID (impressão digital do significado, não do arquivo)
- 10 anúncios com mesma mensagem = 1 Entity ID
- 4 anúncios com conceitos distintos = 4 Entity IDs

## Índice hierárquico (exemplo da fonte)
```
Apparel > Women's dresses > Summer styles > Beige linen dresses
```
Sistema filtra opções irrelevantes em cada nível.

## Model Elasticity
- Usuários com alta probabilidade de conversão → modelo mais complexo
- Impressões de menor valor → versão simplificada
- Eficiência: +10x

## GEM (Generative Ads Recommendation Model)
- Sequence modeling: lê comportamento como cadeia ordenada de ações
- Multi-task learning: prevê cliques + views + compras simultaneamente
- Generative scoring: pontua cada pareamento usuário-anúncio

## Paradigma: intent vs interests
- **Antes:** rótulos estáticos ("interessado em fitness → academia")
- **Agora:** sequências em tempo real (viu 3 vídeos de cozinha em 60min → anúncio de tinta de cozinha 48h depois)

## Stats cravadas
- 8-22% de melhoria em ROAS para quem se adaptou ao novo modelo
- 10x ganho em eficiência via Model Elasticity
- 3x speed boost no processamento

## Tabela: Antes vs Andromeda
| Aspecto | Antes | Andromeda |
|---|---|---|
| Lógica central | "Quem deve ver?" | "Qual anúncio esta pessoa deve ver agora?" |
| Controle | Segmentação de audiência | Qualidade criativa |
| Targeting | Primário (hiper-segmentado) | Secundário (amplo, com sinais) |
| Processamento | Ranking direto | Retrieval + Ranking |

## O que isso valida do webinar Meta
- Importância do criativo confirmada (agora é o targeting)
- Multimodalidade (imagem + texto + áudio) tudo importa

## O que isso ATUALIZA
- Webinar não tinha 2 estágios (Retrieval + Ranking)
- Entity ID conceitual não existia no webinar
- Estrutura recomendada: 1 campanha, 1 ad set, 10-20+ criativos distintos (webinar não falava disso)

## Aplicações práticas pros agentes do squad
- **strategist:** crava estrutura 1 campanha + 1 ad set + 10-20 criativos como default Andromeda
- **creative-director:** Entity ID é função de SIGNIFICADO, não arquivo. Variar conceito (PDA: Persona, Desire, Awareness), não cor
- **pixel-tracker:** crítico ter Pixel + CAPI bem configurados pra GEM aprender (alimentar dados de conversão precisos)
- **knowledge-curator:** rastrear releases Meta sobre Andromeda + GEM evolution
