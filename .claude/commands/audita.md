# /audita — conferencia de nao-regressao (guardiao)

Rode o auditor de decisoes travadas da empresa. Funciona pra qualquer negocio, qualquer nicho.

## O que fazer

1. Invocar o agente `guardiao` via `Agent(subagent_type: "guardiao", prompt: "Audita a entrega
   atual contra o DECISOES.md: o que mudou nesta sessao, config e codigo. Devolve veredito com
   evidencia e grava o marcador de sessao.")`.
2. Se o veredito for **APROVADO**: seguir normalmente (o push fica liberado).
3. Se for **REPROVADO**: corrigir exatamente o que o guardiao apontou (com a evidencia dele) e
   rodar `/audita` de novo. Nao contornar o guardiao.

## Quando isso roda sozinho

Normalmente voce nem precisa deste comando: o guardiao e chamado automaticamente antes de
declarar entrega pronta, e o portao do `git push` exige a conferencia. `/audita` existe pra
rodar sob demanda.
