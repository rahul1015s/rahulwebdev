"use client";

import {
  Github,
  Linkedin,
  Mail,
  MessageCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

/* ---------------------------------------------
   Visitor Counter (local)
--------------------------------------------- */
function useVisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const key = "portfolio_visits";
    let visits = Number(localStorage.getItem(key) || 0);
    visits += 1;
    localStorage.setItem(key, visits.toString());
    setCount(visits);
  }, []);

  return count;
}

/* ---------------------------------------------
   Data
--------------------------------------------- */
const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "/blog" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "#contact" },
];

const currentYear = new Date().getFullYear();

/* ---------------------------------------------
   Component
--------------------------------------------- */
export default function Footer() {
  const visitors = useVisitorCount();

  return (
    <footer id="contact" className="mt-20 border-t border-border/40 pt-14 pb-8">
      <div className="max-w-5xl mx-auto px-6">

        {/* 🔥 CTA */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Let’s build something{" "}
            <span className="text-primary">great</span>
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Open to freelance, internships, and full-time roles.
          </p>

          <a
            href="https://wa.me/919135271562"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2 mt-5
              px-5 py-2.5 rounded-lg
              bg-primary text-primary-foreground
              text-sm font-medium
              hover:opacity-90 transition
            "
          >
            <MessageCircle className="h-4 w-4" />
            Chat on WhatsApp
          </a>

          <div className="mt-2 text-xs text-muted-foreground flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Usually replies within a few hours
          </div>
        </div>

        {/* 🔥 MIDDLE */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* NAVIGATE */}
          <div>
            <p className="text-xs tracking-wider text-muted-foreground mb-4">
              NAVIGATE
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="hover:text-foreground transition"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <p className="mt-5 text-sm text-muted-foreground max-w-sm">
              Designed and built with a focus on simplicity, performance,
              and real-world usability.
            </p>
          </div>

          {/* CONNECT */}
          <div>
            <p className="text-xs tracking-wider text-muted-foreground mb-4">
              CONNECT
            </p>

            {/* Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/rahul1015s"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon"
              >
                <Github className="h-4 w-4" />
              </a>

              <a
                href="https://linkedin.com/in/rahul1015s"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon"
              >
                <Linkedin className="h-4 w-4" />
              </a>

              <a
                href="mailto:hello@rahulwebdev.in"
                className="footer-icon"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919135271562"
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-4 inline-flex items-center gap-2
                text-sm text-muted-foreground
                hover:text-primary transition
              "
            >
              <MessageCircle className="h-4 w-4" />
              +91 91352 71562
            </a>
          </div>
        </div>

        {/* 🔥 BOTTOM */}
        <div className="mt-10 pt-5 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">

          <p>
            © {currentYear} Rahul Verma. All rights reserved.
          </p>

          <p suppressHydrationWarning>
            {visitors
              ? `You’re visitor #${visitors.toLocaleString()}`
              : "Counting visitors..."}
          </p>
        </div>
      </div>
    </footer>
  );
}
