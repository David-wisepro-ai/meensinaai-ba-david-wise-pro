---
name: plano-de-acao
description: "Use quando cliente acabou de gerar empresa.md + publico-alvo.md e precisa do PRIMEIRO plano de ação. Ou quando cliente pede 'plano de ação', 'plano 7 dias', 'sprint emergencial', 'plano 30 dias', 'plano mensal', 'plano 90 dias', 'plano trimestral', 'roadmap', 'plano 6 meses', 'plano semestral', 'plano anual', 'plano de execução', 'o que faço primeiro'. Pergunta o PRAZO (7/30/90/180/365 dias ou customizado) e adapta volume de tarefas. Cria pasta meu-negocio/planos-de-acao/plano-NNN-<slug>/ com prd.md + tarefas.md + entregas/. 5 catálogos por objetivo (Aumentar Leads / Melhorar Conversão / Aumentar Ticket / Reduzir Churn / Lançar Produto). Atualiza dados.js schema 2.0.0 com planos.ativo + planos.lista (campos prazo_dias + total_semanas dinâmico + data_conclusao_prevista) + agentes nominais."
allowed-tools: Read, Write, Edit, Bash
---

# Plano de Ação (v2.1.0 — prazo flexível)

> Cria o **primeiro plano** do cliente em prazo escolhido. Multi-planos schema. Cada plano = pasta dedicada com PRD + tarefas + entregas.

## Mudanças vs v2.0.0

- **Antes:** prazo fixo 90 dias / 12 semanas / ~30 tarefas
- **Agora:** prazo flexível (7, 30, 90, 180, 365 dias ou customizado). Volume de tarefas adapta automaticamente. Schema dados.js ganha `prazo_dias` + `total_semanas` dinâmico + `data_conclusao_prevista`.
- **Renomeado:** `/plano-de-acao-90-dias` → `/plano-de-acao` (não assume mais 90 dias por padrão).

## Quando usar

- Cliente acabou de gerar `empresa.md` + `publico-alvo.md` e precisa do plano inicial
- Cliente pede plano em qualquer prazo (sprint 7d, mensal, trimestral, semestral, anual)

## Quando NÃO usar

- Empresa.md ou publico-alvo.md vazios → instruir `/gerar-perfil-do-negocio` primeiro
- Cliente quer plano NOVO depois do discovery → usar `/novo-plano-de-acao`
- Cliente quer ajustar 1 tarefa específica → editar manualmente

---

## Passo 0 — Contexto obrigatório

1. `meu-negocio/empresa.md` — fonte de verdade da empresa
2. `meu-negocio/publico-alvo.md` — ICP + voz
3. `meu-negocio/marca/brand-voice.md` se existir
4. `meu-negocio/dados.js` — estado atual
5. `meu-negocio/planos-de-acao/_ativo.txt` se existir
6. `wiki/operations/lessons.md`

**Se empresa.md ou publico-alvo.md tem `_(a preencher)_` em campos críticos:**

```
Pra montar seu plano, preciso que empresa.md e publico-alvo.md estejam completos.

Rode /gerar-perfil-do-negocio antes. Volta aqui depois.
```

**Se já existe plano ativo em `_ativo.txt`:** ATENÇÃO — esse skill é só pra primeiro plano. Se já tem plano ativo, instruir cliente a usar `/novo-plano-de-acao` ou `/concluir-plano` antes.

---

## Passo 1 — Perguntar objetivo principal

```
Vou montar seu plano de ação agora.

Antes, qual seu objetivo principal?

1. Aumentar leads qualificados (mais gente entrando no funil)
2. Melhorar conversão de vendas (tem leads mas não fecham)
3. Aumentar ticket médio (vende, mas precisa cobrar mais)
4. Reduzir churn / aumentar retenção (cliente entra e sai rápido)
5. Lançar produto novo (testar oferta nova)
6. Outro (descreva)

Qual é o seu?
```

**Cruzar com `empresa.maior_gargalo` no perfil:** se discrepar, perguntar se quer atacar gargalo declarado.

---

## Passo 2 — Perguntar PRAZO (NOVO em v2.1.0)

Após receber objetivo, ANTES de gerar catálogo:

```
Em quanto tempo você quer atingir esse objetivo?

1. 7 dias (sprint emergencial, foco máximo, 5-8 tarefas críticas)
2. 30 dias (1 mês, ritmo intenso, 12-15 tarefas)
3. 90 dias (3 meses, ritmo sustentável, 25-30 tarefas) — recomendado pra discovery e mudança estrutural
4. 180 dias (6 meses, transformação profunda, 40-50 tarefas)
5. Outro (você digita em dias ou semanas)

Qual?
```

