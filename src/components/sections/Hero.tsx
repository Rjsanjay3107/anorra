"use client";

import { HeroBanner } from '@/components/HeroBanner';
import { scrollToSection } from '@/lib/utils';

const bannerSlides = [
  { src: '/1.svg', type: 'image' as const, alt: 'ANORRA - Premium Brand' },
  { src: '/2.png', type: 'image' as const, alt: 'ANORRA - Sustainable Design' },
  { src: '/3.png', type: 'image' as const, alt: 'ANORRA - Bespoke Collection' },
];

export function Hero() {
  return (
    <section id="hero" className="relative h-[26vh] md:min-h-screen lg:min-h-screen md:flex md:items-center md:justify-center overflow-hidden bg-black md:px-12 lg:px-16">
      <HeroBanner slides={bannerSlides} autoInterval={5000} />
    </section>
  );
}
