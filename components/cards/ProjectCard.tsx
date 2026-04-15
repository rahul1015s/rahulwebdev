"use client";

import { ExternalLink } from "lucide-react";

/* Devicon mapping */
const techIcons: Record<string, string> = {
  "Next.js": "devicon-nextjs-plain",
  "Node.js": "devicon-nodejs-plain",
  MongoDB: "devicon-mongodb-plain",
  JWT: "devicon-json-plain",
  PayU: "devicon-google-plain", // fallback
  RBAC: "devicon-shield-plain",
  PWA: "devicon-chrome-plain",
  AI: "devicon-openai-original",
  Payments: "devicon-stripe-plain",
  Admin: "devicon-react-original",
};

export function ProjectCard({
  title,
  description,
  href,
  tech,
  status,
}: {
  title: string;
  description: string;
  href: string;
  tech: string[];
  status: "live" | "development";
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group block rounded-xl border border-border/60 p-5
        transition-all duration-300
        hover:border-border hover:-translate-y-1
      "
    >
      {/* Top */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-medium group-hover:text-primary transition">
          {title}
        </h3>

        <ExternalLink className="h-4 w-4 opacity-50 group-hover:opacity-100 transition" />
      </div>

      {/* Status */}
      <div className="mt-1">
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full border ${
            status === "live"
              ? "border-green-500/40 text-green-600"
              : "border-yellow-500/40 text-yellow-600"
          }`}
        >
          {status === "live" ? "Live" : "In Progress"}
        </span>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Tech icons */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {tech.map((t) => (
          <div
            key={t}
            className="flex items-center gap-1 text-xs text-muted-foreground"
          >
            {techIcons[t] && (
              <i className={`${techIcons[t]} text-sm opacity-70`} />
            )}
            {t}
          </div>
        ))}
      </div>
    </a>
  );
}