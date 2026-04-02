"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ---------------------------------------------
   Types
--------------------------------------------- */
export type ProjectStatus = "live" | "development";

export type ProjectCardProps = {
  title: string;
  description: string;
  tech: string[];
  href: string;
  status?: ProjectStatus;
  className?: string;
};

/* ---------------------------------------------
   SVG: Panel Frame + Rails
--------------------------------------------- */
function PanelFrame() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      {/* Outer border */}
      <rect
        x="0.5"
        y="0.5"
        width="99"
        height="99"
        rx="10"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.15"
        vectorEffect="non-scaling-stroke"
      />

      {/* Top rail */}
      <line
        x1="2"
        y1="14"
        x2="98"
        y2="14"
        stroke="currentColor"
        strokeOpacity="0.08"
        vectorEffect="non-scaling-stroke"
      />

      {/* Bottom rail */}
      <line
        x1="2"
        y1="86"
        x2="98"
        y2="86"
        stroke="currentColor"
        strokeOpacity="0.08"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/* ---------------------------------------------
   SVG: Status Indicator
--------------------------------------------- */
function StatusIndicator({ live }: { live: boolean }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <svg width="10" height="10" viewBox="0 0 10 10">
        <circle
          cx="5"
          cy="5"
          r="3"
          fill="currentColor"
          className={live ? "text-emerald-500" : "text-amber-500"}
        />
        {live && (
          <motion.circle
            cx="5"
            cy="5"
            r="3"
            fill="none"
            stroke="currentColor"
            className="text-emerald-500"
            initial={{ opacity: 0.4, scale: 1 }}
            animate={{ opacity: 0, scale: 2 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        )}
      </svg>
      <span className="text-muted-foreground">
        {live ? "Production" : "In development"}
      </span>
    </div>
  );
}

/* ---------------------------------------------
   Main Card
--------------------------------------------- */
export function ProjectCard({
  title,
  description,
  tech,
  href,
  status = "development",
  className,
}: ProjectCardProps) {
  const isLive = status === "live";

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={cn(
        "relative h-full rounded-xl",
        "bg-card/85 backdrop-blur",
        "border border-border/50",
        "transition-colors hover:border-primary/40",
        className
      )}
    >
      {/* SVG frame */}
      <PanelFrame />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col gap-4 p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-sm font-semibold leading-snug text-foreground">
            {title}
          </h3>

          <StatusIndicator live={isLive} />
        </div>

        {/* Description */}
        <p className="text-xs leading-relaxed text-muted-foreground line-clamp-4">
          {description}
        </p>

        {/* Divider */}
        <div className="h-px w-full bg-border/40" />

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {tech.map((item) => (
            <span
              key={item}
              className="
                rounded-md border border-border/60
                px-2 py-0.5 text-[10px]
                text-muted-foreground
              "
            >
              {item}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            System
          </span>

          <Link
            href={href}
            target="_blank"
            className="
              inline-flex items-center gap-1
              text-xs font-medium text-primary
              hover:underline
            "
          >
            Open
            <ExternalLink size={12} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
