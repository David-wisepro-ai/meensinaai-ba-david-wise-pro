# /boa-noite — Fechamento do dia

## QUANDO USAR
Você (CEO orquestrador da Empresa AI de [NOME_EMPRESA]) recebeu o comando `/boa-noite` do dono. É a ÚLTIMA sessão do dia. Significa fechamento completo: aprendizados + atualização do wiki estratégico (hot.md, log.md, index.md) + commit consolidado + resumo final.

**Diferença pro `/salva`:**
- `/salva` é parcial (meio de dia): só aprendizados + commit + push
- `/boa-noite` é fim de dia: faz tudo do `/salva` + hot.md + log.md + index.md + resumo

## FLUXO OBRIGATÓRIO

### Passo 0: Capturar dados estáveis no CLAUDE.md (ANTES de qualquer outra coisa)

Antes de gerar relatório de sessão, escanear a conversa de hoje atrás de **dados estáveis** que o dono informou. Dado estável é qualquer informação que NÃO muda toda semana — ela vale pra sempre (ou pelo menos meses):

- Renomeação ou criação de agente → atualizar `## AGENTES DA EMPRESA AI` no CLAUDE.md
- Mudança no negócio (produto, preço, nicho, localização) → atualizar `## CONTEXTO DO NEGÓCIO`
- Regra/restrição nova → atualizar `## REGRAS INEGOCIÁVEIS DO NEGÓCIO`
- Conta/credencial/canal novo → atualizar `## CONTAS E FERRAMENTAS`
- Cliente/campanha do dono com regras próprias → atualizar `## CLIENTES E CAMPANHAS DO DONO`

### Passo 1: Capturar aprendizados (igual `/salva`)
Releia a conversa atual e identifique:
- Erros que cometi → `wiki/operations/lessons.md`
- Decisões aprovadas não óbvias → `wiki/operations/decisions.md`
- Memória LLM aplicável → diretório de memória do projeto atual (Claude Code injeta via auto-memory)

### Passo 2: Atualizar `wiki/hot.md`
Reescrever a seção de prioridades pra refletir:
- O que ficou pendente do dia que vira prioridade amanhã
- Números-chave atualizados (vendas, leads, posts, pendências)
- Alertas vermelhos novos
- Remover prioridades resolvidas hoje

Manter formato curto (~500 palavras max).

### Passo 3: Atualizar `wiki/log.md`
Append no log do dia (formato existente):
```
## YYYY-MM-DD ([dia da semana])

### Operações principais
- [resumo curto de cada bloco de trabalho]

### Decisões tomadas
- [decisões aprovadas pelo dono]

### Pendências geradas
- [tarefas que não terminaram, dono, prazo]
```

### Passo 4: Atualizar `wiki/index.md` (apenas se criou páginas novas hoje)
Adicionar entradas das páginas novas no catálogo. Se não criou nada novo, pula.

### Passo 5: Gerar relatório completo da sessão
- Criar `wiki/sessoes/sessao-YYYY-MM-DD.md` (template do CLAUDE.md, Etapa 1 do PROTOCOLO DE FECHAMENTO)
- Sobrescrever `wiki/sessoes/ultima.md` com o mesmo conteúdo
- Atualizar `wiki/operations/pendencias.md` (resolvidas movem pro fim, novas no topo)

### Passo 6: Backup blindado consolidado
Rodar via Bash, com lock:

```bash
REPO_NAME=$(basename "$CLAUDE_PROJECT_DIR")
LOCKDIR="/tmp/${REPO_NAME}-backup.lock.d"
if mkdir "$LOCKDIR" 2>/dev/null; then
  trap 'rmdir "$LOCKDIR"' EXIT
  cd "${CLAUDE_PROJECT_DIR:?ERRO: variavel vazia — abra o Claude Code na pasta do SEU repositorio e rode de novo (nunca rode o backup fora do repo)}"
  git pull --rebase origin main
  git add -A
  if ! git diff --cached --quiet; then
    git commit -m "boa-noite $(date +%F) — fechamento do dia"
    git push origin main
  else
    echo "sem mudanças (outra sessão já fechou o dia)"
  fi
else
  echo "lock ocupado — outra sessão está fechando o dia, esta vira noop"
fi
```

**Nota:** `mkdir` atomic substitui `flock` (que não existe no Mac). Funciona portable em Mac/Linux/Windows-WSL. `trap` garante remoção do lock mesmo se script falhar. Lock por repo (nome do diretório).

### Passo 7: Resumo final pro dono
Resposta no formato:

```
🌙 Boa noite, dono.

**Operações de hoje:**
- [3 a 5 bullets curtos do que rolou]

**Números-chave:**
- [vendas, leads, posts, etc]

**Pendências pra amanhã:**
- 🔴 [crítica] — [quem] — [prazo]
- 🟡 [média] — [quem] — [prazo]

**Aprendizados salvos:** [X erros + Y decisões]

**Backup:** ✅ commit [hash] no GitHub

Bom descanso.
```

## REGRAS
- Este comando substitui o protocolo de fechamento manual antigo do CLAUDE.md
- Se dono rodou `/salva` mais cedo na mesma sessão, NÃO repete os aprendizados (já estão lá) — pula direto pro Passo 2
- Se push falhar, reportar erro EXATO e parar
- Múltiplas sessões dando `/boa-noite` ao mesmo tempo: lock garante que só 1 atualiza hot.md/log.md, outras viram noop com mensagem "outra sessão já fechou"
- Se for domingo, NÃO esquecer auditoria do wiki (linting completo conforme `wiki/operations/`)
