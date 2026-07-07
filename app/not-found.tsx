import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Home,
  Mail,
  MessageCircleMore,
  Phone,
  ScanSearch,
} from "lucide-react";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_E164 } from "@/lib/site";

const recoveryLinks = [
  {
    href: "/",
    title: "Back to homepage",
    description: "Return to the main field office and browse services, projects, and contact paths.",
    icon: Home,
    external: false,
  },
  {
    href: "/case-studies",
    title: "View case studies",
    description: "Open shipped work, implementation notes, and real project breakdowns.",
    icon: BriefcaseBusiness,
    external: false,
  },
  {
    href: "/blog",
    title: "Read technical notes",
    description: "Browse articles on SEO, frontend systems, and web product decisions.",
    icon: ScanSearch,
    external: false,
  },
  {
    href: `mailto:${CONTACT_EMAIL}`,
    title: "Email Rahul",
    description: "Report a broken link or reach out directly about a project.",
    icon: Mail,
    external: true,
  },
];

const quickContact = [
  {
    href: `mailto:${CONTACT_EMAIL}`,
    label: CONTACT_EMAIL,
    icon: Mail,
    external: true,
  },
  {
    href: `tel:${CONTACT_PHONE_E164}`,
    label: CONTACT_PHONE,
    icon: Phone,
    external: true,
  },
  {
    href: `https://wa.me/${CONTACT_PHONE_E164.replace("+", "")}`,
    label: "WhatsApp",
    icon: MessageCircleMore,
    external: true,
  },
] as const;

export default function NotFound() {
  return (
    <main className="case-files-shell min-h-screen pt-24 pb-10">
      <section className="case-stage pb-24">
        <div className="case-masthead">
          <div>
            <span className="case-kicker">Archive Exception</span>
            <h1 className="case-title">404 / File Not Found</h1>
          </div>

          <div className="case-masthead-meta">
            <div>Route record missing</div>
            <div>Fallback navigation active</div>
          </div>
        </div>

        <div className="case-subrule">
          <span>This page moved, expired, or never existed</span>
          <span>Use the recovery links below</span>
        </div>

        <div className="grid gap-10 md:grid-cols-[minmax(0,1.15fr)_280px] md:items-start">
          <div>
            <p className="case-kicker">Missing Record</p>
            <h2 className="case-detail-title">
              The link you opened is no longer on file, but the rest of the site is still intact.
            </h2>
            <p className="case-detail-tagline">
              You may have hit an outdated portfolio URL, an old shared link, or a path that was
              never published. Jump back into case studies, technical writing, or direct contact
              without hunting around.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {quickContact.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="case-nav-link group inline-flex items-center gap-2 transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                    <span>{item.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="case-index-card">
            <div className="case-index-row">
              <span className="case-index-label">Status</span>
              <span className="case-index-value">404 Not Found</span>
            </div>
            <div className="case-index-row">
              <span className="case-index-label">Fast path</span>
              <span className="case-index-value">Home, blog, case studies, or contact</span>
            </div>
            <div className="case-index-row">
              <span className="case-index-label">Email</span>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="case-index-value underline-offset-4 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
            <div className="case-index-row">
              <span className="case-index-label">Mobile</span>
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
          <div className="case-section-label">Recovery Links</div>
          <div className="space-y-0">
            {recoveryLinks.map((item, index) => {
              const Icon = item.icon;

              const content = (
                <>
                  <div className="case-file-number">
                    No.{String(index + 1).padStart(2, "0")}
                  </div>

                  <div>
                    <h2 className="case-file-heading flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {item.title}
                    </h2>
                    <p className="case-file-copy">{item.description}</p>
                  </div>

                  <div className="case-file-meta">
                    <span className="case-stamp case-stamp-building">OPEN</span>
                  </div>
                </>
              );

              if (item.external) {
                return (
                  <a
                    key={item.title}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="case-file-row"
                  >
                    {content}
                  </a>
                );
              }

              return (
                <Link key={item.title} href={item.href} className="case-file-row">
                  {content}
                </Link>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}
