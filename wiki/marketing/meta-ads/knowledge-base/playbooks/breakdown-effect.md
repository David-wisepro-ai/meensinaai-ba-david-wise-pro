---
tags:
  - meta-ads
  - playbook
  - tecnico
fonte: conteúdo educacional absorvido de mathiaschu/meta-ads-analyzer (auditado, laudo #1)
versao: 1.0.0
ultima_atualizacao: 2026-06-01
---

# Playbook: Breakdown Effect

## O que é
Fenômeno onde segmentação fina de audience faz ad sets do MESMO anunciante competirem no leilão um contra o outro. Anunciante paga CPM mais alto pra alcançar a mesma pessoa que já podia alcançar com 1 ad set único.

## Como detectar
- Múltiplos ad sets na mesma campanha com sobreposição de audiência > 25%
- CPM subindo enquanto reach total não cresce
- Frequência em ad sets individuais não bate com soma esperada (gente sendo "roubada" entre ad sets)
- CPMr aumentando sem mudança de criativo nem de budget

## Como evitar
1. **Em Advantage+:** deixar audiência wide, Meta decide segmentação interna
2. **Em campanhas manuais:**
   - Máximo 3-5 ad sets por campanha
   - Exclusões cruzadas explícitas (ad set A exclui audience de ad set B)
   - Não fatiar Lookalike em 1%, 2%, 5% como ad sets separados, usar 1-5% combinado
3. **Custom Audiences:**
   - Não rodar "engaged 30d" e "engaged 90d" como ad sets paralelos
   - Engaged 90d já inclui 30d

## Quando é OK ter sobreposição
- Estágios diferentes de funil (TOFU + retargeting podem se sobrepor parcialmente)
- Testes A/B com mesma audience em criativos diferentes (com objetivo claro de teste, prazo definido)

## Aplicação pro squad
- **audience-architect:** design de audience precisa considerar overlap
- **analyst:** vigia frequência cross-ad-set
- **optimizer:** ao detectar Breakdown, consolida ad sets

## Antídoto Andromeda
Andromeda + Advantage+ Audience reduz drasticamente o risco de Breakdown porque deixa Meta gerenciar segmentação. Em 2026, manualizar segmentação fina é trabalhar contra o algoritmo.

Affect Group: "1 campanha, 1 ad set, 10-20+ criativos distintos" é o default Andromeda. Múltiplos ad sets só com razão cravada.

## Evidência empírica
Segwise: 1 ad set com 25 criativos bate 5 ad sets com 5 criativos cada por **+17% conversões e -16% custo**. Isso é Breakdown Effect na prática.
