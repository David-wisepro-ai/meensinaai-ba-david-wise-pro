---
paths:
  - "**/*.js"
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.py"
  - "**/*.sh"
  - "**/*.json"
  - "**/*.sql"
  - "**/*.html"
  - "**/*.yml"
  - "**/*.yaml"
  - "scripts/**"
---

# Regras — Seguranca de segredos (codigo, script e config)

Valem sempre que se escreve codigo, script, comando ou configuracao.

## Nao-negociaveis

- **NUNCA segredo em texto plano** (senha, API key, token, connection string) em arquivo
  versionado. Nem "so pra testar". O valor mora no `.env`; no codigo vai a VARIAVEL
  (`process.env.X`, `$X`).
- **`.env`, `.env.*` e `raw/` sempre no `.gitignore`** — conferir antes do primeiro commit.
- **Chave de servidor nunca no cliente** — so chave publica/anon, restrita por RLS.
- **Dado pessoal sensivel** (documento, dado bancario) nunca em arquivo versionado — storage
  controlado.
- **Achou segredo hardcoded?** PARE: (a) rotacionar a credencial; (b) guardar a nova no cofre;
  (c) corrigir pra variavel; (d) avisar o dono ANTES de commitar.

## Rede mecanica

O hook `preflight-guard` aborta commit/push com segredo automaticamente — mas a regra e NAO
deixar o segredo entrar. O hook e o cinto de seguranca, nao a permissao pra dirigir mal.
