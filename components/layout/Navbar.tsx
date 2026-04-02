"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "@/providers/ThemeProvider";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Home,
  FileText,
  Folder,
  Wrench,
  User,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";
import { NavAccentSVG } from "@/components/nav/NavAccentSVG";

type NavItem = {
  label: string;
  href: string;
  icon: ReactNode;
};  

const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: <Home size={18} /> },
  { label: "Blog", href: "/blog", icon: <FileText size={18} /> },
  { label: "Projects", href: "#projects", icon: <Folder size={18} /> },
  { label: "Skills", href: "#skills", icon: <Wrench size={18} /> },
  { label: "About", href: "#about", icon: <User size={18} /> },
  { label: "Contact", href: "#contact", icon: <Mail size={18} /> },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY && y > 60);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  /** 🔑 Handles section navigation from ANY page */
  const navigateTo = (href: string) => {
    if (!href.startsWith("#")) {
      router.push(href);
      return;
    }

    if (pathname !== "/") {
      router.push(`/${href}`);
      return;
    }

    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      animate={hidden ? { y: -80 } : { y: 0 }}
      transition={{ duration: 0.25 }}
      className="
        fixed top-0 left-0 z-50 w-full
        border-b border-border
        bg-background/80 backdrop-blur
      "
    >
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="font-semibold text-foreground hover:text-primary transition"
        >
          Rahul Verma
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isHash = item.href.startsWith("#");
            const isActive =
              !isHash && pathname === item.href;

            return (
              <button
                key={item.href}
                onClick={() => navigateTo(item.href)}
                className={`
                  relative flex items-center gap-2 px-3 py-2
                  text-sm font-medium rounded-lg
                  transition-colors
                  ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }
                `}
              >
                {item.icon}
                {item.label}

                {isActive && <NavAccentSVG />}
              </button>
            );
          })}

          <ThemeToggle />
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />

          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost">
                <Menu size={22} />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-background border-l border-border"
            >
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-border font-semibold">
                  Rahul Verma
                </div>

                <div className="flex-1 p-2 space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => navigateTo(item.href)}
                      className="
                        w-full flex items-center gap-3
                        px-3 py-2 rounded-lg
                        text-sm font-medium
                        text-foreground
                        hover:bg-muted
                      "
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="p-4 border-t border-border">
                  <button
                    onClick={() => navigateTo("#contact")}
                    className="
                      w-full rounded-lg
                      bg-primary text-primary-foreground
                      py-2 text-sm font-medium
                    "
                  >
                    Get in touch
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
