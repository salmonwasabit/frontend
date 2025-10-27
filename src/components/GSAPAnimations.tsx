"use client";

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GSAPAnimations() {
  useEffect(() => {
    // Header animation on scroll
    gsap.to('.header-bg', {
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      duration: 0.3,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // Neon glow pulse animation
    gsap.to('.neon-glow', {
      scale: 1.1,
      opacity: 0.3,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });

    // Product cards stagger animation
    gsap.from('.product-card', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.product-card',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Text gradient animation
    gsap.to('.gradient-text', {
      backgroundPosition: '200% center',
      duration: 3,
      repeat: -1,
      ease: 'linear'
    });

  }, []);

  return null;
}