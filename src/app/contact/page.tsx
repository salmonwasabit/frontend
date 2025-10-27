"use client";

import dynamic from 'next/dynamic';

const ContactContent = dynamic(() => import('@/components/ContactContent'), {
  ssr: false,
});

export default function ContactPage() {
  return <ContactContent />;
}