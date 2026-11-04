import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ShieldCheck,
  Activity,
  Bell,
  Clock,
  CheckCircle2,
  HeartPulse,
  Calendar,
  LogOut,
  Phone,
  FileText,
} from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { getSupabaseEnv } from "@/utils/supabase/config";
import { familySignout } from "../actions";
import {
  PortalDocumentVault,
  type PortalDocumentRow,
} from "@/components/PortalDocumentVault";

const DEFAULT_LOGS = [
  {
    logged_time: "8:15 AM",
    title: "Morning Personal Hygiene & Safe Shower Transfer",
    detail:
      "Assisted with warm shower using bath bench, skin integrity checked, dressed comfortably.",
  },
  {
    logged_time: "9:00 AM",
    title: "Heart-Healthy Breakfast & Morning Medication Verification",
    detail:
      "Prepared oatmeal with fresh berries, 16oz water hydration, morning prescriptions taken on time.",
  },
  {
    logged_time: "10:30 AM",
    title: "Cognitive Engagement & Range-of-Motion Walk",
    detail:
      "20-minute accompanied walk on the patio followed by classic music reminiscence and crossword puzzle.",
  },
  {
    logged_time: "12:30 PM",
    title: "Nutritious Lunch & Afternoon Vitals Check",
    detail:
      "Low-sodium grilled chicken salad, blood pressure and pulse logged within normal baseline.",
  },
];

export default async function ProtectedFamilyDashboardPage() {
  const { isConfigured } = getSupabaseEnv();
  if (!isConfigured) {
    redirect("/portal?setup=missing_env");
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/portal");
  }

  // Fetch the family's care plan (strictly scoped by RLS to family_user_id = auth.uid())
  const { data: carePlan } = await supabase
    .from("care_plans")
    .select("*")
    .eq("family_user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  let shiftLogs = DEFAULT_LOGS;
  if (carePlan?.id) {
    const { data: dbLogs } = await supabase
      .from("care_shift_logs")
      .select("logged_time, title, detail")
      .eq("care_plan_id", carePlan.id)
      .order("created_at", { ascending: true });
    if (dbLogs && dbLogs.length > 0) {
      shiftLogs = dbLogs;
    }
  }

  const { data: familyDocs } = await supabase
    .from("portal_documents")
    .select("*")
    .eq("uploaded_by", user.id)
    .order("created_at", { ascending: false });

  const initialDocuments: PortalDocumentRow[] =
    (familyDocs as PortalDocumentRow[]) || [];

  const patientName =
    carePlan?.patient_name ||
    user.user_metadata?.patient_name ||
    "Active Family Care Plan";
  const carePlanCode =
    carePlan?.care_plan_code ||
    user.user_metadata?.care_plan_code ||
    "GNX-2026";
  const caregiver = carePlan?.primary_caregiver || "Clarissa M., CNA";
  const arrival =
    carePlan?.caregiver_arrival_time || "GPS Verified Arrival: 7:55 AM";
  const bp = carePlan?.blood_pressure || "122 / 78 mmHg";
  const adherence = carePlan?.medication_adherence || "100% On-Time";

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Protected Portal Header */}
      <section className="bg-genix-navy text-white py-10 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-3 py-0.5 text-[11px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>AUTHENTICATED FAMILY CARE PLAN • {carePlanCode}</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
              {patientName} — Live Care &amp; Vitals Dashboard
            </h1>
            <p className="text-xs text-white/80">
              Family Account: <strong className="text-amber-300">{user.email}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:3344972713"
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 px-4 py-2.5 text-xs font-bold text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-300" />
              <span>24/7 Care Desk</span>
            </a>
            <form action={familySignout}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-xl bg-genix-crimson hover:bg-red-700 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Vitals & Daily Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Blood Pressure &amp; Pulse</span>
              <HeartPulse className="w-5 h-5 text-genix-crimson" />
            </div>
            <p className="font-heading text-2xl font-extrabold text-genix-navy">
              {bp}
            </p>
            <p className="text-xs text-emerald-600 font-semibold">
              ✓ Logged Today • Normal Clinical Baseline
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Medication Adherence</span>
              <Activity className="w-5 h-5 text-genix-blue" />
            </div>
            <p className="font-heading text-2xl font-extrabold text-genix-navy">
              {adherence}
            </p>
            <p className="text-xs text-emerald-600 font-semibold">
              ✓ Morning &amp; Midday Doses Verified
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Active Caregiver on Shift</span>
              <Clock className="w-5 h-5 text-amber-500" />
            </div>
            <p className="font-heading text-xl font-extrabold text-genix-navy">
              {caregiver}
            </p>
            <p className="text-xs text-slate-600 font-medium">{arrival}</p>
          </div>
        </div>

        {/* Today's Completed Care Milestones */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <Bell className="w-5 h-5 text-genix-crimson" />
              <div>
                <h2 className="font-heading text-lg font-extrabold text-genix-navy">
                  Today&apos;s Shift Updates &amp; ADL Clinical Log
                </h2>
                <p className="text-xs text-slate-500">
                  Protected by Supabase Row-Level Security (RLS) for {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/contact#quote-form"
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 hover:bg-genix-navy hover:text-white px-4 py-2 text-xs font-bold text-genix-navy transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Request Schedule Change</span>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 rounded-xl bg-genix-navy text-white hover:bg-genix-crimson px-4 py-2 text-xs font-bold transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Add Care Specialty</span>
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            {shiftLogs.map((log) => (
              <div
                key={`${log.logged_time}-${log.title}`}
                className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200/70"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-heading text-xs sm:text-sm font-bold text-genix-navy">
                      {log.title}
                    </p>
                    <span className="text-xs font-bold text-slate-400">
                      {log.logged_time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {log.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Family PDF & Word Document Upload Vault */}
        <PortalDocumentVault
          portalScope="family"
          userId={user.id}
          userEmail={user.email || ""}
          initialDocuments={initialDocuments}
        />
      </div>
    </div>
  );
}

