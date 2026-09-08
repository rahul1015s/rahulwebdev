import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Lock, ShieldCheck } from "lucide-react";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Rahul Verma's portfolio website, contact forms, newsletter, and analytics practices.",
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

const sections = [
  {
    title: "1. Information We Collect",
    content:
      "When you visit rahulwebdev.in or contact Rahul Verma, we may collect information you voluntarily provide such as your name, email address, phone number, message content, and any information shared through the contact form, newsletter signup, or direct email. We may also collect technical information such as IP address, browser type, device information, referring pages, and basic analytics data to understand site usage and improve performance.",
  },
  {
    title: "2. How We Use Your Information",
    content:
      "We use collected information to respond to inquiries, provide web development services, process newsletter subscriptions, improve website performance and user experience, maintain security, and communicate relevant updates about our work. We do not sell your personal data to third parties.",
  },
  {
    title: "3. Cookies and Analytics",
    content:
      "This website may use cookies, local storage, or analytics tools to understand traffic patterns and improve content delivery. These tools may collect anonymized or aggregated usage data. You can disable cookies in your browser settings, although some site features may not function fully as a result.",
  },
  {
    title: "4. Third-Party Services",
    content:
      "We may use trusted third-party services for hosting, email delivery, analytics, and performance monitoring. These providers process information only as needed to perform their services and are expected to follow appropriate confidentiality and security practices.",
  },
  {
    title: "5. Data Retention and Security",
    content:
      "We retain personal data only for as long as needed to fulfill the purpose for which it was collected, respond to requests, comply with legal obligations, or resolve disputes. We take reasonable technical and organizational measures to protect information, though no online transmission or storage system is completely risk-free.",
  },
  {
    title: "6. Your Rights",
    content:
      "Depending on applicable law, you may have the right to access, correct, delete, or restrict the use of your personal information. If you wish to exercise any of these rights, please contact us at the email below.",
  },
  {
    title: "7. Contact Us",
    content:
      "If you have any questions about this Privacy Policy or how your data is handled, please contact Rahul Verma at hello@rahulwebdev.in.",
  },
] as const;

export default function PrivacyPolicyPage() {
  return (
    <main className="case-files-shell min-h-screen pt-24 pb-10">
      <section className="case-stage pb-24">
        <div className="case-masthead">
          <div>
            <span className="case-kicker">Website Policy</span>
            <h1 className="case-title">Privacy Policy</h1>
          </div>

          <div className="case-masthead-meta">
            <div>Effective Date: July 12, 2026</div>
            <div>Rahul Verma · Rahul Web Development</div>
          </div>
        </div>

        <div className="case-subrule">
          <span>Portfolio, contact, newsletter, and analytics</span>
          <span>Based on the services published on this website</span>
        </div>

        <div className="grid gap-10 md:grid-cols-[minmax(0,1.15fr)_280px] md:items-start">
          <div>
            <p className="case-kicker">How your data is handled</p>
            <h2 className="case-detail-title">
              This Privacy Policy explains what information is collected on rahulwebdev.in and how it is used.
            </h2>
            <p className="case-detail-tagline">
              The website is used to showcase freelance work, share technical content, and offer direct contact for projects and collaborations.
            </p>
          </div>

          <div className="case-index-card">
            <div className="case-index-row">
              <span className="case-index-label">Site</span>
              <span className="case-index-value">rahulwebdev.in</span>
            </div>
            <div className="case-index-row">
              <span className="case-index-label">Owner</span>
              <span className="case-index-value">Rahul Verma</span>
            </div>
            <div className="case-index-row">
              <span className="case-index-label">Contact</span>
              <a href={`mailto:${CONTACT_EMAIL}`} className="case-index-value underline-offset-4 hover:underline">
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>

        <hr className="case-divider case-divider-thin" />

        <div className="space-y-6">
          {sections.map((section, index) => (
            <section key={section.title} className="case-index-card">
              <div className="mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                <h3 className="case-file-heading">{section.title}</h3>
              </div>
              <p className="case-file-copy">{section.content}</p>
            </section>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="case-nav-link inline-flex items-center gap-2">
            <span>Back to home</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <Link href="/terms-and-conditions" className="case-nav-link inline-flex items-center gap-2">
            <span>Read terms</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
