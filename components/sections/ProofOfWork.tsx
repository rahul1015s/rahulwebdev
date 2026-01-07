"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Shield,
  Zap,
  Users,
  Code,
  Globe,
  Wrench,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Cpu,
  Database,
  Lock,
  Server,
  Github,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useCallback, memo, useEffect, useRef } from "react";

type ProjectStatus = "live" | "development";

type Project = {
  title: string;
  description: string;
  image: string;
  fallbackImage?: string;
  tech: string[];
  live: string;
  status: ProjectStatus;
  features?: string[];
};

/* ------------------------------------------------------------------ */
/* Data */
/* ------------------------------------------------------------------ */

const projects: Project[] = [
  {
    title: "OPlus – Enterprise Workspace Platform",
    description:
      "Solo-built enterprise SaaS with RBAC, AI chatbot, 40+ APIs, complex workflows, and PWA support.",
    image: "/projects/oplus.gif",
    fallbackImage: "/projects/oplus.png",
    tech: ["Next.js", "TypeScript", "MongoDB", "PWA", "AI"],
    live: "https://opluscowork.com/",
    status: "live",
    features: ["40+ APIs", "AI Chatbot", "PWA", "Real-time"],
  },
  {
    title: "SDRF India – CSR & Donation Platform",
    description:
      "Production-grade CSR and donation platform with secure payments, admin workflows, and email infrastructure.",
    image: "/projects/sdrf.gif",
    fallbackImage: "/projects/sdrf.png",
    tech: ["Next.js", "MongoDB", "Payments", "Email"],
    live: "https://sdrfindia.org/",
    status: "development",
    features: ["Secure Payments", "Admin Dashboard", "Scalable"],
  },
];

/* ------------------------------------------------------------------ */
/* Memoized SVG Components */
/* ------------------------------------------------------------------ */

const StatusBadgeSVG = memo(({ isLive, isHovering }: { isLive: boolean; isHovering: boolean }) => {
  const color = isLive ? "#10b981" : "#f59e0b";
  
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" className="relative">
      {/* Outer ring */}
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeOpacity={0.3}
        initial={{ rotate: 0 }}
        animate={{ rotate: isHovering ? 360 : 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Inner circle */}
      <motion.circle
        cx="12"
        cy="12"
        r="6"
        fill={color}
        animate={{ 
          scale: isHovering ? [1, 1.1, 1] : 1
        }}
        transition={{ 
          duration: 0.5,
          repeat: isHovering ? Infinity : 0
        }}
      />
    </svg>
  );
});

StatusBadgeSVG.displayName = "StatusBadgeSVG";

const TechIconSVG = memo(({ tech }: { tech: string }) => {
  const icons: Record<string, React.ReactNode> = {
    "Next.js": (
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" 
        stroke="currentColor" strokeWidth="1.5" fill="none" />
    ),
    "TypeScript": (
      <path d="M12 2L2 12l10 10 10-10L12 2zM12 6v12M16 12H8" 
        stroke="currentColor" strokeWidth="1.5" fill="none" />
    ),
    "React": (
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" 
        stroke="currentColor" strokeWidth="1.5" fill="none" />
    ),
    "MongoDB": (
      <path d="M12 2v20M12 6c-4 0-6 2-6 6s2 6 6 6 6-2 6-6-2-6-6-6z" 
        stroke="currentColor" strokeWidth="1.5" fill="none" />
    ),
    "Node.js": (
      <path d="M12 2l10 6v8l-10 6-10-6V8z" 
        stroke="currentColor" strokeWidth="1.5" fill="none" />
    ),
    "AI": (
      <path d="M3 12h18M12 3v18M5.5 5.5l13 13M18.5 5.5l-13 13" 
        stroke="currentColor" strokeWidth="1.5" fill="none" />
    ),
    "PWA": (
      <path d="M12 2v4M20 12h-4M12 20v-4M4 12h4M12 2L5 19M12 2l7 17" 
        stroke="currentColor" strokeWidth="1.5" fill="none" />
    ),
    "Payments": (
      <path d="M20 8H4v8h16V8zM8 12h8M12 8v8" 
        stroke="currentColor" strokeWidth="1.5" fill="none" />
    ),
    "Email": (
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" 
        stroke="currentColor" strokeWidth="1.5" fill="none" />
    ),
    "Firebase": (
      <path d="M12 2l-2 5-5 12 7-4 7 4-5-12z" 
        stroke="currentColor" strokeWidth="1.5" fill="none" />
    ),
    "GraphQL": (
      <path d="M12 2l10 6v8l-10 6-10-6V8zM4 8l8 12M20 8L12 20M4 16l8-12M20 16L12 4" 
        stroke="currentColor" strokeWidth="1.5" fill="none" />
    ),
    "PostgreSQL": (
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" 
        stroke="currentColor" strokeWidth="1.5" fill="none" />
    ),
    "Redis": (
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" 
        stroke="currentColor" strokeWidth="1.5" fill="none" />
    ),
    "Stripe": (
      <path d="M4 4h16v16H4zM8 8h8v8H8z" 
        stroke="currentColor" strokeWidth="1.5" fill="none" />
    ),
  };

  return (
    <svg width="14" height="14" viewBox="0 0 24 24" className="text-primary/80">
      {icons[tech] || (
        <circle cx="12" cy="12" r="6" fill="currentColor" />
      )}
    </svg>
  );
});

