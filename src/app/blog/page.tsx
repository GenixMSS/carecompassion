import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightCircle, Clock, User } from "lucide-react";
import { BLOG_POSTS } from "@/data/blog";

export const metadata: Metadata = {
  title: "News & Clinical Healthcare Insights Blog",
  description:
    "Read clinical articles, family caregiving guides, memory care tips, and medical staffing insights from Genix Medical Staffing Services.",
};

export default function BlogIndexPage() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="py-20 bg-genix-navy text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">
            HEALTHCARE INSIGHTS &amp; CLINICAL GUIDES
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white">
            News And Articles From Genix Medical Staffing
          </h1>
          <p className="text-sm sm:text-base text-white/85 max-w-2xl mx-auto leading-relaxed">
            Expert guidance on hospital-to-home transitions, dementia care, family
            caregiver wellness, and Georgia healthcare staffing trends.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all flex flex-col group"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="block h-64 overflow-hidden bg-slate-200"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <div className="p-8 flex-1 flex flex-col space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <span className="rounded-full bg-genix-navy text-white px-3 py-0.5 text-[10px]">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-genix-crimson" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="font-heading text-xl sm:text-2xl font-bold text-genix-navy group-hover:text-genix-crimson transition-colors leading-snug">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed flex-1">
                  {post.excerpt}
                </p>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <User className="w-4 h-4 text-genix-blue" />
                    <span>
                      <strong>{post.author}</strong> — {post.authorRole}
                    </span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-genix-navy hover:text-genix-crimson"
                  >
                    <span>READ ARTICLE</span>
                    <ArrowRightCircle className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