### Parsing de "Outro"

Aceitar input livre. Converter pra dias:

| Input cliente | prazo_dias |
|---|---|
| "14 dias" | 14 |
| "3 semanas" | 21 |
| "2 meses" | 60 |
| "1 ano" | 365 |
| "45 dias" | 45 |
| "8 semanas" | 56 |

Regras de conversão:
- `N dias` → N
- `N semanas` → N * 7
- `N meses` → N * 30
- `N ano(s)` → N * 365

### Validação

- Mínimo: 7 dias
- Máximo: 365 dias

Se fora dessa faixa:
```
Prazo precisa ser entre 7 e 365 dias. Tenta de novo.
```
Voltar pergunta.

---

## Passo 3 — Calcular volume de tarefas conforme prazo

### Tabela de adaptação

| prazo_dias | total_tarefas | Estratégia |
|---|---|---|
| 7 | 5-8 | Quick Wins. Tarefas mais críticas das semanas 1-2 do catálogo. |
| 14 | 7-10 | Semanas 1-2 do catálogo. |
| 30 | 12-15 | Semanas 1-4 do catálogo. |
| 60 | 20-22 | Semanas 1-8 do catálogo. |
| 90 | 25-30 | Catálogo completo (default v2.0.0). |
| 120 | 30-35 | Catálogo completo + 5 tarefas de otimização. |
| 180 | 40-50 | Catálogo completo + camada estratégica (escala, automação avançada, expansão de canal). |
| 365 | 60-80 | 4 ciclos de catálogo encadeados (Q1 discovery, Q2 escala, Q3 otimização, Q4 expansão). |

### Fórmula geral pra prazo customizado

```
total_tarefas = round((prazo_dias / 90) * 30)
total_tarefas = max(5, min(80, total_tarefas))
total_semanas = round(prazo_dias / 7)
```

Exemplos:
- prazo_dias=14 → round(14/90 * 30) = 5 tarefas (mínimo)
- prazo_dias=45 → round(45/90 * 30) = 15 tarefas
- prazo_dias=120 → round(120/90 * 30) = 40 tarefas (limitado pela tabela quando bater nos prazos canônicos; fórmula só pra customizados)

### Composição do título (dinâmico)

| prazo_dias | titulo |
|---|---|
| 7 | "Sprint 7 Dias" |
| 14 | "Sprint 14 Dias" |
| 30 | "Plano 30 Dias" |
| 60 | "Plano 60 Dias" |
| 90 | "Plano 90 Dias" |
| 120 | "Plano 120 Dias" |
| 180 | "Plano 6 Meses" |
| 365 | "Plano Anual" |
| Outro N | "Plano N Dias" |

### Composição do slug

Slug curto se prazo é 90 dias (default histórico): `plano-NNN-discovery` (ou `plano-NNN-<objetivo>`).

Slug com prefixo de prazo se outro:
- 7d → `plano-NNN-sprint-7d-<objetivo-kebab>`
- 30d → `plano-NNN-mensal-<objetivo-kebab>`
- 180d → `plano-NNN-semestral-<objetivo-kebab>`
- 365d → `plano-NNN-anual-<objetivo-kebab>`
- Outro → `plano-NNN-<prazo>d-<objetivo-kebab>` (ex: `plano-NNN-45d-aumentar-leads`)

Exemplos:
- 90 dias + Aumentar Leads → `plano-001-discovery` (mantém slug histórico)
- 7 dias + Aumentar Leads → `plano-002-sprint-7d-aumentar-leads`
- 30 dias + campanha junho → `plano-003-mensal-campanha-junho`
- 365 dias + expansão → `plano-004-anual-expansao`

### Calcular próximo NNN

```bash
ls -d meu-negocio/planos-de-acao/plano-*/ 2>/dev/null | sed 's:.*plano-\([0-9]*\)-.*:\1:' | sort -n | tail -1
```
Próximo = max + 1, formatado `001`, `002`, etc. Se nenhum existe, começar em `001`.

---

## Passo 4 — Gerar plano com catálogo adaptado

Usar catálogo correspondente ao objetivo. Adaptar título/descrição ao contexto do perfil (nicho, geografia, ticket).

### Catálogo Objetivo 1 — AUMENTAR LEADS

#### Catálogo completo (90 dias — referência)

