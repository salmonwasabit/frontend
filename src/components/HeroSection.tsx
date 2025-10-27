"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black overflow-hidden">
      <div className="absolute inset-0 bg-[url('/smoke-bg.jpg')] opacity-20 bg-cover bg-center"></div>
      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-lime-400 via-green-400 to-lime-600 bg-clip-text text-transparent mb-6 gradient-text"
          style={{ textShadow: "0 0 20px rgba(0, 255, 0, 0.5)" }}
        >
          podzoon
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-300 mb-8"
        >
          Premium experience for modern lifestyle
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/products"
            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/80 transition-colors shadow-lg shadow-primary/50"
          >
            ซื้อเลย
          </Link>
          <Link
            href="/about"
            className="px-8 py-4 border border-accent text-accent rounded-lg font-semibold text-lg hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            เรียนรู้เพิ่มเติม
          </Link>
        </motion.div>
      </div>
      {/* Neon glow effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-lime-500 rounded-full opacity-20 blur-3xl animate-pulse neon-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full opacity-20 blur-3xl animate-pulse delay-1000 neon-glow"></div>
    </section>
  );
}
