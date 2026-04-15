"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BriefcaseBusiness, CalendarDays, MapPin, ChevronDown } from "lucide-react";

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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold sm:text-3xl">Experience</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Professional experience building real-world products.
          </p>
        </div>

        <div className="relative space-y-6 border-l border-border pl-6">
          {/* timeline line */}
          <div className="absolute left-0 top-0 h-full w-px bg-border" />

          {experiences.map((exp, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="relative">

                {/* header */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full text-left"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {exp.role}{" "}
                        <span className="text-muted-foreground">·</span>{" "}
                        {exp.company}
                      </h3>

                      <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <BriefcaseBusiness className="h-3.5 w-3.5" />
                          {exp.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* arrow */}
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* dropdown content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 space-y-3">
                        <p className="text-sm text-muted-foreground">
                          {exp.summary}
                        </p>

                        <ul className="space-y-2">
                          {exp.highlights.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}