TechIconSVG.displayName = "TechIconSVG";

const ImageOverlaySVG = memo(({ isHovering, isLive }: { isHovering: boolean; isLive: boolean }) => {
  const color = isLive ? "#10b981" : "#f59e0b";
  
  return (
    <motion.div 
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: isHovering ? 0.1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <svg className="absolute top-2 left-2 w-6 h-6" viewBox="0 0 24 24">
        <motion.path
          d="M3 3h6v6H3z"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isHovering ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
      </svg>
      
      <svg className="absolute top-2 right-2 w-6 h-6" viewBox="0 0 24 24">
        <motion.path
          d="M15 3h6v6h-6z"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isHovering ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
      </svg>
      
      {isHovering && (
        <motion.div
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ top: "0%" }}
          animate={{ top: "100%" }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}
    </motion.div>
  );
});

ImageOverlaySVG.displayName = "ImageOverlaySVG";

const LiveIndicatorSVG = memo(({ isLive }: { isLive: boolean }) => (
  <svg width="12" height="12" viewBox="0 0 24 24">
    <circle
      cx="12"
      cy="12"
      r="5"
      fill={isLive ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      opacity={isLive ? 0.8 : 0.5}
    />
    {isLive && (
      <motion.circle
        cx="12"
        cy="12"
        r="5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        initial={{ opacity: 0, scale: 1 }}
        animate={{ 
          opacity: [0, 0.4, 0],
          scale: [1, 1.5, 2]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity
        }}
      />
    )}
  </svg>
));

LiveIndicatorSVG.displayName = "LiveIndicatorSVG";

const ExternalLinkArrowSVG = memo(({ isHovering }: { isHovering: boolean }) => {
  return (
    <motion.svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      animate={{ 
        x: isHovering ? [0, 2, 0] : 0
      }}
      transition={{ 
        x: { duration: 0.6, repeat: isHovering ? Infinity : 0 }
      }}
    >
      <motion.path
        d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isHovering ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.path
        d="M15 3h6v6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isHovering ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
      <motion.path
        d="M10 14L21 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isHovering ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      />
    </motion.svg>
  );
});

ExternalLinkArrowSVG.displayName = "ExternalLinkArrowSVG";

const CarouselDotSVG = memo(({ active, index }: { active: boolean; index: number }) => (
  <svg width="12" height="12" viewBox="0 0 24 24">
    <motion.circle
      cx="12"
      cy="12"
      r="5"
      fill={active ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeOpacity={active ? 1 : 0.3}
      animate={{ 
        scale: active ? [1, 1.1, 1] : 1
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        repeatDelay: 1
      }}
    />
    {active && (
      <motion.circle
        cx="12"
        cy="12"
        r="3"
        fill="currentColor"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.5, 0],
          scale: [1, 1.5, 2]
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      />
    )}
  </svg>
));

CarouselDotSVG.displayName = "CarouselDotSVG";

/* ------------------------------------------------------------------ */
/* Project Card Component (Compact) */
/* ------------------------------------------------------------------ */

const ProjectCard = memo(({ 
  project, 
  isActive,
  index 
}: { 
  project: Project; 
  isActive: boolean;
  index: number;
}) => {
  const [imgSrc, setImgSrc] = useState(project.image);
  const [loaded, setLoaded] = useState(false);
  const [isFallback, setIsFallback] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isLinkHovering, setIsLinkHovering] = useState(false);

  const isLive = project.status === "live";

  const handleImageError = useCallback(() => {
    if (imgSrc === project.image && project.fallbackImage) {
      setImgSrc(project.fallbackImage);
      setIsFallback(true);
    } else {
      setImgSrc("/project-default.png");
      setIsFallback(true);
    }
  }, [imgSrc, project.image, project.fallbackImage]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isActive ? 1 : 0.7,
        y: isActive ? 0 : 10,
        scale: isActive ? 1 : 0.95
      }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="w-full md:w-[320px] flex-shrink-0 px-2"
    >
      <Card className="relative overflow-hidden border bg-card/90 backdrop-blur-sm
                     shadow-md hover:shadow-lg transition-all duration-300 h-full
                     border-border/50 hover:border-primary/30 group">
        {/* Status Badge - Compact */}
        <div className="absolute top-3 right-3 z-10">
          <div
            className={`flex items-center gap-1.5 px-2 py-1 rounded-full
            text-[10px] font-medium border backdrop-blur-sm
            ${isLive
              ? "bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/20"
              : "bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/20"
            }`}
          >
            <StatusBadgeSVG isLive={isLive} isHovering={isHovering} />
            {isLive ? "Live" : "Dev"}
          </div>
        </div>

        {/* Compact Image */}
        <div className="relative h-40 overflow-hidden bg-gradient-to-br from-muted/30 to-background/30">
          {!loaded && (
            <div className={`absolute inset-0 animate-pulse ${
              isLive 
                ? "bg-gradient-to-br from-emerald-500/5 to-transparent" 
                : "bg-gradient-to-br from-amber-500/5 to-transparent"
            }`} />
          )}

          <Image
            src={imgSrc}
            alt={project.title}
            fill
            className={`object-cover transition-all duration-500 
              ${loaded ? "opacity-100" : "opacity-0"}
              group-hover:scale-105`}
            onLoad={() => {
              setLoaded(true);
              setIsFallback(false);
            }}
            onError={handleImageError}
            sizes="(max-width: 768px) 100vw, 320px"
          />

          <ImageOverlaySVG isHovering={isHovering} isLive={isLive} />

          {isFallback && (
            <div className="absolute bottom-2 left-2 text-[10px] px-1.5 py-0.5 rounded 
              bg-black/70 text-white backdrop-blur-sm">
              Preview
            </div>
          )}
        </div>

        {/* Compact Content */}
        <CardContent className="p-4 space-y-3">
          {/* Title */}
          <h3 className="text-sm font-semibold leading-tight text-foreground line-clamp-2">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Tech Stack - Compact */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tech.slice(0, 3).map((tech) => (
              <motion.span
                key={tech}
                className="px-2 py-1 text-[10px] rounded-md border flex items-center gap-1
                  bg-card/50 hover:bg-accent/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <TechIconSVG tech={tech} />
                {tech}
              </motion.span>
            ))}
            {project.tech.length > 3 && (
              <span className="px-2 py-1 text-[10px] rounded-md border text-muted-foreground">
                +{project.tech.length - 3}
              </span>
            )}
          </div>

          {/* Meta Info - Compact */}
          <div className="flex items-center justify-between pt-2 border-t border-border/30">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {isLive ? (
                <span className="flex items-center gap-1">
                  <LiveIndicatorSVG isLive={isLive} />
                  <span>Production</span>
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Code size={10} />
                  <span>Development</span>
                </span>
              )}
            </div>

            {/* Action Button */}
            <Link
              href={project.live}
              target="_blank"
              className="inline-flex items-center gap-1 text-xs font-medium transition-colors
                text-primary hover:text-primary/80"
              onMouseEnter={() => setIsLinkHovering(true)}
              onMouseLeave={() => setIsLinkHovering(false)}
            >
              {isLive ? "Visit" : "Preview"}
              <ExternalLinkArrowSVG isHovering={isLinkHovering} />
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

ProjectCard.displayName = "ProjectCard";

/* ------------------------------------------------------------------ */
/* Carousel Controls - FIXED: No nested buttons */
/* ------------------------------------------------------------------ */

const CarouselControls = memo(({ 
  currentIndex, 
  totalItems, 
  onPrevious, 
  onNext,
  onDotClick 
}: { 
  currentIndex: number; 
  totalItems: number; 
  onPrevious: () => void; 
  onNext: () => void;
  onDotClick: (index: number) => void;
}) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      {/* Previous Button */}
      <motion.button
        onClick={onPrevious}
        className="p-2 rounded-full border border-border/50 bg-card/80 backdrop-blur-sm
                 hover:bg-accent/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        disabled={currentIndex === 0}
      >
        <ChevronLeft size={18} className="text-foreground" />
      </motion.button>

      {/* Dots - FIXED: Changed button to div for dots container */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalItems }).map((_, index) => (
          <motion.div
            key={index}
            onClick={() => onDotClick(index)}
            className="p-1 cursor-pointer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onDotClick(index);
              }
            }}
          >
            <CarouselDotSVG active={currentIndex === index} index={index} />
          </motion.div>
        ))}
      </div>

      {/* Next Button */}
      <motion.button
        onClick={onNext}
        className="p-2 rounded-full border border-border/50 bg-card/80 backdrop-blur-sm
                 hover:bg-accent/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        disabled={currentIndex === totalItems - 1}
      >
        <ChevronRight size={18} className="text-foreground" />
      </motion.button>
    </div>
  );
});

