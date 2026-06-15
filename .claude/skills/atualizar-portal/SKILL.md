---
name: atualizar-portal
description: "Use quando o cliente rodar /atualizar-portal ou pedir pra atualizar, puxar nova versão, instalar update, baixar atualização do portal, ver o que mudou no sistema, conferir se tem versão nova. Atualiza o portal puxando versão nova do template Me Ensina AI. Faz backup automático, mostra changelog em linguagem leiga, pede confirmação. Preserva 100% de meu-negocio/ (dados do cliente). Atualiza apenas .claude/, painel.html, lang/, lib/, scripts/, VERSION, CHANGELOG.md."
allowed-tools: Read, Write, Edit, Bash
---

# Atualizar Portal

> Skill que atualiza o núcleo do portal do cliente sem nunca tocar nos dados do negócio. Faz backup antes, mostra mudanças em linguagem leiga, pede OK e executa de forma cirúrgica.

## Contrato absoluto da skill

| Zona | Conteúdo | Esta skill toca? |
|---|---|---|
| `meu-negocio/` | perfil, plano, dados.js, entregas, prds, backups | **NUNCA** |
| `.claude/`, `painel.html`, `lang/`, `lib/`, `scripts/`, `VERSION`, `CHANGELOG.md` | núcleo do sistema | **SIM** |

Se a skill encostar em qualquer arquivo dentro de `meu-negocio/` (exceto criar backup em `meu-negocio/.backups/` e anexar log em `meu-negocio/.changelog-aluno.md`), é falha grave. Abortar.

## Princípios de UX

- Cliente é leigo. Nunca mostrar comando bash na conversa. Comandos rodam internos.
- Acentuação PT-BR completa.
- Sem hífens nem travessões em copy.
- Mensagens curtas e diretas.
- Erro claro e amigável quando algo falhar.

## Workflow

### Passo 0: contexto

Ler internamente:

1. `VERSION` (versão atual do cliente, ex: `1.0.0`)
2. `CHANGELOG.md` (histórico atual)
3. Confirmar que estamos dentro de um repo git válido

Se `VERSION` não existir, mensagem amigável:

```
Não encontrei o arquivo VERSION no seu portal. Isso indica que seu repositório está fora de padrão. Avise o suporte da Me Ensina AI antes de continuar.
```

E parar.

### Passo 1: checar versão nova no remote

Internamente:

```bash
git fetch --tags origin 2>&1
ULTIMA_TAG=$(git ls-remote --tags origin | grep -v '\^' | awk -F'/' '{print $NF}' | sed 's/^v//' | sort -V | tail -1)
ATUAL=$(cat VERSION | tr -d '[:space:]')
```

Se `git fetch` falhar:

```
Não consegui conectar com o repositório oficial pra verificar atualizações. Verifique sua conexão com a internet e tente de novo.
```

E parar.

Se `ULTIMA_TAG` vazia:

```
O repositório oficial ainda não tem versões marcadas. Nada pra atualizar agora.
```

E parar.

Se `ULTIMA_TAG == ATUAL`:

```
Você já está na versão mais recente do portal: v$ATUAL.
Nada pra atualizar.
```

E parar.

Se diferente, prosseguir.

### Passo 2: classificar tipo de update

Comparar `ATUAL` e `ULTIMA_TAG` no formato `MAJOR.MINOR.PATCH`:

```bash
ATUAL_MAJOR=$(echo $ATUAL | cut -d. -f1)
ATUAL_MINOR=$(echo $ATUAL | cut -d. -f2)
ATUAL_PATCH=$(echo $ATUAL | cut -d. -f3)
NOVA_MAJOR=$(echo $ULTIMA_TAG | cut -d. -f1)
NOVA_MINOR=$(echo $ULTIMA_TAG | cut -d. -f2)
NOVA_PATCH=$(echo $ULTIMA_TAG | cut -d. -f3)
```

- Se `NOVA_MAJOR > ATUAL_MAJOR` → tipo = **MAJOR** (mudança grande, pode exigir migração)
- Senão se `NOVA_MINOR > ATUAL_MINOR` → tipo = **MINOR** (recurso novo)
- Senão → tipo = **PATCH** (correção)

### Passo 3: pegar changelog da versão nova

Internamente:

```bash
git fetch origin main 2>&1
CHANGELOG_NOVO=$(git show origin/main:CHANGELOG.md 2>/dev/null | sed -n "/^## v$ULTIMA_TAG/,/^## v/p" | head -40)
```

