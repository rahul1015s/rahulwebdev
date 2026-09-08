import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail, MessageCircleMore, Phone } from "lucide-react";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_E164,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project or ask a question. What to include in a first message, which projects are a good fit, and the direct ways to reach Rahul Verma.",
  keywords: ["contact Rahul Verma", "hire Rahul Verma", "web developer contact", "start a project"],
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: "Contact — Rahul Verma",
    description:
      "How to start a project with Rahul Verma: what to send, what is a good fit, and where to reach him.",
    url: `${SITE_URL}/contact`,
    siteName: "Rahul Web Development",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og/website/rahulwebdev.webp",
        width: 1200,
        height: 630,
        alt: "Contact Rahul Verma",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Rahul Verma",
    description: "How to start a project with Rahul Verma.",
    images: ["/og/website/rahulwebdev.webp"],
  },
};

const briefChecklist = [
  "What you want to build, in a sentence or two",
  "What exists today: a current site, a design, a document, or nothing yet",
  "Who will use it and what they need to get done",
  "Any deadline or event you are working towards",
  "A rough budget range, if you have one",
];

const goodFit = [
  "Business websites and rebuilds",
  "Web applications: portals, member areas, booking flows",
  "Dashboards, admin panels, and internal tools",
  "Adding features to an existing React or Next.js project",
];

const notAFit = [
  "Fixed low-budget template sites",
  "Native mobile apps (iOS or Android)",
  "Ongoing SEO retainers with no development work",
  "Work that needs someone on site full time",
];

const mailSubject = encodeURIComponent("Project enquiry");
const mailBody = encodeURIComponent(
  [
    "What I want to build:",
    "",
    "What exists today:",
    "",
    "Who uses it:",
    "",
    "Deadline (if any):",
    "",
    "Rough budget range (if any):",
    "",
  ].join("\n"),
);

export default function ContactPage() {
  const contactMethods = [
    {
      label: "Email",
      value: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}?subject=${mailSubject}&body=${mailBody}`,
      icon: Mail,
    },
    {
      label: "WhatsApp",
      value: "Message on WhatsApp",
      href: `https://wa.me/${CONTACT_PHONE_E164.replace("+", "")}`,
      icon: MessageCircleMore,
      external: true,
    },
    {
      label: "Phone",
      value: CONTACT_PHONE,
      href: `tel:${CONTACT_PHONE_E164}`,
      icon: Phone,
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/rahul1015s",
      href: "https://linkedin.com/in/rahul1015s",
      icon: Linkedin,
      external: true,
    },
    {
      label: "GitHub",
      value: "github.com/rahul1015s",
      href: "https://github.com/rahul1015s",
      icon: Github,
      external: true,
    },
  ];

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact — Rahul Verma",
    url: `${SITE_URL}/contact`,
    mainEntity: {
      "@type": "Person",
      name: "Rahul Verma",
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE,
      url: SITE_URL,
      sameAs: [
        "https://github.com/rahul1015s",
        "https://linkedin.com/in/rahul1015s",
      ],
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contact` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="case-files-shell min-h-screen pt-24 pb-10">
        <section className="case-stage pb-24">
          <div className="case-masthead">
            <div>
              <span className="case-kicker">Contact</span>
              <h1 className="case-title">Start a project</h1>
            </div>

            <div className="case-masthead-meta">
              <div>Patna, IST</div>
              <div>Replies come from me, not an inbox bot</div>
            </div>
          </div>

          <div className="case-subrule">
            <span>Email or WhatsApp is fastest</span>
            <span>Freelance, working across India</span>
          </div>

          <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_280px] md:items-start">
            <div>
              <p className="case-kicker">Before you write</p>
              <h2 className="case-detail-title">
                A few lines of context get you a useful reply faster.
              </h2>
              <p className="case-detail-tagline">
                You do not need a spec. A short message about what you are trying to do is enough to
                start. If it is a fit, the next step is usually a call to work out scope; if it is
                not, I will say so rather than leave you waiting.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${mailSubject}&body=${mailBody}`}
                  className="case-nav-link group inline-flex items-center gap-2 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <Mail className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                  <span>Email with a starter template</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href={`https://wa.me/${CONTACT_PHONE_E164.replace("+", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-nav-link group inline-flex items-center gap-2 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <MessageCircleMore className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                  <span>WhatsApp</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            <div className="case-index-card">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <div key={method.label} className="case-index-row">
                    <span className="case-index-label inline-flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5" />
                      {method.label}
                    </span>
                    <a
                      href={method.href}
                      target={method.external ? "_blank" : undefined}
                      rel={method.external ? "noopener noreferrer" : undefined}
                      className="case-index-value underline-offset-4 hover:underline"
                    >
                      {method.value}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          <hr className="case-divider case-divider-thin" />

          <section>
            <div className="case-section-label">What to include</div>
            <ul className="case-section-body max-w-none list-disc space-y-2 pl-5">
              {briefChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="case-section-body mt-4">
              The email link above opens a message with these as prompts, so you can fill them in
              and send.
            </p>
          </section>

          <hr className="case-divider case-divider-thin" />

          <section>
            <div className="case-section-label">Fit</div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="case-index-card">
                <h3 className="case-file-heading">Usually a good fit</h3>
                <ul className="case-section-body mt-3 max-w-none list-disc space-y-2 pl-5">
                  {goodFit.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="case-index-card">
                <h3 className="case-file-heading">Not something I take on</h3>
                <ul className="case-section-body mt-3 max-w-none list-disc space-y-2 pl-5">
                  {notAFit.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <hr className="case-divider case-divider-thin" />

          <section>
            <div className="case-section-label">While you decide</div>
            <p className="case-section-body">
              If you want to see the work first, the{" "}
              <Link href="/case-studies" className="underline underline-offset-4">
                case studies
              </Link>{" "}
              go into how a few projects were built. The{" "}
              <Link href="/services" className="underline underline-offset-4">
                services page
              </Link>{" "}
              lists what I build, and the{" "}
              <Link href="/freelance-web-developer-patna" className="underline underline-offset-4">
                Patna page
              </Link>{" "}
              covers working together directly.
            </p>
          </section>
        </section>
      </div>
    </>
  );
}
