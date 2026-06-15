---
name: novo-plano-de-acao
description: "Use quando cliente fala em linguagem natural que quer começar projeto/iniciativa NOVA fora do plano em curso: 'quero criar campanha de Memorial Day', 'preciso refazer o site', 'quero sequência de email pro Dia das Mães', 'cria uma landing nova', 'quero lançar produto X'. Verifica se já tem plano ativo e oferece opções (cancelar, pausar, concluir). PERGUNTA o PRAZO (sprint 7-14 dias pra feriado, 30-60 dias pra lançamento, customizado). Cria pasta nova meu-negocio/planos-de-acao/plano-NNN-<slug>/ com prd.md + tarefas.md + entregas/. Atualiza dados.js schema 2.0.0 (planos.ativo, planos.lista com prazo_dias + total_semanas dinâmico + data_conclusao_prevista, _ativo.txt). 3-15 tarefas geradas baseado em perfil + ideia + prazo."
allowed-tools: Read, Write, Edit, Bash
---

# Novo Plano de Ação

> Skill que transforma uma ideia/projeto novo do cliente em **PLANO DEDICADO** (pasta própria com PRD + tarefas + entregas). Multi-planos: cliente pode ter Discovery 90 dias rolando E criar Plano de Memorial Day em paralelo (com aviso explícito).

## Mudanças vs `/ceo-novo-pedido` v1.x

- **Antes:** anexava tarefas no `plano-de-acao.md` único
- **Agora:** cria pasta nova `plano-NNN-<slug>/` com PRD + tarefas + entregas
- Cliente decide se pausa o ativo, cancela, ou conclui antes
- Schema 2.0.0: `planos.ativo` aponta pra novo plano; antigo vira `pausado` se aplicável

## Quando usar

- Cliente fala "quero criar X", "preciso fazer Y", "cria pra mim Z"
- Demanda nova com começo/meio/fim discreto
- Pedido pontual: campanha de feriado, página específica, lançamento, sequência de email

## Quando NÃO usar

- Cliente quer regerar plano de discovery → `/plano-de-acao-90-dias`
- Só quer ajustar 1 tarefa → editar manualmente
- Mudar dados do perfil → `/gerar-perfil-do-negocio`

---

## Passo 0 — Contexto obrigatório

1. `meu-negocio/empresa.md`
2. `meu-negocio/publico-alvo.md`
3. `meu-negocio/marca/brand-voice.md` se existir
4. `meu-negocio/dados.js`
5. `meu-negocio/planos-de-acao/_ativo.txt`
6. `wiki/operations/lessons.md`

**Se empresa.md vazio:** parar e instruir `/gerar-perfil-do-negocio`.

---

## Passo 1 — Receber a ideia

### 1a) Argumento direto
`/novo-plano-de-acao quero criar campanha de Memorial Day` → captura tudo após o comando.

### 1b) Sem argumento
```
O que você quer pedir?

Conta em texto livre. Pode ser uma campanha, página, sequência de email, lançamento, qualquer coisa.

(ex: "quero criar campanha de Memorial Day", "preciso refazer site institucional", "sequência de email pro Dia das Mães")
```

---

## Passo 2 — Verificar plano ativo + decisão do cliente

Ler `meu-negocio/planos-de-acao/_ativo.txt` e `dados.js.planos.ativo`.

**Se já existe plano ativo:**

```
⚠️ Você tem um plano ativo: <plano.titulo>
Status: <status> (<X>% concluído, <Y>/<Z> tarefas)

Recomendamos terminar antes de começar outro pra não se perder.

1. Cancelar e voltar pro plano ativo (não cria novo)
2. Pausar plano ativo e criar novo (você assume risco de fragmentação)
3. Concluir plano ativo agora pra liberar (rode /concluir-plano primeiro)

Qual?
```

- **1:** abortar com mensagem amigável.
- **2:** prosseguir. Plano antigo vai virar `status: "pausado"` no Passo 5.
- **3:** instruir cliente a rodar `/concluir-plano` primeiro e voltar.

**Se NÃO existe plano ativo:** seguir direto.

---

## Passo 3 — Identificar tipo + 2 a 3 perguntas críticas

5 tipos. Uma pergunta por mensagem.

### Tipo A — Campanha tráfego
1. Budget total ou diário?
2. Público (mesmo do perfil / novo / retargeting)?
3. CTA principal?

### Tipo B — Site/página/landing
1. Tipo (vendas / captura / institucional / evento)?
2. Domínio?
3. Prazo?