Se vazio, usar fallback:

```
(Changelog detalhado não disponível. Veja CHANGELOG.md depois da atualização pra detalhes técnicos.)
```

### Passo 4: mostrar pro cliente em linguagem leiga

Tipo em PT-BR:

- MAJOR → "atualização grande"
- MINOR → "recurso novo"
- PATCH → "correção"

Mensagem:

```
Atualização disponível pro Portal Empresa AI.

Versão atual: v<ATUAL>
Versão nova: v<ULTIMA_TAG> (<tipo em PT>)

O que muda:
<CHANGELOG_NOVO em linguagem amigável>

O que NÃO muda:
. Seu perfil do negócio (meu-negocio/perfil.md)
. Seu plano de ação (meu-negocio/plano-de-acao.md)
. Tudo que está em meu-negocio/ continua intocado

Antes de atualizar vou guardar uma cópia de segurança do sistema atual. Se algo ficar ruim, você pode reverter rodando /reverter-portal.

1. Atualizar agora
2. Esperar (sair sem mudar nada)
```

Se cliente escolher 2, parar com mensagem:

```
Sem problema. Quando quiser, é só rodar /atualizar-portal de novo.
```

### Passo 4.5: confirmação extra para MAJOR (proteção contra supply-chain)

Se `TIPO == MAJOR`, ANTES de prosseguir pro backup, exigir 2ª confirmação literal:

```
⚠️ ATUALIZAÇÃO GRANDE DETECTADA

Esta é uma mudança MAJOR (v<ATUAL> → v<ULTIMA_TAG>).
Atualizações MAJOR podem alterar a estrutura dos seus dados e exigem migração.

Por segurança, pra continuar, digite EXATAMENTE o seguinte texto:

CONFIRMO ATUALIZACAO MAJOR

Se não digitar exatamente assim (em maiúsculas, sem acentos, sem aspas), a atualização será cancelada.
```

Validar input do cliente:
- Comparar com a string literal `CONFIRMO ATUALIZACAO MAJOR`
- Trim espaços nas pontas
- Case-sensitive: tem que ser maiúsculas

Se input bater exatamente: prosseguir pro Passo 5.

Se input NÃO bater: abortar sem tocar em nada e mostrar:

```
Atualização cancelada por segurança. Não digitei exatamente o texto pedido.

Se você realmente quer atualizar, rode /atualizar-portal de novo e digite a frase exata quando pedido.
```

**Por que essa proteção existe:** atualizações MAJOR rodam migration scripts (`scripts/migrations/v$X-to-v$Y.py`) com permissões totais do shell. Se atacante criar tag `v999.0.0` no repositório oficial com migration maliciosa, cliente leigo no piloto-automático ("Atualizar agora") executa código sem perceber. A confirmação literal quebra esse reflex e força o cliente a parar e pensar.

### Passo 5: backup do núcleo

Internamente:

```bash
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_DIR="meu-negocio/.backups/$TIMESTAMP-v$ATUAL"
mkdir -p "$BACKUP_DIR"
cp -r .claude "$BACKUP_DIR/" 2>/dev/null
cp painel.html "$BACKUP_DIR/" 2>/dev/null || true
cp -r lang "$BACKUP_DIR/" 2>/dev/null || true
cp -r lib "$BACKUP_DIR/" 2>/dev/null || true
cp -r scripts "$BACKUP_DIR/" 2>/dev/null || true
cp VERSION "$BACKUP_DIR/" 2>/dev/null
cp CHANGELOG.md "$BACKUP_DIR/" 2>/dev/null
```

Validar que `BACKUP_DIR/.claude` existe. Se não existir, abortar:

```
Não consegui criar o backup de segurança. Atualização cancelada pra não correr risco. Verifique permissões da pasta meu-negocio/.backups/ e tente de novo.
```

### Passo 6: pull cirúrgico (apenas paths permitidos)

Internamente:

```bash
git fetch origin main 2>&1
git checkout origin/main -- \
  .claude/agents/ \
  .claude/skills/ \
  .claude/commands/ \
  .claude/CONVENCAO-AGENTES.md \
  .claude/settings.json \
  painel.html \
  lang/ \
  lib/ \
  scripts/ \
  VERSION \
  CHANGELOG.md
```

**NUNCA usar:**

- `git pull` puro
- `git checkout origin/main -- .`
- `git reset --hard`

