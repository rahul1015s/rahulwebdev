"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useMemo, useCallback, memo } from "react";

// Memoized components for better performance
const BadgeSVG = memo(({ isHoveringBadge }: { isHoveringBadge: boolean }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" className="relative z-10">
    <motion.circle
      cx="6"
      cy="6"
      r="5"
      fill="#2563EB"
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [1, 0.8, 1]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
    <motion.circle
      cx="6"
      cy="6"
      r="4"
      fill="#2563EB"
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: isHoveringBadge ? [1, 0.5, 1] : 1,
        fill: isHoveringBadge ? "#2563EB" : "#2563EB"
      }}
      transition={{ duration: 0.8 }}
    />
    {/* Pulse rings */}
    {isHoveringBadge && (
      <>
        <motion.circle
          cx="6"
          cy="6"
          r="3"
          stroke="#2563EB"
          strokeWidth="1"
          fill="none"
          initial={{ opacity: 0, r: 3 }}
          animate={{ 
            opacity: [0, 0.6, 0],
            r: [3, 6, 9]
          }}
          transition={{ duration: 1 }}
        />
        <motion.circle
          cx="6"
          cy="6"
          r="3"
          stroke="#2563EB"
          strokeWidth="1"
          fill="none"
          initial={{ opacity: 0, r: 3 }}
          animate={{ 
            opacity: [0, 0.4, 0],
            r: [3, 7, 11]
          }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </>
    )}
  </svg>
));

BadgeSVG.displayName = "BadgeSVG";

const SparkleEffect = memo(({ isHoveringBadge }: { isHoveringBadge: boolean }) => {
  if (!isHoveringBadge) return null;
  
  return (
    <motion.div 
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {[...Array(3)].map((_, i) => (
        <motion.svg
          key={`sparkle-${i}`}
          className="absolute text-blue-400"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          initial={{ 
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            scale: 0,
            rotate: 0
          }}
          animate={{ 
            scale: [0, 1, 0],
            rotate: 360,
            x: [
              Math.random() * 100 + '%',
              Math.random() * 100 + '%'
            ],
            y: [
              Math.random() * 100 + '%',
              Math.random() * 100 + '%'
            ]
          }}
          transition={{
            duration: 0.8,
            delay: i * 0.1
          }}
        >
          <path fill="currentColor" d="M12 2L9 12 2 19l10-3 3 10 7-7-12-3z"/>
        </motion.svg>
      ))}
    </motion.div>
  );
});

SparkleEffect.displayName = "SparkleEffect";

const UnderlineSVG = memo(() => (
  <motion.svg
    className="absolute -bottom-2 left-0 w-full h-2"
    viewBox="0 0 200 20"
    preserveAspectRatio="none"
    initial={{ opacity: 0 }}
    whileHover={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <defs>
      <linearGradient id="underline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#2563EB" stopOpacity="0" />
        <stop offset="50%" stopColor="#2563EB" stopOpacity="1" />
        <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <motion.path
      d="M0,10 Q100,15 200,10"
      stroke="url(#underline-gradient)"
      strokeWidth="3"
      fill="none"
      filter="url(#glow)"
      initial={{ pathLength: 0 }}
      whileHover={{ pathLength: 1 }}
      transition={{ duration: 0.5 }}
    />
  </motion.svg>
));

UnderlineSVG.displayName = "UnderlineSVG";

const MapPinSVG = memo(() => (
  <svg width="20" height="20" viewBox="0 0 24 24" className="text-primary">
    <motion.path
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      initial={{ pathLength: 0, fill: "rgba(37, 99, 235, 0)" }}
      animate={{ 
        pathLength: 1,
        fill: "rgba(37, 99, 235, 0.1)"
      }}
      transition={{ 
        pathLength: { duration: 1, delay: 0.5 },
        fill: { duration: 0.5, delay: 1 }
      }}
    />
    <motion.circle
      cx="12"
      cy="9"
      r="3"
      fill="currentColor"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ 
        delay: 1.2,
        type: "spring",
        stiffness: 200
      }}
    />
    {/* Pulse effect on hover */}
    <motion.circle
      cx="12"
      cy="9"
      r="3"
      fill="currentColor"
      initial={{ opacity: 0, scale: 1 }}
      whileHover={{
        opacity: [0, 0.3, 0],
        scale: [1, 1.5, 2]
      }}
      transition={{ duration: 1 }}
    />
  </svg>
));

