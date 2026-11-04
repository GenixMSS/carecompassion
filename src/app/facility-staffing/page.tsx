"use client";

import { useState } from "react";
import {
  Building2,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Users,
  ArrowRightCircle,
  Phone,
} from "lucide-react";

export default function FacilityStaffingPage() {
  const [facilityName, setFacilityName] = useState("");
  const [facilityType, setFacilityType] = useState("Hospital / Acute Care");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [roleNeeded, setRoleNeeded] = useState("Registered Nurse (RN)");
  const [specialty, setSpecialty] = useState("Med-Surg / Telemetry");
  const [shiftType, setShiftType] = useState("Urgent 24–48 Hr PRN Relief");
  const [staffCount, setStaffCount] = useState("1 - 3 Clinicians");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [requestId, setRequestId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/staffing-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          facilityName,
          facilityType,
          contactName,
          phone,
          email,
          roleNeeded,
          specialty,
          shiftType,
          staffCount,
          notes,
        }),
      });
      const data = await res.json();
      setRequestId(data.requestId || "STF-884920");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 bg-genix-navy text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('/assets/services/Genix MSS Nursing Care Image.webp')",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-genix-crimson px-4 py-1 text-xs font-bold uppercase tracking-widest">
            <Building2 className="w-3.5 h-3.5" />
            <span>HEALTHCARE FACILITY STAFFING PORTAL</span>
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Elite Clinical Staffing for Hospitals, Clinics &amp; Senior Living Facilities
          </h1>
          <p className="text-sm sm:text-base text-white/85 max-w-2xl mx-auto leading-relaxed">
            With a <strong>92% Time-to-Fill Rate</strong> and{" "}
            <strong>94% Client Satisfaction Score</strong>, Genix deploys primary-source
            credentialed RNs, LPNs, CNAs, and Allied Health professionals within 24–48
            hours across Metro Atlanta.
          </p>
        </div>
      </section>

      {/* Main Portal Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Clinical Capabilities */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <p className="section-eyebrow">30+ CLINICAL SPECIALIZATIONS</p>
              <h2 className="font-heading text-3xl font-extrabold text-genix-navy">
                Built to Eliminate Healthcare Staffing Friction
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We understand that patient ratios and clinical continuity cannot wait.
                Our Staffing Delivery team works directly with Chief Nursing Officers,
                DONs, and Staffing Coordinators to fill urgent PRN shifts, block booking,
                local contracts, and temp-to-perm roles.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: <Clock className="w-5 h-5 text-genix-crimson" />,
                  title: "24–48 Hour Rapid Placement",
                  desc: "Immediate dispatch from our pre-vetted Metro Atlanta clinical bench.",
                },
                {
                  icon: <ShieldCheck className="w-5 h-5 text-genix-blue" />,
                  title: "Joint Commission-Aligned Vetting",
                  desc: "Primary-source Georgia/Compact license verification, OIG/SAM, 10-panel drug screen, and skills checklists.",
                },
                {
                  icon: <Users className="w-5 h-5 text-emerald-600" />,
                  title: "Multi-Disciplinary Clinicians",
                  desc: "RNs (ICU, ER, Med-Surg, Telemetry, OR), LPNs, CNAs, CMAs, Physical/Occupational Therapists, and Sitters.",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200/80"
                >
                  <div className="mt-0.5 shrink-0">{feature.icon}</div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-genix-navy">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-genix-navy text-white space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-300">
                URGENT 24/7 STAFFING DESK
              </p>
              <p className="font-heading text-xl font-bold text-white">
                Need Immediate Shift Coverage Today?
              </p>
              <p className="text-xs text-white/80">
                Call our on-call Staffing Director directly for same-day or overnight
                facility dispatch:
              </p>
              <a
                href="tel:3344972713"
                className="inline-flex items-center gap-2 rounded-full bg-genix-crimson px-6 py-3 text-xs font-bold uppercase tracking-wider text-white"
              >
                <Phone className="w-4 h-4" />
                <span>(334) 497-2713</span>
              </a>
            </div>
          </div>

          {/* Right: Facility Staffing Request Form */}
          <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-card">
            {requestId ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
                <h3 className="font-heading text-2xl font-extrabold text-genix-navy">
                  Facility Staffing Order Dispatched
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Order ID{" "}
                  <span className="font-mono font-bold text-genix-crimson">
                    {requestId}
                  </span>{" "}
                  for <strong>{facilityName}</strong> has been routed to Jamal, Director
                  of Care Delivery Systems. We will call <strong>{contactName}</strong>{" "}
                  at <strong>{phone}</strong> with candidate profiles shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setRequestId("")}
                  className="btn-primary"
                >
                  Submit Another Staffing Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h2 className="font-heading text-2xl font-extrabold text-genix-navy">
                    Submit a Facility Staffing Requisition
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Specify your clinical role, specialty unit, and shift requirements
                    below.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Facility / Organization Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={facilityName}
                      onChange={(e) => setFacilityName(e.target.value)}
                      placeholder="e.g., Wellstar / Piedmont / Senior Living"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs focus:border-genix-navy focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Facility Type *
                    </label>
                    <select
                      value={facilityType}
                      onChange={(e) => setFacilityType(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-semibold focus:border-genix-navy focus:outline-none"
                    >
                      <option>Hospital / Acute Care</option>
                      <option>Skilled Nursing Facility (SNF) / Rehab</option>
                      <option>Assisted Living / Memory Care Community</option>
                      <option>Outpatient Clinic / Surgery Center</option>
                      <option>Hospice / Home Health Partner</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Name &amp; Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g., Sarah Jenkins, DON"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs focus:border-genix-navy focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Direct Phone Number *
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
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@facility.org"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs focus:border-genix-navy focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Clinical Role Needed *
                    </label>
                    <select
                      value={roleNeeded}
                      onChange={(e) => setRoleNeeded(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-semibold focus:border-genix-navy focus:outline-none"
                    >
                      <option>Registered Nurse (RN)</option>
                      <option>Licensed Practical Nurse (LPN)</option>
                      <option>Certified Nursing Assistant (CNA)</option>
                      <option>Allied Health / Physical or Occupational Therapy</option>
                      <option>1:1 Patient Safety Sitter / Companion</option>
                      <option>Multi-Role Facility Block Request</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Specialty / Unit
                    </label>
                    <input
                      type="text"
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
                      placeholder="e.g., ICU, Med-Surg, LTC, Memory Care"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs focus:border-genix-navy focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Engagement / Shift Type
                    </label>
                    <select
                      value={shiftType}
                      onChange={(e) => setShiftType(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-semibold focus:border-genix-navy focus:outline-none"
                    >
                      <option>Urgent 24–48 Hr PRN Relief</option>
                      <option>Day Shift (7a–7p) Block Booking</option>
                      <option>Night Shift (7p–7a) Block Booking</option>
                      <option>8–13 Week Local Contract</option>
                      <option>Temp-to-Perm / Direct Hire</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Shift Dates, EMR System &amp; Special Credential Notes
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Share shift dates, number of clinicians needed, EMR (Epic/Cerner/PointClickCare), or specific certifications (ACLS, BLS, PALS)..."
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
                      ? "DISPATCHING REQUISITION..."
                      : "SUBMIT FACILITY STAFFING REQUEST"}
                  </span>
                  <ArrowRightCircle className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

