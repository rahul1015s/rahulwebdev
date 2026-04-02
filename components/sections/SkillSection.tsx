"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Code2, Database, Server, Wrench, Zap } from "lucide-react";
import { SkillCard, SkillCategory } from "@/components/cards/SkillCard";

/* ---------------------------------------------
   Data
--------------------------------------------- */
const categories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: Code2,
    skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"],
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["MongoDB", "Supabase", "Prisma"],
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: ["Git & GitHub", "Vercel", "VS Code", "Postman"],
  },
];

/* ---------------------------------------------
   Section
--------------------------------------------- */
const SkillsSection = memo(function SkillsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="skills" className="relative py-16 sm:py-20">
      {/* Background glow */}
      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="absolute top-1/3 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        </motion.div>
      )}

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-12 text-center"
        >
          <span className="inline-flex items-center gap-2 text-xs font-medium text-primary">
            <Zap className="h-3 w-3" />
            Skills
          </span>

          <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
            Technical Stack
          </h2>

          <p className="mt-3 max-w-xl mx-auto text-sm text-muted-foreground">
            Technologies and tools I use to design, build, and ship production-ready systems.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <SkillCard
              key={category.title}
              category={category}
              index={index}
            />
          ))}
        </div>

        {/* Footer */}
        <p className="mt-12 text-center text-xs text-muted-foreground">
          Continuously learning and refining my craft.
        </p>
      </div>
    </section>
  );
});

export default SkillsSection;
