import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightCircle, CheckCircle2, ShieldCheck, Building2 } from "lucide-react";
import { SERVICE_PILLARS } from "@/data/services";
import { QuoteForm } from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Clinical & Home Care Services Hub | 25+ Specialized Programs",
  description:
    "Explore Genix Medical Staffing Services' 4 core care pillars—Home Care, Memory Care, Specialized Clinical Care, and Daily Living Activities—plus healthcare facility staffing across Metro Atlanta.",
};

export default function ServicesHubPage() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="relative py-20 bg-genix-navy text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage: "url('/assets/services/Care Options Page Image.png')",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">
            PERSONALIZED CARE PATHWAYS &amp; CLINICAL STAFFING
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white">
            Comprehensive Home Care &amp; Medical Staffing Solutions
          </h1>
          <p className="text-sm sm:text-base text-white/85 max-w-2xl mx-auto leading-relaxed">
            Access, coordinate, and utilize over 30 clinical specializations and
            in-home support programs within one integrated Genix care plan.
          </p>
        </div>
      </section>

      {/* 4 Service Pillars Detailed Breakdown */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {SERVICE_PILLARS.map((pillar, index) => (
            <div
              key={pillar.slug}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pb-16 border-b border-slate-200 last:border-none last:pb-0`}
            >
              {/* Image & Pillar Summary */}
              <div
                className={`lg:col-span-5 space-y-5 ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <div className="rounded-2xl overflow-hidden shadow-card border border-slate-100 h-72">
                  <img
                    src={pillar.heroImage}
                    alt={pillar.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <span className="section-eyebrow">CARE PILLAR 0{index + 1}</span>
                  <h2 className="font-heading text-3xl font-extrabold text-genix-navy">
                    {pillar.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div>
                  <Link href={`/services/${pillar.slug}`} className="btn-primary">
                    <span>EXPLORE {pillar.title.toUpperCase()}</span>
                    <ArrowRightCircle className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Sub-Services Cards Grid */}
              <div
                className={`lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 ${
                  index % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                {pillar.subServices.map((sub) => (
                  <Link
                    key={sub.slug}
                    href={`/services/${pillar.slug}/${sub.slug}`}
                    className="group p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-genix-navy hover:shadow-card transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="h-32 rounded-lg overflow-hidden bg-slate-200 mb-3">
                        <img
                          src={sub.image}
                          alt={sub.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-heading text-sm font-bold text-genix-navy group-hover:text-genix-crimson transition-colors">
                        {sub.shortTitle}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {sub.summary}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-genix-blue group-hover:text-genix-crimson mt-3">
                      <span>View Program Details</span>
                      <ArrowRightCircle className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Facility Staffing Callout Banner */}
      <section className="py-16 bg-genix-blue text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300">
              <Building2 className="w-4 h-4" />
              <span>HOSPITAL, CLINIC &amp; LONG-TERM CARE STAFFING</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
              Need Vetted RNs, LPNs, CNAs, or Allied Health Staff for Your Facility?
            </h2>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
              We maintain an active bench of credentialed medical professionals ready
              for 24–48 hour rapid deployment across Metro Atlanta healthcare facilities.
            </p>
          </div>
          <Link href="/facility-staffing" className="btn-outline-white shrink-0">
            <span>OPEN FACILITY STAFFING PORTAL</span>
            <ArrowRightCircle className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Bottom Consultation Intake */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-2xl p-8 sm:p-12 shadow-card border border-slate-200">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <p className="section-eyebrow">FREE CLINICAL CONSULTATION</p>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-genix-navy">
              Not Sure Which Care Pathway Fits Best?
            </h2>
            <p className="text-xs text-slate-600">
              Schedule a complimentary Comprehensive Clinical Assessment with our care
              coordination team.
            </p>
          </div>
          <QuoteForm title="" />
        </div>
      </section>
    </div>
  );
}

