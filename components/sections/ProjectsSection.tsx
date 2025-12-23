"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Github, ExternalLink, Star, Zap, FolderOpen } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "Gen-Notes",
    description: "Secure MERN Stack PWA for note-taking with offline capabilities, JWT authentication, and private data handling.",
    tech: ["React", "Node.js", "MongoDB", "Express", "Tailwind"],
    live: "https://gennotes.vercel.app/",
    github: "https://github.com/rahul1015s/Gen-Notes",
    features: ["PWA", "JWT Auth", "Secure CRUD", "REST API"],
    status: "Live"
  },
  {
    title: "AtoZ Market",
    description: "Serverless e-commerce platform with Firebase authentication, Redux state management, and modern UI.",
    tech: ["React", "Firebase", "Redux", "Tailwind", "Vite"],
    live: "https://atoz-market.vercel.app/",
    github: "https://github.com/rahul1015s/AtoZ-market",
    features: ["Firebase Auth", "Cart System", "Modern UI", "Newsletter"],
    status: "Live"
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <Star className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-medium text-emerald-600 tracking-wide">
              PROJECTS
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            Featured{" "}
            <span className="relative inline-block">
              <span className="text-emerald-600">Projects</span>
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-600/30" />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-muted-foreground text-lg max-w-2xl"
          >
            A selection of projects showcasing modern web development practices and clean UI/UX.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Link
            href="https://github.com/rahul1015s"
            target="_blank"
            className="inline-flex items-center gap-2 group text-emerald-600 hover:text-emerald-700 font-medium"
          >
            <span className="border-b border-transparent group-hover:border-emerald-600 transition-all">
              View all projects on GitHub
            </span>
            <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// Project Card Component
function ProjectCard({ project, index }: { project: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group relative"
    >
      {/* Status Badge */}
      <div className="absolute -top-3 -right-3 z-10">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white text-xs font-medium rounded-full shadow-lg">
          <Zap className="w-3 h-3" />
          {project.status}
        </div>
      </div>

      <Card className="h-full overflow-hidden border hover:border-emerald-200 transition-colors bg-card/50 backdrop-blur-sm">
        {/* Card Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-2 rounded-lg bg-emerald-50"
              >
                <FolderOpen className="w-5 h-5 text-emerald-600" />
              </motion.div>
              <h3 className="text-xl font-semibold group-hover:text-emerald-700 transition-colors">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          {/* Features */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.features.map((feature: string, i: number) => (
              <span
                key={i}
                className="px-2.5 py-1 text-xs bg-emerald-50 text-emerald-700 rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="px-6 pb-4">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech: string, i: number) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full hover:bg-emerald-50 hover:text-emerald-700 transition-colors cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 pb-6 pt-4 border-t">
          <div className="flex items-center gap-3">
            <Link
              href={project.live}
              target="_blank"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all group relative overflow-hidden"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent" />
              
              <span>Live Demo</span>
              <motion.span
                animate={{ x: [0, 2, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ExternalLink className="w-4 h-4" />
              </motion.span>
            </Link>

            <Link
              href={project.github}
              target="_blank"
              className="inline-flex items-center justify-center p-2.5 border rounded-lg hover:bg-muted transition-colors group"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Github className="w-4 h-4" />
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Hover Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </Card>
    </motion.div>
  );
}