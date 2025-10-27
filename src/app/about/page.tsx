"use client";

import dynamic from 'next/dynamic';

const AboutContent = dynamic(() => import('@/components/AboutContent'), {
  ssr: false,
});

export default function AboutPage() {
  return <AboutContent />;
}