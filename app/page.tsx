import dynamic from 'next/dynamic'
import BlogSection from '@/components/sections/BlogSection'
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
  title: 'Rahul Verma - Full Stack Developer',
  description: 'Portfolio of Rahul Verma, a passionate Full Stack Developer specializing in modern web technologies, React, Next.js, and more.',
  openGraph: {
    title: 'Rahul Verma - Full Stack Developer',
    description: 'Portfolio of Rahul Verma, a passionate Full Stack Developer specializing in modern web technologies, React, Next.js, and more.',
    url: 'https://rahulwebdev.in',
    siteName: 'Rahul Verma Portfolio',
    images: [
      {
        url: '/og-home.svg',
        width: 1200,
        height: 630,
        alt: 'Rahul Verma Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rahul Verma - Full Stack Developer',
    description: 'Portfolio of Rahul Verma, a passionate Full Stack Developer specializing in modern web technologies, React, Next.js, and more.',
    images: ['/og-home.svg'],
  },
}

const page = () => {
  const portfolioStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Rahul Verma Portfolio",
    "description": "Full Stack Developer portfolio showcasing projects, skills, and experience",
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioStructuredData),
        }}
      />
      <HeroSection />
      <ExperienceSection />
      <ProofOfWork />
      <ProjectsSection />
      <SkillsSection />
      <AboutSection />
      <BlogSection />
      <ContactSection />
    </>
  )
}

export default page
