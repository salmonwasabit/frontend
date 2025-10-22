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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/categories" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Categories
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-4 text-card-foreground">{categoryName}</h1>
            <p className="text-xl text-muted-foreground">
              Browse our collection of {categoryName.toLowerCase()} products
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Content */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <ProductsContent initialCategory={categoryName} />
        </div>
      </section>
    </div>
  );
}