Esses comandos tocariam em `meu-negocio/` e quebrariam o contrato.

Se algum dos paths não existir no origin (ex: cliente está em versão muito antiga sem `.claude/CONVENCAO-AGENTES.md`), ignorar erro do path específico e seguir. Validar no fim que `VERSION` foi atualizada (`cat VERSION` deve retornar `ULTIMA_TAG`).

Se `VERSION` final continuar igual ao `ATUAL`:

```
Algo deu errado no download da versão nova. O backup está intacto em meu-negocio/.backups/<TIMESTAMP>-v<ATUAL>/. Rode /reverter-portal se notar qualquer problema. Avise o suporte da Me Ensina AI.
```

E parar.

### Passo 7: rodar migration se MAJOR

Se tipo == MAJOR:

```bash
MIGRATION_SCRIPT="scripts/migrations/v${ATUAL_MAJOR}-to-v${NOVA_MAJOR}.py"
if [ -f "$MIGRATION_SCRIPT" ]; then
  python3 "$MIGRATION_SCRIPT"
else
  echo "MIGRATION_AUSENTE"
fi
```

Se `MIGRATION_AUSENTE`, mostrar:

```
Esta atualização é grande (mudou a versão principal) e o script de migração esperado não foi encontrado: scripts/migrations/v<ATUAL_MAJOR>-to-v<NOVA_MAJOR>.py

Pra evitar dados em estado inconsistente, vou reverter pra versão anterior agora.
```

Restaurar do backup que acabou de criar (mesma lógica da skill `reverter-portal`, passo 5) e parar.

Se script rodou com sucesso, prosseguir.

### Passo 8: commit local

Internamente:

```bash
git add .claude/ painel.html lang/ lib/ scripts/ VERSION CHANGELOG.md 2>/dev/null
git commit -m "chore(portal): atualizar de v$ATUAL para v$ULTIMA_TAG" 2>&1
```

Se nada mudou (cliente já estava nesse estado por algum motivo), seguir sem erro.

### Passo 9: registrar update no log do cliente

Anexar em `meu-negocio/.changelog-aluno.md` (criar se não existir, sem `_` no início porque arquivo de log do aluno é visível):

```markdown
## $TIMESTAMP — atualizado de v$ATUAL para v$ULTIMA_TAG
- Tipo: <tipo em PT>
- Backup: meu-negocio/.backups/$TIMESTAMP-v$ATUAL/
- Resumo das mudanças:
<CHANGELOG_NOVO>
```

### Passo 10: mensagem final F5

```
Portal atualizado com sucesso.

Versão anterior: v<ATUAL>
Versão atual: v<ULTIMA_TAG>

Backup salvo em: meu-negocio/.backups/<TIMESTAMP>-v<ATUAL>/
Seu meu-negocio/ continua intocado.

Atualize o painel apertando F5 no navegador pra ver o que mudou.

Se algo não estiver bom, rode /reverter-portal pra voltar à versão anterior.
```

## Princípios não negociáveis

| | Princípio |
|---|---|
| 1 | NUNCA tocar em `meu-negocio/` (exceto criar `.backups/` e anexar `.changelog-aluno.md`) |
| 2 | Backup SEMPRE antes de qualquer mudança no núcleo |
| 3 | Pull cirúrgico em paths explícitos. Nunca `git pull` puro nem `checkout -- .` |
| 4 | MAJOR sem migration script = abortar e reverter automático |
| 5 | Acentuação PT-BR obrigatória |
| 6 | Sem hífens nem travessões em copy |
| 7 | Cliente leigo. Comandos rodam internamente, não na conversa |
| 8 | Erros sempre com mensagem clara e ação sugerida |
| 9 | Mensagem F5 obrigatória ao final |
| 10 | Validar `VERSION` final mudou. Se não mudou, abortar com aviso |

## Quando algo dá errado

Resumo de cada cenário:

| Erro | Ação |
|---|---|
| `git fetch` falha | Mensagem de conexão, parar sem tocar em nada |
| `VERSION` ausente | Mensagem de repo fora de padrão, parar |
| Backup falha | Abortar antes de qualquer mudança |
| `VERSION` final não mudou | Avisar, sugerir suporte. Backup intacto |
| MAJOR sem migration | Restaurar do backup automaticamente, avisar |
| Conflito de merge | Não deveria acontecer com `git checkout origin/main -- <paths>` (sobrescreve). Se acontecer, abortar e restaurar do backup |
