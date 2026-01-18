import { NextResponse } from 'next/server';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rahulwebdev.in';

  const robotsTxt = `# Robots.txt for Rahul Verma Portfolio
# Optimized for search engines and AI crawlers

# Default rules for all bots
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/admin/
Disallow: /api/auth/
Disallow: /verify-email
Disallow: /*.pdf$
Disallow: /private/

# Crawl delay to prevent server overload
Crawl-delay: 1
Request-rate: 1/1s

# Google Bot
User-agent: Googlebot
Allow: /
Disallow: /admin/
Disallow: /api/admin/
Crawl-delay: 0

# Bing Bot
User-agent: Bingbot
Allow: /
Disallow: /admin/
Disallow: /api/admin/
Crawl-delay: 1

# Other search engines
User-agent: Slurp
Allow: /
Disallow: /admin/

User-agent: DuckDuckBot
Allow: /
Disallow: /admin/

User-agent: Baiduspider
Allow: /
Disallow: /admin/

User-agent: YandexBot
Allow: /
Disallow: /admin/

# AI and LLM Crawlers - Explicitly allowed for indexing
# OpenAI GPTBot for ChatGPT
User-agent: GPTBot
Allow: /

# Anthropic Claude
User-agent: Claude-Web
Allow: /
User-agent: anthropic-ai
Allow: /

# Perplexity AI
User-agent: Perplexity
Allow: /

# Apple Bot (Siri, Spotlight)
User-agent: AppleBot
Allow: /

# Other AI crawlers
User-agent: CCBot
Allow: /

User-agent: OpenAI
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Googlebot-Extended
Allow: /

# Sitemap location
Sitemap: ${siteUrl}/sitemap.xml`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  });
}
