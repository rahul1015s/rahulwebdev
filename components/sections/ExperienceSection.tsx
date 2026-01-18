"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function ExperienceSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-semibold">Experience</h2>
          <p className="mt-2 text-muted-foreground">
            Professional experience building real-world products.
          </p>
        </motion.div>

        {/* Experience List */}
        <div className="space-y-10 border-l border-border pl-6">
          {/* Oplus Full-Time */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-medium">
              Full-Stack Developer · Oplus Cowork
            </h3>
            <p className="text-sm text-muted-foreground">
              Jan 2026 – Present · Full-time
            </p>

            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              Patna, Bihar, India (On-site)
            </div>

            <p className="mt-3 max-w-2xl text-muted-foreground">
              Sole Full-Stack Developer responsible for designing and building
              a workspace management platform using Next.js, React, MongoDB,
              and Tailwind CSS. Owned the entire product lifecycle from
              database design to UI and deployment.
            </p>
          </motion.div>

          {/* Oplus Internship */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-medium">
              Full-Stack Developer Intern · Oplus Cowork
            </h3>
            <p className="text-sm text-muted-foreground">
              Sep 2025 – Dec 2025 · Internship
            </p>

            <p className="mt-3 max-w-2xl text-muted-foreground">
              Built core features, reusable UI components, and REST APIs.
              Worked on authentication, admin dashboards, and performance
              optimizations.
            </p>
          </motion.div>

          {/* Carryzo */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-medium">
              Frontend Developer · Carryzo Logistics
            </h3>
            <p className="text-sm text-muted-foreground">
              Oct 2024 – Jan 2025 · Contract
            </p>

            <p className="mt-3 max-w-2xl text-muted-foreground">
              Designed and developed the Carryzo Logistics website with a
              responsive layout, modern UI, and optimized performance.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
