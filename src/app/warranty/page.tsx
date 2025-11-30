"use client";

import { motion } from "framer-motion";

export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-4 text-card-foreground"
          >
            การรับประกันสินค้า
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground"
          >
            นโยบายการรับประกันและการบริการหลังการขาย
          </motion.p>
        </div>
      </section>

      {/* Warranty Content */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-card p-8 rounded-lg shadow-lg mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4 text-card-foreground">นโยบายการรับประกัน</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• รับประกันสินค้าคุณภาพและความพอใจ</li>
              <li>• บริการซ่อมแซมฟรีภายในระยะเวลาประกัน</li>
              <li>• แทนที่สินค้าใหม่ในกรณีสินค้าชำรุด</li>
              <li>• บริการลูกค้าทุกวัน จันทร์-เสาร์</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-4 text-card-foreground">ติดต่อเรา</h2>
            <p className="text-muted-foreground mb-4">
              หากมีปัญหาเกี่ยวกับสินค้า สามารถติดต่อเราได้ทาง Line
            </p>
            <p className="text-primary font-semibold">
              Line ID: @podzone
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
