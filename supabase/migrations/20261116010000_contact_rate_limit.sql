alter table public.contacts add column if not exists ip_hash text;

create index if not exists contacts_ip_hash_created_at_idx
  on public.contacts (ip_hash, created_at desc);

drop policy if exists "anon_insert_contact" on public.contacts;
