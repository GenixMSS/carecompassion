import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getSupabaseEnv } from "@/utils/supabase/config";
import {
  AdminDashboardClient,
  type QuoteRow,
  type StaffingRequestRow,
  type JobApplicationRow,
} from "./AdminDashboardClient";
import type { PortalDocumentRow } from "@/components/PortalDocumentVault";

const SAMPLE_STAFFING_REQUESTS: StaffingRequestRow[] = [
  {
    id: 1,
    request_id: "STF-884920",
    facility_name: "Wellstar Cobb Medical Center",
    facility_type: "Hospital / Acute Care",
    contact_name: "Sarah Jenkins, DON",
    phone: "(404) 555-0192",
    email: "s.jenkins@wellstarcobb.org",
    role_needed: "Registered Nurse (RN)",
    specialty: "Med-Surg / Telemetry",
    shift_type: "Urgent 24–48 Hr PRN Relief",
    staff_count: "1 - 3 Clinicians",
    notes: "Need 2 telemetry RNs with Epic EMR charting and active ACLS/BLS for 7p-7a weekend block.",
    status: "new",
    created_at: new Date().toISOString(),
  },
];

const SAMPLE_QUOTES: QuoteRow[] = [
  {
    id: 1,
    reference_id: "GNX-492817",
    name: "Eleanor Vance",
    phone: "(770) 555-0148",
    email: "eleanor.vance@example.com",
    overall_service: "memory-care",
    specific_service: "alzheimers-care",
    visit_date: "2026-11-10",
    time_slot: "Morning (8:00 AM - 12:00 PM)",
    message: "Looking for compassionate daily cognitive support and safe mobility assistance for my father in Lithia Springs.",
    status: "new",
    created_at: new Date().toISOString(),
  },
];

const SAMPLE_APPLICATIONS: JobApplicationRow[] = [
  {
    id: 1,
    application_id: "APP-792410",
    full_name: "Clarissa Montgomery, CNA",
    email: "clarissa.m@example.com",
    phone: "(678) 555-0174",
    city: "Lithia Springs, 30122",
    credential: "Certified Nursing Assistant (CNA)",
    experience_years: "5 - 10 Years",
    availability: "Full-Time (30–40 hrs/wk)",
    resume_file_name: "Clarissa_Montgomery_GA_CNA_License.pdf",
    summary: "Georgia-certified CNA with 7 years of memory care, Hoyer lift transfer, and post-stroke rehabilitation experience.",
    status: "new",
    created_at: new Date().toISOString(),
  },
];

export default async function AdminDashboardPage() {
  const { isConfigured } = getSupabaseEnv();
  if (!isConfigured) {
    redirect("/login?next=/admin&setup=missing_env");
  }

  const supabase = await createClient();

  // Defense-in-depth server verification alongside middleware
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login?next=/admin");
  }

  const [quotesRes, staffingRes, appsRes, docsRes] = await Promise.all([
    supabase
      .from("quotes")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100),
    supabase
      .from("staffing_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100),
    supabase
      .from("job_applications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100),
    supabase
      .from("portal_documents")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100),
  ]);

  const tablesMissing = Boolean(
    quotesRes.error || staffingRes.error || appsRes.error
  );

  const quotes: QuoteRow[] = tablesMissing
    ? SAMPLE_QUOTES
    : (quotesRes.data as QuoteRow[]) || [];
  const staffingRequests: StaffingRequestRow[] = tablesMissing
    ? SAMPLE_STAFFING_REQUESTS
    : (staffingRes.data as StaffingRequestRow[]) || [];
  const jobApplications: JobApplicationRow[] = tablesMissing
    ? SAMPLE_APPLICATIONS
    : (appsRes.data as JobApplicationRow[]) || [];
  const portalDocuments: PortalDocumentRow[] =
    (docsRes.data as PortalDocumentRow[]) || [];

  return (
    <AdminDashboardClient
      userId={user.id}
      userEmail={user.email || "admin@genixmss.com"}
      userName={user.user_metadata?.full_name}
      quotes={quotes}
      staffingRequests={staffingRequests}
      jobApplications={jobApplications}
      portalDocuments={portalDocuments}
      usingSampleData={tablesMissing}
    />
  );
}

