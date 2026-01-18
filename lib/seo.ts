import { Metadata } from 'next';

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  url: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedDate?: Date;
  updatedDate?: Date;
  readTime?: string;
  twitterHandle?: string;
}

const DEFAULT_IMAGE = '/og-home.svg';
const SITE_NAME = 'Rahul Verma Portfolio';
const SITE_URL = 'https://rahulwebdev.in';
const AUTHOR_NAME = 'Rahul Verma';
const TWITTER_HANDLE = '@rahulwebdev';

/**
 * Generate comprehensive metadata for any page
 * Includes OG tags, Twitter cards, and AI-friendly meta tags
 */
export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    url,
    image = DEFAULT_IMAGE,
    type = 'website',
    author = AUTHOR_NAME,
    publishedDate,
    updatedDate,
    twitterHandle = TWITTER_HANDLE,
  } = config;

  const fullUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;

  // Default keywords that apply to all pages
  const defaultKeywords = [
    'Rahul Verma',
    'Web Developer',
    'Full Stack Developer',
    'React',
    'Next.js',
    'Node.js',
    'JavaScript',
    'TypeScript',
  ];

  const allKeywords = [...new Set([...keywords, ...defaultKeywords])];

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords: allKeywords,
    authors: [{ name: author }],
    creator: author,
    publisher: SITE_NAME,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type,
      locale: 'en_US',
      url: fullUrl,
      title,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: image.startsWith('http') ? image : `${SITE_URL}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedDate && { publishedTime: publishedDate }),
      ...(updatedDate && { modifiedTime: updatedDate }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.startsWith('http') ? image : `${SITE_URL}${image}`],
      creator: twitterHandle,
      site: twitterHandle,
    },
    alternates: {
      canonical: fullUrl,
    },
    // AI-friendly meta tags
    other: {
      'theme-color': '#10b981',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'mobile-web-app-capable': 'yes',
      'og:locale': 'en_US',
      ...(type === 'article' && {
        'article:author': author,
        ...(publishedDate && {
          'article:published_time': publishedDate.toISOString(),
        }),
        ...(updatedDate && {
          'article:modified_time': updatedDate.toISOString(),
        }),
      }),
    },
  };
}

/**
 * Generate Article structured data for blog posts
 */
export function generateArticleStructuredData(config: {
  title: string;
  description: string;
  content?: string;
  image?: string;
  author?: string;
  publishedDate: Date;
  updatedDate?: Date;
  url: string;
  readTime?: string;
  keywords?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: config.title,
    description: config.description,
    image: config.image ? (config.image.startsWith('http') ? config.image : `${SITE_URL}${config.image}`) : `${SITE_URL}${DEFAULT_IMAGE}`,
    datePublished: config.publishedDate.toISOString(),
    dateModified: config.updatedDate?.toISOString() || config.publishedDate.toISOString(),
    author: {
      '@type': 'Person',
      name: config.author || AUTHOR_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': config.url.startsWith('http') ? config.url : `${SITE_URL}${config.url}`,
    },
    ...(config.readTime && {
      timeRequired: `PT${config.readTime}`,
    }),
    ...(config.keywords && {
      keywords: config.keywords.join(', '),
    }),
  };
}

/**
 * Generate BreadcrumbList structured data for navigation
 */
export function generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * Generate Organization structured data
 */
export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: 'Full Stack Web Developer portfolio showcasing projects and expertise',
    sameAs: [
      'https://github.com/rahulwebdev',
      'https://linkedin.com/in/rahulwebdev',
      'https://twitter.com/rahulwebdev',
    ],
    contact: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'hello@rahulwebdev.in',
    },
  };
}

/**
 * Generate Person structured data for profile pages
 */
export function generatePersonStructuredData(config?: {
  name?: string;
  jobTitle?: string;
  image?: string;
  bio?: string;
  url?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: config?.name || AUTHOR_NAME,
    jobTitle: config?.jobTitle || 'Full Stack Developer',
    url: config?.url || SITE_URL,
    image: config?.image || `${SITE_URL}/profile.jpg`,
    description: config?.bio || 'Self-taught Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies',
    sameAs: [
      'https://github.com/rahulwebdev',
      'https://linkedin.com/in/rahulwebdev',
      'https://twitter.com/rahulwebdev',
    ],
    knowsAbout: [
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'MongoDB',
      'Express.js',
      'Web Development',
      'Full Stack Development',
      'MERN Stack',
      'REST API',
      'GraphQL',
      'Tailwind CSS',
      'SQL',
      'Git',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Full Stack Developer',
      occupationLocation: {
        '@type': 'City',
        name: 'Patna',
        addressCountry: 'IN',
      },
    },
  };
}

/**
 * Generate WebSite structured data
 */
export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME,
    },
  };
}

/**
 * Convert read time string to ISO 8601 duration format
 * e.g., "5 min" -> "PT5M"
 */
export function convertReadTimeToISO8601(readTime: string): string {
  const match = readTime.match(/(\d+)\s*min/i);
  if (!match) return 'PT5M'; // Default to 5 minutes
  return `PT${match[1]}M`;
}

/**
 * Extract excerpt from content
 */
export function extractExcerpt(content: any, length: number = 160): string {
  if (!content) return '';

  try {
    if (typeof content === 'string') {
      const parsed = JSON.parse(content);
      const nodes = parsed?.content || [];

      for (const node of nodes) {
        if (node.type === 'paragraph' && node.content?.length > 0) {
          const text = node.content.map((c: any) => c.text || '').join('').trim();
          if (text.length > 20) {
            return text.slice(0, length) + (text.length > length ? '...' : '');
          }
        }
      }
    }

    return String(content).replace(/<[^>]+>/g, '').slice(0, length) + '...';
  } catch {
    return '';
  }
}
