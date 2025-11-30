"use client";

import { motion } from "framer-motion";

export default function ReviewsPage() {
  const reviews = [
    {
      name: "สมชาย ใจดี",
      rating: 5,
      comment: "สินค้าคุณภาพดีมาก ส่งเร็ว ไม่มีปัญหา",
      date: "2024-01-15"
    },
    {
      name: "สมหญิง รักสุขภาพ",
      rating: 5,
      comment: "บริการดีมาก แนะนำได้เลย",
      date: "2024-01-10"
    },
    {
      name: "วิชัย ทำงาน",
      rating: 4,
      comment: "สินค้าดี แต่ส่งช้ากว่าที่คิด",
      date: "2024-01-05"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            รีวิวจากลูกค้า
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            คำติชมและประสบการณ์จากลูกค้าของเรา
          </motion.p>
        </div>
      </section>

      {/* Reviews */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6 md:gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-xl p-6 md:p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2 sm:mb-0">{review.name}</h3>
                  <div className="flex items-center space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-500 text-lg">★</span>
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">({review.rating})</span>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">{review.comment}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12,6 12,12 16,14"></polyline>
                  </svg>
                  {review.date}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
