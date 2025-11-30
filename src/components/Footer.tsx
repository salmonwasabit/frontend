"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  MessageCircle,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();



  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-4">
              <img
                src="/logo.webp"
                alt="PODZOON By Cake"
                className="h-8 w-auto"
              />
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
              เราเป็นร้านขายบุหรี่ไฟฟ้าที่มีหลากหลายยี่ห้อให้คุณเลือก มีบริการส่งด่วนในพื้นที่กรุงเทพทุกวัน
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">@podzone</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  กรุงเทพฯ ประเทศไทย
                </span>
              </div>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-semibold mb-4 text-foreground uppercase tracking-wider">เมนู</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  หน้าแรก
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  สินค้าทั้งหมด
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  รีวิว
                </Link>
              </li>
              <li>
                <Link
                  href="/warranty"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  การรับประกัน
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-semibold mb-4 text-foreground uppercase tracking-wider">สนับสนุน</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/shipping"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  การจัดส่ง
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  การคืนสินค้า
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground text-sm">
                  จันทร์-เสาร์: 9:00-18:00
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-semibold mb-4 text-foreground uppercase tracking-wider">ข้อมูล</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  นโยบายความเป็นส่วนตัว
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  เงื่อนไขการใช้งาน
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground text-sm">
                  สั่งซื้อผ่าน Line เท่านั้น
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-border pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-muted-foreground text-sm mb-4 md:mb-0 flex items-center">
              <img
                src="/logo.webp"
                alt="PODZOON By Cake"
                className="h-4 w-auto mr-2"
              />
              © {currentYear} สงวนลิขสิทธิ์ทั้งหมด.
            </div>
            <div className="flex items-center space-x-6">
              {process.env.NODE_ENV === 'development' && (
                <Link
                  href="/admin"
                  className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                >
                  Admin
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
