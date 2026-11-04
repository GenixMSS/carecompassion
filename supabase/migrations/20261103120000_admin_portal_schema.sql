-- Genix Medical Staffing Services: Admin Portal, Submissions & Family Care Portal Schema
-- Follows Supabase Postgres Best Practices & Security Checklist

-- 1. Consultation Quotes Table
create table if not exists public.quotes (
  id bigint generated always as identity primary key,
  reference_id text not null unique,
  name text not null,
  phone text not null,
  email text,
  overall_service text,
  specific_service text,
  visit_date text,
  time_slot text,
  message text,
  status text not null default 'new' check (status in ('new', 'contacted', 'scheduled', 'archived')),
  reviewed_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists quotes_created_at_idx on public.quotes (created_at desc);
create index if not exists quotes_status_idx on public.quotes (status);
create index if not exists quotes_reviewed_by_idx on public.quotes (reviewed_by);

-- 2. Facility Staffing Requests Table
create table if not exists public.staffing_requests (
  id bigint generated always as identity primary key,
  request_id text not null unique,
  facility_name text not null,
  facility_type text not null,
  contact_name text not null,
  phone text not null,
  email text not null,
  role_needed text not null,
  specialty text,
  shift_type text,
  staff_count text,
  notes text,
  status text not null default 'new' check (status in ('new', 'dispatched', 'filled', 'archived')),
  reviewed_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists staffing_requests_created_at_idx on public.staffing_requests (created_at desc);
create index if not exists staffing_requests_status_idx on public.staffing_requests (status);
create index if not exists staffing_requests_reviewed_by_idx on public.staffing_requests (reviewed_by);

-- 3. Clinical Job Applications Table
create table if not exists public.job_applications (
  id bigint generated always as identity primary key,
  application_id text not null unique,
  full_name text not null,
  email text not null,
  phone text not null,
  city text not null,
  credential text not null,
  experience_years text not null,
  availability text,
  resume_file_name text,
  summary text,
  status text not null default 'new' check (status in ('new', 'screening', 'credentialed', 'archived')),
  reviewed_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists job_applications_created_at_idx on public.job_applications (created_at desc);
create index if not exists job_applications_status_idx on public.job_applications (status);
create index if not exists job_applications_reviewed_by_idx on public.job_applications (reviewed_by);

-- 4. Family & Client Care Plans Table
create table if not exists public.care_plans (
  id bigint generated always as identity primary key,
  care_plan_code text not null unique,
  family_user_id uuid not null references auth.users (id) on delete cascade,
  patient_name text not null,
  primary_caregiver text not null default 'Clarissa M., CNA',
  caregiver_arrival_time text not null default 'GPS Verified Arrival: 7:55 AM',
  blood_pressure text not null default '122 / 78 mmHg',
  medication_adherence text not null default '100% On-Time',
  created_at timestamptz not null default now()
);

create index if not exists care_plans_family_user_id_idx on public.care_plans (family_user_id);

-- 5. Daily Care Shift & ADL Logs Table
create table if not exists public.care_shift_logs (
  id bigint generated always as identity primary key,
  care_plan_id bigint not null references public.care_plans (id) on delete cascade,
  logged_time text not null,
  title text not null,
  detail text not null,
  created_at timestamptz not null default now()
);

create index if not exists care_shift_logs_care_plan_id_idx on public.care_shift_logs (care_plan_id);

-- 6. Enable Row Level Security (RLS) on all exposed tables
alter table public.quotes enable row level security;
alter table public.staffing_requests enable row level security;
alter table public.job_applications enable row level security;
alter table public.care_plans enable row level security;
alter table public.care_shift_logs enable row level security;

-- 7. Explicit Data API Grants
grant usage on schema public to anon, authenticated;
grant insert on public.quotes, public.staffing_requests, public.job_applications to anon, authenticated;
grant select, update on public.quotes, public.staffing_requests, public.job_applications to authenticated;
grant select, insert, update on public.care_plans, public.care_shift_logs to authenticated;

-- 8. RLS Policies: Public Form Submissions
create policy "Public can submit quotes"
  on public.quotes
  for insert
  to anon, authenticated
  with check (true);

create policy "Public can submit staffing requests"
  on public.staffing_requests
  for insert
  to anon, authenticated
  with check (true);

create policy "Public can submit job applications"
  on public.job_applications
  for insert
  to anon, authenticated
  with check (true);

-- 9. RLS Policies: Staff Admin Operations
create policy "Authenticated staff can view quotes"
  on public.quotes
  for select
  to authenticated
  using ((select auth.uid()) is not null);

create policy "Authenticated staff can update quotes"
  on public.quotes
  for update
  to authenticated
  using ((select auth.uid()) is not null)
  with check ((select auth.uid()) is not null);

create policy "Authenticated staff can view staffing requests"
  on public.staffing_requests
  for select
  to authenticated
  using ((select auth.uid()) is not null);

create policy "Authenticated staff can update staffing requests"
  on public.staffing_requests
  for update
  to authenticated
  using ((select auth.uid()) is not null)
  with check ((select auth.uid()) is not null);

create policy "Authenticated staff can view job applications"
  on public.job_applications
  for select
  to authenticated
  using ((select auth.uid()) is not null);

create policy "Authenticated staff can update job applications"
  on public.job_applications
  for update
  to authenticated
  using ((select auth.uid()) is not null)
  with check ((select auth.uid()) is not null);

-- 10. RLS Policies: Family Portal (Strict Tenant Ownership)
create policy "Families can view their own care plans"
  on public.care_plans
  for select
  to authenticated
  using ((select auth.uid()) = family_user_id);

create policy "Families can insert their own care plans"
  on public.care_plans
  for insert
  to authenticated
  with check ((select auth.uid()) = family_user_id);

create policy "Families can update their own care plans"
  on public.care_plans
  for update
  to authenticated
  using ((select auth.uid()) = family_user_id)
  with check ((select auth.uid()) = family_user_id);

create policy "Families can view shift logs for their care plans"
  on public.care_shift_logs
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.care_plans cp
      where cp.id = care_shift_logs.care_plan_id
        and cp.family_user_id = (select auth.uid())
    )
  );
