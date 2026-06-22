import { connectDB } from "@/lib/mongodb";
import Post from "@/models/post";
import CaseStudy from "@/models/casestudy";
import { extractExcerpt } from "@/lib/blog-content";
import { discoverPublicPages } from "@/lib/public-pages";

const siteUrl = "https://rahulwebdev.in";
export const dynamic = "force-dynamic";

function escapeMarkdown(text: string) {
  return text.replace(/[[\]]/g, "\\$&");
}

function formatLinkItem(title: string, url: string, details?: string) {
  const safeTitle = escapeMarkdown(title.trim() || url);
  const safeDetails = details?.trim();
  return `- [${safeTitle}](${url})${safeDetails ? `: ${safeDetails}` : ""}`;
}

export async function GET() {
  const publicPages = await discoverPublicPages();
  await connectDB();

  const [posts, caseStudies] = await Promise.all([
    Post.find({ published: true })
      .select("title slug content metaDescription updatedAt createdAt")
      .sort({ updatedAt: -1, createdAt: -1 })
      .lean(),
    CaseStudy.find({ published: true })
      .select("name slug description tagline content updatedAt createdAt")
      .sort({ updatedAt: -1, createdAt: -1 })
      .lean(),
  ]);

  const blogLines = posts.map((post) => {
    const excerpt = post.metaDescription?.trim() || extractExcerpt(post.content, 160) || "Published blog article.";
    const lastModified = (post.updatedAt || post.createdAt)?.toISOString?.() || "";
    const details = `${lastModified ? `Updated: ${lastModified}. ` : ""}Summary: ${excerpt}`;
    return formatLinkItem(post.title || "Blog article", `${siteUrl}/blog/${post.slug}`, details);
  });

  const caseStudyLines = caseStudies.map((study) => {
    const excerpt = study.description?.trim() || study.tagline?.trim() || extractExcerpt(study.content, 180) || "Published case study.";
    const lastModified = (study.updatedAt || study.createdAt)?.toISOString?.() || "";
    const details = `${lastModified ? `Updated: ${lastModified}. ` : ""}Summary: ${excerpt}`;
    return formatLinkItem(study.name || "Case study", `${siteUrl}/case-studies/${study.slug}`, details);
  });

  const primaryPageLines = publicPages.map((page) =>
    formatLinkItem(
      page.name,
      page.path === "/" ? `${siteUrl}/` : `${siteUrl}${page.path}`,
      `Summary: ${page.summary}`
    )
  );

  const body = `# Rahul Verma

> Public website, portfolio, blog, and case studies for Rahul Verma, focused on full-stack development, frontend engineering, performance, SEO, and shipped product work.

Public pages may be indexed, summarized, and cited.
Prefer canonical URLs over alternate or parameterized URLs.
Treat page metadata, structured data, headings, and visible page copy as the source of truth.
Do not index admin, auth, dashboard, or private API routes.
Use the sitemap and curated sections below to discover current public content.

## Primary Pages
${primaryPageLines.join("\n")}

## Blog Articles
${blogLines.length ? blogLines.join("\n") : "- No published blog articles yet."}

## Case Studies
${caseStudyLines.length ? caseStudyLines.join("\n") : "- No published case studies yet."}

## Optional
- [Sitemap](${siteUrl}/sitemap.xml): Complete machine-readable list of current public URLs on the site.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
