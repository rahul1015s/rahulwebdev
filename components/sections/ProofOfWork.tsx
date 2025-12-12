"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Github, ExternalLink, Rocket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProofOfWork() {
  const items = [
    {
      title: "OPlus – Enterprise Workspace Platform (Built From Scratch)",
      description:
        "A full enterprise SaaS platform built solo — RBAC, AI chatbot, 40+ APIs, complex workflows, caching, PWA, image pipeline, admin dashboards, and OTP authentication.",
      tech: [
        "Next.js 15", "TypeScript", "MongoDB", "Tailwind",
        "Framer Motion", "PWA", "AI Chatbot"
      ],
      image: "/projects/oplus.gif",   // ADD GIF/IMAGE HERE
      live: "https://opluscowork.com/",
      github: null,
    },
    {
      title: "SDRF India – CSR Donation & Activity Platform",
      description:
        "Production-grade CSR & donation management platform with secure payments, admin dashboards, workflow automation, and full backend architecture.",
      tech: [
        "Next.js", "TypeScript", "MongoDB", "Tailwind",
        "Framer Motion", "Email System"
      ],
      image: "/projects/sdrf.gif",  // ADD GIF/IMAGE HERE
      live: "https://sdrfindia.org/",
      github: null,
    },
    // {
    //   title: "Finance Tracker - Full Stack PWA",
    //   description:
    //     "A production-ready expense PWA with OCR scanning, analytics, offline mode, and custom dashboards.",
    //   tech: ["Next.js", "TypeScript", "Tailwind", "Supabase", "OCR", "PWA"],
    //   image: "/projects/finance-tracker.png",
    //   live: "https://your-live-link.com",
    //   github: "https://github.com/rahul1015s",
    // },
    // {
    //   title: "Sagar Photography – MERN Client Project",
    //   description:
    //     "A photography booking platform with admin panel, Cloudinary uploads, galleries, and WhatsApp automation.",
    //   tech: ["React", "Node.js", "Express", "MongoDB", "Cloudinary"],
    //   image: "/projects/sagar.png",
    //   live: "https://your-live-link.com",
    //   github: "https://github.com/rahul1015s",
    // },
  ];

  return (
    <section id="experience" className="py-24">
      <div className="max-w-5xl mx-auto px-6">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-12"
        >
          Work Experience / <span className="text-emerald-600">Proof of Work</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <Card className="group overflow-hidden border bg-card/60 backdrop-blur shadow-sm hover:shadow-xl hover:border-emerald-300/40 transition">

                {/* IMAGE / GIF HEADER */}
                <CardHeader className="p-0">
                  <div className="relative w-full h-56 overflow-hidden">
                    <Image
                      src={item.image || "/default-blog.png"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </CardHeader>

                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-emerald-600" />
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.tech.map((t, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm rounded-full 
                        bg-emerald-50 text-emerald-700 border border-emerald-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-6 pt-3">
                    {item.live && (
                      <Link
                        href={item.live}
                        target="_blank"
                        className="flex items-center gap-2 text-sm text-emerald-700 hover:text-emerald-900"
                      >
                        <ExternalLink className="w-4 h-4" /> Live
                      </Link>
                    )}

                    {item.github && (
                      <Link
                        href={item.github}
                        target="_blank"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                      >
                        <Github className="w-4 h-4" /> GitHub
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
