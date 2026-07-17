#!/bin/bash
# preflight-guard.sh — cinto de seguranca do commit/push.
# Silencioso no trabalho normal. So fala (1 vez, linguagem simples) pra impedir
# um desastre real: senha/chave/dado sensivel prestes a entrar no historico do git.
# Exit 0 = deixa passar. Exit 2 = aborta a acao (o runtime bloqueia, nao e opcional).

# Le o comando que o agente quer rodar (JSON do hook no stdin)
CMD=$(python3 -c 'import json,sys; print(json.load(sys.stdin).get("tool_input",{}).get("command",""))' 2>/dev/null)

# So age em commit/push. Todo o resto passa sem ruido.
case "$CMD" in
  *"git commit"*|*"git push"*) ;;
  *) exit 0 ;;
esac

# Fora de repo git? passa.
git rev-parse --git-dir >/dev/null 2>&1 || exit 0

STAGED=$(git diff --cached --name-only 2>/dev/null)

# 1) Arquivo de segredo (.env) ou dado bruto (raw/) indo pro historico
if [ -n "$STAGED" ] && echo "$STAGED" | grep -E '(^|/)\.env(\.|$)|(^|/)raw/' >/dev/null 2>&1; then
  echo "Segurei esse commit: tem arquivo de senhas (.env) ou de dados brutos (raw/) indo pro historico do git. Isso vazaria informacao sensivel e nao tem volta. Tire do commit (git restore --staged <arquivo>) e confirme que .env e raw/ estao no .gitignore." >&2
  exit 2
fi

# 2) .gitignore precisa proteger .env e raw/ antes de qualquer commit
if [ -n "$STAGED" ]; then
  if ! grep -qE '(^|/)\.env' .gitignore 2>/dev/null || ! grep -qE '(^|/)raw' .gitignore 2>/dev/null; then
    echo "Segurei: o .gitignore deste projeto ainda nao protege .env e raw/. Adicione essas duas linhas no .gitignore antes de commitar — sem isso, senha e dado sensivel podem subir sem ninguem perceber." >&2
    exit 2
  fi
fi

# 3) Segredo/PII dentro do conteudo que vai subir (linhas adicionadas)
if [ -n "$STAGED" ] && git diff --cached 2>/dev/null | grep -E '^\+' | grep -E \
  'sk-[A-Za-z0-9_-]{16,}|ghp_[A-Za-z0-9]{20,}|AIza[A-Za-z0-9_-]{20,}|-----BEGIN( RSA| EC)? PRIVATE KEY|Bearer [A-Za-z0-9._-]{20,}|eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}|postgres(ql)?://[^[:space:]]+:[^[:space:]]+@|(password|senha|api[_-]?key|secret|token)["'"'"']?[[:space:]]*[:=][[:space:]]*["'"'"'][^"'"'"'[:space:]]{8,}' \
  >/dev/null 2>&1; then
  echo "Segurei esse commit: encontrei o que parece ser uma senha, chave ou credencial escrita dentro dos arquivos. Isso ia vazar. Mova o valor pro arquivo .env (que nao sobe) e use a variavel no lugar do valor real. Depois commite de novo." >&2
  exit 2
fi

exit 0
