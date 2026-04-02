"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness, CalendarDays, MapPin } from "lucide-react";

const experiences = [
  {
    role: "Full-Stack Developer",
    company: "Oplus Cowork",
    period: "Jan 2026 – Present",
    type: "Full-time",
    location: "Patna, Bihar, India (On-site)",
    summary:
      "Led product architecture and shipped a workspace management platform using Next.js, React, MongoDB, and Tailwind CSS.",
    highlights: [
      "Owned end-to-end development from schema design to deployment",
      "Built admin workflows and operational dashboards",
      "Focused on fast, maintainable UI and API performance",
    ],
  },
  {
    role: "Full-Stack Developer Intern",
    company: "Oplus Cowork",
    period: "Sep 2025 – Dec 2025",
    type: "Internship",
    location: "Patna, Bihar, India",
    summary:
      "Built reusable frontend modules and backend endpoints for authentication, content workflows, and internal tools.",
    highlights: [
      "Implemented production-ready API routes",
      "Contributed to reusable UI component patterns",
      "Improved app stability and response times",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Carryzo Logistics",
    period: "Oct 2024 – Jan 2025",
    type: "Contract",
    location: "Remote",
    summary:
      "Designed and developed a responsive logistics website with modern UI patterns and performance-focused delivery.",
    highlights: [
      "Built responsive pages for desktop and mobile",
      "Improved page speed and interaction quality",
      "Collaborated directly with stakeholders for iterative releases",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10"
        >
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Experience</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Professional experience building real-world products.
          </p>
        </motion.div>

        <div className="relative space-y-7 border-l border-border/70 pl-4 sm:space-y-8 sm:pl-8">
          <div className="absolute bottom-0 left-0 top-0 hidden w-px bg-border/80 sm:block" />

          {experiences.map((exp, index) => (
            <motion.article
              key={`${exp.company}-${exp.period}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute left-[-21px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-primary bg-background sm:left-[-36px]" />

              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold leading-snug sm:text-xl">
                    {exp.role} <span className="text-muted-foreground">·</span> {exp.company}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground sm:text-sm">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <BriefcaseBusiness className="h-3.5 w-3.5" />
                      {exp.type}
                    </span>
                  </div>
                  <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground sm:text-sm">
                    <MapPin className="h-3.5 w-3.5" />
                    {exp.location}
                  </p>
                </div>
              </div>

              <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-[15px]">
                {exp.summary}
              </p>

              <ul className="mt-3 space-y-1.5">
                {exp.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
