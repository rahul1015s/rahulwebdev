"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto w-64 h-64 md:w-80 md:h-80"
        >
          {/* Glow behind the image */}
          <div className="absolute inset-0 rounded-full bg-emerald-300/20 blur-2xl"></div>

          {/* Circular Image */}
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
            <img
              src="/rahul.jpg"
              alt="Rahul Verma"
              className="w-full h-full object-cover"
              onError={(e) => {
                const t = e.currentTarget as HTMLImageElement;
                t.src = '/default-blog.png';
              }}
            />
          </div>
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
            I'm Rahul Verma, a self-taught Full Stack Developer currently pursuing my MCA.
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
