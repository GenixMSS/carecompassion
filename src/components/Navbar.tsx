"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ArrowRightCircle,
  Menu,
  X,
  Home,
  Brain,
  Stethoscope,
  HeartHandshake,
  MapPin,
  Briefcase,
  Building2,
  ShieldCheck,
} from "lucide-react";
import { SERVICE_PILLARS } from "@/data/services";
import { COUNTIES } from "@/data/locations";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);

  const getPillarIcon = (slug: string) => {
    switch (slug) {
      case "home-care":
        return <Home className="w-4 h-4 text-genix-crimson" />;
      case "memory-care":
        return <Brain className="w-4 h-4 text-genix-blue" />;
      case "specialized-care":
        return <Stethoscope className="w-4 h-4 text-emerald-600" />;
      default:
        return <HeartHandshake className="w-4 h-4 text-amber-600" />;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/assets/services/Genix Home Health Care & Medical Staffing Clean Logo.webp"
            alt="Genix Medical Staffing Services Logo"
            className="h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
          <div className="hidden sm:block">
            <span className="block font-heading font-extrabold text-lg leading-none text-genix-navy tracking-tight">
              GENIX <span className="text-genix-crimson">MSS</span>
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-widest text-slate-500 mt-0.5">
              Medical Staffing &amp; Home Care
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-genix-navy">
          <Link
            href="/"
            className={`hover:text-genix-crimson transition-colors py-2 ${
              pathname === "/" ? "text-genix-crimson" : ""
            }`}
          >
            Home
          </Link>

          <Link
            href="/about"
            className={`hover:text-genix-crimson transition-colors py-2 ${
              pathname === "/about" ? "text-genix-crimson" : ""
            }`}
          >
            About
          </Link>

          {/* Services Mega-Menu Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              href="/services"
              className={`inline-flex items-center gap-1 hover:text-genix-crimson transition-colors py-6 ${
                pathname.startsWith("/services") ? "text-genix-crimson" : ""
              }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  servicesOpen ? "rotate-180 text-genix-crimson" : ""
                }`}
              />
            </Link>

            {servicesOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-[920px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 grid grid-cols-4 gap-6 normal-case tracking-normal">
                {SERVICE_PILLARS.map((pillar) => (
                  <div key={pillar.slug} className="space-y-3">
                    <Link
                      href={`/services/${pillar.slug}`}
                      className="flex items-center gap-2 font-heading font-bold text-sm text-genix-navy hover:text-genix-crimson border-b border-slate-100 pb-2"
                    >
                      {getPillarIcon(pillar.slug)}
                      <span>{pillar.title}</span>
                    </Link>
                    <ul className="space-y-1.5">
                      {pillar.subServices.map((sub) => (
                        <li key={sub.slug}>
                          <Link
                            href={`/services/${pillar.slug}/${sub.slug}`}
                            className="block text-xs font-medium text-slate-600 hover:text-genix-navy hover:translate-x-1 transition-all py-0.5"
                          >
                            • {sub.shortTitle}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div className="col-span-4 mt-2 pt-4 border-t border-slate-100 flex items-center justify-between bg-slate-50 -mx-6 -mb-6 px-6 py-3.5 rounded-b-2xl">
                  <div className="flex items-center gap-6 text-xs font-semibold text-slate-600">
                    <Link
                      href="/facility-staffing"
                      className="inline-flex items-center gap-1.5 hover:text-genix-navy"
                    >
                      <Building2 className="w-4 h-4 text-genix-blue" />
                      <span>Hospital &amp; Facility Staffing Solutions →</span>
                    </Link>
                    <Link
                      href="/portal"
                      className="inline-flex items-center gap-1.5 hover:text-genix-navy"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>The Genix Proven Care Method →</span>
                    </Link>
                  </div>
                  <Link
                    href="/services"
                    className="text-xs font-bold uppercase tracking-wider text-genix-crimson hover:underline"
                  >
                    View All 25+ Clinical Services →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Service Areas Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setAreasOpen(true)}
            onMouseLeave={() => setAreasOpen(false)}
          >
            <Link
              href="/service-areas"
              className={`inline-flex items-center gap-1 hover:text-genix-crimson transition-colors py-6 ${
                pathname.startsWith("/service-areas") ? "text-genix-crimson" : ""
              }`}
            >
              <span>Service Areas</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  areasOpen ? "rotate-180 text-genix-crimson" : ""
                }`}
              />
            </Link>

            {areasOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-[540px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 normal-case tracking-normal">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                  <div>
                    <p className="font-heading font-bold text-sm text-genix-navy">
                      Greater Atlanta Metro Coverage
                    </p>
                    <p className="text-xs text-slate-500">
                      Serving 11 Counties &amp; 50+ Georgia Cities from our Lithia Springs HQ
                    </p>
                  </div>
                  <Link
                    href="/service-areas"
                    className="text-xs font-bold text-genix-crimson hover:underline"
                  >
                    Interactive Map →
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {COUNTIES.map((county) => (
                    <Link
                      key={county.slug}
                      href={`/service-areas/counties/${county.slug}`}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5 text-genix-crimson shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-genix-navy">{county.name}</p>
                        <p className="text-[11px] text-slate-500 truncate max-w-[190px]">
                          {county.featuredCities.slice(0, 3).join(", ")}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/careers"
            className={`hover:text-genix-crimson transition-colors py-2 ${
              pathname === "/careers" ? "text-genix-crimson" : ""
            }`}
          >
            Careers
          </Link>

          <Link
            href="/blog"
            className={`hover:text-genix-crimson transition-colors py-2 ${
              pathname.startsWith("/blog") ? "text-genix-crimson" : ""
            }`}
          >
            News
          </Link>

          <Link
            href="/contact"
            className={`hover:text-genix-crimson transition-colors py-2 ${
              pathname === "/contact" ? "text-genix-crimson" : ""
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right CTA Button matching screenshot */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/contact#quote-form" className="btn-primary">
            <span>GET A QUOTE</span>
            <ArrowRightCircle className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-genix-navy hover:bg-slate-100"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-4 pb-6 space-y-4 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-2 text-sm font-bold text-genix-navy">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-100"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-100"
            >
              About Us
            </Link>
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-100"
            >
              All Services (25+ Programs)
            </Link>
            <div className="pl-3 space-y-2 py-1 border-b border-slate-100">
              {SERVICE_PILLARS.map((pillar) => (
                <Link
                  key={pillar.slug}
                  href={`/services/${pillar.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-semibold text-slate-600 hover:text-genix-crimson"
                >
                  → {pillar.title} ({pillar.subServices.length} Services)
                </Link>
              ))}
            </div>
            <Link
              href="/service-areas"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-100"
            >
              Greater Atlanta Service Areas
            </Link>
            <Link
              href="/facility-staffing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-100 flex items-center gap-2 text-genix-blue"
            >
              <Building2 className="w-4 h-4" />
              <span>Facility Staffing Portal</span>
            </Link>
            <Link
              href="/careers"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-100 flex items-center gap-2 text-emerald-700"
            >
              <Briefcase className="w-4 h-4" />
              <span>Careers &amp; Job Application</span>
            </Link>
            <Link
              href="/portal"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-100 flex items-center gap-2 text-amber-700"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Family &amp; Client Care Portal</span>
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-100"
            >
              News &amp; Healthcare Insights
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-100"
            >
              Contact Us
            </Link>
          </div>
          <Link
            href="/contact#quote-form"
            onClick={() => setMobileMenuOpen(false)}
            className="btn-primary w-full"
          >
            <span>GET A FREE QUOTE</span>
            <ArrowRightCircle className="w-4 h-4" />
          </Link>
        </div>
      )}
    </header>
  );
}

