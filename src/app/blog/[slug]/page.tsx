import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, CheckCircle2, Clock, User } from "lucide-react";
import { BLOG_POSTS } from "@/data/blog";
import { QuoteForm } from "@/components/QuoteForm";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostDetailPage({
  params,
}: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      {/* Hero */}
      <section className="py-16 bg-genix-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <nav className="flex items-center gap-2 text-xs text-white/75">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/blog" className="hover:text-white">
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-amber-300 font-bold">{post.category}</span>
          </nav>

          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-white/80 pt-2">
            <span className="inline-flex items-center gap-1.5 font-semibold text-amber-300">
              <User className="w-4 h-4" />
              {post.author}, {post.authorRole}
            </span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <article className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="rounded-2xl overflow-hidden shadow-card h-80 sm:h-96 bg-slate-100">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-base sm:text-lg font-medium text-slate-700 leading-relaxed border-l-4 border-genix-crimson pl-5">
            {post.excerpt}
          </p>

          {post.content.map((section) => (
            <div key={section.heading} className="space-y-4">
              <h2 className="font-heading text-2xl font-extrabold text-genix-navy">
                {section.heading}
              </h2>
              {section.paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className="text-sm sm:text-base text-slate-600 leading-relaxed"
                >
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul className="space-y-3 pt-2">
                  {section.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-genix-crimson shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </article>

      {/* Bottom Consultation CTA */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-2xl p-8 sm:p-12 shadow-card border border-slate-200">
          <div className="mb-8 space-y-2">
            <p className="section-eyebrow">SPEAK WITH OUR CLINICAL TEAM</p>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-genix-navy">
              Need Personalized Guidance for Your Family or Facility?
            </h2>
          </div>
          <QuoteForm title="" />
        </div>
      </section>
    </div>
  );
}