### Tipo C — Sequência email
1. Pra qual segmento?
2. Quantos emails?
3. Oferta/objetivo final?

### Tipo D — Lançamento/produto novo
1. Produto/oferta em 1 frase?
2. Data início/fim?
3. Meta de faturamento ou vendas?

### Tipo E — Outro
1. O que entregar (resultado em 1 frase)?
2. Pra quem?
3. Prazo?

---

## Passo 3.5 — Perguntar PRAZO explícito (NOVO em v2.1.0)

Mesmo que tipo D/E peça prazo na pergunta crítica, formalizar aqui pra travar `prazo_dias` no schema.

```
Em quantos dias você quer entregar isso?

1. 7 dias (sprint emergencial — campanha de feriado, oferta relâmpago)
2. 14 dias (sprint estendido — campanha rápida + criativos novos)
3. 30 dias (1 mês — lançamento médio, sequência email com nurture)
4. 60 dias (2 meses — lançamento robusto, validação de oferta nova)
5. 90 dias (3 meses — projeto estrutural)
6. Outro (você digita em dias ou semanas)

Qual?
```

### Heurística por tipo (sugerir antes do cliente escolher)

| Tipo | Sugestão padrão |
|---|---|
| A — Campanha tráfego | 7-14 dias (sprint) ou 30 dias (campanha mensal) |
| B — Site/página/landing | 14-30 dias |
| C — Sequência email | 14-30 dias |
| D — Lançamento/produto novo | 30-60 dias |
| E — Outro | conforme cliente disser |

Use a sugestão na mensagem ("Pra <tipo>, normalmente é <X> dias. Confirma ou prefere outro?") mas respeite escolha final.

### Parsing de "Outro"

Aceitar input livre. Converter pra dias:
- `N dias` → N
- `N semanas` → N * 7
- `N meses` → N * 30
- `N ano(s)` → N * 365

### Validação

Mínimo 7 dias, máximo 365 dias. Se fora, voltar a pergunta.

### Calcular volume de tarefas conforme prazo

| prazo_dias | total_tarefas (faixa) |
|---|---|
| 7 | 3-5 |
| 14 | 5-7 |
| 30 | 6-10 |
| 60 | 10-13 |
| 90 | 12-15 |
| 180 | 18-25 |
| 365 | 30-50 |

Quebra padrão por tipo (Passo 5.3) é PISO MÍNIMO. Adaptar pra cima conforme tabela acima quando prazo for maior. Manter qualidade > quantidade (não inflar tarefas só pra encher).

### Composição do título

| prazo_dias | titulo prefixo |
|---|---|
| 7-14 | "Sprint <N>d — <Pedido>" |
| 30-60 | "Plano <N>d — <Pedido>" |
| 90 | "Plano 90 Dias — <Pedido>" |
| 180 | "Plano Semestral — <Pedido>" |
| 365 | "Plano Anual — <Pedido>" |

### Composição do slug

Mesmo padrão da `/plano-de-acao`:
- 7-14 dias → `plano-NNN-sprint-<N>d-<pedido-kebab>`
- 30 dias → `plano-NNN-mensal-<pedido-kebab>`
- 60 dias → `plano-NNN-60d-<pedido-kebab>`
- 90 dias → `plano-NNN-<pedido-kebab>` (sem prefixo de prazo, default)
- 180 dias → `plano-NNN-semestral-<pedido-kebab>`
- 365 dias → `plano-NNN-anual-<pedido-kebab>`

Exemplos:
- 7 dias + Memorial Day → `plano-002-sprint-7d-campanha-memorial-day`
- 30 dias + Dia das Mães → `plano-003-mensal-email-dia-das-maes`
- 60 dias + lançamento curso → `plano-004-60d-lancamento-curso`

---

## Passo 4 — Gerar PRD curto + plano

### 4.1 — Calcular próximo NNN

Listar pastas em `meu-negocio/planos-de-acao/plano-*` e pegar maior número. Próximo = max + 1, formatado como `001`, `002`, etc.

```bash
ls -d meu-negocio/planos-de-acao/plano-*/ 2>/dev/null | sed 's:.*plano-\([0-9]*\)-.*:\1:' | sort -n | tail -1
```

### 4.2 — Gerar slug

Primeira palavra-chave do pedido em kebab-case:
- "Memorial Day" → `campanha-memorial-day`
- "site institucional" → `site-institucional`
- "Dia das Mães" → `email-dia-das-maes`

