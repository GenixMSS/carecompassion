"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRightCircle, CheckCircle2 } from "lucide-react";
import { COUNTIES } from "@/data/locations";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubscribed(true);
      setEmail("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-white">
      {/* Newsletter Banner with Atlanta Night Skyline Background (matching screenshot) */}
      <section className="relative overflow-hidden py-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/cities/avalon-alpharetta-night.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-genix-navy/80 backdrop-blur-[2px]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300 mb-2">
            NEWSLETTER
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
            Get Notified By Subscribing
            <br />
            Our Newsletter
          </h2>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 px-6 py-3.5 rounded-full text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Thank you for subscribing to Genix Medical Staffing updates!</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-3 bg-black/40 border border-white/60 rounded-full p-2"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER YOUR EMAIL ADDRESS"
                className="w-full bg-transparent px-6 py-3 text-xs font-semibold tracking-wider text-white placeholder:text-white/70 focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-genix-navy hover:bg-genix-crimson px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors"
              >
                <span>{loading ? "SUBSCRIBING..." : "SUBSCRIBE"}</span>
                <ArrowRightCircle className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Main White Footer matching screenshot layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-200">
          {/* Column 1: Logo, Tagline & Socials */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block">
              <img
                src="/assets/services/Clean Logo White Background.webp"
                alt="Genix Home Health & Medical Staffing"
                className="h-32 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              Trusted partner for medical staffing and compassionate home care. We provide
              reliable, qualified professionals to meet your needs across Metro Atlanta.
              Count on Genix.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              {[
                { label: "Facebook", icon: "f", href: "https://facebook.com" },
                { label: "X", icon: "𝕏", href: "https://x.com" },
                { label: "Instagram", icon: "◎", href: "https://instagram.com" },
                { label: "LinkedIn", icon: "in", href: "https://linkedin.com" },
                { label: "YouTube", icon: "▶", href: "https://youtube.com" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700 hover:bg-genix-navy hover:text-white hover:border-genix-navy transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Links (matching screenshot) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-heading text-base font-bold text-genix-navy">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/services/home-care"
                  className="text-genix-blue hover:text-genix-crimson underline underline-offset-4 transition-colors"
                >
                  Home Care
                </Link>
              </li>
              <li>
                <Link
                  href="/services/memory-care"
                  className="text-genix-blue hover:text-genix-crimson underline underline-offset-4 transition-colors"
                >
                  Memory Care
                </Link>
              </li>
              <li>
                <Link
                  href="/services/specialized-care"
                  className="text-genix-blue hover:text-genix-crimson underline underline-offset-4 transition-colors"
                >
                  Specialized Care
                </Link>
              </li>
              <li>
                <Link
                  href="/services/daily-activities"
                  className="text-genix-blue hover:text-genix-crimson underline underline-offset-4 transition-colors"
                >
                  Daily Activities
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-genix-blue hover:text-genix-crimson underline underline-offset-4 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-genix-blue hover:text-genix-crimson underline underline-offset-4 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Portals & Service Areas */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-heading text-base font-bold text-genix-navy">
              Portals &amp; Service Areas
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link
                  href="/facility-staffing"
                  className="hover:text-genix-navy font-medium transition-colors"
                >
                  Facility Staffing Request Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-genix-navy font-medium transition-colors"
                >
                  Healthcare Careers &amp; Application
                </Link>
              </li>
              <li>
                <Link
                  href="/portal"
                  className="hover:text-genix-navy font-medium transition-colors"
                >
                  Family &amp; Client Care Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/service-areas"
                  className="hover:text-genix-navy font-medium transition-colors"
                >
                  Greater Atlanta Service Areas
                </Link>
              </li>
              <li className="pt-1 text-xs text-slate-500 leading-relaxed">
                 Counties Served:{" "}
                {COUNTIES.slice(0, 6).map((c, idx) => (
                  <span key={c.slug}>
                    <Link
                      href={`/service-areas/counties/${c.slug}`}
                      className="hover:text-genix-crimson underline"
                    >
                      {c.name.replace(" County", "")}
                    </Link>
                    {idx < 5 ? ", " : " & more"}
                  </span>
                ))}
              </li>
            </ul>
          </div>

          {/* Column 4: Get In Touch (matching screenshot) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-heading text-base font-bold text-genix-navy">
              Get In Touch
            </h3>
            <div className="space-y-2 text-sm text-slate-600">
              <p className="font-medium text-slate-800">Lithia Springs, GA</p>
              <p className="text-xs text-slate-500">
                Serving the Entire Greater Atlanta Metro Area
              </p>
              <p className="pt-1">
                <a
                  href="tel:3344972713"
                  className="font-bold text-genix-navy hover:text-genix-crimson transition-colors"
                >
                  (334) 497-2713
                </a>
              </p>
              <div className="pt-2">
                <p className="text-xs text-slate-500">Send us an email</p>
                <a
                  href="mailto:info@genixmss.com"
                  className="font-semibold text-genix-navy hover:text-genix-crimson transition-colors"
                >
                  info@genixmss.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Genix Medical Staffing Services (GenixMSS). All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/terms" className="hover:text-genix-navy transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-genix-navy transition-colors">
              Privacy Policy
            </Link>
            <Link href="/license" className="hover:text-genix-navy transition-colors">
              Clinical Licensing &amp; Compliance
            </Link>
            <Link href="/admin" className="hover:text-genix-navy transition-colors font-semibold">
              Staff Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

