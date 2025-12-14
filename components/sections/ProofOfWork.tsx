"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Shield,
  Zap,
  Users,
  Code,
  Globe,
  Wrench,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


type ProjectStatus = "live" | "development";

type Project = {
  title: string;
  description: string;
  image: string;
  fallbackImage?: string;
  tech: string[];
  live: string;
  status: ProjectStatus;
};

/* ------------------------------------------------------------------ */
/* Data */
/* ------------------------------------------------------------------ */

const projects: Project[] = [
  {
    title: "OPlus – Enterprise Workspace Platform",
    description:
      "Solo-built enterprise SaaS featuring RBAC, AI chatbot, 40+ APIs, complex workflows, admin dashboards, OTP authentication, caching, and PWA support.",
    image: "/projects/oplus.gif",
    fallbackImage: "/projects/oplus.png",
    tech: ["Next.js", "TypeScript", "MongoDB", "PWA", "AI"],
    live: "https://opluscowork.com/",
    status: "live",
  },
  {
    title: "SDRF India – CSR & Donation Platform",
    description:
      "Production-grade CSR and donation platform with secure payments, admin workflows, email infrastructure, and deployment at scale.",
    image: "/projects/sdrf.gif",
    fallbackImage: "/projects/sdrf.png",
    tech: ["Next.js", "MongoDB", "Payments", "Email"],
    live: "https://sdrfindia.org/",
    status: "development",
  },
];



export default function ProofOfWork() {
  return (
    <section id="experience" className="py-24 relative">
      {/* Background glow (same language as Hero) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/3 w-72 h-72 rounded-full blur-3xl bg-emerald-500/10 dark:bg-emerald-500/5" />
      </div>

      <div className="max-w-5xl mx-auto px-6 space-y-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Proof of Work
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Real-world systems shipped to production — designed, built, and
            maintained end-to-end.
          </p>
        </motion.div>

        {/* Projects */}
        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Project Card */
/* ------------------------------------------------------------------ */

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [imgSrc, setImgSrc] = useState(project.image);
  const [loaded, setLoaded] = useState(false);
  const [isFallback, setIsFallback] = useState(false);

  const isLive = project.status === "live";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -6 }}
      className="group"
    >
      <Card
        className="relative overflow-hidden border bg-background/90 backdrop-blur-md
                   transition-all duration-300 shadow-sm hover:shadow-lg pt-0" 
        style={{
          borderColor: isLive
            ? "rgba(52,211,153,0.35)"
            : "rgba(251,191,36,0.35)",
        }}
      >
        {/* Status Badge - IMPROVED CONTRAST */}
        <div className="absolute top-4 right-4 z-10">
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full
            text-xs font-medium border backdrop-blur-sm
            ${
              isLive
                ? "bg-emerald-50 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-100 border-emerald-200 dark:border-emerald-700"
                : "bg-amber-50 dark:bg-amber-900/80 text-amber-800 dark:text-amber-100 border-amber-200 dark:border-amber-700"
            }`}
          >
            {isLive ? <Globe size={12} /> : <Wrench size={12} />}
            {isLive ? "Live" : "In Development"}
          </div>
        </div>

        {/* Image */}
        <div className="relative h-52 overflow-hidden bg-muted">
          {!loaded && (
            <div className="absolute inset-0 animate-pulse bg-linear-to-br from-muted to-background" />
          )}

          <Image
            src={imgSrc}
            alt={project.title}
            fill
            className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => {
              setLoaded(true);
              setIsFallback(false);
            }}
            onError={() => {
              if (imgSrc === project.image && project.fallbackImage) {
                setImgSrc(project.fallbackImage);
                setIsFallback(true);
              } else {
                setImgSrc("/project-default.png");
                setIsFallback(true);
              }
            }}
          />

          {isFallback && (
            <span className="absolute bottom-2 left-2 text-xs px-2 py-1 rounded bg-black/70 text-white backdrop-blur">
              Static preview
            </span>
          )}
        </div>

        {/* Content */}
        <CardContent className="p-6 space-y-4">
          <h3 className="text-lg font-semibold leading-tight">
            {project.title}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 pt-1">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs rounded-full border bg-muted text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Meta */}
          <div className="flex items-center gap-4 pt-3 text-xs text-muted-foreground">
            {isLive ? (
              <>
                <span className="flex items-center gap-1">
                  <Zap size={12} /> Production
                </span>
                <span className="flex items-center gap-1">
                  <Shield size={12} /> Secure
                </span>
                <span className="flex items-center gap-1">
                  <Users size={12} /> Scalable
                </span>
              </>
            ) : (
              <>
                <span className="flex items-center gap-1">
                  <Code size={12} /> Development
                </span>
                <span className="flex items-center gap-1">
                  <Wrench size={12} /> In Progress
                </span>
              </>
            )}
          </div>

          {/* Action */}
          <div className="pt-4 border-t">
            <Link
              href={project.live}
              target="_blank"
              aria-label={`Open ${project.title}`}
              className={`inline-flex items-center gap-2 text-sm font-medium transition
              ${
                isLive
                  ? "text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                  : "text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
              }`}
            >
              {isLive ? "View Live Project" : "View Preview"}
              <ExternalLink size={16} />
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}