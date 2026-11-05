import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Activity,
  Bell,
  Clock,
  CheckCircle2,
  HeartPulse,
  Lock,
  ArrowRightCircle,
  Calendar,
  AlertCircle,
  UserPlus,
  LogIn,
  FileText,
  Upload,
} from "lucide-react";
import { familyLogin, familySignup } from "./actions";
import { createClient } from "@/utils/supabase/server";
import { getSupabaseEnv } from "@/utils/supabase/config";

export const metadata: Metadata = {
  title: "Family & Client Care Portal | Real-Time Clinical Insights & Vitals",
  description:
    "Sign in to the Genix Family & Client Care Portal for real-time shift check-ins, daily vitals, medication adherence, ADL logs, and secure PDF/Word document uploads.",
  alternates: {
    canonical: "/portal",
  },
};

interface FamilyPortalPageProps {
  searchParams: Promise<{
    mode?: string;
    error?: string;
    message?: string;
    setup?: string;
  }>;
}

export default async function FamilyPortalPage({
  searchParams,
}: FamilyPortalPageProps) {
  const params = await searchParams;
  const isRegister = params.mode === "register";
  const { isConfigured } = getSupabaseEnv();

  let currentUserEmail: string | null = null;
  if (isConfigured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    currentUserEmail = user?.email ?? null;
  }

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative py-20 bg-genix-navy text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('/assets/services/Genix M Staffing S Future Medical Care Image.webp')",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-400 text-genix-navy px-4 py-1 text-xs font-extrabold uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>TOTAL CLINICAL TRANSPARENCY</span>
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white">
            Family &amp; Client Care Portal
          </h1>
          <p className="text-sm sm:text-base text-white/85 max-w-2xl mx-auto leading-relaxed">
            Real-time clinical insights, shift check-ins, daily vitals, and recovery
            milestones—keeping families and healthcare partners informed in real time
            with zero administrative ambiguity.
          </p>
        </div>
      </section>

      {/* Portal Login + Interactive Live Care Insights Preview */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Client Portal Sign-In Card */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-slate-200 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-genix-navy text-white flex items-center justify-center">
                  <Lock className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h2 className="font-heading text-lg font-extrabold text-genix-navy">
                    Client &amp; Family Sign-In
                  </h2>
                  <p className="text-xs text-slate-500">
                    HIPAA-Aligned Care Plan Access
                  </p>
                </div>
              </div>

              {currentUserEmail && (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 space-y-2.5 text-xs">
                  <p className="font-bold text-emerald-900">
                    Signed in as {currentUserEmail}
                  </p>
                  <Link
                    href="/portal/dashboard"
                    className="btn-primary w-full justify-center"
                  >
                    <span>OPEN YOUR LIVE CARE DASHBOARD</span>
                    <ArrowRightCircle className="w-4 h-4" />
                  </Link>
                </div>
              )}

              {params.error && (
                <div className="rounded-xl bg-red-50 border border-red-200 p-3.5 flex items-start gap-2.5 text-xs text-red-800">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{params.error}</span>
                </div>
              )}

              {params.message && (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 flex items-start gap-2.5 text-xs text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{params.message}</span>
                </div>
              )}

              {/* Sign-In / Register Tabs */}
              <div className="grid grid-cols-2 rounded-xl bg-slate-100 p-1 text-xs font-bold">
                <Link
                  href="/portal"
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all ${
                    !isRegister
                      ? "bg-genix-navy text-white shadow-sm"
                      : "text-slate-600 hover:text-genix-navy"
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/portal?mode=register"
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all ${
                    isRegister
                      ? "bg-genix-navy text-white shadow-sm"
                      : "text-slate-600 hover:text-genix-navy"
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Activate ID</span>
                </Link>
              </div>

              <form
                action={isRegister ? familySignup : familyLogin}
                className="space-y-4"
              >
                {isRegister && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Client / Loved One&apos;s Name *
                      </label>
                      <input
                        name="patientName"
                        type="text"
                        required
                        placeholder="e.g., Robert Vance"
                        className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs focus:border-genix-navy focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Genix Care Plan ID *
                      </label>
                      <input
                        name="carePlanCode"
                        type="text"
                        required
                        placeholder="e.g., GNX-2026"
                        className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs focus:border-genix-navy focus:outline-none"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Family / Client Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="family@example.com"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs focus:border-genix-navy focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Portal Password *
                  </label>
                  <input
                    name="password"
                    type="password"
                    required
                    minLength={6}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs focus:border-genix-navy focus:outline-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  <span>
                    {isRegister
                      ? "ACTIVATE CARE PLAN PORTAL"
                      : "ACCESS CARE DASHBOARD"}
                  </span>
                  <ArrowRightCircle className="w-4 h-4" />
                </button>
              </form>

              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                <p className="font-semibold text-genix-navy">
                  New to Genix Medical Staffing?
                </p>
                <p>
                  Your Care Plan ID is issued immediately following your Comprehensive
                  Clinical Assessment.
                </p>
                <Link
                  href="/contact#quote-form"
                  className="inline-block font-bold text-genix-crimson hover:underline pt-1"
                >
                  Schedule Your Initial Assessment →
                </Link>
              </div>
            </div>

            {/* Right: Live Interactive Care Plan Dashboard Preview */}
            <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-slate-200 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 text-emerald-800 px-3 py-0.5 text-[11px] font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Interactive Portal Preview — Sample Care Plan
                  </span>
                  <h2 className="font-heading text-2xl font-extrabold text-genix-navy mt-1">
                    Real-Time Clinical Insights &amp; Shift Tracker
                  </h2>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 hover:bg-genix-navy hover:text-white px-3.5 py-2 text-xs font-bold text-genix-navy transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Modify Care Schedule</span>
                </Link>
              </div>

              {/* Vitals & Daily Status Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Blood Pressure &amp; Pulse</span>
                    <HeartPulse className="w-4 h-4 text-genix-crimson" />
                  </div>
                  <p className="font-heading text-xl font-extrabold text-genix-navy">
                    122 / 78 mmHg
                  </p>
                  <p className="text-[11px] text-emerald-600 font-semibold">
                    ✓ Logged 8:30 AM • Normal Baseline
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Medication Adherence</span>
                    <Activity className="w-4 h-4 text-genix-blue" />
                  </div>
                  <p className="font-heading text-xl font-extrabold text-genix-navy">
                    100% On-Time
                  </p>
                  <p className="text-[11px] text-emerald-600 font-semibold">
                    ✓ Morning &amp; Midday Doses Verified
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Active Caregiver on Shift</span>
                    <Clock className="w-4 h-4 text-amber-500" />
                  </div>
                  <p className="font-heading text-base font-extrabold text-genix-navy">
                    Clarissa M., CNA
                  </p>
                  <p className="text-[11px] text-slate-600 font-medium">
                    GPS Verified Arrival: 7:55 AM
                  </p>
                </div>
              </div>

              {/* Today's Completed Care Milestones */}
              <div className="space-y-3">
                <h3 className="font-heading text-sm font-bold text-genix-navy uppercase tracking-wider flex items-center gap-2">
                  <Bell className="w-4 h-4 text-genix-crimson" />
                  <span>Today&apos;s Shift Updates &amp; ADL Log</span>
                </h3>
                <div className="space-y-2.5">
                  {[
                    {
                      time: "8:15 AM",
                      title: "Morning Personal Hygiene & Safe Shower Transfer",
                      detail:
                        "Assisted with warm shower using bath bench, skin integrity checked, dressed comfortably.",
                    },
                    {
                      time: "9:00 AM",
                      title: "Heart-Healthy Breakfast & Morning Medication Reminder",
                      detail:
                        "Prepared oatmeal with fresh berries, 16oz water hydration, morning prescriptions taken on time.",
                    },
                    {
                      time: "10:30 AM",
                      title: "Cognitive Engagement & Range-of-Motion Walk",
                      detail:
                        "20-minute accompanied walk on the patio followed by classic music reminiscence and crossword puzzle.",
                    },
                  ].map((log) => (
                    <div
                      key={log.time}
                      className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-heading text-xs font-bold text-genix-navy">
                            {log.title}
                          </p>
                          <span className="text-[10px] font-bold text-slate-400">
                            {log.time}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">{log.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PDF & Word Document Upload Preview */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-heading text-sm font-bold text-genix-navy uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-genix-blue" />
                    <span>Family Care Document Vault (PDF &amp; Word Upload)</span>
                  </h3>
                  <span className="rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[10px] font-bold text-blue-800">
                    Supports .PDF, .DOC, .DOCX
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 border border-dashed border-slate-300">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-genix-navy/10 text-genix-navy flex items-center justify-center shrink-0">
                      <Upload className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-heading text-xs font-bold text-genix-navy">
                        Upload Physician Orders, Power of Attorney, or Insurance Forms
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Sign in or activate your Care Plan ID on the left to upload and manage PDF &amp; Word documents.
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/portal?mode=register"
                    className="rounded-lg bg-genix-navy hover:bg-genix-crimson text-white px-3.5 py-2 text-xs font-bold transition-colors shrink-0"
                  >
                    Sign In to Upload
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