### 4.3 — Confirmar antes de criar pasta

```
Plano novo: <título>
Slug: <slug>
Pasta: meu-negocio/planos-de-acao/plano-NNN-<slug>/
Tipo: <A|B|C|D|E>

Especificação:
- <ponto 1>
- <ponto 2>
- <ponto 3>

Vou criar <N> tarefas:
1. task-XXX: <título> (agente: <nome>, semana 1)
2. task-XXX: <título> (agente: <nome>, semana 1)
...

1. Aprovar e criar plano
2. Quero ajustar
```

Loop até aprovar.

---

## Passo 5 — Criar pasta + arquivos + atualizar dados.js

### 5.1 — Criar pasta

```bash
mkdir -p meu-negocio/planos-de-acao/plano-NNN-<slug>/entregas
```

### 5.2 — Criar `prd.md`

```markdown
---
versao: 2.1.0
data_criacao: <YYYY-MM-DD>
slug: <slug>
plano_id: plano-NNN-<slug>
tipo: <A|B|C|D|E>
status: em_andamento
---

# PRD — <Título>

## Objetivo
<1-2 frases>

## Contexto
- Negócio: <empresa.nome>
- Público-alvo: <publico-alvo>

## Especificação
<respostas das 3 perguntas>

## Sucesso
<métricas>

## Cronograma
- Início: <data>
- Entrega: <data>

## Tarefas
Ver `tarefas.md` na mesma pasta.
```

### 5.3 — Criar `tarefas.md`

```markdown
---
versao: 2.1.0
ultima_atualizacao: <ts>
total_tarefas: <N>
plano_id: plano-NNN-<slug>
---

# Tarefas — <Título>

## A Fazer

- [ ] **task-XXX**: <título>
  - Descrição: <1 linha>
  - Agente: <nome>
  - Arquivo de saída: meu-negocio/planos-de-acao/plano-NNN-<slug>/entregas/<arquivo>
  - Dependências: [ ]
  - Semana: <X>
  - PRD: meu-negocio/planos-de-acao/plano-NNN-<slug>/prd.md

[... 3-7 tarefas ...]

## Em Andamento
_(preenchido pelos agentes)_

## Concluídas
_(preenchido pelos agentes)_
```

#### Quebra padrão por tipo

**Tipo A — Campanha (5 tarefas):** briefing (camila), criativos (camila), copy (copy-squad), pixel (aline), lançar (aline/henrique)

**Tipo B — Site (4):** wireframe (andre), copy (copy-squad), build (victor), subir/testar (victor)

**Tipo C — Email (3):** estratégia (beatriz), copy (beatriz), automação (danilo)

**Tipo D — Lançamento (7):** Grand Slam Offer (hormozi-squad), página (victor), copy+VSL (copy-squad+rafael), email pré-lançamento (beatriz), aquecimento (mariana), briefing tráfego (camila), workflow (danilo)

**Tipo E:** adaptar 3-5.

### 5.4 — Atualizar `_ativo.txt`

Se cliente escolheu opção 2 no Passo 2 (pausar antigo) ou não havia ativo:
```bash
echo "plano-NNN-<slug>" > meu-negocio/planos-de-acao/_ativo.txt
```

### 5.5 — Atualizar `meu-negocio/dados.js`

Read → modify → write. JSON.stringify obrigatório.

