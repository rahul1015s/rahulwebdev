"use client";

import { ExternalLink, Github } from "lucide-react";

/* Tech icon map */
const techIcons: Record<string, string> = {
  "Next.js": "devicon-nextjs-plain",
  React: "devicon-react-original",
  MongoDB: "devicon-mongodb-plain",
  Mongoose: "devicon-mongodb-plain",
  GSAP: "devicon-javascript-plain",
  Tailwind: "devicon-tailwindcss-plain",
  Shadcn: "devicon-react-original",
  Nodemailer: "devicon-nodejs-plain",
  Firebase: "devicon-firebase-plain",
  Redux: "devicon-redux-original",
  Vite: "devicon-vitejs-plain",
  JWT: "devicon-json-plain",
  PWA: "devicon-chrome-plain",
};

export type WorkProject = {
  title: string;
  description: string;
  tech: string[];
  live: string;
  github: string;
  status: "live" | "development";
  highlight?: boolean;
};

type WorkCardProps = {
  project: WorkProject;
  index: number;
};

export function WorkCard({ project, index }: WorkCardProps) {
  return (
    <div
      className={`
        group relative py-6 border-b border-border/40
        ${project.highlight ? "pb-10" : ""}
      `}
    >
      {/* Top */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-base font-medium group-hover:text-primary transition">
          {project.title}
        </h3>

        <div className="flex items-center gap-3">
          {project.github !== "Private" && project.github !== "Not public yet" && (
            <a href={project.github} target="_blank">
              <Github className="h-4 w-4 opacity-60 hover:opacity-100" />
            </a>
          )}

          <a href={project.live} target="_blank">
            <ExternalLink className="h-4 w-4 opacity-60 hover:opacity-100" />
          </a>
        </div>
      </div>

      {/* Status */}
      <span
        className={`text-[10px] mt-1 inline-block ${
          project.status === "live"
            ? "text-green-500"
            : "text-yellow-500"
        }`}
      >
        {project.status === "live" ? "● Live" : "● In Progress"}
      </span>

      {/* Description */}
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xl">
        {project.description}
      </p>

      {/* Tech */}
      <div className="mt-3 flex flex-wrap gap-3">
        {project.tech.map((t: string) => (
          <div
            key={t}
            className="flex items-center gap-1 text-xs text-muted-foreground/70 hover:text-foreground transition"
          >
            {techIcons[t] && (
              <i className={`${techIcons[t]} text-sm`} />
            )}
            {t}
          </div>
        ))}
      </div>

      {/* Highlight badge */}
      {project.highlight && (
        <span className="absolute right-0 top-6 text-[10px] text-primary">
          Featured
        </span>
      )}
    </div>
  );
}
