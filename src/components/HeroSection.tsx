"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.1),transparent_70%)]"></div>
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <img
            src="/logo.webp"
            alt="PODZOON By Cake"
            className="h-16 md:h-24 w-auto mx-auto"
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto"
        >
          เราเป็นร้านขายบุหรี่ไฟฟ้าที่มีหลากหลายยี่ห้อให้คุณเลือก มีบริการส่งด่วนในพื้นที่กรุงเทพทุกวัน
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/products"
            className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all duration-200 hover:shadow-lg hover:shadow-primary/25 hover:scale-105"
          >
            ซื้อเลย
          </Link>
          <Link
            href="/warranty"
            className="px-8 py-4 border border-border text-foreground rounded-xl font-semibold text-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105"
          >
            การรับประกัน
          </Link>
        </motion.div>
      </div>

      {/* Subtle background elements */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
    </section>
  );
}
