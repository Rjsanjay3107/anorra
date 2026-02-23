"use client";

import { HeroBanner } from '@/components/HeroBanner';
import { scrollToSection } from '@/lib/utils';

const bannerSlides = [
  { src: '/1.mp4', type: 'video' as const },
  { src: '/2.png', type: 'image' as const, alt: 'ANORRA - Sustainable Design' },
  { src: '/3.png', type: 'image' as const, alt: 'ANORRA - Bespoke Collection' },
];

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black px-8 md:px-12 lg:px-16">
      <HeroBanner slides={bannerSlides} autoInterval={3000} />
    </section>
  );
}
