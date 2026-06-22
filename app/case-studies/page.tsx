import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock3 } from "lucide-react"
import { connectDB } from "@/lib/mongodb";
import CaseStudy from "@/models/casestudy"
import { Metadata } from 'next';
import { estimateReadTime, extractCoverImage, extractExcerpt } from "@/lib/blog-content";

export const dynamic = "force-dynamic";

type CaseStudyCard = {
  slug: string;
  name: string;
  description?: string;
  tagline?: string;
  coverImage?: string;
  content?: unknown;
  stack?: string[];
  category?: string[];
  createdAt: string | Date;
};

export const metadata: Metadata = {
  title: "Case Studies — Rahul Verma",
  description: "In-depth case studies of selected projects showcasing full-stack development, problem-solving, and technical implementation.",
  openGraph: {
    title: "Case Studies — Rahul Verma",
    description: "In-depth case studies of selected projects showcasing full-stack development, problem-solving, and technical implementation.",
    url: "https://rahulwebdev.in/case-studies",
    siteName: "Rahul Verma Portfolio",
    images: [
      {
        url: "/og-case-studies.svg",
        width: 1200,
        height: 630,
        alt: "Rahul Verma Case Studies Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies — Rahul Verma",
    description: "In-depth case studies of selected projects showcasing full-stack development, problem-solving, and technical implementation.",
    images: ["/og-case-studies.svg"],
  },
}

export const revalidate = 60 // ISR: Revalidate every 60 seconds

async function getCaseStudies() {
  try {
    await connectDB()
    const studies = await CaseStudy.find({ published: true })
      .sort({ order: 1, createdAt: -1 })
      .lean()
    return studies
  } catch (error) {
    console.error('Error fetching case studies:', error)
    return []
  }
}

export default async function CaseStudiesPage() {
  const studies = await getCaseStudies()
  const itemListStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Rahul Verma Case Studies",
    description:
      "Published case studies covering project goals, implementation decisions, technology choices, and outcomes.",
    url: "https://rahulwebdev.in/case-studies",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: studies.map((study: CaseStudyCard, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://rahulwebdev.in/case-studies/${study.slug}`,
        name: study.name,
        description: study.description || study.tagline || extractExcerpt(study.content, 180),
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListStructuredData) }}
      />
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_36%),linear-gradient(180deg,rgba(248,250,252,0.95),rgba(255,255,255,1))] dark:bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.16),_transparent_28%),linear-gradient(180deg,rgba(2,6,23,1),rgba(3,7,18,1))]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-emerald-700 dark:text-emerald-300">
            Selected work
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Case studies that show how the work was actually built.
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            Detailed walkthroughs covering the problem, the build decisions, and the outcomes behind shipped projects.
          </p>
        </div>

        <div className="mb-8 grid gap-4 rounded-[1.75rem] border border-border/70 bg-background/75 p-5 sm:grid-cols-3 sm:p-6">
          <div>
            <p className="text-sm font-semibold text-foreground">For business owners</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Review shipped work, outcomes, and delivery thinking before you hire.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">For students</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Study how real products are scoped, built, and improved in production.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/blog"
              className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-700 transition hover:bg-emerald-500/15 dark:text-emerald-300"
            >
              Read related blogs
            </Link>
            <Link
              href="/freelance-web-developer-patna"
              className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              Work with Rahul
            </Link>
          </div>
        </div>

        {studies.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-border/80 py-16 text-center text-muted-foreground">
            No case studies published yet.
          </p>
        ) : (
          <div className="grid gap-6">
            {studies.map((study: CaseStudyCard, index: number) => {
              const coverImage = extractCoverImage(study.coverImage, study.content);
              const excerpt = study.description || study.tagline || extractExcerpt(study.content, 180);
              const createdAt = new Date(study.createdAt);
              const publishedDate = createdAt.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });
              const year = createdAt.getFullYear();

              return (
                <Link
                  key={study.slug}
                  href={`/case-studies/${study.slug}`}
                  className="group overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/95 text-slate-900 shadow-[0_26px_80px_-42px_rgba(15,23,42,0.28)] transition duration-300 hover:-translate-y-1 hover:border-emerald-500/30 dark:border-slate-800/80 dark:bg-[#07111f] dark:text-slate-100 dark:shadow-[0_26px_80px_-42px_rgba(15,23,42,0.85)]"
                >
                  <div className="grid h-full md:grid-cols-[1.05fr_1fr]">
                    <div className="relative min-h-[280px] overflow-hidden border-b border-slate-200/80 md:min-h-[420px] md:border-b-0 md:border-r dark:border-slate-800/80">
                      <Image
                        src={coverImage}
                        alt={study.name}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-[1.04]"
                        unoptimized={coverImage.startsWith("http")}
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(15,23,42,0.12)_42%,rgba(15,23,42,0.86))] dark:bg-[linear-gradient(180deg,rgba(3,7,18,0.08),rgba(3,7,18,0.36)_45%,rgba(3,7,18,0.94))]" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_34%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_34%)]" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                        <span className="inline-flex rounded-md border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-sm font-medium tracking-[0.2em] text-emerald-300">
                          {year}
                        </span>
                        <h2 className="mt-5 max-w-xs font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">
                          {study.name}
                        </h2>
                        <p className="mt-3 text-sm text-slate-300/85 sm:text-base">
                          {study.category?.slice(0, 2).join(" · ") || study.tagline || "Case study"}
                        </p>
                      </div>
                    </div>
                    <div className="relative flex h-full flex-col bg-slate-50/95 p-5 sm:p-6 md:p-7 dark:bg-[#0a1226]">
                      <span className="pointer-events-none absolute right-4 top-4 text-[3.75rem] font-semibold leading-none text-slate-900/[0.05] sm:right-6 sm:top-5 sm:text-[5.5rem] dark:text-white/[0.05]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="relative flex flex-wrap items-center gap-2 pr-12 text-xs text-muted-foreground sm:pr-16">
                        {study.category?.slice(0, 2)?.map((item: string) => (
                          <span key={item} className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-emerald-700 dark:text-emerald-300">
                            {item}
                          </span>
                        ))}
                      </div>
                      <h3 className="relative mt-5 max-w-xl font-serif text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                        {study.name}
                      </h3>
                      <p className="relative mt-4 max-w-xl text-base leading-7 text-slate-600 sm:leading-8 dark:text-slate-300/80">
                        {excerpt}
                      </p>
                      <div className="relative mt-6 flex flex-wrap gap-2">
                        {study.stack?.slice(0, 4)?.map((item: string) => (
                          <span key={item} className="rounded-md border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300/90">
                            {item}
                          </span>
                        ))}
                      </div>
                      <div className="mt-auto pt-8">
                        <div className="mb-5 h-px bg-slate-200 dark:bg-white/8" />
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            <p>{publishedDate}</p>
                            <span className="mt-1 inline-flex items-center gap-1">
                              <Clock3 className="h-3.5 w-3.5" />
                              {estimateReadTime(study.content)}
                            </span>
                          </div>
                          <span className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-5 py-3 font-medium text-emerald-700 transition group-hover:border-emerald-500/40 group-hover:bg-emerald-500/14 dark:text-emerald-300">
                            Read case study
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
        </div>
      </main>
    </>
  )
}
