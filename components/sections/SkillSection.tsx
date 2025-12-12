"use client";

import { motion } from "framer-motion";
import { Code2, Database, Server, Wrench } from "lucide-react";

export default function SkillsSection() {
  const categories = [
    {
      title: "Frontend",
      icon: <Code2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    },
    {
      title: "Backend",
      icon: <Server className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      skills: ["Node.js", "Express.js", "REST APIs", "JWT Auth"],
    },
    {
      title: "Databases",
      icon: <Database className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      skills: ["MongoDB", "Supabase", "PostgreSQL (basics)"],
    },
    {
      title: "Tools",
      icon: <Wrench className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      skills: ["Git & GitHub", "Postman", "Cloudinary", "Vercel", "Linux Basics"],
    },
  ];

  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-foreground"
        >
          Skills & <span className="text-emerald-600 dark:text-emerald-400">Tech Stack</span>
        </motion.h2>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 border bg-card/60 backdrop-blur rounded-xl shadow-sm hover:shadow-md transition"
            >
              {/* Category Title */}
              <div className="flex items-center gap-2 mb-4">
                {cat.icon}
                <h3 className="text-xl font-semibold text-foreground">{cat.title}</h3>
              </div>

              {/* Skill List */}
              <ul className="space-y-2 text-muted-foreground">
                {cat.skills.map((skill, i) => (
                  <li
                    key={i}
                    className="bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-md text-sm text-foreground dark:text-emerald-200"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
