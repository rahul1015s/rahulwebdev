import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "Freelance Web Developer in Patna, Bihar | Rahul Verma (rahul1015s)",
  description: "Hire Rahul Verma, a freelance full stack developer in Patna, Bihar specializing in React, Next.js, Node.js, and MongoDB. Local websites, web applications, and technical SEO for Patna businesses.",
  keywords: ["freelance web developer Patna", "web developer Bihar", "React developer Patna", "Next.js developer Patna", "full stack developer Patna", "website designer Patna", "SEO expert Patna"],
  authors: [{ name: "Rahul Verma", url: "https://rahulwebdev.in" }],
  alternates: {
    canonical: "https://rahulwebdev.in/freelance-web-developer-patna",
  },
  openGraph: {
    title: "Freelance Web Developer in Patna, Bihar | Rahul Verma",
    description: "Hire a local full stack developer in Patna for modern websites and web applications.",
    url: "https://rahulwebdev.in/freelance-web-developer-patna",
    siteName: "Rahul Verma - Web Developer",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelance Web Developer in Patna, Bihar",
    description: "Hire Rahul Verma for React, Next.js, and Node.js development in Patna.",
  },
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
  verification: {
    google: "your-google-verification-code",
  },
}

const faqItems = [
  {
    q: "Do you only work with clients in Patna?",
    a: "No. While I'm based in Patna, Bihar, I work with clients across India remotely. Local Patna businesses get the advantage of face-to-face meetings and deeper understanding of the local market.",
  },
  {
    q: "What kind of projects do you build for Patna businesses?",
    a: "I build business websites for Patna shops and services, web applications for local startups, dashboards for Patna-based businesses, and custom digital products with a focus on local SEO.",
  },
  {
    q: "How can you improve my Patna business website's SEO?",
    a: "I implement technical SEO specific to Patna - local schema markup, Google Maps integration, 'near me' optimization, metadata structure, and Core Web Vitals improvements to rank better in Patna searches.",
  },
  {
    q: "How long does a website project take for Patna clients?",
    a: "Simple business websites take 1-3 weeks. Advanced web applications for Patna startups take 4-10 weeks depending on complexity. I work efficiently to get your business online quickly.",
  },
  {
    q: "Can we meet in person in Patna?",
    a: "Absolutely! I'm based in Patna and welcome face-to-face meetings at my workspace or your location in Patna. We can also connect via video calls if you prefer.",
  },
]

