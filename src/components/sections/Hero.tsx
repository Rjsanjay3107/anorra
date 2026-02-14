"use client";

import { Button } from '@/components/ui';
import { heroContent } from '@/data/content';
import { scrollToSection } from '@/lib/utils';

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C9A962]/10 via-transparent to-transparent z-0" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNDOEE5NjIiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iNyIgY3k9IjciIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')] z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10" />
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/hero/hero-bg.jpg)' }} />
      <div className="absolute inset-0 bg-[#0D0D0D]/20 z-10" />
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white font-serif leading-tight tracking-tight mb-6">
          {heroContent.headline}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
          {heroContent.subheadline}
        </p>
        <Button onClick={() => scrollToSection('products')} variant="primary" size="lg">
          {heroContent.ctaLabel}
        </Button>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <button onClick={() => scrollToSection('products')} className="w-10 h-16 flex flex-col items-center justify-center rounded-full border-2 border-white/30 hover:border-white/60 transition-colors" aria-label="Scroll to products">
          <div className="w-1.5 h-3 bg-white/60 rounded-full animate-scroll" />
        </button>
      </div>
      <style jsx global>{`
        @keyframes scroll { 0%, 100% { transform: translateY(0); opacity: 1; } 50% { transform: translateY(6px); opacity: 0.5; } }
        .animate-scroll { animation: scroll 1.5s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
