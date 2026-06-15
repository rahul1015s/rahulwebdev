import Image from "next/image";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import CaseStudy from "@/models/casestudy";
import PostContent from "@/components/blog/PostContent";
import type { Metadata } from "next";
import { ArrowUpRight, BriefcaseBusiness, CalendarDays, Layers3, User2 } from "lucide-react";

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
    };
  }

  const description =
    study.description || study.tagline || "Detailed case study showcasing project development and implementation.";
  const ogImage = study.coverImage || "/og-case-studies.svg";

  return {
    title: `${study.name} — Case Study | Rahul Verma`,
    description,
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
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  const ogImage = study.coverImage || "/og-case-studies.svg";

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(caseStudyStructuredData),
        }}
      />
      <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {study.coverImage ? (
          <div className="relative mb-8 h-64 w-full overflow-hidden rounded-[1.75rem] md:h-[28rem]">
            <Image src={study.coverImage} alt={study.name} fill className="object-cover" priority />
          </div>
        ) : null}

        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 font-medium uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-200">
              Case study
            </span>
            {study.category?.slice(0, 3)?.map((item) => (
              <span key={item} className="rounded-full border border-border/70 px-3 py-1">
                {item}
              </span>
            ))}
          </div>

          <h1 className="mb-4 mt-5 font-[family-name:var(--font-space-grotesk)] text-4xl font-semibold tracking-tight md:text-5xl">
            {study.name}
          </h1>
          <p className="mb-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            {study.tagline || study.description}
          </p>

          <div className="grid gap-3 border-t border-border/70 pt-5 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
            {study.client ? (
              <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
                <span className="mb-2 inline-flex items-center gap-2 font-semibold text-foreground">
                  <User2 className="h-4 w-4" /> Client
                </span>
                <p>{study.client}</p>
              </div>
            ) : null}
            {study.timeline ? (
              <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
                <span className="mb-2 inline-flex items-center gap-2 font-semibold text-foreground">
                  <CalendarDays className="h-4 w-4" /> Timeline
                </span>
                <p>{study.timeline}</p>
              </div>
            ) : null}
            {study.team?.length ? (
              <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
                <span className="mb-2 inline-flex items-center gap-2 font-semibold text-foreground">
                  <BriefcaseBusiness className="h-4 w-4" /> Team
                </span>
                <p>{study.team.join(", ")}</p>
              </div>
            ) : null}
            {study.deliverables?.length ? (
              <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
                <span className="mb-2 inline-flex items-center gap-2 font-semibold text-foreground">
                  <Layers3 className="h-4 w-4" /> Deliverables
                </span>
                <p>{study.deliverables.join(", ")}</p>
              </div>
            ) : null}
          </div>
        </div>

        {study.content ? <div className="mb-12"><PostContent content={study.content} /></div> : null}

        {study.stack?.length ? (
          <section className="border-t py-8">
            <h2 className="mb-4 text-xl font-semibold">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {study.stack.map((tech) => (
                <span key={tech} className="inline-block rounded-full bg-muted px-3 py-1 text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </section>
        ) : null}

        {study.gallery?.length ? (
          <section className="border-t py-8">
            <h2 className="mb-4 text-xl font-semibold">Gallery</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {study.gallery.map((image, idx) => (
                <div key={`${image}-${idx}`} className="relative h-64 overflow-hidden rounded-lg">
                  <Image src={image} alt={`${study.name} - ${idx + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {study.challenges?.length || study.solutions?.length ? (
          <section className="border-t py-8">
            <div className="grid gap-8 md:grid-cols-2">
              {study.challenges?.length ? (
                <div>
                  <h3 className="mb-3 text-lg font-semibold">Challenges</h3>
                  <ul className="space-y-2">
                    {study.challenges.map((challenge, idx) => (
                      <li key={`${challenge}-${idx}`} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="font-bold text-red-500">•</span> {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {study.solutions?.length ? (
                <div>
                  <h3 className="mb-3 text-lg font-semibold">Solutions</h3>
                  <ul className="space-y-2">
                    {study.solutions.map((solution, idx) => (
                      <li key={`${solution}-${idx}`} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="font-bold text-green-500">✓</span> {solution}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {study.results?.length ? (
          <section className="border-t py-8">
            <h2 className="mb-4 text-xl font-semibold">Results</h2>
            <ul className="space-y-2">
              {study.results.map((result, idx) => (
                <li key={`${result}-${idx}`} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="font-bold text-blue-500">★</span> {result}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {study.liveUrl || study.githubUrl ? (
          <section className="flex flex-wrap gap-4 border-t py-8">
            {study.liveUrl ? (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-opacity hover:opacity-90"
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
                className="inline-flex items-center gap-2 rounded-lg border border-primary px-4 py-2 transition-colors hover:bg-muted"
              >
                GitHub
                <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : null}
          </section>
        ) : null}
      </article>
    </>
  );
}
