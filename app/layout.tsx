import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { AnalyticsProvider } from "@/providers/AnalyticsProvider";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const Toaster = dynamic(
  () => import("sonner").then((mod) => ({ default: mod.Toaster })),
  { loading: () => null }
);

export const metadata: Metadata = {
  metadataBase: new URL("https://rahulwebdev.in"),
  title: {
    default: "Rahul Verma | Freelance Full Stack Developer in Patna, Bihar",
    template: "%s | Rahul Verma",
  },
  description:
    "Rahul Verma (rahul1015s) is a freelance full stack developer in Patna, Bihar, India. Building fast, SEO-focused web apps with React, Next.js, Node.js, and MongoDB.",
  keywords: [
    "Rahul Verma",
    "rahul1015s",
    "rahulwebdev.in",
    "Rahul Verma web developer",
    "Freelance web developer in Patna",
    "Web developer in Bihar",
    "Full stack developer Patna",
    "Freelance full stack developer India",
    "React developer",
    "Next.js developer",
    "Node.js developer",
    "MongoDB developer",
  ],
  authors: [{ name: "Rahul Verma" }],
  creator: "Rahul Verma",
  publisher: "Rahul Web Development",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  category: "Professional Services",
  applicationName: "Rahul Web Development",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://rahulwebdev.in",
    title: "Rahul Verma | Freelance Full Stack Developer in Patna, Bihar",
    description:
      "Freelance full stack web developer from Patna, Bihar helping businesses build performant websites and web apps.",
    siteName: "Rahul Web Development",
    images: [
      {
        url: "/rahul.jpg",
        width: 1200,
        height: 630,
        alt: "Rahul Verma - Freelance Full Stack Developer in Patna, Bihar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Verma | Freelance Full Stack Developer in Patna, Bihar",
    description:
      "Rahul Verma (rahul1015s) builds SEO-friendly React and Next.js web apps for businesses in Patna, Bihar, and India.",
    images: ["/rahul.jpg"],
    creator: "@rahul1015s",
  },
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      "google-site-verification-code",
    ...(process.env.NEXT_PUBLIC_YANDEX_VERIFICATION && {
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    }),
    ...(process.env.NEXT_PUBLIC_BING_VERIFICATION && {
      bing: process.env.NEXT_PUBLIC_BING_VERIFICATION,
    }),
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/manifest.json",
  other: {
    "theme-color": "#10b981",
    "msapplication-TileColor": "#10b981",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-title": "Rahul Verma",
    "color-scheme": "light dark",
    "geo.region": "IN-BR",
    "geo.placename": "Patna, Bihar, India",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#10b981",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://rahulwebdev.in/#person",
        name: "Rahul Verma",
        alternateName: ["rahul1015s", "Rahul Verma web developer"],
        url: "https://rahulwebdev.in",
        image: "https://rahulwebdev.in/rahul.jpg",
        jobTitle: "Full Stack Developer",
        worksFor: { "@id": "https://rahulwebdev.in/#localbusiness" },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Patna",
          addressRegion: "Bihar",
          addressCountry: "India",
        },
        sameAs: [
          "https://github.com/rahul1015s",
          "https://linkedin.com/in/rahul1015s",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://rahulwebdev.in/#professional-service",
        name: "Rahul Verma Freelance Web Development Services",
        provider: { "@id": "https://rahulwebdev.in/#person" },
        url: "https://rahulwebdev.in",
        areaServed: [
          { "@type": "City", name: "Patna" },
          { "@type": "State", name: "Bihar" },
          { "@type": "Country", name: "India" },
        ],
        serviceType: [
          "Web Development",
          "Full Stack Development",
          "React Development",
          "Next.js Development",
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://rahulwebdev.in/#localbusiness",
        name: "Rahul Web Development",
        url: "https://rahulwebdev.in",
        image: "https://rahulwebdev.in/rahul.jpg",
        areaServed: ["Patna, Bihar, India"],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Patna",
          addressRegion: "Bihar",
          addressCountry: "India",
        },
        makesOffer: [
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Web Development" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Full Stack Development" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "React Development" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Next.js Development" },
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5GC7W3LN');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaGraph),
          }}
        />

        <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
/>
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5GC7W3LN"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
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
  );
}
