---
name: conectar-google-calendar
description: "Use quando o cliente rodar /conectar-google-calendar ou pedir pra conectar Google Calendar, agenda Google, ligar o CRM com a agenda, integrar calendário, sincronizar compromissos, ativar OAuth Google, ou ver eventos no dashboard. Configura OAuth Google Calendar pro Pedro CRM do aluno passo a passo. Cria projeto Google Cloud + ativa Calendar API + abre UI pra OAuth consent screen + cria Client ID + seta env vars Vercel + dispara redeploy. Segurança: nunca loga Client Secret, limpa history no final."
allowed-tools: Read, Write, Edit, Bash
---

# Conectar Google Calendar

> Skill guiada que conecta o Google Calendar do cliente ao Pedro CRM dele. Cliente é leigo. A skill conduz cada clique no browser e roda os comandos sensíveis no terminal sem expor segredos.

## Contrato absoluto

| Zona | Esta skill toca? |
|---|---|
| Google Cloud Console do cliente | SIM (cria projeto, ativa API, cria credentials via browser guiado) |
| Conta Vercel do cliente | SIM (lê projeto vinculado + adiciona env vars production) |
| `meu-negocio/` | NUNCA |
| Código do Pedro CRM | NUNCA (a skill só configura infra externa) |

## Princípios de UX

- Cliente é leigo. Não expor comandos crus na conversa, só dizer o que vai acontecer.
- Acentuação PT-BR completa.
- Sem hífens nem travessões em copy.
- NUNCA logar GOOGLE_CLIENT_SECRET nem GOOGLE_CLIENT_ID em texto da conversa.
- NUNCA salvar credenciais em arquivo local. Só em env vars Vercel.
- Tempo estimado total: 20 a 25 minutos.

## Pré requisitos

A skill verifica antes de começar:

1. `gcloud` instalado
2. `vercel` CLI instalado
3. Autenticado no `gcloud` com a conta Google que vai virar dona do projeto Cloud
4. Autenticado no `vercel` com a conta que tem o Pedro CRM

## Workflow

### Passo 0: confirmar contexto

Antes de qualquer comando, perguntar e confirmar:

- "Qual conta Google você quer usar pro Pedro CRM ler os eventos? Pode ser a sua principal."
- "A URL do seu Pedro CRM já está no ar? Cola aqui (ex: https://crm-XYZ.vercel.app)"
- "O Pedro CRM está deployado no Vercel? Sim ou não."

Se faltar algum desses três, parar e pedir.

Salvar em memória da skill (não em arquivo):
- `EMAIL_CLIENTE`
- `PEDRO_CRM_URL`
- `VERCEL_PROJECT_PATH` (caminho local do repo do Pedro CRM ou nome do projeto Vercel)

### Passo 1: checar ferramentas locais

Rodar silencioso:

```bash
which gcloud
which vercel
```

Se `gcloud` não existir:
> "Você precisa instalar o Google Cloud CLI antes. No Mac é `brew install --cask google-cloud-sdk`. No Linux/Windows, segue o passo a passo em https://cloud.google.com/sdk/docs/install. Avisa quando estiver pronto."

Se `vercel` não existir:
> "Vou instalar o Vercel CLI rapidinho."
Rodar `npm i -g vercel`.

### Passo 2: autenticar

```bash
gcloud auth list --filter=status:ACTIVE --format="value(account)"
```

Se vazio ou não bate com EMAIL_CLIENTE:
> "Vou abrir o navegador pra você logar no Google Cloud com a conta que escolheu."
Rodar `gcloud auth login`.

```bash
vercel whoami
```

Se erro:
> "Agora preciso que você logue no Vercel."
Rodar `vercel login`.

### Passo 3: criar projeto Google Cloud

Gerar ID único:

```bash
PROJECT_ID="pedro-crm-$(date +%s | tail -c 7)"
gcloud projects create "$PROJECT_ID" --name="Pedro CRM"
gcloud config set project "$PROJECT_ID"
```

Mostrar pro cliente:
> "Projeto Google Cloud criado. Nome interno: PEDRO_CRM (id privado). Próximo passo é ativar a API do Calendar."

### Passo 4: ativar Google Calendar API

```bash
gcloud services enable calendar-json.googleapis.com
```

> "API do Google Calendar ativada nesse projeto. Demora uns 30 segundos pra propagar."

Aguardar 30 segundos antes do próximo passo.

### Passo 5: configurar OAuth consent screen

Abrir browser:

```bash
open "https://console.cloud.google.com/apis/credentials/consent?project=$PROJECT_ID"
```

Mostrar checklist exato pro cliente seguir na tela:

> "Abri o navegador no Google Cloud. Segue o checklist abaixo, item por item. Quando terminar tudo, digita ok aqui."
>
> 1. **User Type:** marca External e clica Create
> 2. **App information:**
>    - App name: `Pedro CRM`
>    - User support email: o seu email (EMAIL_CLIENTE)
>    - Developer contact email: o seu email (EMAIL_CLIENTE)
>    - Clica Save and Continue
> 3. **Scopes:** clica Add or Remove Scopes e seleciona estes quatro:
>    - `.../auth/calendar.readonly`
>    - `.../auth/calendar.events`
>    - `.../auth/userinfo.email`
>    - `.../auth/userinfo.profile`
>    - Clica Update, depois Save and Continue
> 4. **Test users:** clica Add Users, cola o seu email, Add, Save and Continue
> 5. **Summary:** clica Back to Dashboard
>
> Quando estiver de volta no Dashboard, digita ok aqui.

