import dynamic from 'next/dynamic'
import { Metadata } from 'next'

// Lazy load interactive sections to reduce main-thread blocking
const HeroSection = dynamic(() => import('@/components/sections/HeroSection'), {
  loading: () => <div className="h-[600px] bg-linear-to-b from-slate-900 to-slate-800 animate-pulse" />,
  ssr: true
})

const ExperienceSection = dynamic(() => import('@/components/sections/ExperienceSection'), {
  loading: () => <div className="h-[400px] bg-slate-100 dark:bg-slate-900 animate-pulse" />,
  ssr: true
})

const ProofOfWork = dynamic(() => import('@/components/sections/ProofOfWork'), {
  loading: () => <div className="h-[300px] bg-slate-100 dark:bg-slate-900 animate-pulse" />,
  ssr: true
})

const ProjectsSection = dynamic(() => import('@/components/sections/ProjectsSection'), {
  loading: () => <div className="h-[500px] bg-slate-100 dark:bg-slate-900 animate-pulse" />,
  ssr: true
})

const SkillsSection = dynamic(() => import('@/components/sections/SkillSection'), {
  loading: () => <div className="h-[400px] bg-slate-100 dark:bg-slate-900 animate-pulse" />,
  ssr: true
})

const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), {
  loading: () => <div className="h-[300px] bg-slate-100 dark:bg-slate-900 animate-pulse" />,
  ssr: true
})

const ContactSection = dynamic(() => import('@/components/sections/ContactSection'), {
  loading: () => <div className="h-[400px] bg-slate-100 dark:bg-slate-900 animate-pulse" />,
  ssr: true
})

export const metadata: Metadata = {
  title: 'Rahul Verma - Freelance Full Stack Developer in Patna, Bihar',
  description:
    'Rahul Verma is a freelance full stack developer in Patna, Bihar, India specializing in React, Next.js, Node.js, and MongoDB for business websites and web apps.',
  keywords: [
    'Rahul1015s',
    'Rahul Verma web developer',
    'Freelance web developer in Patna',
    'Web developer in Bihar',
    'Full stack developer Patna',
    'rahulwebdev.in',
  ],
  alternates: {
    canonical: 'https://rahulwebdev.in/',
  },
  openGraph: {
    title: 'Rahul Verma - Freelance Full Stack Developer in Patna, Bihar',
    description:
      'Freelance full stack web development services by Rahul Verma in Patna, Bihar for startups, professionals, and local businesses.',
    url: 'https://rahulwebdev.in',
    siteName: 'Rahul Web Development',
    images: [
      {
        url: '/og-home.svg',
        width: 1200,
        height: 630,
        alt: 'Rahul Verma Portfolio Preview',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rahul Verma - Freelance Full Stack Developer in Patna, Bihar',
    description:
      'Freelance full stack developer in Patna, Bihar building high-performance web apps with React and Next.js.',
    images: ['/og-home.svg'],
  },
}

const page = () => {
  const portfolioStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Rahul Web Development",
    "description": "Freelance full stack web developer portfolio for Patna, Bihar and India clients.",
    "url": "https://rahulwebdev.in",
    "author": {
      "@type": "Person",
      "name": "Rahul Verma",
      "jobTitle": "Full Stack Developer"
    },
    "publisher": {
      "@type": "Person",
      "name": "Rahul Verma"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://rahulwebdev.in/blog?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can business owners hire Rahul Verma for websites and web applications?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Rahul Verma builds business websites, web applications, dashboards, and SEO-focused digital products for startups, local businesses, and growing teams."
        }
      },
      {
        "@type": "Question",
        "name": "Can students and developers learn from this website?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The website includes blogs and case studies that explain real build decisions, architecture choices, frontend engineering patterns, and project outcomes."
        }
      },
      {
        "@type": "Question",
        "name": "Where should I start if I want to study real project work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Start with the case studies for end-to-end project breakdowns, then read the blog for tutorials, technical insights, and implementation guidance."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
      
      <HeroSection />
      <ExperienceSection />
      <ProofOfWork />
      <ProjectsSection />
      <SkillsSection />
      <AboutSection />
      <ContactSection />
    </>
  )
}

export default page
