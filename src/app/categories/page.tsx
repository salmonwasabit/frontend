"use client";

import dynamic from 'next/dynamic';

const CategoriesContent = dynamic(() => import('@/components/CategoriesContent'), {
  ssr: false,
});

export default function CategoriesPage() {
  return <CategoriesContent />;
}