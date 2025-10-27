"use client";
import { API_BASE_URL } from "@/lib/config";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Category {
  name: string;
  count: number;
  description: string;
  icon: string;
}

export default function CategoriesContent() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/products`);
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`);
        }
        const products = await response.json();

        // Group products by category and count them
        const categoryMap = new Map<string, number>();
        products.forEach((product: { category?: string }) => {
          if (product.category) {
            categoryMap.set(product.category, (categoryMap.get(product.category) || 0) + 1);
          }
        });

        // Convert to category objects with descriptions and icons
        const categoryData: Category[] = Array.from(categoryMap.entries()).map(([name, count]) => ({
          name,
          count,
          description: getCategoryDescription(name),
          icon: getCategoryIcon(name)
        }));

        setCategories(categoryData);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err instanceof Error ? err.message : 'Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Helper functions for category descriptions and icons
  const getCategoryDescription = (categoryName: string): string => {
    const descriptions: Record<string, string> = {
      'Starter Kit': 'เหมาะสำหรับผู้เริ่มต้นที่ต้องการเริ่มต้นการเดินทางสูบไอ',
      'Device': 'อุปกรณ์การสูบไอขั้นสูงพร้อมคุณสมบัติพรีเมียม',
      'Pod': 'ระบบพอตที่กะทัดรัดและสะดวกสำหรับการสูบไอแบบพกพา',
      'game': 'สินค้าการสูบไอธีมเกม',
      'Accessories': 'อุปกรณ์และอะไหล่การสูบไอที่จำเป็น'
    };
    return descriptions[categoryName] || `สินค้าการสูบไอประเภท ${categoryName}`;
  };

  const getCategoryIcon = (categoryName: string): string => {
    const icons: Record<string, string> = {
      'Starter Kit': '🚀',
      'Device': '⚡',
      'Pod': '📱',
      'game': '🎮',
      'Accessories': '🔧'
    };
    return icons[categoryName] || '📦';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">กำลังโหลดหมวดหมู่...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4">
            <i className="fas fa-exclamation-triangle text-4xl"></i>
          </div>
          <h2 className="text-xl font-semibold mb-2">ไม่สามารถโหลดหมวดหมู่ได้</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition-colors"
          >
            ลองใหม่
          </button>
        </div>
      </div>
    );
  }

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
            หมวดหมู่สินค้า
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground"
          >
            สำรวจหมวดหมู่สินค้าการสูบไอของเรา
          </motion.p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {categories.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-muted-foreground mb-4">
                <i className="fas fa-tags text-6xl"></i>
              </div>
              <h3 className="text-2xl font-semibold mb-2">ไม่มีหมวดหมู่ให้บริการ</h3>
              <p className="text-muted-foreground">กลับมาดูใหม่เร็วๆ นี้สำหรับหมวดหมู่ใหม่!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <Link key={category.name} href={`/categories/${encodeURIComponent(category.name)}`} className="no-underline">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card rounded-lg p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer text-center"
                  >
                    <div className="text-6xl mb-4">{category.icon}</div>
                    <h3 className="text-2xl font-semibold mb-2 text-card-foreground">{category.name}</h3>
                    <p className="text-muted-foreground mb-4">{category.description}</p>
                    <div className="flex items-center justify-center gap-2 text-primary font-semibold">
                      <span>{category.count} สินค้า</span>
                      <i className="fas fa-arrow-right"></i>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
