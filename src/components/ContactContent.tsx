"use client";

import { motion } from "framer-motion";
import LineButton from "@/components/LineButton";

export default function ContactContent() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6 text-card-foreground"
          >
            ติดต่อเรา
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground"
          >
            ติดต่อทีมงานของเรา
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-4">ติดต่อเรา</h2>
                <p className="text-muted-foreground mb-6">
                  มีคำถามเกี่ยวกับสินค้าของเรา หรือต้องการความช่วยเหลือ? เราพร้อมช่วยเหลือคุณ!
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">การสนับสนุนลูกค้า</h3>
                  <p className="text-muted-foreground">วันจันทร์ - วันศุกร์: 10:00 น. - 18:00 น.</p>
                  <p className="text-muted-foreground">ตอบกลับภายใน 1 ชั่วโมง</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">ติดตามเรา</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-accent hover:text-accent/80">Instagram</a>
                    <a href="#" className="text-accent hover:text-accent/80">Facebook</a>
                    <a href="#" className="text-accent hover:text-accent/80">TikTok</a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form / LINE */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-4">แชทกับเรา</h2>
                <p className="text-muted-foreground mb-6">
                  วิธีที่เร็วที่สุดในการรับความช่วยเหลือคือผ่านแชท LINE คลิกด้านล่างเพื่อเริ่มการสนทนา!
                </p>
              </div>

              <div className="space-y-4">
                <LineButton className="w-full py-4 text-lg" />

                {/* QR Code */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">หรือสแกน QR code เพื่อเพิ่มเราใน LINE</p>
                  <div className="w-48 h-48 bg-muted rounded-lg mx-auto flex items-center justify-center">
                    <span className="text-muted-foreground">LINE QR Code</span>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">ทำไมต้องเลือก LINE?</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• ตอบกลับทันที</li>
                  <li>• ปลอดภัยและเป็นส่วนตัว</li>
                  <li>• เข้าถึงประวัติแชทได้ตลอด 24/7</li>
                  <li>• แชร์ไฟล์ได้ง่ายสำหรับรูปภาพสินค้า</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
