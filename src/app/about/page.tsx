import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightCircle,
  CheckCircle2,
  Award,
  Building2,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";
import { TEAM_MEMBERS } from "@/data/blog";

export const metadata: Metadata = {
  title: "About Genix Medical Staffing",
  description:
    "Learn about Genix Medical Staffing Services (GenixMSS)—our mission, vision, 94% client satisfaction score, and clinical leadership team across Metro Atlanta.",
};

export default function AboutPage() {
  return (
    <div>
      {/* 1. ABOUT HERO SECTION (Matching about_screenshot.pdf) */}
      <section className="relative min-h-[460px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/services/Hero Image Cleaned Up.png')",
          }}
        />
        <div className="absolute inset-0 bg-genix-navy/75" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white space-y-5">
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            About Genix Medical Staffing
          </h1>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-2xl mx-auto">
            Caring for someone alone can be straining, without a support team or a
            helping hand. Here our Genix Family becomes an extension of your family,
            being that helping hand in your time of need. Supporting you or your loved
            ones in finding the correct care team and care plan. Organizing
            appointments, medications and care plan with your Doctors, Primary care,
            Physical therapy, Dietary and more according to you or your loved ones
            needs. Building a Network of resources to establish a Total care plan. Our
            team will also assist in finding resources to ensure you&apos;re covered in
            case of your long term needs. Allow your family to become a part of our
            Genix family and we are here to support you.
          </p>
        </div>
      </section>

      {/* 2. ABOUT GENIX SPLIT SECTION WITH COLLAGE (Exact Layout from about_screenshot.pdf) */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy & Checklists */}
            <div className="lg:col-span-6 space-y-5">
              <p className="section-eyebrow">ABOUT GENIX</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-genix-navy leading-tight">
                Trusted Partner For Medical Staffing. We Provide Reliable, Qualified
                Professionals To Meet Your Needs. Count On Genix.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Genix excels in healthcare staffing and personalized home care, offering
                specialized solutions for every need. We connect top talent with
                facilities and families, ensuring efficient and seamless placements. Our
                focus on clinical quality, dignity, and partnership ensures your
                healthcare success.
              </p>

              <ul className="space-y-3 pt-1">
                {[
                  {
                    bold: "Specialized Staffing Solutions:",
                    text: "Tailored to diverse healthcare facility and in-home care needs.",
                  },
                  {
                    bold: "Efficient Talent Placement:",
                    text: "Connecting top vetted medical professionals with facilities and families.",
                  },
                  {
                    bold: "Seamless Integration:",
                    text: "Ensuring smooth transitions, real-time insights, and dependable operations.",
                  },
                  {
                    bold: "Quality and Partnership:",
                    text: "Focused on your long-term healthcare and wellness success.",
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
                <Link href="/contact" className="btn-primary">
                  <span>REQUEST A CALL</span>
                  <ArrowRightCircle className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Dual Image Collage matching about_screenshot.pdf */}
            <div className="lg:col-span-6 relative">
              <div className="relative pl-12 pb-12">
                <div className="rounded-2xl overflow-hidden shadow-card border border-slate-100">
                  <img
                    src="/assets/services/About Us Side Image.png"
                    alt="Nurse holding stethoscope in heart shape"
                    className="w-full h-[380px] object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 w-52 h-52 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <img
                    src="/assets/services/About Us Side Image 2.jpg"
                    alt="Doctor caring for young patient"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR VISION AND MISSION (Dark Indigo Section matching about_screenshot.pdf) */}
      <section className="bg-genix-navy py-20 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Intro */}
            <div className="lg:col-span-4 space-y-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
                OUR VISION AND MISSION
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                We Place Skilled Staff For Your Care.
              </h2>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                We offer flexible staffing and home care solutions, addressing your
                specific needs across all medical specialties. Our dedicated team
                ensures seamless placements, connecting you with top-tier professionals.
                We prioritize quality and efficiency, empowering your facility or home
                to deliver exceptional patient care.
              </p>
              <div className="pt-2">
                <Link href="/services" className="btn-outline-white">
                  <span>VIEW OUR SERVICES</span>
                  <ArrowRightCircle className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right 2x2 Grid with Coral/Red Circular Icons */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                {
                  icon: <Award className="w-5 h-5 text-white" />,
                  title: "Excellence In Healthcare Staffing",
                  text: "Vision: To be the leading provider of exceptional medical staffing and home care solutions, setting the standard for quality and reliability.",
                },
                {
                  icon: <Building2 className="w-5 h-5 text-white" />,
                  title: "Empowering Healthcare Facilities:",
                  text: "Mission: To build strong partnerships with healthcare providers and families, offering tailored staffing solutions that meet their unique needs and contribute to their success.",
                },
                {
                  icon: <HeartPulse className="w-5 h-5 text-white" />,
                  title: "Enhancing Patient Care:",
                  text: "Vision: To contribute to the advancement of patient care by ensuring healthcare facilities and homes are staffed with skilled and compassionate professionals.",
                },
                {
                  icon: <ShieldCheck className="w-5 h-5 text-white" />,
                  title: "Building A Trusted Network:",
                  text: "Mission: To establish strong relationships built on integrity, transparency, and mutual respect, providing consistent and dependable staffing solutions.",
                },
              ].map((card) => (
                <div key={card.title} className="space-y-3">
                  <div className="w-11 h-11 rounded-full bg-[#FF6B5B] flex items-center justify-center shadow-md">
                    {card.icon}
                  </div>
                  <h3 className="font-heading text-base font-bold text-white">
                    {card.title}
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPANY STATUS & PROGRESS BARS (Exact Layout from about_screenshot.pdf) */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <p className="section-eyebrow">COMPANY STATUS</p>
              <h2 className="font-heading text-3xl font-extrabold text-genix-navy leading-tight">
                The Ideal Staff For Your Healthcare Needs.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Genix stands as a leader in medical staffing and home care, delivering
                reliable solutions to healthcare facilities and private families. We
                ensure consistent quality, connecting top-tier talent with vital roles.
                Our commitment to excellence and innovation drives our continued growth
                and success.
              </p>
            </div>

            {/* Progress Bars matching 94%, 87%, 92% */}
            <div className="lg:col-span-7 space-y-5">
              {[
                { label: "Client Satisfaction Score", value: 94 },
                { label: "Placement Retention Rate", value: 87 },
                { label: "Time-to-Fill Rate", value: 92 },
              ].map((bar) => (
                <div
                  key={bar.label}
                  className="w-full bg-slate-200 rounded-xl overflow-hidden h-12 relative flex items-center"
                >
                  <div
                    className="h-full bg-genix-navy rounded-xl flex items-center justify-between px-5 text-white text-xs sm:text-sm font-bold transition-all duration-700"
                    style={{ width: `${bar.value}%` }}
                  >
                    <span>{bar.label}</span>
                    <span>{bar.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. MEET THE TEAM BEHIND GENIX MEDICAL STAFFING (From Live Site Copy) */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <p className="section-eyebrow">CLINICAL GOVERNANCE &amp; LEADERSHIP</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-genix-navy">
              Meet the Team Behind Genix Medical Staffing
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Together, we bring deep experience from clinical medicine, healthcare
              operations, and patient advocacy—plus a shared obsession with making
              high-quality care accessible, transparent, and dignified.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl overflow-hidden shadow-card border border-slate-100 flex flex-col"
              >
                <div className="h-56 overflow-hidden bg-slate-100">
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 space-y-2 flex-1">
                  <h3 className="font-heading text-lg font-bold text-genix-navy">
                    {member.name}
                  </h3>
                  <p className="text-xs font-bold text-genix-crimson uppercase tracking-wider">
                    {member.role}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

