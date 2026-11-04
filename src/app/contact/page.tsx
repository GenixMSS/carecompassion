import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Building2, ShieldCheck } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Contact Genix Medical Staffing | Get a Free Care or Staffing Quote",
  description:
    "Contact Genix Medical Staffing Services in Lithia Springs & Metro Atlanta. Request a complimentary clinical assessment, home care quote, or urgent facility staffing.",
};

export default function ContactPage() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="relative py-20 bg-genix-navy text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage:
              "url('/assets/services/Genix M Staffing S Contact Page Image One.webp')",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">
            24/7 CARE &amp; STAFFING DISPATCH
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white">
            Get In Touch With Genix
          </h1>
          <p className="text-sm sm:text-base text-white/85 max-w-2xl mx-auto leading-relaxed">
            Whether you have a question regarding our clinical vetting process, need
            urgent shift coverage for your facility, or would like to discuss a
            customized home care plan for a loved one, our team is ready to assist.
          </p>
        </div>
      </section>

      {/* Contact Cards + Quote Form */}
      <section id="quote-form" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <p className="section-eyebrow">DIRECT COORDINATES</p>
                <h2 className="font-heading text-3xl font-extrabold text-genix-navy mt-1">
                  Speak With A Care Coordinator Today
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Reach out anytime for daily living assistance, complex clinical care,
                  memory support, or multi-disciplinary healthcare staffing across
                  Metro Atlanta.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="tel:3344972713"
                  className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-genix-crimson transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-genix-crimson text-white flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      24/7 Phone &amp; Intake Line
                    </p>
                    <p className="font-heading text-lg font-extrabold text-genix-navy">
                      (334) 497-2713
                    </p>
                    <p className="text-xs text-slate-500">
                      Immediate assistance for families &amp; facility staffing managers
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:info@genixmss.com"
                  className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-genix-crimson transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-genix-navy text-white flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Email Clinical Coordination
                    </p>
                    <p className="font-heading text-lg font-extrabold text-genix-navy">
                      info@genixmss.com
                    </p>
                    <p className="text-xs text-slate-500">
                      Care quotes, hospital discharge records, and credential inquiries
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-11 h-11 rounded-xl bg-genix-blue text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Regional Headquarters
                    </p>
                    <p className="font-heading text-base font-extrabold text-genix-navy">
                      Lithia Springs, GA
                    </p>
                    <p className="text-xs text-slate-500">
                      Serving Douglas, Fulton, Cobb, DeKalb, Gwinnett, Clayton,
                      Cherokee, Forsyth, Fayette, Henry &amp; Rockdale Counties
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Clinical Dispatch Hours
                    </p>
                    <p className="font-heading text-base font-extrabold text-genix-navy">
                      24 Hours / 7 Days a Week
                    </p>
                    <p className="text-xs text-slate-500">
                      Office Consultations: Mon–Fri 8:00 AM – 6:00 PM • Urgent Staffing
                      &amp; On-Call RN: 24/7
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Portal Links */}
              <div className="p-5 rounded-2xl bg-genix-navy text-white space-y-3">
                <p className="font-heading text-sm font-bold text-amber-300">
                  Looking for a Specialized Portal?
                </p>
                <div className="flex flex-col gap-2 text-xs">
                  <Link
                    href="/facility-staffing"
                    className="inline-flex items-center gap-2 text-white/90 hover:text-amber-300 font-semibold"
                  >
                    <Building2 className="w-4 h-4 text-sky-400" />
                    <span>Healthcare Facility Staffing Request Portal →</span>
                  </Link>
                  <Link
                    href="/careers"
                    className="inline-flex items-center gap-2 text-white/90 hover:text-amber-300 font-semibold"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>RN, LPN, CNA &amp; Caregiver Job Application →</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Quote & Assessment Form */}
            <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-card">
              <div className="mb-6">
                <h2 className="font-heading text-2xl font-extrabold text-genix-navy">
                  Request a Free Quote or Clinical Assessment
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Complete the form below and a Genix Care Coordinator will contact you
                  to discuss your personalized care pathway or staffing timeline.
                </p>
              </div>
              <QuoteForm title="" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

