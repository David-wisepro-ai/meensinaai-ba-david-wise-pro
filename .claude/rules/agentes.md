---
paths:
  - ".claude/agents/**"
---

# Regras — Agentes (`.claude/agents/**`)

Valem sempre que se cria ou edita um agente desta empresa.

## Frontmatter obrigatorio e valido

- `name:` lowercase, com hifens, sem acento, curto. NUNCA underscore, espaco ou maiuscula.
- `description:` operacional e que dispara certo ("Use quando...", com pelo menos 1 cenario
  concreto). Description fraca = agente nunca invocado.
- `tools:` minimo necessario. `Read` quase sempre. Chief que orquestra PRECISA de `Agent`.

## Agente real, nunca encenacao

- Se um chief precisa INVOCAR um membro de verdade, o membro e um AGENTE REAL em
  `.claude/agents/` (frontmatter valido), invocado via `Agent(subagent_type: "<name>", ...)`.
- Voz consultiva pura (persona de referencia) fica em `skills/*/personas/`, ROTULADA como "voz
  declarada, nao invocavel". Nunca finja que encenacao e orquestracao.
- Description do membro so diz "Invocado pelo <chief>" se o chief realmente invoca (tem `Agent`).

## Anti-colisao

- Prefixo de departamento quando houver risco de colisao (ex.: `devsquad-*`).
- Antes de criar, conferir se ja existe agente com o mesmo nome ou funcao.

## Agente instalado = wiki atualizado (OBRIGATORIO)

Toda vez que um agente novo for criado/instalado, executar AUTOMATICAMENTE os 3 passos:

1. **Criar a pagina do agente** em `wiki/team/agents/[nome].md`: frontmatter com tags (departamento + agente), titulo "[Nome] — [Cargo]", nivel/departamento, Responsabilidades (bullets), Conexoes (recebe de / alimenta), Uso (`/[comando]` + exemplo de pedido).
2. **Atualizar `wiki/index.md`** — adicionar na tabela de agentes (secao "Agentes Customizados", criar se nao existir).
3. **Atualizar o departamento** — adicionar na tabela de `wiki/team/departments/[dept].md`.

Sem os 3 passos = o agente existe mas ninguem sabe (Obsidian nao mostra, os outros agentes nao conhecem). E como contratar alguem e nao apresentar pro time.

## Verificacao antes de dar "pronto"

- O chief tem `Agent` no `tools`? Os membros existem com `name` batendo? A invocacao foi provada?
- Os 3 passos de wiki foram executados?
