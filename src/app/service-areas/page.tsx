import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRightCircle, Building2, CheckCircle2 } from "lucide-react";
import { COUNTIES, CITIES } from "@/data/locations";
import { QuoteForm } from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Greater Atlanta Metro Service Areas | 11 Counties & 50+ Georgia Cities",
  description:
    "Genix Medical Staffing Services provides home care, memory care, specialized clinical support, and medical staffing across Lithia Springs, Atlanta, Marietta, Alpharetta, Decatur, and 50+ Georgia cities.",
};

export default function ServiceAreasHubPage() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="relative py-20 bg-genix-navy text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage: "url('/assets/cities/Atlanta_cityscape.jpg')",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">
            LITHIA SPRINGS HQ &amp; GREATER ATLANTA METRO
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white">
            Where We Deliver Exceptional Care
          </h1>
          <p className="text-sm sm:text-base text-white/85 max-w-2xl mx-auto leading-relaxed">
            From our regional headquarters in Lithia Springs, Genix Medical Staffing
            Services dispatches vetted caregivers, CNAs, LPNs, and RNs across 11
            Georgia counties and more than 50 vibrant Metro Atlanta communities.
          </p>
        </div>
      </section>

      {/* Map + Regional Overview */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <p className="section-eyebrow">REGIONAL CLINICAL NETWORK</p>
            <h2 className="font-heading text-3xl font-extrabold text-genix-navy">
              Rapid 24–48 Hour Caregiver &amp; Nurse Dispatch Across Metro Atlanta
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Because our caregivers and nurses live in the very neighborhoods we serve,
              we minimize commute friction, ensure reliable on-time shift arrivals, and
              coordinate seamlessly with local hospitals including Wellstar, Piedmont,
              Northside, Grady, Emory, and CHOA.
            </p>
            <ul className="space-y-2 pt-2">
              {[
                "In-Home Daily Living, Personal Care & Companionship",
                "Alzheimer's, Lewy Body & Vascular Dementia Memory Care",
                "Hospital-to-Home Discharge & Post-Stroke Rehabilitation",
                "24/7 Facility Staffing for Hospitals, Clinics & Senior Living",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-xs font-semibold text-genix-navy"
                >
                  <CheckCircle2 className="w-4 h-4 text-genix-crimson shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-card">
              <img
                src="/assets/services/Atlanta Metro Map.webp"
                alt="Greater Atlanta Metro Coverage Map"
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 11 Counties Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <p className="section-eyebrow">COUNTY-BY-COUNTY COVERAGE</p>
            <h2 className="font-heading text-3xl font-extrabold text-genix-navy">
              Greater Atlanta Counties We Serve
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {COUNTIES.map((county) => (
              <Link
                key={county.slug}
                href={`/service-areas/counties/${county.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all flex flex-col"
              >
                <div className="h-44 overflow-hidden relative bg-slate-100">
                  <img
                    src={county.image}
                    alt={county.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full bg-genix-navy/90 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                    County Seat: {county.seat}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col space-y-3">
                  <h3 className="font-heading text-lg font-bold text-genix-navy group-hover:text-genix-crimson transition-colors">
                    {county.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed flex-1">
                    {county.summary}
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-genix-blue group-hover:text-genix-crimson">
                    <span>Explore {county.name} Care</span>
                    <ArrowRightCircle className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 50+ Georgia Cities Directory */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <p className="section-eyebrow">MUNICIPAL &amp; NEIGHBORHOOD DIRECTORY</p>
            <h2 className="font-heading text-3xl font-extrabold text-genix-navy">
              Georgia Cities &amp; Communities Served
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Select your city below to view local care programs, hospital transitional
              support, and community photography.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/cities/${city.slug}`}
                className="group rounded-xl overflow-hidden border border-slate-200 hover:border-genix-navy bg-white hover:shadow-card transition-all flex flex-col"
              >
                <div className="h-32 overflow-hidden relative bg-slate-100">
                  <img
                    src={city.image}
                    alt={`${city.name}, Georgia`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {city.isHeadquarters && (
                    <span className="absolute top-2 right-2 rounded-full bg-genix-crimson text-white px-2.5 py-0.5 text-[10px] font-bold uppercase">
                      Genix HQ
                    </span>
                  )}
                </div>
                <div className="p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-sm font-bold text-genix-navy group-hover:text-genix-crimson">
                      {city.name}, GA
                    </h3>
                    <MapPin className="w-3.5 h-3.5 text-genix-crimson shrink-0" />
                  </div>
                  <p className="text-[11px] text-slate-500">{city.county}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Consultation Intake */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-2xl p-8 sm:p-12 shadow-card border border-slate-200">
          <div className="mb-8 space-y-2 text-center">
            <p className="section-eyebrow">CHECK LOCAL AVAILABILITY</p>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-genix-navy">
              Request Care or Staffing in Your Neighborhood
            </h2>
          </div>
          <QuoteForm title="" />
        </div>
      </section>
    </div>
  );
}

