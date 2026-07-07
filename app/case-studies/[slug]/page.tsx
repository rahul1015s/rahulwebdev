import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PostContent from "@/components/blog/PostContent";
import { estimateReadTime, extractCoverImage, extractExcerpt } from "@/lib/blog-content";
import { connectDB } from "@/lib/mongodb";
import { generateBreadcrumbStructuredData } from "@/lib/seo";
import CaseStudy from "@/models/casestudy";

export const dynamic = "force-dynamic";
export const revalidate = 60;

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

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
  published?: boolean;
  order?: number;
};

type CaseStudyOverride = {
  tagline?: string;
  brief?: string[];
  approach?: string[];
  quote?: string;
  quoteAttribution?: string;
  stack?: string[];
  resultSummary?: string;
  resultMetrics?: string[];
  capabilityHighlights?: string[];
};

const premexCaseStudyOverride: CaseStudyOverride = {
  tagline:
    "A production-ready enterprise platform that connects public marketing, serialized inventory, partner portals, technician workflows, and a dual-track warranty engine in one system.",
  brief: [
    "Premex needed more than a brochure website. The platform had to operate as a unified business system connecting customer-facing discovery, internal operations, distributor activity, and after-sales warranty handling.",
    "The build had to support a real asset lifecycle from batch creation to sale, registration, claim handling, replacement, and expiry, while still performing like a fast modern marketing site.",
    "The core challenge was to avoid disconnected tools and instead deliver one architecture that could serve admins, dealers, retailers, technicians, and end customers from a shared data layer.",
  ],
  approach: [
    "Built a unified full-stack platform with a public marketing layer, enterprise CMS, admin operations cockpit, retailer and dealer workspace, technician claims interface, and customer-facing warranty flows.",
    "Implemented a dual-track warranty architecture: one engine for item-level serialized inventory tracking and another for legacy barcode-based self-service activation already circulating in the supply chain.",
    "Added runtime theming, structured SEO systems, dynamic sitemap and robots outputs, QR and EAN-13 workflows, PDF certificate generation, and role-aware workspaces for admin, partner, and field operations.",
  ],
  quote:
    "I do not just build web pages. I engineer self-sustaining operational environments that automate logistics, track asset lifecycles, empower channel partners, and accelerate business-critical workflows.",
  quoteAttribution: "Premex enterprise engineering portfolio",
  stack: [
    "Next.js 16",
    "React 19",
    "TypeScript",
    "MongoDB",
    "Better Auth",
    "Tailwind CSS 4",
    "GSAP",
    "Lenis",
    "pdf-lib",
    "qrcode",
    "Nodemailer",
    "ImageKit",
  ],
  resultSummary:
    "The result is a single production-ready ecosystem that combines brand presentation, inventory intelligence, partner operations, technician workflows, and warranty automation instead of splitting them across separate tools.",
  resultMetrics: [
    "40+ RESTful APIs supporting platform operations",
    "Dual-track warranty architecture for modern and legacy inventory",
    "Three operational workspaces: admin, retailer/dealer, technician",
  ],
  capabilityHighlights: [
    "Unified public site, customer dashboard, partner workspace, technician interface, and admin control room",
    "Serialized inventory state machine from IN_STOCK to SOLD, REGISTERED, CLAIMED, REPLACED, and EXPIRED",
    "On-demand PDF label sheets, QR workflows, and automated certificate generation",
    "Role-aware authentication with granular permissions and specialized workspaces",
    "Enterprise CMS for services, blog, case studies, testimonials, and brand controls",
  ],
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

async function getCaseStudySlugs() {
  try {
    await connectDB();
    const studies = await CaseStudy.find({ published: true })
      .sort({ order: 1, createdAt: -1 })
      .select("slug name")
      .lean();

    return studies as Array<{ slug: string; name: string }>;
  } catch (error) {
    console.error("Error fetching case study slugs:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
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
    study.description ||
    study.tagline ||
    "Detailed case study showcasing project development and implementation.";
  const ogImage = extractCoverImage(study.coverImage, study.content) || "/og-case-studies.svg";
  const keywords = [...new Set([...(study.category || []), ...(study.stack || []), "case study", "web development"])];

  return {
    title: `${study.name} - Case Study`,
    description,
    keywords,
    alternates: {
      canonical: `https://rahulwebdev.in/case-studies/${slug}`,
    },
    openGraph: {
      title: `${study.name} - Case Study`,
      description,
      url: `https://rahulwebdev.in/case-studies/${slug}`,
      siteName: "Rahul Web Development",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${study.name} case study`,
        },
      ],
      locale: "en_IN",
      type: "article",
      publishedTime: study.createdAt?.toISOString(),
      modifiedTime: study.updatedAt?.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.name} - Case Study`,
      description,
      images: [ogImage],
    },
  };
}

function formatDate(value?: Date) {
  if (!value) {
    return null;
  }

  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getStatus(study: CaseStudyRecord) {
  if (!study.published) {
    return "ARCHIVED";
  }

  return "PUBLISHED";
}

function buildBrief(study: CaseStudyRecord) {
  return [
    study.description,
    study.tagline,
    ...(study.challenges || []),
  ].filter(Boolean) as string[];
}

function buildApproach(study: CaseStudyRecord) {
  return [
    ...(study.solutions || []),
    study.deliverables?.length
      ? `Deliverables: ${study.deliverables.join(", ")}.`
      : undefined,
    study.team?.length ? `Team: ${study.team.join(", ")}.` : undefined,
  ].filter(Boolean) as string[];
}

function getCaseStudyOverride(study: CaseStudyRecord): CaseStudyOverride | null {
  if (study.slug === "premex-power-systems") {
    return premexCaseStudyOverride;
  }

  return null;
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const [study, studies] = await Promise.all([
    getCaseStudy(slug),
    getCaseStudySlugs(),
  ]);

  if (!study) {
    notFound();
  }

  const currentIndex = studies.findIndex((item) => item.slug === slug);
  const nextStudy = studies[(currentIndex + 1) % studies.length];
  const coverImage = extractCoverImage(study.coverImage, study.content) || "/og-case-studies.svg";
  const publishedDate = formatDate(study.createdAt);
  const override = getCaseStudyOverride(study);
  const brief = override?.brief || buildBrief(study);
  const approach = override?.approach || buildApproach(study);
  const detailTags = [...(study.category || []), ...(override?.stack || study.stack || [])].slice(0, 6);
  const exhibits = [study.gallery?.[0] || coverImage, study.gallery?.[1] || study.gallery?.[0] || coverImage];
  const resultMetrics = override?.resultMetrics || (study.results || []).slice(0, 3);
  const fallbackMetric = extractExcerpt(study.content, 150);

  const caseStudyStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.name,
    description: study.description || study.tagline,
    image: coverImage,
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
    keywords: detailTags.join(", "),
    articleSection: "Case Studies",
    url: `https://rahulwebdev.in/case-studies/${slug}`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />

      <article className="case-files-shell min-h-screen pt-24 pb-10">
        <section className="case-stage pb-24">
          <Link href="/case-studies" className="case-back-link">
            Back to index
          </Link>

          <div className="case-detail-header">
            <div>
              <div className="case-detail-id">
                Case file - {publishedDate || "Undated"}
              </div>
              <h1 className="case-detail-title">{study.name}</h1>
              <p className="case-detail-tagline">
                {override?.tagline || study.tagline || study.description || fallbackMetric}
              </p>
            </div>

            <div className="case-index-card">
              <div className="case-index-row">
                <span className="case-index-label">Client</span>
                <span className="case-index-value">{study.client || "Personal"}</span>
              </div>
              <div className="case-index-row">
                <span className="case-index-label">Timeline</span>
                <span className="case-index-value">{study.timeline || "Ongoing"}</span>
              </div>
              <div className="case-index-row">
                <span className="case-index-label">Read time</span>
                <span className="case-index-value">{estimateReadTime(study.content)}</span>
              </div>
              <div className="case-index-row">
                <span className="case-index-label">Status</span>
                <span className="case-index-value">{getStatus(study)}</span>
              </div>
            </div>
          </div>

          <hr className="case-divider" />

          {brief.length ? (
            <section>
              <div className="case-section-label">The Brief</div>
              <div className="case-section-body">
                {brief.map((paragraph, index) => (
                  <p key={`${paragraph}-${index}`}>{paragraph}</p>
                ))}
              </div>
            </section>
          ) : null}

          {approach.length ? (
            <>
              <hr className="case-divider case-divider-thin" />
              <section>
                <div className="case-section-label">The Approach</div>
                <div className="case-section-body">
                  {approach.map((paragraph, index) => (
                    <p key={`${paragraph}-${index}`}>{paragraph}</p>
                  ))}
                </div>
              </section>
            </>
          ) : null}

          <div className="case-exhibits">
            {exhibits.map((image, index) => (
              <div key={`${image}-${index}`} className="case-exhibit">
                <div className="case-exhibit-tape" />
                <div className={`case-exhibit-frame case-exhibit-frame-${index + 1}`}>
                  <Image
                    src={image}
                    alt={`${study.name} exhibit ${index + 1}`}
                    fill
                    className="object-cover"
                    unoptimized={image.startsWith("http")}
                  />
                </div>
                <div className="case-exhibit-caption">
                  {index === 0 ? "Exhibit A - Primary screen" : "Exhibit B - Supporting screen"}
                </div>
              </div>
            ))}
          </div>

          <blockquote className="case-pull-quote">
            {override?.quote || study.description || study.tagline || "Built to solve a real problem, not just to look complete."}
            <span>
              {override?.quoteAttribution || (study.client ? `${study.client} field note` : "Project field note")}
            </span>
          </blockquote>

          {(override?.stack?.length || study.stack?.length) ? (
            <>
              <hr className="case-divider case-divider-thin" />
              <section>
                <div className="case-section-label">The Stack</div>
                <div className="case-stack-list">
                  {(override?.stack || study.stack || []).map((item) => (
                    <span key={item} className="case-pill">
                      {item}
                    </span>
                  ))}
                </div>
              </section>
            </>
          ) : null}

          {(study.results?.length || fallbackMetric) ? (
            <>
              <hr className="case-divider case-divider-thin" />
              <section>
                <div className="case-section-label">The Result</div>
                <p className="case-section-body case-result-summary">
                  {override?.resultSummary || study.results?.[0] || fallbackMetric}
                </p>
                <div className="case-results-grid">
                  {(resultMetrics.length ? resultMetrics : detailTags.slice(0, 3)).map(
                    (item, index) => (
                      <div key={`${item}-${index}`} className="case-result-card">
                        <div className="case-result-number">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        <div className="case-result-label">{item}</div>
                      </div>
                    ),
                  )}
                </div>
              </section>
            </>
          ) : null}

          {override?.capabilityHighlights?.length ? (
            <>
              <hr className="case-divider case-divider-thin" />
              <section>
                <div className="case-section-label">Capability Highlights</div>
                <div className="case-section-body max-w-none">
                  {override.capabilityHighlights.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </section>
            </>
          ) : null}

          {study.content ? (
            <>
              <hr className="case-divider case-divider-thin" />
              <section>
                <div className="case-section-label">Field Notes</div>
                <div className="case-section-body max-w-none [&_h1]:font-[family-name:var(--font-special-elite)] [&_h2]:font-[family-name:var(--font-special-elite)] [&_h3]:font-[family-name:var(--font-special-elite)] [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl [&_img]:rounded-none [&_img]:border [&_img]:border-[#211e1a] [&_img]:shadow-[5px_5px_0_rgba(33,30,26,0.18)] [&_li]:text-[15.5px] [&_li]:leading-8 [&_p]:text-[15.5px] [&_p]:leading-8">
                  <PostContent content={study.content} />
                </div>
              </section>
            </>
          ) : null}

          {(study.liveUrl || study.githubUrl) ? (
            <>
              <hr className="case-divider case-divider-thin" />
              <div className="case-detail-nav">
                <div className="flex flex-wrap gap-3">
                  {study.liveUrl ? (
                    <a
                      href={study.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="case-nav-link"
                    >
                      View live
                    </a>
                  ) : null}
                  {study.githubUrl ? (
                    <a
                      href={study.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="case-nav-link"
                    >
                      View code
                    </a>
                  ) : null}
                </div>
              </div>
            </>
          ) : null}

          <div className="case-footer-nav">
            <Link href="/case-studies" className="case-back-link">
              All case files
            </Link>
            {nextStudy ? (
              <Link
                href={`/case-studies/${nextStudy.slug}`}
                className="case-next-link"
              >
                Next file: {nextStudy.name}
              </Link>
            ) : null}
          </div>
        </section>
      </article>
    </>
  );
}
