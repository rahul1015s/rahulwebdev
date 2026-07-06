import Link from "next/link";
import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";

import { experiences } from "@/data/experience";
import { personalInfo } from "@/data/personal-info";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";

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
        url: "/og-home.svg",
        width: 1200,
        height: 630,
        alt: "Rahul Verma Portfolio Preview",
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
    images: ["/og-home.svg"],
  },
};

export default function HomePage() {
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
            <div className="case-masthead">
              <div>
                <span className="case-kicker">Rahul Verma · Full-Stack Developer</span>
                <h1 className="case-title">Field Office</h1>
              </div>

              <div className="case-masthead-meta">
                <div>Patna, Bihar - IN</div>
                <div>Available for product and web work</div>
              </div>
            </div>

            <div className="case-subrule">
              <span>Full stack web developer</span>
              <span>React, Next.js, Node.js, MongoDB</span>
            </div>

            <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_280px] md:items-start">
              <div>
                <p className="case-kicker">What I Do</p>
                <h2 className="case-detail-title">
                  I build business websites, web apps, and full-stack products.
                </h2>
                <p className="case-detail-tagline">
                  Built with React, Next.js, Node.js, and MongoDB.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/case-studies" className="case-nav-link">
                    View case studies
                  </Link>
                  <Link href="/blog" className="case-nav-link">
                    Read blog
                  </Link>
                  <a
                    href="https://wa.me/919135271562"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="case-nav-link inline-flex items-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="case-nav-link inline-flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Contact Rahul
                  </a>
                </div>
              </div>

              <div className="case-index-card">
                <div className="case-index-row">
                  <span className="case-index-label">Role</span>
                  <span className="case-index-value">{personalInfo.title}</span>
                </div>
                <div className="case-index-row">
                  <span className="case-index-label">Base</span>
                  <span className="case-index-value">{personalInfo.location}</span>
                </div>
                <div className="case-index-row">
                  <span className="case-index-label">Projects</span>
                  <span className="case-index-value">{projects.length} selected projects</span>
                </div>
                <div className="case-index-row">
                  <span className="case-index-label">Experience</span>
                  <span className="case-index-value">Professional experience</span>
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
                .slice(0, 4)
                .map((project, index) => (
                <div key={project.id} className="case-file-row">
                  <div className="case-file-number">
                    No.{String(index + 1).padStart(2, "0")}
                  </div>

                  <div>
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
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={`mailto:${personalInfo.email}`} className="case-nav-link">
                    {personalInfo.email}
                  </a>
                  <a
                    href="https://wa.me/919135271562"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="case-nav-link"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="https://linkedin.com/in/rahul1015s"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="case-nav-link"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/rahul1015s"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="case-nav-link"
                  >
                    GitHub
                  </a>
                </div>
              </div>

              <div className="case-index-card">
                <div className="case-index-row">
                  <span className="case-index-label">Email</span>
                  <span className="case-index-value">{personalInfo.email}</span>
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
