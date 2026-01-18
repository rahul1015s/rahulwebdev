"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  MessageCircle,
  Mail,
  Linkedin,
  Github,
  Star,
} from "lucide-react";
import { ContactHaloSVG } from "../contact/ContactHaloSVG";
import { ContactButton } from "../contact/ContactButton";
import NewsletterForm from "../newsletter/NewsletterForm";

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-24 overflow-hidden bg-linear-to-b from-background via-card/20 to-background">
      {/* Subtle SVG halo (theme-based) */}
      <ContactHaloSVG />

      <div className="mx-auto max-w-4xl px-6 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center justify-center gap-2 text-primary mb-4">
            <MessageSquare className="h-5 w-5" />
            <span className="text-sm font-medium">Get in touch</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Let's <span className="text-primary">Connect</span>
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-lg">
            Whether you want to collaborate, hire, or just say hi —
            I usually respond within 24 hours.
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {/* WhatsApp – only button that is visually primary */}
          <ContactButton
            href="https://wa.me/919135271562"
            label="WhatsApp"
            icon={MessageCircle}
            variant="default"
          />

          <ContactButton
            href="mailto:hello@rahulwebdev.in"
            label="Email"
            icon={Mail}
          />

          <ContactButton
            href="https://www.linkedin.com/in/rahul1015s"
            label="LinkedIn"
            icon={Linkedin}
          />

          <ContactButton
            href="https://github.com/rahul1015s"
            label="GitHub"
            icon={Github}
          />
        </motion.div>

        {/* CTA + Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="
            mt-12 max-w-lg mx-auto
            rounded-2xl border border-primary/20
            bg-card/40 backdrop-blur-sm
            p-6 hover:border-primary/40 hover:bg-card/60 transition-all duration-300
          "
        >
          <p className="font-medium text-primary mb-3">
            💬 Prefer instant replies? WhatsApp works best.
          </p>

          <NewsletterForm variant="inline" location="portfolio" />
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-14 pt-8 border-t border-border text-sm text-muted-foreground"
        >
          <div className="flex items-center justify-center gap-2">
            <span>© {new Date().getFullYear()} Rahul Verma</span>
            <Star className="h-4 w-4 text-primary/40" />
            <span>Built with care</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
