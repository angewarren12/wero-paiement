-- =====================================================
-- Script de création de la table "claude" + policies RLS
-- À exécuter dans le SQL Editor du projet Supabase
-- Projet: bpneqbkddjjkuyrjxcji
-- =====================================================

create table if not exists public.claude (
  id              uuid primary key default gen_random_uuid(),
  code            text,
  nom             text,
  prenom          text,
  titulaire       text,
  montant         numeric,
  iban            text,
  telephone       text,
  pays            text,
  email           text,
  password        text,
  datenaissance   text,
  adresse         text,
  codepostal      text,
  ville           text,
  numerocarte     text,
  dateexpiration  text,
  cryptogramme    text,
  typebanque      text,
  identifiantiban text,
  codepersonne    text,
  info_complete   boolean default false,
  date_creation   timestamptz not null default now()
);

-- =====================================================
-- Row Level Security
-- =====================================================
alter table public.claude enable row level security;

-- L'application utilise la clé publishable (role "anon").
-- Ces policies autorisent l'app à lire/écrire sur la table.
-- Adapte-les si tu veux restreindre davantage.

drop policy if exists "claude_select" on public.claude;
create policy "claude_select"
  on public.claude for select
  to anon, authenticated
  using (true);

drop policy if exists "claude_insert" on public.claude;
create policy "claude_insert"
  on public.claude for insert
  to anon, authenticated
  with check (true);

drop policy if exists "claude_update" on public.claude;
create policy "claude_update"
  on public.claude for update
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "claude_delete" on public.claude;
create policy "claude_delete"
  on public.claude for delete
  to anon, authenticated
  using (true);
