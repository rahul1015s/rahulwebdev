"use client";

import { WorkCard, WorkProject } from "@/components/cards/WorkCard";
import { ExternalLink } from "lucide-react";

/* ---------------------------------------------
   Data
--------------------------------------------- */
const projects: WorkProject[] = [
  {
    title: "PortfolioGenix",
    description:
      "PortfolioGenix helps you create developer-friendly portfolios and ATS-friendly resumes — without design skills, complex tools, or hosting headaches.",
    tech: ["React", "Next.js", "Node.js", "Tailwind CSS", "Vercel", "Framer Motion"],
    live: "https://portfoliogenix.rahulwebdev.in/",
    github: "https://github.com/rahul1015s/PortfolioGenix",
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
    live: "https://atoz-market.vercel.app/",
    github: "https://github.com/rahul1015s/AtoZ-market",
    status: "development",
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

        {/* List */}
        <div className="relative">
          {projects.map((project, index) => (
            <WorkCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-8 pt-6 border-t border-border/40">
          <a
            href="https://github.com/rahul1015s"
            target="_blank"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            View more on GitHub
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
