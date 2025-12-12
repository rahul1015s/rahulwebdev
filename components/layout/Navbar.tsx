"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/providers/ThemeProvider";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const pathname = usePathname() ?? "/";

  // Hide/Show navbar on scroll
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      // Hide on scroll down
      if (currentY > lastY && currentY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastY(currentY);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <motion.nav
      animate={hidden ? { y: -90 } : { y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="
        fixed top-0 left-0 w-full z-50
        border-b bg-card/70 backdrop-blur-xl
        shadow-[0_8px_20px_-5px_rgba(0,0,0,0.15)]
        supports-[backdrop-filter]:backdrop-blur-xl
      "
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Brand */}
        <Link
          href="/"
          className="text-xl font-semibold text-foreground hover:text-emerald-600 transition"
        >
          Rahul Verma
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isHash = item.href.startsWith("#");
            const isActive =
              !isHash &&
              (pathname === item.href ||
                pathname.startsWith(item.href + "/"));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium relative transition
                  ${
                    isActive
                      ? "text-emerald-600"
                      : "text-muted-foreground hover:text-emerald-600"
                  }
                `}
              >
                {item.label}

                {/* Active indicator */}
                {isActive && (
                  <motion.span
                    layoutId="active-nav"
                    className="absolute left-0 -bottom-1 w-full h-0.5 bg-emerald-600 rounded-full"
                  />
                )}
              </Link>
            );
          })}

          <ThemeToggle />
        </div>

        {/* MOBILE MENU */}
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost" className="md:hidden">
              <Menu size={24} className="text-foreground" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="
              w-72 border-l bg-card/80 backdrop-blur-xl 
              shadow-xl flex flex-col justify-between
            "
          >
            <div className="flex flex-col gap-8 p-6">

              {/* Close Button */}
              <button className="self-end mb-4">
                <X className="text-muted-foreground hover:text-foreground transition" />
              </button>

              {/* Mobile Nav Items */}
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={item.href}
                    className="
                      text-lg font-medium text-foreground 
                      hover:text-emerald-600 transition block
                    "
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <div className="h-px bg-muted/40 my-4"></div>

              {/* Theme Switch */}
              <ThemeToggle />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.nav>
  );
}
