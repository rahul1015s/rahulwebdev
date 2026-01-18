import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Inter, Space_Grotesk } from "next/font/google"
import { ThemeProvider } from "@/providers/ThemeProvider"
import { AuthProvider } from "@/providers/AuthProvider"
import { AnalyticsProvider } from "@/providers/AnalyticsProvider"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"

// Optimize font loading - variable fonts with reduced weight variants
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Use system font while loading
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

// Lazy load Toaster as it's not critical for initial render
const Toaster = dynamic(() => import("sonner").then(mod => ({ default: mod.Toaster })), {
  loading: () => null
})

export const metadata: Metadata = {
  metadataBase: new URL('https://rahulwebdev.in'),
  title: {
    default: "Rahul Verma | Full Stack Developer",
    template: "%s | Rahul Verma"
  },
  description: "Self-taught Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. Explore my portfolio, projects, and insights on web development.",
  keywords: [
    "Rahul Verma",
    "Full Stack Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "Portfolio",
    "Web Development",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "MERN Stack",
    "Self-taught Developer"
  ],
  authors: [{ name: "Rahul Verma" }],
  creator: "Rahul Verma",
  publisher: "Rahul Verma",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "technology",
  classification: "Web Development Portfolio",
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
    type: 'website',
    locale: 'en_US',
    url: 'https://rahulwebdev.in',
    title: 'Rahul Verma | Full Stack Developer',
    description: 'Self-taught Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.',
    siteName: 'Rahul Verma Portfolio',
    images: [
      {
        url: '/og-home.svg',
        width: 1200,
        height: 630,
        alt: 'Rahul Verma Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rahul Verma | Full Stack Developer',
    description: 'Self-taught Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.',
    images: ['/og-home.svg'],
    creator: '@rahulwebdev',
  },
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    }),
    ...(process.env.NEXT_PUBLIC_YANDEX_VERIFICATION && {
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    }),
    ...(process.env.NEXT_PUBLIC_BING_VERIFICATION && {
      bing: process.env.NEXT_PUBLIC_BING_VERIFICATION,
    }),
  },
  alternates: {
    canonical: 'https://rahulwebdev.in',
  },
  other: {
    'theme-color': '#10b981',
    'msapplication-TileColor': '#10b981',
    'application-name': 'Rahul Verma Portfolio',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Rahul Verma',
    'mobile-web-app-capable': 'yes',
    // AI and LLM-friendly meta tags
    'color-scheme': 'light dark',
    'charset': 'utf-8',
    'viewport': 'width=device-width, initial-scale=1, maximum-scale=5',
    // Prevent crawlers from indexing duplicate content
    'googlebot': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    'bingbot': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    // Language and locale hints for search engines
    'language': 'English',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Main Person schema for author
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Rahul Verma",
    "jobTitle": "Full Stack Developer",
    "description": "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies",
    "url": "https://rahulwebdev.in",
    "image": "https://rahulwebdev.in/profile.jpg",
    "sameAs": [
      "https://github.com/rahulwebdev",
      "https://linkedin.com/in/rahulwebdev",
      "https://twitter.com/rahulwebdev"
    ],
    "email": "hello@rahulwebdev.in",
    "knowsAbout": [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "MongoDB",
      "Express.js",
      "Web Development",
      "Full Stack Development",
      "MERN Stack",
      "REST API",
      "GraphQL",
      "SQL",
      "Git",
      "Tailwind CSS",
      "Web Design",
      "UI/UX Development"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Full Stack Developer",
      "occupationLocation": {
        "@type": "City",
        "name": "Patna",
        "addressCountry": "IN"
      }
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Self-taught / Online Learning"
    }
  };

  // Organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Rahul Verma Portfolio",
    "url": "https://rahulwebdev.in",
    "logo": "https://rahulwebdev.in/logo.png",
    "description": "Full Stack Web Developer portfolio showcasing projects, skills, and expertise in modern web technologies",
    "sameAs": [
      "https://github.com/rahulwebdev",
      "https://linkedin.com/in/rahulwebdev",
      "https://twitter.com/rahulwebdev"
    ],
    "contact": {
      "@type": "ContactPoint",
      "contactType": "Professional Services",
      "email": "hello@rahulwebdev.in"
    }
  };

  // WebSite schema with SearchAction
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Rahul Verma Portfolio",
    "url": "https://rahulwebdev.in",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://rahulwebdev.in/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "author": {
      "@type": "Person",
      "name": "Rahul Verma"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Person Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <AnalyticsProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <Navbar />
              <main className="min-h-screen">{children}</main>
              <Toaster />
            </AuthProvider>
          </ThemeProvider>
        </AnalyticsProvider>
      </body>
    </html>
  )
}