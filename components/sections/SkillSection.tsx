"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Zap } from "lucide-react";

/* ---------------------------------------------
   Data with Icons
--------------------------------------------- */
const categories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: "devicon-react-original" },
      { name: "Next.js", icon: "devicon-nextjs-plain" },
      { name: "TypeScript", icon: "devicon-typescript-plain" },
      { name: "Tailwind", icon: "devicon-tailwindcss-plain" },
      { name: "Framer Motion", icon: "devicon-react-original" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: "devicon-nodejs-plain" },
      { name: "Express", icon: "devicon-express-original" },
      { name: "REST APIs", icon: "devicon-fastapi-plain" },
      { name: "JWT", icon: "devicon-json-plain" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MongoDB", icon: "devicon-mongodb-plain" },
      { name: "Supabase", icon: "devicon-supabase-plain" },
      { name: "Prisma", icon: "devicon-prisma-original" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", icon: "devicon-git-plain" },
      { name: "GitHub", icon: "devicon-github-original" },
      { name: "Vercel", icon: "devicon-vercel-original" },
      { name: "Postman", icon: "devicon-postman-plain" },
    ],
  },
  {
    title: "AI",
    skills: [
      { name: "OpenAI", icon: "devicon-openai-original" },
      { name: "AI APIs", icon: "devicon-fastapi-plain" },
      { name: "Prompting", icon: "devicon-python-plain" },
    ],
  },
];

/* ---------------------------------------------
   Section
--------------------------------------------- */
const SkillsSection = memo(function SkillsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="skills" className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        
        {/* Header */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="inline-flex items-center gap-2 text-xs font-medium text-primary">
            <Zap className="h-3 w-3" />
            Skills
          </span>

          <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
            Technical Stack
          </h2>

          <p className="mt-3 text-sm text-muted-foreground">
            Tools I use to design, build and scale real-world applications.
          </p>
        </motion.div>

        {/* Skills */}
        <div className="space-y-8">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.title}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col gap-3 sm:flex-row sm:gap-8"
            >
              {/* Category */}
              <div className="min-w-[120px] text-sm font-medium text-muted-foreground">
                {cat.title}
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-4">
                {cat.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="
                      flex items-center gap-2 text-xs
                      text-muted-foreground/70
                      hover:text-foreground
                      transition-all duration-300
                    "
                  >
                    <i className={`${skill.icon} text-base`} />
                    {skill.name}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <p className="mt-12 text-center text-xs text-muted-foreground">
          Always learning. Always building.
        </p>
      </div>
    </section>
  );
});

export default SkillsSection;