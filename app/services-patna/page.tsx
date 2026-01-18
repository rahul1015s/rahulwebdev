import { Metadata } from 'next'
import { LocalServiceLanding } from '@/components/LocalServiceLanding'

export const metadata: Metadata = {
  title: 'Web Developer in Patna | Website & App Development',
  description: 'Professional website and app development for Patna businesses. Custom websites for shops, coaching centers, doctors, and startups. Affordable pricing, fast service, 24/7 support.',
  keywords: [
    'web developer in Patna',
    'website developer Patna Bihar',
    'web development Patna',
    'app development Patna',
    'freelance web developer Bihar',
    'business website Patna',
    'e-commerce website Patna',
    'booking system Patna',
  ],
  openGraph: {
    title: 'Web Developer in Patna | Website & App Development',
    description: 'Professional website and app development for Patna businesses. Custom solutions for shops, coaching centers, doctors, and startups.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://rahulwebdev.in/services-patna',
    siteName: 'Rahul Verma - Web Developer',
  },
  alternates: {
    canonical: 'https://rahulwebdev.in/services-patna',
  },
}

export default function ServicesPatnaPage() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Rahul Verma - Web Developer',
    image: 'https://rahulwebdev.in/profile.jpg',
    description: 'Professional website and app development for Patna businesses',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Patna',
      addressLocality: 'Patna',
      addressRegion: 'Bihar',
      postalCode: '800001',
      addressCountry: 'IN',
    },
    telephone: '+91-9999999999',
    email: 'hello@rahulwebdev.in',
    priceRange: '₹15,000 - ₹500,000',
    areaServed: ['Patna', 'Bihar', 'India'],
    serviceType: ['Web Development', 'App Development', 'E-commerce', 'Web Design'],
    knowsAbout: [
      'React',
      'Next.js',
      'Node.js',
      'Tailwind CSS',
      'Web Development',
      'App Development',
      'SEO',
      'E-commerce',
    ],
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Web and App Development Services',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Rahul Verma',
      areaServed: ['Patna', 'Bihar'],
    },
    areaServed: ['Patna', 'Bihar'],
    availableLanguage: 'en-IN',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <LocalServiceLanding />
    </>
  )
}