```javascript
window.DADOS_NEGOCIO.versao = JSON.parse(JSON.stringify("2.0.0"));
window.DADOS_NEGOCIO.ultima_atualizacao = JSON.parse(JSON.stringify("<ts>"));

// Se cliente escolheu pausar antigo:
const planoAntigo = window.DADOS_NEGOCIO.planos.ativo;
if (planoAntigo && window.DADOS_NEGOCIO.planos.lista[planoAntigo]) {
  window.DADOS_NEGOCIO.planos.lista[planoAntigo].status = JSON.parse(JSON.stringify("pausado"));
  window.DADOS_NEGOCIO.planos.lista[planoAntigo].pausado_em = JSON.parse(JSON.stringify("<ts>"));
}

// Novo plano vira ativo
window.DADOS_NEGOCIO.planos.ativo = JSON.parse(JSON.stringify("plano-NNN-<slug>"));
window.DADOS_NEGOCIO.planos.total = (window.DADOS_NEGOCIO.planos.total || 0) + 1;
window.DADOS_NEGOCIO.planos.lista["plano-NNN-<slug>"] = JSON.parse(JSON.stringify({
  titulo: "<título dinâmico baseado em prazo>",
  slug: "<slug>",
  pasta: "plano-NNN-<slug>",
  objetivo: "<objetivo curto>",
  status: "em_andamento",
  data_inicio: "<ts>",
  data_conclusao: null,
  prazo_dias: <N>,                                  // NOVO v2.1.0
  total_semanas: <round(N/7)>,                      // dinâmico (não mais 4 fixo)
  data_conclusao_prevista: "<ISO + prazo_dias>",    // NOVO v2.1.0
  semana_atual: 1,
  prd_path: "meu-negocio/planos-de-acao/plano-NNN-<slug>/prd.md",
  tarefas_path: "meu-negocio/planos-de-acao/plano-NNN-<slug>/tarefas.md",
  tarefas: {
    a_fazer: [/* tarefas geradas */],
    em_andamento: [],
    concluidas: []
  }
}));

// Inicializar agentes novos (se já não existirem)
window.DADOS_NEGOCIO.agentes["<nome>"] = window.DADOS_NEGOCIO.agentes["<nome>"] || JSON.parse(JSON.stringify({
  status: "ocioso",
  plano: null,
  task_atual: null,
  inicio: null,
  ultima_entrega: null,
  cargo: "<cargo do catálogo>"
}));

// Métricas — recalcular do plano ativo (NOVO)
window.DADOS_NEGOCIO.metricas.plano_ativo = JSON.parse(JSON.stringify("plano-NNN-<slug>"));
window.DADOS_NEGOCIO.metricas.total_tarefas = <N>;
window.DADOS_NEGOCIO.metricas.concluidas = 0;
window.DADOS_NEGOCIO.metricas.em_andamento = 0;
window.DADOS_NEGOCIO.metricas.a_fazer = <N>;
window.DADOS_NEGOCIO.metricas.progresso_pct = 0;

// Atividade recente
window.DADOS_NEGOCIO.atividade_recente.unshift(JSON.parse(JSON.stringify({
  timestamp: "<ts>",
  agente: "skill-novo-plano-de-acao",
  plano: "plano-NNN-<slug>",
  acao_resumida: "Plano novo criado: <título>"
})));
window.DADOS_NEGOCIO.atividade_recente = window.DADOS_NEGOCIO.atividade_recente.slice(0, 20);
```

#### Catálogo de cargos

Mesmo do `/plano-de-acao-90-dias`. Agentes não-listados: omitir `cargo`.

---

## Passo 6 — Mensagem final

```
✅ Plano novo criado: <título>
Pasta: meu-negocio/planos-de-acao/plano-NNN-<slug>/
<X> tarefas adicionadas.

Plano anterior <plano-antigo> ficou pausado. Pra retomar depois: /retomar-plano <slug-antigo>.

Atualize o painel (F5).
```

(Se não havia ativo antes, omitir a linha de "plano anterior pausado".)

---

## Segurança crítica em `dados.js`

REGRA INVIOLÁVEL: `JSON.parse(JSON.stringify(valor))` em toda value. NUNCA concatenar string literal.

Validações: rejeitar `</script>`, backticks não escapados, sanitizar bytes de controle.

---

## Princípios não negociáveis

| | Princípio |
|---|---|
| 1 | Acentuação PT-BR |
| 2 | Sem hífens nem travessões em copy |
| 3 | Uma pergunta por mensagem |
| 4 | PRD sempre curto (1 página) |
| 5 | Verificar plano ativo ANTES de criar novo |
| 6 | Cliente sempre decide (cancelar/pausar/concluir) |
| 7 | JSON.stringify obrigatório em dados.js |
| 8 | Recalcular métricas do plano ATIVO (não soma global) |
| 9 | Confirmar resumo antes de criar pasta |
| 10 | Sempre mensagem F5 |
| 11 | Cliente leigo nunca vê código |
| 12 | NNN sequencial (calcular do max existente +1) |
| 13 | Chave de agente = nome próprio minúsculo |
| 14 | Voz autêntica do cliente preservada no PRD |
| 15 | **NOVO v2.1.0:** PERGUNTAR PRAZO no Passo 3.5. Validar 7-365 dias. Sugerir prazo padrão por tipo. |
| 16 | **NOVO v2.1.0:** prazo_dias + total_semanas dinâmico + data_conclusao_prevista no schema |
| 17 | **NOVO v2.1.0:** título e slug refletem prazo (Sprint 7d / Plano Mensal / Plano Anual / etc) |
