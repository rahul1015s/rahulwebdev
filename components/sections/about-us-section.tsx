"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// ============================
// 📌 Data Managed at Top
// ============================
const aboutData = {
  title: "Hello, I'm Rahul Verma",
  subtitle: "About",
  description:
    "I'm a self-taught web developer who transitioned from Art History into software development. While pursuing my MCA, I build clean, modern, and accessible web applications with a strong focus on performance and smooth user experience.",

  journey: {
    title: "My Journey",
    text: `I started my academic path in Art History, which sharpened my eye for composition, aesthetics, and visual storytelling. Over time, I taught myself web development—beginning with HTML and CSS, then moving into JavaScript, React, and full-stack development. Today, I'm pursuing an MCA to strengthen my computer science fundamentals while building real-world applications.`,
    driveTitle: "What drives me",
    driveText:
      "I enjoy creating interfaces that are beautiful, minimal, and practical. Clean design, accessibility, and smooth interactions shape everything I build.",
  },

  specialize: {
    title: "What I specialize in",
    skills: [
      "React — component-driven architecture & modern UI",
      "Next.js — App Router, SSR/SSG, and performance optimization",
      "MERN Stack — Node.js, Express, MongoDB & React",
      "UI/UX — semantic HTML, accessibility & smooth interactions",
    ],
  },

  bottom: {
    title: "What I build",
    text: "I build production-ready web applications — from responsive websites to dashboards and PWAs. My focus is performance, accessibility, clean code, and real-world usability.",
  },
};

export default function AboutUsSection() {
  return (
    <section id="about" className="bg-background px-4 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <Badge className="mb-4">{aboutData.subtitle}</Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            {aboutData.title}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            {aboutData.description}
          </p>
        </motion.div>

        {/* Two Column Cards */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid gap-6 md:grid-cols-2 items-start"
        >
          {/* Journey Card */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-2">
              {aboutData.journey.title}
            </h3>
            <p className="text-muted-foreground mb-4">
              {aboutData.journey.text}
            </p>
            <h4 className="text-sm font-medium mb-1">
              {aboutData.journey.driveTitle}
            </h4>
            <p className="text-sm text-muted-foreground">
              {aboutData.journey.driveText}
            </p>
          </Card>

          {/* Specialize Card */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-2">
              {aboutData.specialize.title}
            </h3>

            <ul className="mb-4 list-inside list-disc space-y-2 text-muted-foreground">
              {aboutData.specialize.skills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>

            <div className="flex gap-3">
              <Button asChild>
                <a href="#projects">See projects</a>
              </Button>

              <Button variant="ghost" asChild>
                <a href="#contact">Get in touch</a>
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <h3 className="mb-4 text-2xl font-bold">
            {aboutData.bottom.title}
          </h3>
          <p className="mx-auto max-w-3xl text-muted-foreground">
            {aboutData.bottom.text}
          </p>
        </motion.div>
      </div>
    </section>
  );
}