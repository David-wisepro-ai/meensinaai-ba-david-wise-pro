---
tags:
  - meta-ads
  - playbook
  - tecnico
fonte: conteúdo educacional absorvido de mathiaschu/meta-ads-analyzer (auditado, laudo #1)
versao: 1.0.0
ultima_atualizacao: 2026-06-01
---

# Playbook: Learning Phase

## O que é
Período inicial em que Meta otimiza a entrega antes de estabilizar performance. **Threshold oficial: 50 conversões otimizadas em 7 dias por ad set.**

## Por que importa
- Durante Learning, performance é INSTÁVEL, não dá pra avaliar campanha
- Otimizar prematuro (pausar criativo, mudar budget +25%, mudar audience) **RESETA** o Learning
- Reset = volta pro início, perde os dados acumulados

## Como saber se está em Learning
- Status visível no Ads Manager: "Learning" / "Learning Limited"
- "Learning Limited" = ad set não vai conseguir sair (volume baixo, segmentação muito fina, budget pequeno)

## Regras de ouro durante Learning
1. **NÃO PAUSAR criativos** mesmo se parecerem ruins
2. **NÃO MUDAR budget em mais de 20%** por vez (idealmente esperar acabar)
3. **NÃO MUDAR audience, objetivo ou bid strategy**
4. **OK criar NOVO ad set paralelo** pra testar variação

## Como sair de Learning Limited
- Aumentar budget pra atingir threshold de 50 conv/7d
- Ampliar audience (Advantage+ Audience ajuda)
- Consolidar ad sets que dividem orçamento entre si (causa direta de Breakdown Effect)

## Quanto tempo dura
- Típico: 3-7 dias
- Conta nova / produto novo: até 14 dias
- Andromeda 2026 acelerou o processo (paralelismo NVIDIA), mas threshold de conversões continua igual

## Aplicação pro squad
- **analyst:** nunca alertar pausa em Learning. Reporta "em Learning, aguardar"
- **optimizer:** regra dura, não propor mudança durante Learning
- **campaign-builder:** ao criar campanha, alerta usuário "vai entrar em Learning, não mexer por 7 dias"
- **strategist:** estimar Learning ao recomendar budget. Se budget < $ pra gerar 50 conv/7d, alertar Learning Limited

## Erro comum
"O criativo parece estar performando mal, vou pausar." Reseta Learning, perde dado, próxima rodada também vai sofrer. **Espera o Learning terminar.**

## Sinergia com GEM (Andromeda)
GEM precisa de dados precisos pra aprender. Resetar Learning frequente = GEM nunca estabiliza o modelo da conta. Pixel + CAPI bem configurados aceleram a saída do Learning.
