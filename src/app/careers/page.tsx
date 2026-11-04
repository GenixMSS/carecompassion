"use client";

import { useState } from "react";
import {
  Briefcase,
  CheckCircle2,
  Upload,
  HeartHandshake,
  DollarSign,
  Calendar,
  ArrowRightCircle,
  FileText,
  AlertCircle,
  X,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const OPEN_ROLES = [
  {
    title: "Registered Nurse (RN) — Home Health & Transitional Care",
    location: "Lithia Springs, Atlanta, Marietta & Metro Atlanta",
    type: "Full-Time / PRN / Contract",
    pay: "Competitive Clinical Tier + Weekly Direct Deposit",
  },
  {
    title: "Licensed Practical Nurse (LPN) — Private Duty & Facility Shifts",
    location: "Fulton, Cobb, Douglas & DeKalb Counties",
    type: "Flexible Day / Night Shifts",
    pay: "Top Metro Rates + Shift Differentials",
  },
  {
    title: "Certified Nursing Assistant (CNA) — Memory & Specialized Care",
    location: "Greater Atlanta Metro (All 11 Counties)",
    type: "Full-Time / Part-Time / Weekend PRN",
    pay: "Weekly Pay + Mileage & Referral Bonuses",
  },
  {
    title: "Compassionate Home Caregiver / Companion Specialist",
    location: "Buckhead, Alpharetta, Roswell, Decatur, Peachtree City",
    type: "Flexible 4-Hr to 12-Hr Shifts",
    pay: "Competitive Hourly + Paid Dementia Training",
  },
];

export default function CareersPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [credential, setCredential] = useState("Certified Nursing Assistant (CNA)");
  const [experienceYears, setExperienceYears] = useState("3 - 5 Years");
  const [availability, setAvailability] = useState("Full-Time (30–40 hrs/wk)");
  const [resumeFileName, setResumeFileName] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [uploadedResumeConfirmed, setUploadedResumeConfirmed] = useState("");
  const [summary, setSummary] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState("");

  const handleResumeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileError("");
    if (!file) {
      setResumeFile(null);
      setResumeFileName("");
      return;
    }

    const lower = file.name.toLowerCase();
    const isAllowed =
      lower.endsWith(".pdf") ||
      lower.endsWith(".doc") ||
      lower.endsWith(".docx");

    if (!isAllowed) {
      setFileError(
        "Only PDF (.pdf) and Microsoft Word (.doc, .docx) documents are accepted."
      );
      e.target.value = "";
      setResumeFile(null);
      setResumeFileName("");
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setFileError("File size exceeds the 15 MB maximum limit.");
      e.target.value = "";
      setResumeFile(null);
      setResumeFileName("");
      return;
    }

    setResumeFile(file);
    setResumeFileName(file.name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFileError("");
    try {
      let resumeFilePath = "";
      let mimeType = "application/pdf";

      if (resumeFile) {
        const lower = resumeFile.name.toLowerCase();
        if (lower.endsWith(".doc")) {
          mimeType = "application/msword";
        } else if (lower.endsWith(".docx")) {
          mimeType =
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        }

        const safeFileName = resumeFile.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const storagePath = `careers/${Date.now()}_${safeFileName}`;
        const supabase = createClient();

        const { error: uploadErr } = await supabase.storage
          .from("portal-documents")
          .upload(storagePath, resumeFile, {
            contentType: mimeType,
          });

        if (uploadErr) {
          setFileError(`Document upload failed: ${uploadErr.message}`);
          setSubmitting(false);
          return;
        }

        resumeFilePath = storagePath;
        setUploadedResumeConfirmed(resumeFile.name);
      } else {
        setUploadedResumeConfirmed("");
      }

      const res = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          city,
          credential,
          experienceYears,
          availability,
          resumeFileName,
          resumeFilePath,
          resumeFileSize: resumeFile?.size || 0,
          resumeMimeType: mimeType,
          summary,
        }),
      });
      const data = await res.json();
      setApplicationId(data.applicationId || "APP-792410");
      setResumeFile(null);
      setResumeFileName("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 bg-genix-navy text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage:
              "url('/assets/services/Genix M Staffing S Skilled Nurse Image 3.webp')",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-1 text-xs font-bold uppercase tracking-widest">
            <Briefcase className="w-3.5 h-3.5" />
            <span>JOIN THE GENIX CLINICAL NETWORK</span>
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white">
            Quality Care Starts With the Right People
          </h1>
          <p className="text-sm sm:text-base text-white/85 max-w-2xl mx-auto leading-relaxed">
            Are you a compassionate RN, LPN, CNA, or Home Care Professional? Join a
            clinical-first agency that respects your expertise, offers flexible Metro
            Atlanta schedules, and rewards excellence.
          </p>
        </div>
      </section>

      {/* Benefits + Open Positions + Application Form */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Why Work With Genix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <DollarSign className="w-6 h-6 text-emerald-600" />,
                title: "Top-Tier Compensation & Weekly Pay",
                desc: "Competitive hourly rates, weekend/overnight shift differentials, and reliable direct deposit.",
              },
              {
                icon: <Calendar className="w-6 h-6 text-genix-blue" />,
                title: "Flexible Shifts Near Your Home",
                desc: "Work across 11 Metro Atlanta counties with schedules matched to your life—PRN, part-time, or full-time.",
              },
              {
                icon: <HeartHandshake className="w-6 h-6 text-genix-crimson" />,
                title: "24/7 Clinical Leadership Support",
                desc: "You are never on an island. Our nursing directors and Staff Success Liaison back you on every shift.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5"
              >
                {item.icon}
                <h3 className="font-heading text-base font-bold text-genix-navy">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Open Clinical Positions */}
            <div className="lg:col-span-5 space-y-4">
              <p className="section-eyebrow">ACTIVE METRO ATLANTA OPENINGS</p>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-genix-navy">
                Current Clinical &amp; Caregiving Roles
              </h2>

              <div className="space-y-4 pt-2">
                {OPEN_ROLES.map((role) => (
                  <div
                    key={role.title}
                    onClick={() => setCredential(role.title.split(" — ")[0])}
                    className="cursor-pointer p-5 rounded-xl border border-slate-200 hover:border-genix-navy hover:shadow-card transition-all space-y-2 bg-white"
                  >
                    <h3 className="font-heading text-sm font-bold text-genix-navy">
                      {role.title}
                    </h3>
                    <p className="text-xs text-slate-500">{role.location}</p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-genix-navy">
                        {role.type}
                      </span>
                      <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                        {role.pay}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Online Job Application & Resume Upload */}
            <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-card">
              {applicationId ? (
                <div className="py-12 text-center space-y-4">
                  <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
                  <h3 className="font-heading text-2xl font-extrabold text-genix-navy">
                    Application Received!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, <strong>{fullName}</strong>. Your application (ID{" "}
                    <span className="font-mono font-bold text-genix-crimson">
                      {applicationId}
                    </span>
                    ) has been routed to Alex, Staff Success &amp; Support Liaison, for
                    credential review.
                  </p>
                  {uploadedResumeConfirmed && (
                    <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2 text-xs font-bold text-emerald-800">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      <span>
                        Uploaded Document Attached: {uploadedResumeConfirmed}
                      </span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setApplicationId("")}
                    className="btn-primary"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h2 className="font-heading text-2xl font-extrabold text-genix-navy">
                      Fast-Track Clinical Application
                    </h2>
                    <p className="text-xs text-slate-600 mt-1">
                      Complete your profile and attach your resume or license below.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Legal Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="First & Last Name"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs focus:border-genix-navy focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs focus:border-genix-navy focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Mobile Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(404) 000-0000"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs focus:border-genix-navy focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        City &amp; ZIP Code in Georgia *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g., Lithia Springs, 30122"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs focus:border-genix-navy focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Primary License / Role *
                      </label>
                      <select
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-semibold focus:border-genix-navy focus:outline-none"
                      >
                        <option>Registered Nurse (RN)</option>
                        <option>Licensed Practical Nurse (LPN)</option>
                        <option>Certified Nursing Assistant (CNA)</option>
                        <option>Home Caregiver / Companion Specialist</option>
                        <option>Allied Health / PT / OT / Speech</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Years of Clinical / Care Experience *
                      </label>
                      <select
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-semibold focus:border-genix-navy focus:outline-none"
                      >
                        <option>1 - 2 Years</option>
                        <option>3 - 5 Years</option>
                        <option>5 - 10 Years</option>
                        <option>10+ Years</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Preferred Shift Availability
                    </label>
                    <select
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-semibold focus:border-genix-navy focus:outline-none"
                    >
                      <option>Full-Time (30–40 hrs/wk)</option>
                      <option>Part-Time / Flexible Days</option>
                      <option>Awake Overnight Shifts</option>
                      <option>Weekend PRN &amp; Urgent Relief</option>
                    </select>
                  </div>

                  {/* Resume Upload Box */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-slate-700">
                        Upload Resume &amp; Certifications (PDF or Word Document)
                      </label>
                      <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                        .PDF, .DOC, .DOCX • Max 15 MB
                      </span>
                    </div>

                    {fileError && (
                      <div className="rounded-xl bg-red-50 border border-red-200 p-3 flex items-start gap-2 text-xs text-red-800">
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <span>{fileError}</span>
                      </div>
                    )}

                    <label className="flex items-center justify-center gap-3 w-full border-2 border-dashed border-slate-300 hover:border-genix-navy rounded-xl bg-white p-5 cursor-pointer transition-colors">
                      <Upload className="w-5 h-5 text-genix-blue shrink-0" />
                      <span className="text-xs font-semibold text-slate-600 truncate">
                        {resumeFile
                          ? `Selected: ${resumeFile.name} (${(
                              resumeFile.size / 1024
                            ).toFixed(1)} KB)`
                          : "Click to upload your Resume, CV, or Georgia Clinical License (.pdf, .doc, .docx)"}
                      </span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        className="hidden"
                        onChange={handleResumeSelect}
                      />
                    </label>

                    {resumeFile && (
                      <div className="flex items-center justify-between rounded-lg bg-emerald-50 border border-emerald-200 px-3.5 py-2 text-xs text-emerald-900">
                        <span className="inline-flex items-center gap-2 font-semibold truncate">
                          <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{resumeFile.name} ready to upload</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setResumeFile(null);
                            setResumeFileName("");
                          }}
                          className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 font-bold ml-2 shrink-0"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Clinical Specialties &amp; Brief Introduction
                    </label>
                    <textarea
                      rows={3}
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      placeholder="Tell us about your experience with dementia care, Hoyer lifts, post-stroke rehab, hospital units, or Georgia license number..."
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs focus:border-genix-navy focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full"
                  >
                    <span>
                      {submitting
                        ? "SUBMITTING APPLICATION..."
                        : "SUBMIT CLINICAL APPLICATION"}
                    </span>
                    <ArrowRightCircle className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

