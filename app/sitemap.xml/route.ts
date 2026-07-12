import { connectDB } from '@/lib/mongodb';
import Post from '@/models/post';
import CaseStudy from '@/models/casestudy';
import { extractExcerpt } from '@/lib/blog-content';
import { discoverPublicPages } from '@/lib/public-pages';

export const dynamic = "force-dynamic";

interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: 'daily' | 'weekly' | 'monthly';
  priority: number;
}

function toSitemapDate(value: unknown) {
  if (!value) {
    return new Date().toISOString();
  }

  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rahulwebdev.in';
  const publicPages = await discoverPublicPages();

  // Dynamic pages from database
  await connectDB();

  const sitemap: SitemapEntry[] = [];

  // Add llms.txt
  sitemap.push({
    url: `${baseUrl}/llms.txt`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  });

  // Add static pages
  publicPages.forEach(({ path, changeFrequency, priority }) => {
    sitemap.push({
      url: path === '/' ? baseUrl : `${baseUrl}${path}`,
      lastModified: new Date().toISOString(),
      changeFrequency,
      priority,
    });
  });

  try {
    // Add blog posts
    const posts = await Post.find({ published: true })
      .select('slug updatedAt createdAt content metaDescription')
      .sort({ updatedAt: -1, createdAt: -1 })
      .lean();

    posts.forEach(post => {
      const lastModified = post.updatedAt || post.createdAt;
      const excerpt = post.metaDescription?.trim() || extractExcerpt(post.content, 160);
      sitemap.push({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: toSitemapDate(lastModified),
        changeFrequency: 'monthly' as const,
        priority: excerpt ? 0.75 : 0.7,
      });
    });

    // Add case studies
    const caseStudies = await CaseStudy.find({ published: true })
      .select('slug updatedAt createdAt content description tagline')
      .sort({ updatedAt: -1, createdAt: -1 })
      .lean();

    caseStudies.forEach(study => {
      const lastModified = study.updatedAt || study.createdAt;
      const summary = study.description?.trim() || study.tagline?.trim() || extractExcerpt(study.content, 180);
      sitemap.push({
        url: `${baseUrl}/case-studies/${study.slug}`,
        lastModified: toSitemapDate(lastModified),
        changeFrequency: 'monthly' as const,
        priority: summary ? 0.8 : 0.75,
      });
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }

  // Generate XML
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemap.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
}
