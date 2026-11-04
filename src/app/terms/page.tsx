import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Genix Medical Staffing Services (GenixMSS).",
};

export default function TermsPage() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <p className="section-eyebrow">LEGAL AGREEMENTS</p>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-genix-navy">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-500">Last Updated: January 2026</p>

        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            Welcome to <strong>genixmss.com</strong>, operated by Genix Medical Staffing
            Services. By accessing our website, portals, or scheduling a consultation,
            you agree to these Terms of Service.
          </p>
          <h2 className="font-heading text-lg font-bold text-genix-navy pt-2">
            1. Clinical Assessments &amp; Care Agreements
          </h2>
          <p>
            All home care pathways and facility staffing placements are governed by our
            formal Genix Medical Staffing Services General Service Agreement following
            an initial consultation or clinical assessment.
          </p>
          <h2 className="font-heading text-lg font-bold text-genix-navy pt-2">
            2. Emergency Medical Situations
          </h2>
          <p>
            In the event of an acute, life-threatening medical emergency, always dial{" "}
            <strong>911</strong> immediately before contacting your Genix Care
            Coordinator.
          </p>
        </div>
      </div>
    </div>
  );
}

