---
name: concluir-plano
description: "Use quando cliente fala 'concluí o plano', 'terminei', 'pode fechar o plano', 'plano acabou', 'finalizar plano', 'quero marcar plano como concluído'. Marca plano ATIVO como concluido em dados.js + limpa _ativo.txt + zera planos.ativo. Confirma com cliente se houver tarefas em andamento ou a fazer (não bloqueia, só pergunta). Sugere próximo passo (listar/novo plano)."
allowed-tools: Read, Edit, Bash
---

# Concluir Plano

> Skill que fecha o plano ativo. Libera o cliente pra criar plano novo.

## Quando usar

- Cliente fala que o plano acabou
- Antes de criar plano novo, libera o ativo
- Plano de Discovery terminou os 90 dias

## Quando NÃO usar

- Cliente quer pausar (não concluir) → `/pausar-plano`
- Não tem plano ativo → instruir `/listar-planos` ou `/novo-plano-de-acao`

---

## Passo 0 — Contexto

1. `meu-negocio/planos-de-acao/_ativo.txt`
2. `meu-negocio/dados.js`

**Se `_ativo.txt` vazio ou `dados.js.planos.ativo == null`:**

```
Você não tem plano ativo agora. Nada pra concluir.

Quer ver seus planos? /listar-planos
Quer criar plano novo? /novo-plano-de-acao
```

---

## Passo 1 — Avaliar tarefas pendentes

Ler `dados.js.planos.lista[<ativo>]`:
- `tarefas.a_fazer.length`
- `tarefas.em_andamento.length`
- `tarefas.concluidas.length`

**Se tem em_andamento ou a_fazer:**

```
⚠️ Plano ativo: <plano.titulo>

Estado atual:
- ✅ Concluídas: <X>
- 🔄 Em andamento: <Y>
- ⏳ A fazer: <Z>

Você ainda tem <Y+Z> tarefas não concluídas. Concluir mesmo assim?

1. Sim, concluir agora (tarefas pendentes ficam registradas no plano mas plano vira "concluido")
2. Não, voltar pra executar tarefas
```

Se cliente escolhe 2: abortar.

**Se todas concluídas:** confirmar simples "Concluir <plano.titulo>?" e seguir.

---

## Passo 2 — Marcar plano como concluído

Editar `meu-negocio/dados.js`. Read → modify → write. JSON.stringify obrigatório.

```javascript
const slug = window.DADOS_NEGOCIO.planos.ativo;
const ts = "<timestamp ISO>";

window.DADOS_NEGOCIO.planos.lista[slug].status = JSON.parse(JSON.stringify("concluido"));
window.DADOS_NEGOCIO.planos.lista[slug].data_conclusao = JSON.parse(JSON.stringify(ts));

// Limpar plano ativo
window.DADOS_NEGOCIO.planos.ativo = null;

// Zerar métricas (não tem mais ativo)
window.DADOS_NEGOCIO.metricas.plano_ativo = null;
window.DADOS_NEGOCIO.metricas.total_tarefas = 0;
window.DADOS_NEGOCIO.metricas.concluidas = 0;
window.DADOS_NEGOCIO.metricas.em_andamento = 0;
window.DADOS_NEGOCIO.metricas.a_fazer = 0;
window.DADOS_NEGOCIO.metricas.progresso_pct = 0;

window.DADOS_NEGOCIO.ultima_atualizacao = JSON.parse(JSON.stringify(ts));

// Atividade recente
window.DADOS_NEGOCIO.atividade_recente.unshift(JSON.parse(JSON.stringify({
  timestamp: ts,
  agente: "skill-concluir-plano",
  plano: slug,
  acao_resumida: "Plano concluído: " + slug
})));
window.DADOS_NEGOCIO.atividade_recente = window.DADOS_NEGOCIO.atividade_recente.slice(0, 20);
```

---

## Passo 3 — Limpar `_ativo.txt`

```bash
> meu-negocio/planos-de-acao/_ativo.txt
```

(arquivo vazio. Não deletar.)

---

## Passo 4 — Mensagem final

```
✅ Plano concluído: <plano.titulo>
Data conclusão: <data>
Progresso final: <X>/<Y> tarefas concluídas (<P>%).

Pasta preservada em meu-negocio/planos-de-acao/<pasta>/ (histórico mantido).

Atualize o painel (F5).

Próximos passos:
- Ver todos os planos: /listar-planos
- Começar plano novo: /novo-plano-de-acao
- Retomar plano pausado: /retomar-plano <slug>
```

---

## Princípios

| | Princípio |
|---|---|
| 1 | Confirmar antes de concluir se há pendências |
| 2 | Pasta do plano nunca é deletada (histórico) |
| 3 | JSON.stringify em toda escrita em dados.js |
| 4 | _ativo.txt esvaziado, não removido |
| 5 | Métricas zeradas (sem ativo) |
| 6 | Acentuação PT-BR, sem hífens em copy |
| 7 | Mensagem F5 sempre |
| 8 | Sugerir próxima ação |
