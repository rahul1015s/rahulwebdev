import { connectDB } from "@/lib/mongodb";
import Post from "@/models/post";
import CaseStudy from "@/models/casestudy";
import { extractExcerpt } from "@/lib/blog-content";
import { discoverPublicPages } from "@/lib/public-pages";

const siteUrl = "https://rahulwebdev.in";
export const dynamic = "force-dynamic";

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
    return `- ${post.title}: ${siteUrl}/blog/${post.slug}${lastModified ? ` | Updated: ${lastModified}` : ""} | Summary: ${excerpt}`;
  });

  const caseStudyLines = caseStudies.map((study) => {
    const excerpt = study.description?.trim() || study.tagline?.trim() || extractExcerpt(study.content, 180) || "Published case study.";
    const lastModified = (study.updatedAt || study.createdAt)?.toISOString?.() || "";
    return `- ${study.name}: ${siteUrl}/case-studies/${study.slug}${lastModified ? ` | Updated: ${lastModified}` : ""} | Summary: ${excerpt}`;
  });

  const body = `# Rahul Verma

> Public website, portfolio, blog, and case studies for Rahul Verma, focused on full-stack development, frontend engineering, performance, SEO, and shipped product work.

## Canonical
- ${siteUrl}

## Crawl Policy
- Public pages may be indexed, summarized, and cited.
- Prefer canonical URLs over alternate or parameterized URLs.
- Treat page metadata, structured data, headings, and visible page copy as the source of truth.
- Do not index admin, auth, dashboard, or private API routes.
- Discover the latest public URLs from sitemap: ${siteUrl}/sitemap.xml

## Primary Pages
${publicPages.map((page) => `- ${page.name}: ${page.path === "/" ? `${siteUrl}/` : `${siteUrl}${page.path}`} | Summary: ${page.summary}`).join("\n")}

## Blog Articles
${blogLines.length ? blogLines.join("\n") : "- No published blog articles yet."}

## Case Studies
${caseStudyLines.length ? caseStudyLines.join("\n") : "- No published case studies yet."}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
