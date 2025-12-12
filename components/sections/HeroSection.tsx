"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* --- Background Glow (Dark Mode Friendly) --- */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/3 w-72 h-72 
          bg-cyan-500/20 dark:bg-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute top-60 right-1/4 w-72 h-72 
          bg-emerald-400/20 dark:bg-emerald-300/10 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 
            bg-card/70 backdrop-blur-md border rounded-full text-sm 
            text-muted-foreground shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Available for Opportunities
        </motion.div>

        {/* Name + Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-6 text-4xl md:text-6xl font-bold text-foreground leading-tight"
        >
          Hi, I'm <span className="text-primary">Rahul Verma</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-3 text-xl md:text-2xl font-medium text-muted-foreground"
        >
          Full Stack Developer
        </motion.p>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="mt-2 flex items-center gap-1.5 text-muted-foreground"
        >
          <MapPin size={18} className="text-primary" />
          India (IST)
        </motion.p>

        {/* Summary */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="mt-6 max-w-xl text-muted-foreground leading-relaxed text-lg"
        >
          I build scalable, modern web applications using React, Next.js, Node.js,
          and MongoDB focusing on clean UI, performance, and real-world problem solving.
        </motion.p>

        {/* Featured Work */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4"
        >
          <Link
            href="#projects"
            className="inline-flex items-center gap-2 text-sm font-medium 
              text-primary hover:text-primary/80"
          >
            ⭐ Featured Work – Oplus Cowork
            <ExternalLink size={15} />
          </Link>
        </motion.div>

        {/* Contact Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Button asChild className="gap-2">
            <Link href="mailto:rahulvjob@gmail.com">
              <Mail size={18} /> Email
            </Link>
          </Button>

          <Button asChild variant="outline" className="gap-2">
            <Link href="https://github.com/rahul1015s" target="_blank">
              <Github size={18} /> GitHub
            </Link>
          </Button>

          <Button asChild variant="outline" className="gap-2">
            <Link href="https://linkedin.com/in/rahulverma" target="_blank">
              <Linkedin size={18} /> LinkedIn
            </Link>
          </Button>

          <Button asChild variant="secondary" className="gap-2">
            <Link href="/resume.pdf" target="_blank">
              <ExternalLink size={18} /> Resume
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
