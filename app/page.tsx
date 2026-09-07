import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Github,
  Linkedin,
  Mail,
  MapPinned,
  MessageCircleMore,
  Phone,
  ScanSearch,
} from "lucide-react";

import { experiences } from "@/data/experience";
import { personalInfo } from "@/data/personal-info";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { CONTACT_PHONE, CONTACT_PHONE_E164 } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rahul Verma - Freelance Full Stack Developer in Patna, Bihar",
  description:
    "Rahul Verma is a freelance full stack developer in Patna, Bihar, India specializing in React, Next.js, Node.js, and MongoDB for business websites and web apps.",
  keywords: [
    "Rahul1015s",
    "Rahul Verma web developer",
    "Freelance web developer in Patna",
    "Web developer in Bihar",
    "Full stack developer Patna",
    "rahulwebdev.in",
  ],
  alternates: {
    canonical: "https://rahulwebdev.in/",
  },
  openGraph: {
    title: "Rahul Verma - Freelance Full Stack Developer in Patna, Bihar",
    description:
      "Freelance full stack web development services by Rahul Verma in Patna, Bihar for startups, professionals, and local businesses.",
    url: "https://rahulwebdev.in",
    siteName: "Rahul Web Development",
    images: [
      {
        url: "/og/website/rahulwebdev.webp",
        width: 1200,
        height: 630,
        alt: "Rahul Verma portfolio preview showing freelance full stack development services in Patna, Bihar",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Verma - Freelance Full Stack Developer in Patna, Bihar",
    description:
      "Freelance full stack developer in Patna, Bihar building high-performance web apps with React and Next.js.",
    images: ["/og/website/rahulwebdev.webp"],
  },
};

export default function HomePage() {
  const primaryLinks = [
    {
      href: "/case-studies",
      label: "View case studies",
      icon: BriefcaseBusiness,
      external: false,
    },
    {
      href: "/blog",
      label: "Read blog",
      icon: ScanSearch,
      external: false,
    },
    {
      href: "/services",
      label: "Patna web services",
      icon: MapPinned,
      external: false,
    },
    {
      href: "/freelance-web-developer-patna",
      label: "Patna SEO landing page",
      icon: MapPinned,
      external: false,
    },
    {
      href: "https://wa.me/919135271562",
      label: "WhatsApp",
      icon: MessageCircleMore,
      external: true,
    },
    {
      href: `mailto:${personalInfo.email}`,
      label: "Contact Rahul",
      icon: Mail,
      external: true,
    },
  ] as const;

  const portfolioStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rahul Web Development",
    description:
      "Freelance full stack web developer portfolio for Patna, Bihar and India clients.",
    url: "https://rahulwebdev.in",
    author: {
      "@type": "Person",
      name: "Rahul Verma",
      jobTitle: "Full Stack Developer",
    },
    publisher: {
      "@type": "Person",
      name: "Rahul Verma",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://rahulwebdev.in/blog?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can business owners hire Rahul Verma for websites and web applications?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Rahul Verma builds business websites, web applications, dashboards, and SEO-focused digital products for startups, local businesses, and growing teams.",
        },
      },
      {
        "@type": "Question",
        name: "Can students and developers learn from this website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The website includes blogs and case studies that explain real build decisions, architecture choices, frontend engineering patterns, and project outcomes.",
        },
      },
      {
        "@type": "Question",
        name: "Where should I start if I want to study real project work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Start with the case studies for end-to-end project breakdowns, then read the blog for tutorials, technical insights, and implementation guidance.",
        },
      },
    ],
  };

  const quickContactLinks = [
    {
      href: `mailto:${personalInfo.email}`,
      label: personalInfo.email,
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
    {
      href: "https://linkedin.com/in/rahul1015s",
      label: "LinkedIn",
      icon: Linkedin,
      external: true,
    },
    {
      href: "https://github.com/rahul1015s",
      label: "GitHub",
      icon: Github,
      external: true,
    },
  ] as const;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <main className="case-files-shell min-h-screen pt-24 pb-10">
        <div className="case-stage pb-24">
          <section>
            <div className="px-0 py-4 sm:py-6 lg:py-8">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#211e1a]/15 bg-white/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2b4363]">
                  <BriefcaseBusiness className="h-3.5 w-3.5" />
                  <span>Available for product and web work</span>
                </div>

                <h1 className="mt-5 text-4xl font-semibold leading-[0.95] tracking-[-0.03em] text-[#211e1a] sm:text-5xl lg:text-6xl">
                  I build polished digital products that feel as sharp as the business behind them.
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-7 text-[#4b4338] sm:text-lg">
                  From fast-moving marketing sites to full-stack web apps, I turn ideas into thoughtful interfaces, reliable systems, and launch-ready experiences.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {primaryLinks.slice(0, 2).map((item) => {
                    const Icon = item.icon;
                    const sharedClassName =
                      "case-nav-link group inline-flex items-center gap-2 rounded-full border border-[#211e1a]/15 bg-[#fcf7eb] px-4 py-2.5 transition-transform duration-200 hover:-translate-y-0.5";

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
                  <Link href="/services" className="case-nav-link inline-flex items-center gap-2 rounded-full border border-[#211e1a]/15 bg-transparent px-4 py-2.5">
                    <ScanSearch className="h-4 w-4" />
                    <span>Services in Patna</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <hr className="case-divider case-divider-thin" />

          <section id="projects">
            <div className="case-section-label">Selected Work</div>
            <div className="space-y-0">
              {projects
                .filter((project) => project.name !== "AuthEdge")
                .slice(0, 5)
                .map((project, index) => (
                <div key={project.id} className="case-file-row">
                  <div className="case-file-number">
                    No.{String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="min-w-0 flex-1">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <div className="cursor-pointer">
                          <h3 className="case-file-heading">{project.name}</h3>
                          <p className="case-file-copy">{project.longDescription}</p>
                          <div className="case-tag-list">
                            {project.technologies.slice(0, 5).map((tech) => (
                              <span key={tech} className="case-tag">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent
                        side="bottom"
                        align="start"
                        avoidCollisions={true}
                        className="w-[22rem] max-w-[90vw] overflow-hidden border border-border/60 bg-background p-0 shadow-lg sm:w-[26rem]"
                      >
                        {project.previewImage ? (
                          <div className="relative aspect-video w-full overflow-hidden bg-muted">
                            <img
                              src={project.previewImage}
                              alt={`${project.name} preview`}
                              loading="eager"
                              decoding="async"
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                        ) : null}
                        <div className="p-4">
                          <p className="text-sm font-semibold text-foreground">{project.name}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{project.description}</p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>

                  <div className="case-file-meta">
                    <span
                      className={`case-stamp ${
                        project.status === "Live"
                          ? "case-stamp-live"
                          : project.status === "In Progress"
                            ? "case-stamp-building"
                            : "case-stamp-archived"
                      }`}
                    >
                      {project.status.toUpperCase()}
                    </span>
                    <div className="flex flex-col items-end gap-1 text-right">
                      {project.liveUrl && project.liveUrl !== "#" ? (
                        <a href={project.liveUrl} className="case-nav-link" target="_blank" rel="noopener noreferrer">
                          Visit
                        </a>
                      ) : null}
                      {project.githubUrl && project.githubUrl !== "#" ? (
                        <a href={project.githubUrl} className="case-nav-link" target="_blank" rel="noopener noreferrer">
                          Source
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="case-divider case-divider-thin" />

          <section id="skills">
            <div className="case-section-label">Capabilities</div>
            <div className="grid gap-6 md:grid-cols-3">
              {skills.map((group) => (
                <div key={group.category} className="case-index-card min-w-0">
                  <div className="mb-4 case-index-label">{group.category}</div>
                  <div className="space-y-3">
                    {group.items.map((item) => (
                      <div key={item.name} className="case-index-row">
                        <span className="case-index-value text-left">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="case-divider case-divider-thin" />

          <section id="about">
            <div className="case-section-label">Experience Log</div>
            <div className="space-y-6">
              {experiences.map((experience) => (
                <div key={experience.id} className="border border-[#b7a888] bg-[#f6f0e2] p-5 shadow-[4px_4px_0_rgba(33,30,26,0.12)]">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="case-file-heading">{experience.company}</h3>
                      <p className="case-file-copy mb-0">
                        {experience.position} · {experience.location}
                      </p>
                    </div>
                    <span className="case-stamp case-stamp-live">{experience.type.toUpperCase()}</span>
                  </div>

                  <p className="case-section-body mt-4 max-w-none">{experience.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="case-tag">{experience.period}</span>
                    {experience.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="case-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="case-divider case-divider-thin" />

          <section id="contact">
            <div className="case-section-label">Contact Desk</div>
            <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_280px]">
              <div>
                <p className="case-section-body">
                  I work best on business websites, product-style interfaces,
                  dashboards, and full-stack builds that need both clean frontend
                  execution and practical backend decisions.
                </p>
                <p className="mt-4 case-file-copy">
                  If you already know what you need, call or message directly and I can reply faster
                  than a long back-and-forth.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {quickContactLinks.map((item) => {
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
                  <Link href="/services" className="case-nav-link">
                    Services in Patna
                  </Link>
                  <Link href="/freelance-web-developer-patna" className="case-nav-link">
                    Local SEO page
                  </Link>
                </div>
              </div>

              <div className="case-index-card">
                <div className="case-index-row">
                  <span className="case-index-label">Email</span>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="case-index-value underline-offset-4 hover:underline"
                  >
                    {personalInfo.email}
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
                <div className="case-index-row">
                  <span className="case-index-label">Timezone</span>
                  <span className="case-index-value">IST</span>
                </div>
                <div className="case-index-row">
                  <span className="case-index-label">Primary Work</span>
                  <span className="case-index-value">Web apps and product UI</span>
                </div>
                <div className="case-index-row">
                  <span className="case-index-label">Next Step</span>
                  <span className="case-index-value">Send brief or project scope</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
