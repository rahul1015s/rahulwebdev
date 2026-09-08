/**
 * SEO Configuration and AI-friendly enhancements
 * Optimizes site for search engines and AI crawlers (GPT, Claude, Perplexity, etc.)
 */

export const AI_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'CCBot',
  'anthropic-ai',
  'Claude-Web',
  'Perplexity',
  'AppleBot',
  'OpenAI',
  'Googlebot-Extended',
  'Bingbot',
];

export const SEO_CONFIG = {
  // Site identity
  SITE_NAME: 'Rahul Verma Portfolio',
  SITE_URL: 'https://rahulwebdev.in',
  AUTHOR_NAME: 'Rahul Verma',
  AUTHOR_EMAIL: 'hello@rahulwebdev.in',
  AUTHOR_TITLE: 'Full Stack Developer',
  
  // Social media
  TWITTER_HANDLE: '@rahul1015s',
  GITHUB_URL: 'https://github.com/rahul1015s',
  LINKEDIN_URL: 'https://linkedin.com/in/rahul1015s',
  
  // Content preferences
  DEFAULT_DESCRIPTION: 'Self-taught Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.',
  DEFAULT_KEYWORDS: [
    'Rahul Verma',
    'Full Stack Developer',
    'Web Developer',
    'React Developer',
    'Next.js Developer',
    'Node.js Developer',
    'JavaScript Developer',
    'TypeScript Developer',
    'Portfolio',
    'Web Development',
    'Software Engineer',
    'Frontend Developer',
    'Backend Developer',
    'MERN Stack',
  ],
  
  // OpenAI/GPT indexing
  ALLOW_GPT_INDEXING: true,
  ALLOW_AI_CRAWLING: true,
};

/**
 * Get environment-specific site URL
 */
export function getSiteUrl(): string {
  if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  return SEO_CONFIG.SITE_URL;
}

/**
 * Meta tags for AI crawlers and large language models
 */
export const AI_META_TAGS = {
  // OpenAI GPT indexing
  'gpt-no-indexing': SEO_CONFIG.ALLOW_AI_CRAWLING ? undefined : 'true',
  
  // Claude/Anthropic
  'anthropic-ai': SEO_CONFIG.ALLOW_AI_CRAWLING ? 'true' : 'false',
  
  // Perplexity AI
  'perplexity': SEO_CONFIG.ALLOW_AI_CRAWLING ? 'true' : 'false',
  
  // Search engine specific
  'googlebot': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  'bingbot': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
} as const;

/**
 * Keywords grouped by topic for better SEO
 */
export const KEYWORD_GROUPS = {
  TECHNOLOGIES: [
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Express.js',
    'MongoDB',
    'SQL',
    'Tailwind CSS',
    'REST API',
    'GraphQL',
    'Git',
  ],
  ROLES: [
    'Full Stack Developer',
    'Web Developer',
    'Frontend Developer',
    'Backend Developer',
    'Software Engineer',
    'React Developer',
    'Next.js Developer',
  ],
  SPECIALTIES: [
    'Web Development',
    'Full Stack Development',
    'MERN Stack',
    'Web Design',
    'UI/UX Development',
    'API Development',
    'Database Design',
  ],
  PROJECTS: [
    'Portfolio',
    'Projects',
    'Case Studies',
    'Web Applications',
    'Open Source',
  ],
  PROFESSIONAL: [
    'Self-taught',
    'Freelancer',
    'Independent Developer',
    'Technical Skills',
    'Professional Experience',
  ],
};

/**
 * Get all relevant keywords
 */
export function getAllKeywords(): string[] {
  return [
    ...SEO_CONFIG.DEFAULT_KEYWORDS,
    ...KEYWORD_GROUPS.TECHNOLOGIES,
    ...KEYWORD_GROUPS.ROLES,
    ...KEYWORD_GROUPS.SPECIALTIES,
  ];
}
