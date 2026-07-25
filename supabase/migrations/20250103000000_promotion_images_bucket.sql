-- ============================================================
-- Supabase Storage — promotion-images bucket
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Create the bucket
insert into storage.buckets (id, name, public)
  values ('promotion-images', 'promotion-images', true)
  on conflict (id) do nothing;

-- Public read access
create policy "Public read access for promotion images"
  on storage.objects for select
  using (bucket_id = 'promotion-images');

-- Authenticated users can upload
create policy "Authenticated users can upload promotion images"
  on storage.objects for insert
  with check (
    bucket_id = 'promotion-images'
    and auth.role() = 'authenticated'
  );

-- Authenticated users can delete their own uploads
create policy "Authenticated users can delete promotion images"
  on storage.objects for delete
  using (
    bucket_id = 'promotion-images'
    and auth.role() = 'authenticated'
  );
