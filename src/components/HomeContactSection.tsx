"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MessageCircle, Clock, MapPin, Phone, Mail, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomeContactSection() {
  const contactMethods = [
    {
      icon: MessageCircle,
      title: "แชท LINE",
      description: "การสนับสนุนทันทีและคำถามเกี่ยวกับสินค้า",
      action: "แชทเลย",
      href: "#", // This would be the LINE URL
      primary: true,
      color: "from-green-500 to-green-600"
    },
    {
      icon: Phone,
      title: "การสนับสนุนทางโทรศัพท์",
      description: "โทรหาเราเพื่อขอความช่วยเหลือทันที",
      action: "โทรเลย",
      href: "tel:+1234567890",
      primary: false,
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Mail,
      title: "การสนับสนุนทางอีเมล",
      description: "ส่งคำถามรายละเอียดถึงเรา",
      action: "ส่งอีเมล",
      href: "mailto:support@vapelife.com",
      primary: false,
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-green-400 text-sm font-medium mb-4 border border-white/20">
            <Sparkles className="w-4 h-4" />
            ติดต่อเรา
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            พร้อมเริ่มต้นการเดินทางสูบไอของคุณแล้วหรือยัง?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            มีคำถามเกี่ยวกับสินค้าของเรา หรือต้องการคำแนะนำส่วนตัว?
            ทีมผู้เชี่ยวชาญของเราพร้อมช่วยเหลือคุณในการค้นหาโซลูชันการสูบไอที่สมบูรณ์แบบ
          </p>
        </motion.div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className={`h-full border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 bg-white/10 backdrop-blur-sm border-white/20 ${method.primary ? 'ring-2 ring-green-400/50' : ''}`}>
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <method.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {method.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {method.description}
                  </p>
                  <Link href={method.href} className="inline-block w-full">
                    <Button
                      className={`w-full font-semibold py-3 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 ${
                        method.primary
                          ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/25'
                          : 'bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm'
                      }`}
                    >
                      {method.action}
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Business Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="flex items-center gap-4 mb-4">
              <Clock className="w-8 h-8 text-blue-400" />
              <h3 className="text-2xl font-bold text-white">เวลาทำการ</h3>
            </div>
            <div className="space-y-2 text-gray-300">
              <p><span className="font-semibold text-white">วันจันทร์ - วันศุกร์:</span> 10:00 น. - 18:00 น.</p>
              <p><span className="font-semibold text-white">วันเสาร์:</span> 10:00 น. - 16:00 น.</p>
              <p><span className="font-semibold text-white">วันอาทิตย์:</span> ปิดทำการ</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="flex items-center gap-4 mb-4">
              <MapPin className="w-8 h-8 text-purple-400" />
              <h3 className="text-2xl font-bold text-white">เยี่ยมชมร้านของเรา</h3>
            </div>
            <div className="text-gray-300">
              <p className="font-semibold text-white mb-2">ร้าน VAPE LIFE</p>
              <p>123 ถนนสูบไอ<br />
              เมืองสูบไอ, ประเทศไทย 12345<br />
              ประเทศไทย</p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-8 border border-white/20 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-4">
              ต้องการความช่วยเหลือในการเลือกสินค้าที่เหมาะสม?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              ผู้เชี่ยวชาญด้านการสูบไอของเราพร้อมแนะนำคุณตลอดทั้งคอลเลกชันผลิตภัณฑ์พรีเมียมของเรา
              รับคำแนะนำส่วนตัวตามความชอบและระดับประสบการณ์ของคุณ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-4 text-lg rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  ดูสินค้า
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  ติดต่อสนับสนุน
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
