# Arquitetura do portal do aluno (item-rei)

## Stack
- Frontend: Next.js em `frontend/` (Vercel-ready).
- Auth + DB: Supabase do David (Auth pro login do aluno; DB pras tabelas).
- Marca: azul-marinho + dourado.

## Acesso restrito
- So entra quem comprou o **Curso de Construtor** (checagem via `enrollments`, server-side + RLS).

## Modulos
- Quiz por categoria (IRC/IBC/IECC/OSHA/AAB) — consome `motor-quiz-csl`.
- Provas completas (70-75 questoes).
- Feedback imediato: gabarito + explicacao + referencia ao codigo.
- Niveis: iniciante (mostra referencia) / avancado (esconde).
- Painel de desempenho por categoria.

## Dados
- `quiz_questions` (so verified=true chega no aluno), `quiz_attempts`, `enrollments`.

## Estado de entrega
- v1 = shell + motor de quiz (PRONTO neste build).
- Banco de questoes = TAREFA progressiva em ondas (gerador-questoes-csl, STEP 8 do dashboard).
