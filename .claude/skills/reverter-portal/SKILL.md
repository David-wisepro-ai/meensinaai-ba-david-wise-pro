---
name: reverter-portal
description: "Use quando o cliente rodar /reverter-portal ou pedir pra reverter, voltar versão anterior, desfazer atualização, restaurar backup, voltar pro portal de antes, recuperar versão antiga porque update novo quebrou algo. Reverte o portal pra uma versão anterior usando backup automático criado pelo /atualizar-portal. Preserva 100% de meu-negocio/."
allowed-tools: Read, Write, Edit, Bash
---

# Reverter Portal

> Skill que volta o núcleo do portal pra um backup anterior sem nunca tocar nos dados do negócio. Lista backups disponíveis, cliente escolhe qual restaurar, faz backup da versão atual antes de reverter (segurança dupla) e executa.

## Contrato absoluto da skill

| Zona | Conteúdo | Esta skill toca? |
|---|---|---|
| `meu-negocio/` | perfil, plano, dados.js, entregas, prds | **NUNCA** |
| `meu-negocio/.backups/` | backups automáticos | LÊ pra restaurar, CRIA backup pré-revert |
| `meu-negocio/.changelog-aluno.md` | log do aluno | ANEXA |
| `.claude/`, `painel.html`, `lang/`, `lib/`, `scripts/`, `VERSION`, `CHANGELOG.md` | núcleo | **SIM** |

## Princípios de UX

- Cliente leigo. Comandos rodam internos.
- Acentuação PT-BR completa.
- Sem hífens nem travessões em copy.
- Sempre confirmar antes de mudar qualquer coisa.
- Backup duplo: a versão atual vira backup antes de reverter pra outro backup.

## Workflow

### Passo 0: ler VERSION atual

Internamente:

```bash
ATUAL=$(cat VERSION 2>/dev/null | tr -d '[:space:]')
```

Se `VERSION` não existir:

```
Não encontrei o arquivo VERSION no seu portal. Isso indica que o repositório está fora de padrão. Avise o suporte da Me Ensina AI antes de continuar.
```

E parar.

### Passo 1: listar backups disponíveis

Internamente:

```bash
BACKUPS=$(ls -dt meu-negocio/.backups/*/ 2>/dev/null | head -10)
```

Se vazio:

```
Nenhum backup encontrado.

Você ainda não rodou nenhuma atualização pelo /atualizar-portal, então não tem versão anterior pra voltar.
```

E parar.

### Passo 2: mostrar opções pro cliente

Numerar os backups do mais recente pro mais antigo. Extrair versão do nome da pasta (formato `YYYYMMDD-HHMMSS-v1.0.0` ou `YYYYMMDD-HHMMSS-pre-revert-v1.0.0`).

Mensagem:

```
Backups disponíveis pra restaurar:

1. <pasta1> (mais recente)
   Data: <DD/MM/YYYY HH:MM>
   Versão guardada: v<X.Y.Z>

2. <pasta2>
   Data: <DD/MM/YYYY HH:MM>
   Versão guardada: v<X.Y.Z>

3. <pasta3> (mais antigo)
   Data: <DD/MM/YYYY HH:MM>
   Versão guardada: v<X.Y.Z>

Versão atual do seu portal: v<ATUAL>

Qual backup você quer restaurar? Digite o número.
0. Cancelar
```

Se cliente digitar 0, parar com mensagem amigável.

Validar input: número entre 1 e quantidade de backups. Se inválido, repetir pergunta.

### Passo 3: confirmar

```
Você escolheu restaurar:
<pasta_escolhida>
Versão pra qual vai reverter: v<VERSAO_BACKUP>

Atenção:
. Seu núcleo (.claude/, painel.html, lang/, lib/, scripts/) volta pra v<VERSAO_BACKUP>
. Seu meu-negocio/ continua intocado (dados do negócio preservados)
. A versão atual v<ATUAL> vai ser salva como backup novo antes de reverter (segurança dupla)

1. Confirmar e reverter
2. Cancelar
```

Se 2, parar com mensagem amigável.

### Passo 4: backup da versão atual antes de reverter

Internamente:

```bash
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
PRE_REVERT_BACKUP="meu-negocio/.backups/$TIMESTAMP-pre-revert-v$ATUAL"
mkdir -p "$PRE_REVERT_BACKUP"
cp -r .claude "$PRE_REVERT_BACKUP/" 2>/dev/null
cp painel.html "$PRE_REVERT_BACKUP/" 2>/dev/null || true
cp -r lang "$PRE_REVERT_BACKUP/" 2>/dev/null || true
cp -r lib "$PRE_REVERT_BACKUP/" 2>/dev/null || true
cp -r scripts "$PRE_REVERT_BACKUP/" 2>/dev/null || true
cp VERSION "$PRE_REVERT_BACKUP/" 2>/dev/null
cp CHANGELOG.md "$PRE_REVERT_BACKUP/" 2>/dev/null
```

