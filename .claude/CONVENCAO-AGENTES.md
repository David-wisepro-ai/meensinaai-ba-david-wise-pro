# Convenção Universal dos Agentes — Cliente BA

> **Aplicada em TODOS os agentes do template BA v10.1.** Adiciona 2 obrigações sem alterar persona, voz, tools ou workflow interno: Passo 0 lê perfil do negócio, Passo Final atualiza plano + dados.js + sinaliza F5.

---

## Por que essa convenção existe

Cliente do BA passa muito tempo perguntando contexto que o agente já deveria saber: "qual meu nicho?", "qual o ticket médio?", "qual a dor principal?". O perfil do negócio em `meu-negocio/perfil.md` é a fonte de verdade central. Todo agente lê antes de produzir.

Cliente também precisa **ver** o trabalho acontecendo. O painel local lê `meu-negocio/dados.js`. Todo agente atualiza esse arquivo ao concluir tarefa, e sinaliza F5 pro cliente recarregar.

Sem isso, sistema funciona no escuro pro cliente.

---

## Bloco a injetar no Passo 0 de TODO agente

```markdown
## Passo 0 — Contexto obrigatório (Read antes de produzir)

Sempre nesta ordem:

1. `meu-negocio/perfil.md` — perfil do negócio do cliente, fonte de verdade central
2. `meu-negocio/plano-de-acao.md` — plano ativo, identificar se há tarefa apontada pra você
3. `wiki/operations/lessons.md` — erros não-repetir
4. (contexto específico do agente continua abaixo)
```

---

## Bloco a injetar no Passo Final de TODO agente

```markdown
## Passo Final — Atualizar estado e sinalizar painel

Após salvar entrega:

1. **Atualizar `meu-negocio/plano-de-acao.md`:**
   - Se você executou tarefa que estava em "A Fazer" ou "Em Andamento", mover pra "Concluídas"
   - Adicionar entrada com data + caminho da entrega + agente

2. **Atualizar `meu-negocio/dados.js` (schema 1.0.2):**
   - Ao **INICIAR** tarefa: `agentes['<seu-nome>'].status = "trabalhando"`, `task_atual = "<task-id>"`, `inicio = "<timestamp ISO>"`
   - Ao **CONCLUIR** tarefa: `agentes['<seu-nome>'].status = "concluido"`, `ultima_entrega = "<timestamp ISO>"`, `task_atual = null`
   - Adicionar entrada em `entregas[]` com tipo, título, caminho, agente, criado_em
   - Atualizar `metricas` (concluidas++, em_andamento--, progresso_pct recalcular)
   - Adicionar em `atividade_recente` no topo
   - Atualizar `ultima_atualizacao` para timestamp atual

   **Chave de agente = nome próprio em minúsculo** (`agentes['marina']`), nunca role-based (`agentes['marketing']`). Schema 1.0.2 espera nominal.

3. **Mensagem final ao cliente:**
   ```
   ✅ Pronto. <Descrição curta da entrega em 1 linha>
   Caminho: <caminho do arquivo gerado>

   Atualize o painel apertando F5 no navegador.
   ```
```

---

## Princípios do Update

| | Princípio | O que evita |
|---|---|---|
| 1 | **Update incremental** (read → modify → write) | Sobrescrita acidental de outras seções |
| 2 | **Atomicidade** | Estado inconsistente em caso de falha no meio |
| 3 | **Não tocar em `meu-negocio/perfil.md`** | Só `/gerar-perfil-do-negocio` e `/atualizar-perfil` editam perfil |
| 4 | **Não tocar em outras tarefas do plano** | Só sua própria tarefa muda de coluna |
| 5 | **Não inventar dados** | Se faltar info no perfil, perguntar ao cliente, nunca chutar |
| 6 | **Acentuação obrigatória PT-BR** | Texto que vai pro cliente sempre acentuado |
| 7 | **Sem hífens nem travessões em copy** | Regra global da empresa |

---

## Como agente novo herda essa convenção

Ao criar agente novo no template (via `arquiteto`), incluir o Passo 0 e Passo Final desta convenção no body do agente. O `arquiteto` deve receber instrução explícita: "aplicar `.claude/CONVENCAO-AGENTES.md` no agente novo".

Agentes existentes patcheados em sprint inicial do projeto (08-21/mai/2026): todos os 43 agentes base do template BA v10.1.

---

## Verificação

Comando único pra validar que TODOS os agentes seguem a convenção:

```bash
cd .claude/agents
total=$(ls *.md | wc -l)
com_perfil=$(grep -l "meu-negocio/perfil.md" *.md | wc -l)
com_f5=$(grep -l "Atualize o painel" *.md | wc -l)
echo "Total: $total | Com perfil: $com_perfil | Com F5: $com_f5"
```

Esperado: `total = com_perfil = com_f5`. Se algum agente faltar, voltar e patchear.

---

## Exceções

Não há exceções. Todo agente do template BA segue a convenção sem exceção.

Skills do Claude Code globais (~/.claude/skills/) não precisam seguir essa convenção pois não pertencem ao cliente. Mas se uma skill global for usada como agente do cliente, ela deve ler perfil + atualizar dados.js no contexto do cliente.
