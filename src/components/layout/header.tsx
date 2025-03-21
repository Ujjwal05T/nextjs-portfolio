"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FiMenu, FiX } from "react-icons/fi";

const NavItems = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Projects", link: "/projects" },
  { name: "Contact", link: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState("/");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Set active item based on current pathname
  useEffect(() => {
    const path = pathname === "/" ? "/" : pathname;
    const matchingItem = NavItems.find(item => item.link === path);
    if (matchingItem) {
      setActiveItem(matchingItem.link);
    }
  }, [pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="fixed w-full z-50 top-0 left-0 right-0 transition-all duration-300">
      <div className="flex justify-center px-4 sm:px-0">
        {/* Desktop Navigation */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={cn(
            "hidden sm:block fixed top-4 inset-x-0 max-w-fit mx-auto border border-zinc-800 rounded-full bg-black/70 backdrop-blur-md z-[100] px-3 py-1.5",
            scrolled ? "shadow-lg shadow-black/20" : ""
          )}
        >
          <nav className="flex justify-center space-x-1 sm:space-x-2 md:space-x-4">
            {NavItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                onClick={() => setActiveItem(item.link)}
                className={cn(
                  "relative px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  activeItem === item.link
                    ? "text-white"
                    : "text-zinc-400 hover:text-white"
                )}
              >
                {activeItem === item.link && (
                  <motion.div
                    layoutId="desktop-pill"
                    transition={{
                      type: "spring",
                      bounce: 0.25,
                      duration: 0.5,
                    }}
                    className="absolute inset-0 bg-zinc-800 rounded-full"
                    style={{ zIndex: -1 }}
                  />
                )}
                {item.name}
              </Link>
            ))}
          </nav>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cn(
            "sm:hidden fixed top-4 right-4 z-[100]",
            "h-10 w-10 rounded-full bg-black/80 border border-zinc-800 backdrop-blur-md flex items-center justify-center",
            scrolled ? "shadow-lg shadow-black/20" : ""
          )}
        >
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            className="text-zinc-300 focus:outline-none w-full h-full flex items-center justify-center"
          >
            {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Navigation Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-40 sm:hidden flex flex-col items-center justify-center"
          >
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex flex-col items-center space-y-5"
            >
              {NavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  onClick={() => {
                    setActiveItem(item.link);
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    "relative px-8 py-3 rounded-full text-lg font-medium transition-all",
                    activeItem === item.link
                      ? "text-white bg-zinc-800/80"
                      : "text-zinc-400 hover:text-white"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </motion.nav>
            
            {/* Social links in mobile menu (optional) */}
            <div className="mt-12 flex gap-4">
              <a
                href="https://github.com/Ujjwal05T"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/ujjwal-tamrakar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}