MapPinSVG.displayName = "MapPinSVG";

const TechIcon = memo(({ 
  tech, 
  color, 
  icon 
}: { 
  tech: string; 
  color: string; 
  icon: React.ReactNode;
}) => (
  <motion.span 
    className="font-semibold text-foreground/90 inline-flex items-center gap-1 relative group"
    whileHover={{ color }}
    transition={{ duration: 0.2 }}
  >
    {tech}
    <svg width="16" height="16" viewBox="0 0 40 40" className="opacity-0 group-hover:opacity-100 transition-opacity">
      {icon}
    </svg>
  </motion.span>
));

TechIcon.displayName = "TechIcon";

const FeaturedLinkArrow = memo(({ isHoveringFeatured }: { isHoveringFeatured: boolean }) => (
  <motion.div
    animate={{ 
      x: isHoveringFeatured ? 5 : 0
    }}
    transition={{ type: "spring", stiffness: 400 }}
  >
    <svg width="15" height="15" viewBox="0 0 24 24" className="text-primary">
      <motion.path
        d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ 
          pathLength: isHoveringFeatured ? 1 : 0 
        }}
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
        animate={{ 
          pathLength: isHoveringFeatured ? 1 : 0 
        }}
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
        animate={{ 
          pathLength: isHoveringFeatured ? 1 : 0 
        }}
        transition={{ duration: 0.3, delay: 0.2 }}
      />
    </svg>
  </motion.div>
));

FeaturedLinkArrow.displayName = "FeaturedLinkArrow";

const FeaturedLinkUnderline = memo(() => (
  <svg className="absolute -bottom-1 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 200 5" preserveAspectRatio="none">
    <defs>
      <linearGradient id="link-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#2563EB" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
      </linearGradient>
    </defs>
    <motion.path
      d="M0,2.5 Q100,5 200,2.5"
      stroke="url(#link-gradient)"
      strokeWidth="2"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    />
  </svg>
));

FeaturedLinkUnderline.displayName = "FeaturedLinkUnderline";

const EmailSVG = memo(({ hoveredButton }: { hoveredButton: string | null }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" className="text-primary-foreground">
    <motion.path
      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ 
        d: hoveredButton === "email" 
          ? "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" 
          : "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
      }}
    />
    <motion.polyline
      points="22,6 12,13 2,6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{
        pathLength: hoveredButton === "email" ? [0, 1, 0] : 1
      }}
      transition={{ duration: 0.5 }}
    />
  </svg>
));

EmailSVG.displayName = "EmailSVG";

const EmailWaveEffect = memo(({ hoveredButton }: { hoveredButton: string | null }) => {
  if (hoveredButton !== "email") return null;
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <motion.svg
          key={`wave-${i}`}
          className="absolute text-white/20"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          initial={{ y: "100%" }}
          animate={{ y: "-100%" }}
          transition={{
            duration: 0.8,
            delay: i * 0.2,
            repeat: Infinity
          }}
        >
          <path d="M0,50 Q25,40 50,50 T100,50 L100,100 L0,100 Z" fill="currentColor" />
        </motion.svg>
      ))}
    </div>
  );
});

EmailWaveEffect.displayName = "EmailWaveEffect";

const GitHubSVG = memo(({ hoveredButton }: { hoveredButton: string | null }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" className="text-foreground">
    <motion.path
      d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12c0-5.52-4.48-10-10-10z"
      fill="currentColor"
      animate={{
        d: hoveredButton === "github" 
          ? "M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12c0-5.52-4.48-10-10-10z"
          : "M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12c0-5.52-4.48-10-10-10z"
      }}
    />
    {/* Animated tentacles on hover */}
    {hoveredButton === "github" && (
      <>
        <motion.circle
          cx="9"
          cy="13"
          r="1"
          fill="currentColor"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
        <motion.circle
          cx="15"
          cy="13"
          r="1"
          fill="currentColor"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0] }}
          transition={{ duration: 0.5, delay: 0.1, repeat: Infinity }}
        />
      </>
    )}
  </svg>
));