export default function FreelanceWebDeveloperPatnaPage() {
  return (
    <>
      {/* Schema markup for LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Rahul Verma - Freelance Web Developer Patna",
            "image": "https://rahulwebdev.in/rahul-verma-developer.jpg",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Patna",
              "addressRegion": "Bihar",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 25.5941,
              "longitude": 85.1376
            },
            "url": "https://rahulwebdev.in",
            "telephone": "+91-XXXXXXXXXX",
            "priceRange": "₹₹",
            "description": "Freelance full stack web developer in Patna specializing in React, Next.js, Node.js, and MongoDB for local businesses.",
            "openingHours": "Mo-Fr 09:00-18:00",
            "sameAs": [
              "https://github.com/rahul1015s",
              "https://linkedin.com/in/rahul1015s"
            ]
          })
        }}
      />

      {/* Hero Section with SVG clip animation and background image */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-slow-zoom"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1624956576007-6f0d9daa132d?q=80&w=1974&auto=format&fit=crop')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80" />
        </div>

        {/* Animated SVG Clip Path */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <clipPath id="waveClip" clipPathUnits="objectBoundingBox">
              <path 
                d="M0,0 C0.2,0.1 0.3,0.3 0.5,0.3 C0.7,0.3 0.8,0.1 1,0.2 L1,1 L0,1 Z"
                className="animate-wave"
              />
            </clipPath>
          </defs>
        </svg>

        {/* Content */}
        <div className="relative z-20 mx-auto max-w-6xl px-6 py-20 text-white">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
              🇮🇳 Patna, Bihar • Available for Local Projects
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Freelance Web Developer in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                Patna, Bihar
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
              I'm <span className="font-semibold text-white">Rahul Verma (rahul1015s)</span>, 
              building modern, SEO-focused websites and scalable web applications for 
              <span className="font-semibold text-white"> Patna businesses and beyond</span>.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-semibold hover:from-orange-600 hover:to-yellow-600 border-0 text-lg px-8 py-6">
                <Link href="/#contact">Start Your Patna Project</Link>
              </Button>

              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                <Link href="/case-studies">View Local Case Studies</Link>
              </Button>
            </div>

            {/* Local Trust Indicators */}
            <div className="flex items-center gap-6 mt-12 text-sm text-gray-300">
              <span>🏆 50+ Projects in Bihar</span>
              <span className="w-1 h-1 bg-gray-500 rounded-full" />
              <span>⭐ 4.9/5 from Patna Clients</span>
              <span className="w-1 h-1 bg-gray-500 rounded-full" />
              <span>📍 Based in Patna</span>
            </div>
          </div>
        </div>

        {/* Decorative SVG Wave */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <svg className="w-full h-auto" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
              className="fill-white dark:fill-gray-950" />
          </svg>
        </div>
      </section>

      {/* Services Section with Image Background and SVG Clips */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-fixed bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop')",
            }}
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* SVG Clip Animation Container */}
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">Services in Patna</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Web Development Services</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Tailored digital solutions for Patna businesses, startups, and professionals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Business Websites",
                desc: "Fast, responsive websites designed to convert Patna visitors into customers. Local SEO optimized.",
                icon: "🏢",
                bg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
              },
              {
                title: "Custom Web Apps",
                desc: "Admin dashboards, SaaS tools, and internal systems for Patna's growing startups.",
                icon: "⚡",
                bg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
              },
              {
                title: "Technical SEO",
                desc: "Local schema markup, 'near me' optimization, and Core Web Vitals for Patna search rankings.",
                icon: "🎯",
                bg: "https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=2070&auto=format&fit=crop"
              }
            ].map((service, i) => (
              <div
                key={i}
                className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  clipPath: "polygon(0% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%)",
                }}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${service.bg}')` }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="text-4xl mb-3">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-200 text-sm leading-relaxed">{service.desc}</p>
                </div>

                {/* SVG Clip Animation on Hover */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <clipPath id={`serviceClip-${i}`}>
                      <rect x="0" y="0" width="100%" height="100%" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Advantage Section with SVG Animation */}
      <section className="py-24 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-900 dark:to-gray-950">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Image with SVG clip */}
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1624969862644-791f3dc98927?q=80&w=2070&auto=format&fit=crop')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent" />
              
              {/* Animated SVG Overlay */}
              <svg className="absolute inset-0 w-full h-full">
                <defs>
                  <clipPath id="patnaClip">
                    <circle cx="50%" cy="50%" r="40%" className="animate-pulse-scale">
                      <animate 
                        attributeName="r" 
                        values="30%;45%;30%" 
                        dur="4s" 
                        repeatCount="indefinite" 
                      />
                    </circle>
                  </clipPath>
                </defs>
                <image 
                  xlinkHref="https://images.unsplash.com/photo-1596178065887-1195b4ad67ab?q=80&w=2070&auto=format&fit=crop" 
                  width="100%" 
                  height="100%" 
                  clipPath="url(#patnaClip)"
                />
              </svg>
            </div>

            {/* Right side - Content */}
            <div className="space-y-6">
              <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100">
                Why Local Matters in Patna
              </Badge>
              <h2 className="text-4xl font-bold">Your Neighbor, Your Developer</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                As a Patna-based developer, I understand the local business landscape. 
                From Maurya Lok to Boring Road, I've helped businesses across Patna 
                establish their digital presence. You get:
              </p>
              <ul className="space-y-4">
                {[
                  "Face-to-face meetings in Patna",
                  "Understanding of local market nuances",
                  "Hindi/English bilingual communication",
                  "Knowledge of Patna's business culture",
                  "Quick response times (same timezone)"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-orange-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section with SVG Background */}
      <section className="relative py-24">
        {/* Background with SVG pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">Everything you need to know about working with a Patna-based developer</p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border rounded-lg px-6 bg-card"
              >
                <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA with Local Focus */}
      <section className="relative py-24 overflow-hidden">
        {/* Background with Map of Patna SVG */}
        <div className="absolute inset-0 bg-black">
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 800 600" preserveAspectRatio="none">
            <path d="M400,200 L450,250 L500,200 L550,250 L600,200 L650,250 L700,200 L750,250 L800,200 L800,600 L0,600 L0,200 L50,250 L100,200 L150,250 L200,200 L250,250 L300,200 L350,250 L400,200 Z" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="2"
                  className="animate-draw-line">
              <animate 
                attributeName="stroke-dashoffset" 
                values="1000;0" 
                dur="5s" 
                repeatCount="indefinite" 
              />
            </path>
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
          <Badge className="mb-6 bg-white/20 text-white border-white/30">Based in Patna, Serving Globally</Badge>
          <h2 className="text-5xl font-bold mb-6">Ready to Build Your Website?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Whether you're a startup near Gandhi Maidan or a business in Kankarbagh, 
            let's build something reliable and scalable together.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-6">
              <Link href="/#contact">Contact Rahul in Patna</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
              <Link href="tel:+91XXXXXXXXXX">Call Me in Patna</Link>
            </Button>
          </div>
          <p className="mt-8 text-sm text-gray-300">
            📍 Available for meetings in Patna • Same-day responses for local businesses
          </p>
        </div>
      </section>

   
    </>
  )
}