"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/providers/ThemeProvider";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, FileText, Folder, Wrench, User, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { JSX } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: JSX.Element;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: <Home size={18} /> },
  { label: "Blog", href: "/blog", icon: <FileText size={18} /> },
  { label: "Projects", href: "#projects", icon: <Folder size={18} /> },
  { label: "Skills", href: "#skills", icon: <Wrench size={18} /> },
  { label: "About", href: "#about", icon: <User size={18} /> },
  { label: "Contact", href: "#contact", icon: <Mail size={18} /> },
];

export default function Navbar() {
  const pathname = usePathname() ?? "/";
  const [hidden, setHidden] = useState<boolean>(false);
  const [lastY, setLastY] = useState<number>(0);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      
      if (currentY > lastY && currentY > 60) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
      setScrolled(currentY > 10);
      setLastY(currentY);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  const handleHashClick = (href: string): void => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleMobileHashClick = (href: string): void => {
    handleHashClick(href);
    // Close the mobile menu
    const openSheet = document.querySelector('[data-state="open"]');
    if (openSheet) {
      (openSheet as HTMLElement).click();
    }
  };

  return (
    <motion.nav
      animate={hidden ? { y: -80 } : { y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`
        fixed top-0 left-0 w-full z-50
        border-b bg-white/90 dark:bg-gray-900/90 backdrop-blur-md
        supports-[backdrop-filter]:backdrop-blur-md
        transition-all duration-300
        ${scrolled ? "shadow-sm" : ""}
      `}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href="/"
            className="text-lg font-semibold text-foreground flex items-center gap-2 group"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-emerald-500/10 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <span className="text-emerald-600 relative lg:hidden">RV</span>
            </div>
            <span className="hidden sm:inline">Rahul Verma</span>
          </Link>
        </motion.div>

        {/* Desktop Menu - Minimal */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item: NavItem) => {
            const isHash = item.href.startsWith("#");
            const isActive = !isHash && pathname === item.href;
            
            return (
              <motion.div
                key={item.href}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                {isHash ? (
                  <button
                    onClick={() => handleHashClick(item.href)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-emerald-600 transition-colors group"
                    type="button"
                  >
                    <motion.div
                      animate={{ scale: isActive ? 1.1 : 1 }}
                      transition={{ duration: 0.2 }}
                      className="text-current"
                    >
                      {item.icon}
                    </motion.div>
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors group relative"
                  >
                    <motion.div
                      animate={{ scale: isActive ? 1.1 : 1 }}
                      transition={{ duration: 0.2 }}
                      className={isActive ? "text-emerald-600" : "text-muted-foreground group-hover:text-emerald-600"}
                    >
                      {item.icon}
                    </motion.div>
                    <span className={isActive ? "text-emerald-600 font-medium" : "text-muted-foreground group-hover:text-emerald-600"}>
                      {item.label}
                    </span>
                    
                    {isActive && (
                      <motion.div
                        layoutId="active-nav"
                        className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-emerald-600 rounded-full"
                      />
                    )}
                  </Link>
                )}
              </motion.div>
            );
          })}
          
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu - Enhanced for small screens */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="relative">
                <Menu size={22} />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-[280px] p-0 border-l bg-white/95 dark:bg-gray-900/95 backdrop-blur-md"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <Link href="/" className="text-lg font-semibold">
                      Rahul Verma
                    </Link>
                    <span className="text-xs px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full">
                      Available
                    </span>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="flex-1 p-4">
                  {navItems.map((item: NavItem, i: number) => {
                    const isHash = item.href.startsWith("#");
                    const isActive = !isHash && pathname === item.href;

                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        {isHash ? (
                          <button
                            onClick={() => handleMobileHashClick(item.href)}
                            className="w-full flex items-center gap-3 p-3 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            type="button"
                          >
                            <div className={isActive ? "text-emerald-600" : "text-muted-foreground"}>
                              {item.icon}
                            </div>
                            <span className={isActive ? "text-emerald-600 font-medium" : "text-foreground"}>
                              {item.label}
                            </span>
                          </button>
                        ) : (
                          <Link
                            href={item.href}
                            className="w-full flex items-center gap-3 p-3 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
                          >
                            <div className={isActive ? "text-emerald-600" : "text-muted-foreground"}>
                              {item.icon}
                            </div>
                            <span className={isActive ? "text-emerald-600 font-medium" : "text-foreground"}>
                              {item.label}
                            </span>
                            {isActive && (
                              <div className="absolute right-4 w-2 h-2 bg-emerald-600 rounded-full" />
                            )}
                          </Link>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="p-4 border-t">
                  <Link
                    href="#contact"
                    onClick={() => handleMobileHashClick("#contact")}
                    className="w-full px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg flex items-center justify-center transition-colors"
                  >
                    Get In Touch
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