Validar que `$PRE_REVERT_BACKUP/.claude` existe. Se não:

```
Não consegui criar o backup de segurança da versão atual. Operação cancelada pra não correr risco. Verifique permissões da pasta meu-negocio/.backups/ e tente de novo.
```

E parar.

### Passo 5: restaurar do backup escolhido

Internamente, limpar e restaurar:

```bash
# remover núcleo atual de forma segura (apenas as pastas do contrato)
rm -rf .claude lang lib scripts 2>/dev/null

# restaurar do backup
cp -r "$BACKUP_ESCOLHIDO/.claude" ./ 2>/dev/null
cp "$BACKUP_ESCOLHIDO/painel.html" . 2>/dev/null || true
cp -r "$BACKUP_ESCOLHIDO/lang" ./ 2>/dev/null || true
cp -r "$BACKUP_ESCOLHIDO/lib" ./ 2>/dev/null || true
cp -r "$BACKUP_ESCOLHIDO/scripts" ./ 2>/dev/null || true
cp "$BACKUP_ESCOLHIDO/VERSION" . 2>/dev/null
cp "$BACKUP_ESCOLHIDO/CHANGELOG.md" . 2>/dev/null
```

**Atenção crítica:** o `rm -rf` acima é restrito às 4 pastas do contrato. NUNCA expandir pra outras pastas, em especial NUNCA tocar em `meu-negocio/`.

Validar que `VERSION` agora retorna `VERSAO_BACKUP`. Se não:

```
A restauração não terminou corretamente. Seu backup pré-revert está intacto em <PRE_REVERT_BACKUP>. Avise o suporte da Me Ensina AI antes de continuar usando o portal.
```

E parar.

### Passo 6: commit local

Internamente:

```bash
git add .claude/ painel.html lang/ lib/ scripts/ VERSION CHANGELOG.md 2>/dev/null
git commit -m "chore(portal): reverter de v$ATUAL para v$VERSAO_BACKUP" 2>&1
```

### Passo 7: registrar no changelog do aluno

Anexar em `meu-negocio/.changelog-aluno.md` (criar se não existir):

```markdown
## $TIMESTAMP — REVERTIDO de v$ATUAL para v$VERSAO_BACKUP
- Backup pré-revert (segurança): <PRE_REVERT_BACKUP>/
- Backup restaurado: <BACKUP_ESCOLHIDO>/
```

### Passo 8: mensagem F5

```
Portal revertido com sucesso.

Versão anterior: v<ATUAL>
Versão atual: v<VERSAO_BACKUP>

Sua versão anterior (v<ATUAL>) foi salva em:
<PRE_REVERT_BACKUP>/

Seu meu-negocio/ continua intocado.

Atualize o painel apertando F5 no navegador.

Se quiser voltar pra v<ATUAL>, rode /reverter-portal de novo e escolha o backup que começa com "<TIMESTAMP>-pre-revert".
```

## Princípios não negociáveis

| | Princípio |
|---|---|
| 1 | NUNCA tocar em `meu-negocio/` (exceto criar pre-revert backup e anexar changelog do aluno) |
| 2 | Backup duplo obrigatório: criar pre-revert ANTES de restaurar |
| 3 | `rm -rf` restrito apenas a `.claude lang lib scripts` (jamais expandir) |
| 4 | Validar `VERSION` final corresponde ao backup escolhido |
| 5 | Cliente sempre confirma antes de qualquer mudança |
| 6 | Acentuação PT-BR completa |
| 7 | Sem hífens nem travessões em copy |
| 8 | Cliente leigo. Comandos rodam internos |
| 9 | Mensagem F5 obrigatória ao final |
| 10 | Erros sempre com mensagem clara e ação sugerida |

## Quando algo dá errado

| Erro | Ação |
|---|---|
| `VERSION` ausente | Mensagem de repo fora de padrão, parar |
| Nenhum backup | Mensagem amigável, parar |
| Backup pré-revert falha | Abortar antes de qualquer mudança |
| Cliente digita opção inválida | Repetir pergunta |
| `VERSION` final não bate com backup | Avisar, sugerir suporte. Pre-revert intacto |
| Pasta de backup corrompida (sem `.claude` dentro) | Abortar com aviso, não tentar restaurar de backup quebrado |

## Detecção de backup corrompido

Antes de restaurar, validar:

```bash
if [ ! -d "$BACKUP_ESCOLHIDO/.claude" ]; then
  echo "BACKUP_CORROMPIDO"
fi
```

Se corrompido:

```
O backup escolhido parece estar incompleto (não tem .claude/). Não vou usar pra evitar quebrar seu portal. Escolha outro backup ou avise o suporte da Me Ensina AI.
```

E voltar pro passo 2 (listar opções).
