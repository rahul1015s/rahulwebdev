"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* ---------- SVG BACKGROUND LAYER ---------- */}
      <div className="absolute inset-0 -z-10">
        {/* Dot Grid */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.15] dark:opacity-[0.25]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="dot-grid"
              x="0"
              y="0"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#dot-grid)"
            className="text-muted-foreground"
          />
        </svg>

        {/* Ambient Glow */}
        <div className="absolute top-24 left-1/3 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* ---------- CONTENT ---------- */}
      <div className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="
            inline-flex items-center gap-2
            rounded-full border border-border
            bg-card/70 px-4 py-1.5
            text-sm text-muted-foreground
            backdrop-blur
          "
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Available for opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-6 text-4xl font-bold leading-tight md:text-6xl"
        >
          Hi, I’m{" "}
          <span className="relative text-primary">
            Rahul Verma
          </span>
        </motion.h1>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-xl text-muted-foreground md:text-2xl"
        >
          Full Stack Developer
        </motion.p>

        {/* Location */}
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          India (IST)
        </div>

        {/* Summary */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
        >
          I build scalable, high-performance web applications with{" "}
          <span className="font-medium text-foreground">
            React, Next.js, Node.js, and MongoDB
          </span>
          , focusing on clean UI and real-world problem solving.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Button asChild className="gap-2">
            <a href="mailto:hello@rahulwebdev.in">
              <Mail className="h-4 w-4" />
              Email
            </a>
          </Button>

          <Button asChild variant="outline" className="gap-2">
            <a href="https://github.com/rahul1015s" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </Button>

          <Button asChild variant="outline" className="gap-2">
            <a href="https://linkedin.com/in/rahul1015s" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </Button>
        </motion.div>

      </div>

      {/* ---------- BOTTOM SVG DIVIDER ---------- */}
      <svg
        viewBox="0 0 1440 80"
        className="absolute bottom-0 left-0 w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0,40 C240,80 480,0 720,20 960,40 1200,60 1440,40 L1440,0 L0,0 Z"
          fill="currentColor"
          className="text-background"
        />
      </svg>
    </section>
  );
}
