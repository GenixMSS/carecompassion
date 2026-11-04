import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  ChevronRight,
  Building2,
  CheckCircle2,
  ArrowRightCircle,
  Phone,
} from "lucide-react";
import { COUNTIES, CITIES, getCountyBySlug } from "@/data/locations";
import { SERVICE_PILLARS } from "@/data/services";
import { QuoteForm } from "@/components/QuoteForm";

interface CountyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return COUNTIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CountyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const county = getCountyBySlug(slug);
  if (!county) return { title: "County Not Found" };

  return {
    title: `Home Care & Medical Staffing in ${county.name}, GA`,
    description: county.summary,
  };
}

export default async function CountyDetailPage({ params }: CountyPageProps) {
  const { slug } = await params;
  const county = getCountyBySlug(slug);

  if (!county) {
    notFound();
  }

  const citiesInCounty = CITIES.filter((c) => c.countySlug === county.slug);

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 bg-genix-navy text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url('${county.image}')` }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-white/75 mb-6">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/service-areas" className="hover:text-white">
              Service Areas
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-amber-300 font-bold">{county.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-genix-crimson px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>County Seat: {county.seat}, GA</span>
              </span>
              <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                Home Care &amp; Medical Staffing in {county.name}, Georgia
              </h1>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                {county.summary}
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href="#county-quote"
                  className="inline-flex items-center gap-2 rounded-full bg-amber-400 hover:bg-amber-300 text-genix-navy px-7 py-3.5 text-xs font-extrabold uppercase tracking-wider transition-all"
                >
                  <span>REQUEST {county.name.toUpperCase()} CARE</span>
                  <ArrowRightCircle className="w-4 h-4" />
                </a>
                <a href="tel:3344972713" className="btn-outline-white">
                  <Phone className="w-3.5 h-3.5" />
                  <span>(334) 497-2713</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 h-72 bg-slate-900">
                <img
                  src={county.image}
                  alt={county.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Hospitals & Cities Served */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-6 p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-6 h-6 text-genix-blue" />
                <h2 className="font-heading text-xl font-extrabold text-genix-navy">
                  Hospital-to-Home &amp; Facility Coverage Near {county.name}
                </h2>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Genix coordinates smooth hospital discharges, bedside advocacy, and
                supplemental nurse staffing across regional medical centers serving{" "}
                {county.name} residents:
              </p>
              <ul className="space-y-2.5">
                {county.hospitalSystemsNearby.map((hosp) => (
                  <li
                    key={hosp}
                    className="flex items-center gap-2.5 text-xs font-bold text-genix-navy bg-white p-3 rounded-xl border border-slate-200/70"
                  >
                    <CheckCircle2 className="w-4 h-4 text-genix-crimson shrink-0" />
                    <span>{hosp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <p className="section-eyebrow">MUNICIPALITIES IN {county.name.toUpperCase()}</p>
              <h2 className="font-heading text-2xl font-extrabold text-genix-navy">
                Cities &amp; Neighborhoods We Serve in {county.name}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Click any community below for localized caregiver dispatch details:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {citiesInCounty.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/service-areas/cities/${city.slug}`}
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-genix-navy hover:shadow-card transition-all group"
                  >
                    <img
                      src={city.image}
                      alt={city.name}
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div>
                      <p className="font-heading text-sm font-bold text-genix-navy group-hover:text-genix-crimson">
                        {city.name}, GA
                      </p>
                      <p className="text-[11px] text-slate-500">
                        ZIP: {city.zipCodes.slice(0, 3).join(", ")}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Care Programs Available in County */}
          <div className="space-y-6">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-genix-navy text-center">
              Care &amp; Staffing Programs Available in {county.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICE_PILLARS.map((pillar) => (
                <div
                  key={pillar.slug}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col"
                >
                  <h3 className="font-heading text-base font-extrabold text-genix-navy">
                    {pillar.title} in {county.name}
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-600 flex-1">
                    {pillar.subServices.map((sub) => (
                      <li key={sub.slug}>
                        <Link
                          href={`/services/${pillar.slug}/${sub.slug}`}
                          className="hover:text-genix-crimson hover:underline"
                        >
                          • {sub.shortTitle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/services/${pillar.slug}`}
                    className="text-xs font-bold text-genix-blue hover:text-genix-crimson pt-2 inline-block"
                  >
                    View {pillar.title} →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Intake */}
      <section id="county-quote" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-2xl p-8 sm:p-12 shadow-card border border-slate-200">
          <div className="mb-8 space-y-2">
            <p className="section-eyebrow">{county.name.toUpperCase()} DISPATCH</p>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-genix-navy">
              Schedule a Free Clinical Assessment in {county.name}
            </h2>
          </div>
          <QuoteForm title="" />
        </div>
      </section>
    </div>
  );
}

