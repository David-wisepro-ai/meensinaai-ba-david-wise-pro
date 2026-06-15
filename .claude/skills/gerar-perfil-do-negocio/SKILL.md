---
name: gerar-perfil-do-negocio
description: "Use quando cliente acabou o onboarding (ou via /gerar-perfil-do-negocio direto) e precisa estruturar empresa.md + publico-alvo.md + disparar brand-squad pra gerar marca/. Detecta automaticamente Modo A (extração de transcrição em meu-negocio/.transcricao-onboarding.md|.txt) ou Modo B (entrevista 15 perguntas no chat). Schema v2.0.0 multi-planos. Atualiza dados.js (empresa.*, publico_alvo.*, marca.status_geracao). Mensagem F5 final."
allowed-tools: Read, Write, Edit, Bash, Agent
---

# Gerar Perfil do Negócio (v2.0.0)

> Skill que cria a fonte de verdade do negócio. Gera **3 saídas estruturadas** (`empresa.md` + `publico-alvo.md` + `marca/` via brand-squad). Todos os agentes do time leem essas 3 fontes no Passo 0 antes de produzir.

## Mudanças vs v1.x

- **Antes:** gerava `meu-negocio/perfil.md` monolítico
- **Agora:** gera `meu-negocio/empresa.md` + `meu-negocio/publico-alvo.md` + dispara brand-chief automaticamente (gera os 4 arquivos de `meu-negocio/marca/`)
- **dados.js schema 2.0.0**: popula `empresa.*` + `publico_alvo.*` + `marca.status_geracao`

## Detecção automática de modo

```bash
ls meu-negocio/.transcricao-onboarding.md meu-negocio/.transcricao-onboarding.txt 2>/dev/null
```

- **Existe** com conteúdo: **Modo A** (extração)
- **Não existe**: **Modo B** (entrevista direta)

Cliente nunca escolhe modo manualmente.

---

## Modo A — Extração de transcrição

### Passo 0: contexto obrigatório

1. Ler `meu-negocio/empresa.md` (schema atual, pode estar vazio)
2. Ler `meu-negocio/publico-alvo.md` (schema atual)
3. Ler `meu-negocio/.transcricao-onboarding.md` (ou `.txt`)
4. Ler `wiki/operations/lessons.md`
5. Ler `meu-negocio/dados.js` (estado atual)

### Passo 1: extração semântica

Aplicar parsing semântico na transcrição. **15 campos divididos em 2 saídas:**

#### Vão pro `empresa.md` (perguntas 1-3, 4, 10-15):
- **Identificação** (1): nome, tempo de mercado, geografia, idioma
- **Produto/Serviço** (4): produto principal, ticket médio, margem, diferenciais
- **Stack atual** (10): ferramentas que usa hoje
- **Aquisição** (11): canais por onde clientes chegam, CAC, LTV
- **Metas** (12-15): meta 90 dias, maior gargalo, horas/semana, vitória rápida 30 dias

#### Vão pro `publico-alvo.md` (perguntas 5-9):
- **ICP** (5): faixa etária, renda, profissão, geografia
- **Dor Principal** (5): a mais central
- **Top 3 dores** (6): em ordem de importância
- **Top 3 objeções** (7): resistências reais na venda
- **Voz autêntica** (9): tom da marca + frases típicas
- **Decorados** (8): diferenciais reais (não genéricos)

### Passo 2: identificar campos faltantes

Listar campos sem evidência. Se houver 3+ faltando, perguntar uma por mensagem antes de salvar.

### Passo 3: popular `meu-negocio/empresa.md`

Estrutura padrão:

```markdown
---
versao: 2.0.0
ultima_atualizacao: <timestamp ISO>
modo_geracao: a-com-call
status: completo
---

# Empresa

## Identificação
- **Nome:** ...
- **Tax ID (CNPJ/EIN):** ...
- **Fundação / Tempo de mercado:** ...
- **Geografia:** ...
- **Idioma:** ...
- **Site:** ...
- **Instagram:** ...
- **LinkedIn:** ...

## Produto / Serviço
- **Produto principal:** ...
- **Ticket médio:** ...
- **Margem aproximada:** ...
- **Diferenciais reais:** ...

## Stack atual
- **Pagamento:** ...
- **CRM:** ...
- **Email marketing:** ...
- **Calendário:** ...
- **Outras ferramentas:** ...

## Aquisição
- **Canais ativos:** ...
- **CAC aproximado:** ...
- **LTV aproximado:** ...

## Metas
- **Meta de faturamento 90 dias:** ...
- **Maior gargalo:** ...
- **Horas/semana disponíveis:** ...
- **Vitória rápida 30 dias:** ...
```

