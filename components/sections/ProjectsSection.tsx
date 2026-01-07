"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Github, ExternalLink, FolderOpen, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useMemo, useCallback, memo } from "react";

type Project = {
  title: string;
  description: string;
  tech: string[];
  live: string;
  github: string;
  features: string[];
};

/* ------------------------------------------------------------------ */
/* Data */
/* ------------------------------------------------------------------ */

const projects: Project[] = [
  {
    title: "Gen-Notes",
    description: "Secure MERN Stack PWA for note-taking with offline capabilities and JWT authentication.",
    tech: ["React", "Node.js", "MongoDB", "Express", "Tailwind"],
    live: "https://gennotes.vercel.app/",
    github: "https://github.com/rahul1015s/Gen-Notes",
    features: ["PWA", "JWT Auth", "Secure CRUD", "REST API"],
  },
  {
    title: "AtoZ Market",
    description: "Serverless e-commerce platform with Firebase authentication and modern UI.",
    tech: ["React", "Firebase", "Redux", "Tailwind", "Vite"],
    live: "https://atoz-market.vercel.app/",
    github: "https://github.com/rahul1015s/AtoZ-market",
    features: ["Firebase Auth", "Cart System", "Modern UI", "Newsletter"],
  },
];

/* ------------------------------------------------------------------ */
/* Tech Icon Component */
/* ------------------------------------------------------------------ */

const TechIcon = memo(({ tech }: { tech: string }) => {
  const icons: Record<string, React.ReactNode> = {
    "React": (
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
    ),
    "Node.js": (
      <path d="M12 2l10 6v8l-10 6-10-6V8z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    ),
    "MongoDB": (
      <path d="M12 2v20M12 6c-4 0-6 2-6 6s2 6 6 6 6-2 6-6-2-6-6-6z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    ),
    "Express": (
      <path d="M4 4h16v16H4zM8 8h8v8H8z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    ),
    "Tailwind": (
      <path d="M12 6c-3 0-4 2-4 4s1 4 4 4 4-2 4-4-1-4-4-4z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    ),
    "Firebase": (
      <path d="M12 2l-2 5-5 12 7-4 7 4-5-12z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    ),
    "Redux": (
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    ),
    "Vite": (
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    ),
  };

  return (
    <svg width="12" height="12" viewBox="0 0 24 24" className="text-muted-foreground">
      {icons[tech] || (
        <circle cx="12" cy="12" r="6" fill="currentColor" />
      )}
    </svg>
  );
});

TechIcon.displayName = "TechIcon";

/* ------------------------------------------------------------------ */
/* Project Card Component - Minimal */
/* ------------------------------------------------------------------ */

const ProjectCard = memo(({ project, index }: { project: Project; index: number }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="group"
    >
      <Card className="border border-border/50 hover:border-primary/30 transition-colors bg-card/50 backdrop-blur-sm overflow-hidden">
        <div className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                className="p-2 rounded-md bg-primary/5 group-hover:bg-primary/10 transition-colors"
                animate={{ 
                  rotate: isHovering ? 5 : 0
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FolderOpen className="w-4 h-4 text-primary" />
              </motion.div>
              
              <div>
                <h3 className="font-medium group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Link
                href={project.live}
                target="_blank"
                className="p-2 rounded-md border hover:bg-primary/5 hover:border-primary/20 transition-colors"
                title="Live Demo"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              
              <Link
                href={project.github}
                target="_blank"
                className="p-2 rounded-md border hover:bg-primary/5 hover:border-primary/20 transition-colors"
                title="GitHub Repository"
              >
                <Github className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs text-muted-foreground">Built with</span>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((tech, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 px-2 py-1 text-xs bg-muted rounded-md hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  <TechIcon tech={tech} />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-1.5">
            {project.features.map((feature, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs bg-primary/5 text-primary rounded-md"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
        
        {/* Hover Indicator */}
        <motion.div
          className="h-0.5 bg-primary"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovering ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </Card>
    </motion.div>
  );
});

ProjectCard.displayName = "ProjectCard";

/* ------------------------------------------------------------------ */
/* Header Component */
/* ------------------------------------------------------------------ */

const Header = memo(() => (
  <div className="mb-10">
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="mb-3"
    >
      <span className="text-sm font-medium text-primary">
        Projects
      </span>
    </motion.div>

    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="text-2xl font-semibold mb-2"
    >
      Work
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="text-muted-foreground text-sm"
    >
      A selection of recent projects I've built.
    </motion.p>
  </div>
));

Header.displayName = "Header";

/* ------------------------------------------------------------------ */
/* Stats Component */
/* ------------------------------------------------------------------ */

const Stats = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3, delay: 0.3 }}
    className="flex items-center gap-4 mb-6"
  >
    <div className="text-sm">
      <span className="text-primary font-medium">{projects.length}</span>
      <span className="text-muted-foreground"> projects</span>
    </div>
    <div className="w-px h-4 bg-border" />
    <div className="text-sm">
      <span className="text-primary font-medium">
        {Array.from(new Set(projects.flatMap(p => p.tech))).length}
      </span>
      <span className="text-muted-foreground"> technologies</span>
    </div>
  </motion.div>
));

Stats.displayName = "Stats";

/* ------------------------------------------------------------------ */
/* GitHub CTA */
/* ------------------------------------------------------------------ */

const GitHubCTA = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3, delay: 0.4 }}
    className="mt-10 pt-6 border-t border-border/30"
  >
    <Link
      href="https://github.com/rahul1015s"
      target="_blank"
      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
    >
      <span>View all projects on GitHub</span>
      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
    </Link>
  </motion.div>
));

GitHubCTA.displayName = "GitHubCTA";

/* ------------------------------------------------------------------ */
/* Main Component */
/* ------------------------------------------------------------------ */

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Header />
        <Stats />
        
        {/* Projects List */}
        <div className="space-y-4">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        <GitHubCTA />
      </div>
    </section>
  );
}