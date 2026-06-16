import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import CaseStudy from "@/models/casestudy";
import PostContent from "@/components/blog/PostContent";
import type { Metadata } from "next";
import { estimateReadTime, extractCoverImage } from "@/lib/blog-content";
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Clock3,
  Layers3,
  User2,
} from "lucide-react";
import { generateBreadcrumbStructuredData } from "@/lib/seo";

export const revalidate = 60;

type CaseStudyPageProps = { params: Promise<{ slug: string }> };

type CaseStudyRecord = {
  slug: string;
  name: string;
  tagline?: string;
  description?: string;
  coverImage?: string;
  createdAt?: Date;
  updatedAt?: Date;
  content?: string;
  category?: string[];
  stack?: string[];
  client?: string;
  timeline?: string;
  team?: string[];
  deliverables?: string[];
  gallery?: string[];
  challenges?: string[];
  solutions?: string[];
  results?: string[];
  liveUrl?: string;
  githubUrl?: string;
};

async function getCaseStudy(slug: string) {
  try {
    await connectDB();
    const study = (await CaseStudy.findOne({ slug, published: true }).lean()) as CaseStudyRecord | null;

    if (study && study.content && typeof study.content === "object") {
      study.content = JSON.stringify(study.content);
    }

    return study;
  } catch (error) {
    console.error("Error fetching case study:", error);
    return null;
  }
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) {
    return {
      title: "Case Study Not Found - Rahul Verma",
      description: "The requested case study could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description =
    study.description || study.tagline || "Detailed case study showcasing project development and implementation.";
  const ogImage = extractCoverImage(study.coverImage, study.content) || "/og-case-studies.svg";
  const keywords = [...new Set([...(study.category || []), ...(study.stack || []), "case study", "web development"])];

  return {
    title: `${study.name} — Case Study | Rahul Verma`,
    description,
    keywords,
    authors: [{ name: "Rahul Verma", url: "https://rahulwebdev.in" }],
    category: study.category?.[0] || "Case Studies",
    alternates: {
      canonical: `https://rahulwebdev.in/case-studies/${slug}`,
    },
    openGraph: {
      title: `${study.name} — Case Study`,
      description,
      url: `https://rahulwebdev.in/case-studies/${slug}`,
      siteName: "Rahul Verma Portfolio",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${study.name} - Case Study by Rahul Verma`,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: study.createdAt?.toISOString(),
      modifiedTime: study.updatedAt?.toISOString(),
      authors: ["Rahul Verma"],
      tags: study.category || study.stack || [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.name} — Case Study`,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    other: {
      "article:author": "Rahul Verma",
      ...(study.createdAt && { "article:published_time": study.createdAt.toISOString() }),
      ...(study.updatedAt && { "article:modified_time": study.updatedAt.toISOString() }),
      ...(keywords.length > 0 && { "article:tag": keywords.join(", ") }),
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  const ogImage = extractCoverImage(study.coverImage, study.content) || "/og-case-studies.svg";
  const publishedDate = study.createdAt
    ? new Date(study.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;
  const overviewItems = [
    study.client
      ? {
          label: "Client",
          value: study.client,
          icon: User2,
        }
      : null,
    study.timeline
      ? {
          label: "Timeline",
          value: study.timeline,
          icon: CalendarDays,
        }
      : null,
    study.deliverables?.length
      ? {
          label: "Deliverables",
          value: study.deliverables.join(", "),
          icon: Layers3,
        }
      : null,
    study.team?.length
      ? {
          label: "Team",
          value: study.team.join(", "),
          icon: BriefcaseBusiness,
        }
      : null,
  ].filter(Boolean) as { label: string; value: string; icon: typeof User2 }[];

  const caseStudyStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.name,
    description: study.description || study.tagline,
    image: ogImage,
    author: {
      "@type": "Person",
      name: "Rahul Verma",
      url: "https://rahulwebdev.in",
    },
    publisher: {
      "@type": "Person",
      name: "Rahul Verma",
    },
    datePublished: study.createdAt?.toISOString(),
    dateModified: study.updatedAt?.toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://rahulwebdev.in/case-studies/${slug}`,
    },
    keywords: study.category?.join(", ") || study.stack?.join(", ") || "",
    articleSection: "Case Studies",
    url: `https://rahulwebdev.in/case-studies/${slug}`,
    about: study.category || [],
    mentions: study.stack || [],
  };
  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: "Home", url: "/" },
    { name: "Case Studies", url: "/case-studies" },
    { name: study.name, url: `/case-studies/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(caseStudyStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <article className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.1),_transparent_28%),linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] text-slate-800 dark:bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.1),_transparent_24%),linear-gradient(180deg,#080d18_0%,#0b1120_100%)] dark:text-slate-200">
        <div className="mx-auto max-w-5xl">
          <nav className="flex items-center justify-between border-b border-slate-200 px-4 py-5 sm:px-6 lg:px-8 dark:border-white/8">
            <span className="font-serif text-base text-slate-900 dark:text-white/90">Rahul Verma</span>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-emerald-700 dark:text-white/45 dark:hover:text-emerald-300"
            >
              <ArrowLeft className="h-4 w-4" />
              Case Studies
            </Link>
          </nav>

          <div className="px-4 pb-8 pt-10 sm:px-6 lg:px-8">
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="rounded-md border border-emerald-500/20 bg-emerald-500/8 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">
                Case Study
              </span>
              {study.category?.slice(0, 3).map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-slate-200 bg-white/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-slate-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/50"
                >
                  {item}
                </span>
              ))}
            </div>

            <h1 className="max-w-4xl font-serif text-4xl leading-tight text-slate-950 sm:text-5xl md:text-6xl dark:text-white">
              {study.name}
            </h1>
            {(study.tagline || study.description) && (
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg dark:text-white/55">
                {study.tagline || study.description}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-4 border-y border-slate-200 py-4 dark:border-white/8">
              {publishedDate ? (
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-4 w-4 text-emerald-600 dark:text-emerald-300/80" />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.08em] text-slate-400 dark:text-white/30">Published</p>
                    <p className="text-sm font-medium text-slate-700 dark:text-white/70">{publishedDate}</p>
                  </div>
                </div>
              ) : null}
              <div className="hidden h-8 w-px bg-slate-200 sm:block dark:bg-white/8" />
              <div className="flex items-center gap-3">
                <Clock3 className="h-4 w-4 text-emerald-600 dark:text-emerald-300/80" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.08em] text-slate-400 dark:text-white/30">Read time</p>
                  <p className="text-sm font-medium text-slate-700 dark:text-white/70">{estimateReadTime(study.content)}</p>
                </div>
              </div>
            </div>

            <div className="relative mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-white/8 dark:bg-[#0d1525]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(52,211,153,0.12),transparent_28%)]" />
              <div className="relative aspect-[16/9]">
                <Image src={ogImage} alt={study.name} fill className="object-cover" priority unoptimized={ogImage.startsWith("http")} />
              </div>
            </div>
          </div>

          {overviewItems.length ? (
            <div className="px-4 pb-10 sm:px-6 lg:px-8">
              <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-slate-100/70 md:grid-cols-2 xl:grid-cols-4 dark:border-white/8 dark:bg-white/[0.02]">
                {overviewItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className={`bg-white/80 p-5 dark:bg-[#0d1525] ${
                        index < overviewItems.length - 1 ? "border-b border-slate-200 dark:border-white/8" : ""
                      } ${
                        index < 2 ? "xl:border-b-0" : ""
                      } ${
                        index % 2 === 0 && overviewItems.length > 1 ? "md:border-r md:border-slate-200 md:dark:border-white/8" : ""
                      } ${
                        index < overviewItems.length - 1 ? "xl:border-r xl:border-slate-200 xl:dark:border-white/8" : ""
                      }`}
                    >
                      <Icon className="mb-3 h-5 w-5 text-emerald-600 dark:text-emerald-300/80" />
                      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-slate-400 dark:text-white/35">{item.label}</p>
                      <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-white/72">{item.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          <div className="px-4 pb-12 sm:px-6 lg:px-8">
            {study.content ? (
              <section className="mb-12 border-b border-slate-200 pb-12 dark:border-white/8">
                <div className="[&_h1]:font-serif [&_h2]:font-serif [&_h3]:font-serif [&_h2]:text-2xl [&_h2]:text-slate-950 dark:[&_h2]:text-white/95 [&_h3]:text-xl [&_h3]:text-slate-900 dark:[&_h3]:text-white/90 [&_p]:text-[15px] [&_p]:leading-8 [&_p]:text-slate-600 dark:[&_p]:text-white/55 [&_li]:text-slate-600 dark:[&_li]:text-white/55 [&_strong]:text-slate-900 dark:[&_strong]:text-white/90">
                  <PostContent content={study.content} />
                </div>
              </section>
            ) : null}

            {study.challenges?.length || study.solutions?.length ? (
              <section className="mb-12 grid gap-6 md:grid-cols-2">
                {study.challenges?.length ? (
                  <div className="rounded-2xl border border-slate-200 bg-white/85 p-5 sm:p-6 dark:border-white/8 dark:bg-[#0d1525]">
                    <h2 className="mb-5 text-sm font-medium uppercase tracking-[0.08em] text-rose-600 dark:text-rose-300/80">Challenges</h2>
                    <ul className="space-y-4">
                      {study.challenges.map((challenge, idx) => (
                        <li key={`${challenge}-${idx}`} className="flex gap-3 text-sm leading-7 text-slate-600 dark:text-white/55">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-400/80" />
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {study.solutions?.length ? (
                  <div className="rounded-2xl border border-slate-200 bg-white/85 p-5 sm:p-6 dark:border-white/8 dark:bg-[#0d1525]">
                    <h2 className="mb-5 text-sm font-medium uppercase tracking-[0.08em] text-emerald-600 dark:text-emerald-300/80">Solutions</h2>
                    <ul className="space-y-4">
                      {study.solutions.map((solution, idx) => (
                        <li key={`${solution}-${idx}`} className="flex gap-3 text-sm leading-7 text-slate-600 dark:text-white/55">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                          <span>{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </section>
            ) : null}

            {study.results?.length ? (
              <section className="mb-12 border-b border-slate-200 pb-12 dark:border-white/8">
                <h2 className="mb-5 font-serif text-3xl text-slate-950 dark:text-white/95">Results</h2>
                <ul className="space-y-3">
                  {study.results.map((result, idx) => (
                    <li
                      key={`${result}-${idx}`}
                      className="flex gap-3 rounded-xl border border-slate-200 bg-white/85 px-4 py-4 text-sm leading-7 text-slate-600 dark:border-white/8 dark:bg-[#0d1525] dark:text-white/60"
                    >
                      <span className="mt-1 text-emerald-600 dark:text-emerald-300">✦</span>
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {study.stack?.length ? (
              <section className="mb-12 border-b border-slate-200 pb-12 dark:border-white/8">
                <h2 className="mb-5 font-serif text-3xl text-slate-950 dark:text-white/95">Tech Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {study.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            ) : null}

            {study.gallery?.length ? (
              <section className="mb-12 border-b border-slate-200 pb-12 dark:border-white/8">
                <h2 className="mb-5 font-serif text-3xl text-slate-950 dark:text-white/95">Gallery</h2>
                <div className="grid gap-3 md:grid-cols-2">
                  {study.gallery.map((image, idx) => (
                    <div
                      key={`${image}-${idx}`}
                      className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-white/8 dark:bg-[#0d1525] ${
                        idx === 0 ? "aspect-[16/10] md:col-span-2 md:aspect-[16/8]" : "aspect-[16/10]"
                      }`}
                    >
                      <Image src={image} alt={`${study.name} - ${idx + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {study.liveUrl || study.githubUrl ? (
              <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-slate-500 dark:text-white/40">Project links</div>
                <div className="flex flex-wrap gap-3">
                  {study.liveUrl ? (
                    <a
                      href={study.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-700 transition hover:bg-emerald-500/15 dark:text-emerald-300"
                    >
                      View Live
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : null}
                  {study.githubUrl ? (
                    <a
                      href={study.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 dark:border-white/12 dark:bg-white/[0.03] dark:text-white/65 dark:hover:bg-white/[0.06] dark:hover:text-white/85"
                    >
                      GitHub
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : null}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </article>
    </>
  );
}
