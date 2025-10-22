"use client";

import { motion } from "framer-motion";

export default function AboutContent() {
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
            เกี่ยวกับ VAPE LIFE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground"
          >
            สร้างประสบการณ์การสูบไอพรีเมียมสำหรับไลฟ์สไตล์สมัยใหม่
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="prose prose-lg mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-8">เรื่องราวของเรา</h2>
            <p className="text-muted-foreground mb-6">
              ก่อตั้งขึ้นด้วยความหลงใหลในนวัตกรรมและคุณภาพ VAPE LIFE แสดงถึงจุดสูงสุดของเทคโนโลยีการสูบไอ
              เราเชื่อในการมอบประสบการณ์ที่ดีที่สุดให้กับลูกค้าของเรา
              ผ่านผลิตภัณฑ์ที่ทันสมัยและบริการที่ยอดเยี่ยม
            </p>
            <p className="text-muted-foreground mb-6">
              ทีมงานของเราประกอบด้วยผู้ที่ชื่นชอบการสูบไอและผู้เชี่ยวชาญด้านเทคโนโลยีที่อุทิศตนเพื่อผลักดันขีดจำกัด
              ของสิ่งที่เป็นไปได้ในอุตสาหกรรมการสูบไอ ทุกผลิตภัณฑ์ที่เรานำเสนอได้รับการคัดสรรและทดสอบอย่างพิถีพิถัน
              เพื่อให้มั่นใจว่าตรงตามมาตรฐานสูงของเรา
            </p>
            <p className="text-muted-foreground">
              เข้าร่วมกับเราในการยอมรับไลฟ์สไตล์ที่ทั้งทันสมัยและมีสติ ยินดีต้อนรับสู่ VAPE LIFE
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-12 text-card-foreground"
          >
            ค่านิยมของเรา
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "คุณภาพเป็นที่หนึ่ง",
                description: "เราไม่ประนีประนอมกับคุณภาพ ทุกผลิตภัณฑ์ผ่านการทดสอบอย่างเข้มงวด",
              },
              {
                title: "นวัตกรรม",
                description: "ผลักดันขีดจำกัดอย่างต่อเนื่องด้วยเทคโนโลยีและการออกแบบล่าสุด",
              },
              {
                title: "มุ่งเน้นลูกค้า",
                description: "ความพึงพอใจของคุณคือลำดับความสำคัญของเรา เราเป็นเพื่อนคู่ใจในการเดินทางสูบไอของคุณ",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <h3 className="text-2xl font-semibold mb-4 text-card-foreground">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
