import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Post from '@/models/post';
import CaseStudy from '@/models/casestudy';

interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: 'weekly' | 'monthly';
  priority: number;
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rahulwebdev.in';

  // Static pages
  const staticPages = [
    '',
    '/blog',
    '/case-studies',
    '/resume',
    "/freelance-web-developer-patna"
  ];

  // Dynamic pages from database
  await connectDB();

  const sitemap: SitemapEntry[] = [];

  // Add static pages
  staticPages.forEach(page => {
    sitemap.push({
      url: `${baseUrl}${page}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: page === '' ? 1.0 : 0.8,
    });
  });

  try {
    // Add blog posts
    const posts = await Post.find({ published: true })
      .select('slug updatedAt createdAt')
      .sort({ createdAt: -1 })
      .lean();

    posts.forEach(post => {
      const lastModified = post.updatedAt || post.createdAt;
      sitemap.push({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: lastModified!.toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      });
    });

    // Add case studies
    const caseStudies = await CaseStudy.find({ published: true })
      .select('slug updatedAt createdAt')
      .sort({ createdAt: -1 })
      .lean();

    caseStudies.forEach(study => {
      const lastModified = study.updatedAt || study.createdAt;
      sitemap.push({
        url: `${baseUrl}/case-studies/${study.slug}`,
        lastModified: lastModified!.toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
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