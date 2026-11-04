import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  ChevronRight,
  CheckCircle2,
  ArrowRightCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { CITIES, getCityBySlug, getCountyBySlug } from "@/data/locations";
import { SERVICE_PILLARS } from "@/data/services";
import { QuoteForm } from "@/components/QuoteForm";

interface CityPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CITIES.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return { title: "City Not Found" };

  return {
    title: `In-Home Senior Care, Memory Care & Medical Staffing in ${city.name}, GA`,
    description: `${city.tagline}. Genix Medical Staffing Services provides 24/7 home care, Alzheimer's care, hospital-to-home recovery, and nurse staffing in ${city.name}, Georgia (${city.zipCodes.join(", ")}).`,
  };
}

export default async function CityDetailPage({ params }: CityPageProps) {
  const { slug } = await params;
  const city = getCityBySlug(slug);

  if (!city) {
    notFound();
  }

  const parentCounty = getCountyBySlug(city.countySlug);
  const nearbyCities = CITIES.filter(
    (c) => c.countySlug === city.countySlug && c.slug !== city.slug
  ).slice(0, 8);

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative py-20 bg-genix-navy text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url('${city.image}')` }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-xs text-white/75 mb-6">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/service-areas" className="hover:text-white">
              Service Areas
            </Link>
            {parentCounty && (
              <>
                <ChevronRight className="w-3.5 h-3.5" />
                <Link
                  href={`/service-areas/counties/${parentCounty.slug}`}
                  className="hover:text-white"
                >
                  {parentCounty.name}
                </Link>
              </>
            )}
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-amber-300 font-bold">{city.name}, GA</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-genix-crimson px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>
                  {city.name}, Georgia • {city.county}
                </span>
              </div>
              <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                Compassionate Home Care &amp; Medical Staffing in {city.name}, GA
              </h1>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                {city.tagline}. Whether your family in{" "}
                <strong>{city.name}</strong> ({city.zipCodes.join(", ")}) is seeking
                daily companionship, specialized Alzheimer&apos;s and memory care,
                post-hospital transitional recovery, or 24/7 clinical staffing, Genix
                Medical Staffing Services delivers hospital-grade peace of mind right
                to your doorstep.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href="#city-quote"
                  className="inline-flex items-center gap-2 rounded-full bg-amber-400 hover:bg-amber-300 text-genix-navy px-7 py-3.5 text-xs font-extrabold uppercase tracking-wider transition-all"
                >
                  <span>GET A FREE {city.name.toUpperCase()} QUOTE</span>
                  <ArrowRightCircle className="w-4 h-4" />
                </a>
                <a href="tel:3344972713" className="btn-outline-white">
                  <Phone className="w-3.5 h-3.5" />
                  <span>CALL (334) 497-2713</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 h-72 bg-slate-900">
                <img
                  src={city.image}
                  alt={`${city.name}, Georgia`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personalized Care Pathways in City */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <p className="section-eyebrow">LOCAL {city.name.toUpperCase()} CARE TEAM</p>
              <h2 className="font-heading text-3xl font-extrabold text-genix-navy">
                Why {city.name} Families &amp; Facilities Trust Genix MSS
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Finding the right home care provider in {city.name} is a crucial
                decision. You need a partner with extensive clinical experience in
                matching vetted caregivers and nurses with individuals of all ages and
                acuity levels. Using <strong>The Genix Proven Care Method</strong>, we
                begin with a Comprehensive Clinical Assessment at your home in{" "}
                {city.name}, followed by Strategic Care Coordination and Continuous
                Care Delivery.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  `Rapid 24–48 hour caregiver placement across ${city.name} (${city.zipCodes.join(", ")})`,
                  "Background-checked, licensed & insured caregivers, CNAs, LPNs & RNs",
                  "Real-time family portal updates on daily vitals, meals & shift notes",
                  "Flexible scheduling from 4-hour visits to 24/7 around-the-clock care",
                ].map((pt) => (
                  <div
                    key={pt}
                    className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-genix-crimson shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl bg-genix-navy text-white space-y-4">
              <ShieldCheck className="w-8 h-8 text-amber-300" />
              <h3 className="font-heading text-xl font-bold text-white">
                {city.name} ZIP Codes &amp; Hospital Transitions
              </h3>
              <p className="text-xs text-white/85 leading-relaxed">
                Primary ZIP Codes Served:{" "}
                <strong className="text-amber-300">{city.zipCodes.join(", ")}</strong>
              </p>
              {parentCounty && (
                <div className="space-y-1.5 text-xs text-white/85">
                  <p className="font-bold text-white">
                    Coordinated Hospital Discharges Near {city.name}:
                  </p>
                  <ul className="list-disc pl-4 space-y-1">
                    {parentCounty.hospitalSystemsNearby.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* 4 Service Pillars Grid for City */}
          <div className="space-y-6">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-genix-navy text-center">
              Home Care &amp; Clinical Services in {city.name}, GA
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICE_PILLARS.map((pillar) => (
                <div
                  key={pillar.slug}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col space-y-3"
                >
                  <h3 className="font-heading text-base font-extrabold text-genix-navy">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Available in {city.name}, GA:
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700 flex-1">
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
                </div>
              ))}
            </div>
          </div>

          {/* Nearby Cities in Same County */}
          {nearbyCities.length > 0 && (
            <div className="pt-8 border-t border-slate-200 space-y-4">
              <h3 className="font-heading text-lg font-bold text-genix-navy">
                Nearby Communities We Also Serve in {city.county}:
              </h3>
              <div className="flex flex-wrap gap-2">
                {nearbyCities.map((nc) => (
                  <Link
                    key={nc.slug}
                    href={`/service-areas/cities/${nc.slug}`}
                    className="px-4 py-2 rounded-full bg-slate-100 hover:bg-genix-navy text-xs font-bold text-genix-navy hover:text-white transition-colors"
                  >
                    {nc.name}, GA
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Quote Form */}
      <section id="city-quote" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-2xl p-8 sm:p-12 shadow-card border border-slate-200">
          <div className="mb-8 space-y-2">
            <p className="section-eyebrow">FREE {city.name.toUpperCase()} CONSULTATION</p>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-genix-navy">
              Request Care or Medical Staffing in {city.name}, GA
            </h2>
          </div>
          <QuoteForm title="" />
        </div>
      </section>
    </div>
  );
}

