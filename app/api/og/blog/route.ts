import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Post from '@/models/post';

export async function GET() {
  await connectDB();

  try {
    // Get the latest 3 published posts
    const latestPosts = await Post.find({ published: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .select('title')
      .lean();

    let displayText = "Latest Blog Posts";
    if (latestPosts.length > 0) {
      const titles = latestPosts.map(post => post.title.substring(0, 30)).join(' • ');
      displayText = titles.length > 80 ? titles.substring(0, 77) + '...' : titles;
    }

    const svg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1e293b;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="1200" height="630" fill="url(#bg)"/>
        <text x="600" y="180" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="bold" fill="#10b981" text-anchor="middle">Rahul Verma</text>
        <text x="600" y="240" font-family="system-ui, -apple-system, sans-serif" font-size="24" fill="#e2e8f0" text-anchor="middle">Blog</text>
        <text x="600" y="320" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="500" fill="#f1f5f9" text-anchor="middle">${displayText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>
        <text x="600" y="380" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="#94a3b8" text-anchor="middle">Web Development & Technology Insights</text>
        <rect x="100" y="480" width="1000" height="4" fill="#10b981"/>
      </svg>
    `;

    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    // Fallback SVG
    const fallbackSvg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <rect width="1200" height="630" fill="#0f172a"/>
        <text x="600" y="200" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="#10b981" text-anchor="middle">Rahul Verma</text>
        <text x="600" y="260" font-family="Arial, sans-serif" font-size="24" fill="#e2e8f0" text-anchor="middle">Blog</text>
        <text x="600" y="320" font-family="Arial, sans-serif" font-size="18" fill="#94a3b8" text-anchor="middle">Web Development Insights</text>
        <rect x="100" y="450" width="1000" height="4" fill="#10b981"/>
      </svg>
    `;

    return new Response(fallbackSvg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }
}