"use client";
import { useAuth } from "@/lib/AuthContext";

import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { useState, useEffect } from "react";

export default function Header() {
  const { isLoggedIn } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position to change header style
  useEffect(() => {
    const updateScrolled = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", updateScrolled);
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/98 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img
            src="/logo.webp"
            alt="PODZOON By Cake"
            className="h-8 w-auto hover:scale-105 transition-all duration-200"
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors relative group ${
              isScrolled
                ? "text-muted-foreground hover:text-foreground"
                : "text-white/80 hover:text-white"
            }`}
          >
            หน้าแรก
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${
              isScrolled ? "w-0" : "w-full"
            }`}></span>
          </Link>
          <Link
            href="/products"
            className={`text-sm font-medium transition-colors relative group ${
              isScrolled
                ? "text-muted-foreground hover:text-foreground"
                : "text-white/80 hover:text-white"
            }`}
          >
            สินค้าทั้งหมด
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/reviews"
            className={`text-sm font-medium transition-colors relative group ${
              isScrolled
                ? "text-muted-foreground hover:text-foreground"
                : "text-white/80 hover:text-white"
            }`}
          >
            รีวิว
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/warranty"
            className={`text-sm font-medium transition-colors relative group ${
              isScrolled
                ? "text-muted-foreground hover:text-foreground"
                : "text-white/80 hover:text-white"
            }`}
          >
            การรับประกัน
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          {isLoggedIn && (
            <Link
              href="/admin"
              className={`text-sm font-medium transition-colors ${
                isScrolled
                  ? "text-orange-600 hover:text-orange-700"
                  : "text-orange-400 hover:text-orange-300"
              }`}
            >
              Admin
            </Link>
          )}
        </nav>

      {/* Mobile menu button */}
      <button className={`md:hidden p-2 rounded-md transition-colors ${
        isScrolled
          ? "text-muted-foreground hover:text-foreground hover:bg-accent"
          : "text-white/80 hover:text-white hover:bg-white/10"
      }`}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="transition-transform duration-200"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
      </div>
    </motion.header>
  );
}
