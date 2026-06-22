import {
  Mail,
  Github,
  Linkedin,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl transition-all duration-500" />
      </div>

      <div className="mx-auto max-w-5xl px-6 pt-28 pb-20">

        {/* Badge */}
        <div
          className="
            inline-flex items-center gap-2
            rounded-full border border-border
            bg-card/50 px-4 py-1.5
            text-xs text-muted-foreground
            transition-all duration-300
            hover:border-primary/40 hover:bg-card
          "
        >
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          Available for opportunities
        </div>

        {/* Name */}
        <h1 className="mt-6 text-4xl md:text-5xl font-semibold leading-tight">
          Rahul{" "}
          <span className="text-primary transition-colors duration-300 hover:text-primary/80">
            Verma
          </span>
        </h1>

        {/* Role */}
        <p className="mt-3 text-lg text-muted-foreground">
          Full Stack Developer
        </p>

        {/* Location */}
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          India (IST)
        </div>

        {/* Summary */}
        <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
          Full Stack Developer focused on building scalable web applications
          using React, Next.js, Node.js, and MongoDB.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            asChild
            className="
              gap-2
              transition-all duration-200
              hover:-translate-y-[1px]
              hover:shadow-sm
              active:scale-[0.97]
            "
          >
            <a href="mailto:hello@rahulwebdev.in">
              <Mail className="h-4 w-4" />
              Contact
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            className="
              gap-2
              transition-all duration-200
              hover:-translate-y-[1px]
              active:scale-[0.97]
            "
          >
            <a href="https://wa.me/919135271562" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </Button>

          <Button
            asChild
            variant="ghost"
            className="transition-transform hover:scale-110"
          >
            <a
              href="https://github.com/rahul1015s"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Rahul Verma GitHub profile"
            >
              <Github className="h-4 w-4" />
            </a>
          </Button>

          <Button
            asChild
            variant="ghost"
            className="transition-transform hover:scale-110"
          >
            <a
              href="https://linkedin.com/in/rahul1015s"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Rahul Verma LinkedIn profile"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
