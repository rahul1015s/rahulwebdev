"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function HeroSection() {
  const [isHoveringBadge, setIsHoveringBadge] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [isHoveringFeatured, setIsHoveringFeatured] = useState(false);

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
        
        {/* Top Badge with Micro-interaction */}
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 30px -10px rgba(34, 197, 94, 0.3)"
          }}
          whileTap={{ scale: 0.98 }}
          onHoverStart={() => setIsHoveringBadge(true)}
          onHoverEnd={() => setIsHoveringBadge(false)}
          transition={{ 
            duration: 0.6,
            type: "spring",
            stiffness: 200
          }}
          className="inline-flex items-center gap-2 px-4 py-1.5 
            bg-card/70 backdrop-blur-md border rounded-full text-sm 
            text-muted-foreground shadow-sm cursor-default relative overflow-hidden group"
        >
          {/* Pulsing dot with enhanced animation */}
          <motion.span 
            className="w-2 h-2 rounded-full bg-emerald-500 relative z-10"
            animate={{ 
              scale: isHoveringBadge ? [1, 1.3, 1] : [1, 1.2, 1],
              boxShadow: isHoveringBadge 
                ? "0 0 10px 2px rgba(34, 197, 94, 0.7)" 
                : "0 0 0px 0px rgba(34, 197, 94, 0)"
            }}
            transition={{ 
              duration: isHoveringBadge ? 0.8 : 1.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          <span className="relative z-10">Available for Opportunities</span>
          
          {/* Hover glow effect */}
          <motion.div 
            className="absolute inset-0 bg-linear-to-r from-emerald-500/5 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: isHoveringBadge ? "100%" : "-100%" }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>

        {/* Name with character animation */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-6 text-4xl md:text-6xl font-bold text-foreground leading-tight"
        >
          Hi, I'm{" "}
          <motion.span 
            className="text-primary inline-block relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Rahul Verma
            {/* Underline effect on hover */}
            <motion.span 
              className="absolute -bottom-1 left-0 h-0.5 bg-primary"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.span>
        </motion.h1>

        {/* Title with typing effect */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.3, 
            duration: 0.7,
            ease: "easeOut"
          }}
          className="mt-3 text-xl md:text-2xl font-medium text-muted-foreground"
        >
          Full Stack Developer
        </motion.p>

        {/* Location with icon wiggle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="mt-2 flex items-center gap-1.5 text-muted-foreground group"
        >
          <motion.span
            whileHover={{ 
              rotate: [0, -10, 10, -10, 0],
              transition: { duration: 0.5 }
            }}
          >
            <MapPin size={18} className="text-primary" />
          </motion.span>
          India (IST)
        </motion.p>

        {/* Summary with staggered text reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="mt-6 max-w-xl text-muted-foreground leading-relaxed text-lg"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="block"
          >
            I build scalable, modern web applications using{" "}
            <motion.span 
              className="font-semibold text-foreground/90"
              whileHover={{ color: "#3b82f6" }}
              transition={{ duration: 0.2 }}
            >
              React
            </motion.span>
            ,{" "}
            <motion.span 
              className="font-semibold text-foreground/90"
              whileHover={{ color: "#000000" }}
              transition={{ duration: 0.2 }}
            >
              Next.js
            </motion.span>
            ,{" "}
            <motion.span 
              className="font-semibold text-foreground/90"
              whileHover={{ color: "#68a063" }}
              transition={{ duration: 0.2 }}
            >
              Node.js
            </motion.span>
            , and{" "}
            <motion.span 
              className="font-semibold text-foreground/90"
              whileHover={{ color: "#4db33d" }}
              transition={{ duration: 0.2 }}
            >
              MongoDB
            </motion.span>{" "}
            focusing on clean UI, performance, and real-world problem solving.
          </motion.span>
        </motion.div>

        {/* Featured Work with arrow animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setIsHoveringFeatured(true)}
            onHoverEnd={() => setIsHoveringFeatured(false)}
          >
            <Link
              href="https://opluscowork.com/" target="_blank"
              className="inline-flex items-center gap-2 text-sm font-medium 
                text-primary hover:text-primary/80 group"
            >
              ⭐ Featured Work – Oplus Cowork
              <motion.span
                animate={{ 
                  x: isHoveringFeatured ? 5 : 0,
                  rotate: isHoveringFeatured ? 45 : 0
                }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ExternalLink size={15} />
              </motion.span>
              
              {/* Animated underline */}
              <motion.span 
                className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full bg-primary/50"
                initial={false}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* Contact Buttons with enhanced interactions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          {/* Email Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setHoveredButton("email")}
            onHoverEnd={() => setHoveredButton(null)}
          >
            <Button asChild className="gap-2 relative overflow-hidden group">
              <Link href="mailto:rahulvjob@gmail.com">
                <motion.div
                  animate={{ 
                    scale: hoveredButton === "email" ? 1.2 : 1,
                    rotate: hoveredButton === "email" ? [0, 10, -10, 0] : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Mail size={18} />
                </motion.div>
                Email
                {/* Button shine effect */}
                <motion.div 
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: hoveredButton === "email" ? "100%" : "-100%" }}
                  transition={{ duration: 0.6 }}
                />
              </Link>
            </Button>
          </motion.div>

          {/* GitHub Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setHoveredButton("github")}
            onHoverEnd={() => setHoveredButton(null)}
          >
            <Button asChild variant="outline" className="gap-2 relative overflow-hidden group">
              <Link href="https://github.com/rahul1015s" target="_blank">
                <motion.div
                  animate={{ 
                    scale: hoveredButton === "github" ? 1.2 : 1,
                    rotate: hoveredButton === "github" ? [0, 360] : 0
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Github size={18} />
                </motion.div>
                GitHub
                {/* Outline glow effect */}
                <motion.div 
                  className="absolute -inset-0.5 rounded-md border border-primary/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredButton === "github" ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                />
              </Link>
            </Button>
          </motion.div>

          {/* LinkedIn Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setHoveredButton("linkedin")}
            onHoverEnd={() => setHoveredButton(null)}
          >
            <Button asChild variant="outline" className="gap-2">
              <Link href="https://linkedin.com/in/rahul1015s" target="_blank">
                <motion.div
                  animate={{ 
                    scale: hoveredButton === "linkedin" ? 1.2 : 1
                  }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Linkedin size={18} />
                </motion.div>
                LinkedIn
              </Link>
            </Button>
          </motion.div>

          {/* Resume Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setHoveredButton("resume")}
            onHoverEnd={() => setHoveredButton(null)}
          >
            <Button asChild variant="secondary" className="gap-2">
              <Link href="/resume.pdf" target="_blank">
                <motion.div
                  animate={{ 
                    x: hoveredButton === "resume" ? [0, 3, 0] : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ExternalLink size={18} />
                </motion.div>
                Resume
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}