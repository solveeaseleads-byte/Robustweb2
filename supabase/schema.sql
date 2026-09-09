-- SolveEase Platform v4 persistent data model
create extension if not exists pgcrypto;

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  session_id text not null,
  tool_slug text,
  query text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists events_created_at_idx on public.events(created_at desc);
create index if not exists events_name_idx on public.events(name);
create index if not exists events_query_idx on public.events(query);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  problem text,
  tool_slug text,
  source text,
  intent_score integer not null default 0,
  intent_level text not null default 'low',
  consent_at timestamptz not null,
  created_at timestamptz not null default now()
);
create index if not exists leads_created_at_idx on public.leads(created_at desc);
create index if not exists leads_intent_idx on public.leads(intent_level);

alter table public.events enable row level security;
alter table public.leads enable row level security;
-- Server-side writes use the Supabase service role key. No public policy is added here.
