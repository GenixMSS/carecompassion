import Link from "next/link";
import { Phone, Mail, MapPin, ShieldCheck, UserCheck, Building2, Lock } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-genix-navy text-white border-b border-white/10 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Phone, Email, Location */}
        <div className="flex flex-wrap items-center gap-5">
          <a
            href="tel:3344972713"
            className="inline-flex items-center gap-2 font-medium hover:text-amber-300 transition-colors"
          >
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-genix-crimson text-white">
              <Phone className="w-3 h-3" />
            </span>
            <span>(334) 497-2713</span>
          </a>
          <a
            href="mailto:info@genixmss.com"
            className="inline-flex items-center gap-2 font-medium hover:text-amber-300 transition-colors"
          >
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-genix-crimson text-white">
              <Mail className="w-3 h-3" />
            </span>
            <span>info@genixmss.com</span>
          </a>
          <span className="hidden md:inline-flex items-center gap-1.5 text-white/80">
            <MapPin className="w-3.5 h-3.5 text-genix-crimson" />
            <span>Lithia Springs, GA &amp; Greater Atlanta Metro</span>
          </span>
        </div>

        {/* Right: Quick Portal Links & Social Icons */}
        <div className="flex items-center gap-4 ml-auto">
          <div className="hidden lg:flex items-center gap-4 border-r border-white/20 pr-4">
            <Link
              href="/facility-staffing"
              className="inline-flex items-center gap-1.5 text-white/90 hover:text-white font-medium transition-colors"
            >
              <Building2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Facility Staffing</span>
            </Link>
            <Link
              href="/careers"
              className="inline-flex items-center gap-1.5 text-white/90 hover:text-white font-medium transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Join Our Care Team</span>
            </Link>
            <Link
              href="/portal"
              className="inline-flex items-center gap-1.5 text-white/90 hover:text-white font-medium transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Family Care Portal</span>
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-white/90 hover:text-white font-medium transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-rose-400" />
              <span>Staff Admin</span>
            </Link>
          </div>

          {/* Social Links matching screenshot */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-6 h-6 rounded-full bg-white/10 hover:bg-genix-crimson flex items-center justify-center transition-colors text-[11px] font-bold"
            >
              f
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="w-6 h-6 rounded-full bg-white/10 hover:bg-genix-crimson flex items-center justify-center transition-colors text-[11px] font-bold"
            >
              𝕏
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-6 h-6 rounded-full bg-white/10 hover:bg-genix-crimson flex items-center justify-center transition-colors text-[11px] font-bold"
            >
              in
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="w-6 h-6 rounded-full bg-white/10 hover:bg-genix-crimson flex items-center justify-center transition-colors text-[11px] font-bold"
            >
              ▶
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

