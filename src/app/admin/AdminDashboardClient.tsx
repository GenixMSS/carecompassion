"use client";

import { useState, useTransition } from "react";
import {
  Building2,
  Briefcase,
  MessageSquareQuote,
  LogOut,
  ShieldCheck,
  Search,
  Clock,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Database,
  FolderLock,
  Download,
} from "lucide-react";
import { signout } from "@/app/login/actions";
import { updateSubmissionStatus } from "./actions";
import { createClient } from "@/utils/supabase/client";
import {
  PortalDocumentVault,
  type PortalDocumentRow,
} from "@/components/PortalDocumentVault";

export interface QuoteRow {
  id: number;
  reference_id: string;
  name: string;
  phone: string;
  email: string | null;
  overall_service: string | null;
  specific_service: string | null;
  visit_date: string | null;
  time_slot: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

export interface StaffingRequestRow {
  id: number;
  request_id: string;
  facility_name: string;
  facility_type: string;
  contact_name: string;
  phone: string;
  email: string;
  role_needed: string;
  specialty: string | null;
  shift_type: string | null;
  staff_count: string | null;
  notes: string | null;
  status: string;
  created_at: string;
}

export interface JobApplicationRow {
  id: number;
  application_id: string;
  full_name: string;
  email: string;
  phone: string;
  city: string;
  credential: string;
  experience_years: string;
  availability: string | null;
  resume_file_name: string | null;
  resume_file_path?: string | null;
  summary: string | null;
  status: string;
  created_at: string;
}

interface AdminDashboardClientProps {
  userId: string;
  userEmail: string;
  userName?: string;
  quotes: QuoteRow[];
  staffingRequests: StaffingRequestRow[];
  jobApplications: JobApplicationRow[];
  portalDocuments: PortalDocumentRow[];
  usingSampleData: boolean;
}

export function AdminDashboardClient({
  userId,
  userEmail,
  userName,
  quotes,
  staffingRequests,
  jobApplications,
  portalDocuments,
  usingSampleData,
}: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<
    "staffing" | "quotes" | "applications" | "documents"
  >("staffing");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleDownloadResume = async (filePath: string, fileName: string) => {
    const supabase = createClient();
    const { data } = await supabase.storage
      .from("portal-documents")
      .createSignedUrl(filePath, 3600, { download: fileName });
    if (data?.signedUrl) {
      window.open(data.signedUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleStatusChange = (
    table: "quotes" | "staffing_requests" | "job_applications",
    id: number,
    newStatus: string
  ) => {
    startTransition(async () => {
      await updateSubmissionStatus(table, id, newStatus);
    });
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "new":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "dispatched":
      case "contacted":
      case "screening":
        return "bg-sky-100 text-sky-800 border-sky-200";
      case "filled":
      case "scheduled":
      case "credentialed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  const q = searchQuery.toLowerCase().trim();

  const filteredStaffing = staffingRequests.filter(
    (r) =>
      !q ||
      r.request_id.toLowerCase().includes(q) ||
      r.facility_name.toLowerCase().includes(q) ||
      r.contact_name.toLowerCase().includes(q) ||
      r.role_needed.toLowerCase().includes(q)
  );

  const filteredQuotes = quotes.filter(
    (item) =>
      !q ||
      item.reference_id.toLowerCase().includes(q) ||
      item.name.toLowerCase().includes(q) ||
      (item.overall_service || "").toLowerCase().includes(q) ||
      (item.specific_service || "").toLowerCase().includes(q)
  );

  const filteredApplications = jobApplications.filter(
    (app) =>
      !q ||
      app.application_id.toLowerCase().includes(q) ||
      app.full_name.toLowerCase().includes(q) ||
      app.credential.toLowerCase().includes(q) ||
      app.city.toLowerCase().includes(q)
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Admin Header */}
      <section className="bg-genix-navy text-white py-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-3 py-0.5 text-[11px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>PROTECTED ADMIN OPERATIONS PORTAL</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
              Genix Clinical Operations &amp; Intake Center
            </h1>
            <p className="text-xs text-white/80">
              Signed in as{" "}
              <strong className="text-amber-300">
                {userName ? `${userName} (${userEmail})` : userEmail}
              </strong>
            </p>
          </div>

          <form action={signout}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-genix-crimson px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors border border-white/15"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {usingSampleData && (
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 flex items-start gap-3 text-xs text-amber-900">
            <Database className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-950">
                Showing Preview Records (Database Tables Not Yet Migrated)
              </p>
              <p className="mt-0.5">
                Run the SQL migration in{" "}
                <code className="font-mono font-bold">
                  supabase/migrations/20261103120000_admin_portal_schema.sql
                </code>{" "}
                in your Supabase SQL Editor or via <code className="font-mono">supabase db push</code> to store and update live submissions.
              </p>
            </div>
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            type="button"
            onClick={() => setActiveTab("staffing")}
            className={`text-left p-5 rounded-2xl border transition-all ${
              activeTab === "staffing"
                ? "bg-white border-genix-navy shadow-card ring-2 ring-genix-navy/10"
                : "bg-white/80 border-slate-200 hover:bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Facility Staffing Orders
              </span>
              <Building2 className="w-5 h-5 text-genix-blue" />
            </div>
            <p className="font-heading text-3xl font-extrabold text-genix-navy mt-2">
              {staffingRequests.length}
            </p>
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              {staffingRequests.filter((r) => r.status === "new").length} New Urgent Requisitions
            </p>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("quotes")}
            className={`text-left p-5 rounded-2xl border transition-all ${
              activeTab === "quotes"
                ? "bg-white border-genix-navy shadow-card ring-2 ring-genix-navy/10"
                : "bg-white/80 border-slate-200 hover:bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Home Care Quote Inquiries
              </span>
              <MessageSquareQuote className="w-5 h-5 text-genix-crimson" />
            </div>
            <p className="font-heading text-3xl font-extrabold text-genix-navy mt-2">
              {quotes.length}
            </p>
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              {quotes.filter((qItem) => qItem.status === "new").length} Awaiting Coordinator Call
            </p>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("applications")}
            className={`text-left p-5 rounded-2xl border transition-all ${
              activeTab === "applications"
                ? "bg-white border-genix-navy shadow-card ring-2 ring-genix-navy/10"
                : "bg-white/80 border-slate-200 hover:bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Clinical Job Applications
              </span>
              <Briefcase className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="font-heading text-3xl font-extrabold text-genix-navy mt-2">
              {jobApplications.length}
            </p>
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              {jobApplications.filter((a) => a.status === "new").length} Pending Credential Review
            </p>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("documents")}
            className={`text-left p-5 rounded-2xl border transition-all ${
              activeTab === "documents"
                ? "bg-white border-genix-navy shadow-card ring-2 ring-genix-navy/10"
                : "bg-white/80 border-slate-200 hover:bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Document Vault (PDF / Word)
              </span>
              <FolderLock className="w-5 h-5 text-amber-500" />
            </div>
            <p className="font-heading text-3xl font-extrabold text-genix-navy mt-2">
              {portalDocuments.length}
            </p>
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              Upload &amp; Manage .PDF / .DOCX Files
            </p>
          </button>
        </div>

        {/* Filter & Tabs Toolbar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("staffing")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === "staffing"
                  ? "bg-genix-navy text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Facility Staffing ({filteredStaffing.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("quotes")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === "quotes"
                  ? "bg-genix-navy text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Home Care Quotes ({filteredQuotes.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("applications")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === "applications"
                  ? "bg-genix-navy text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Job Applications ({filteredApplications.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("documents")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1.5 ${
                activeTab === "documents"
                  ? "bg-genix-navy text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <FolderLock className="w-3.5 h-3.5" />
              <span>PDF &amp; Word Vault ({portalDocuments.length})</span>
            </button>
          </div>

          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ID, name, facility, role..."
              className="w-full rounded-xl border border-slate-300 pl-9 pr-3.5 py-2 text-xs focus:border-genix-navy focus:outline-none"
            />
          </div>
        </div>

        {/* Tab 1: Facility Staffing Requests */}
        {activeTab === "staffing" && (
          <div className="space-y-4">
            {filteredStaffing.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-genix-crimson">
                        {req.request_id}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase border ${getStatusBadgeStyle(
                          req.status
                        )}`}
                      >
                        {req.status}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(req.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-extrabold text-genix-navy">
                      {req.facility_name}{" "}
                      <span className="text-xs font-semibold text-slate-500">
                        ({req.facility_type})
                      </span>
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-xs font-bold text-slate-500">
                      Status:
                    </label>
                    <select
                      disabled={isPending || usingSampleData}
                      value={req.status}
                      onChange={(e) =>
                        handleStatusChange(
                          "staffing_requests",
                          req.id,
                          e.target.value
                        )
                      }
                      className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold text-genix-navy focus:border-genix-navy focus:outline-none"
                    >
                      <option value="new">New</option>
                      <option value="dispatched">Dispatched</option>
                      <option value="filled">Filled</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                  <div>
                    <p className="text-slate-500 font-semibold">
                      Clinical Role &amp; Unit
                    </p>
                    <p className="font-bold text-genix-navy mt-0.5">
                      {req.role_needed}
                    </p>
                    {req.specialty && (
                      <p className="text-slate-600">Specialty: {req.specialty}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-slate-500 font-semibold">
                      Shift &amp; Engagement
                    </p>
                    <p className="font-bold text-genix-navy mt-0.5">
                      {req.shift_type || "Standard Shift"}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500 font-semibold">
                      Point of Contact
                    </p>
                    <p className="font-bold text-genix-navy mt-0.5">
                      {req.contact_name}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-slate-600">
                      <span className="inline-flex items-center gap-1">
                        <Phone className="w-3 h-3 text-genix-crimson" />
                        {req.phone}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Mail className="w-3 h-3 text-genix-blue" />
                        {req.email}
                      </span>
                    </div>
                  </div>
                </div>

                {req.notes && (
                  <p className="text-xs text-slate-600 bg-slate-50/60 px-4 py-2.5 rounded-lg border border-slate-200/50">
                    <strong className="text-genix-navy">Clinical Notes:</strong>{" "}
                    {req.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Home Care Quotes */}
        {activeTab === "quotes" && (
          <div className="space-y-4">
            {filteredQuotes.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-genix-crimson">
                        {item.reference_id}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase border ${getStatusBadgeStyle(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-extrabold text-genix-navy">
                      {item.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-xs font-bold text-slate-500">
                      Status:
                    </label>
                    <select
                      disabled={isPending || usingSampleData}
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange("quotes", item.id, e.target.value)
                      }
                      className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold text-genix-navy focus:border-genix-navy focus:outline-none"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="scheduled">Assessment Scheduled</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                  <div>
                    <p className="text-slate-500 font-semibold">
                      Requested Care Program
                    </p>
                    <p className="font-bold text-genix-navy mt-0.5 uppercase">
                      {item.overall_service || "General Consultation"}
                    </p>
                    {item.specific_service && (
                      <p className="text-slate-600">{item.specific_service}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-slate-500 font-semibold">
                      Preferred Assessment Window
                    </p>
                    <p className="font-bold text-genix-navy mt-0.5">
                      {item.visit_date || "Flexible Date"}
                    </p>
                    <p className="text-slate-600">
                      {item.time_slot || "Any Time Slot"}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500 font-semibold">Contact Info</p>
                    <div className="space-y-1 mt-0.5 text-slate-700">
                      <p className="inline-flex items-center gap-1.5 font-bold text-genix-navy">
                        <Phone className="w-3 h-3 text-genix-crimson" />
                        {item.phone}
                      </p>
                      {item.email && (
                        <p className="flex items-center gap-1.5 text-slate-600">
                          <Mail className="w-3 h-3 text-genix-blue" />
                          {item.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {item.message && (
                  <p className="text-xs text-slate-600 bg-slate-50/60 px-4 py-2.5 rounded-lg border border-slate-200/50">
                    <strong className="text-genix-navy">Care Needs Summary:</strong>{" "}
                    {item.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Job Applications */}
        {activeTab === "applications" && (
          <div className="space-y-4">
            {filteredApplications.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-genix-crimson">
                        {app.application_id}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase border ${getStatusBadgeStyle(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(app.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-extrabold text-genix-navy">
                      {app.full_name}{" "}
                      <span className="text-xs font-semibold text-emerald-700">
                        — {app.credential}
                      </span>
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-xs font-bold text-slate-500">
                      Status:
                    </label>
                    <select
                      disabled={isPending || usingSampleData}
                      value={app.status}
                      onChange={(e) =>
                        handleStatusChange(
                          "job_applications",
                          app.id,
                          e.target.value
                        )
                      }
                      className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold text-genix-navy focus:border-genix-navy focus:outline-none"
                    >
                      <option value="new">New</option>
                      <option value="screening">Credential Screening</option>
                      <option value="credentialed">Approved &amp; Credentialed</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                  <div>
                    <p className="text-slate-500 font-semibold">
                      Clinical Experience &amp; Shift
                    </p>
                    <p className="font-bold text-genix-navy mt-0.5">
                      {app.experience_years} Experience
                    </p>
                    <p className="text-slate-600">
                      {app.availability || "Full-Time / PRN"}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500 font-semibold">
                      Location &amp; Credentials File
                    </p>
                    <p className="font-bold text-genix-navy mt-0.5 inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-genix-crimson" />
                      {app.city}
                    </p>
                    {app.resume_file_name && (
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-emerald-700 font-medium inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {app.resume_file_name}
                        </span>
                        {app.resume_file_path && (
                          <button
                            type="button"
                            onClick={() =>
                              handleDownloadResume(
                                app.resume_file_path!,
                                app.resume_file_name!
                              )
                            }
                            className="inline-flex items-center gap-1 rounded-md bg-genix-navy hover:bg-genix-crimson text-white px-2 py-0.5 text-[10px] font-bold transition-colors"
                          >
                            <Download className="w-3 h-3" />
                            <span>Download</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-slate-500 font-semibold">
                      Applicant Contact
                    </p>
                    <div className="space-y-1 mt-0.5">
                      <p className="font-bold text-genix-navy flex items-center gap-1">
                        <Phone className="w-3 h-3 text-genix-crimson" />
                        {app.phone}
                      </p>
                      <p className="text-slate-600 flex items-center gap-1">
                        <Mail className="w-3 h-3 text-genix-blue" />
                        {app.email}
                      </p>
                    </div>
                  </div>
                </div>

                {app.summary && (
                  <p className="text-xs text-slate-600 bg-slate-50/60 px-4 py-2.5 rounded-lg border border-slate-200/50">
                    <strong className="text-genix-navy">
                      Candidate Introduction:
                    </strong>{" "}
                    {app.summary}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: PDF & Word Document Vault */}
        {activeTab === "documents" && (
          <PortalDocumentVault
            portalScope="admin"
            userId={userId}
            userEmail={userEmail}
            initialDocuments={portalDocuments}
          />
        )}
      </div>
    </div>
  );
}

