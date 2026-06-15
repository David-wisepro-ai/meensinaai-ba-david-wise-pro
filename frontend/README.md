# Wise Pro Academy — frontend (Vercel-ready, NAO deployado)

Next.js (App Router). Marca: azul-marinho + dourado.

## Estrutura
- `/` — site institucional (3 cursos + autoridade + reviews + SEO).
- `/project-manager` — landing PM (~US$ 250) com slot de VSL.
- `/curso-construtor` — landing Construtor (US$ 597) com slot de VSL; destaca o portal de simulados.
- `/wise-day` — landing Wise Day (US$ 497) com slot de VSL.
- `/portal` — portal do aluno (login restrito Supabase Auth; so quem comprou Construtor). Shell + motor de quiz.
- `/api/lead` — captura nome/email/telefone ANTES do Stripe (grava lead -> habilita recuperacao).
- `/api/stripe-webhook` — eventos checkout (pago/abandonado).

## Conectar (na call — STEP 1 do dashboard)
1. `vercel link` + `vercel env add` (chaves do .env: Supabase, Stripe, Resend).
2. Apontar dominio `wiseproacademy.io` (DNS = cauda/TAREFA do David).
3. `vercel --prod` so depois das chaves (NAO deployar agora).

## Slots de VSL
Cada landing tem `<!-- VSL: David grava depois -->`. Placeholder ate o David enviar o video.
