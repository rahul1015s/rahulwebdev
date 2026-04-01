import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { ThemeProvider } from "@/providers/ThemeProvider"
import { AuthProvider } from "@/providers/AuthProvider"

import { Toaster } from "sonner"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
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
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Rahul Verma",
    "jobTitle": "Full Stack Developer",
    "description": "Self-taught Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies",
    "url": "https://rahulwebdev.in",
    "sameAs": [
      "https://github.com/rahulwebdev",
      "https://linkedin.com/in/rahulwebdev",
      "https://twitter.com/rahulwebdev"
    ],
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
      "MERN Stack"
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

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
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
      </body>
    </html>
  )
}