GitHubSVG.displayName = "GitHubSVG";

const LinkedInSVG = memo(({ hoveredButton }: { hoveredButton: string | null }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" className="text-foreground">
    <motion.path
      d="M4.98 3.5c0 1.38-1.12 2.5-2.5 2.5S0 4.88 0 3.5 1.12 1 2.5 1s2.5 1.12 2.5 2.5zM0 24h5V8H0v16z"
      fill="currentColor"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M22.5 8h-5.5c-.55 0-1 .45-1 1v15c0 .55.45 1 1 1h5.5c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1z"
      fill="currentColor"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    />
    <motion.path
      d="M20.5 24V9h5v15h-5z"
      fill="currentColor"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    />
    
    {/* Connection lines animation on hover */}
    {hoveredButton === "linkedin" && (
      <>
        <motion.line
          x1="8"
          y1="12"
          x2="16"
          y2="12"
          stroke="currentColor"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.line
          x1="8"
          y1="16"
          x2="16"
          y2="16"
          stroke="currentColor"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        />
      </>
    )}
  </svg>
));

LinkedInSVG.displayName = "LinkedInSVG";

const ResumeSVG = memo(({ hoveredButton }: { hoveredButton: string | null }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" className="text-foreground">
    <motion.path
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{
        strokeDasharray: hoveredButton === "resume" ? "5,5" : "none"
      }}
    />
    <motion.line
      x1="8"
      y1="12"
      x2="16"
      y2="12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ 
        pathLength: hoveredButton === "resume" ? [0, 1, 0] : 1 
      }}
      transition={{ duration: 0.5 }}
    />
    <motion.line
      x1="8"
      y1="16"
      x2="16"
      y2="16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ 
        pathLength: hoveredButton === "resume" ? [0, 1, 0] : 1 
      }}
      transition={{ duration: 0.5, delay: 0.1 }}
    />
    <motion.line
      x1="8"
      y1="20"
      x2="13"
      y2="20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ 
        pathLength: hoveredButton === "resume" ? [0, 1, 0] : 1 
      }}
      transition={{ duration: 0.5, delay: 0.2 }}
    />
    <motion.polyline
      points="14 2 14 8 20 8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{
        pathLength: hoveredButton === "resume" ? [0, 1] : 1
      }}
      transition={{ duration: 0.3 }}
    />
  </svg>
));

ResumeSVG.displayName = "ResumeSVG";

// Contact Button Component
const ContactButton = memo(({ 
  type,
  href, 
  children, 
  variant = "default",
  hoveredButton,
  onHover
}: { 
  type: string;
  href: string; 
  children: React.ReactNode; 
  variant?: "default" | "outline" | "secondary";
  hoveredButton: string | null;
  onHover: (button: string | null) => void;
}) => {
  const isHovering = hoveredButton === type;
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => onHover(type)}
      onHoverEnd={() => onHover(null)}
    >
      <Button asChild variant={variant} className="gap-2 relative overflow-hidden group">
        <Link href={href} target={href.startsWith('http') ? '_blank' : undefined}>
          <motion.div
            animate={{ 
              scale: isHovering ? 1.2 : 1,
              rotate: type === "github" && isHovering ? [0, 360] : 0
            }}
            transition={{ duration: type === "github" ? 0.5 : 0.3 }}
          >
            {type === "email" && <EmailSVG hoveredButton={hoveredButton} />}
            {type === "github" && <GitHubSVG hoveredButton={hoveredButton} />}
            {type === "linkedin" && <LinkedInSVG hoveredButton={hoveredButton} />}
            {type === "resume" && <ResumeSVG hoveredButton={hoveredButton} />}
          </motion.div>
          {children}
          
          {type === "email" && <EmailWaveEffect hoveredButton={hoveredButton} />}
          
          {type === "github" && isHovering && (
            <motion.div 
              className="absolute -inset-0.5 rounded-md border border-primary/30"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1,
                scale: 1
              }}
              transition={{ duration: 0.2 }}
            />
          )}
          
          {type === "resume" && isHovering && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 0.8 }}
            />
          )}
        </Link>
      </Button>
    </motion.div>
  );
});

