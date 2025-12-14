"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Github, ExternalLink, Code2, Sparkles, Zap, Eye, Star, ArrowUpRight, FolderOpen, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProjectsSection() {
  const projects = [
    {
      title: "Gen Notes – Rich Text Note App",
      description:
        "A full-featured note-taking platform with Tiptap rich editor, image uploads, formatting tools, tables, and HTML preview. Includes clean UI, responsive layout, and MongoDB backend.",
      tech: ["React.js", "Tailwind", "Tiptap", "MongoDB"],
      live: "https://gennotes.vercel.app/",
      github: "https://github.com/rahul1015s/Gen-Notes",
      features: ["Rich Text Editor", "Image Upload", "Real-time Preview", "MongoDB Backend"],
      status: "Live"
    },
    {
      title: "AtoZ Market - Modern Grocery Store App",
      description:
        "A complete e-commerce grocery platform with category-based browsing, cart system, responsive UI, product filtering, and clean scalable code architecture.",
      tech: ["React.js", "Tailwind", "Tailwind CSS", "Fake Store API"],
      live: "https://atoz-market.vercel.app/",
      github: "https://github.com/rahul1015s/AtoZ-market",
      features: ["E-commerce", "Cart System", "Product Filtering", "Responsive UI"],
      status: "Live"
    },
  ];

  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<{index: number, type: string} | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean[]>(projects.map(() => false));

  const handleImageLoad = (index: number) => {
    setImageLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute -left-40 top-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10"
        animate={{ 
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Section Header with Animation */}
        <div className="mb-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-emerald-400" />
            </motion.div>
            <span className="text-sm font-medium text-emerald-600">Showcase</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold"
          >
            Featured{" "}
            <motion.span 
              className="text-emerald-600 inline-block relative"
              whileHover={{ scale: 1.05 }}
            >
              Projects
              <motion.span 
                className="absolute -bottom-2 left-0 h-0.5 bg-emerald-600"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-muted-foreground mt-2 max-w-2xl"
          >
            Interactive projects showcasing modern web development techniques and clean UI/UX
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, index) => {
            const [isHoveringImage, setIsHoveringImage] = useState(false);
            const [isHoveringTitle, setIsHoveringTitle] = useState(false);
            const [isHoveringLive, setIsHoveringLive] = useState(false);
            const [isHoveringGithub, setIsHoveringGithub] = useState(false);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -8 }}
                onHoverStart={() => setHoveredProject(index)}
                onHoverEnd={() => setHoveredProject(null)}
                className="relative group"
              >
                {/* Floating tech badge */}
                <motion.div 
                  className="absolute -top-3 -right-3 z-20"
                  animate={{ 
                    y: hoveredProject === index ? [-3, 3, -3] : 0,
                    rotate: hoveredProject === index ? [0, 5, -5, 0] : 0
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-medium rounded-full shadow-lg flex items-center gap-1.5">
                    <Zap className="w-3 h-3" />
                    {project.status}
                  </div>
                </motion.div>

                {/* Hover glow effect */}
                <motion.div 
                  className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-transparent to-transparent rounded-2xl blur-xl opacity-0"
                  animate={{ opacity: hoveredProject === index ? 0.5 : 0 }}
                  transition={{ duration: 0.4 }}
                />

                <Card className="overflow-hidden border bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 relative z-10 h-full pt-0">
                  {/* IMAGE SECTION */}
                  <CardHeader className="p-0 relative">
                    {/* Loading shimmer */}
                    {!imageLoaded[index] && (
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-emerald-100/20 via-gray-200/30 to-emerald-100/20 z-10"
                        animate={{ 
                          x: ["-100%", "100%"],
                        }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        style={{ 
                          backgroundSize: "200% 100%",
                          backgroundImage: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)"
                        }}
                      />
                    )}

                    {/* Image overlay effects */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10 opacity-0"
                      animate={{ opacity: isHoveringImage ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    <div 
                      className="relative w-full h-64 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center"
                      onMouseEnter={() => setIsHoveringImage(true)}
                      onMouseLeave={() => setIsHoveringImage(false)}
                    >
                      <div className="text-center p-6">
                        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{project.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                      </div>
                    </div>

                    {/* View overlay button */}
                    <motion.div 
                      className="absolute top-4 right-4"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: isHoveringImage ? 1 : 0,
                        scale: isHoveringImage ? 1 : 0.8
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.button 
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye className="w-4 h-4 text-emerald-700" />
                      </motion.button>
                    </motion.div>

                    {/* Tech preview on hover */}
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: isHoveringImage ? 1 : 0,
                        y: isHoveringImage ? 0 : 20
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 3).map((tech, i) => (
                          <span 
                            key={i}
                            className="px-2 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm text-white rounded"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="px-2 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm text-white rounded">
                            +{project.tech.length - 3}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  </CardHeader>

                  <CardContent className="p-6 space-y-4">
                    {/* TITLE SECTION */}
                    <motion.div
                      onMouseEnter={() => setIsHoveringTitle(true)}
                      onMouseLeave={() => setIsHoveringTitle(false)}
                      className="cursor-default"
                    >
                      <motion.div 
                        className="flex items-center gap-2 mb-2"
                        whileHover={{ x: 5 }}
                      >
                        <motion.div
                          animate={{ 
                            rotate: isHoveringTitle ? 360 : 0,
                            scale: isHoveringTitle ? 1.2 : 1
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <FolderOpen className="w-5 h-5 text-emerald-600" />
                        </motion.div>
                        <h3 className="text-xl font-semibold">
                          {project.title}
                        </h3>
                      </motion.div>

                      {/* Animated underline */}
                      <motion.div 
                        className="h-0.5 bg-gradient-to-r from-emerald-500/50 to-transparent"
                        initial={{ width: 0 }}
                        animate={{ width: isHoveringTitle ? "100%" : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>

                    {/* DESCRIPTION */}
                    <motion.p 
                      className="text-muted-foreground leading-relaxed"
                      initial={false}
                      animate={{ 
                        color: hoveredProject === index ? "hsl(var(--foreground)/0.9)" : "hsl(var(--muted-foreground))"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.description}
                    </motion.p>

                    {/* FEATURES TAGS */}
                    {project.features && (
                      <motion.div 
                        className="flex flex-wrap gap-2 pt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {project.features.map((feature, i) => (
                          <motion.span
                            key={i}
                            className="px-2.5 py-1 text-xs bg-emerald-100/80 text-emerald-800 rounded-full flex items-center gap-1"
                            whileHover={{ scale: 1.05, backgroundColor: "rgb(220 252 231)" }}
                            transition={{ duration: 0.2 }}
                          >
                            <Star className="w-3 h-3" />
                            {feature}
                          </motion.span>
                        ))}
                      </motion.div>
                    )}

                    {/* TECH STACK */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tech.map((tech, i) => (
                        <motion.span
                          key={i}
                          className="px-3 py-1.5 text-sm bg-emerald-50 text-emerald-700 rounded-full cursor-default relative overflow-hidden group"
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.05 * i, duration: 0.3 }}
                          whileHover={{ 
                            scale: 1.1, 
                            backgroundColor: "rgb(220 252 231)",
                            boxShadow: "0 4px 12px -4px rgba(34, 197, 94, 0.3)"
                          }}
                          onHoverStart={() => setHoveredTech(tech)}
                          onHoverEnd={() => setHoveredTech(null)}
                          whileTap={{ scale: 0.95 }}
                        >
                          {tech}
                          {/* Shine effect */}
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                            initial={{ x: "-100%" }}
                            animate={{ 
                              x: hoveredTech === tech ? "100%" : "-100%"
                            }}
                            transition={{ duration: 0.6 }}
                          />
                        </motion.span>
                      ))}
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex items-center gap-4 pt-4 border-t mt-4">
                      {/* Live Demo Button */}
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onHoverStart={() => {
                          setIsHoveringLive(true);
                          setHoveredLink({index, type: 'live'});
                        }}
                        onHoverEnd={() => {
                          setIsHoveringLive(false);
                          setHoveredLink(null);
                        }}
                      >
                        <Link
                          href={project.live}
                          target="_blank"
                          className="flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-900 px-4 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors relative group"
                        >
                          {/* Pulsing effect */}
                          <motion.div 
                            className="absolute inset-0 bg-emerald-100 rounded-lg"
                            animate={{ scale: isHoveringLive ? [1, 1.1, 1] : 1 }}
                            transition={{ duration: 1, repeat: isHoveringLive ? Infinity : 0 }}
                          />
                          
                          <motion.div
                            animate={{ 
                              rotate: isHoveringLive ? 45 : 0,
                              scale: isHoveringLive ? 1.2 : 1
                            }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Play className="w-4 h-4" />
                          </motion.div>
                          <span className="relative z-10">Live Demo</span>
                          
                          {/* Arrow indicator */}
                          <motion.div
                            className="relative z-10"
                            animate={{ x: isHoveringLive ? [0, 3, 0] : 0 }}
                            transition={{ duration: 0.5, repeat: isHoveringLive ? Infinity : 0 }}
                          >
                            <ArrowUpRight className="w-3 h-3 ml-1" />
                          </motion.div>
                        </Link>
                      </motion.div>

                      {/* GitHub Button */}
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onHoverStart={() => {
                          setIsHoveringGithub(true);
                          setHoveredLink({index, type: 'github'});
                        }}
                        onHoverEnd={() => {
                          setIsHoveringGithub(false);
                          setHoveredLink(null);
                        }}
                      >
                        <Link
                          href={project.github}
                          target="_blank"
                          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors relative group"
                        >
                          {/* Rotating effect */}
                          <motion.div
                            animate={{ 
                              rotate: isHoveringGithub ? 360 : 0,
                              scale: isHoveringGithub ? 1.2 : 1
                            }}
                            transition={{ duration: 0.6 }}
                          >
                            <Github className="w-4 h-4" />
                          </motion.div>
                          <span className="relative z-10">Code</span>
                          
                          {/* Star indicator */}
                          <motion.div
                            animate={{ 
                              scale: isHoveringGithub ? [1, 1.3, 1] : 1,
                              rotate: isHoveringGithub ? [0, 10, -10, 0] : 0
                            }}
                            transition={{ duration: 0.8 }}
                            className="ml-1"
                          >
                            <Star className="w-3 h-3 text-yellow-500" />
                          </motion.div>
                        </Link>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* View More Projects */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 group cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-medium"
              whileHover={{ 
                backgroundColor: "rgb(220 252 231)",
                boxShadow: "0 8px 25px -8px rgba(34, 197, 94, 0.4)"
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="flex items-center gap-2">
                View more on GitHub
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}