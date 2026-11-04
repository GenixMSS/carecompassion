-- Genix Medical Staffing Services: PDF & Word Document Upload Schema + Supabase Storage Bucket
-- Supports Client & Family Portal, Admin & Staff Operations Portal, and Career Resume Uploads

-- 1. Portal Documents Table
create table if not exists public.portal_documents (
  id bigint generated always as identity primary key,
  uploaded_by uuid references auth.users (id) on delete set null,
  portal_scope text not null default 'family' check (portal_scope in ('family', 'admin', 'careers')),
  category text not null default 'General Care Document',
  title text not null,
  file_name text not null,
  file_path text not null,
  file_size bigint not null default 0,
  mime_type text not null,
  uploader_email text,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists portal_documents_uploaded_by_idx on public.portal_documents (uploaded_by);
create index if not exists portal_documents_portal_scope_idx on public.portal_documents (portal_scope);
create index if not exists portal_documents_created_at_idx on public.portal_documents (created_at desc);

-- Add storage path column to job_applications for downloadable resumes
alter table public.job_applications
  add column if not exists resume_file_path text;

-- 2. Enable RLS & Grants
alter table public.portal_documents enable row level security;

grant select, insert, update, delete on public.portal_documents to authenticated;
grant insert on public.portal_documents to anon;

-- 3. RLS Policies on public.portal_documents
create policy "Authenticated users can view portal documents"
  on public.portal_documents
  for select
  to authenticated
  using ((select auth.uid()) is not null);

create policy "Authenticated users can upload portal documents"
  on public.portal_documents
  for insert
  to authenticated
  with check ((select auth.uid()) = uploaded_by);

create policy "Public career applicants can log resume documents"
  on public.portal_documents
  for insert
  to anon
  with check (portal_scope = 'careers' and uploaded_by is null);

create policy "Authenticated users can update their portal documents"
  on public.portal_documents
  for update
  to authenticated
  using ((select auth.uid()) = uploaded_by)
  with check ((select auth.uid()) = uploaded_by);

create policy "Authenticated users can delete portal documents"
  on public.portal_documents
  for delete
  to authenticated
  using ((select auth.uid()) is not null);

-- 4. Create Private Supabase Storage Bucket for PDF & Word (.pdf, .doc, .docx)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portal-documents',
  'portal-documents',
  false,
  15728640,
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- 5. Storage RLS Policies (SELECT + INSERT + UPDATE + DELETE for authenticated, INSERT for careers folder)
create policy "Authenticated users can read portal documents storage"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'portal-documents'
    and (select auth.uid()) is not null
  );

create policy "Authenticated users can upload portal documents storage"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'portal-documents'
    and (select auth.uid()) is not null
  );

create policy "Authenticated users can update portal documents storage"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'portal-documents'
    and (select auth.uid()) is not null
  )
  with check (
    bucket_id = 'portal-documents'
    and (select auth.uid()) is not null
  );

create policy "Authenticated users can delete portal documents storage"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'portal-documents'
    and (select auth.uid()) is not null
  );

create policy "Public career applicants can upload resumes to careers folder"
  on storage.objects
  for insert
  to anon, authenticated
  with check (
    bucket_id = 'portal-documents'
    and (storage.foldername(name))[1] = 'careers'
  );

