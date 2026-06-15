---
name: retomar-plano
description: "Use quando cliente fala 'retoma plano X', 'volta pro plano Y', 'reativa plano pausado', 'continuar plano antigo', 'retomar plano <slug>'. Aceita slug como argumento ou pergunta qual retomar. Verifica se plano existe e está pausado. Se já tem outro plano ativo, alerta cliente com opções (cancelar / pausar atual / concluir atual). Marca como em_andamento, atualiza _ativo.txt + dados.js.planos.ativo."
allowed-tools: Read, Edit, Bash
---

# Retomar Plano

> Skill que reativa plano pausado.

## Quando usar

- Cliente quer voltar a executar plano pausado
- Cliente cita slug específico ("retoma o plano-002")

## Quando NÃO usar

- Plano nunca foi criado → `/novo-plano-de-acao`
- Plano está concluído → criar novo (concluído não retoma)

---

## Passo 0 — Contexto

1. `meu-negocio/planos-de-acao/_ativo.txt`
2. `meu-negocio/dados.js`

---

## Passo 1 — Receber slug

### 1a) Argumento direto
`/retomar-plano plano-002-campanha-memorial-day` ou `/retomar-plano memorial-day`

Se cliente passou só sufixo (memorial-day), procurar match em `dados.js.planos.lista` cujo `slug` ou `pasta` bata.

### 1b) Sem argumento

Listar planos pausados:

```
Você tem <N> planos pausados. Qual quer retomar?

1. plano-002-campanha-memorial-day (pausado em 09/mai)
2. plano-003-site-novo (pausado em 12/mai)

Responda com número ou slug.
```

---

## Passo 2 — Validar

- Plano existe em `dados.js.planos.lista`? Se não: erro amigável + listar disponíveis.
- Status é `pausado`? Se não:
  - `em_andamento` → "Esse plano já está ativo." abortar.
  - `concluido` → "Esse plano foi concluído. Pra continuar nessa linha, /novo-plano-de-acao."

---

## Passo 3 — Verificar se já tem plano ativo

Se `dados.js.planos.ativo` não-null e diferente do solicitado:

```
⚠️ Você tem outro plano ativo: <plano-ativo.titulo>

Pra retomar <plano-solicitado.titulo>, escolha:

1. Cancelar (não retomar agora)
2. Pausar plano ativo e retomar o outro
3. Concluir plano ativo e retomar (rode /concluir-plano antes)

Qual?
```

- 1: abortar.
- 2: pausar atual primeiro (mesma lógica do `/pausar-plano`), depois retomar.
- 3: instruir e abortar.

---

## Passo 4 — Atualizar dados.js + _ativo.txt

```javascript
const slug = "<plano solicitado>";
const ts = "<timestamp ISO>";

// Se tinha outro ativo e cliente escolheu opção 2: pausar antigo
const planoAntigo = window.DADOS_NEGOCIO.planos.ativo;
if (planoAntigo && planoAntigo !== slug) {
  window.DADOS_NEGOCIO.planos.lista[planoAntigo].status = JSON.parse(JSON.stringify("pausado"));
  window.DADOS_NEGOCIO.planos.lista[planoAntigo].pausado_em = JSON.parse(JSON.stringify(ts));
}

// Reativar plano solicitado
window.DADOS_NEGOCIO.planos.lista[slug].status = JSON.parse(JSON.stringify("em_andamento"));
window.DADOS_NEGOCIO.planos.lista[slug].retomado_em = JSON.parse(JSON.stringify(ts));

window.DADOS_NEGOCIO.planos.ativo = JSON.parse(JSON.stringify(slug));

// Recalcular métricas do plano retomado
const plano = window.DADOS_NEGOCIO.planos.lista[slug];
const total = plano.tarefas.a_fazer.length + plano.tarefas.em_andamento.length + plano.tarefas.concluidas.length;
window.DADOS_NEGOCIO.metricas.plano_ativo = JSON.parse(JSON.stringify(slug));
window.DADOS_NEGOCIO.metricas.total_tarefas = total;
window.DADOS_NEGOCIO.metricas.concluidas = plano.tarefas.concluidas.length;
window.DADOS_NEGOCIO.metricas.em_andamento = plano.tarefas.em_andamento.length;
window.DADOS_NEGOCIO.metricas.a_fazer = plano.tarefas.a_fazer.length;
window.DADOS_NEGOCIO.metricas.progresso_pct = total > 0 ? Math.round((plano.tarefas.concluidas.length / total) * 100) : 0;

window.DADOS_NEGOCIO.ultima_atualizacao = JSON.parse(JSON.stringify(ts));

window.DADOS_NEGOCIO.atividade_recente.unshift(JSON.parse(JSON.stringify({
  timestamp: ts,
  agente: "skill-retomar-plano",
  plano: slug,
  acao_resumida: "Plano retomado: " + slug
})));
window.DADOS_NEGOCIO.atividade_recente = window.DADOS_NEGOCIO.atividade_recente.slice(0, 20);
```

E `_ativo.txt`:

```bash
echo "<slug>" > meu-negocio/planos-de-acao/_ativo.txt
```

---

## Passo 5 — Mensagem final

```
🔄 Plano retomado: <plano.titulo>
Status: em_andamento
Progresso: <X>/<Y> tarefas (<P>%)

Plano anterior <plano-antigo> ficou pausado. (se aplicável)

Atualize o painel (F5).

Próximo passo: /executar-tarefa pra continuar de onde parou.
```

---

## Princípios

| | Princípio |
|---|---|
| 1 | Validar slug antes de mexer |
| 2 | Verificar conflito com plano ativo |
| 3 | JSON.stringify em dados.js |
| 4 | _ativo.txt atualiza pra novo slug |
| 5 | Recalcular métricas do plano retomado |
| 6 | Concluído não retoma (criar novo) |
| 7 | Acentuação PT-BR, sem hífens em copy |
| 8 | Mensagem F5 |
