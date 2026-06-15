---
name: pausar-plano
description: "Use quando cliente fala 'pausa o plano', 'pausar plano ativo', 'parar plano sem concluir', 'preciso parar isso temporariamente', 'congela o plano', 'guarda o plano pra depois'. Marca plano ATIVO como pausado em dados.js + limpa _ativo.txt + zera planos.ativo. Plano fica preservado pra retomar depois com /retomar-plano <slug>."
allowed-tools: Read, Edit, Bash
---

# Pausar Plano

> Skill que pausa o plano ativo sem concluir. Cliente pode retomar depois.

## Quando usar

- Cliente quer pausar temporariamente sem dar como concluído
- Antes de mudar de prioridade (atender oportunidade nova)
- Cliente vai viajar / ficar fora por X dias

## Quando NÃO usar

- Cliente quer concluir (plano acabou) → `/concluir-plano`
- Não tem plano ativo → `/listar-planos`

---

## Passo 0 — Contexto

1. `meu-negocio/planos-de-acao/_ativo.txt`
2. `meu-negocio/dados.js`

**Se sem plano ativo:**

```
Você não tem plano ativo agora. Nada pra pausar.

Veja seus planos: /listar-planos
```

---

## Passo 1 — Confirmar

```
Pausar plano ativo: <plano.titulo>?

Estado atual:
- ✅ Concluídas: <X>
- 🔄 Em andamento: <Y>
- ⏳ A fazer: <Z>

Pausa preserva o plano pra retomar depois. Tarefas em andamento ficam onde estão.

1. Sim, pausar agora
2. Cancelar
```

---

## Passo 2 — Atualizar dados.js

```javascript
const slug = window.DADOS_NEGOCIO.planos.ativo;
const ts = "<timestamp ISO>";

window.DADOS_NEGOCIO.planos.lista[slug].status = JSON.parse(JSON.stringify("pausado"));
window.DADOS_NEGOCIO.planos.lista[slug].pausado_em = JSON.parse(JSON.stringify(ts));

// Limpar plano ativo
window.DADOS_NEGOCIO.planos.ativo = null;

// Zerar métricas (sem ativo)
window.DADOS_NEGOCIO.metricas.plano_ativo = null;
window.DADOS_NEGOCIO.metricas.total_tarefas = 0;
window.DADOS_NEGOCIO.metricas.concluidas = 0;
window.DADOS_NEGOCIO.metricas.em_andamento = 0;
window.DADOS_NEGOCIO.metricas.a_fazer = 0;
window.DADOS_NEGOCIO.metricas.progresso_pct = 0;

window.DADOS_NEGOCIO.ultima_atualizacao = JSON.parse(JSON.stringify(ts));

window.DADOS_NEGOCIO.atividade_recente.unshift(JSON.parse(JSON.stringify({
  timestamp: ts,
  agente: "skill-pausar-plano",
  plano: slug,
  acao_resumida: "Plano pausado: " + slug
})));
window.DADOS_NEGOCIO.atividade_recente = window.DADOS_NEGOCIO.atividade_recente.slice(0, 20);
```

---

## Passo 3 — Limpar `_ativo.txt`

```bash
> meu-negocio/planos-de-acao/_ativo.txt
```

---

## Passo 4 — Mensagem final

```
⏸️ Plano pausado: <plano.titulo>

Pasta preservada. Retomar quando quiser:
/retomar-plano <slug>

Próximos passos:
- Ver todos: /listar-planos
- Começar outro: /novo-plano-de-acao

Atualize o painel (F5).
```

---

## Princípios

| | Princípio |
|---|---|
| 1 | Confirmar antes de pausar |
| 2 | Pasta + tarefas preservadas |
| 3 | JSON.stringify em dados.js |
| 4 | _ativo.txt esvaziado |
| 5 | Acentuação PT-BR, sem hífens em copy |
| 6 | Mensagem F5 |
| 7 | Lembrar comando pra retomar |
