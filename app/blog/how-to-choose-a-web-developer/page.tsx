import type { Metadata } from "next";
import Link from "next/link";
import { generateBreadcrumbStructuredData } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const PUBLISHED = "2026-09-08";

export const metadata: Metadata = {
  title: { absolute: "How to Choose a Web Developer | Rahul Verma" },
  description:
    "Practical criteria for choosing a web developer: freelancer versus agency versus marketplace, what to check in a portfolio, how scope and communication should work, and who should own the code.",
  keywords: [
    "how to choose a web developer",
    "hire a web developer",
    "freelancer vs agency web development",
    "questions to ask a web developer",
  ],
  alternates: {
    canonical: `${SITE_URL}/blog/how-to-choose-a-web-developer`,
  },
  openGraph: {
    title: "How to Choose a Web Developer",
    description:
      "Freelancer vs agency vs marketplace, what to check in a portfolio, and who should own the code.",
    url: `${SITE_URL}/blog/how-to-choose-a-web-developer`,
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
        alt: "How to choose a web developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Choose a Web Developer",
    description: "Freelancer vs agency vs marketplace, and what to check before you hire.",
    images: ["/og/website/blog.webp"],
  },
};

const options = [
  {
    name: "A freelancer",
    good: "You work with the person doing the build. Fast decisions, direct communication, lower cost than an agency for the same scope.",
    watch: "One person has limits on capacity and availability. Check that they have shipped work at the size you need, and agree on what happens if they are unwell or unavailable mid-project.",
  },
  {
    name: "An agency or studio",
    good: "More capacity, a team across design and development, and someone to call if your main contact leaves. Useful for large or long-running projects.",
    watch: "You are often not talking to the people writing the code. Overhead is higher, and small changes can move slowly through account management.",
  },
  {
    name: "A marketplace hire",
    good: "Fast to start, escrow and dispute handling built in, and a large pool to pick from. Fine for well-defined, contained tasks.",
    watch: "Vetting varies a lot. The incentive is to close tickets, not to understand your business. Communication and timezone gaps are common.",
  },
];

const checklist = [
  "Shipped work you can actually open. A live URL you can click through beats a folder of screenshots. Look for something close to what you need.",
  "Whether they can explain a past project. Ask why they made a particular choice. A good answer is specific and mentions a trade-off, not just a list of technologies.",
  "Technical fit. If you will need to hire again later, a mainstream stack matters. Ask what they would use for your project and why.",
  "How they scope. You want a written scope with what is and is not included, and a clear process for changes, before any money changes hands.",
  "Communication. Agree upfront on how often you will hear from them and through which channel. Silence for two weeks is a bad sign even if the work is fine.",
  "Ownership. The code, the domain, the hosting account, and any third-party services should be in your name or handed to you at the end. Get this in writing.",
  "Deployment and handover. Ask how the site goes live, where it runs, and what you get at the end: access, a short guide, and the ability to make small changes without them.",
  "Maintenance. Dependencies age and things break. Ask what ongoing support looks like and what it costs.",
];

const questions = [
  "Can I see a live project similar to mine, and can you walk me through a decision you made on it?",
  "What is in scope, what is not, and how do change requests work?",
  "Who owns the code and the accounts when we are done?",
  "How will the site be deployed, and what do I get at handover?",
  "What happens after launch if something breaks?",
];

const redFlags = [
  "A quote with no written scope",
  "A portfolio of screenshots with no links, or links that are down",
  "Vague answers about who owns the code",
  "Pressure to pay a large amount upfront with no milestones",
  "No questions back to you about the project",
];

const faq = [
  {
    q: "Is a cheaper developer always a worse choice?",
    a: "No. Price mostly reflects overhead and where someone is in their career, not just skill. A careful freelancer can be both cheaper than an agency and a better fit. Judge the shipped work and how they communicate, then look at price.",
  },
  {
    q: "How important is the exact technology they use?",
    a: "It matters most if you expect to hand the project to someone else later. A widely used stack like React and Next.js means a larger pool of people who can pick it up. An unusual stack is not wrong, but ask why it is the right call for you.",
  },
  {
    q: "Should I hire someone local?",
    a: "It helps for in-person meetings and shared working hours, and it can make accountability feel more real. It is not essential. Plenty of good work happens fully remote. Weigh it against the strength of the portfolio.",
  },
];

export default function HowToChooseAWebDeveloperPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "How to Choose a Web Developer",
    description:
      "Practical criteria for choosing a web developer, covering freelancer vs agency vs marketplace, portfolio checks, scope, code ownership, and maintenance.",
    image: `${SITE_URL}/og/website/blog.webp`,
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    author: { "@type": "Person", name: "Rahul Verma", url: SITE_URL },
    publisher: { "@type": "Person", name: "Rahul Verma" },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/how-to-choose-a-web-developer`,
    },
    url: `${SITE_URL}/blog/how-to-choose-a-web-developer`,
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
    { name: "How to choose a web developer", url: "/blog/how-to-choose-a-web-developer" },
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
              <div className="case-detail-id">Guide · Hiring</div>
              <h1 className="case-detail-title">How to choose a web developer</h1>
              <p className="case-detail-tagline">
                Most of the signals that matter are not on a pricing page. Here is what to compare
                when you are deciding between a freelancer, an agency, and a marketplace hire, and
                what to check before you commit.
              </p>
            </div>
          </div>

          <hr className="case-divider" />

          <section>
            <div className="case-section-label">Freelancer, agency, or marketplace</div>
            <div className="space-y-5">
              {options.map((option) => (
                <div
                  key={option.name}
                  className="border border-[#b7a888] bg-[#f6f0e2] p-5 shadow-[4px_4px_0_rgba(33,30,26,0.12)]"
                >
                  <h3 className="case-file-heading">{option.name}</h3>
                  <p className="case-section-body mt-3 max-w-none">
                    <strong>Works well:</strong> {option.good}
                  </p>
                  <p className="case-section-body mt-2 max-w-none">
                    <strong>Watch for:</strong> {option.watch}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <hr className="case-divider case-divider-thin" />

          <section>
            <div className="case-section-label">What to check</div>
            <ol className="case-section-body max-w-none space-y-4">
              {checklist.map((item, index) => (
                <li key={item} className="flex gap-3">
                  <span className="shrink-0 font-[family-name:var(--font-ibm-plex-mono)] text-[#55503f]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </section>

          <hr className="case-divider case-divider-thin" />

          <section>
            <div className="case-section-label">Questions worth asking</div>
            <ul className="case-section-body max-w-none list-disc space-y-2 pl-5">
              {questions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <hr className="case-divider case-divider-thin" />

          <section>
            <div className="case-section-label">Red flags</div>
            <ul className="case-section-body max-w-none list-disc space-y-2 pl-5">
              {redFlags.map((item) => (
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
            <div className="case-section-label">If you want to compare notes</div>
            <p className="case-section-body">
              The{" "}
              <Link href="/case-studies" className="underline underline-offset-4">
                case studies
              </Link>{" "}
              are an example of the walk-through described above: real projects, live links, and the
              reasoning behind the build. If you are weighing me up for a project, the{" "}
              <Link href="/freelance-web-developer-patna" className="underline underline-offset-4">
                Patna page
              </Link>{" "}
              covers how I work, and you can{" "}
              <Link href="/contact" className="underline underline-offset-4">
                send me the details
              </Link>{" "}
              to get a straight answer on fit.
            </p>
          </section>
        </article>
      </div>
    </>
  );
}
