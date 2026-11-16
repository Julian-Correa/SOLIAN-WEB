create extension if not exists "pgcrypto";

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  empresa text,
  email text not null,
  telefono text,
  servicio text,
  presupuesto text,
  descripcion text,
  honeypot text,
  created_at timestamptz not null default now()
);

alter table public.contacts enable row level security;

drop policy if exists "anon_insert_contact" on public.contacts;
create policy "anon_insert_contact"
  on public.contacts
  for insert
  to anon
  with check (true);

drop policy if exists "authenticated_select_contact" on public.contacts;
create policy "authenticated_select_contact"
  on public.contacts
  for select
  to authenticated
  using (true);
