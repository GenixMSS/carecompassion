import Link from "next/link";
import {
  ArrowRightCircle,
  CheckCircle2,
  ClipboardCheck,
  CalendarClock,
  Activity,
  Award,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SERVICE_PILLARS } from "@/data/services";
import { BLOG_POSTS, TESTIMONIALS } from "@/data/blog";
import { COUNTIES, CITIES } from "@/data/locations";
import { QuoteForm } from "@/components/QuoteForm";
import { FaqAccordion } from "@/components/FaqAccordion";

export default function HomePage() {
  return (
    <div>
      {/* 1. HERO SECTION (Matching Screenshot + Live Site Headline & Video/Image Background) */}
      <section className="relative min-h-[600px] lg:min-h-[680px] flex items-center justify-center overflow-hidden">
        {/* Background Video with Image Fallback */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/services/HeroImage.png"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/videos/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Dark Clinical Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-genix-navy/75 via-genix-navy/65 to-genix-navy/85" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center text-white space-y-6">
          <div className="inline-flex flex-col items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">
              WELCOME TO GENIX MEDICAL STAFFING SERVICES
            </span>
            <span className="w-12 h-0.5 bg-white/70 rounded-full" />
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.12] tracking-tight">
            Seeking Compassionate Care For Yourself Or Loved Ones?
          </h1>

          <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto leading-relaxed">
            Bridging the gap between hospital-grade medical oversight and personalized
            in-home attention. From positioning, daily mobility, and memory support to
            elite healthcare facility staffing across Metro Atlanta, Genix gives you the
            clinical flexibility and peace of mind your health deserves.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link href="/services" className="btn-outline-white">
              <span>LEARN MORE</span>
              <ArrowRightCircle className="w-4 h-4" />
            </Link>
            <a
              href="#consultation-intake"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-genix-crimson hover:bg-genix-crimson-dark px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all shadow-lg"
            >
              <span>GET A FREE QUOTE</span>
              <ArrowRightCircle className="w-4 h-4" />
            </a>
          </div>

          {/* Live Site Impact Stats Bar */}
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-white/15">
            {[
              { value: "10+", label: "Years of Trusted Service" },
              { value: "1000+", label: "Satisfied Clients" },
              { value: "200+", label: "Families Served" },
              { value: "50+", label: "Staffing & Care Programs" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                  {stat.value}
                </p>
                <p className="text-[11px] font-medium text-white/75 uppercase tracking-wider mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. PARTNER HEALTH SYSTEM LOGOS BAR */}
      <section className="bg-slate-50 border-b border-slate-200/80 py-7">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-5">
            Supporting Families &amp; Clinical Transitions Across Premier Georgia Health Systems
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-85">
            <img
              src="/assets/partners/PiedmontHC.png"
              alt="Piedmont Healthcare"
              className="h-9 sm:h-11 w-auto object-contain grayscale hover:grayscale-0 transition-all"
            />
            <img
              src="/assets/partners/Wellstar_Health_System_Logo.svg.png"
              alt="Wellstar Health System"
              className="h-9 sm:h-11 w-auto object-contain grayscale hover:grayscale-0 transition-all"
            />
            <img
              src="/assets/partners/nh_logo_navy_2021.svg"
              alt="Northside Hospital"
              className="h-8 sm:h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all"
            />
            <img
              src="/assets/partners/GRADY_HEALTH_SYSTEM_2.jpg"
              alt="Grady Health System"
              className="h-9 sm:h-11 w-auto object-contain mix-blend-multiply grayscale hover:grayscale-0 transition-all"
            />
            <div className="bg-genix-navy px-3 py-1.5 rounded-lg">
              <img
                src="/assets/partners/choa-logo-color-white.webp"
                alt="Children's Healthcare of Atlanta"
                className="h-7 sm:h-8 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. SPLIT INTAKE & QUOTE SECTION (Exact Screenshot Layout) */}
      <section id="consultation-intake" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Statement matching screenshot */}
            <div className="lg:col-span-5 space-y-6 pt-2">
              <p className="text-xl sm:text-2xl text-slate-500 font-light leading-relaxed">
                Caring for someone alone can be straining, without a support team or a
                helping hand. Here our{" "}
                <span className="font-semibold text-genix-navy">Genix Family</span>{" "}
                becomes an extension of your family.
              </p>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-genix-navy text-white flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-genix-navy">
                      Personalized Care Pathways
                    </h3>
                    <p className="text-xs text-slate-500">
                      Clinical-First Home Support &amp; Facility Staffing
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We avoid one-size-fits-all care models. Every inquiry begins with a
                  complimentary clinical consultation to map out your loved one&apos;s
                  health needs, lifestyle preferences, and goals for independence.
                </p>
                <div className="pt-1 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white border border-slate-200 px-3 py-1 text-[11px] font-semibold text-genix-navy">
                    ✓ 24–48 Hr Rapid Placement
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white border border-slate-200 px-3 py-1 text-[11px] font-semibold text-genix-navy">
                    ✓ 30+ Clinical Specialties
                  </span>
                </div>
              </div>
            </div>

            {/* Right Interactive Contact/Quote Form matching screenshot */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-2 sm:p-4">
              <QuoteForm title="Contact Us" compact />
            </div>
          </div>
        </div>
      </section>

      {/* 4. ABOUT GENIX MEDICAL STAFFING SERVICES SECTION (Exact Screenshot Layout) */}
      <section className="py-16 lg:py-24 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy & 5 Bullet Points */}
            <div className="lg:col-span-6 space-y-5">
              <p className="section-eyebrow">ABOUT GENIX MEDICAL STAFFING SERVICES</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-genix-navy leading-tight">
                We Prioritize Reliable Staffing To Enable Our Partners To Focus On
                Delivering Exceptional Patient Care.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                At Staffing Genix, we specialize in providing comprehensive medical
                staffing and home care solutions tailored to the unique needs of
                families and healthcare providers. With a deep understanding of the
                industry, we meticulously screen and place experienced nurses,
                physicians, allied health professionals, compassionate caregivers, and
                administrative staff. Our commitment to reliability, responsiveness, and
                quality ensures that our clients receive the right talent, right when
                they need it. We&apos;re more than a staffing agency; we&apos;re a
                trusted partner in your healthcare success.
              </p>

              <ul className="space-y-3 pt-1">
                {[
                  {
                    bold: "Comprehensive Medical Staffing:",
                    text: "Tailored solutions to meet the unique needs of healthcare providers and private families.",
                  },
                  {
                    bold: "Meticulous Screening:",
                    text: "Placement of experienced nurses, physicians, allied health professionals, and vetted home caregivers.",
                  },
                  {
                    bold: "Reliability and Responsiveness:",
                    text: "Commitment to providing the right talent, right when needed.",
                  },
                  {
                    bold: "Quality Focused:",
                    text: "Ensuring high clinical standards and total transparency in all staffing and care solutions.",
                  },
                  {
                    bold: "Trusted Partnership:",
                    text: "More than an agency, a dedicated partner in healthcare success.",
                  },
                ].map((item) => (
                  <li key={item.bold} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-genix-blue shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-genix-navy">{item.bold}</strong> {item.text}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="pt-3">
                <Link href="/about" className="btn-primary">
                  <span>MORE ABOUT</span>
                  <ArrowRightCircle className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Image matching screenshot */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-card">
                <img
                  src="/assets/services/About Genix Image.webp"
                  alt="Genix caregiver supporting senior client at home"
                  className="w-full h-[300px] sm:h-[400px] lg:h-[460px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 3-PILLAR ROYAL BLUE BANNER (Exact Screenshot Layout) */}
      <section className="bg-genix-blue py-16 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                num: "1",
                title: "Free Consultation",
                desc: "Discover how Staffing Genix can address your specific staffing or home care needs with a complimentary clinical consultation. We'll discuss your requirements and outline tailored solutions to optimize your care plan or healthcare workforce.",
              },
              {
                num: "2",
                title: "Reasonable Prices",
                desc: "Staffing Genix offers competitive, transparent rates for top-tier medical talent and home caregivers. We provide cost-effective solutions without compromising on clinical quality, dignity, or service.",
              },
              {
                num: "3",
                title: "The Effective Teamwork",
                desc: "Staffing Genix fosters collaborative healthcare teams for optimal patient outcomes. We prioritize seamless integration, real-time family updates, and clear communication for enhanced efficiency.",
              },
            ].map((step) => (
              <div key={step.num} className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-genix-navy text-white font-heading font-bold text-sm flex items-center justify-center shadow-md">
                  {step.num}
                </div>
                <h3 className="font-heading text-xl font-bold text-white">
                  {step.title}
                </h3>
                <p className="text-xs text-white/85 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FEATURED SERVICES 4-COLUMN GRID (Exact Screenshot Layout & Links) */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-genix-navy">
              Featured Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Staffing Genix delivers specialized medical staffing and home care
              solutions. We place qualified professionals, ensuring smooth operations.
              Trust us for quality and efficient healthcare staffing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICE_PILLARS.map((pillar) => (
              <div
                key={pillar.slug}
                className="flex flex-col bg-white rounded-xl overflow-hidden group"
              >
                {/* Square Service Thumbnail */}
                <Link
                  href={`/services/${pillar.slug}`}
                  className="block aspect-square overflow-hidden rounded-lg mb-4 bg-slate-100"
                >
                  <img
                    src={pillar.cardImage}
                    alt={pillar.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>

                <h3 className="font-heading text-lg font-extrabold text-genix-navy uppercase tracking-tight">
                  {pillar.cardHeadline}
                </h3>
                <p className="text-xs font-medium text-slate-500 mt-1 mb-3">
                  {pillar.cardSubtitle}
                </p>

                {/* Bulleted Sub-Services linking directly to dedicated subpages */}
                <ul className="space-y-1.5 text-xs text-slate-700 mb-6 flex-1 pl-4 list-disc marker:text-genix-navy">
                  {pillar.subServices.map((sub) => (
                    <li key={sub.slug}>
                      <Link
                        href={`/services/${pillar.slug}/${sub.slug}`}
                        className="hover:text-genix-crimson hover:underline transition-colors"
                      >
                        {sub.shortTitle}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div>
                  <Link href={`/services/${pillar.slug}`} className="btn-primary">
                    <span>CLICK HERE</span>
                    <ArrowRightCircle className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. THE GENIX PROVEN CARE METHOD (Live Site Phased Care Implementation) */}
      <section className="py-20 bg-slate-50 border-y border-slate-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <p className="section-eyebrow">PHASED CARE IMPLEMENTATION</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-genix-navy">
              The Genix Proven Care Method
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We transition individuals into safe, supported, home-based environments
              through a structured clinical framework backed by real-time transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                phase: "PHASE 01",
                title: "Comprehensive Clinical Assessment",
                desc: "We initiate every partnership with a detailed clinical evaluation to map out your family's or facility's unique requirements, safety considerations, and baseline for professional support.",
                image: "/assets/services/Genix M Staffing S Clinical Assessment Image.webp",
                icon: <ClipboardCheck className="w-5 h-5 text-genix-crimson" />,
              },
              {
                phase: "PHASE 02",
                title: "Strategic Care Coordination",
                desc: "Once the assessment is complete, our care coordinators meticulously organize staffing schedules, clinical specializations, and medical protocols for a reliable, friction-free launch.",
                image: "/assets/services/Genix M Staffing S Strategic Care Image.webp",
                icon: <CalendarClock className="w-5 h-5 text-genix-blue" />,
              },
              {
                phase: "PHASE 03",
                title: "Continuous Care Delivery & Management",
                desc: "Ongoing clinical oversight, active management, and real-time shift tracking ensure daily vitals, recovery milestones, and long-term health outcomes are met with dignity.",
                image: "/assets/services/Genix M Staffing S Continuous Care Image.webp",
                icon: <Activity className="w-5 h-5 text-emerald-600" />,
              },
            ].map((item) => (
              <div
                key={item.phase}
                className="bg-white rounded-2xl overflow-hidden shadow-card border border-slate-100 flex flex-col"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-genix-navy/90 text-white px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
                    {item.phase}
                  </span>
                </div>
                <div className="p-6 space-y-3 flex-1 flex flex-col">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <h3 className="font-heading text-lg font-bold text-genix-navy">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed flex-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. HOW WE WORKS / EFFICIENT MEDICAL STAFFING SECTION (Exact Screenshot Layout) */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <p className="section-eyebrow">HOW WE WORK</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-genix-navy leading-tight">
                Efficient Medical Staffing, Tailored To You.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We begin with a thorough understanding of your specific needs and
                facility or home requirements. Our rigorous screening process ensures
                only qualified professionals are presented. From initial consultation to
                placement, we provide seamless, personalized support every step of the
                way.
              </p>
              <div className="pt-3 flex flex-wrap gap-3">
                <Link href="/facility-staffing" className="btn-primary">
                  <span>REQUEST FACILITY STAFF</span>
                  <ArrowRightCircle className="w-4 h-4" />
                </Link>
                <Link
                  href="/portal"
                  className="inline-flex items-center gap-2 rounded-full border border-genix-navy px-6 py-3 text-xs font-bold uppercase tracking-wider text-genix-navy hover:bg-genix-navy hover:text-white transition-colors"
                >
                  <span>REAL-TIME CARE INSIGHTS</span>
                </Link>
              </div>
            </div>

            {/* Right Healing Hands Red Cross Graphic matching screenshot */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-md aspect-square bg-black rounded-2xl flex items-center justify-center p-8 shadow-xl">
                <img
                  src="/assets/services/Helping Hands Sharp.png"
                  alt="Genix Healing Hands Medical Cross"
                  className="w-4/5 h-4/5 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. WHAT PEOPLE SAY / TESTIMONIALS (Exact Screenshot Layout) */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div>
            <p className="section-eyebrow">WHAT PEOPLE SAY</p>
            <h2 className="font-heading text-3xl font-extrabold text-genix-navy mt-1">
              Hear From Our Clients
            </h2>
          </div>

          {/* Primary Featured Testimonial matching screenshot */}
          <div className="space-y-5">
            <span className="block font-serif text-5xl leading-none text-teal-600 select-none">
              “
            </span>
            <blockquote className="text-base sm:text-lg font-semibold text-slate-700 leading-relaxed max-w-4xl">
              &ldquo;{TESTIMONIALS[0].quote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-4 pt-1">
              <img
                src={TESTIMONIALS[0].image}
                alt={TESTIMONIALS[0].name}
                className="w-12 h-12 rounded-full object-cover border-2 border-genix-blue"
              />
              <div>
                <p className="font-heading font-bold text-sm text-genix-navy">
                  {TESTIMONIALS[0].name}
                </p>
                <p className="text-xs text-slate-500">{TESTIMONIALS[0].role}</p>
              </div>
            </div>
          </div>

          {/* Secondary Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
            {TESTIMONIALS.slice(1).map((item) => (
              <div
                key={item.name}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-4"
              >
                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-heading font-bold text-xs text-genix-navy">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-slate-500">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FREQUENTLY ASKED QUESTIONS (Exact Royal Blue Section from Screenshot) */}
      <section className="bg-genix-blue py-20 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
              FAQS
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-white/85 leading-relaxed">
              Find answers to your questions here. We&apos;re committed to transparency
              and providing the staffing and home care solutions you need.
            </p>
          </div>

          <FaqAccordion />
        </div>
      </section>

      {/* 11. GREATER ATLANTA SERVICE AREA PREVIEW & MAP */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <p className="section-eyebrow">LOCAL GEORGIA COVERAGE</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-genix-navy leading-tight">
                Serving Lithia Springs &amp; The Entire Greater Atlanta Metro Area
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Headquartered in Lithia Springs, Genix Medical Staffing Services dispatches
                vetted caregivers, CNAs, LPNs, and RNs across 11 Metro Atlanta counties
                and over 50 cities. Click your county or city below to explore local home
                care and hospital transitional programs.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                {COUNTIES.map((county) => (
                  <Link
                    key={county.slug}
                    href={`/service-areas/counties/${county.slug}`}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-slate-200 hover:border-genix-crimson text-xs font-bold text-genix-navy hover:text-genix-crimson transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-genix-crimson shrink-0" />
                    <span className="truncate">{county.name}</span>
                  </Link>
                ))}
              </div>

              <div className="pt-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Popular Metro Cities:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {CITIES.slice(0, 14).map((city) => (
                    <Link
                      key={city.slug}
                      href={`/service-areas/cities/${city.slug}`}
                      className="text-[11px] font-semibold text-slate-600 bg-white border border-slate-200/80 rounded-full px-2.5 py-1 hover:bg-genix-navy hover:text-white transition-colors"
                    >
                      {city.name}
                    </Link>
                  ))}
                  <Link
                    href="/service-areas"
                    className="text-[11px] font-bold text-genix-crimson px-2.5 py-1 hover:underline"
                  >
                    + View All 50+ Cities →
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white p-4 rounded-2xl shadow-card border border-slate-200">
                <img
                  src="/assets/services/Atlanta Metro Map.webp"
                  alt="Genix Medical Staffing Greater Atlanta Metro Service Area Map"
                  className="w-full h-auto rounded-xl object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. LATEST BLOGS / HEALTHCARE NEWS (Replacing template placeholder with real Genix articles) */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="section-eyebrow">LATEST BLOGS</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-genix-navy mt-1">
                News And Articles From
                <br />
                Genix Medical Staffing
              </h2>
            </div>
            <Link href="/blog" className="btn-primary self-start sm:self-auto">
              <span>ALL BLOGS</span>
              <ArrowRightCircle className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <article
                key={post.slug}
                className="bg-slate-50 rounded-xl overflow-hidden border border-slate-100 flex flex-col group hover:shadow-card transition-all"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block h-48 overflow-hidden bg-slate-200"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
                <div className="p-6 flex-1 flex flex-col space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="text-genix-crimson">{post.category}</span>
                  </div>
                  <h3 className="font-heading text-base font-bold text-genix-navy group-hover:text-genix-blue transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 flex-1 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="pt-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-genix-navy border-b-2 border-genix-navy pb-0.5 hover:text-genix-crimson hover:border-genix-crimson transition-colors"
                    >
                      CONTINUE READING
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

