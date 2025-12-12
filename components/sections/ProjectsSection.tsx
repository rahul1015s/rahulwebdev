"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Github, ExternalLink, Code2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectsSection() {
  const projects = [
    {
      title: "Gen Notes – Rich Text Note App",
      description:
        "A full-featured note-taking platform with Tiptap rich editor, image uploads, formatting tools, tables, and HTML preview. Includes clean UI, responsive layout, and MongoDB backend.",
      tech: ["React.js", "Tailwind", "Tiptap", "MongoDB"],
      image: "/projects/gen-notes.png",
      live: "https://gennotes.vercel.app/",
      github: "https://github.com/rahul1015s/Gen-Notes",
    },
    {
      title: "AtoZ Market - Modern Grocery Store App",
      description:
        "A complete e-commerce grocery platform with category-based browsing, cart system, responsive UI, product filtering, and clean scalable code architecture.",
      tech: ["React.js", "Tailwind", "Tailwind CSS", "Fake Store API"],
      image: "/projects/atoz-market.png",
      live: "https://atoz-market.vercel.app/",
      github: "https://github.com/rahul1015s/AtoZ-market",
    },
    // {
    //   title: "Finance Tracker – Modern PWA",
    //   description:
    //     "A full-stack money tracking app with OCR receipt scanning, dynamic analytics, custom categories, user-specific dashboards, and offline support.",
    //   tech: ["Next.js", "TypeScript", "Tailwind", "Supabase", "OCR", "PWA"],
    //   image: "/projects/finance-tracker.png",
    //   live: "https://your-live-link.com",
    //   github: "https://github.com/rahul1015s",
    // },
    // {
    //   title: "Sagar Photography – MERN Client Project",
    //   description:
    //     "A production-ready photography booking website with admin dashboard, portfolio gallery, Cloudinary uploads, and contact automation.",
    //   tech: ["React", "Node.js", "Express", "MongoDB", "Cloudinary"],
    //   image: "/projects/sagar-photography.png",
    //   live: "https://your-live-link.com",
    //   github: "https://github.com/rahul1015s",
    // },
  ];

  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-12"
        >
          Featured <span className="text-emerald-600">Projects</span>
        </motion.h2>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card className="group overflow-hidden border bg-card/60 backdrop-blur shadow-sm hover:shadow-xl transition">
                <CardHeader className="p-0">
                  <div className="relative w-full h-60 overflow-hidden">
                    {project.image && project.image.startsWith("/") ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            "/default-blog.png";
                        }}
                      />
                    ) : (
                      <Image
                        src={project.image || "/default-blog.png"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                </CardHeader>

                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-emerald-600" />
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm bg-emerald-50 text-emerald-700 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 pt-3">
                    <Link
                      href={project.live}
                      target="_blank"
                      className="flex items-center gap-2 text-sm text-emerald-700 hover:text-emerald-900"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </Link>
                    <Link
                      href={project.github}
                      target="_blank"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <Github className="w-4 h-4" /> GitHub
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
