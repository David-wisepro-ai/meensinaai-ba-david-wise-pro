# Setup de credenciais — Wise Pro Academy

> O que SÓ o David resolve (fora do Cloud Code) pra escola sair do "modo seguro" e cobrar/logar/disparar de verdade.
> Cada chave vira variável de ambiente: cola no `.env.local` (local) E na Vercel (produção). NUNCA comitar credencial no Git.

## 1. Supabase (base de tudo — leads, login do aluno, quiz)
- [ ] `SUPABASE_URL`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Aplicar a migration `scripts/migrations/001_quiz_schema.sql` no Supabase (cria as tabelas + RLS)

## 2. Stripe (checkout + webhook)
- [ ] Criar os 3 produtos/preços no Stripe e pegar os Price IDs:
  - [ ] `STRIPE_PRICE_PROJECT_MANAGER` (~US$ 250)
  - [ ] `STRIPE_PRICE_CONSTRUTOR` (US$ 597)
  - [ ] `STRIPE_PRICE_WISE_DAY` (US$ 497)
- [ ] `STRIPE_SECRET_KEY`
- [ ] `STRIPE_WEBHOOK_SECRET` (criar webhook apontando pra `/api/stripe-webhook`)

## 3. Recuperação de carrinho — e-mail (Resend)
- [ ] `RESEND_API_KEY`
- [ ] `RESEND_FROM` (ex: contato@wiseproacademy.io)
- [ ] Verificar o domínio `wiseproacademy.io` na Resend

## 4. Recuperação de carrinho — WhatsApp (escolher 1)
- [ ] `WHATSAPP_PROVIDER` = `stevo` ou `zapi`
- [ ] Se Stevo: `STEVO_TOKEN` + `STEVO_INSTANCE` (~US$ 27-50/mês)
- [ ] Se Z-API: `ZAPI_TOKEN` + `ZAPI_INSTANCE`
- [ ] Ligar a instância no número da atendente

## 5. Cron + URL pública
- [ ] `CRON_SECRET` (string secreta qualquer — protege a rota de recuperação)
- [ ] `PUBLIC_SITE_URL` = https://wiseproacademy.io

## 6. Deploy (Vercel)
- [ ] Conectar o repo na Vercel (root do projeto Next = `frontend/`)
- [ ] Colar TODAS as variáveis acima nas Environment Variables
- [ ] Rodar `npm install && npm run build` localmente uma vez antes pra confirmar que compila

---
> Enquanto qualquer chave estiver vazia, o sistema NÃO quebra: ele degrada com elegância (grava lead sem cobrar, login mostra aviso, recuperação não dispara). Plugou a chave, vira ao vivo.
