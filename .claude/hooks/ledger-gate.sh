#!/bin/bash
# ledger-gate.sh — portao de nao-regressao antes de subir pro mundo.
# Silencioso no trabalho normal. So age no `git push`: se o guardiao (auditor de
# decisoes travadas) ainda nao conferiu nesta sessao, segura o push e explica 1 vez,
# em linguagem simples. Exit 0 = passa. Exit 2 = aborta (o runtime bloqueia).

CMD=$(python3 -c 'import json,sys; print(json.load(sys.stdin).get("tool_input",{}).get("command",""))' 2>/dev/null)

# So age em git push. Todo o resto passa sem ruido.
case "$CMD" in
  *"git push"*) ;;
  *) exit 0 ;;
esac

git rev-parse --git-dir >/dev/null 2>&1 || exit 0

# So exige auditoria se o projeto tem ledger de decisoes (DECISOES.md na raiz)
[ -f "DECISOES.md" ] || exit 0

MARK=".claude/.session-ledger-read"

# Marcador existe e e recente (ultimas 4 horas)? passa em silencio.
if [ -f "$MARK" ] && [ -z "$(find "$MARK" -mmin +240 2>/dev/null)" ]; then
  exit 0
fi

echo "Antes de subir, falta uma conferencia rapida: o guardiao checa se nada nesta entrega contraria uma decisao que voce ja tinha travado (pra regra resolvida nao voltar a quebrar). Peca 'roda o guardiao' ou use /audita — leva um minuto e o push passa." >&2
exit 2
