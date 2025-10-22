"use client";

import { motion } from "framer-motion";
import { Shield, Users, Award, Heart, Sparkles, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function HomeAboutSection() {
  const values = [
    {
      icon: Shield,
      title: "การรับประกันคุณภาพ",
      description: "ทุกผลิตภัณฑ์ผ่านการทดสอบอย่างเข้มงวดเพื่อให้มั่นใจในมาตรฐานความปลอดภัยและประสิทธิภาพสูงสุด"
    },
    {
      icon: Users,
      title: "ชุมชนเป็นที่หนึ่ง",
      description: "สร้างโดยผู้สูบไอเพื่อผู้สูบไอ ความคิดเห็นของคุณเป็นตัวกำหนดผลิตภัณฑ์และบริการของเรา"
    },
    {
      icon: Award,
      title: "ผู้นำด้านนวัตกรรม",
      description: "เป็นผู้นำด้านเทคโนโลยีการสูบไอล่าสุดด้วยการออกแบบและคุณสมบัติที่ทันสมัย"
    },
    {
      icon: Heart,
      title: "การดูแลลูกค้า",
      description: "ทีมสนับสนุนเฉพาะพร้อมช่วยเหลือคุณในการค้นหาโซลูชันการสูบไอที่สมบูรณ์แบบ"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-white to-blue-50 dark:from-slate-900 dark:to-blue-950/20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-4 border border-blue-200 dark:border-blue-800">
            <Sparkles className="w-4 h-4" />
            เรื่องราวของเรา
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
            เกี่ยวกับ VAPE LIFE
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            สร้างประสบการณ์การสูบไอพรีเมียมสำหรับไลฟ์สไตล์สมัยใหม่ด้วยนวัตกรรม
            คุณภาพ และชุมชนเป็นหัวใจหลัก
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Column - Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                ก่อตั้งขึ้นด้วยความหลงใหลในนวัตกรรมและคุณภาพ <strong className="text-blue-600 dark:text-blue-400">VAPE LIFE</strong> แสดงถึงจุดสูงสุดของเทคโนโลยีการสูบไอ
                เราเชื่อในการมอบประสบการณ์ที่ดีที่สุดให้กับลูกค้าของเรา
                ผ่านผลิตภัณฑ์ที่ทันสมัยและบริการที่ยอดเยี่ยม
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                การเดินทางของเราเริ่มต้นด้วยภารกิจที่เรียบง่าย: สร้างผลิตภัณฑ์การสูบไอที่ไม่เพียงแต่ทำงานได้อย่างยอดเยี่ยม
                แต่ยังช่วยยกระดับประสบการณ์การสูบไอโดยรวม การตัดสินใจทุกอย่างของเราได้รับคำแนะนำจากความมุ่งมั่นใน
                คุณภาพ ความปลอดภัย และความพึงพอใจของลูกค้า
              </p>
            </div>

            {/* Mission Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-6 border border-blue-200 dark:border-blue-800"
            >
              <div className="flex items-start gap-4">
                <Target className="w-8 h-8 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">ภารกิจของเรา</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    เพื่อเสริมพลังผู้สูบไอทั่วโลกด้วยผลิตภัณฑ์พรีเมียม คำแนะนำจากผู้เชี่ยวชาญ และชุมชนที่เฉลิมฉลอง
                    ศิลปะแห่งการสูบไอ
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-2xl p-8 text-white overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">ทำไมต้องเลือก VAPE LIFE?</h3>
                <ul className="space-y-3 text-blue-50">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>ผลิตภัณฑ์คุณภาพพรีเมียม</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>การสนับสนุนลูกค้าจากผู้เชี่ยวชาญ</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>เทคโนโลยีล่าสุดและนวัตกรรม</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>การพัฒนาที่ขับเคลื่อนโดยชุมชน</span>
                  </li>
                </ul>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            </div>
          </motion.div>
        </div>

        {/* Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-800 group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Closing Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">
            เข้าร่วมกับเราในการยอมรับไลฟ์สไตล์ที่ทั้งทันสมัยและมีสติ
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            ยินดีต้อนรับสู่ <span className="text-blue-600 dark:text-blue-400 font-semibold">VAPE LIFE</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