### Passo 4: popular `meu-negocio/publico-alvo.md`

Estrutura padrão:

```markdown
---
versao: 2.0.0
ultima_atualizacao: <timestamp ISO>
modo_geracao: a-com-call
status: completo
---

# Público-Alvo

## ICP (Ideal Customer Profile)
- **Faixa etária:** ...
- **Renda:** ...
- **Profissão:** ...
- **Geografia:** ...

## Dor Principal
<a dor central que o cliente busca resolver com você>

## Top 3 dores
1. ...
2. ...
3. ...

## Top 3 objeções
1. ...
2. ...
3. ...

## Voz autêntica
- **Tom:** formal | amigável | técnico | inspiracional
- **Palavras que cliente usa:** ...
- **Frases típicas:** ...

## Diferenciais reais (que público reconhece)
- ...
- ...
- ...
```

**Importante:** preservar voz autêntica do cliente nas seções de dores, objeções e voz. Usar palavras dele, não paráfrase genérica.

### Passo 5: atualizar `meu-negocio/dados.js`

**Schema alvo: 2.0.0.** Popular `empresa.*` + `publico_alvo.*` + `marca.status_geracao` + `atividade_recente` + `ultima_atualizacao`. NÃO mexer em `agentes`, `planos`, `metricas` (responsabilidade de `/plano-de-acao-90-dias`).

Read → modify → write via Edit:

```javascript
window.DADOS_NEGOCIO.versao = "2.0.0";
window.DADOS_NEGOCIO.ultima_atualizacao = JSON.parse(JSON.stringify("<timestamp ISO>"));

// EMPRESA (todos os campos do schema)
window.DADOS_NEGOCIO.empresa.nome = JSON.parse(JSON.stringify("<nome>"));
window.DADOS_NEGOCIO.empresa.cnpj_taxid = JSON.parse(JSON.stringify("<tax id>"));
window.DADOS_NEGOCIO.empresa.fundacao = JSON.parse(JSON.stringify("<fundacao>"));
window.DADOS_NEGOCIO.empresa.geografia = JSON.parse(JSON.stringify("<geografia>"));
window.DADOS_NEGOCIO.empresa.idioma = JSON.parse(JSON.stringify("<idioma>"));
window.DADOS_NEGOCIO.empresa.site = JSON.parse(JSON.stringify("<site>"));
window.DADOS_NEGOCIO.empresa.instagram = JSON.parse(JSON.stringify("<ig>"));
window.DADOS_NEGOCIO.empresa.linkedin = JSON.parse(JSON.stringify("<li>"));
window.DADOS_NEGOCIO.empresa.produto_principal = JSON.parse(JSON.stringify("<produto>"));
window.DADOS_NEGOCIO.empresa.ticket_medio = JSON.parse(JSON.stringify("<ticket>"));
window.DADOS_NEGOCIO.empresa.margem_aproximada = JSON.parse(JSON.stringify("<margem>"));
window.DADOS_NEGOCIO.empresa.canais_aquisicao = JSON.parse(JSON.stringify(["canal1", "canal2"]));
window.DADOS_NEGOCIO.empresa.cac = JSON.parse(JSON.stringify("<cac>"));
window.DADOS_NEGOCIO.empresa.ltv = JSON.parse(JSON.stringify("<ltv>"));
window.DADOS_NEGOCIO.empresa.meta_faturamento_90d = JSON.parse(JSON.stringify("<meta>"));
window.DADOS_NEGOCIO.empresa.maior_gargalo = JSON.parse(JSON.stringify("<gargalo>"));

// PUBLICO_ALVO
window.DADOS_NEGOCIO.publico_alvo.faixa_etaria = JSON.parse(JSON.stringify("<faixa>"));
window.DADOS_NEGOCIO.publico_alvo.renda = JSON.parse(JSON.stringify("<renda>"));
window.DADOS_NEGOCIO.publico_alvo.profissao = JSON.parse(JSON.stringify("<profissao>"));
window.DADOS_NEGOCIO.publico_alvo.geografia = JSON.parse(JSON.stringify("<geografia>"));
window.DADOS_NEGOCIO.publico_alvo.dor_principal = JSON.parse(JSON.stringify("<dor>"));
window.DADOS_NEGOCIO.publico_alvo.top_3_dores = JSON.parse(JSON.stringify(["dor1","dor2","dor3"]));
window.DADOS_NEGOCIO.publico_alvo.top_3_objecoes = JSON.parse(JSON.stringify(["obj1","obj2","obj3"]));
window.DADOS_NEGOCIO.publico_alvo.voz_autentica = JSON.parse(JSON.stringify("<voz>"));

// MARCA — sinaliza que brand-squad está trabalhando
window.DADOS_NEGOCIO.marca.status_geracao = JSON.parse(JSON.stringify("em_andamento"));

// ATIVIDADE RECENTE — 2 entries
const ts = "<timestamp ISO>";
window.DADOS_NEGOCIO.atividade_recente.unshift(JSON.parse(JSON.stringify({
  timestamp: ts,
  agente: "skill-gerar-perfil",
  plano: null,
  acao_resumida: "Perfil gerado: empresa.md + publico-alvo.md"
})));
window.DADOS_NEGOCIO.atividade_recente.unshift(JSON.parse(JSON.stringify({
  timestamp: ts,
  agente: "brand-chief",
  plano: null,
  acao_resumida: "Brand-squad iniciado pra gerar marca/"
})));
// Cortar pra 20 mais recentes
window.DADOS_NEGOCIO.atividade_recente = window.DADOS_NEGOCIO.atividade_recente.slice(0, 20);
```