ContactButton.displayName = "ContactButton";

export default function HeroSection() {
  const [isHoveringBadge, setIsHoveringBadge] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [isHoveringFeatured, setIsHoveringFeatured] = useState(false);

  // Memoized handlers
  const handleBadgeHover = useCallback((state: boolean) => setIsHoveringBadge(state), []);
  const handleFeaturedHover = useCallback((state: boolean) => setIsHoveringFeatured(state), []);
  const handleButtonHover = useCallback((button: string | null) => setHoveredButton(button), []);

  // Memoized static values
  const gridPattern = useMemo(() => (
    <svg className="absolute inset-0 w-full h-full opacity-5 dark:opacity-10" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path 
            d="M 40 0 L 0 0 0 40" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1"
            className="text-gray-300 dark:text-gray-700"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  ), []);

  const backgroundGlows = useMemo(() => (
    <>
      <motion.div 
        className="absolute top-20 left-1/3 w-72 h-72 
          bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute top-60 right-1/4 w-72 h-72 
          bg-blue-600/10 dark:bg-blue-600/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.5
        }}
      />
    </>
  ), []);

  // Tech stack icons
  const techIcons = useMemo(() => [
    {
      name: "React",
      color: "#2563EB",
      icon: (
        <>
          <circle cx="20" cy="20" r="15" fill="#2563EB" fillOpacity="0.1" />
          <circle cx="20" cy="20" r="8" fill="#2563EB" />
          <circle cx="20" cy="20" r="3" fill="white" />
        </>
      )
    },
    {
      name: "Next.js",
      color: "#000000",
      icon: (
        <>
          <circle cx="20" cy="20" r="15" fill="#2563EB" fillOpacity="0.1" />
          <text x="20" y="22" textAnchor="middle" fill="#2563EB" fontSize="12" fontWeight="bold">N</text>
        </>
      )
    },
    {
      name: "Node.js",
      color: "#68a063",
      icon: (
        <>
          <circle cx="20" cy="20" r="15" fill="#2563EB" fillOpacity="0.1" />
          <text x="20" y="22" textAnchor="middle" fill="#2563EB" fontSize="10" fontWeight="bold">JS</text>
        </>
      )
    },
    {
      name: "MongoDB",
      color: "#4db33d",
      icon: (
        <>
          <path d="M20,5 L25,30 L20,35 L15,30 Z" fill="#2563EB" fillOpacity="0.1" />
          <path d="M20,10 L23,25 L20,30 L17,25 Z" fill="#2563EB" />
        </>
      )
    }
  ], []);

  // Contact buttons config
  const contactButtons = useMemo(() => [
    {
      id: "email",
      href: "mailto:rahulwebjs@gmail.com",
      label: "Email",
      variant: "default" as const
    },
    {
      id: "github",
      href: "https://github.com/rahul1015s",
      label: "GitHub",
      variant: "outline" as const
    },
    {
      id: "linkedin",
      href: "https://linkedin.com/in/rahul1015s",
      label: "LinkedIn",
      variant: "outline" as const
    },
    {
      id: "resume",
      href: "/resume",
      label: "Resume",
      variant: "secondary" as const
    }
  ], []);

  return (
    <section className="relative overflow-hidden">
      {/* --- Background Glow (Optimized for your palette) --- */}
      <div className="absolute inset-0 -z-10">
        {backgroundGlows}
        {gridPattern}
      </div>

      <div className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        
        {/* Top Badge with Premium SVG Micro-interaction */}
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 30px -10px rgba(37, 99, 235, 0.3)"
          }}
          whileTap={{ scale: 0.98 }}
          onHoverStart={() => handleBadgeHover(true)}
          onHoverEnd={() => handleBadgeHover(false)}
          transition={{ 
            duration: 0.6,
            type: "spring",
            stiffness: 200
          }}
          className="inline-flex items-center gap-2 px-4 py-1.5 
            bg-card/80 backdrop-blur-md border border-border/50 rounded-full text-sm 
            text-muted-foreground shadow-sm cursor-default relative overflow-hidden group"
        >
          {/* Animated SVG Pulse Ring */}
          <motion.div 
            className="relative z-10"
            animate={{ 
              scale: isHoveringBadge ? [1, 1.3, 1] : 1 
            }}
            transition={{ duration: 0.5 }}
          >
            <BadgeSVG isHoveringBadge={isHoveringBadge} />
          </motion.div>
          
          <span className="relative z-10">Available for Opportunities</span>
          
          {/* SVG Sparkle effect on hover */}
          <SparkleEffect isHoveringBadge={isHoveringBadge} />
          
          {/* Hover glow effect with SVG filter */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-blue-500/10 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: isHoveringBadge ? "100%" : "-100%" }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>

        {/* Name with SVG underline animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Hi, I'm{" "}
            <motion.span 
              className="text-primary inline-block relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Rahul Verma
              {/* SVG Animated Underline */}
              <UnderlineSVG />
            </motion.span>
          </h1>
        </motion.div>

        {/* Title with SVG typing cursor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.3, 
            duration: 0.7,
            ease: "easeOut"
          }}
          className="mt-3 relative inline-flex items-center"
        >
          <p className="text-xl md:text-2xl font-medium text-muted-foreground pr-1">
            Full Stack Developer
          </p>
          {/* Typing cursor */}
          <motion.svg
            width="3"
            height="28"
            viewBox="0 0 3 28"
            className="text-primary ml-1"
            animate={{ 
              opacity: [1, 0, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <rect x="0" y="0" width="3" height="28" fill="currentColor">
              <animate attributeName="height" values="28;14;28" dur="1.5s" repeatCount="indefinite" />
            </rect>
          </motion.svg>
        </motion.div>

        {/* Location with animated SVG pin */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="mt-2"
        >
          <div className="flex items-center gap-1.5 text-muted-foreground group cursor-default">
            <motion.div
              whileHover={{ 
                rotate: [0, -10, 10, -5, 0],
                transition: { duration: 0.6 }
              }}
              className="relative"
            >
              <MapPinSVG />
            </motion.div>
            <span>India (IST)</span>
          </div>
        </motion.div>

        {/* Summary with SVG tech icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="mt-6 max-w-xl text-muted-foreground leading-relaxed text-lg"
        >
          <span className="block">
            I build scalable, modern web applications using{" "}
            {techIcons.map((tech, index) => (
              <span key={tech.name}>
                <TechIcon tech={tech.name} color={tech.color} icon={tech.icon} />
                {index < techIcons.length - 1 ? ", " : " "}
                {index === techIcons.length - 2 ? "and " : ""}
              </span>
            ))}
            focusing on clean UI, performance, and real-world problem solving.
          </span>
        </motion.div>

        {/* Featured Work with animated SVG arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => handleFeaturedHover(true)}
            onHoverEnd={() => handleFeaturedHover(false)}
          >
            <Link
              href="https://opluscowork.com/" 
              target="_blank"
              className="inline-flex items-center gap-2 text-sm font-medium 
                text-primary hover:text-primary/80 group relative"
            >
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                className="text-yellow-500"
                animate={{
                  rotate: isHoveringFeatured ? [0, 360] : 0
                }}
                transition={{ duration: 0.5 }}
              >
                <path 
                  fill="currentColor" 
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </motion.svg>
              Featured Work – Oplus Cowork
              <FeaturedLinkArrow isHoveringFeatured={isHoveringFeatured} />
              
              {/* Animated SVG underline */}
              <FeaturedLinkUnderline />
            </Link>
          </motion.div>
        </motion.div>

        {/* Contact Buttons with SVG animations */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          {contactButtons.map((button) => (
            <ContactButton
              key={button.id}
              type={button.id}
              href={button.href}
              variant={button.variant}
              hoveredButton={hoveredButton}
              onHover={handleButtonHover}
            >
              {button.label}
            </ContactButton>
          ))}
        </motion.div>
      </div>
    </section>
  );
}