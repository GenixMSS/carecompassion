import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy & HIPAA Notice",
  description: "Privacy Policy and clinical confidentiality practices for Genix Medical Staffing Services.",
};

export default function PrivacyPage() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <p className="section-eyebrow">LEGAL &amp; PRIVACY</p>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-genix-navy">
          Privacy Policy &amp; Clinical Data Protection
        </h1>
        <p className="text-xs text-slate-500">Last Updated: January 2026</p>

        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            Genix Medical Staffing Services (&ldquo;GenixMSS&rdquo;) is committed to
            protecting the privacy, dignity, and confidentiality of our clients,
            families, healthcare facility partners, and clinical applicants.
          </p>
          <h2 className="font-heading text-lg font-bold text-genix-navy pt-2">
            1. Information We Collect
          </h2>
          <p>
            When you request a free quote, schedule a Comprehensive Clinical
            Assessment, submit a facility staffing requisition, or apply for a clinical
            position, we collect contact information (name, phone number, email
            address), care preferences, and professional credentials voluntarily
            submitted through our forms.
          </p>
          <h2 className="font-heading text-lg font-bold text-genix-navy pt-2">
            2. How We Use Your Information
          </h2>
          <p>
            Information collected is used strictly to coordinate home care services,
            conduct clinical assessments, match qualified healthcare professionals with
            shifts, and communicate updates with authorized family members or facility
            directors. We never sell client or clinician personal data to third parties.
          </p>
          <h2 className="font-heading text-lg font-bold text-genix-navy pt-2">
            3. Contact Us
          </h2>
          <p>
            For questions regarding privacy or clinical records, contact our Clinical
            Governance office at <strong>info@genixmss.com</strong> or call{" "}
            <strong>(334) 497-2713</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}

