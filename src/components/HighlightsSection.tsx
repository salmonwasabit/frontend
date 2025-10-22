"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Star, TrendingUp, Award, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import LineButton from "@/components/LineButton";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  brand: string;
  rating?: number;
  isPopular?: boolean;
  isNew?: boolean;
}

export default function HighlightsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/products');
        if (response.ok) {
          const data = await response.json();
          // Get first 3 products or fallback to sample data
          const productsData = data.products?.slice(0, 3) || [
            { id: 1, name: "Vape X Pro", price: 49.99, category: "Mods", brand: "Premium", rating: 4.8, isPopular: true },
            { id: 2, name: "Nebula Pod", price: 29.99, category: "Pods", brand: "Cloud", rating: 4.6, isNew: true },
            { id: 3, name: "Astro Kit", price: 79.99, category: "Starter Kits", brand: "Astro", rating: 4.9, isPopular: true },
          ];
          setProducts(productsData);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        // Fallback to sample data
        setProducts([
          { id: 1, name: "Vape X Pro", price: 49.99, category: "Mods", brand: "Premium", rating: 4.8, isPopular: true },
          { id: 2, name: "Nebula Pod", price: 29.99, category: "Pods", brand: "Cloud", rating: 4.6, isNew: true },
          { id: 3, name: "Astro Kit", price: 79.99, category: "Starter Kits", brand: "Astro", rating: 4.9, isPopular: true },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg animate-pulse">
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-4 border border-blue-200 dark:border-blue-800">
            <TrendingUp className="w-4 h-4" />
            เทรนด์เดอร์ตอนนี้
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            สินค้ายอดนิยม
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            ค้นพบสินค้าการสูบไอที่ชุมชนของเราชื่นชอบมากที่สุด
            ที่ได้รับการคัดสรรอย่างพิถีพิถันเพื่อคุณภาพและประสิทธิภาพที่ยอดเยี่ยม
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-slate-800 group-hover:shadow-blue-500/10">
                <CardHeader className="p-0 relative">
                  {/* Product Image Placeholder with gradient */}
                  <div className="relative w-full h-48 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-t-lg flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 text-white text-center">
                      <Award className="w-12 h-12 mx-auto mb-2 opacity-80" />
                      <span className="text-sm font-medium">Premium Product</span>
                    </div>
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isPopular && (
                        <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs">
                          Popular
                        </Badge>
                      )}
                      {product.isNew && (
                        <Badge className="bg-green-500 hover:bg-green-600 text-white text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="mb-3">
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">
                      {product.brand}
                    </p>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {product.rating || 4.5}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>

                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    ${product.price}
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0 flex gap-3">
                  <Link href={`/products/${product.id}`} className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full group/btn hover:bg-blue-50 dark:hover:bg-blue-950 border-blue-200 dark:border-blue-800"
                    >
                      ดูรายละเอียด
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <LineButton
                    productName={product.name}
                    productId={product.id.toString()}
                    price={product.price}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0"
                  />
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Products CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link href="/products">
            <Button
              size="lg"
              className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              ดูสินค้าทั้งหมด
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}