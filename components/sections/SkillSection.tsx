"use client";

import { motion } from "framer-motion";
import { Code2, Database, Server, Wrench, Zap, Star } from "lucide-react";
import { useState } from "react";

export default function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  const categories = [
    {
      title: "Frontend",
      icon: <Code2 className="w-6 h-6" />,
      skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    },
     {
      title: "Tools",
      icon: <Wrench className="w-6 h-6" />,
      skills: ["Git & GitHub", "Vercel", "VS Code", "Postman"],
    },
    {
      title: "Backend",
      icon: <Server className="w-6 h-6" />,
      skills: ["Node.js", "Express.js", "REST APIs", "JWT Auth"],
    },
    {
      title: "Databases",
      icon: <Database className="w-6 h-6" />,
      skills: ["MongoDB", "Supabase", "Prisma" ],
    },
   
  ];

  return (
    <section id="skills" className="py-24 relative">
      {/* Subtle background glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-emerald-500/5 blur-3xl"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header with micro-interaction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap className="w-3 h-3" />
            Technical Expertise
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Skills & <span className="text-emerald-600 dark:text-emerald-400">Tech Stack</span>
          </h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Technologies I work with to build scalable applications
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -4,
                transition: { type: "spring", stiffness: 300 }
              }}
              onHoverStart={() => setHoveredCategory(index)}
              onHoverEnd={() => setHoveredCategory(null)}
              className="relative group"
            >
              {/* Glow effect on hover */}
              {hoveredCategory === index && (
                <motion.div
                  className="absolute -inset-2 rounded-2xl bg-emerald-500/10 blur-xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                />
              )}

              <div className="relative p-6 border border-border/50 bg-background/50 backdrop-blur-sm rounded-xl transition-all duration-300 group-hover:border-emerald-200 dark:group-hover:border-emerald-800/50">
                
                {/* Category Header with subtle animation */}
                <motion.div 
                  className="flex items-center gap-3 mb-6"
                  whileHover={{ x: 2 }}
                >
                  <motion.div 
                    className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                    whileHover={{ 
                      rotate: hoveredCategory === index ? 360 : 0,
                      scale: 1.1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {cat.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{cat.title}</h3>
                  </div>
                  
                  {/* Sparkle icon on hover */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: hoveredCategory === index ? 1 : 0,
                      scale: hoveredCategory === index ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                    className="ml-auto"
                  >
                    <Star className="w-4 h-4 text-emerald-500" />
                  </motion.div>
                </motion.div>

                {/* Skill List with staggered animations */}
                <ul className="space-y-3">
                  {cat.skills.map((skill, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + index * 0.1 }}
                      whileHover={{ 
                        x: 4,
                        backgroundColor: "rgba(16, 185, 129, 0.1)",
                        borderColor: "rgba(16, 185, 129, 0.3)"
                      }}
                      onHoverStart={() => setHoveredSkill(`${index}-${skill}`)}
                      onHoverEnd={() => setHoveredSkill(null)}
                      className="relative"
                    >
                      <motion.div
                        className="px-3 py-2.5 rounded-lg border border-transparent bg-muted/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-200"
                        whileHover={{ scale: 1.02 }}
                      >
                        <span className="text-sm font-medium text-foreground">
                          {skill}
                        </span>
                        
                        {/* Micro-dot indicator */}
                        <motion.div
                          className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-500"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ 
                            opacity: hoveredSkill === `${index}-${skill}` ? 1 : 0,
                            scale: hoveredSkill === `${index}-${skill}` ? 1 : 0
                          }}
                          transition={{ duration: 0.2 }}
                        />
                      </motion.div>
                    </motion.li>
                  ))}
                </ul>

                {/* Subtle bottom border animation */}
                <motion.div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-emerald-500/30 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ 
                    scaleX: hoveredCategory === index ? 1 : 0.5,
                    opacity: hoveredCategory === index ? 1 : 0.3
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Subtle footer note with animation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-8 border-t border-border/30"
        >
          <div className="text-center">
            <motion.p 
              className="text-sm text-muted-foreground inline-flex items-center gap-2"
              whileHover={{ gap: 3 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span>Always learning new technologies</span>
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-block"
              >
                ↻
              </motion.span>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}