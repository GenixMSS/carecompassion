import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRightCircle, CheckCircle2, ChevronRight } from "lucide-react";
import { SERVICE_PILLARS, getPillarBySlug } from "@/data/services";
import { QuoteForm } from "@/components/QuoteForm";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return SERVICE_PILLARS.map((pillar) => ({
    category: pillar.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const pillar = getPillarBySlug(category);
  if (!pillar) return { title: "Service Category Not Found" };

  return {
    title: `${pillar.title} Services in Metro Atlanta`,
    description: pillar.description,
    alternates: {
      canonical: `/services/${pillar.slug}`,
    },
    openGraph: {
      title: `${pillar.title} Solutions | Genix Medical Staffing Services`,
      description: pillar.description,
      url: `https://genixmss.com/services/${pillar.slug}`,
      images: [pillar.heroImage],
    },
  };
}

export default async function ServiceCategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const pillar = getPillarBySlug(category);

  if (!pillar) {
    notFound();
  }

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative py-20 bg-genix-navy text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('${pillar.heroImage}')` }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <nav className="flex items-center gap-2 text-xs text-white/75">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/services" className="hover:text-white">
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-amber-300 font-bold">{pillar.title}</span>
          </nav>

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
            GENIX CARE PATHWAYS
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white">
            {pillar.title} Solutions
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
            {pillar.description}
          </p>
        </div>
      </section>

      {/* Sub-Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12 space-y-2">
            <p className="section-eyebrow">{pillar.cardHeadline}</p>
            <h2 className="font-heading text-3xl font-extrabold text-genix-navy">
              {pillar.cardSubtitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Select any specialized program below to view clinical highlights, what is
              included, and how our caregivers support your family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillar.subServices.map((sub) => (
              <div
                key={sub.slug}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all flex flex-col group"
              >
                <Link
                  href={`/services/${pillar.slug}/${sub.slug}`}
                  className="block h-52 overflow-hidden bg-slate-100"
                >
                  <img
                    src={sub.image}
                    alt={sub.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <div className="p-6 flex-1 flex flex-col space-y-3">
                  <h3 className="font-heading text-lg font-bold text-genix-navy group-hover:text-genix-crimson transition-colors">
                    <Link href={`/services/${pillar.slug}/${sub.slug}`}>
                      {sub.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed flex-1">
                    {sub.summary}
                  </p>
                  <ul className="space-y-1.5 pt-2 border-t border-slate-100">
                    {sub.clinicalHighlights.slice(0, 2).map((hl) => (
                      <li
                        key={hl}
                        className="flex items-start gap-2 text-[11px] text-slate-600"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-genix-blue shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3">
                    <Link
                      href={`/services/${pillar.slug}/${sub.slug}`}
                      className="btn-primary w-full"
                    >
                      <span>EXPLORE {sub.shortTitle.toUpperCase()}</span>
                      <ArrowRightCircle className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-Selected Category Quote Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-2xl p-8 sm:p-12 shadow-card border border-slate-200">
          <div className="mb-8 space-y-2">
            <p className="section-eyebrow">TAILORED {pillar.cardHeadline} PLAN</p>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-genix-navy">
              Request a Free {pillar.title} Consultation
            </h2>
            <p className="text-xs text-slate-600">
              Our care coordination team will evaluate your family&apos;s exact needs and
              design a custom schedule.
            </p>
          </div>
          <QuoteForm defaultCategory={pillar.slug} title="" />
        </div>
      </section>
    </div>
  );
}

