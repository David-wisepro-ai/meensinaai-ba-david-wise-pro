# /criar-agente — Atalho para o Arquiteto

Invoca o **Arquiteto** da empresa AI pra criar um agente novo no formato e local corretos, com workflow blueprint embutido.

## Como funciona

1. **3 perguntas simples** (em portugues natural):
   - Funcao em 1 frase
   - Operacional ou referencia
   - Que dominio

2. **Arquiteto INFERE workflow sozinho** (trigger, input, output, next step) baseado em dominio + funcao + agentes existentes.

3. **Mostra inferencia em linguagem humana** pra voce aprovar:
   - Quem chama esse agente
   - O que ele recebe
   - O que ele entrega
   - Pra quem entrega
   - Tem situacao que aciona outro agente?

4. **Aluno aprova com (s)** ou ajusta ponto a ponto.

5. **Arquiteto cria** com workflow formal embutido, no local correto, no formato padrao.

6. **Se trigger for automatico** (cron/evento), Arquiteto avisa que precisa setup adicional na nuvem (Edge Function + cron pg_cron) e oferece criar doc com instrucoes em `wiki/infra/`.

## Quando usar

- Voce identificou funcao recorrente que precisa de agente dedicado
- Quer adicionar referencia/expert a um squad existente
- Quer criar squad inteiro novo (raro — exige 5+ membros previstos)

## Quando NAO usar

- Editar agente existente — abre o `.md` dele
- Criar skill utilitaria pequena (lint, validator) — chama `felipe` ou `skill-creator`
- Criar slash command — edita `.claude/commands/<nome>.md` direto

## Importante: como o agente novo entra no time

Voce **sempre fala com o CEO** (Zuck ou nome equivalente). O agente novo criado entra na "visao" do CEO automaticamente — Zuck sabe que ele existe e pode chamar quando voce pedir.

Voce **nunca chama o agente direto** — sempre via CEO.

## Local vs Nuvem

| Como o agente roda | Onde |
|---|---|
| Voce chama o CEO no Claude Code | LOCAL (sua maquina) |
| CEO invoca o agente | LOCAL (durante sessao) |
| Agente A invoca agente B (cadeia) | LOCAL (durante sessao) |
| Cron diario / evento externo | NUVEM (Edge Function + API) |

Se voce quer agente automatico (sem voce abrir o Claude Code), Arquiteto te avisa e gera doc com instrucao de setup nuvem.

## Instrucoes pra Zuck (orquestrador)

Quando o aluno digita `/criar-agente`:

1. Invocar imediatamente: `Agent(subagent_type: "arquiteto", prompt: "<o que aluno disse antes ou pedir contexto>")`
2. Esperar Arquiteto fazer as 3 perguntas
3. Repassar respostas
4. Esperar Arquiteto mostrar inferencia de workflow em linguagem humana
5. Repassar aprovacao/ajuste do aluno
6. Confirmar criacao final
7. Reportar resultado: caminho do arquivo + como invocar via voce + se gerou doc nuvem
