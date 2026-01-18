import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Rahul Verma",
  description: "Explore articles and insights on web development, React, Next.js, Node.js, and modern technologies by Rahul Verma.",
  keywords: [
    "blog",
    "web development",
    "React",
    "Next.js",
    "Node.js",
    "JavaScript",
    "TypeScript",
    "tutorials",
    "articles",
  ],
  openGraph: {
    title: "Blog | Rahul Verma",
    description: "Explore articles and insights on web development, React, Next.js, Node.js, and modern technologies.",
    url: "https://rahulwebdev.in/blog",
    type: "website",
    images: [
      {
        url: "/og-blog.svg",
        width: 1200,
        height: 630,
        alt: "Rahul Verma Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Rahul Verma",
    description: "Explore articles and insights on web development, React, Next.js, Node.js, and modern technologies.",
  },
  alternates: {
    canonical: "https://rahulwebdev.in/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
