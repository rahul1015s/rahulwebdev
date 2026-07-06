"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Menu,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

type NavItem = {
  label: string;
  href: string;
  icon?: ReactNode;
};  

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const hideForFocusMode = pathname.startsWith("/dashboard/focus");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY && y > 60);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  if (hideForFocusMode) {
    return null;
  }

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
      className="archive-nav"
    >
      <div className="archive-nav-inner">
        <Link
          href="/"
          className="archive-nav-brand"
        >
          <span className="archive-nav-kicker">Rahul Verma</span>
          <span className="archive-nav-title">Full Stack Developer</span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const isHash = item.href.startsWith("#");
            const isActive = !isHash && pathname === item.href;

            return (
              <button
                key={item.href}
                onClick={() => navigateTo(item.href)}
                className={`archive-nav-link ${isActive ? "archive-nav-link-active" : ""}`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="md:hidden flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="archive-nav-menu">
                <Menu size={22} />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="archive-nav-sheet"
            >
              <div className="flex flex-col h-full">
                <div className="archive-nav-sheet-header">
                  <div className="archive-nav-kicker">Rahul Verma</div>
                  <div className="archive-nav-title">Navigation</div>
                </div>

                <div className="flex-1 p-2 space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => navigateTo(item.href)}
                      className="archive-nav-mobile-link"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="archive-nav-sheet-footer">
                  <button
                    onClick={() => navigateTo("#contact")}
                    className="archive-nav-mobile-cta"
                  >
                    Contact Rahul
                    <ArrowUpRight className="h-4 w-4" />
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
