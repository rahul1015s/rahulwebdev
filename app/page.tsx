
import ProjectsSection from '@/components/sections/ProjectsSection'
import HeroSection from '@/components/sections/HeroSection'
import ProofOfWork from '@/components/sections/ProofOfWork'
import SkillsSection from '@/components/sections/SkillSection'
import AboutSection from '@/components/sections/AboutSection'
import ContactSection from '@/components/sections/ContactSection'
import BlogSection from '@/components/sections/BlogSection'
import { Metadata } from 'next'

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
      <div>
       <HeroSection />
      <ProofOfWork />
       <ProjectsSection />
       <SkillsSection />
       <AboutSection />
       <BlogSection />
       <ContactSection />
      </div>
    </>
  )
}

export default page