### Passo 6: disparar brand-chief automaticamente

Após popular empresa.md + publico-alvo.md + atualizar dados.js, invocar via Agent tool:

```
Agent(
  subagent_type: "brand-chief",
  description: "Gerar marca automatica pos-onboarding",
  prompt: """Você é o brand-chief. Cliente novo do BA acabou de completar onboarding. Leia:
1. meu-negocio/empresa.md (identificação, produto, geografia, idioma)
2. meu-negocio/publico-alvo.md (ICP, dores, voz autêntica)

Gere os 4 arquivos da pasta meu-negocio/marca/ baseado nesses dados:

a) brand-voice.md — tom de voz (formal/amigável/técnico/inspiracional do publico-alvo),
palavras a EVITAR (mostrar 5+), palavras a USAR (mostrar 5+), 3 exemplos de frase
em cada tom (CTA, post Instagram, email outbound).

b) visual-guidelines.md — paleta de 3 cores (primária + secundária + neutro)
fundamentada no nicho (cleaning costuma azul/branco, flooring costuma marrom/dourado,
consulting costuma cinza/azul), tipografia (1 sans pra título, 1 sans pra texto),
hierarquia visual.

c) padroes-site.md — estrutura de homepage recomendada (hero, prova social, oferta,
contato), copy padrão pro hero (1 headline + 1 subheadline + 1 CTA), recomendação
de seções secundárias.

d) padroes-postagem.md — formato pra Instagram (carrossel, reel, story), formato
pra LinkedIn (post curto, post longo), tom por canal.

Cada arquivo é markdown limpo, PT-BR, sem hífens nem travessões em copy corrida.

Após criar os 4 arquivos, atualizar meu-negocio/dados.js:
window.DADOS_NEGOCIO.marca.status_geracao = JSON.parse(JSON.stringify("concluido"));
e popular marca.tom, marca.palavras_evitar, marca.palavras_preferir, marca.paleta_cores, marca.tipografia."""
)
```

**Fallback se brand-chief não disponível:** criar os 4 arquivos com placeholder:

```markdown
# <Título>

> Aguardando brand-squad. Rode `/atualizar-marca` quando tiver tempo pra gerar este arquivo automaticamente, ou edite manualmente.
```

E atualizar `dados.js`:
```javascript
window.DADOS_NEGOCIO.marca.status_geracao = JSON.parse(JSON.stringify("pendente_manual"));
```

### Passo 7: mensagem final ao cliente

```
✅ Perfil do negócio gerado.
- meu-negocio/empresa.md (identificação + stack)
- meu-negocio/publico-alvo.md (ICP + voz)
- meu-negocio/marca/ (sendo gerado pelo brand-squad em background, ~3-5 min)

Atualize o painel apertando F5.

Próximo passo: /plano-de-acao-90-dias pra gerar seu primeiro plano de ação.
```

---

## Modo B — Entrevista direta no chat

### Passo 0: contexto obrigatório

1. Ler `meu-negocio/empresa.md` (schema vazio)
2. Ler `meu-negocio/publico-alvo.md` (schema vazio)
3. Ler `meu-negocio/dados.js`
4. Ler `wiki/operations/lessons.md`

### Passo 1: apresentação

```
Olá. Vou te conhecer melhor pra criar o perfil do seu negócio.

São 15 perguntas, uma de cada vez. Pode responder direto, sem pressa.

Esse perfil vai alimentar todos os agentes do seu time de IA. Quanto mais real e específico, melhor o sistema vai trabalhar pra você.

Vamos começar.
```

