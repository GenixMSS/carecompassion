import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clinical Licensing & Compliance",
  description: "Clinical credentialing, licensing, and compliance standards of Genix Medical Staffing Services.",
};

export default function LicensePage() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <p className="section-eyebrow">CLINICAL GOVERNANCE</p>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-genix-navy">
          Clinical Licensing, Credentialing &amp; Vetting Standards
        </h1>

        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            Genix Medical Staffing Services operates in full compliance with Georgia
            healthcare staffing and private home care regulations. Every clinician and
            caregiver placed through Genix undergoes:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Primary-source Georgia Board of Nursing / CNA Registry verification.</li>
            <li>Comprehensive multi-state criminal background and fingerprint screening.</li>
            <li>OIG / SAM federal healthcare exclusion verification.</li>
            <li>Current CPR / BLS / ACLS certification and TB/health clearance.</li>
            <li>Competency testing and ongoing clinical supervision under our Director of Clinical Governance &amp; Safety.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

