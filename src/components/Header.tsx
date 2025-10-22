"use client";
import { useAuth } from "@/lib/AuthContext";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
  const { isLoggedIn } = useAuth();
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50 header-bg"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          VAPE LIFE
        </Link>

        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/products" className="text-foreground hover:text-primary transition-colors">
            Products
          </Link>
          <Link href="/categories" className="text-foreground hover:text-primary transition-colors">
            Categories
          </Link>
          <Link href="/about" className="text-foreground hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
            Contact
          </Link>
          {isLoggedIn && (
            <Link href="/admin" className="text-orange-500 hover:text-orange-600 font-semibold transition-colors">
              Admin
            </Link>
          )}
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden text-foreground">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </motion.header>
  );
}