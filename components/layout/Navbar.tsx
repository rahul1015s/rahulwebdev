"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
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

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  if (href.startsWith("/#")) {
    return pathname === "/";
  }

  return pathname === href;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Services", href: "/services" },
  { label: "Patna SEO", href: "/freelance-web-developer-patna" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
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

  return (
    <motion.nav
      animate={hidden ? { y: -80 } : { y: 0 }}
      transition={{ duration: 0.25 }}
      className="archive-nav"
    >
      <div className="archive-nav-inner">
        <div
          aria-hidden="true"
          className="archive-nav-brand invisible pointer-events-none select-none"
        >
          <span className="archive-nav-kicker">Rahul Verma</span>
          <span className="archive-nav-title">Full Stack Developer</span>
        </div>

        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`archive-nav-link ${isActive ? "archive-nav-link-active" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="md:hidden flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                size="icon" 
                variant="ghost" 
                className="archive-nav-menu"
                aria-label="Toggle navigation menu"
              >
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
                    <Link
                      key={item.href}
                      href={item.href}
                      className="archive-nav-mobile-link"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                <div className="archive-nav-sheet-footer">
                  <Link
                    href="/#contact"
                    className="archive-nav-mobile-cta"
                  >
                    Contact Rahul
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
