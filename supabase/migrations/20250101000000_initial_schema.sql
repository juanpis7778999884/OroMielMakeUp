-- ============================================================
-- Oromiel Makeup — Initial Schema
-- Run this in the Supabase SQL Editor or via `supabase db push`
-- ============================================================

-- 0. Extensions
create extension if not exists "uuid-ossp";

-- 1. Enums
create type product_status as enum ('nuevo', 'oferta', 'agotado', 'activo');

-- 2. Tables
-- -----------------------------------------------------------

create table categories (
  id          uuid primary key default uuid_generate_v4(),
  name        text        not null,
  slug        text        not null unique,
  image_url   text,
  sort_order  integer     not null default 0,
  is_active   boolean     not null default true,
  created_at  timestamptz not null default now()
);

create table products (
  id                uuid           primary key default uuid_generate_v4(),
  name              text           not null,
  slug              text           not null unique,
  description       text,
  ingredients       text,
  brand             text,
  price             numeric(12,2)  not null check (price >= 0),
  compare_at_price  numeric(12,2)  check (compare_at_price is null or compare_at_price >= 0),
  stock             integer        not null default 0 check (stock >= 0),
  category_id       uuid           references categories(id) on delete set null,
  status            product_status not null default 'activo',
  is_featured       boolean        not null default false,
  is_bestseller     boolean        not null default false,
  views             integer        not null default 0,
  whatsapp_clicks   integer        not null default 0,
  created_at        timestamptz    not null default now(),
  updated_at        timestamptz    not null default now()
);

create table product_images (
  id          uuid     primary key default uuid_generate_v4(),
  product_id  uuid     not null references products(id) on delete cascade,
  url         text     not null,
  sort_order  integer  not null default 0
);

create table promotions (
  id              uuid        primary key default uuid_generate_v4(),
  title           text        not null,
  subtitle        text,
  description     text,
  banner_url      text,
  discount_label  text,
  starts_at       timestamptz,
  ends_at         timestamptz,
  is_active       boolean     not null default true,
  sort_order      integer     not null default 0,
  created_at      timestamptz not null default now()
);

create table testimonials (
  id          uuid        primary key default uuid_generate_v4(),
  author      text        not null,
  role        text,
  content     text        not null,
  avatar_url  text,
  rating      smallint    not null default 5 check (rating between 1 and 5),
  is_active   boolean     not null default true,
  sort_order  integer     not null default 0,
  created_at  timestamptz not null default now()
);

create table settings (
  id              integer  primary key default 1
                        check (id = 1),          -- singleton row
  whatsapp        text,
  instagram       text,
  facebook        text,
  address         text,
  hours           text,
  logo_url        text,
  hero_title      text,
  hero_subtitle   text,
  hero_image_url  text,
  map_embed       text,
  primary_color   text
);

create table activity_log (
  id          uuid        primary key default uuid_generate_v4(),
  user_id     uuid        references auth.users(id) on delete set null,
  action      text        not null,
  entity      text,
  detail      text,
  created_at  timestamptz not null default now()
);

-- 3. Indexes
-- -----------------------------------------------------------

create index idx_products_slug              on products (slug);
create index idx_products_category          on products (category_id);
create index idx_products_status            on products (status);
create index idx_products_featured          on products (is_featured)          where is_featured  = true;
create index idx_products_bestseller        on products (is_bestseller)        where is_bestseller = true;
create index idx_products_created           on products (created_at desc);
create index idx_products_price             on products (price);

create index idx_product_images_product     on product_images (product_id, sort_order);

create index idx_categories_slug            on categories (slug);
create index idx_categories_active_order    on categories (sort_order)         where is_active = true;

create index idx_promotions_active_order    on promotions (sort_order)         where is_active = true;
create index idx_promotions_dates           on promotions (starts_at, ends_at);

create index idx_testimonials_active_order  on testimonials (sort_order)       where is_active = true;

create index idx_activity_log_user          on activity_log (user_id);
create index idx_activity_log_created       on activity_log (created_at desc);

-- 4. updated_at trigger (auto-touch on products)
-- -----------------------------------------------------------

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_products_updated_at
  before update on products
  for each row execute function update_updated_at();

-- 5. RPC — increment product metric (views / whatsapp_clicks)
-- -----------------------------------------------------------

create or replace function increment_product_metric(p_id uuid, p_column text)
returns void as $$
begin
  if p_column = 'views' then
    update products set views = views + 1 where id = p_id;
  elsif p_column = 'whatsapp_clicks' then
    update products set whatsapp_clicks = whatsapp_clicks + 1 where id = p_id;
  end if;
end;
$$ language plpgsql security definer;

-- 6. Row-Level Security
-- -----------------------------------------------------------

-- Categories
alter table categories enable row level security;

create policy "Public can view active categories"
  on categories for select
  using (is_active = true);

create policy "Authenticated users can manage categories"
  on categories for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Products
alter table products enable row level security;

create policy "Public can view non-agotado products"
  on products for select
  using (status <> 'agotado' and stock > 0);

create policy "Authenticated users can manage products"
  on products for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Product images
alter table product_images enable row level security;

create policy "Public can view product images"
  on product_images for select
  using (
    exists (
      select 1 from products
      where products.id = product_images.product_id
        and products.status <> 'agotado'
        and products.stock > 0
    )
  );

create policy "Authenticated users can manage product images"
  on product_images for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Promotions
alter table promotions enable row level security;

create policy "Public can view active promotions"
  on promotions for select
  using (
    is_active = true
    and (starts_at is null or starts_at <= now())
    and (ends_at   is null or ends_at   >= now())
  );

create policy "Authenticated users can manage promotions"
  on promotions for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Testimonials
alter table testimonials enable row level security;

create policy "Public can view active testimonials"
  on testimonials for select
  using (is_active = true);

create policy "Authenticated users can manage testimonials"
  on testimonials for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Settings (singleton)
alter table settings enable row level security;

create policy "Public can read settings"
  on settings for select
  using (true);

create policy "Authenticated users can update settings"
  on settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Activity log
alter table activity_log enable row level security;

create policy "Authenticated users can read activity log"
  on activity_log for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can insert activity log"
  on activity_log for insert
  with check (auth.role() = 'authenticated');

-- 7. Seed — initial settings row
-- -----------------------------------------------------------

insert into settings (id) values (1)
  on conflict (id) do nothing;
