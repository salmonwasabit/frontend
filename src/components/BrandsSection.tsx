"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const brands = [
  {
    name: "Esko Switch",
    logo: "/brands/esko/ESKOBAR_Switch_15Flavors_AD.jpg",
    category: "Starter Kit",
    description: "Starter Kit และ Cartridge หลากหลายรสชาติ"
  },
  {
    name: "Pikka Pod",
    logo: "/brands/pikka/PIKKA POD All Product AD 3-01.jpg",
    category: "Pod",
    description: "Pod ระบบปิดพร้อมรสชาติพรีเมียม"
  },
  {
    name: "Vortex Pro",
    logo: "/brands/vortex/Starter Kit AD 1200x800-01.jpg",
    category: "Device",
    description: "อุปกรณ์สูบไอระดับพรีเมียม"
  },
];

export default function BrandsSection() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            ยี่ห้อสินค้า
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            เลือกจากแบรนด์ชั้นนำที่เราคัดสรรมาอย่างพิถีพิถัน
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map((brand, index) => (
            <Link key={brand.name} href={`/categories/${encodeURIComponent(brand.category)}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-background border border-border rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <div className="aspect-[4/3] bg-primary/5 flex items-center justify-center overflow-hidden">
                  {brand.logo.includes('.jpg') || brand.logo.includes('.png') ? (
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                      {brand.name === 'Esko Switch' ? '🚀' : brand.name === 'Pikka Pod' ? '📱' : '⚡'}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-muted-foreground">
                    {brand.description}
                  </p>
                  <div className="mt-4 flex items-center text-primary font-medium">
                    <span>ดูสินค้า</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
