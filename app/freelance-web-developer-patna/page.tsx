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
  title: "Freelance Web Developer in Patna",
  description:
    "Rahul Verma is a freelance web developer based in Patna. He builds business websites, web applications, and internal tools for clients in Bihar and across India. See recent work and how to start a project.",
  keywords: [
    "freelance web developer in Patna",
    "freelance web developer Patna",
    "web developer in Patna",
    "website developer Patna",
    "web developer Bihar",
    "hire freelance web developer Patna",
    "freelance website developer Patna",
  ],
  authors: [{ name: "Rahul Verma", url: SITE_URL }],
  alternates: {
    canonical: `${SITE_URL}/freelance-web-developer-patna`,
  },
  openGraph: {
    title: "Freelance Web Developer in Patna — Rahul Verma",
    description:
      "Freelance web developer based in Patna, building websites and web apps for clients in Bihar and across India.",
    url: `${SITE_URL}/freelance-web-developer-patna`,
    siteName: "Rahul Web Development",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og/website/freelancer-in-patna.webp",
        width: 1200,
        height: 630,
        alt: "Rahul Verma, freelance web developer in Patna",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelance Web Developer in Patna — Rahul Verma",
    description:
      "Freelance web developer in Patna building websites and web apps for clients across India.",
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

const buildsList = [
  {
    title: "Business websites",
    copy: "Sites that explain what a business does and make it easy to get in touch, with a content structure that holds up as the business grows.",
  },
  {
    title: "Web applications",
    copy: "Member areas, portals, booking flows, and tools with real screens and logic, not a template stretched to fit.",
  },
  {
    title: "Dashboards and internal tools",
    copy: "Admin panels and operational views for the people running things day to day: records, filters, reporting, and exports.",
  },
  {
    title: "Rebuilds of existing sites",
    copy: "Taking over a site that is slow, hard to edit, or missing from search, and deciding with you whether a rebuild or a smaller fix is the right call.",
  },
];

const selectedWork = [
  {
    name: "Carryzo CRM",
    detail:
      "Role-based logistics operations platform. Trips, customers, drivers, vehicles, and revenue in one place, with separate views for admins and managers, and CSV and PDF exports.",
    href: "https://crm.carryzo.in/",
  },
  {
    name: "Oplus Cowork",
    detail:
      "Coworking platform with space booking, a member dashboard, and an admin panel. I work on this full time and built it from schema design through deployment.",
    href: "https://opluscowork.com",
  },
  {
    name: "Premex Power Systems",
    detail:
      "Corporate site for a lithium battery and power systems company, with quote-driven enquiry paths and a warranty and support section on top of a fast marketing front end.",
    href: "https://www.premexpowersystems.com/",
  },
  {
    name: "Carryzo Logistics site",
    detail:
      "Marketing site for a logistics company, focused on clear service information and a quote-focused contact flow, built to load fast on mobile.",
    href: "https://www.carryzo.in/",
  },
];

const workflow = [
  "Talk through what you need, who uses it, and what done looks like.",
  "Scope it: pages, screens, data, and anything that needs a backend or a login.",
  "Structure the content and the routes before building.",
  "Build and deploy in small pieces you can look at as they land.",
  "Test the real paths, launch, and hand over analytics and notes.",
  "Stay available for changes and new features afterwards.",
];

const scopeFactors = [
  "Number of pages and how much of the content is custom",
  "Custom features and any third-party integrations",
  "Whether there is an admin area, dashboard, or user login",
  "Backend and API work, and where data is stored",
  "How much design work is needed versus working from a clear reference",
  "Deployment and whether you want ongoing maintenance",
];

const faqItems = [
  {
    question: "Do you work only with clients in Patna?",
    answer:
      "No. I am based in Patna and work with clients across Bihar and the rest of India. Local clients get easier scheduling and in-person calls when that helps; everyone else works over email, calls, and WhatsApp.",
  },
  {
    question: "What do you build most often?",
    answer:
      "Business websites and web applications. Recent work includes a logistics operations CRM, a coworking platform with booking, and a corporate site with a warranty section.",
  },
  {
    question: "Can you take over an existing website?",
    answer:
      "Usually yes. I take on rebuilds and fixes for sites that are slow, hard to update, or not showing up in search. I look at the current site first and tell you whether a rebuild or a smaller change makes more sense.",
  },
  {
    question: "How much does a project cost?",
    answer:
      "It depends on scope. Number of pages, custom features, integrations, whether there is a dashboard or login, and backend work all change the number. Send the details and I will give you a range.",
  },
  {
    question: "What happens after launch?",
    answer:
      "I can stay on for changes, new pages, and small features. Some clients keep a monthly arrangement, others come back when they need something. Either works.",
  },
  {
    question: "Which technologies do you use?",
    answer:
      "React and Next.js on the front end, Node.js and MongoDB on the back end. The stack matters less than the site doing what the business needs.",
  },
];

export default function FreelanceWebDeveloperPatnaPage() {
  const primaryLinks = [
    { href: "/contact", label: "Start a project", icon: Mail, external: false },
    { href: "/case-studies", label: "Case studies", icon: BriefcaseBusiness, external: false },
    { href: "/services", label: "Full service list", icon: ScanSearch, external: false },
    {
      href: `https://wa.me/${CONTACT_PHONE_E164.replace("+", "")}`,
      label: "WhatsApp",
      icon: MessageCircleMore,
      external: true,
    },
  ] as const;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Rahul Verma — Freelance Web Developer",
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
      "Freelance web developer based in Patna, building websites and web applications for clients across Bihar and India.",
    openingHours: "Mo-Fr 09:00-18:00",
    areaServed: [
      { "@type": "City", name: "Patna" },
      { "@type": "State", name: "Bihar" },
      { "@type": "Country", name: "India" },
    ],
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
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Freelance Web Developer in Patna",
        item: `${SITE_URL}/freelance-web-developer-patna`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="case-files-shell min-h-screen pt-24 pb-10">
        <section className="case-stage pb-24">
          <div className="case-masthead">
            <div>
              <span className="case-kicker">Patna, Bihar</span>
              <h1 className="case-title">Freelance web developer in Patna</h1>
            </div>

            <div className="case-masthead-meta">
              <div>Available for new projects</div>
              <div>Clients in Bihar and across India</div>
            </div>
          </div>

          <div className="case-subrule">
            <span>Websites, web apps, internal tools</span>
            <span>React, Next.js, Node.js</span>
          </div>

          <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_280px] md:items-start">
            <div>
              <p className="case-kicker">About</p>
              <h2 className="case-detail-title">
                I build websites and web apps for businesses in Patna and the rest of India.
              </h2>
              <p className="case-detail-tagline">
                I work directly with the person making the decision, not through an account manager.
                That keeps the feedback loop short and the scope honest. Most of my work is business
                websites and web applications; a fair amount is taking over sites that need a rebuild.
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
                <span className="case-index-label">Based in</span>
                <span className="case-index-value">Patna, Bihar</span>
              </div>
              <div className="case-index-row">
                <span className="case-index-label">Works with</span>
                <span className="case-index-value">Businesses, founders, and teams across India</span>
              </div>
              <div className="case-index-row">
                <span className="case-index-label">Stack</span>
                <span className="case-index-value">React, Next.js, Node.js, MongoDB</span>
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
            <div className="grid gap-6 md:grid-cols-2">
              {buildsList.map((item) => (
                <div key={item.title} className="case-index-card">
                  <h3 className="case-file-heading">{item.title}</h3>
                  <p className="case-section-body mt-3 max-w-none">{item.copy}</p>
                </div>
              ))}
            </div>
          </section>

          <hr className="case-divider case-divider-thin" />

          <section>
            <div className="case-section-label">Selected work</div>
            <div className="space-y-0">
              {selectedWork.map((project, index) => (
                <div key={project.name} className="case-file-row">
                  <div className="case-file-number">
                    No.{String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="case-file-heading">{project.name}</h3>
                    <p className="case-file-copy">{project.detail}</p>
                  </div>
                  <div className="case-file-meta">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="case-nav-link"
                    >
                      Visit
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <p className="case-section-body mt-6">
              Longer write-ups on how a few of these were built are in the{" "}
              <Link href="/case-studies" className="underline underline-offset-4">
                case studies
              </Link>
              .
            </p>
          </section>

          <hr className="case-divider case-divider-thin" />

          <section>
            <div className="case-section-label">How I work</div>
            <ol className="case-section-body max-w-none space-y-3">
              {workflow.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="shrink-0 font-[family-name:var(--font-ibm-plex-mono)] text-[#55503f]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <hr className="case-divider case-divider-thin" />

          <section>
            <div className="case-section-label">Working from Patna</div>
            <p className="case-section-body">
              I live and work in Patna, so calls are in IST and I can meet in person locally when a
              project genuinely benefits from it. For clients elsewhere in Bihar and across India,
              everything runs over calls, email, and WhatsApp, which is how most projects go anyway.
              There is no office to visit; it is just me doing the work.
            </p>
          </section>

          <hr className="case-divider case-divider-thin" />

          <section>
            <div className="case-section-label">What affects scope and cost</div>
            <p className="case-section-body">
              There is no single price for a website. These are the things that move the number the
              most:
            </p>
            <ul className="case-section-body mt-4 max-w-none list-disc space-y-2 pl-5">
              {scopeFactors.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="case-section-body mt-4">
              Send the details and I will give you a range. There is also a longer write-up on{" "}
              <Link href="/blog/website-cost-in-india" className="underline underline-offset-4">
                what drives website cost in India
              </Link>
              .
            </p>
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
            <div className="case-section-label">Get in touch</div>
            <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_280px]">
              <div>
                <p className="case-section-body">
                  Tell me what you want to build, what exists today, and any deadline. I will reply
                  with what the work involves and whether I am the right fit. The{" "}
                  <Link href="/contact" className="underline underline-offset-4">
                    contact page
                  </Link>{" "}
                  has a short checklist of what to include.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={`mailto:${CONTACT_EMAIL}`} className="case-nav-link">
                    {CONTACT_EMAIL}
                  </a>
                  <a href={`tel:${CONTACT_PHONE_E164}`} className="case-nav-link">
                    {CONTACT_PHONE}
                  </a>
                  <Link href="/services" className="case-nav-link">
                    Service list
                  </Link>
                </div>
              </div>

              <div className="case-index-card">
                <div className="case-index-row">
                  <span className="case-index-label">Reply style</span>
                  <span className="case-index-value">Direct, low jargon</span>
                </div>
                <div className="case-index-row">
                  <span className="case-index-label">Best briefs</span>
                  <span className="case-index-value">Goal, current state, timeline</span>
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>
    </>
  );
}