### Passo 2: 15 perguntas em 6 blocos

Uma pergunta por mensagem.

**Bloco 1 — Identificação (perguntas 1-3) → empresa.md**

1. Qual o nome do seu negócio e há quanto tempo está no mercado? (ex: "Decorz Flooring, 8 anos")
2. Em qual cidade, estado e país você opera?
3. Em qual idioma você se comunica com seus clientes? (1. Português 2. Inglês 3. Espanhol 4. Bilíngue)

**Bloco 2 — Produto e cliente (perguntas 4-5) → empresa.md (4) + publico-alvo.md (5)**

4. Qual seu produto/serviço principal e qual o ticket médio?
5. Descreva seu cliente ideal: faixa etária, renda, profissão, geografia, dor principal.

**Bloco 3 — Dores e objeções (perguntas 6-7) → publico-alvo.md**

6. Quais as top 3 dores que seus clientes buscam resolver com você? (em ordem)
7. Quais as top 3 objeções comuns na sua venda?

**Bloco 4 — Diferenciação e voz (perguntas 8-9) → publico-alvo.md (8 também vai pra empresa.md como diferenciais)**

8. Quais os diferenciais REAIS do seu negócio? (Específico, não "atendimento de qualidade")
9. Qual o tom da sua marca? (1. Formal 2. Amigável 3. Técnico 4. Inspiracional)

**Bloco 5 — Operação (perguntas 10-11) → empresa.md**

10. Que ferramentas você usa hoje? Liste todas (pagamento, CRM, marketing, calendário).
11. Por quais canais seus clientes chegam? (1. Indicação 2. Google 3. Redes sociais 4. Site 5. Anúncios 6. Eventos 7. Outro)

**Bloco 6 — Metas (perguntas 12-15) → empresa.md**

12. Qual sua meta de faturamento nos próximos 90 dias?
13. Qual seu maior gargalo hoje? (1. Falta de lead 2. Lead não fecha 3. Fulfillment 4. Retenção 5. Outro)
14. Quantas horas/semana consegue dedicar?
15. O que queria ver PRONTO em 30 dias? Vitória rápida.

### Passo 3: confirmar antes de salvar

Mostrar resumo agrupado por arquivo (empresa + publico-alvo). Pedir aprovação.

### Passo 4: salvar (igual Modo A passos 3-6)

Atualizar frontmatter:
```yaml
modo_geracao: b-sem-call
status: completo
```

### Passo 5: mensagem final (igual Modo A passo 7)

---

## Segurança crítica ao escrever em `dados.js`

`meu-negocio/dados.js` é JavaScript executado pelo painel via `<script src>`. Inputs do cliente podem conter caracteres que abrem **code injection**.

**REGRA INVIOLÁVEL:** toda escrita em `dados.js` DEVE usar `JSON.stringify(valor)` na value. NUNCA concatenar string literal.

```javascript
// ❌ ERRADO
window.DADOS_NEGOCIO.empresa.nome = "<nome>";

// ✅ CERTO
window.DADOS_NEGOCIO.empresa.nome = JSON.parse(JSON.stringify("<nome>"));
```

Validações antes de gravar:
1. Rejeitar valores que contenham `</script>` (case-insensitive)
2. Rejeitar valores com backtick não escapado (`` ` ``)
3. Sempre serializar via `JSON.stringify` antes de inserir no `.js`
4. Sanitizar: remover bytes de controle, `\u202`

Se input disparar validação, sinalizar: "Detectei caracteres especiais no campo X. Vou sanitizar." e remover.

---

## Princípios não negociáveis

| | Princípio |
|---|---|
| 1 | Acentuação obrigatória PT-BR |
| 2 | Sem hífens nem travessões em texto corrido |
| 3 | Voz autêntica do cliente preservada nas dores/objeções/voz |
| 4 | Uma pergunta por mensagem (Modo B) |
| 5 | Confirmar resumo antes de salvar (Modo B) |
| 6 | Sempre atualizar dados.js + disparar brand-chief ao final |
| 7 | JSON.stringify obrigatório em toda escrita em dados.js |
| 8 | Modo detectado automático |
| 9 | Schema 2.0.0: empresa.* + publico_alvo.* + marca.status_geracao |
| 10 | Mensagem F5 sempre |
| 11 | Cliente leigo nunca vê código |
| 12 | Brand-chief sempre invocado ao final (com fallback se indisponível) |

## Quando faltar contexto

Se transcrição/respostas não cobrem campo crítico, **pergunte**. Não invente. Não preencha com placeholder genérico. Perfil incompleto > perfil falso.
