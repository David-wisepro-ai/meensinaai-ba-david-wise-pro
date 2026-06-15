-- Wise Pro Academy — schema do portal do aluno (CSL Massachusetts)
-- Aplicado pelo agente via MCP/CLI (NUNCA entregue pro David colar no painel).
-- Schema unico da questao: ver meu-negocio/portal-aluno/schema-quiz.md

-- ===== quiz_questions =====
create table if not exists public.quiz_questions (
  id            text primary key,
  category      text not null check (category in ('IRC','IBC','IECC','OSHA','AAB')),
  subtopic      text,
  question      text not null,
  options       jsonb not null,            -- { "A":"...", "B":"...", "C":"...", "D":"..." }
  correct       text not null check (correct in ('A','B','C','D')),
  explanation   text not null,
  code_reference text not null,
  source_url    text,
  difficulty    text not null check (difficulty in ('iniciante','intermediario','avancado')),
  verified      boolean not null default false,
  verifier_note text,
  created_at    timestamptz not null default now()
);
create index if not exists idx_quiz_cat_verified on public.quiz_questions (category, verified);
create index if not exists idx_quiz_subtopic on public.quiz_questions (subtopic);

-- ===== enrollments (quem comprou qual produto) =====
create table if not exists public.enrollments (
  id           uuid primary key default gen_random_uuid(),
  email        text not null,
  product      text not null check (product in ('project_manager','construtor','wise_day')),
  active       boolean not null default true,
  created_at   timestamptz not null default now()
);
create index if not exists idx_enroll_email on public.enrollments (email);

-- ===== leads (captura pre-Stripe) =====
create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  email        text not null,
  phone        text,
  product      text not null check (product in ('project_manager','construtor','wise_day')),
  status       text not null default 'checkout_iniciado'
               check (status in ('lead_novo','atendimento','checkout_iniciado','abandonado','recuperacao_enviada','pago','ativo')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists idx_leads_status on public.leads (status);
create index if not exists idx_leads_email on public.leads (email);

-- ===== checkout_events =====
create table if not exists public.checkout_events (
  id           uuid primary key default gen_random_uuid(),
  lead_email   text not null,
  product      text not null,
  event        text not null check (event in ('checkout_iniciado','pago','abandonado')),
  stripe_session_id text,
  created_at   timestamptz not null default now()
);

-- ===== quiz_attempts =====
create table if not exists public.quiz_attempts (
  id           uuid primary key default gen_random_uuid(),
  student_email text not null,
  question_id  text not null references public.quiz_questions(id),
  answer       text not null,
  correct      boolean not null,
  created_at   timestamptz not null default now()
);
create index if not exists idx_attempts_student on public.quiz_attempts (student_email);

-- ===== RLS (acesso restrito) =====
alter table public.quiz_questions enable row level security;
alter table public.enrollments    enable row level security;
alter table public.quiz_attempts  enable row level security;
-- Politicas server-side: questoes verified=true so pra quem tem enrollment de 'construtor' ativo.
-- (definidas via service_role pelo portal; ajustar conforme Supabase Auth do David na call).
