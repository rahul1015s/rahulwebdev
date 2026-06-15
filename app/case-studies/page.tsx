import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock3 } from "lucide-react"
import { connectDB } from "@/lib/mongodb";
import CaseStudy from "@/models/casestudy"
import { Metadata } from 'next';
import { estimateReadTime, extractCoverImage, extractExcerpt } from "@/lib/blog-content";

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

  return (
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

        {studies.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-border/80 py-16 text-center text-muted-foreground">
            No case studies published yet.
          </p>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {studies.map((study: CaseStudyCard) => {
              const coverImage = extractCoverImage(study.coverImage, study.content);
              const excerpt = study.description || study.tagline || extractExcerpt(study.content, 180);

              return (
                <Link
                  key={study.slug}
                  href={`/case-studies/${study.slug}`}
                  className="group overflow-hidden rounded-[1.75rem] border border-border/70 bg-background/80 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 hover:border-emerald-500/30"
                >
                  <div className="grid h-full md:grid-cols-[240px_minmax(0,1fr)]">
                    <div className="relative min-h-[220px] overflow-hidden bg-muted">
                      <Image
                        src={coverImage}
                        alt={study.name}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        unoptimized={coverImage.startsWith("http")}
                      />
                    </div>
                    <div className="flex h-full flex-col p-5 sm:p-6">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        {study.category?.slice(0, 2)?.map((item: string) => (
                          <span key={item} className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-emerald-700 dark:text-emerald-200">
                            {item}
                          </span>
                        ))}
                      </div>
                      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
                        {study.name}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {excerpt}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {study.stack?.slice(0, 4)?.map((item: string) => (
                          <span key={item} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                            {item}
                          </span>
                        ))}
                      </div>
                      <div className="mt-auto flex items-center justify-between gap-3 pt-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-3">
                          <span>
                            {new Date(study.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock3 className="h-3.5 w-3.5" />
                            {estimateReadTime(study.content)}
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1 font-medium text-emerald-700 transition group-hover:text-emerald-600 dark:text-emerald-300">
                          Read case study
                          <ArrowRight className="h-4 w-4" />
                        </span>
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
  )
}
