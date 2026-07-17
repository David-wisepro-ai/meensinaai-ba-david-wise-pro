# /vai — construir e publicar (dev-squad, builder-only)

> DORMENTE: este comando so serve pra quem CONSTROI app/site/sistema. Se o seu negocio nao
> constroi software, voce nunca precisa dele — ignore. Nada aqui roda sozinho.

Gatilho do departamento de engenharia. Quando o dono pedir pra construir, montar, subir,
publicar ou colocar no ar um app/site/sistema:

## O que fazer

1. Invocar o orquestrador: `Agent(subagent_type: "devsquad-chief", prompt: "<o pedido do dono +
   contexto conhecido do negocio>")`.
2. O devsquad-chief diagnostica (setup/redeploy, tipo, financeiro, infra do usuario) e INVOCA os
   engenheiros reais na ordem, com contrato de handoff:
   `devsquad-database → devsquad-backend → devsquad-frontend → code-review +
   devsquad-security-gate (PORTAO 0) → devsquad-devops (pipeline VAI, 3 portoes humanos)` —
   com `devsquad-finance-guardian` nas duas pontas se o app lida com dinheiro.
3. Antes do push final, o `guardiao` confere a entrega contra o `DECISOES.md` (nao-regressao) —
   o portao do push exige isso.
4. Entregar ao dono com evidencia: URL no ar + testes verdes. Nunca "pronto" no escuro.

## Regras duras

- Infra SEMPRE na conta do dono (GitHub, Supabase, Vercel). Sem login dele, PARAR e pedir.
- TDD e code-review obrigatorios. Nenhum push sem o pre-flight de seguranca passar.
- Migration destrutiva e promocao a producao sempre pedem OK humano.