Esperar resposta `ok` do cliente.

### Passo 6: criar OAuth Client ID

Abrir browser:

```bash
open "https://console.cloud.google.com/apis/credentials/oauthclient?project=$PROJECT_ID"
```

Calcular redirect URI:
- `REDIRECT_URI="${PEDRO_CRM_URL}/api/auth/google/callback"`

Mostrar checklist:

> "Abri a tela de criar credenciais. Preenche assim:"
>
> 1. **Application type:** Web application
> 2. **Name:** `Pedro CRM Web`
> 3. **Authorized redirect URIs:** clica Add URI e cola exatamente:
>    `${PEDRO_CRM_URL}/api/auth/google/callback`
> 4. Clica Create
>
> Vai aparecer um modal com Client ID e Client Secret. NÃO fecha esse modal ainda. Volta aqui e digita ok.

Esperar `ok`.

### Passo 7: receber Client ID e Secret

> "Agora cola o Client ID. Aparece tipo `123456789-xxxxxx.apps.googleusercontent.com`."

Receber input. Salvar em variável de processo `CLIENT_ID` (NÃO ecoar de volta na conversa).

> "Agora cola o Client Secret. Aparece tipo `GOCSPX-xxxxxxxxxxxxx`. Ele é sensível, eu não vou mostrar de volta."

Receber input. Salvar em variável `CLIENT_SECRET`. NÃO ecoar.

> "Recebido. Pode fechar o modal do Google agora."

### Passo 8: setar env vars no Vercel

Detectar projeto Vercel. Se cliente tem o repo local:

```bash
cd "$VERCEL_PROJECT_PATH"
vercel link --yes >/dev/null 2>&1 || true
```

Adicionar env vars (production):

```bash
printf '%s' "$CLIENT_ID" | vercel env add GOOGLE_CLIENT_ID production
printf '%s' "$CLIENT_SECRET" | vercel env add GOOGLE_CLIENT_SECRET production
printf '%s' "$REDIRECT_URI" | vercel env add GOOGLE_REDIRECT_URI production
```

Se cliente NÃO tem o repo local, pedir nome do projeto:

> "Qual o nome do projeto Pedro CRM no painel da Vercel? Tipo `crm-meunome`."

Receber `VERCEL_PROJECT_NAME` e usar:

```bash
vercel env add GOOGLE_CLIENT_ID production --token=$VERCEL_TOKEN --scope=$VERCEL_SCOPE
```

(adaptar conforme contexto).

> "Variáveis de ambiente gravadas no Vercel em production. Agora vou disparar um redeploy pra elas entrarem em uso."

### Passo 9: redeploy production

```bash
vercel --prod --force
```

Esperar status READY. Pode levar 1 a 3 minutos.

> "Build em andamento. Quando ficar verde aqui, o CRM já vai aceitar a conexão com o Google Calendar."

### Passo 10: instrução final pro cliente

> "Pronto. Agora você abre o CRM em três passos:
>
> 1. Vai em **${PEDRO_CRM_URL}/settings/integrations**
> 2. No card **Google Calendar**, clica **Conectar com Google**
> 3. Faz login com a conta Google que você escolheu lá no início
>
> Depois confere em **${PEDRO_CRM_URL}/agenda** ou no widget de Próximos Compromissos do dashboard. Se aparecer seus eventos, deu certo."

### Passo 11: limpeza de segurança

```bash
unset CLIENT_ID CLIENT_SECRET
history -c 2>/dev/null || true
```

> "Limpei as variáveis sensíveis da memória e do histórico do terminal. Você terminou."

## Falhas comuns e como recuperar

| Erro | O que fazer |
|---|---|
| `gcloud projects create` retorna `Project ID already exists` | Gerar novo ID com timestamp diferente e tentar de novo |
| OAuth consent screen pede verificação | Cliente está fora dos Test Users. Voltar no Passo 5 item 4 e adicionar email dele |
| Vercel env add falha com `not linked` | Rodar `vercel link` no diretório do projeto antes |
| Redeploy fica em ERROR | Olhar logs com `vercel logs --prod`. Geralmente é env var faltando ou typo no redirect URI |
| Tela do CRM diz `redirect_uri_mismatch` | Conferir se a URI no Google Cloud bate EXATAMENTE com `${PEDRO_CRM_URL}/api/auth/google/callback` (sem barra no final) |

## Checklist final (skill confere antes de declarar pronto)

- [ ] Projeto Google Cloud criado e Calendar API ativa
- [ ] OAuth consent screen configurado com 4 scopes
- [ ] Client ID e Secret criados no Google Cloud
- [ ] GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI presentes em production na Vercel
- [ ] Deploy production READY
- [ ] Cliente confirmou que conseguiu logar e ver eventos
- [ ] Variáveis sensíveis removidas da sessão
