"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Let’s <span className="text-emerald-600">Connect</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12"
        >
          Whether you’re looking to hire, collaborate, or just want to say hi 
          I’d love to hear from you. I usually respond within 24 hours.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6"
        >
          {/* Email */}
          <Button asChild size="lg" className="gap-2">
            <Link href="mailto:rahulwebjs@gmail.com">
              <Mail size={18} /> Email Me
            </Link>
          </Button>

          {/* LinkedIn */}
          <Button
            asChild
            size="lg"
            variant="outline"
            className="gap-2"
          >
            <Link href="https://www.linkedin.com/in/rahul1015s" target="_blank">
              <Linkedin size={18} /> LinkedIn
            </Link>
          </Button>

          {/* GitHub */}
          <Button
            asChild
            size="lg"
            variant="outline"
            className="gap-2"
          >
            <Link href="https://github.com/rahul1015s" target="_blank">
              <Github size={18} /> GitHub
            </Link>
          </Button>
        </motion.div>

        {/* Optional footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-muted-foreground text-sm mt-10"
        >
          © {new Date().getFullYear()} Rahul Verma. All rights reserved.
        </motion.p>
      </div>
    </section>
  );
}