| Sem | Tarefa | Agente | Arquivo de saída |
|-----|--------|--------|------------------|
| 1 | Mapear ICP detalhado | marina | meu-negocio/planos-de-acao/<plano>/entregas/icp.md |
| 1 | Auditar Google Business Profile | gustavo | .../entregas/auditoria-gmb.md |
| 1 | Definir oferta principal de captura | renata | .../entregas/oferta-captura.md |
| 2 | Configurar Google Business | gustavo | .../entregas/gmb-otimizado.md |
| 2 | Criar primeiro lead magnet | mariana | .../entregas/lead-magnet-v1.md |
| 2 | Plano de conteúdo orgânico 30 dias | marina | .../entregas/plano-conteudo-30d.md |
| 3 | Landing page de captura | victor | .../entregas/landing-captura.html |
| 3 | Carrossel Instagram x3 (sem 1) | mariana | .../entregas/carrosseis-sem1.md |
| 3 | Setup newsletter welcome+nurture v1 | beatriz | .../entregas/sequencia-welcome.md |
| 4 | Briefing campanha Meta Ads | camila | .../entregas/briefing-meta-v1.md |
| 4 | Configurar Meta Pixel + eventos | aline | .../entregas/pixel-setup.md |
| 5 | Lançar campanha Meta Ads | aline | .../entregas/meta-rodada-1.md |
| 5 | Carrossel Instagram x3 (sem 2) | mariana | .../entregas/carrosseis-sem2.md |
| 6 | Sequência email nurture 7 emails | beatriz | .../entregas/nurture-7-emails.md |
| 6 | Carrossel Instagram x3 (sem 3) | mariana | .../entregas/carrosseis-sem3.md |
| 7 | Briefing Google Ads | gustavo | .../entregas/briefing-google-ads.md |
| 7 | Carrossel Instagram x3 (sem 4) | mariana | .../entregas/carrosseis-sem4.md |
| 8 | Lançar Google Ads Search | gustavo | .../entregas/google-rodada-1.md |
| 8 | Análise rodada 1 Meta | fernando | .../entregas/analise-meta-r1.md |
| 9 | Otimização criativos Meta | camila | .../entregas/otimizacao-criativos.md |
| 9 | Reabertura objeções leads frios | rodrigo | .../entregas/reabertura-objecoes.md |
| 10 | Escalar criativos vencedores | aline | .../entregas/meta-escala.md |
| 10 | Carrossel Instagram x3 (sem 5) | mariana | .../entregas/carrosseis-sem5.md |
| 11 | Análise consolidada de canal | fernando | .../entregas/canal-vencedor.md |
| 11 | Newsletter mensal | beatriz | .../entregas/newsletter-mes2.md |
| 12 | Relatório final 90 dias | fernando | .../entregas/relatorio-final-90d.md |
| 12 | Plano Q2 baseado em aprendizados | marina | .../entregas/plano-q2.md |

#### Adaptação por prazo (Aumentar Leads — exemplo)

**7 dias (sprint, 7 tarefas, em DIAS não semanas):**

| Dia | Tarefa | Agente |
|---|---|---|
| 1 | Mapear ICP detalhado | marina |
| 1-2 | Auditar Google Business Profile | gustavo |
| 2-3 | Otimizar GMB | gustavo |
| 3-4 | Criar lead magnet rápido | mariana |
| 4-5 | Landing de captura simples | victor |
| 5-6 | Briefing primeira campanha Meta | camila |
| 7 | Lançar campanha | aline |

**14 dias:** tarefas 1-10 do catálogo completo, redistribuídas em dias.

**30 dias (12-15 tarefas):** semanas 1-4 do catálogo completo redistribuídas em semanas (1 a 4).

**60 dias (20-22 tarefas):** semanas 1-8 do catálogo completo.

**90 dias (default — 30 tarefas):** catálogo completo acima.

**180 dias (40-50 tarefas):** catálogo completo + 10-15 tarefas extras nas semanas 13-26:
- Sem 13-14: Otimização avançada de copy + criativos via teste A/B sistemático
- Sem 15-16: Expansão pra LinkedIn Ads / TikTok Ads (canal novo)
- Sem 17-18: Automação de qualificação (lead scoring + CRM workflow)
- Sem 19-20: Reativação de base (sequência reengajamento)
- Sem 21-23: Programa de indicação
- Sem 24-26: Análise consolidada semestral + plano semestre 2

