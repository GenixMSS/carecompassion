import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRightCircle,
  CheckCircle2,
  ChevronRight,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import {
  SERVICE_PILLARS,
  getPillarBySlug,
  getSubServiceBySlugs,
} from "@/data/services";
import { QuoteForm } from "@/components/QuoteForm";

interface SubServicePageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { category: string; slug: string }[] = [];
  for (const pillar of SERVICE_PILLARS) {
    for (const sub of pillar.subServices) {
      params.push({
        category: pillar.slug,
        slug: sub.slug,
      });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: SubServicePageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const service = getSubServiceBySlugs(category, slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | ${service.categoryName} in Metro Atlanta`,
    description: service.summary,
  };
}

export default async function SubServiceDetailPage({
  params,
}: SubServicePageProps) {
  const { category, slug } = await params;
  const pillar = getPillarBySlug(category);
  const service = getSubServiceBySlugs(category, slug);

  if (!pillar || !service) {
    notFound();
  }

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="relative py-20 bg-genix-navy text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url('${service.image}')` }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-xs text-white/75 mb-6">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/services" className="hover:text-white">
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/services/${pillar.slug}`} className="hover:text-white">
              {pillar.title}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-amber-300 font-bold">{service.shortTitle}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-block rounded-full bg-genix-crimson px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
                {pillar.title} Pathway
              </span>
              <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                {service.title}
              </h1>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                {service.heroDescription}
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href="#book-service"
                  className="inline-flex items-center gap-2 rounded-full bg-amber-400 hover:bg-amber-300 text-genix-navy px-7 py-3.5 text-xs font-extrabold uppercase tracking-wider transition-all"
                >
                  <span>SCHEDULE FREE ASSESSMENT</span>
                  <ArrowRightCircle className="w-4 h-4" />
                </a>
                <a href="tel:3344972713" className="btn-outline-white">
                  <Phone className="w-3.5 h-3.5" />
                  <span>CALL (334) 497-2713</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 h-80 bg-slate-900">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT + SIDEBAR */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Clinical Content (8 Cols) */}
            <div className="lg:col-span-8 space-y-12">
              {/* Clinical Highlights Box */}
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-5">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-6 h-6 text-genix-crimson" />
                  <h2 className="font-heading text-2xl font-extrabold text-genix-navy">
                    Why Families Choose Genix for {service.shortTitle}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {service.summary}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {service.clinicalHighlights.map((hl) => (
                    <div
                      key={hl}
                      className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white border border-slate-200/70"
                    >
                      <CheckCircle2 className="w-4 h-4 text-genix-blue shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-slate-700 leading-snug">
                        {hl}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What Is Included Grid */}
              <div className="space-y-6">
                <div>
                  <p className="section-eyebrow">COMPREHENSIVE CARE DELIVERABLES</p>
                  <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-genix-navy mt-1">
                    What Is Included in Our {service.shortTitle} Program
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {service.whatIsIncluded.map((item, idx) => (
                    <div
                      key={item.title}
                      className="p-6 rounded-2xl border border-slate-200 hover:border-genix-navy transition-colors space-y-2.5"
                    >
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-genix-navy text-white font-heading font-bold text-xs">
                        0{idx + 1}
                      </span>
                      <h3 className="font-heading text-base font-bold text-genix-navy">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Who It Helps + Secondary Image */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8 rounded-2xl bg-genix-navy text-white">
                <div className="md:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                    <Users className="w-4 h-4" />
                    <span>IDEAL CANDIDATES FOR CARE</span>
                  </div>
                  <h3 className="font-heading text-2xl font-extrabold text-white">
                    Who Benefits Most From {service.shortTitle}?
                  </h3>
                  <ul className="space-y-2.5">
                    {service.whoItHelps.map((who) => (
                      <li
                        key={who}
                        className="flex items-start gap-2.5 text-xs text-white/90"
                      >
                        <Sparkles className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                        <span>{who}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-5">
                  <div className="rounded-xl overflow-hidden h-56 border-2 border-white/20">
                    <img
                      src={service.secondaryImage || service.image}
                      alt={service.shortTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Service-Specific FAQs */}
              <div className="space-y-5">
                <h2 className="font-heading text-2xl font-extrabold text-genix-navy">
                  Frequently Asked Questions About {service.shortTitle}
                </h2>
                <div className="space-y-4">
                  {service.faqs.map((faq) => (
                    <div
                      key={faq.question}
                      className="p-6 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2"
                    >
                      <h3 className="font-heading text-sm font-bold text-genix-navy">
                        {faq.question}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar (4 Cols): Other Services in Pillar + Sticky CTA */}
            <aside className="lg:col-span-4 space-y-8">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h3 className="font-heading text-base font-bold text-genix-navy border-b border-slate-200 pb-3">
                  More in {pillar.title}
                </h3>
                <ul className="space-y-2">
                  {pillar.subServices.map((sibling) => {
                    const active = sibling.slug === service.slug;
                    return (
                      <li key={sibling.slug}>
                        <Link
                          href={`/services/${pillar.slug}/${sibling.slug}`}
                          className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                            active
                              ? "bg-genix-navy text-white"
                              : "bg-white text-slate-700 hover:bg-genix-blue hover:text-white border border-slate-200/60"
                          }`}
                        >
                          <span>{sibling.shortTitle}</span>
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-genix-blue text-white space-y-4">
                <p className="text-[11px] font-bold uppercase tracking-widest text-amber-300">
                  THE GENIX PROVEN CARE METHOD
                </p>
                <h3 className="font-heading text-xl font-extrabold text-white">
                  Ready to Build Your Loved One&apos;s Care Plan?
                </h3>
                <p className="text-xs text-white/85 leading-relaxed">
                  Every {service.shortTitle} plan starts with a complimentary in-home or
                  virtual clinical assessment.
                </p>
                <a
                  href="tel:3344972713"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white text-genix-navy py-3 text-xs font-extrabold uppercase tracking-wider hover:bg-amber-300 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-genix-crimson" />
                  <span>(334) 497-2713</span>
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 3. PRE-SELECTED QUOTE FORM */}
      <section id="book-service" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-2xl p-8 sm:p-12 shadow-card border border-slate-200">
          <div className="mb-8 space-y-2">
            <p className="section-eyebrow">BOOK YOUR COMPLIMENTARY ASSESSMENT</p>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-genix-navy">
              Inquire About {service.title}
            </h2>
            <p className="text-xs text-slate-600">
              We have pre-selected <strong>{service.shortTitle}</strong> below. Tell us
              your preferred consultation date and a Care Coordinator will confirm right
              away.
            </p>
          </div>
          <QuoteForm
            defaultCategory={pillar.slug}
            defaultSubService={service.slug}
            title=""
          />
        </div>
      </section>
    </div>
  );
}