CarouselControls.displayName = "CarouselControls";

/* ------------------------------------------------------------------ */
/* Main Component */
/* ------------------------------------------------------------------ */

export default function ProofOfWork() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  const totalProjects = projects.length;

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalProjects - 1));
    setIsAutoPlaying(false);
  }, [totalProjects]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < totalProjects - 1 ? prev + 1 : 0));
    setIsAutoPlaying(false);
  }, [totalProjects]);

  const handleDotClick = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev < totalProjects - 1 ? prev + 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalProjects]);

  // Touch swipe for mobile
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let startX = 0;
    let endX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          handleNext();
        } else {
          handlePrevious();
        }
      }
    };

    carousel.addEventListener('touchstart', handleTouchStart);
    carousel.addEventListener('touchend', handleTouchEnd);

    return () => {
      carousel.removeEventListener('touchstart', handleTouchStart);
      carousel.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleNext, handlePrevious]);

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute left-1/4 top-1/3 w-64 h-64 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(var(--primary) / 0.1) 0%, transparent 70%)" }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Animated badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full 
              bg-primary/10 border border-primary/20 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles size={12} className="text-primary" />
            <span className="text-xs font-medium text-primary">Featured Work</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            Production Projects
          </h2>
          
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Real-world applications built and deployed with modern architectures and best practices.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-6 mt-6">
            <div className="text-center">
              <div className="text-xl font-bold text-primary">{totalProjects}</div>
              <div className="text-xs text-muted-foreground">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-primary">
                {projects.filter(p => p.status === "live").length}
              </div>
              <div className="text-xs text-muted-foreground">Live</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-primary">
                {Array.from(new Set(projects.flatMap(p => p.tech))).length}
              </div>
              <div className="text-xs text-muted-foreground">Technologies</div>
            </div>
          </div>
        </motion.div>

        {/* Projects Display */}
        <div className="relative">
          {/* Desktop Grid (hidden on mobile) */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                isActive={true}
                index={index}
              />
            ))}
          </div>

          {/* Mobile Carousel (visible on mobile) */}
          <div className="md:hidden" ref={carouselRef}>
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    isActive={currentIndex === index}
                    index={index}
                  />
                ))}
              </div>
            </div>

            {/* Carousel Controls for Mobile */}
            <CarouselControls
              currentIndex={currentIndex}
              totalItems={totalProjects}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onDotClick={handleDotClick}
            />
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 pt-8 border-t border-border/30"
        >
          {/* <p className="text-sm text-muted-foreground mb-4">
            Want to see more? Check out my GitHub for additional projects and experiments.
          </p>
          <Link
            href="https://github.com/rahul1015s"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
              bg-primary/10 hover:bg-primary/20 border border-primary/20
              text-primary font-medium text-sm transition-colors"
          >
            <Github size={16} />
            View All Projects on GitHub
          </Link> */}
        </motion.div>
      </div>
    </section>
  );
}