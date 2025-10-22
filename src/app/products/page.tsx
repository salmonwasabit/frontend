"use client";

import dynamic from 'next/dynamic';

const ProductsContent = dynamic(() => import('@/components/ProductsContent'), {
  ssr: false,
});

export default function ProductsPage() {
  return <ProductsContent />;
}