**365 dias (60-80 tarefas):** 4 ciclos:
- Q1 (sem 1-13): Discovery — catálogo padrão 90 dias
- Q2 (sem 14-26): Escala — duplicar canal vencedor + otimizar funis
- Q3 (sem 27-39): Otimização — automação + retenção + ticket médio
- Q4 (sem 40-52): Expansão — produto novo + canal novo + parcerias

### Catálogo Objetivo 2 — MELHORAR CONVERSÃO

(idem v2.0.0; mesma estrutura mas saídas em `meu-negocio/planos-de-acao/<plano>/entregas/`)

Adaptação por prazo segue MESMA LÓGICA da tabela acima.

### Catálogo Objetivo 3 — AUMENTAR TICKET
(idem v2.0.0 adaptado pra nova pasta + nova lógica de prazo)

### Catálogo Objetivo 4 — REDUZIR CHURN
(idem v2.0.0 adaptado)

### Catálogo Objetivo 5 — LANÇAR PRODUTO NOVO
(idem v2.0.0 adaptado)

> **Nota:** ao gerar, substituir o prefixo `meu-negocio/entregas/` por `meu-negocio/planos-de-acao/<slug-completo>/entregas/` em todos os arquivos de saída.

---

## Passo 5 — Confirmar com o cliente

Mostrar resumo agrupado por semana (ou por dia se prazo ≤ 14 dias). Loop até aprovar.

```
Plano <titulo> montado, focado em <objetivo>.

Pasta: meu-negocio/planos-de-acao/<slug>/
Prazo: <prazo_dias> dias (<total_semanas> semanas)
Conclusão prevista: <data_inicio + prazo_dias>

Resumo:
[Se prazo <= 14 dias, agrupar por dia]
Dia 1: 2 tarefas
- task-001: ...
- task-002: ...

[Se prazo > 14 dias, agrupar por semana]
Semana 1: 3 tarefas
- task-001: ...

Total: <N> tarefas. Agentes acionados: <lista única>.

1. Aprovar e salvar
2. Quero ajustar (descreva)
```

---

## Passo 6 — Criar pasta + arquivos + atualizar dados.js

### 6.1 — Criar pasta

```bash
mkdir -p meu-negocio/planos-de-acao/<slug-completo>/entregas
```

### 6.2 — Criar `prd.md` do plano

```markdown
---
versao: 2.1.0
data_criacao: <YYYY-MM-DD>
slug: <slug-curto>
plano_id: <slug-completo>
prazo_dias: <N>
total_semanas: <round(N/7)>
data_inicio: <ISO>
data_conclusao_prevista: <ISO + prazo_dias>
status: em_andamento
---

# PRD — <Título>

## Objetivo
<objetivo escolhido pelo cliente>

## Contexto
- Negócio: <empresa.nome>
- Geografia: <empresa.geografia>
- Público-alvo: <publico_alvo resumo>

## Prazo
- <prazo_dias> dias / <total_semanas> semanas

## Estratégia
<2-3 parágrafos explicando linha mestre do plano: por que esse objetivo, como vai atacar nesse prazo, o que entrega ao final>

## Sucesso (métricas)
- <métrica 1 quantificável>
- <métrica 2>

## Cronograma
- Início: <data_inicio>
- Conclusão prevista: <data_conclusao_prevista>
- Total: <prazo_dias> dias / <total_semanas> semanas

## Tarefas
Ver `tarefas.md` na mesma pasta. <N> tarefas em <total_semanas> semanas.
```

### 6.3 — Criar `tarefas.md` (kanban completo)

Frontmatter inclui `prazo_dias` e `total_semanas` dinâmicos.

```markdown
---
versao: 2.1.0
ultima_atualizacao: <timestamp ISO>
total_tarefas: <N>
concluidas: 0
em_andamento: 0
a_fazer: <N>
plano_id: <slug-completo>
prazo_dias: <N>
total_semanas: <round(N/7)>
objetivo_principal: <objetivo>
---

# Tarefas — <Título>

> Plano: <slug-completo>
> Objetivo: <objetivo>
> Prazo: <prazo_dias> dias / <total_semanas> semanas
> <N> tarefas

## A Fazer

### Semana 1
- [ ] **task-001**: <título>
  - Descrição: <1 linha>
  - Agente: <nome>
  - Arquivo de saída: meu-negocio/planos-de-acao/<slug-completo>/entregas/<arquivo>
  - Dependências: [ ]
  - Semana: 1

[... todas N tarefas agrupadas por semana ou por dia se prazo curto ...]

## Em Andamento
_(preenchido conforme agentes pegam tarefas)_

## Concluídas
_(preenchido conforme agentes terminam)_
```

