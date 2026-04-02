"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";

/* ---------------------------------------------
   Types
--------------------------------------------- */
export type WorkProject = {
  title: string;
  description: string;
  tech: string[];
  live: string;
  github: string;
  status: "live" | "development";
};

/* ---------------------------------------------
   SVG Divider (structural)
--------------------------------------------- */
function RowDivider() {
  return (
    <svg
      className="absolute inset-x-0 bottom-0 h-px w-full"
      viewBox="0 0 100 1"
      preserveAspectRatio="none"
      aria-hidden
    >
      <line
        x1="0"
        y1="0.5"
        x2="100"
        y2="0.5"
        stroke="currentColor"
        strokeOpacity="0.15"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/* ---------------------------------------------
   Status Dot
--------------------------------------------- */
function StatusDot({ live }: { live: boolean }) {
  return (
    <span className="relative flex h-2 w-2">
      <span
        className={`absolute inset-0 rounded-full ${
          live ? "bg-emerald-500" : "bg-amber-500"
        }`}
      />
      {live && (
        <motion.span
          className="absolute inset-0 rounded-full bg-emerald-500"
          initial={{ opacity: 0.4, scale: 1 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      )}
    </span>
  );
}

/* ---------------------------------------------
   Card Component
--------------------------------------------- */
export function WorkCard({
  project,
  index,
}: {
  project: WorkProject;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="relative py-6"
    >
      <RowDivider />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto]">
        {/* Left */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <StatusDot live={project.status === "live"} />
            <h3 className="text-sm font-medium text-foreground">
              {project.title}
            </h3>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
            {project.description}
          </p>

          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
            {project.tech.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 md:pt-1">
          <Link
            href={project.live}
            target="_blank"
            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
          >
            Live <ExternalLink size={12} />
          </Link>

          <Link
            href={project.github}
            target="_blank"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            Code <Github size={12} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
