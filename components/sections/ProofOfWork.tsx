"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Github, ExternalLink, Rocket, Sparkles, Zap, Users, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProofOfWork() {
  const items = [
    {
      title: "OPlus – Enterprise Workspace Platform (Built From Scratch)",
      description:
        "A full enterprise SaaS platform built solo — RBAC, AI chatbot, 40+ APIs, complex workflows, caching, PWA, image pipeline, admin dashboards, and OTP authentication.",
      tech: ["Next.js 15", "TypeScript", "MongoDB", "Tailwind", "Framer Motion", "PWA", "AI Chatbot"],
      image: "/projects/oplus.gif",
      live: "https://opluscowork.com/",
      github: null,
      highlights: ["Solo Built", "40+ APIs", "AI Integration", "Enterprise Grade"]
    },
    {
      title: "SDRF India – CSR Donation & Activity Platform",
      description:
        "Production-grade CSR & donation management platform with secure payments, admin dashboards, workflow automation, and full backend architecture.",
      tech: ["Next.js", "TypeScript", "MongoDB", "Tailwind", "Framer Motion", "Email System"],
      image: "/projects/sdrf.gif",
      live: "https://sdrfindia.org/",
      github: null,
      highlights: ["Secure Payments", "Production Deployed", "Workflow Automation", "Admin Dashboards"]
    },
  ];

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background accent */}
      <motion.div 
        className="absolute -right-40 top-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -z-10"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <div className="max-w-5xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 relative"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold inline-block"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Work Experience /{" "}
            <motion.span 
              className="text-emerald-600 inline-block relative"
              whileHover={{ scale: 1.05 }}
            >
              Proof of Work
              <motion.span 
                className="absolute -bottom-2 left-0 h-0.5 bg-emerald-600"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.span>
          </motion.h2>
          
          {/* Animated sparkles */}
          <motion.div 
            className="absolute -top-2 -right-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6 text-emerald-400/60" />
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {items.map((item, index) => {
            const [imgSrc, setImgSrc] = useState(item.image);
            const [imageLoaded, setImageLoaded] = useState(false);
            const [isHoveringLive, setIsHoveringLive] = useState(false);
            const [isHoveringImage, setIsHoveringImage] = useState(false);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: index * 0.15, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -5 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative"
              >
                {/* Hover glow effect */}
                <motion.div 
                  className="absolute -inset-1 bg-gradient-to-r from-emerald-500/10 to-transparent rounded-xl blur-md opacity-0"
                  animate={{ opacity: hoveredCard === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                <Card className="group overflow-hidden border bg-card/80 backdrop-blur-sm shadow-sm hover:shadow-2xl hover:border-emerald-400/60 transition-all duration-300 pt-0 relative z-10">
                  
                  {/* IMAGE CONTAINER WITH INTERACTIONS */}
                  <CardHeader className="p-0 relative">
                    {/* Shimmer overlay */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent z-10"
                      initial={{ x: "-100%" }}
                      animate={{ 
                        x: isHoveringImage ? "100%" : "-100%",
                      }}
                      transition={{ 
                        duration: isHoveringImage ? 0.8 : 0,
                        ease: "easeInOut" 
                      }}
                    />
                    
                    <div 
                      className="relative w-full h-56 overflow-hidden cursor-pointer"
                      onMouseEnter={() => setIsHoveringImage(true)}
                      onMouseLeave={() => setIsHoveringImage(false)}
                    >
                      {/* Loading skeleton */}
                      {!imageLoaded && (
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-br from-emerald-100/20 to-gray-200/20"
                          animate={{ opacity: [0.5, 0.8, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                      
                      <Image
                        src={imgSrc}
                        alt={item.title}
                        fill
                        className={`object-cover transition-all duration-700 ${
                          isHoveringImage ? "scale-110" : "scale-100"
                        } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                        onError={() => setImgSrc("/project-default.png")}
                        onLoad={() => setImageLoaded(true)}
                      />
                      
                      {/* Tech badges overlay */}
                      <motion.div 
                        className="absolute bottom-4 left-4 flex gap-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ 
                          y: isHoveringImage ? 0 : 20,
                          opacity: isHoveringImage ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-black/80 text-white backdrop-blur-sm">
                          Live
                        </span>
                        {item.highlights?.[0] && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-600/90 text-white backdrop-blur-sm">
                            {item.highlights[0]}
                          </span>
                        )}
                      </motion.div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 space-y-4">
                    {/* Title with icon animation */}
                    <motion.div 
                      className="flex items-center gap-2 mb-2"
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        animate={{ 
                          rotate: hoveredCard === index ? 360 : 0,
                          scale: hoveredCard === index ? 1.2 : 1
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <Rocket className="w-5 h-5 text-emerald-600" />
                      </motion.div>
                      <h3 className="text-xl font-semibold leading-tight">
                        {item.title}
                      </h3>
                    </motion.div>

                    {/* Description */}
                    <motion.p 
                      className="text-muted-foreground leading-relaxed"
                      initial={false}
                      animate={{ 
                        color: hoveredCard === index ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.description}
                    </motion.p>

                    {/* Tech stack with interactive tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {item.tech.map((t, i) => (
                        <motion.span
                          key={i}
                          className="px-3 py-1.5 text-sm rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default relative overflow-hidden group"
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.1 * i, duration: 0.3 }}
                          whileHover={{ 
                            scale: 1.1, 
                            backgroundColor: "rgb(220 252 231)",
                            boxShadow: "0 4px 12px -4px rgba(34, 197, 94, 0.3)"
                          }}
                          onHoverStart={() => setHoveredTech(t)}
                          onHoverEnd={() => setHoveredTech(null)}
                          whileTap={{ scale: 0.95 }}
                        >
                          {t}
                          {/* Tech tag shine effect */}
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                            initial={{ x: "-100%" }}
                            animate={{ 
                              x: hoveredTech === t ? "100%" : "-100%"
                            }}
                            transition={{ duration: 0.6 }}
                          />
                        </motion.span>
                      ))}
                    </div>

                    {/* Links with enhanced animations */}
                    <div className="flex gap-6 pt-4 border-t">
                      {item.live && (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onHoverStart={() => {
                            setIsHoveringLive(true);
                            setHoveredLink("live");
                          }}
                          onHoverEnd={() => {
                            setIsHoveringLive(false);
                            setHoveredLink(null);
                          }}
                        >
                          <Link
                            href={item.live}
                            target="_blank"
                            className="flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-900 relative group"
                          >
                            {/* Pulsing background effect */}
                            <motion.div 
                              className="absolute -inset-2 bg-emerald-100 rounded-lg opacity-0"
                              animate={{ opacity: isHoveringLive ? 0.5 : 0 }}
                              transition={{ duration: 0.2 }}
                            />
                            
                            <motion.div
                              animate={{ 
                                rotate: isHoveringLive ? 45 : 0,
                                scale: isHoveringLive ? 1.2 : 1
                              }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </motion.div>
                            <span className="relative">
                              Live Project
                              {/* Animated underline */}
                              <motion.span 
                                className="absolute -bottom-1 left-0 h-px bg-emerald-700"
                                initial={{ width: 0 }}
                                animate={{ width: isHoveringLive ? "100%" : 0 }}
                                transition={{ duration: 0.3 }}
                              />
                            </span>
                            
                            {/* Live indicator */}
                            <motion.div 
                              className="absolute -right-2 -top-1 w-2 h-2 rounded-full bg-emerald-500"
                              animate={{ 
                                scale: isHoveringLive ? [1, 1.5, 1] : 1,
                                boxShadow: isHoveringLive ? "0 0 8px 2px rgba(34, 197, 94, 0.5)" : "none"
                              }}
                              transition={{ duration: 0.8, repeat: isHoveringLive ? Infinity : 0 }}
                            />
                          </Link>
                        </motion.div>
                      )}

                      {item.github && (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onHoverStart={() => setHoveredLink("github")}
                          onHoverEnd={() => setHoveredLink(null)}
                        >
                          <Link
                            href={item.github}
                            target="_blank"
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                          >
                            <motion.div
                              animate={{ 
                                rotate: hoveredLink === "github" ? 360 : 0,
                                scale: hoveredLink === "github" ? 1.2 : 1
                              }}
                              transition={{ duration: 0.5 }}
                            >
                              <Github className="w-4 h-4" />
                            </motion.div>
                            GitHub
                          </Link>
                        </motion.div>
                      )}
                    </div>

                    {/* Additional indicators */}
                    <div className="flex items-center gap-4 pt-2 text-xs text-muted-foreground">
                      <motion.div 
                        className="flex items-center gap-1"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Zap className="w-3 h-3" />
                        <span>Production</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center gap-1"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Shield className="w-3 h-3" />
                        <span>Secure</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center gap-1"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Users className="w-3 h-3" />
                        <span>Scalable</span>
                      </motion.div>
                    </div>
                  </CardContent>

                  {/* Corner accent */}
                  <motion.div 
                    className="absolute top-4 right-4 w-2 h-2 bg-emerald-500 rounded-full"
                    animate={{ 
                      scale: hoveredCard === index ? [1, 1.5, 1] : 1,
                      opacity: hoveredCard === index ? [0.5, 1, 0.5] : 0.5
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* View more indicator */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer group"
            whileHover={{ scale: 1.05 }}
          >
            <span>View more projects</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}