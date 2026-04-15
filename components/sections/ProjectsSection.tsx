"use client";

import { WorkCard, WorkProject } from "@/components/cards/WorkCard";
import { ExternalLink } from "lucide-react";

/* ---------------------------------------------
   Data (Optimized + Featured First)
--------------------------------------------- */
const projects: WorkProject[] = [
  {
    title: "GenExpence",
    description:
      "Financial clarity platform to track expenses, monitor budgets, and gain insights with a clean dashboard experience.",
    tech: [
      "Next.js",
      "React",
      "MongoDB",
      "Mongoose",
      "GSAP",
      "Tailwind",
      "Shadcn",
      "Nodemailer",
    ],
    live: "https://genexpence.vercel.app/",
    github: "Private",
    status: "live",
  
  },

  {
    title: "Gen-Notes",
    description:
      "Secure MERN PWA for note-taking with offline support, JWT authentication, and REST APIs.",
    tech: ["React", "Node.js", "MongoDB", "PWA", "JWT"],
    live: "https://gennotes.vercel.app/",
    github: "https://github.com/rahul1015s/Gen-Notes",
    status: "live",
  },

  {
    title: "AtoZ Market",
    description:
      "Serverless e-commerce platform with Firebase authentication and modern UI patterns.",
    tech: ["React", "Firebase", "Redux", "Vite"],
    live: "https://atozmarket2-0.vercel.app/",
    github: "Not public yet",
    status: "development",
  },

  {
    title: "PortfolioGenix",
    description:
      "PortfolioGenix helps you create developer-friendly portfolios and ATS-friendly resumes — without design skills.",
    tech: [
      "React",
      "Next.js",
      "Node.js",
      "Tailwind",
      "Vercel",
      "Framer Motion",
    ],
    live: "https://portfoliogenix.rahulwebdev.in/",
    github: "https://github.com/rahul1015s/PortfolioGenix",
    status: "live",
  },
];

/* ---------------------------------------------
   Section
--------------------------------------------- */
export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">

        {/* Header */}
        <div className="mb-10">
          <span className="text-xs uppercase tracking-wider text-primary">
            Work
          </span>

          <h2 className="mt-2 text-2xl font-semibold">
            Selected Projects
          </h2>

          <p className="mt-2 text-sm text-muted-foreground max-w-xl">
            Production-ready applications built with modern stacks and real-world constraints.
          </p>
        </div>

        {/*   Clean List */}
        <div className="divide-y divide-border/30">
          {projects.map((project, index) => (
            <WorkCard
              key={`${project.title}-${index}`}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-border/40">
          <a
            href="https://github.com/rahul1015s"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
          >
            View more on GitHub
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}