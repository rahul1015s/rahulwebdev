import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume | Rahul Verma",
  description: "Resume and professional experience of Rahul Verma, Full Stack Developer. Skills, education, and work experience in web development, React, Next.js, and Node.js.",
  keywords: [
    "resume",
    "CV",
    "experience",
    "skills",
    "full stack developer",
    "web developer",
    "React",
    "Next.js",
    "Node.js",
    "JavaScript",
    "TypeScript",
  ],
  openGraph: {
    title: "Resume | Rahul Verma",
    description: "Resume and professional experience of Rahul Verma, Full Stack Developer.",
    url: "https://rahulwebdev.in/resume",
    type: "profile",
    images: [
      {
        url: "/og-resume.svg",
        width: 1200,
        height: 630,
        alt: "Rahul Verma Resume",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume | Rahul Verma",
    description: "Resume and professional experience of Rahul Verma, Full Stack Developer.",
  },
  alternates: {
    canonical: "https://rahulwebdev.in/resume",
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
