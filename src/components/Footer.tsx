"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "เกี่ยวกับเรา", href: "/about" },
      { name: "ติดต่อเรา", href: "/contact" },
      { name: "นโยบายความเป็นส่วนตัว", href: "/privacy" },
      { name: "เงื่อนไขการใช้งาน", href: "/terms" },
    ],
    products: [
      { name: "สินค้าทั้งหมด", href: "/products" },
      { name: "หมวดหมู่", href: "/categories" },
      { name: "สินค้าใหม่", href: "/products?filter=new" },
      { name: "โปรโมชั่น", href: "/products?filter=promo" },
    ],
    support: [
      { name: "คำถามที่พบบ่อย", href: "/faq" },
      { name: "การจัดส่ง", href: "/shipping" },
      { name: "การคืนสินค้า", href: "/returns" },
      { name: "การสนับสนุน", href: "/support" },
    ],
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "#",
      color: "hover:text-blue-500",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "#",
      color: "hover:text-pink-500",
    },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-blue-400" },
  ];

  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-lime-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-lime-400 mb-4">podzoon</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Discover premium products with modern design and exceptional
              quality at podzoon.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-lime-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">+66 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-lime-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">
                  support@podzoon.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-lime-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">
                  กรุงเทพฯ ประเทศไทย
                </span>
              </div>
            </div>
          </motion.div>

          {/* Company links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4 text-white">บริษัท</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-lime-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Product links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4 text-white">สินค้า</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-lime-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4 text-white">
              การสนับสนุน
            </h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-lime-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social links */}
            <div className="mt-6">
              <h5 className="text-sm font-medium mb-3 text-white">ติดตามเรา</h5>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`text-gray-400 ${social.color} transition-colors duration-200`}
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Newsletter signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-slate-800 rounded-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-semibold mb-2 text-white">
                รับข่าวสารและโปรโมชั่น
              </h4>
              <p className="text-gray-300 text-sm">
                สมัครรับข่าวสารเพื่อรับข้อมูลสินค้าใหม่และส่วนลดพิเศษ
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="กรอกอีเมลของคุณ"
                className="flex-1 md:w-64 px-4 py-2 bg-slate-700 border border-slate-600 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
              />
              <button className="px-6 py-2 bg-lime-500 hover:bg-lime-600 text-black font-medium rounded-r-lg transition-colors duration-200">
                สมัคร
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-slate-700 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} podzoon. สงวนลิขสิทธิ์ทั้งหมด.
            </div>
            <div className="flex items-center space-x-6">
              <Link
                href="/admin"
                className="text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors"
              >
                Admin Panel
              </Link>
              <div className="text-gray-500 text-sm">
                Made with ❤️ for vaping enthusiasts
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
