---
name: listar-planos
description: "Use quando cliente pede 'lista meus planos', 'mostra todos os planos', 'que planos eu tenho', 'status dos planos', 'quais planos rodando', 'quais pausados', 'quais concluí'. Lê meu-negocio/planos-de-acao/_ativo.txt + dados.js.planos.lista e renderiza tabela markdown com Plano, Status, Progresso, Início, Conclusão. Sugere próxima ação conforme estado (criar novo, retomar pausado, concluir ativo)."
allowed-tools: Read, Bash
---

# Listar Planos

> Skill read-only que mostra panorama de todos os planos do cliente em formato tabela.

## Quando usar

- Cliente quer ver todos os planos (ativo + pausados + concluídos)
- Cliente esquece o que tem rolando
- Antes de criar novo plano (revisar estado)

## Quando NÃO usar

- Cliente quer detalhes de UM plano específico → abrir pasta `meu-negocio/planos-de-acao/<plano>/` direto
- Cliente quer mudar plano ativo → `/novo-plano-de-acao` ou `/retomar-plano`

---

## Passo 0 — Contexto

1. `meu-negocio/planos-de-acao/_ativo.txt`
2. `meu-negocio/dados.js`
3. Listar pastas em `meu-negocio/planos-de-acao/plano-*/`

---

## Passo 1 — Coletar planos

Pra cada chave em `dados.js.planos.lista`, extrair:
- titulo, slug, pasta
- status (em_andamento | pausado | concluido | rascunho)
- data_inicio, data_conclusao
- tarefas: total, concluidas (calcular progresso %)

Marcar plano com chave igual a `dados.js.planos.ativo` como **ATIVO**.

---

## Passo 2 — Renderizar tabela

Ícones por status:
- 🔄 em_andamento (e é o ativo)
- ⏸️ pausado
- ✅ concluido
- 📝 rascunho

```
Seus planos de ação:

| Plano | Status | Progresso | Início | Conclusão |
|---|---|---|---|---|
| 🔄 plano-001-discovery (ATIVO) | em_andamento | 17% (5/30) | 08/mai | — |
| ⏸️ plano-002-campanha-memorial-day | pausado | 0% (0/5) | 09/mai | — |
| ✅ plano-003-site-novo | concluido | 100% (8/8) | 04/mai | 07/mai |

Total: 3 planos (1 ativo, 1 pausado, 1 concluído).
```

---

## Passo 3 — Sugerir próxima ação

Baseado no estado:

**Se tem ativo + pausados:**
```
Sugestões:
- Continuar plano ativo: rode /executar-tarefa
- Concluir ativo pra liberar: /concluir-plano
- Retomar pausado: /retomar-plano <slug>
```

**Se só tem ativo:**
```
Sugestão: continue executando. /executar-tarefa.
```

**Se só pausados:**
```
⚠️ Você não tem plano ativo agora.
Sugestão: /retomar-plano <slug> ou /novo-plano-de-acao.
```

**Se só concluídos ou nenhum:**
```
Sugestão: /plano-de-acao-90-dias (se ainda não rodou Discovery) ou /novo-plano-de-acao.
```

---

## Princípios

| | Princípio |
|---|---|
| 1 | Skill READ-ONLY — nunca modifica dados.js nem _ativo.txt |
| 2 | Tabela markdown limpa, sem hífens em copy |
| 3 | Acentuação PT-BR |
| 4 | Datas formato DD/MMM (ex: 08/mai) |
| 5 | Sempre sugerir próxima ação no final |
| 6 | Cliente leigo entende sem ver código |
