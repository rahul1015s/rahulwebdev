import Link from "next/link";
import type { Metadata } from "next";

import { connectDB } from "@/lib/mongodb";
import CaseStudy from "@/models/casestudy";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";
export const revalidate = 60;

type CaseStudyCard = {
  slug: string;
  name: string;
  description?: string;
  tagline?: string;
  stack?: string[];
  category?: string[];
  createdAt: string | Date;
  timeline?: string;
  client?: string;
  published?: boolean;
  order?: number;
};

export const metadata: Metadata = {
  title: "Case Studies - Rahul Verma",
  description:
    "An archive of shipped builds, technical decisions, and case-study writeups from Rahul Verma's work.",
  alternates: {
    canonical: "https://rahulwebdev.in/case-studies",
  },
  openGraph: {
    title: "Case Studies - Rahul Verma",
    description:
      "An archive of shipped builds, technical decisions, and case-study writeups from Rahul Verma's work.",
    url: "https://rahulwebdev.in/case-studies",
    siteName: "Rahul Web Development",
    images: [
      {
        url: "/og/website/casestudies.webp",
        width: 1200,
        height: 630,
        alt: "Rahul Verma case studies preview showing shipped web development projects",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies - Rahul Verma",
    description:
      "An archive of shipped builds, technical decisions, and case-study writeups from Rahul Verma's work.",
    images: ["/og/website/casestudies.webp"],
  },
};

async function getCaseStudies() {
  try {
    await connectDB();
    const studies = await CaseStudy.find({ published: true })
      .sort({ order: 1, createdAt: -1 })
      .select("slug name description tagline stack category createdAt timeline client published order")
      .lean();

    return studies as CaseStudyCard[];
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return [];
  }
}

function getStatus(study: CaseStudyCard) {
  return study.published ? "published" : "archived";
}

function getStatusLabel(status: ReturnType<typeof getStatus>) {
  if (status === "archived") {
    return "ARCHIVED";
  }

  return "PUBLISHED";
}

export default async function CaseStudiesPage() {
  const studies = await getCaseStudies();

  const itemListStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Rahul Verma Case Files",
    description:
      "Published case studies covering project goals, implementation decisions, technology choices, and outcomes.",
    url: "https://rahulwebdev.in/case-studies",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: studies.map((study, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/case-studies/${study.slug}`,
        name: study.name,
        description:
          study.description ||
          study.tagline ||
          `Case study detailing the build, stack, and outcome for ${study.name}.`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListStructuredData) }}
      />

      <main className="case-files-shell min-h-screen pt-24 pb-10">
        <section className="case-stage pb-24">
          <div className="case-masthead">
            <div>
              <span className="case-kicker">Rahul Verma · Full-Stack Developer</span>
              <h1 className="case-title">Case Files</h1>
            </div>

            <div className="case-masthead-meta">
              <div>Patna, Bihar - IN</div>
              <div>Rahulwebdev.in</div>
            </div>
          </div>

          <div className="case-subrule">
            <span>{studies.length} records on file</span>
            <span>Sorted by date opened, desc</span>
          </div>

          <p className="case-intro">
            Field records from client builds and personal products. Each file
            tracks the brief, the build response, and what actually shipped.
          </p>

          {studies.length === 0 ? (
            <div className="border border-dashed border-[#b7a888] px-6 py-16 text-center text-sm uppercase tracking-[0.12em] text-[#55503f]">
              No case files published yet.
            </div>
          ) : (
            <div>
              {studies.map((study, index) => {
                const status = getStatus(study);
                const summary =
                  study.description ||
                  study.tagline ||
                  `Read how ${study.name} was planned, built, and shipped.`;
                const year = new Date(study.createdAt).getFullYear();
                const tags = [...(study.category || []), ...(study.stack || [])].slice(
                  0,
                  4,
                );

                return (
                  <Link
                    key={study.slug}
                    href={`/case-studies/${study.slug}`}
                    className="case-file-row"
                  >
                    <div className="case-file-number">
                      No.{String(index + 1).padStart(2, "0")}
                    </div>

                    <div>
                      <h2 className="case-file-heading">{study.name}</h2>
                      <p className="case-file-copy">{summary}</p>

                      <div className="case-tag-list">
                        {tags.map((tag) => (
                          <span key={tag} className="case-tag">
                            {tag}
                          </span>
                        ))}
                        {study.client ? (
                          <span className="case-tag">Client: {study.client}</span>
                        ) : null}
                        {study.timeline ? (
                          <span className="case-tag">{study.timeline}</span>
                        ) : null}
                      </div>
                    </div>

                    <div className="case-file-meta">
                      <span className={`case-stamp ${status === "published" ? "case-stamp-live" : "case-stamp-archived"}`}>
                        {getStatusLabel(status)}
                      </span>
                      <span className="case-file-year">{year}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          <div className="case-footer-nav">
            <Link href="/" className="case-nav-link">
              Back to home
            </Link>
            <Link href="/blog" className="case-nav-link">
              Browse blog notes
            </Link>
            <Link href="/freelance-web-developer-patna" className="case-nav-link">
              Patna web developer page
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
