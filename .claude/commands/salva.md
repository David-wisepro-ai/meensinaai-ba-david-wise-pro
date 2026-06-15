# /salva — Salvar progresso da sessão atual

## QUANDO USAR
Você (CEO orquestrador da Empresa AI de [NOME_EMPRESA]) recebeu o comando `/salva` do dono. Significa que ele vai fechar esta sessão no meio do dia e quer garantir que o trabalho está seguro no GitHub antes de continuar em outras sessões.

**Diferença pro `/boa-noite`:**
- `/salva` é parcial (meio de dia): salva aprendizados + commit + push
- `/boa-noite` é fim de dia: faz tudo do `/salva` + atualiza hot.md, log.md, index.md, gera resumo

## FLUXO OBRIGATÓRIO

### Passo 1: Capturar aprendizados desta sessão
Releia a conversa atual e identifique:
- **Erros** que cometi (CEO errou) → append em `wiki/operations/lessons.md` no formato:
  ```
  ## YYYY-MM-DD — [título curto do erro]
  - **O quê:** [descricao]
  - **Por quê:** [causa raiz]
  - **Custo:** [tempo perdido, retrabalho, frustracao]
  - **Não repetir:** [regra clara]
  ```
- **Decisões** que dono aprovou que não eram óbvias → append em `wiki/operations/decisions.md` no formato:
  ```
  ## YYYY-MM-DD — [decisao]
  - **Contexto:** [situacao]
  - **Decisão:** [o que ficou definido]
  - **Por quê:** [racional]
  ```
- **Memória LLM** se aplicável → salvar no diretório de memória do projeto atual (Claude Code injeta via auto-memory). Seguir regras do CLAUDE.md sobre quando salvar.

Se NÃO houve erro nem decisão não óbvia, pula este passo (não inventa).

### Passo 2: Executar backup blindado
Rodar via Bash, com lock pra evitar conflito se outras sessões estiverem fazendo `/salva` ao mesmo tempo:

```bash
REPO_NAME=$(basename "$CLAUDE_PROJECT_DIR")
LOCKDIR="/tmp/${REPO_NAME}-backup.lock.d"
if mkdir "$LOCKDIR" 2>/dev/null; then
  trap 'rmdir "$LOCKDIR"' EXIT
  cd "$CLAUDE_PROJECT_DIR"
  git pull --rebase origin main
  git add -A
  if ! git diff --cached --quiet; then
    git commit -m "salva $(date +%F-%H%M) — sessao CEO"
    git push origin main
  else
    echo "sem mudanças pra commitar"
  fi
else
  echo "lock ocupado — outra sessão está salvando agora, esta vira noop"
fi
```

**Nota:** `mkdir` atomic substitui `flock` (que não existe no Mac). Funciona portable em Mac/Linux/Windows-WSL. `trap` garante remoção do lock mesmo se script falhar. O lock é por repo (usa nome do diretório), então múltiplos repos rodando em paralelo não se atrapalham.

### Passo 3: Reportar pro dono
Resposta curta no formato:
```
✅ Salvo.
- Aprendizados capturados: [SIM com X linhas | NÃO houve]
- Commit: [hash curto + mensagem | nenhum, outra sessão já salvou]
- GitHub: [atualizado | sem mudanças]

Pode fechar a sessão.
```

## REGRAS
- NÃO atualizar `wiki/hot.md`, `wiki/log.md`, `wiki/index.md` — esses são responsabilidade do `/boa-noite` (1x ao dia)
- NÃO gerar resumo do dia — é parcial, não fim de dia
- Se push falhar, reportar erro EXATO e parar (não inventar sucesso)
- Se outra sessão fez commit primeiro, ESTÁ TUDO BEM (lock fez seu trabalho) — só reportar
