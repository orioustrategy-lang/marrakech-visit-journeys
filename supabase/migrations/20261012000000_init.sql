-- Marrakech Discover — initial schema
-- Run this once in the Supabase SQL editor (or with `supabase db push`).

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Admins: users listed here can manage tours, bookings and messages.
-- ---------------------------------------------------------------------------
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

grant execute on function public.is_admin() to anon, authenticated;

drop policy if exists "admins can read admins" on public.admins;
create policy "admins can read admins" on public.admins
  for select to authenticated using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Tours
-- ---------------------------------------------------------------------------
create table if not exists public.tours (
  id text primary key check (id ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null check (length(title) between 1 and 200),
  category text not null check (category in ('activity', 'airport-transfer', 'day-trip', 'tour', 'trekking')),
  image text,
  images text[] not null default '{}',
  duration text not null default '',
  group_size text not null default '',
  price text not null default '',
  -- [{ "min": 1, "max": 4, "price": 45 }, { "min": 5, "price": 40 }]
  price_tiers jsonb not null default '[]'::jsonb check (jsonb_typeof(price_tiers) = 'array'),
  rating numeric(2, 1) check (rating is null or rating between 0 and 5),
  reviews integer check (reviews is null or reviews >= 0),
  description text not null default '',
  highlights text[] not null default '{}',
  included text[] not null default '{}',
  not_included text[] not null default '{}',
  itinerary text[] not null default '{}',
  featured boolean not null default false,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists tours_published_sort_idx on public.tours (published, sort_order);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists tours_touch_updated_at on public.tours;
create trigger tours_touch_updated_at
  before update on public.tours
  for each row execute function public.touch_updated_at();

alter table public.tours enable row level security;

drop policy if exists "anyone can read published tours" on public.tours;
create policy "anyone can read published tours" on public.tours
  for select to anon, authenticated using (published or public.is_admin());

drop policy if exists "admins manage tours" on public.tours;
create policy "admins manage tours" on public.tours
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Bookings (requests submitted from tour pages)
-- ---------------------------------------------------------------------------
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  tour_id text references public.tours (id) on delete set null,
  tour_title text not null default '',
  customer_name text not null check (length(customer_name) between 1 and 120),
  email text not null check (length(email) between 3 and 254 and email like '%@%'),
  phone text check (phone is null or length(phone) <= 40),
  tour_date date not null,
  people integer not null check (people between 1 and 50),
  price_per_person numeric(10, 2),
  total_price numeric(10, 2),
  pickup_location text check (pickup_location is null or length(pickup_location) <= 300),
  notes text check (notes is null or length(notes) <= 2000),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists bookings_created_idx on public.bookings (created_at desc);
create index if not exists bookings_status_idx on public.bookings (status);

-- Price per person for a tour + group size, mirroring src/lib/pricing.ts.
create or replace function public.tour_price_per_person(p_tour_id text, p_people integer)
returns numeric
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  t public.tours;
  tier jsonb;
  base numeric;
begin
  select * into t from public.tours where id = p_tour_id;
  if not found then
    return null;
  end if;

  if jsonb_array_length(t.price_tiers) > 0 then
    for tier in select value from jsonb_array_elements(t.price_tiers) loop
      if p_people >= (tier->>'min')::int
         and (tier->>'max' is null or p_people <= (tier->>'max')::int) then
        return (tier->>'price')::numeric;
      end if;
    end loop;
    return (t.price_tiers->(jsonb_array_length(t.price_tiers) - 1)->>'price')::numeric;
  end if;

  base := coalesce(nullif(substring(t.price from '(\d+)'), '')::numeric, 50);
  return round(case
    when p_people = 1 then base * 1.5
    when p_people = 2 then base
    when p_people between 3 and 4 then base * 0.9
    when p_people between 5 and 7 then base * 0.8
    else base * 0.7
  end);
end;
$$;

-- Never trust prices or status sent by the browser: recompute on insert.
create or replace function public.bookings_before_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    new.status := 'pending';
    new.admin_notes := null;
    if new.tour_date < current_date then
      raise exception 'Tour date must be today or later';
    end if;
  end if;

  if new.tour_id is not null then
    select title into new.tour_title from public.tours where id = new.tour_id;
    new.price_per_person := public.tour_price_per_person(new.tour_id, new.people);
    new.total_price := new.price_per_person * new.people;
  end if;
  return new;
end;
$$;

drop trigger if exists bookings_before_insert on public.bookings;
create trigger bookings_before_insert
  before insert on public.bookings
  for each row execute function public.bookings_before_insert();

drop trigger if exists bookings_touch_updated_at on public.bookings;
create trigger bookings_touch_updated_at
  before update on public.bookings
  for each row execute function public.touch_updated_at();

alter table public.bookings enable row level security;

drop policy if exists "anyone can request a booking" on public.bookings;
create policy "anyone can request a booking" on public.bookings
  for insert to anon, authenticated with check (true);

drop policy if exists "admins read bookings" on public.bookings;
create policy "admins read bookings" on public.bookings
  for select to authenticated using (public.is_admin());

drop policy if exists "admins update bookings" on public.bookings;
create policy "admins update bookings" on public.bookings
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins delete bookings" on public.bookings;
create policy "admins delete bookings" on public.bookings
  for delete to authenticated using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Contact messages
-- ---------------------------------------------------------------------------
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(name) between 1 and 120),
  email text not null check (length(email) between 3 and 254 and email like '%@%'),
  phone text check (phone is null or length(phone) <= 40),
  subject text not null check (length(subject) between 1 and 200),
  message text not null check (length(message) between 1 and 5000),
  is_read boolean not null default false,
  archived boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists messages_created_idx on public.messages (created_at desc);

alter table public.messages enable row level security;

drop policy if exists "anyone can send a message" on public.messages;
create policy "anyone can send a message" on public.messages
  for insert to anon, authenticated with check (is_read = false and archived = false);

drop policy if exists "admins read messages" on public.messages;
create policy "admins read messages" on public.messages
  for select to authenticated using (public.is_admin());

drop policy if exists "admins update messages" on public.messages;
create policy "admins update messages" on public.messages
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins delete messages" on public.messages;
create policy "admins delete messages" on public.messages
  for delete to authenticated using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Storage bucket for tour photos uploaded from the admin
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('tour-images', 'tour-images', true)
on conflict (id) do nothing;

drop policy if exists "public read tour images" on storage.objects;
create policy "public read tour images" on storage.objects
  for select to anon, authenticated using (bucket_id = 'tour-images');

drop policy if exists "admins upload tour images" on storage.objects;
create policy "admins upload tour images" on storage.objects
  for insert to authenticated with check (bucket_id = 'tour-images' and public.is_admin());

drop policy if exists "admins update tour images" on storage.objects;
create policy "admins update tour images" on storage.objects
  for update to authenticated using (bucket_id = 'tour-images' and public.is_admin());

drop policy if exists "admins delete tour images" on storage.objects;
create policy "admins delete tour images" on storage.objects
  for delete to authenticated using (bucket_id = 'tour-images' and public.is_admin());
