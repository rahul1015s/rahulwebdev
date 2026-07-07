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
  title: "Web Developer in India | Patna-Based Websites, Apps, SEO",
  description:
    "Website and app development for businesses across India by Rahul Verma, a Patna-based developer. Custom builds, technical SEO, and fast delivery.",
  keywords: [
    "web developer in Patna",
    "website developer Patna Bihar",
    "web development Patna",
    "app development Patna",
    "freelance web developer Bihar",
    "business website Patna",
    "e-commerce website Patna",
    "booking system Patna",
  ],
  openGraph: {
    title: "Web Developer in India | Patna-Based Websites, Apps, SEO",
    description:
      "Custom websites, web apps, and technical SEO for businesses across India by Rahul Verma.",
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/services-patna`,
    siteName: "Rahul Web Development",
    images: [
      {
        url: "/og-home.svg",
        width: 1200,
        height: 630,
        alt: "Web development services across India by Rahul Verma",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Developer in India | Patna-Based Websites, Apps, SEO",
    description:
      "Custom websites, web apps, and technical SEO for businesses across India by Rahul Verma.",
    images: ["/og-home.svg"],
  },
  alternates: {
    canonical: `${SITE_URL}/services-patna`,
  },
};

const serviceLines = [
  {
    name: "Business Websites",
    summary:
      "Fast brochure sites and conversion-focused company websites for shops, clinics, agencies, and local brands.",
    tags: ["Launch pages", "Lead forms", "Local SEO"],
  },
  {
    name: "Custom Web Apps",
    summary:
      "Dashboards, internal tools, portals, and product-style applications for teams that need more than a template site.",
    tags: ["Admin panels", "Authentication", "Data flows"],
  },
  {
    name: "E-commerce & Catalogues",
    summary:
      "Product catalogues, order systems, and commerce experiences that are easy to manage and ready to scale.",
    tags: ["Catalogues", "Payments", "Inventory logic"],
  },
  {
    name: "Technical SEO",
    summary:
      "Metadata, internal linking, schema, crawl hygiene, and page-speed improvements for city pages, service pages, and national search visibility.",
    tags: ["Schema", "Core Web Vitals", "Search visibility"],
  },
];

const buildWorkflow = [
  "Audit the business, offer, and local search intent before touching layout.",
  "Shape the content structure around services, trust signals, and conversion paths.",
  "Build the frontend and backend with clean performance, crawlability, and maintainability.",
  "Launch with analytics, metadata, schema, and a handoff that is easy to operate.",
];

const idealFits = [
  "Businesses anywhere in India that need a trustworthy first web presence",
  "Service brands that want more leads from local search",
  "Startups that need a product-style interface, not a generic template",
  "Teams replacing slow WordPress or patchwork admin workflows",
];

export default function ServicesPatnaPage() {
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
    name: "Rahul Verma - Web Developer",
    image: `${SITE_URL}${PROFILE_IMAGE_PATH}`,
    description: "Professional website and app development for businesses across India",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Patna",
      addressRegion: "Bihar",
      addressCountry: "IN",
    },
    telephone: CONTACT_PHONE,
    email: CONTACT_EMAIL,
    url: `${SITE_URL}/services-patna`,
    areaServed: ["India"],
    serviceType: ["Web Development", "App Development", "E-commerce", "Web Design"],
    knowsAbout: [
      "React",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "Web Development",
      "App Development",
      "SEO",
      "E-commerce",
    ],
    sameAs: [
      "https://github.com/rahul1015s",
      "https://linkedin.com/in/rahul1015s",
      `https://wa.me/${CONTACT_PHONE_E164.replace("+", "")}`,
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Web and App Development Services",
    provider: {
      "@type": "LocalBusiness",
      name: "Rahul Verma",
      areaServed: ["India"],
    },
    areaServed: ["India"],
    availableLanguage: "en-IN",
    url: `${SITE_URL}/services-patna`,
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
        name: "Services India",
        item: `${SITE_URL}/services-patna`,
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
          __html: JSON.stringify(serviceSchema),
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
              <span className="case-kicker">India Service Desk</span>
              <h1 className="case-title">Web Services Across India</h1>
            </div>

            <div className="case-masthead-meta">
              <div>Patna based · India wide</div>
              <div>Sites, apps, SEO systems</div>
            </div>
          </div>

          <div className="case-subrule">
            <span>Freelance full-stack support</span>
            <span>Built for speed, trust, and national reach</span>
          </div>

          <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_280px] md:items-start">
            <div>
              <p className="case-kicker">Service Focus</p>
              <h2 className="case-detail-title">
                Clean websites, web apps, and technical SEO work shaped for real businesses across India.
              </h2>
              <p className="case-detail-tagline">
                I help businesses launch credible digital fronts, tighter admin workflows, and
                better search visibility without the visual noise of a generic agency page.
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
                <span className="case-index-label">Best for</span>
                <span className="case-index-value">Businesses, startups, and service teams across India</span>
              </div>
              <div className="case-index-row">
                <span className="case-index-label">Build stack</span>
                <span className="case-index-value">Next.js, React, Node.js, MongoDB</span>
              </div>
              <div className="case-index-row">
                <span className="case-index-label">Coverage</span>
                <span className="case-index-value">Patna based, remote-friendly across India</span>
              </div>
              <div className="case-index-row">
                <span className="case-index-label">Response</span>
                <span className="case-index-value">Same timezone, practical communication</span>
              </div>
            </div>
          </div>

          <hr className="case-divider case-divider-thin" />

          <section>
            <div className="case-section-label">Service Lines</div>
            <div className="space-y-0">
              {serviceLines.map((service, index) => (
                <div key={service.name} className="case-file-row">
                  <div className="case-file-number">
                    No.{String(index + 1).padStart(2, "0")}
                  </div>

                  <div>
                    <h3 className="case-file-heading">{service.name}</h3>
                    <p className="case-file-copy">{service.summary}</p>
                    <div className="case-tag-list">
                      {service.tags.map((tag) => (
                        <span key={tag} className="case-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="case-file-meta">
                    <span className="case-stamp case-stamp-live">ACTIVE</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="case-divider case-divider-thin" />

          <section>
            <div className="case-section-label">Build Method</div>
            <div className="space-y-6">
              {buildWorkflow.map((step, index) => (
                <div
                  key={step}
                  className="border border-[#b7a888] bg-[#f6f0e2] p-5 shadow-[4px_4px_0_rgba(33,30,26,0.12)]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <h3 className="case-file-heading">Step {index + 1}</h3>
                    <span className="case-stamp case-stamp-building">IN PROCESS</span>
                  </div>
                  <p className="case-section-body mt-4 max-w-none">{step}</p>
                </div>
              ))}
            </div>
          </section>

          <hr className="case-divider case-divider-thin" />

          <section>
            <div className="case-section-label">Best Fit</div>
            <div className="grid gap-6 md:grid-cols-2">
              {idealFits.map((item) => (
                <div key={item} className="case-index-card">
                  <div className="case-index-value text-left">{item}</div>
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
                  If you run a business anywhere in India and need a website, customer-facing app, or
                  technical SEO cleanup, I can help shape the structure, build the system, and
                  keep it grounded in actual business use.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={`mailto:${CONTACT_EMAIL}`} className="case-nav-link">
                    {CONTACT_EMAIL}
                  </a>
                  <a href={`tel:${CONTACT_PHONE_E164}`} className="case-nav-link">
                    {CONTACT_PHONE}
                  </a>
                  <Link href="/freelance-web-developer-patna" className="case-nav-link">
                    Patna developer page
                  </Link>
                </div>
              </div>

              <div className="case-index-card">
                <div className="case-index-row">
                  <span className="case-index-label">Operating base</span>
                  <span className="case-index-value">Patna based, working remotely across India</span>
                </div>
                <div className="case-index-row">
                  <span className="case-index-label">SEO angle</span>
                  <span className="case-index-value">Metadata, schema, internal linking, speed</span>
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}
