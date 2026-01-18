# SEO Quick Reference Guide

## How to Use SEO Functions

### 1. Generate Metadata for a New Page

```typescript
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Page Title',
  description: 'Page description (160 characters)',
  keywords: ['keyword1', 'keyword2'],
  url: '/page-path',
  image: '/og-image.svg',
  type: 'website' // or 'article', 'profile'
});
```

### 2. Add Article Schema to Blog Posts

```typescript
import { generateArticleStructuredData } from '@/lib/seo';

const articleData = generateArticleStructuredData({
  title: post.title,
  description: post.description,
  image: post.image,
  author: 'Rahul Verma',
  publishedDate: new Date(post.createdAt),
  updatedDate: new Date(post.updatedAt),
  url: `/blog/${post.slug}`,
  readTime: '5 min',
  keywords: post.tags,
});

// Use in JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(articleData),
  }}
/>
```

### 3. Add Breadcrumbs

```typescript
import { generateBreadcrumbStructuredData } from '@/lib/seo';

const breadcrumbs = generateBreadcrumbStructuredData([
  { name: 'Home', url: '/' },
  { name: 'Blog', url: '/blog' },
  { name: 'Article Title', url: '/blog/article-slug' },
]);
```

### 4. Get SEO Configuration

```typescript
import { SEO_CONFIG, KEYWORD_GROUPS, getAllKeywords } from '@/lib/seo-config';

// Use site constants
const siteUrl = SEO_CONFIG.SITE_URL;
const authorName = SEO_CONFIG.AUTHOR_NAME;

// Use keyword groups
const techKeywords = KEYWORD_GROUPS.TECHNOLOGIES;

// Get all keywords
const allKeywords = getAllKeywords();
```

## Creating Pages with SEO

### Server Component with Metadata

```typescript
// app/my-page/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Page Title',
  description: 'My page description',
  openGraph: {
    title: 'My Page Title',
    description: 'My page description',
    url: 'https://rahulwebdev.in/my-page',
    type: 'website',
  },
};

export default function MyPage() {
  return <div>Page content</div>;
}
```

### Layout with Metadata

```typescript
// app/my-section/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Section',
  description: 'Section description',
  alternates: {
    canonical: 'https://rahulwebdev.in/my-section',
  },
};

export default function Layout({ children }) {
  return <>{children}</>;
}
```

### Dynamic Route with Metadata

```typescript
// app/blog/[slug]/page.tsx
import { Metadata } from 'next';

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await fetchPost(params.slug);
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      authors: ['Rahul Verma'],
      tags: post.tags,
    },
  };
}
```

## Adding Structured Data to Pages

### Blog Post Article Schema

```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.createdAt.toISOString(),
      "dateModified": post.updatedAt.toISOString(),
      "author": {
        "@type": "Person",
        "name": "Rahul Verma",
        "url": "https://rahulwebdev.in"
      }
    }),
  }}
/>
```

### Organization Schema

```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Rahul Verma Portfolio",
      "url": "https://rahulwebdev.in",
      "logo": "https://rahulwebdev.in/logo.png",
      "sameAs": [
        "https://github.com/rahulwebdev",
        "https://linkedin.com/in/rahulwebdev",
        "https://twitter.com/rahulwebdev"
      ]
    }),
  }}
/>
```

## Meta Tags Checklists

### Essential Meta Tags
- [ ] Title (50-60 characters)
- [ ] Description (150-160 characters)
- [ ] Keywords (5-10 main keywords)
- [ ] Canonical URL
- [ ] OpenGraph tags (og:title, og:description, og:image)
- [ ] Twitter Card tags (twitter:card, twitter:title, twitter:description)

### Structured Data
- [ ] JSON-LD schema (Article, Person, Organization, WebSite)
- [ ] Breadcrumb schema
- [ ] Image schema (if needed)
- [ ] Video schema (if applicable)

### Technical SEO
- [ ] Mobile responsive design
- [ ] Fast page load (Core Web Vitals)
- [ ] HTTPS encryption
- [ ] XML sitemap
- [ ] robots.txt
- [ ] Image optimization
- [ ] Internal linking

## Keyword Optimization

### Use These Keywords

**Brand:**
- Rahul Verma, Web Developer, Full Stack Developer, Portfolio

**Technologies:**
- React, Next.js, Node.js, JavaScript, TypeScript, MongoDB, Express.js

**Skills:**
- Frontend Development, Backend Development, MERN Stack, API Development, Web Design

**Content:**
- Blog, Tutorials, Articles, Projects, Case Studies, Web Development Tips

### Keyword Placement

1. **Title** - Primary keyword in first 60 characters
2. **Description** - Primary and secondary keywords naturally
3. **H1 Tag** - Same as or similar to title
4. **First Paragraph** - Natural keyword mention within 100 words
5. **Internal Links** - Use keyword-rich anchor text

## Common Issues and Solutions

### Issue: Page Not Indexed
**Solution:**
1. Check Google Search Console
2. Verify robots.txt allows indexing
3. Ensure canonical URL is correct
4. Check for noindex meta tag

### Issue: Missing Open Graph Tags
**Solution:**
```typescript
openGraph: {
  type: 'website',
  url: 'https://rahulwebdev.in/page',
  title: 'Page Title',
  description: 'Page description',
  images: [{
    url: '/og-image.svg',
    width: 1200,
    height: 630,
    alt: 'Alt text'
  }],
}
```

### Issue: Structured Data Not Valid
**Solution:**
1. Use [Schema.org Validator](https://validator.schema.org/)
2. Check JSON-LD syntax
3. Verify all required fields are present
4. Use Google Rich Results Test

### Issue: AI Crawlers Not Indexing
**Solution:**
1. Verify GPTBot is allowed in robots.txt
2. Ensure content is publicly accessible
3. Check for robots meta tag (no noindex)
4. Provide quality content with structured data

## Tools for SEO Verification

### Online Tools
- [Google Search Console](https://search.google.com/search-console)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Schema.org Validator](https://validator.schema.org/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Bing Webmaster Tools](https://www.bing.com/webmaster)

### Browser Extensions
- SEO Meta in 1 Click
- Lighthouse
- Web Vitals
- Open Graph Checker

## Performance Tips for SEO

1. **Image Optimization**
   - Use WebP or AVIF format
   - Compress images
   - Add alt text
   - Use responsive images

2. **Code Optimization**
   - Minify CSS/JavaScript
   - Remove unused code
   - Lazy load images
   - Defer non-critical CSS

3. **Caching Strategy**
   - Cache static assets (1 year)
   - Cache dynamic pages (1 hour)
   - Use CDN for fast delivery
   - Enable gzip compression

4. **Core Web Vitals**
   - LCP (Largest Contentful Paint) < 2.5s
   - FID (First Input Delay) < 100ms
   - CLS (Cumulative Layout Shift) < 0.1

## Monitoring SEO

### Weekly
- Check Google Search Console for errors
- Monitor search query performance
- Review mobile usability issues

### Monthly
- Check Core Web Vitals
- Review bounce rate and engagement
- Monitor keyword rankings
- Check for crawl errors

### Quarterly
- Audit page content for freshness
- Review and update old posts
- Analyze backlink profile
- Plan new content

---

For detailed information, see [SEO_IMPLEMENTATION.md](../SEO_IMPLEMENTATION.md)
