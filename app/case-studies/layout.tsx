import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | Rahul Verma",
  description: "Detailed case studies of successful projects built by Rahul Verma. Learn about challenges, solutions, and results from real-world web development projects.",
  keywords: [
    "case studies",
    "projects",
    "web development",
    "React",
    "Next.js",
    "Node.js",
    "MERN stack",
    "full stack development",
    "portfolio",
  ],
  openGraph: {
    title: "Case Studies | Rahul Verma",
    description: "Detailed case studies of successful projects built by Rahul Verma. Learn about challenges, solutions, and results from real-world web development projects.",
    url: "https://rahulwebdev.in/case-studies",
    type: "website",
    images: [
      {
        url: "/og-case-studies.svg",
        width: 1200,
        height: 630,
        alt: "Rahul Verma Case Studies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | Rahul Verma",
    description: "Detailed case studies of successful projects built by Rahul Verma.",
  },
  alternates: {
    canonical: "https://rahulwebdev.in/case-studies",
  },
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