### 6.4 — Criar `_ativo.txt` na pasta `planos-de-acao/`

```bash
echo "<slug-completo>" > meu-negocio/planos-de-acao/_ativo.txt
```

### 6.5 — Atualizar `meu-negocio/dados.js` (schema 2.0.0, campos novos não-breaking)

Read → modify → write via Edit. Toda value passa por JSON.stringify.

```javascript
window.DADOS_NEGOCIO.versao = JSON.parse(JSON.stringify("2.0.0"));
window.DADOS_NEGOCIO.ultima_atualizacao = JSON.parse(JSON.stringify("<timestamp ISO>"));

// PLANOS — registrar plano novo
window.DADOS_NEGOCIO.planos.ativo = JSON.parse(JSON.stringify("<slug-completo>"));
window.DADOS_NEGOCIO.planos.total = 1;
window.DADOS_NEGOCIO.planos.lista["<slug-completo>"] = JSON.parse(JSON.stringify({
  titulo: "<Título dinâmico>",
  slug: "<slug-curto>",
  pasta: "<slug-completo>",
  objetivo: "<objetivo string fixa>",
  status: "em_andamento",
  data_inicio: "<ISO>",
  data_conclusao: null,
  prazo_dias: <N>,                                  // NOVO v2.1.0
  total_semanas: <round(N/7)>,                      // dinâmico (não mais 12 fixo)
  data_conclusao_prevista: "<ISO + prazo_dias>",    // NOVO v2.1.0
  semana_atual: 1,
  prd_path: "meu-negocio/planos-de-acao/<slug-completo>/prd.md",
  tarefas_path: "meu-negocio/planos-de-acao/<slug-completo>/tarefas.md",
  tarefas: {
    a_fazer: [
      { id: "task-001", titulo: "...", descricao: "...", agente: "...", semana: 1, dependencias: [], arquivo_saida: "...", criado_em: "...", iniciado_em: null, concluido_em: null }
      // ... <N-1> outras
    ],
    em_andamento: [],
    concluidas: []
  }
}));

// AGENTES — inicializar TODOS os agentes mencionados nas tarefas (Set único)
window.DADOS_NEGOCIO.agentes["marina"] = JSON.parse(JSON.stringify({
  status: "ocioso",
  plano: null,
  task_atual: null,
  inicio: null,
  ultima_entrega: null,
  cargo: "Social Media Strategist"
}));
// ... uma entrada pra cada agente único

// METRICAS — calcular do plano ativo
window.DADOS_NEGOCIO.metricas.plano_ativo = JSON.parse(JSON.stringify("<slug-completo>"));
window.DADOS_NEGOCIO.metricas.total_tarefas = <N>;
window.DADOS_NEGOCIO.metricas.concluidas = 0;
window.DADOS_NEGOCIO.metricas.em_andamento = 0;
window.DADOS_NEGOCIO.metricas.a_fazer = <N>;
window.DADOS_NEGOCIO.metricas.progresso_pct = 0;
window.DADOS_NEGOCIO.metricas.total_entregas = 0;

// ATIVIDADE RECENTE
window.DADOS_NEGOCIO.atividade_recente.unshift(JSON.parse(JSON.stringify({
  timestamp: "<timestamp ISO>",
  agente: "skill-plano-de-acao",
  plano: "<slug-completo>",
  acao_resumida: "Plano <titulo> gerado (<N> tarefas em <total_semanas> semanas)"
})));
window.DADOS_NEGOCIO.atividade_recente = window.DADOS_NEGOCIO.atividade_recente.slice(0, 20);
```

#### Mapeamento `objetivo` (escolha → string fixa)

| Escolha | String em `objetivo` |
|---|---|
| 1. Aumentar leads qualificados | `Aumentar Leads` |
| 2. Melhorar conversão | `Melhorar Conversão` |
| 3. Aumentar ticket médio | `Aumentar Ticket Médio` |
| 4. Reduzir churn | `Reduzir Churn` |
| 5. Lançar produto novo | `Lançar Produto Novo` |
| 6. Outro | `Outro: <descrição>` |

#### Catálogo de cargos (CARGOS_PADRAO)

Idêntico ao v2.0.0:

