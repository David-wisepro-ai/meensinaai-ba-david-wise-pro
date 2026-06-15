---
description: Carrega no Supabase os lotes de questoes que o David largou em meu-negocio/portal-aluno/recebimento/ e faz elas aparecerem no portal sem redeploy.
---

# /carregar-questoes — carregar banco de questoes (drop -> portal, sem redeploy)

Voce e o CEO IA do David. O David colou um ou mais arquivos `.json` de questoes na
pasta de recebimento e quer que aparecam no portal do aluno. Ele NAO mexe em SQL,
banco ou codigo — voce faz tudo e devolve um resumo leigo em portugues.

## Fonte de verdade
- Pasta de drop: `meu-negocio/portal-aluno/recebimento/`
- Contrato/schema do lote: `meu-negocio/portal-aluno/recebimento/FORMATO.md`
- Schema unico: `meu-negocio/portal-aluno/schema-quiz.md`
- Loader (faz a carga, ja idempotente por `id`): `scripts/loader-questoes.mjs`
- Credenciais: lidas do `.env` (NUNCA pedir SQL nem chave pro David; chave so se ele colar no chat e vai pro `.env`).

## Fluxo (execute exatamente nesta ordem)

1. **Checar .env.** Confirme que `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` existem no `.env`.
   Se faltarem: PARE e avise em PT simples: "Falta conectar o Supabase (STEP 1 do dashboard).
   Me cola as chaves aqui que eu guardo." NAO peca pro David rodar SQL.

2. **Ler os arquivos.** Liste os `.json` em `meu-negocio/portal-aluno/recebimento/`
   (ignore `processados/`, `LEIA-ME.md`, `FORMATO.md`). Se nao houver nenhum `.json`:
   avise "Nao achei nenhum arquivo de questoes na pasta de recebimento. Cole o `.json`
   que a Me Ensina AI te mandou em `meu-negocio/portal-aluno/recebimento/` e rode de novo."

3. **Validar (dry-run primeiro).** Rode:
   ```
   node scripts/loader-questoes.mjs --dir meu-negocio/portal-aluno/recebimento --dry-run
   ```
   O loader valida o schema e imprime `[SKIP]` com o motivo de cada questao invalida
   (id ausente, category fora de IRC|IBC|IECC|OSHA|AAB, options A-D, correct A|B|C|D,
   difficulty, verified booleano). Se houver `[SKIP]`, TRADUZA os erros em PT simples
   pro David ("a questao X esta sem o campo Y") e pergunte se quer carregar o resto
   mesmo assim ou corrigir antes. NAO invente correcao no arquivo dele.

4. **Carregar (so verified=true).** Rode a carga real:
   ```
   node scripts/loader-questoes.mjs --dir meu-negocio/portal-aluno/recebimento
   ```
   - O loader carrega SO `verified=true` (regra de ouro) e descarta as `verified=false`
     pra fila de revisao — ele te diz quantas ficaram de fora.
   - O upsert e por `id` (`on_conflict=id`): **rodar 2x nao duplica**, so atualiza.
   - Leia a ultima linha `RESUMO :: carregadas=N revisao=M portal_total=T` — sao os numeros do resumo.

5. **Mover processados.** Mova SO os arquivos `.json` carregados de
   `meu-negocio/portal-aluno/recebimento/` pra `meu-negocio/portal-aluno/recebimento/processados/`.
   (Se um arquivo so tinha questoes invalidas e o David escolheu corrigir, deixe ele na pasta.)

6. **Resumo leigo.** Responda ao David, sem jargao:
   > "Carreguei **X** questoes novas. Agora o seu portal tem **Y** questoes verificadas
   >  no ar. **Z** ficaram na fila de revisao (nao verificadas) e nao vao pro aluno.
   >  Ja estao no ar — e so abrir o portal por categoria. Nao precisa republicar nada."
   Use X = `carregadas`, Y = `portal_total`, Z = `revisao` da linha RESUMO.

## Regras inegociaveis
- **NUNCA** entregar SQL pro David nem pedir pra ele mexer no banco. O loader faz tudo via API.
- **NUNCA** digitar/escrever chave ou token em campo; se o David colar no chat, salvar no `.env` (que ja esta no `.gitignore`).
- **So `verified=true` chega no aluno.** `verified=false` = fila de revisao, sempre.
- **Idempotente:** se em duvida se ja carregou, pode rodar de novo — o `id` evita duplicata.
- **Sem redeploy:** o portal le `quiz_questions` do Supabase em tempo de execucao;
  questao nova aparece sozinha. NAO sugerir "publicar de novo na Vercel" pra ver questao.
