import type { Metadata } from "next";
import Link from "next/link";
import { generateBreadcrumbStructuredData } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const PUBLISHED = "2026-09-08";

export const metadata: Metadata = {
  title: { absolute: "How Much Does a Website Cost in India? | Rahul Verma" },
  description:
    "A developer's breakdown of what actually drives website cost in India, from a simple marketing site to a web app with a backend, so you can estimate the scope of your own project before asking for a quote.",
  keywords: [
    "website cost in India",
    "website development cost India",
    "how much does a website cost",
    "small business website cost India",
    "web application development cost",
  ],
  alternates: {
    canonical: `${SITE_URL}/blog/website-cost-in-india`,
  },
  openGraph: {
    title: "How Much Does a Website Cost in India?",
    description:
      "What actually drives website cost, from a marketing site to a web app with a backend.",
    url: `${SITE_URL}/blog/website-cost-in-india`,
    siteName: "Rahul Web Development",
    locale: "en_IN",
    type: "article",
    publishedTime: PUBLISHED,
    authors: [`${SITE_URL}`],
    images: [
      {
        url: "/og/website/blog.webp",
        width: 1200,
        height: 630,
        alt: "How much does a website cost in India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How Much Does a Website Cost in India?",
    description: "What actually drives website cost, from a marketing site to a web app.",
    images: ["/og/website/blog.webp"],
  },
};

const ladder = [
  {
    tier: "A marketing site",
    body: "A handful of pages that explain what a business does: home, about, services, contact. The content is mostly fixed. This is the cheapest and fastest thing to build because there is no data model and nothing to log into.",
    drivers: "Cost goes up with page count, custom design, animation, and how much of the copy and imagery you need help producing.",
  },
  {
    tier: "A business site with a CMS",
    body: "The same kind of site, but you can edit content yourself: blog posts, a project list, team members, testimonials. Now there is a small database and an admin area, so it takes longer to build and test.",
    drivers: "Cost goes up with the number of content types, how flexible the editing needs to be, and whether non-technical staff will manage it.",
  },
  {
    tier: "A site with a real front-end app",
    body: "Search, filtering, a booking or enquiry flow, a configurator, a calculator. Individual features that hold state and talk to an API. Each one is a small project on its own.",
    drivers: "Cost tracks the number of interactive features and how much edge-case handling each one needs.",
  },
  {
    tier: "A web application with a backend",
    body: "User accounts, a dashboard, records people create and edit, permissions. This is software, not a website. It needs a data model, authentication, an API, and a lot more testing.",
    drivers: "Cost is driven by the number of screens, the number of user roles, integrations with other systems, and reporting or export requirements.",
  },
  {
    tier: "A multi-role operations system",
    body: "Different people see different things: an admin, a manager, a field user, a customer. Analytics, notifications, exports, audit trails. The kind of system that replaces spreadsheets and three separate tools.",
    drivers: "Cost scales with the number of distinct workspaces, the depth of each one, and how much existing data has to be migrated in.",
  },
];

const pushesUp = [
  "Integrations with payment, messaging, maps, or a CRM the business already uses",
  "Authentication, especially with multiple roles or single sign-on",
  "Custom design work versus building from a clear reference you already like",
  "A large amount of content that has to be written, formatted, or migrated",
  "A fixed launch date that compresses the schedule",
  "Ongoing changes after launch, which are worth budgeting for rather than treating as a surprise",
];

const recurring = [
  "A domain name, renewed yearly",
  "Hosting, which for most sites is low cost and sometimes free at small scale",
  "Email, analytics, and any paid third-party services the site depends on",
  "Maintenance: dependency updates, small fixes, and new pages or features over time",
];

const faq = [
  {
    q: "Is a cheap template site ever the right call?",
    a: "Yes. If you need something online this week to look credible and you have no custom requirements, a good template on a hosted platform is a reasonable start. The trade-off is that it gets harder to change and to make fast as your needs grow.",
  },
  {
    q: "Why do two quotes for the same site differ so much?",
    a: "Usually because they are not quoting the same thing. One might assume you supply final content and design; another might include copywriting, a CMS, and post-launch support. Compare what is in scope, not just the number.",
  },
  {
    q: "Should I pay hourly or a fixed price?",
    a: "Fixed price works when the scope is clear and unlikely to move. Hourly or milestone-based works better for apps where you will discover requirements as you go. For most small business sites, a fixed price with a defined change process is fine.",
  },
];

export default function WebsiteCostInIndiaPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "How Much Does a Website Cost in India?",
    description:
      "A developer's breakdown of what drives website cost in India, from a marketing site to a web application with a backend.",
    image: `${SITE_URL}/og/website/blog.webp`,
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    author: { "@type": "Person", name: "Rahul Verma", url: SITE_URL },
    publisher: { "@type": "Person", name: "Rahul Verma" },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/website-cost-in-india`,
    },
    url: `${SITE_URL}/blog/website-cost-in-india`,
    articleSection: "Blog",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const breadcrumbSchema = generateBreadcrumbStructuredData([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: "How much does a website cost in India?", url: "/blog/website-cost-in-india" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
        <article className="case-stage pb-24">
          <Link href="/blog" className="case-back-link">
            Back to blog
          </Link>

          <div className="case-detail-header">
            <div>
              <div className="case-detail-id">Guide · Pricing</div>
              <h1 className="case-detail-title">How much does a website cost in India?</h1>
              <p className="case-detail-tagline">
                There is no single price, and anyone who gives you one before hearing what you need
                is guessing. What follows is how I think about it when someone asks, so you can
                estimate the shape of your own project before getting a quote.
              </p>
            </div>
          </div>

          <hr className="case-divider" />

          <section>
            <div className="case-section-label">The honest answer</div>
            <div className="case-section-body">
              <p>
                Website cost tracks two things: how complex the thing is, and who builds it. A
                student building their first site, a freelancer, a small studio, and a large agency
                will quote very different numbers for the same brief, mostly because of overhead and
                risk, not skill.
              </p>
              <p>
                Complexity is the part you can reason about yourself. The ladder below goes from the
                cheapest kind of build to the most involved. Most business projects sit on the first
                three rungs.
              </p>
            </div>
          </section>

          <hr className="case-divider case-divider-thin" />

          <section>
            <div className="case-section-label">A ladder of complexity</div>
            <div className="space-y-5">
              {ladder.map((rung, index) => (
                <div
                  key={rung.tier}
                  className="border border-[#b7a888] bg-[#f6f0e2] p-5 shadow-[4px_4px_0_rgba(33,30,26,0.12)]"
                >
                  <h3 className="case-file-heading">
                    {index + 1}. {rung.tier}
                  </h3>
                  <p className="case-section-body mt-3 max-w-none">{rung.body}</p>
                  <p className="case-file-copy mt-2 max-w-none">{rung.drivers}</p>
                </div>
              ))}
            </div>
          </section>

          <hr className="case-divider case-divider-thin" />

          <section>
            <div className="case-section-label">What pushes the number up</div>
            <ul className="case-section-body max-w-none list-disc space-y-2 pl-5">
              {pushesUp.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <hr className="case-divider case-divider-thin" />

          <section>
            <div className="case-section-label">Costs that are not the build</div>
            <p className="case-section-body">
              A build is a one-time cost. A few things run on after it:
            </p>
            <ul className="case-section-body mt-3 max-w-none list-disc space-y-2 pl-5">
              {recurring.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <hr className="case-divider case-divider-thin" />

          <section>
            <div className="case-section-label">Questions</div>
            <div className="space-y-6">
              {faq.map((item) => (
                <div
                  key={item.q}
                  className="border border-[#b7a888] bg-[#f6f0e2] p-5 shadow-[4px_4px_0_rgba(33,30,26,0.12)]"
                >
                  <h3 className="case-file-heading">{item.q}</h3>
                  <p className="case-section-body mt-3 max-w-none">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <hr className="case-divider case-divider-thin" />

          <section>
            <div className="case-section-label">Getting a real number</div>
            <p className="case-section-body">
              Write down which rung you are on, what has to integrate with what, and your deadline.
              That is usually enough for a useful range. You can see the kinds of projects I take on
              in the{" "}
              <Link href="/services" className="underline underline-offset-4">
                services
              </Link>{" "}
              list and the{" "}
              <Link href="/case-studies" className="underline underline-offset-4">
                case studies
              </Link>
              , or{" "}
              <Link href="/contact" className="underline underline-offset-4">
                send me the details
              </Link>{" "}
              and I will give you one. If you are hiring locally, there is more on the{" "}
              <Link href="/freelance-web-developer-patna" className="underline underline-offset-4">
                Patna page
              </Link>
              .
            </p>
          </section>
        </article>
      </div>
    </>
  );
}
