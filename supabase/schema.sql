-- Phase 2: デモ通話記録用テーブル
-- Supabase Dashboard → SQL Editor でこのファイルの内容を実行してください。

create table if not exists demo_calls (
  id uuid primary key default gen_random_uuid(),
  phone_number text,
  started_at timestamptz,
  ended_at timestamptz,
  recording_url text,
  summary text,
  created_at timestamptz default now()
);

-- Phase 2: オンラインデモ予約申込
create table if not exists demo_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  preferred_date date,
  notes text,
  created_at timestamptz default now()
);

-- Phase 3: 本番プロダクト（物件・入居者・業者・案件）
create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text,
  twilio_phone_number text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists residents (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references properties(id) on delete cascade,
  name text not null,
  phone text,
  email text,
  created_at timestamptz default now()
);

create table if not exists vendors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  created_at timestamptz default now()
);

create table if not exists tickets (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references properties(id) on delete set null,
  resident_id uuid references residents(id) on delete set null,
  subject text,
  status text default 'received' check (status in ('received', 'vendor_contacted', 'scheduled', 'completed')),
  priority text default 'normal' check (priority in ('normal', 'urgent')),
  vendor_id uuid references vendors(id) on delete set null,
  scheduled_at timestamptz,
  recording_url text,
  summary text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS: 認証ユーザーのみ読み取り可能にする場合は後から有効化
-- alter table demo_calls enable row level security;
-- create policy "Allow read for authenticated" on demo_calls for select to authenticated using (true);
