import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, Mail, MessageCircleMore, ScanSearch } from "lucide-react";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_E164,
  PROFILE_IMAGE_PATH,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Freelance Web Developer in India | Rahul Verma",
  description:
    "Hire Rahul Verma for websites, web apps, and technical SEO across India. Patna-based, working with businesses nationwide using React, Next.js, Node.js, and MongoDB.",
  keywords: [
    "freelance web developer Patna",
    "web developer Bihar",
    "React developer Patna",
    "Next.js developer Patna",
    "full stack developer Patna",
    "website designer Patna",
    "SEO expert Patna",
  ],
  authors: [{ name: "Rahul Verma", url: SITE_URL }],
  alternates: {
    canonical: `${SITE_URL}/freelance-web-developer-patna`,
  },
  openGraph: {
    title: "Freelance Web Developer in India | Rahul Verma",
    description:
      "Hire a Patna-based full-stack developer for websites, web apps, and technical SEO across India.",
    url: `${SITE_URL}/freelance-web-developer-patna`,
    siteName: "Rahul Web Development",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og/website/freelancer-in-patna.webp",
        width: 1200,
        height: 630,
        alt: "Rahul Verma freelance web development preview for Patna and India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelance Web Developer in India | Rahul Verma",
    description:
      "Hire Rahul Verma for React, Next.js, and Node.js development across India.",
    images: ["/og/website/freelancer-in-patna.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const localAdvantages = [
  "Patna-based communication with easy remote calls, async updates, and practical follow-ups",
  "Context for service businesses, education brands, clinics, SaaS teams, and growing companies",
  "Modern product thinking without losing practical business clarity",
  "Technical SEO and performance work built into the project, not bolted on later",
];

const offerCards = [
  {
    title: "Marketing Websites",
    copy:
      "For businesses that need a fast, trustworthy site that explains the offer clearly and turns visits into enquiries.",
  },
  {
    title: "Web Applications",
    copy:
      "For startups and teams that need dashboards, portals, workflows, or custom tools with real backend logic.",
  },
  {
    title: "SEO-Focused Rebuilds",
    copy:
      "For businesses stuck with slow templates, weak metadata, bad structure, or pages that do not support search visibility.",
  },
];

const faqItems = [
  {
    question: "Do you only work with businesses in Patna?",
    answer:
      "No. I work remotely across India, while Patna clients also benefit from local context, easier scheduling, and tighter feedback loops.",
  },
  {
    question: "What kind of businesses are a good fit?",
    answer:
      "Clinics, consultancies, education brands, service businesses, retail operators, and early-stage startups across India usually fit well.",
  },
  {
    question: "Can you help with SEO as well as development?",
    answer:
      "Yes. My work usually includes metadata, page structure, internal linking, schema, image handling, and performance decisions that support search visibility.",
  },
  {
    question: "What happens after launch?",
    answer:
      "I can help with iteration, new landing pages, admin features, analytics review, and structured improvements after the first release.",
  },
];

export default function FreelanceWebDeveloperPatnaPage() {
  const primaryLinks = [
    {
      href: `mailto:${CONTACT_EMAIL}`,
      label: "Email Rahul",
      icon: Mail,
      external: true,
    },
    {
      href: `https://wa.me/${CONTACT_PHONE_E164.replace("+", "")}`,
      label: "WhatsApp",
      icon: MessageCircleMore,
      external: true,
    },
    {
      href: "/case-studies",
      label: "View case studies",
      icon: BriefcaseBusiness,
      external: false,
    },
    {
      href: "/blog",
      label: "Read technical notes",
      icon: ScanSearch,
      external: false,
    },
  ] as const;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Rahul Verma - Freelance Web Developer India",
    image: `${SITE_URL}${PROFILE_IMAGE_PATH}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Patna",
      addressRegion: "Bihar",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.5941,
      longitude: 85.1376,
    },
    url: `${SITE_URL}/freelance-web-developer-patna`,
    telephone: CONTACT_PHONE,
    email: CONTACT_EMAIL,
    priceRange: "₹₹",
    description:
      "Freelance full stack web developer based in Patna and serving businesses across India.",
    openingHours: "Mo-Fr 09:00-18:00",
    sameAs: [
      "https://github.com/rahul1015s",
      "https://linkedin.com/in/rahul1015s",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Freelance Web Developer India",
        item: `${SITE_URL}/freelance-web-developer-patna`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <main className="case-files-shell min-h-screen pt-24 pb-10">
        <section className="case-stage pb-24">
          <div className="case-masthead">
            <div>
              <span className="case-kicker">India Field Office</span>
              <h1 className="case-title">Freelance Web Developer Across India</h1>
            </div>

            <div className="case-masthead-meta">
              <div>Patna based · India wide</div>
              <div>Available for business websites and web apps</div>
            </div>
          </div>

          <div className="case-subrule">
            <span>Nationwide service coverage</span>
            <span>React, Next.js, Node.js, MongoDB</span>
          </div>

          <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_280px] md:items-start">
            <div>
              <p className="case-kicker">Positioning</p>
              <h2 className="case-detail-title">
                A Patna-based developer for teams across India that want modern execution without a bloated agency process.
              </h2>
              <p className="case-detail-tagline">
                I build websites, web apps, landing pages, and SEO-aware digital systems for
                businesses that need clarity, speed, and maintainable architecture.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {primaryLinks.map((item) => {
                  const Icon = item.icon;
                  const sharedClassName =
                    "case-nav-link group inline-flex items-center gap-2 transition-transform duration-200 hover:-translate-y-0.5";

                  if (item.external) {
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className={sharedClassName}
                      >
                        <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                        <span>{item.label}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    );
                  }

                  return (
                    <Link key={item.label} href={item.href} className={sharedClassName}>
                      <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                      <span>{item.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="case-index-card">
              <div className="case-index-row">
                <span className="case-index-label">Focus</span>
                <span className="case-index-value">Business websites, product UIs, technical SEO</span>
              </div>
              <div className="case-index-row">
                <span className="case-index-label">Clients</span>
                <span className="case-index-value">Brands, founders, and service businesses across India</span>
              </div>
              <div className="case-index-row">
                <span className="case-index-label">Workflow</span>
                <span className="case-index-value">Direct collaboration, low-noise execution</span>
              </div>
              <div className="case-index-row">
                <span className="case-index-label">Contact</span>
                <a
                  href={`tel:${CONTACT_PHONE_E164}`}
                  className="case-index-value underline-offset-4 hover:underline"
                >
                  {CONTACT_PHONE}
                </a>
              </div>
            </div>
          </div>

          <hr className="case-divider case-divider-thin" />

          <section>
            <div className="case-section-label">Why Work Local</div>
            <div className="grid gap-6 md:grid-cols-2">
              {localAdvantages.map((item) => (
                <div key={item} className="case-index-card">
                  <div className="case-index-value text-left">{item}</div>
                </div>
              ))}
            </div>
          </section>

          <hr className="case-divider case-divider-thin" />

          <section>
            <div className="case-section-label">Offer Types</div>
            <div className="space-y-0">
              {offerCards.map((item, index) => (
                <div key={item.title} className="case-file-row">
                  <div className="case-file-number">
                    No.{String(index + 1).padStart(2, "0")}
                  </div>

                  <div>
                    <h3 className="case-file-heading">{item.title}</h3>
                    <p className="case-file-copy">{item.copy}</p>
                  </div>

                  <div className="case-file-meta">
                    <span className="case-stamp case-stamp-live">OPEN</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="case-divider case-divider-thin" />

          <section>
            <div className="case-section-label">Questions</div>
            <div className="space-y-6">
              {faqItems.map((item) => (
                <div
                  key={item.question}
                  className="border border-[#b7a888] bg-[#f6f0e2] p-5 shadow-[4px_4px_0_rgba(33,30,26,0.12)]"
                >
                  <h3 className="case-file-heading">{item.question}</h3>
                  <p className="case-section-body mt-4 max-w-none">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <hr className="case-divider case-divider-thin" />

          <section>
            <div className="case-section-label">Contact Desk</div>
            <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_280px]">
              <div>
                <p className="case-section-body">
                  If you want to launch or rebuild something for an Indian audience, send the
                  business context, what the current site is missing, and the kind of outcome you
                  want. I can help shape both the technical system and the page structure.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={`mailto:${CONTACT_EMAIL}`} className="case-nav-link">
                    {CONTACT_EMAIL}
                  </a>
                  <a href={`tel:${CONTACT_PHONE_E164}`} className="case-nav-link">
                    {CONTACT_PHONE}
                  </a>
                  <Link href="/#contact" className="case-nav-link">
                    Contact form
                  </Link>
                  <Link href="/blog" className="case-nav-link">
                    Read how I build
                  </Link>
                </div>
              </div>

              <div className="case-index-card">
                <div className="case-index-row">
                  <span className="case-index-label">Reply style</span>
                  <span className="case-index-value">Direct, practical, low-jargon</span>
                </div>
                <div className="case-index-row">
                  <span className="case-index-label">Best briefs</span>
                  <span className="case-index-value">Business goals, current blockers, launch timeline</span>
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}
