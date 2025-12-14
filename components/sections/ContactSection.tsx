"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, Sparkles, Zap, MessageSquare, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import NewsletterForm from "../newsletter/NewsletterForm";

export default function ContactSection() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [isHoveringConnect, setIsHoveringConnect] = useState(false);

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background floating elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"
          animate={{ 
            x: [0, 20, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{ 
            x: [0, -20, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center">
        
        {/* Header with animated sparkles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <MessageSquare className="w-6 h-6 text-emerald-600" />
            </motion.div>
            <span className="text-sm font-medium text-emerald-600">Get In Touch</span>
          </div>
          
          <motion.h2
            className="text-3xl md:text-4xl font-bold inline-block"
            onMouseEnter={() => setIsHoveringConnect(true)}
            onMouseLeave={() => setIsHoveringConnect(false)}
          >
            Let's{" "}
            <motion.span 
              className="text-emerald-600 inline-block relative"
              animate={{ scale: isHoveringConnect ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Connect
              {/* Animated underline */}
              <motion.span 
                className="absolute -bottom-2 left-0 h-0.5 bg-emerald-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: isHoveringConnect ? "100%" : 0 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Floating sparkles */}
              {isHoveringConnect && (
                <>
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 bg-emerald-400 rounded-full"
                      initial={{ 
                        scale: 0,
                        y: 0,
                        x: 0
                      }}
                      animate={{ 
                        scale: [0, 1, 0],
                        y: [-20, -40],
                        x: Math.random() * 20 - 10
                      }}
                      transition={{ 
                        duration: 1,
                        delay: i * 0.2,
                        repeat: Infinity
                      }}
                      style={{
                        left: `${30 + i * 20}%`,
                        bottom: "-10px"
                      }}
                    />
                  ))}
                </>
              )}
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* Subtext with subtle animation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          <motion.p
            className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12 relative z-10"
            whileHover={{ scale: 1.01 }}
          >
            Whether you're looking to hire, collaborate, or just want to say hi 
            I'd love to hear from you. I usually respond within 24 hours.
          </motion.p>
          
          {/* Decorative quote marks */}
          <motion.div 
            className="absolute -top-4 -left-4 text-4xl text-emerald-500/20"
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            "
          </motion.div>
          <motion.div 
            className="absolute -bottom-4 -right-4 text-4xl text-emerald-500/20"
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          >
            "
          </motion.div>
        </motion.div>

        {/* Buttons with enhanced interactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 relative"
        >
          {/* WhatsApp Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setHoveredButton("whatsapp")}
            onHoverEnd={() => setHoveredButton(null)}
            className="relative"
          >
            <Button asChild size="lg" className="gap-2 relative overflow-hidden group bg-green-600 hover:bg-green-700">
              <Link href="https://wa.me/919135271562?text=Hi%20Rahul,%20I%20saw%20your%20portfolio" target="_blank">
                {/* Button shine effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: hoveredButton === "whatsapp" ? "100%" : "-100%" }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Icon animation */}
                <motion.div
                  animate={{ 
                    scale: hoveredButton === "whatsapp" ? 1.2 : 1,
                    y: hoveredButton === "whatsapp" ? [0, -3, 0] : 0
                  }}
                  transition={{ 
                    scale: { duration: 0.2 },
                    y: { duration: 0.8, repeat: hoveredButton === "whatsapp" ? Infinity : 0 }
                  }}
                >
                  <MessageCircle size={18} />
                </motion.div>
                
                <span className="relative z-10">WhatsApp</span>
                
                {/* Online indicator */}
                <motion.div 
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                  animate={{ 
                    scale: hoveredButton === "whatsapp" ? [1, 1.5, 1] : 1,
                    boxShadow: hoveredButton === "whatsapp" 
                      ? "0 0 10px 2px rgba(74, 222, 128, 0.8)" 
                      : "0 0 0px 0px rgba(74, 222, 128, 0)"
                  }}
                  transition={{ duration: 0.8, repeat: hoveredButton === "whatsapp" ? Infinity : 0 }}
                />
              </Link>
            </Button>
          </motion.div>

          {/* Email Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setHoveredButton("email")}
            onHoverEnd={() => setHoveredButton(null)}
            className="relative"
          >
            <Button asChild size="lg" variant="outline" className="gap-2 relative overflow-hidden group">
              <Link href="mailto:rahulwebjs@gmail.com">
                {/* Outline glow effect */}
                <motion.div 
                  className="absolute -inset-0.5 border-2 border-emerald-500/30 rounded-lg opacity-0"
                  animate={{ opacity: hoveredButton === "email" ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                />
                
                {/* Icon animation */}
                <motion.div
                  animate={{ 
                    scale: hoveredButton === "email" ? 1.2 : 1,
                    y: hoveredButton === "email" ? [0, -2, 0] : 0
                  }}
                  transition={{ 
                    scale: { duration: 0.2 },
                    y: { duration: 1, repeat: hoveredButton === "email" ? Infinity : 0 }
                  }}
                >
                  <Mail size={18} />
                </motion.div>
                
                <span className="relative z-10">Email</span>
              </Link>
            </Button>
          </motion.div>

          {/* LinkedIn Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setHoveredButton("linkedin")}
            onHoverEnd={() => setHoveredButton(null)}
            className="relative"
          >
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 relative overflow-hidden group"
            >
              <Link href="https://www.linkedin.com/in/rahul1015s" target="_blank">
                {/* Outline glow effect */}
                <motion.div 
                  className="absolute -inset-0.5 border-2 border-blue-500/30 rounded-lg opacity-0"
                  animate={{ opacity: hoveredButton === "linkedin" ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                />
                
                {/* Icon animation */}
                <motion.div
                  animate={{ 
                    rotate: hoveredButton === "linkedin" ? [0, 5, -5, 0] : 0,
                    scale: hoveredButton === "linkedin" ? 1.2 : 1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Linkedin size={18} />
                </motion.div>
                
                <span className="relative z-10">LinkedIn</span>
              </Link>
            </Button>
          </motion.div>

          {/* GitHub Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setHoveredButton("github")}
            onHoverEnd={() => setHoveredButton(null)}
            className="relative"
          >
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 relative overflow-hidden group"
            >
              <Link href="https://github.com/rahul1015s" target="_blank">
                {/* Outline glow effect */}
                <motion.div 
                  className="absolute -inset-0.5 border-2 border-gray-700/30 dark:border-gray-300/30 rounded-lg opacity-0"
                  animate={{ opacity: hoveredButton === "github" ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                />
                
                {/* Icon rotation */}
                <motion.div
                  animate={{ 
                    rotate: hoveredButton === "github" ? 360 : 0,
                    scale: hoveredButton === "github" ? 1.2 : 1
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <Github size={18} />
                </motion.div>
                
                <span className="relative z-10">GitHub</span>
                
                {/* Star indicator */}
                <motion.div 
                  className="absolute -top-1 -right-1"
                  animate={{ 
                    scale: hoveredButton === "github" ? [1, 1.3, 1] : 1,
                    rotate: hoveredButton === "github" ? [0, 180, 360] : 0
                  }}
                  transition={{ duration: 0.8, repeat: hoveredButton === "github" ? Infinity : 0 }}
                >
                  <Zap className="w-3 h-3 text-amber-500" />
                </motion.div>
              </Link>
            </Button>
          </motion.div>
        </motion.div>


        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 p-6 bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 rounded-2xl border border-emerald-200/50 dark:border-emerald-800/50 max-w-lg mx-auto"
        >
          <motion.p 
            className="text-emerald-800 dark:text-emerald-200 font-medium pb-2"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💬 Prefer instant messaging? WhatsApp me for the quickest response!
          </motion.p>

          <NewsletterForm variant="inline" location="portfolio" />
        </motion.div>

        

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-muted-foreground text-sm">
            <span>© {new Date().getFullYear()} Rahul Verma. All rights reserved.</span>
            <motion.div 
              className="hidden md:block w-1 h-1 bg-emerald-500 rounded-full mx-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1 hover:text-emerald-600 transition-colors cursor-pointer"
            >
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="text-red-500">❤️</span>
              </motion.div>
              <span>by Rahul</span>
            </motion.div>
          </div>
          
          {/* Bottom sparkle */}
          <motion.div 
            className="mt-4"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 text-emerald-400/50 mx-auto" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}