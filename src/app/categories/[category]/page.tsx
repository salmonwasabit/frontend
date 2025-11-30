"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";
import dynamic from 'next/dynamic';

const ProductsContent = dynamic(() => import('@/components/ProductsContent'), {
  ssr: false,
});

export default function CategoryPage() {
  const params = useParams();
  const categoryName = decodeURIComponent(params.category as string);

  // Brand-specific data - keys match the category names used in links
  const brandData: Record<string, {
    name: string;
    description: string;
    features: string[];
    gallery?: { name: string; image: string; description?: string }[];
  }> = {
    "Starter Kit": {
      name: "Esko Switch",
      description: "Esko Bar Switch - อุปกรณ์สูบไอรุ่นล่าสุดพร้อม Starter Kit และ Cartridge หลากหลายรสชาติ",
      features: [
        "ระบบ Switch ที่ใช้งานง่าย",
        "Cartridge 15 รสชาติ",
        "แบตเตอรี่ความจุสูง",
        "ราคาประหยัด"
      ],
      gallery: [
        { name: "Apple Aloe", image: "/Esko Switch Commercial ads-20251129T165555Z-1-001/Esko Switch Commercial ads/Starter Kit ad/ESKOBAR_Switch_Apple Aloe_ADs_3.jpg" },
        { name: "Blueberry", image: "/Esko Switch Commercial ads-20251129T165555Z-1-001/Esko Switch Commercial ads/Starter Kit ad/ESKOBAR_Switch_Blueberry_ADs_3.jpg" },
        { name: "Strawberry", image: "/Esko Switch Commercial ads-20251129T165555Z-1-001/Esko Switch Commercial ads/Starter Kit ad/ESKOBAR_Switch_Strawberry_ADs_3.jpg" },
        { name: "Grape", image: "/Esko Switch Commercial ads-20251129T165555Z-1-001/Esko Switch Commercial ads/Starter Kit ad/ESKOBAR_Switch_Grape_ADs_3.jpg" },
        { name: "Lychee", image: "/Esko Switch Commercial ads-20251129T165555Z-1-001/Esko Switch Commercial ads/Starter Kit ad/ESKOBAR_Switch_Lychee_ADs_3.jpg" },
        { name: "Pineapple", image: "/Esko Switch Commercial ads-20251129T165555Z-1-001/Esko Switch Commercial ads/Starter Kit ad/ESKOBAR_Switch_Pineapple_ADs_3.jpg" }
      ]
    },
    "Pod": {
      name: "Pikka Pod",
      description: "Pikka Pod - ระบบ Pod ปิดพร้อมรสชาติพรีเมียมและการใช้งานที่สะดวกสบาย",
      features: [
        "ระบบ Pod ปิด",
        "รสชาติหลากหลาย",
        "ใช้งานง่าย",
        "พกพาสะดวก"
      ],
      gallery: [
        { name: "Apple Aloe", image: "/Pikka Pod-20251129T165614Z-1-001/Pikka Pod/Png file/Pikka Pod Flavor_APPLE ALOE.png" },
        { name: "Banana Milk", image: "/Pikka Pod-20251129T165614Z-1-001/Pikka Pod/Png file/Pikka Pod Flavor_BANANA MILK.png" },
        { name: "Blueberry Ice", image: "/Pikka Pod-20251129T165614Z-1-001/Pikka Pod/Png file/Pikka Pod Flavor_BLUEBERRY ICE.png" },
        { name: "Grapes", image: "/Pikka Pod-20251129T165614Z-1-001/Pikka Pod/Png file/Pikka Pod Flavor_GRAPES.png" },
        { name: "Lychee", image: "/Pikka Pod-20251129T165614Z-1-001/Pikka Pod/Png file/Pikka Pod Flavor_Lychee.png" },
        { name: "Mixed Berry", image: "/Pikka Pod-20251129T165614Z-1-001/Pikka Pod/Png file/Pikka Pod Flavor_MIXED BERRY.png" }
      ]
    },
    "Device": {
      name: "Vortex Pro",
      description: "Vortex Pro - อุปกรณ์สูบไอระดับพรีเมียมพร้อมเทคโนโลยีล่าสุด",
      features: [
        "เทคโนโลยีระดับพรีเมียม",
        "แบตเตอรี่ความจุสูง",
        "ระบบควบคุมอุณหภูมิ",
        "ดีไซน์หรูหรา"
      ]
    }
  };

  const brandInfo = brandData[categoryName];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-24 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              กลับหน้าแรก
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              {brandInfo ? brandInfo.name : categoryName}
            </h1>
            {brandInfo && (
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {brandInfo.description}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Brand Features */}
      {brandInfo && (
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {brandInfo.features.map((feature, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-foreground font-medium">{feature}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      )}


      {/* Products Content */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">สินค้าทั้งหมด</h2>
          </motion.div>
          <ProductsContent initialCategory={categoryName} />
        </div>
      </section>
    </div>
  );
}
