-- ============================================================
-- Supabase Storage — product-images bucket
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Create the bucket
insert into storage.buckets (id, name, public)
  values ('product-images', 'product-images', true)
  on conflict (id) do nothing;

-- Public read access
create policy "Public read access for product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

-- Authenticated users can upload
create policy "Authenticated users can upload product images"
  on storage.objects for insert
  with check (
    bucket_id = 'product-images'
    and auth.role() = 'authenticated'
  );

-- Authenticated users can delete their own uploads
create policy "Authenticated users can delete product images"
  on storage.objects for delete
  using (
    bucket_id = 'product-images'
    and auth.role() = 'authenticated'
  );
