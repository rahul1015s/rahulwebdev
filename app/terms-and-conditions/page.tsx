import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, FileText, ShieldCheck } from "lucide-react";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms and conditions for using Rahul Verma's portfolio website and contacting the owner about services.",
  alternates: {
    canonical: `${SITE_URL}/terms-and-conditions`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing and using rahulwebdev.in, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use the website.",
  },
  {
    title: "2. Website Purpose",
    content:
      "This website is intended to present Rahul Verma's portfolio, case studies, blog content, service information, and contact options for freelance web development and related work. The content is provided for informational and professional presentation purposes.",
  },
  {
    title: "3. Use of Content",
    content:
      "You may browse, read, and share publicly available content from this website for personal or professional reference. You may not copy, republish, redistribute, or misuse the content in a way that infringes copyright, trademarks, or intellectual property rights.",
  },
  {
    title: "4. Contact and Inquiries",
    content:
      "When you contact Rahul Verma through the site, email, phone, WhatsApp, or a contact form, you agree to provide accurate information and use these channels responsibly. Any project discussion, quote request, or collaboration request is subject to mutual agreement.",
  },
  {
    title: "5. Intellectual Property",
    content:
      "All original content, design, branding, and written materials on this website are the property of Rahul Verma unless otherwise stated. Third-party names, logos, and content remain the property of their respective owners.",
  },
  {
    title: "6. Limitation of Liability",
    content:
      "Rahul Verma and this website shall not be liable for any indirect, incidental, or consequential damages arising from the use of the site, including loss of business, data, or opportunity. The site and all provided content are offered on an as-is basis.",
  },
  {
    title: "7. Governing Law",
    content:
      "These Terms and Conditions are governed by the laws of India, and any dispute shall be subject to the jurisdiction of the courts in Patna, Bihar, unless otherwise required by applicable law.",
  },
  {
    title: "8. Contact",
    content:
      "For questions about these terms, please contact Rahul Verma at hello@rahulwebdev.in.",
  },
] as const;

export default function TermsAndConditionsPage() {
  return (
    <main className="case-files-shell min-h-screen pt-24 pb-10">
      <section className="case-stage pb-24">
        <div className="case-masthead">
          <div>
            <span className="case-kicker">Website Policy</span>
            <h1 className="case-title">Terms and Conditions</h1>
          </div>

          <div className="case-masthead-meta">
            <div>Effective Date: July 12, 2026</div>
            <div>Rahul Verma · Rahul Web Development</div>
          </div>
        </div>

        <div className="case-subrule">
          <span>Use of the website and its public content</span>
          <span>For portfolio, contact, and service inquiries</span>
        </div>

        <div className="grid gap-10 md:grid-cols-[minmax(0,1.15fr)_280px] md:items-start">
          <div>
            <p className="case-kicker">Usage terms</p>
            <h2 className="case-detail-title">
              These terms explain how the website may be used and what to expect from the published content and contact channels.
            </h2>
            <p className="case-detail-tagline">
              Use of this site implies acceptance of these terms and acknowledgment that all information is provided for professional and informational purposes.
            </p>
          </div>

          <div className="case-index-card">
            <div className="case-index-row">
              <span className="case-index-label">Owner</span>
              <span className="case-index-value">Rahul Verma</span>
            </div>
            <div className="case-index-row">
              <span className="case-index-label">Website</span>
              <span className="case-index-value">rahulwebdev.in</span>
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
          {sections.map((section) => (
            <section key={section.title} className="case-index-card">
              <div className="mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4" />
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
          <Link href="/privacy-policy" className="case-nav-link inline-flex items-center gap-2">
            <span>Read privacy policy</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
