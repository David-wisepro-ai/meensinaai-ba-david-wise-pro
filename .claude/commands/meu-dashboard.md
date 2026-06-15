# /meu-dashboard — Gerar (ou reabrir) o Dashboard-Lição do aluno + ABRIR NO CHROME

> **Instrução PARA você, CEO IA** (não é mensagem pro dono). O dono pediu o painel
> (colou `/meu-dashboard` ou disse "abre o meu painel"). Sua tarefa: gerar/atualizar
> o `dashboard-licao.config.json` dele a partir da base de conhecimento, injetar no
> template HTML gerando um **HTML single-file**, e **abrir esse HTML no Google Chrome**.
>
> **REGRA NOVA (decisions.md 2026-06-08): o entregável é HTML single-file aberto no
> Chrome, NÃO uma tela de cowork e NÃO um slash command em runtime.** O cowork do Claude
> Desktop roda numa pasta isolada e não carrega os commands do repo conectado, então o
> painel não pode depender dele. HTML no navegador é universal e o leigo entende. O
> progresso persiste no localStorage do próprio arquivo (file://).
>
> Doutrina: `wiki/operations/decisions.md` — "DOUTRINA 'ENTREGA MASTIGADA'" + regra 2026-06-08.
> Spec completa: `wiki/operations/templates/dashboard-licao-cowork.md`.
> Template HTML (bloco carimbável, motor auditado): `references/dashboard-licao-template.html`.
> Gerador oficial (faz a injeção segura + valida): `references/dashboard-licao-build.mjs`.
> Schema/exemplo do config: `references/dashboard-licao.config.example.json`.

## O que este comando faz (fluxo)

1. **Lê a base de conhecimento do aluno** pra montar o config:
   - `wiki/raw/transcricoes/` (transcrição da reunião 1) — fonte do contexto e dos pilares.
   - O **ADR-manifesto** do aluno (`wiki/clients/<aluno>/adr.md` ou `wiki/operations/adrs/...`) — diz o que foi entregue PRONTO vs o que é TAREFA.
   - `meu-negocio/mapas-de-necessidade/*.md` — fluxos-alvo por pilar (alimentam os steps).
   - O **CLAUDE.md** do repo — nome da empresa + nome do CEO IA do aluno (seção `## CONTEXTO DO NEGÓCIO` / `## AGENTES DA EMPRESA AI`).
   - Os **plugins instalados** do aluno (`.claude/plugins/` + `.claude/commands/`) e os **agentes** (`.claude/agents/`) — pra preencher `plugins_requeridos`, `agente` de cada step, e validar a whitelist de comandos.
2. **Gera/atualiza** `meu-negocio/dashboard/dashboard-licao.config.json` (cria a pasta se não existir) seguindo o schema de `references/dashboard-licao.config.example.json`. Se o painel já existe e nada mudou na base de conhecimento, pule direto pro passo 5 (só reabrir).
3. **Valida o config** contra as 6 regras de segurança abaixo (GATE). Se QUALQUER regra falhar, NÃO grava — corrige e revalida.
4. **Gera o HTML single-file rodando o gerador oficial** (ele já valida as regras, serializa com os escapes da Regra 3 e injeta no bloco `<script id="dashboard-config" type="application/json">`):
   ```bash
   node references/dashboard-licao-build.mjs \
     meu-negocio/dashboard/dashboard-licao.config.json \
     meu-negocio/dashboard/dashboard-licao.html \
     --commands .claude/commands
   ```
   O gerador **sai com erro e NÃO grava** se alguma regra falhar. Depois de gerar, copie o resultado pra `live-artifacts/dashboard-licao.html` (mesma cópia publicável):
   ```bash
   cp meu-negocio/dashboard/dashboard-licao.html live-artifacts/dashboard-licao.html
   ```
   **NUNCA** injetar o config como `window.DASHBOARD_CONFIG = <config>;` (literal JS dentro de `<script>` — furo XSS parse-time: `JSON.stringify` não escapa `</script>`). Sempre usar o gerador (ou, na mão, o passo de serialização da Regra 3).
5. **Abre o HTML no Google Chrome** (este é o entregável — não é tela de cowork):
   ```bash
   open -a "Google Chrome" "meu-negocio/dashboard/dashboard-licao.html"
   ```
   Fallback se o comando falhar (Chrome não instalado / outro SO): diga ao dono pra **dar dois cliques** no arquivo `meu-negocio/dashboard/dashboard-licao.html` (abre no navegador padrão; funciona igual). Em Windows o equivalente é `start chrome "<caminho>"`; em Linux `google-chrome "<caminho>"`.
   O dono clica nos steps no navegador; o progresso persiste em **localStorage** do próprio arquivo. Pode fechar e reabrir que lembra de onde parou.

## Como derivar os campos (da transcrição + ADR-manifesto)

- `aluno.empresa` / `aluno.ceo_ia`: do CLAUDE.md (nunca inventar; se faltar, perguntar ao dono — não chutar).
- `aluno.slug`: slug da empresa em minúsculas com hífens (ex: "Minha Empresa" → `minha-empresa`). É a chave do localStorage (`LS_KEY = "dashboard-licao::" + slug`). **Validar contra a regex `^[a-z0-9-]{1,64}$` ANTES de gravar** (Regra 6) — se não casar, normalizar (lowercase, espaços/acentos → hífen, remover o resto) e revalidar; se ainda não casar, não grava. Sem isso o slug pode poluir/quebrar a LS_KEY.
- `conectores_requeridos`: conectores que os agentes do aluno precisam (Google Calendar, Gmail, etc.), cada um com um `porque` em linguagem simples. Vêm dos requisitos de conexão do ADR/transcrição.
- `plugins_requeridos`: plugins que precisam estar instalados pros agentes funcionarem (lê `.claude/plugins/`). `oque` = o que aquele plugin entrega, em linguagem do dono.
- `steps`: um cartão-lição por execução do plano de ação.
  - `tipo: "PRONTO"` = o ADR-manifesto marca como ENTREGUE/construído (o aluno só usa).
  - `tipo: "TAREFA"` = o aluno executa com o agente guiando (precisa colar comando / conectar / validar).
  - `agente`: o agente do time DELE que executa aquilo (reforça que o time "já sabe tudo").
  - `licao`: 2-4 linhas mastigadas — o que fazer, o que esperar, por que importa.
  - `comando`: SÓ em steps `TAREFA`. Comando colável da WHITELIST (ver regra 1).
  - `criterio`: como o aluno sabe que concluiu (ex: "você recebeu um PDF na pasta X").

## REGRAS DE SEGURANÇA DO GERADOR (obrigatórias — validar ANTES de gravar)

> Estas 6 regras são GATE. Config que viola qualquer uma NÃO é gravado.
> Regras 1, 2, 3, 5 e 6 são PASSOS DETERMINÍSTICOS (rodar a validação descrita,
> não "lembrar"). O agente executa cada passo e só grava se todos passarem.

### Regra 1 — `comando` é WHITELIST validada por regex + fonte ADR∪instalados (PASSO DETERMINÍSTICO)
Pra CADA step com campo `comando`, rode esta validação na ordem. Falhou qualquer item = NÃO grava o campo `comando` (o step vira só `licao` + `criterio`, ou corrige pro comando válido equivalente). NUNCA grava um `comando` que não passou.

1. **Formato (regex dura):** o valor TEM que casar exatamente
   `^/[a-z0-9][a-z0-9-]{0,48}( .{0,150})?$`
   (começa com `/`, nome em kebab-case minúsculo, sem `\n`/`\r`, total ≤ 200 chars; argumento opcional após 1 espaço). Não casou = descarta o `comando`.
2. **Fonte (ADR ∪ instalados):** o nome do comando (parte antes do 1º espaço, sem a `/`) tem que constar de PELO MENOS UM destes conjuntos:
   - o conjunto-fonte do **ADR-manifesto do aluno** (lista de comandos previstos pra ele), OU
   - existir de fato em `.claude/commands` (ou `.claude/plugins/.../commands`) do aluno.
   É **UNIÃO** (não interseção): casou em qualquer um dos dois = passa. Não casou em nenhum = descarta o `comando`. (A fonte é afrouxada pra UNIÃO, mas o formato continua DURO via regex.)
3. **Nunca derivar da transcrição:** o `comando` é sempre um slash command conhecido. Trecho copiado da transcrição NÃO vira comando. Argumentos longos vão pra `licao` (texto), nunca pro `comando`.

### Regra 2 — ZERO credencial no config (PASSO DETERMINÍSTICO de varredura)
O `dashboard-licao.config.json` é commitado no Git. Antes de gravar, **varra TODOS os valores de string do config** (recursivo) contra os padrões abaixo. Se existir um escrubador de secrets compartilhado (o mesmo que sanitiza conversas salvas), **reuse-o**; senão, aplique esta varredura inline:

- Padrões de prefixo (substring): `sk-`, `Bearer `, `meai_`, `pfm_live_`, `AIza`, `ghp_`, `eyJ` (JWT).
- Heurística de token: qualquer substring com **> 40 caracteres alfanuméricos** contíguos (regex `[A-Za-z0-9_\-]{41,}`) que pareça token/senha.

Casou qualquer padrão = **rejeitar e remover** o valor. O config só diz QUAL conector/chave é preciso (`{"nome":"Supabase","porque":"..."}`), **nunca o valor da chave**. Segredos vivem só em `.env` (gitignored).

### Regra 3 — XSS parse-time: o GERADOR escapa pro contexto JSON-in-HTML-script
> Correção factual (a versão anterior estava errada: dizia "gerador entrega texto limpo, template blinda via esc()" — `esc()` é RUNTIME e NÃO protege o ponto de injeção).

- O config é injetado dentro de `<script id="dashboard-config" type="application/json">…</script>`. `application/json` não é executado pelo parser, MAS continua sendo **raw text pro fim de tag**: a sequência `</script` fecharia o bloco no **parse-time**, antes de qualquer `esc()` rodar. Por isso o ESCAPE É RESPONSABILIDADE DO GERADOR, não do template.
- **Passo de serialização (use SEMPRE este, é o jeito oficial de serializar o config pro HTML):** gere o JSON e então aplique, sobre a string serializada:
  - `<` → `<`
  - `>` → `>`
  - `&` → `&`
  - U+2028 (LINE SEPARATOR) → ` `
  - U+2029 (PARAGRAPH SEPARATOR) → ` `
  Isso impede tanto o breakout `</script` quanto quebras de linha JS. O resultado continua sendo JSON válido (escapes `\uXXXX` são legais em JSON string) e o `JSON.parse(textContent)` do template o lê de volta intacto.
- **`esc()` é defesa de RUNTIME (render), em camada separada.** Ele protege o HTML na hora de pintar os campos na tela, mas NÃO alcança o ponto de injeção parse-time. Não delegar a proteção do ponto de injeção ao `esc()`.

### Regra 4 — Conteúdo (lessons/doutrina)
- pt-BR **acentuado** em toda a UI/lição. Horário de exemplo pra operação US em **AM/PM** (nunca 24h BR — lesson 01/jun).
- **Zero nome do fornecedor / "Me Ensina AI"** dentro do artefato — usar o nome do CEO IA do aluno. Zero menção a outros clientes/exemplos de terceiros.
- Sem jargão cru ("MCP", "agentic", "sub-agent") sem traduzir. "Conector", "plugin", "agente" estão OK (o aluno vê na UI do Claude Desktop).

### Regra 5 — Defesa em profundidade no ponto de injeção (PASSO DETERMINÍSTICO)
> Onde o template não alcança (parse-time), o gerador trava na fonte. Roda DEPOIS de montar o config e ANTES de serializar/gravar.

- Varra **todos os campos de texto** do config. Rejeitar/neutralizar qualquer valor que contenha: `</` , `<script` (case-insensitive), U+2028, U+2029.
- Ação ao detectar: **não grava** com o valor sujo. Ou limpa o campo (remover a sequência ofensiva) e revalida, ou corrige a fonte. Texto de aluno legítimo não precisa dessas sequências.
- Esta regra é redundante de propósito com o escape da Regra 3 (defesa em profundidade): mesmo se o serializador falhar, nenhum payload `</script>` chega ao HTML.

### Regra 6 — `aluno.slug` casa a regex de chave de localStorage (PASSO DETERMINÍSTICO)
- O `aluno.slug` vira a chave do localStorage (`LS_KEY = "dashboard-licao::" + slug`). **Validar contra `^[a-z0-9-]{1,64}$` ANTES de gravar.**
- Não casou = normalizar (lowercase; espaços/acentos → hífen; remover o resto) e revalidar. Se ainda não casar, **não grava**. Sem isso o slug pode poluir/quebrar a LS_KEY.

## Como serializar/injetar o config (jeito oficial — passo 4)

**Prefira sempre o gerador** `references/dashboard-licao-build.mjs` — ele faz os passos abaixo de forma determinística e ainda roda as 6 regras de GATE antes de gravar. Só faça na mão se o `node` não estiver disponível.

À mão (fallback):
1. Monte o objeto config validado (regras 1–5 passaram).
2. Serialize em JSON (indentado é OK).
3. **Aplique os escapes da Regra 3** na string serializada: `<`→`<`, `>`→`>`, `&`→`&`, U+2028→` `, U+2029→` `. (Continua JSON válido.)
4. Substitua tudo entre `>>> CONFIG_INJECTION_START <<<` e `>>> CONFIG_INJECTION_END <<<` no template, mantendo a tag `<script id="dashboard-config" type="application/json">` — cole o JSON escapado entre `<script ...>` e `</script>`.
5. O template já faz `const CFG = JSON.parse(document.getElementById("dashboard-config").textContent);`. Nada de `window.DASHBOARD_CONFIG`.

Teste rápido (sanidade): rode `node references/dashboard-licao-validator.mjs` (prova as defesas XSS do motor) e abra o HTML gerado no Chrome. Um campo com `</script><script>x()</script>` deve aparecer como texto inerte no card (ou ser barrado pela Regra 5) — NUNCA executar.

## STEP 1 é fixo no template (não vem do config como step normal)
O template já renderiza o **Passo 1 — Conectar ferramentas + ativar plugins** sempre primeiro, com destaque "Comece aqui", a partir de `conectores_requeridos` + `plugins_requeridos`. Caminhos corretos (já no template, NÃO mudar):
- **Conectores:** Customize → Conectores → "+" → Navegar por Conectores.
- **Plugins:** mesma tela — os Plugins ficam à **ESQUERDA**.

STEP 1 é o primeiro/recomendado, mas **NÃO bloqueia** os demais. Sem cadeado: todos os steps clicáveis desde o início, ordem livre.

## Checklist antes de abrir no Chrome (rode mentalmente)
- [ ] `aluno.empresa` e `aluno.ceo_ia` reais (do CLAUDE.md), zero placeholder.
- [ ] Todo step tem `tipo` correto (`PRONTO` vs `TAREFA`) coerente com o ADR-manifesto.
- [ ] `aluno.slug` casa `^[a-z0-9-]{1,64}$` (Regra 6).
- [ ] Todo `TAREFA` tem `comando` que passou na regex `^/[a-z0-9][a-z0-9-]{0,48}( .{0,150})?$` E está na fonte ADR ∪ `.claude/commands` (Regra 1) + `criterio`.
- [ ] Varredura de secrets rodada, nenhum valor casa padrão/heurística (Regra 2).
- [ ] Varredura de injeção rodada: nenhum campo contém `</`, `<script`, U+2028, U+2029 (Regra 5).
- [ ] Nenhum `comando` é texto livre da transcrição (Regra 1).
- [ ] Injeção feita como `<script type="application/json">` com JSON serializado pelos escapes da Regra 3 (NÃO `window.DASHBOARD_CONFIG = ...`). O gerador já faz isso.
- [ ] pt-BR acentuado, AM/PM em exemplos US, zero nome nosso, zero outro cliente.
- [ ] HTML gerado em `meu-negocio/dashboard/dashboard-licao.html` (+ cópia em `live-artifacts/dashboard-licao.html`); config em `meu-negocio/dashboard/dashboard-licao.config.json`.
- [ ] HTML **aberto no Chrome** (`open -a "Google Chrome" ...`), não como tela de cowork. Fallback = dois cliques no arquivo.

## Resposta ao dono (após abrir no Chrome)
Depois que o painel abriu no navegador, diga, curto:
```
Pronto. Abri o seu painel no navegador — é o seu comando central, operado por <CEO IA>.
Comece pelo Passo 1 (conectar suas ferramentas), depois siga os passos na ordem que quiser.
Cada passo concluído te deixa mais no controle, e ele lembra o que você já marcou.
Quer reabrir depois? É só me pedir "abre o meu painel" ou dar dois cliques no arquivo do painel.
```