| Nome (lowercase) | Cargo |
|---|---|
| ceo | CEO Orquestrador |
| heitor | Project Owner |
| marina | Social Media Strategist |
| mariana | Carrosselista Instagram |
| pedro | CRM Analyst |
| rodrigo | Sales Intelligence |
| juliana | Cart Recovery |
| gustavo | SEO & Blog Strategist |
| beatriz | Newsletter Editor |
| camila | Diretora Criativa de Ads |
| diego | Video Editor |
| lucas | Video Creator |
| patricia | Course Creator |
| marcos | CFO |
| felipe | Arquiteto de Skills |
| cristina | Auditora de Segurança |
| bruno | Validador Técnico |
| sofia | Hub de Comunicação |
| andre | Funnel Architect |
| victor | Full Stack Developer |
| fernando | Traffic Analyst |
| renata | Product Ideator |
| thiago | Product Builder |
| aline | Traffic Manager B2C |
| henrique | Traffic Manager B2B |
| isabela | Churn & Retention Manager |
| danilo | Gerente de Implementação |
| carolina | Student Solutions |
| rafael | YouTube Scriptwriter |

Agentes não-listados: omitir `cargo` (painel cai em fallback).

---

## Passo 7 — Mensagem final

```
✅ Plano <Titulo> gerado.
Pasta: meu-negocio/planos-de-acao/<slug-completo>/
<N> tarefas em <total_semanas> semanas. Conclusão prevista: <data_conclusao_prevista>.
Agentes do time inicializados.

Atualize o painel (F5).
Próximo passo: /executar-tarefa pra começar.
```

---

## NOTA PRA VICTOR — Painel.html (handoff fora desta skill)

O painel já lê `total_semanas` dinâmico. Mas pode quebrar visualmente em prazos extremos:

| total_semanas | Renderização sugerida |
|---|---|
| 1 (sprint 7d) | Jornada com 1 ponto único (ou trocar pra agrupamento por dia) |
| 2-12 | Mostrar todas as semanas (comportamento atual) |
| 13-26 | Mostrar todas, mas pontos mais finos / espaçamento reduzido |
| 27-52 | Mostrar apenas marcos mensais (12 pontos = 1 por mês) |

Lógica adaptativa proposta no painel:
```javascript
if (total_semanas <= 12) {
  renderizarTodasSemanas();
} else if (total_semanas <= 26) {
  renderizarTodasSemanasCompacto();
} else {
  renderizarMarcosMensais(12);
}
```

[NOME_CEO] dispara `/victor` separadamente pra implementar isso. Skill aqui só gera dados corretos.

---

## Segurança crítica ao escrever em `dados.js`

REGRA INVIOLÁVEL: toda value DEVE passar por `JSON.parse(JSON.stringify(valor))`. NUNCA concatenar string literal.

```javascript
// ❌ ERRADO
window.DADOS_NEGOCIO.planos.lista["<slug>"] = { titulo: "<input>" };

// ✅ CERTO
window.DADOS_NEGOCIO.planos.lista["<slug>"] = JSON.parse(JSON.stringify({ titulo: "<input>" }));
```

Validações: rejeitar `</script>`, backticks não escapados, sanitizar `\u202` e bytes de controle.

---

## Princípios não negociáveis

| | Princípio |
|---|---|
| 1 | Acentuação obrigatória PT-BR |
| 2 | Sem hífens nem travessões em texto corrido |
| 3 | Voz autêntica do cliente preservada |
| 4 | Update incremental no dados.js (read → modify → write) |
| 5 | Confirmar resumo antes de salvar |
| 6 | Sempre mensagem F5 ao final |
| 7 | Cliente leigo nunca vê código |
| 8 | Empresa.md e publico-alvo.md devem estar completos antes |
| 9 | Numerar tarefas task-001 a task-NNN sequencialmente |
| 10 | Schema 2.0.0+: planos.ativo + planos.lista[<slug>] populados |
| 11 | _ativo.txt aponta pro plano recém-criado |
| 12 | Inicializar TODOS os agentes nominais com cargo do catálogo |
| 13 | Chave de agente = nome próprio em minúsculo, nunca role-based |
| 14 | Pasta entregas/ vazia (agentes preenchem ao executar) |
| 15 | **NOVO v2.1.0:** PERGUNTAR PRAZO antes de gerar tarefas. Validar 7-365 dias. Adaptar volume conforme tabela. |
| 16 | **NOVO v2.1.0:** prazo_dias + total_semanas dinâmico + data_conclusao_prevista escritos no schema |
| 17 | **NOVO v2.1.0:** título e slug refletem o prazo (Sprint 7 Dias / Plano 30 Dias / Plano Anual / etc) |
