"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function AboutSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="about" className="py-24">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* Image Section with Elegant Micro-interactions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto w-64 h-64 md:w-80 md:h-80"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Animated Background Glow */}
          <motion.div 
            className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/20 via-cyan-400/15 to-transparent blur-2xl"
            animate={{ 
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 180 : 0,
              opacity: isHovered ? 0.3 : 0.2
            }}
            transition={{ 
              scale: { duration: 0.5 },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" }
            }}
          />

          {/* Pulsing Ring Effect */}
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-emerald-400/30"
            animate={{ 
              scale: isHovered ? [1, 1.15, 1] : 1,
              opacity: isHovered ? [0.3, 0.6, 0.3] : 0
            }}
            transition={{ 
              duration: 2,
              repeat: isHovered ? Infinity : 0
            }}
          />

          {/* Floating Orbital Dots */}
          {isHovered && (
            <>
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400"
                  initial={{ 
                    scale: 0,
                    opacity: 0
                  }}
                  animate={{ 
                    scale: [0, 1, 0.8, 1],
                    x: Math.cos(i * 90) * 70,
                    y: Math.sin(i * 90) * 70,
                    opacity: [0, 1, 0.8, 1],
                    rotate: 360
                  }}
                  transition={{ 
                    duration: 3,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    boxShadow: "0 0 10px rgba(34, 197, 94, 0.5)"
                  }}
                />
              ))}
            </>
          )}

          {/* Main Image Container */}
          <motion.div 
            className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/90 shadow-2xl cursor-pointer"
            animate={{ 
              scale: isHovered ? 1.05 : 1,
              borderColor: isHovered ? "rgba(34, 197, 94, 0.8)" : "rgba(255, 255, 255, 0.9)",
              boxShadow: isHovered 
                ? "0 25px 50px -12px rgba(34, 197, 94, 0.4), 0 0 30px rgba(34, 197, 94, 0.3)" 
                : "0 20px 40px -10px rgba(0, 0, 0, 0.2)"
            }}
            transition={{ 
              duration: 0.3
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shine Effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"
              initial={{ x: "-100%" }}
              animate={{ x: isHovered ? "100%" : "-100%" }}
              transition={{ 
                duration: 1,
                repeat: isHovered ? Infinity : 0,
                repeatDelay: 1
              }}
            />
            
            {/* Main Image */}
            <motion.img
              src="/rahul.jpg"
              alt="Rahul Verma"
              className="w-full h-full object-cover relative z-0"
              animate={{ 
                scale: isHovered ? 1.1 : 1,
                filter: isHovered ? "brightness(1.05) saturate(1.1)" : "brightness(1) saturate(1)"
              }}
              transition={{ duration: 0.5 }}
              onError={(e) => {
                const t = e.currentTarget as HTMLImageElement;
                t.src = '/default-blog.png';
              }}
            />
            
            {/* Subtle Color Overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-emerald-900/15 via-transparent to-transparent z-5"
              animate={{ opacity: isHovered ? 0.2 : 0 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Inner Glow Ring */}
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-white/30"
              animate={{ 
                scale: isHovered ? 0.95 : 1,
                opacity: isHovered ? 0.8 : 0.5
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Top Right Accent */}
          {/* <motion.div 
            className="absolute -top-2 -right-2 z-20"
            animate={{ 
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? 1.2 : 1
            }}
            transition={{ duration: 0.8 }}
          >
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full shadow-lg">
              <motion.div
                animate={{ 
                  rotate: isHovered ? [0, 10, -10, 0] : 0,
                  scale: isHovered ? [1, 1.2, 1] : 1
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: isHovered ? Infinity : 0
                }}
                className="w-3 h-3 bg-white rounded-full"
              />
            </div>
          </motion.div> */}

          {/* Bottom Label */}
          {/* <motion.div 
            className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 z-20"
            animate={{ 
              y: isHovered ? [0, -3, 0] : 0,
              scale: isHovered ? 1.05 : 1
            }}
            transition={{ 
              duration: 1.5,
              repeat: isHovered ? Infinity : 0
            }}
          >
            <div className="px-3 py-1 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-xs font-medium rounded-full shadow-lg">
              <motion.span
                animate={{ opacity: isHovered ? [0.8, 1, 0.8] : 1 }}
                transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
              >
                Hover me
              </motion.span>
            </div>
          </motion.div> */}
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            About <span className="text-emerald-600">Me</span>
          </h2>

          <p className="text-muted-foreground leading-relaxed text-lg mb-4">
            I'm Rahul Verma, a self-taught Full Stack Developer currently pursuing my MCA(Master of Computer Applications).
            I transitioned from an Art History background into software development - a shift
            that strengthened my creativity, attention to detail, and ability to think from
            multiple perspectives.
          </p>

          <p className="text-muted-foreground leading-relaxed text-lg mb-4">
            I specialize in building modern, scalable applications using React, Next.js,
            Node.js, and MongoDB. I enjoy creating clean UI, intuitive user experiences,
            and solving real-world problems through well-designed products.
          </p>

          <p className="text-muted-foreground leading-relaxed text-lg">
            I'm constantly learning, shipping projects, and collaborating on meaningful work.
            My goal is to join a team where I can contribute to impactful applications
            while continuing to grow as a developer.
          </p>
        </motion.div>
      </div>
    </section>
  );
}