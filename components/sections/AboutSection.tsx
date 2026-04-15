"use client";

import { motion } from "framer-motion";
import { ProfileCard } from "@/components/cards/ProfileCard";

/* ---------------------------------------------
   Tech Stack Icons
--------------------------------------------- */
const stack = [
  { name: "React", icon: "devicon-react-original" },
  { name: "Next.js", icon: "devicon-nextjs-plain" },
  { name: "Node.js", icon: "devicon-nodejs-plain" },
  { name: "MongoDB", icon: "devicon-mongodb-plain" },
];

/* ---------------------------------------------
   About Section
--------------------------------------------- */
export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* Profile */}
        <ProfileCard image="/rahul.jpg" label="Profile" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <span className="text-xs uppercase tracking-wider text-primary">
            About
          </span>

          <h2 className="mt-2 text-3xl md:text-4xl font-semibold">
            Rahul Verma
          </h2>

          {/* Role */}
          <p className="mt-2 text-sm text-muted-foreground">
            Full Stack Developer · MCA Student · India
          </p>

          {/* Bio */}
          <p className="mt-5 text-muted-foreground leading-relaxed">
            I’m a self-taught developer who transitioned from an Art History
            background into software development. That shift shaped how I build —
            combining structure with creativity and strong attention to detail.
          </p>

          <p className="mt-4 text-muted-foreground leading-relaxed">
            I focus on building scalable, production-ready applications with clean UI
            and maintainable architecture. Most of my work revolves around modern
            JavaScript stacks and real-world problem solving.
          </p>

          {/* Tech Stack */}
          <div className="mt-6 flex flex-wrap gap-4">
            {stack.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-2 text-xs text-muted-foreground/70 hover:text-foreground transition"
              >
                <i className={`${tech.icon} text-base`} />
                {tech.name}
              </div>
            ))}
          </div>

          {/* Footer line */}
          <p className="mt-6 text-sm text-muted-foreground">
            Currently focused on building impactful products and growing with strong teams.
          </p>
        </motion.div>
      </div>
    </section>
  );
}