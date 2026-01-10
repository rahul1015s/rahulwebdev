"use client";

import { motion } from "framer-motion";
import { ProfileCard } from "@/components/cards/ProfileCard";

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

          <p className="mt-4 text-muted-foreground leading-relaxed">
            I’m a self-taught Full Stack Developer currently pursuing an MCA
            (Master of Computer Applications). I transitioned from an Art History
            background into software development — a shift that strengthened my
            creativity, attention to detail, and system thinking.
          </p>

          <p className="mt-4 text-muted-foreground leading-relaxed">
            I specialize in building scalable, production-ready applications
            using React, Next.js, Node.js, and MongoDB, with a strong focus on
            clean UI and maintainable architecture.
          </p>

          <p className="mt-4 text-muted-foreground leading-relaxed">
            I’m constantly learning, shipping projects, and collaborating on
            meaningful work, aiming to grow within teams building impactful
            software.
          </p>

          {/* Meta */}
          <div className="mt-6 flex items-center gap-6 text-xs text-muted-foreground">
            <span>Full Stack</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>MCA Student</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>India</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
