'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { resumeData } from '@/data/resumeData';
import { Mail, Linkedin, Github, ExternalLink, MapPin, Phone, Share2, Twitter, Facebook, Link as LinkIcon, Printer } from 'lucide-react';
import Head from 'next/head';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";

export default function ResumePage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePrint = () => {
    if (!isClient) return;
    
    const printStyles = `
      @media print {
        @page {
          margin: 20mm;
        }
        
        body * {
          visibility: hidden;
        }
        
        #resume-content,
        #resume-content * {
          visibility: visible;
        }
        
        #resume-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          max-width: none;
        }
        
        .no-print {
          display: none !important;
        }
        
        a {
          color: #059669 !important;
          text-decoration: underline !important;
        }
        
        .text-emerald-600 {
          color: #059669 !important;
        }
        
        .bg-emerald-100 {
          background-color: #d1fae5 !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        
        .bg-slate-100 {
          background-color: #f1f5f9 !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = printStyles;
    document.head.appendChild(style);
    
    window.print();
    
    setTimeout(() => {
      document.head.removeChild(style);
    }, 100);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const shareUrl = isClient ? window.location.href : '';
  const shareText = 'Check out my professional resume - Rahul Verma, Full Stack Developer';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Rahul Verma - Resume',
          text: shareText,
          url: shareUrl,
        });
        toast.success("Shared successfully!");
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.log('Error sharing:', err);
        }
      }
    } else {
      setShowAlert(true);
    }
  };

  const shareActions = [
    {
      label: 'Copy Link',
      icon: LinkIcon,
      action: async () => {
        try {
          await navigator.clipboard.writeText(shareUrl);
          toast.success("Link copied to clipboard!");
          setShowAlert(false);
        } catch (err) {
          toast.error("Failed to copy link");
        }
      },
    },
    {
      label: 'Twitter',
      icon: Twitter,
      action: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
          '_blank'
        );
        setShowAlert(false);
      },
    },
    {
      label: 'Facebook',
      icon: Facebook,
      action: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
          '_blank'
        );
        setShowAlert(false);
      },
    },
    {
      label: 'LinkedIn',
      icon: Linkedin,
      action: () => {
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
          '_blank'
        );
        setShowAlert(false);
      },
    },
  ];

  return (
    <>
      <Head>
        {/* TODO: Create og-resume.jpg image (1200x630) in public folder for social media preview */}
        <title>Rahul Verma - Full Stack Developer Resume</title>
        <meta name="description" content="Professional resume of Rahul Verma, Full Stack Developer specializing in modern web technologies." />
        <meta property="og:title" content="Rahul Verma - Full Stack Developer Resume" />
        <meta property="og:description" content="Professional resume of Rahul Verma, Full Stack Developer specializing in modern web technologies." />
        <meta property="og:image" content="/og-resume.svg" />
        <meta property="og:url" content="https://rahulwebdev.in/resume" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Rahul Verma Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rahul Verma - Full Stack Developer Resume" />
        <meta name="twitter:description" content="Professional resume of Rahul Verma, Full Stack Developer specializing in modern web technologies." />
        <meta name="twitter:image" content="/og-resume.svg" />
      </Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "mainEntity": {
              "@type": "Person",
              "name": "Rahul Verma",
              "jobTitle": "Full Stack Developer",
              "description": "Self-taught Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies",
              "url": "https://rahulwebdev.in/resume",
              "sameAs": [
                "https://github.com/rahulwebdev",
                "https://linkedin.com/in/rahulwebdev"
              ],
              "knowsAbout": [
                "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
                "MongoDB", "Express.js", "Web Development", "Full Stack Development"
              ]
            }
          }),
        }}
      />

      <div className="min-h-screen bg-white dark:bg-slate-900  mt-10 text-slate-900 dark:text-slate-100 p-4 md:p-8">
        <div id="resume-content" ref={contentRef} className="max-w-4xl mx-auto">
          <motion.div
            className="mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="text-center mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Rahul Verma
              </h1>
              <p className="text-lg md:text-xl text-emerald-600 dark:text-emerald-400 font-semibold mb-2">
                Full Stack Developer
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {resumeData.personal.subtitle}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-3 md:gap-4 text-sm text-slate-600 dark:text-slate-400"
            >
              <a 
                href={`mailto:${resumeData.personal.email}`} 
                className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors print:text-emerald-600"
              >
                <Mail size={16} />
                {resumeData.personal.email}
              </a>
              <a 
                href={`tel:${resumeData.personal.phone}`} 
                className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors print:text-emerald-600"
              >
                <Phone size={16} />
                {resumeData.personal.phone}
              </a>
              <a 
                href="https://maps.google.com/?q=Patna,India" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors print:text-emerald-600"
              >
                <MapPin size={16} />
                {resumeData.personal.location}
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex justify-center gap-3 md:gap-4 mt-4"
            >
              <a 
                href={resumeData.personal.links.portfolio} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors print:text-emerald-600"
              >
                Portfolio
              </a>
              <span className="text-slate-400 dark:text-slate-500 print:hidden">•</span>
              <a 
                href={resumeData.personal.links.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors print:text-emerald-600"
              >
                GitHub
              </a>
              <span className="text-slate-400 dark:text-slate-500 print:hidden">•</span>
              <a 
                href={resumeData.personal.links.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors print:text-emerald-600"
              >
                LinkedIn
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-6 no-print"
            >
              <Button
                variant="outline"
                onClick={handlePrint}
                className="flex items-center gap-2"
              >
                <Printer size={16} />
                Print
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Share2 size={16} />
                    Share
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" />
                    <span>Share via...</span>
                  </DropdownMenuItem>
                  {shareActions.map((action) => (
                    <DropdownMenuItem 
                      key={action.label} 
                      onClick={action.action}
                    >
                      <action.icon className="mr-2 h-4 w-4" />
                      <span>{action.label}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          </motion.div>

          <hr className="my-6 border-slate-200" />

          <motion.section 
            variants={containerVariants} 
            initial="hidden" 
            animate="visible" 
            className="mb-8"
          >
            <motion.h2 
              variants={itemVariants} 
              className="text-2xl font-bold mb-3 text-slate-900 dark:text-slate-200"
            >
              Professional Summary
            </motion.h2>
            <motion.p 
              variants={itemVariants} 
              className="text-slate-700 dark:text-slate-400 leading-relaxed"
            >
              {resumeData.about.summary}
            </motion.p>
          </motion.section>

          <motion.section 
            variants={containerVariants} 
            initial="hidden" 
            animate="visible" 
            className="mb-8"
          >
            <motion.h2 
              variants={itemVariants} 
              className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-200"
            >
              Experience
            </motion.h2>
            <div className="space-y-6">
              {resumeData.experience.map((exp, idx) => (
                <motion.div 
                  key={idx} 
                  variants={itemVariants} 
                  className="border-l-4 border-emerald-600 pl-4 print:border-emerald-600"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-200">
                        {exp.title}
                      </h3>
                      <a 
                        href="https://opluscowork.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-emerald-600 dark:text-emerald-400 font-semibold hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors print:text-emerald-600"
                      >
                        {exp.company}
                      </a>
                    </div>
                    <span className="text-sm bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded mt-1 sm:mt-0 print:bg-emerald-100 print:text-emerald-700">
                      {exp.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    {exp.period}
                  </p>
                  <ul className="space-y-1 text-slate-700 dark:text-slate-300 mb-2">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="text-sm">
                        • {desc}
                      </li>
                    ))}
                  </ul>
                  <div className="grid md:grid-cols-2 gap-2 mb-2">
                    {exp.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-1 text-sm">
                        <span className="text-emerald-600 dark:text-emerald-400 mt-0.5 print:text-emerald-600">✓</span>
                        <span className="text-slate-700 dark:text-slate-300">{highlight}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded print:bg-slate-100 print:text-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section 
            variants={containerVariants} 
            initial="hidden" 
            animate="visible" 
            className="mb-8"
          >
            <motion.h2 
              variants={itemVariants} 
              className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-200"
            >
              Education
            </motion.h2>
            <div className="space-y-4">
              {resumeData.education.map((edu, idx) => (
                <motion.div 
                  key={idx} 
                  variants={itemVariants} 
                  className="border-l-4 border-emerald-600 pl-4 print:border-emerald-600"
                >
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-200">
                    {edu.degree}
                  </h3>
                  <p className="text-emerald-600 dark:text-emerald-400 font-semibold print:text-emerald-600">
                    {edu.institution}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {edu.period}
                  </p>
                  {edu.focus && edu.focus.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-200 mb-1">
                        Focus Areas:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {edu.focus.map((focus, i) => (
                          <span
                            key={i}
                            className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded print:bg-slate-100 print:text-slate-700"
                          >
                            {focus}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section 
            variants={containerVariants} 
            initial="hidden" 
            animate="visible" 
            className="mb-8"
          >
            <motion.h2 
              variants={itemVariants} 
              className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-200"
            >
              Skills
            </motion.h2>
            <div className="space-y-4">
              {resumeData.skills.map((skillCategory, idx) => (
                <motion.div key={idx} variants={itemVariants} className="mb-4">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                    {skillCategory.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillCategory.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-sm px-3 py-1 rounded-full print:bg-emerald-100 print:text-emerald-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section 
            variants={containerVariants} 
            initial="hidden" 
            animate="visible" 
            className="mb-8"
          >
            <motion.h2 
              variants={itemVariants} 
              className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-200"
            >
              Notable Projects
            </motion.h2>
            <div className="space-y-6">
              {resumeData.projects.map((project, idx) => (
                <motion.div 
                  key={idx} 
                  variants={itemVariants} 
                  className="border-l-4 border-emerald-600 pl-4 print:border-emerald-600"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-200">
                        {project.title}
                      </h3>
                      <p className="text-emerald-600 dark:text-emerald-400 font-semibold print:text-emerald-600">
                        {project.status}
                      </p>
                    </div>
                    <span className="text-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded mt-1 sm:mt-0 print:bg-slate-100 print:text-slate-700">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mb-3">
                    {project.description}
                  </p>
                  <div className="grid md:grid-cols-2 gap-2 mb-3">
                    {project.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-1 text-sm">
                        <span className="text-emerald-600 dark:text-emerald-400 mt-0.5 print:text-emerald-600">•</span>
                        <span className="text-slate-700 dark:text-slate-300">{highlight}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded print:bg-slate-100 print:text-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-3">
                    {project.ghLink && (
                      <a
                        href={project.ghLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 print:text-emerald-600"
                      >
                        <Github size={16} />
                        Code
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 print:text-emerald-600"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {resumeData.certifications && resumeData.certifications.length > 0 && (
            <motion.section 
              variants={containerVariants} 
              initial="hidden" 
              animate="visible" 
              className="mb-8"
            >
              <motion.h2 
                variants={itemVariants} 
                className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-200"
              >
                Certifications
              </motion.h2>
              <div className="space-y-3">
                {resumeData.certifications.map((cert, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={itemVariants} 
                    className="border-l-4 border-emerald-600 pl-4 print:border-emerald-600"
                  >
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-200">
                      {cert}
                    </h3>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          <motion.div
            variants={itemVariants}
            className="mt-12 pt-6 border-t text-center text-sm text-slate-500 dark:text-slate-400"
          >
            <p>Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
            <p className="mt-1">
              © {new Date().getFullYear()} Rahul Verma. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Share Resume</AlertDialogTitle>
            <AlertDialogDescription>
              Choose a platform to share your resume
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid grid-cols-2 gap-2 py-4">
            {shareActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                onClick={action.action}
                className="flex items-center gap-2"
              >
                <action.icon className="h-4 w-4" />
                {action.label}
              </Button>
            ))}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}