"use client";

import { useEffect, useRef, useState } from "react";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ---------------------------------------------
   Data
--------------------------------------------- */
const projects = [
  {
    title: "OPlus – Enterprise Workspace",
    description:
      "Enterprise SaaS with RBAC, AI chatbot, PWA support, and 40+ APIs handling complex workflows.",
    href: "https://opluscowork.com",
    tech: ["Next.js", "MongoDB", "RBAC", "PWA", "AI"],
    status: "live" as const,
  },
  {
    title: "SDRF India – CSR Platform",
    description:
      "Production-grade CSR and donation platform with secure payments, admin workflows, and email infrastructure.",
    href: "https://sdrfindia.org",
    tech: ["Next.js", "MongoDB", "Payments", "Admin"],
    status: "development" as const,
  },
];

/* ---------------------------------------------
   Component
--------------------------------------------- */
export default function ProofOfWork() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const total = projects.length;

  /* Auto slide */
  useEffect(() => {
    const id = setInterval(() => {
      goTo(active + 1);
    }, 3500);

    return () => clearInterval(id);
  }, [active]);

  const goTo = (index: number) => {
    const next = (index + total) % total;
    setActive(next);

    if (trackRef.current) {
      trackRef.current.scrollTo({
        left: trackRef.current.clientWidth * next,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="projects" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Proof of Work</h2>
          <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
            Real-world systems designed, built, and deployed with production standards.
          </p>
        </div>

        {/* ================= MOBILE CAROUSEL ================= */}
        <div className="relative sm:hidden">
          {/* Track */}
          <div
            ref={trackRef}
            className="
              flex overflow-x-hidden
              snap-x snap-mandatory
            "
          >
            {projects.map((project) => (
              <div
                key={project.title}
                className="w-full shrink-0 snap-center px-1"
              >
                <ProjectCard {...project} />
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={() => goTo(active - 1)}
            className="
              absolute left-2 top-1/2 -translate-y-1/2
              rounded-full bg-background/80 backdrop-blur
              p-2 shadow
            "
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={() => goTo(active + 1)}
            className="
              absolute right-2 top-1/2 -translate-y-1/2
              rounded-full bg-background/80 backdrop-blur
              p-2 shadow
            "
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="mt-4 flex justify-center gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1.5 w-1.5 rounded-full transition ${
                  active === i ? "bg-primary w-4" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ================= DESKTOP GRID ================= */}
        <div className="hidden sm:grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
