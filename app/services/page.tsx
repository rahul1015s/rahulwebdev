import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, Mail, MapPinned, MessageCircleMore } from "lucide-react";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_E164,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Web Development Services",
  description:
    "What Rahul Verma builds for businesses and teams across India: business websites, web applications, dashboards, CRM and internal tools, and booking or workflow systems, with the real projects behind each.",
  keywords: [
    "web development services",
    "custom website development",
    "web application development",
    "dashboard development",
    "CRM development",
    "booking system development",
    "Next.js development",
    "full stack developer India",
  ],
  openGraph: {
    title: "Web Development Services — Rahul Verma",
    description:
      "Business websites, web applications, dashboards, CRM and internal tools, and booking systems, built with Next.js, React, and Node.js.",
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/services`,
    siteName: "Rahul Web Development",
    images: [
      {
        url: "/og/website/services.webp",
        width: 1200,
        height: 630,
        alt: "Web development services by Rahul Verma",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development Services — Rahul Verma",
    description:
      "Business websites, web applications, dashboards, CRM and internal tools, and booking systems.",
    images: ["/og/website/services.webp"],
  },
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
};

type ServiceLine = {
  name: string;
  summary: string;
  proof: { label: string; href: string; external?: boolean };
  tags: string[];
};

const serviceLines: ServiceLine[] = [
  {
    name: "Business websites",
    summary:
      "A site that explains what a business does and makes it easy to get in touch. Content structure first, then a fast front end and clean metadata.",
    proof: { label: "Carryzo Logistics site", href: "https://www.carryzo.in/", external: true },
    tags: ["Content structure", "Lead capture", "Performance"],
  },
  {
    name: "Web applications",
    summary:
      "Product-style interfaces with real screens and state: member areas, portals, course access, and tools that go past what a template can do.",
    proof: { label: "Oplus Cowork platform", href: "https://opluscowork.com", external: true },
    tags: ["Auth", "Member dashboards", "App UI"],
  },
  {
    name: "Dashboards and internal tools",
    summary:
      "Admin panels and operational views for the people running the business: filtered lists, record management, analytics, and CSV or PDF exports.",
    proof: { label: "Carryzo CRM", href: "https://crm.carryzo.in/", external: true },
    tags: ["Admin panels", "Reporting", "Exports"],
  },
  {
    name: "CRM and operations systems",
    summary:
      "Role-based systems that put the moving parts of an operation in one place. Carryzo CRM handles trips, customers, drivers, vehicles, and revenue with separate views for admins and managers.",
    proof: { label: "Read the case studies", href: "/case-studies" },
    tags: ["Role-based access", "Operational KPIs", "Notifications"],
  },
  {
    name: "Booking and workflow systems",
    summary:
      "Scheduling, availability, and approval flows. The Oplus Cowork build covers space booking and a member-facing calendar alongside an admin panel.",
    proof: { label: "Oplus Cowork platform", href: "https://opluscowork.com", external: true },
    tags: ["Scheduling", "Availability", "Admin control"],
  },
  {
    name: "Technical SEO and performance",
    summary:
      "Metadata, canonical URLs, structured data, internal linking, and Core Web Vitals work, usually built into a project rather than added later. The Premex build includes structured SEO systems and dynamic sitemap and robots output.",
    proof: { label: "Premex Power Systems", href: "https://www.premexpowersystems.com/", external: true },
    tags: ["Structured data", "Internal linking", "Core Web Vitals"],
  },
];

const buildWorkflow = [
  "Get specific about what the site or app has to do, who uses it, and what counts as finished.",
  "Map the pages, data, and screens before building, so scope is visible early instead of halfway through.",
  "Build in small, reviewable pieces, front end and back end together, deployed as it goes.",
  "Test the real paths, then hand over something you can run: analytics, metadata, and notes on the moving parts.",
];

const goodFit = [
  "A business that needs a first web presence people actually trust",
  "A team replacing spreadsheets or a patchwork of admin screens with one tool",
  "A startup that needs a product-style interface, not a theme",
  "An existing site that is slow, hard to edit, or invisible in search",
];

export default function ServicesPage() {
  const primaryLinks = [
    { href: "/contact", label: "Start a project", icon: Mail, external: false },
    { href: "/case-studies", label: "Case studies", icon: BriefcaseBusiness, external: false },
    {
      href: "/freelance-web-developer-patna",
      label: "Hiring in Patna",
      icon: MapPinned,
      external: false,
    },
    {
      href: `https://wa.me/${CONTACT_PHONE_E164.replace("+", "")}`,
      label: "WhatsApp",
      icon: MessageCircleMore,
      external: true,
    },
  ] as const;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Web Development Services",
    serviceType: [
      "Website development",
      "Web application development",
      "Dashboard and internal tools",
      "CRM and operations systems",
      "Booking and workflow systems",
      "Technical SEO",
    ],
    provider: {
      "@type": "Person",
      name: "Rahul Verma",
      url: SITE_URL,
    },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "City", name: "Patna" },
    ],
    availableLanguage: "en-IN",
    url: `${SITE_URL}/services`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="case-files-shell min-h-screen pt-24 pb-10">
        <section className="case-stage pb-24">
          <div className="case-masthead">
            <div>
              <span className="case-kicker">Service Desk</span>
              <h1 className="case-title">Web development services</h1>
            </div>

            <div className="case-masthead-meta">
              <div>Remote across India</div>
              <div>Websites, web apps, internal systems</div>
            </div>
          </div>

          <div className="case-subrule">
            <span>Built with Next.js, React, Node.js</span>
            <span>Scoped around what the business needs</span>
          </div>

          <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_280px] md:items-start">
            <div>
              <p className="case-kicker">Overview</p>
              <h2 className="case-detail-title">
                Websites, web apps, dashboards, and the systems that run behind them.
              </h2>
              <p className="case-detail-tagline">
                Most projects are one of the things listed below, or a combination. If you already
                know roughly what you need, the fastest path is to send the details and I will tell
                you what is involved.
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
                        target="_blank"
                        rel="noopener noreferrer"
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
                <span className="case-index-label">Stack</span>
                <span className="case-index-value">Next.js, React, Node.js, MongoDB</span>
              </div>
              <div className="case-index-row">
                <span className="case-index-label">Base</span>
                <span className="case-index-value">Patna, working remotely across India</span>
              </div>
              <div className="case-index-row">
                <span className="case-index-label">Timezone</span>
                <span className="case-index-value">IST</span>
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
            <div className="case-section-label">What I build</div>
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
                    <p className="case-file-copy mt-3">
                      Example:{" "}
                      {service.proof.external ? (
                        <a
                          href={service.proof.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-4"
                        >
                          {service.proof.label}
                        </a>
                      ) : (
                        <Link href={service.proof.href} className="underline underline-offset-4">
                          {service.proof.label}
                        </Link>
                      )}
                    </p>
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
            <div className="case-section-label">How a project runs</div>
            <div className="space-y-6">
              {buildWorkflow.map((step, index) => (
                <div
                  key={step}
                  className="border border-[#b7a888] bg-[#f6f0e2] p-5 shadow-[4px_4px_0_rgba(33,30,26,0.12)]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <h3 className="case-file-heading">Step {index + 1}</h3>
                  </div>
                  <p className="case-section-body mt-4 max-w-none">{step}</p>
                </div>
              ))}
            </div>
          </section>

          <hr className="case-divider case-divider-thin" />

          <section>
            <div className="case-section-label">Usually a good fit</div>
            <div className="grid gap-6 md:grid-cols-2">
              {goodFit.map((item) => (
                <div key={item} className="case-index-card">
                  <div className="case-index-value text-left">{item}</div>
                </div>
              ))}
            </div>
          </section>

          <hr className="case-divider case-divider-thin" />

          <section>
            <div className="case-section-label">Next step</div>
            <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_280px]">
              <div>
                <p className="case-section-body">
                  Send what you are trying to build, what exists today, and any deadline. I will
                  reply with what the work involves and whether I am the right person for it. If you
                  are hiring locally, the{" "}
                  <Link href="/freelance-web-developer-patna" className="underline underline-offset-4">
                    Patna page
                  </Link>{" "}
                  has more on working together directly.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/contact" className="case-nav-link">
                    Contact page
                  </Link>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="case-nav-link">
                    {CONTACT_EMAIL}
                  </a>
                  <a href={`tel:${CONTACT_PHONE_E164}`} className="case-nav-link">
                    {CONTACT_PHONE}
                  </a>
                </div>
              </div>

              <div className="case-index-card">
                <div className="case-index-row">
                  <span className="case-index-label">Good briefs include</span>
                  <span className="case-index-value">Goal, current state, timeline</span>
                </div>
                <div className="case-index-row">
                  <span className="case-index-label">Also useful</span>
                  <span className="case-index-value">A site you like, and one you do not</span>
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>
    </>
  );
}
