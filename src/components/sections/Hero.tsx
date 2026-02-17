"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { heroContent } from '@/data/content';
import { scrollToSection } from '@/lib/utils';

const floatingShapes = [
  { size: 80, x: '10%', y: '20%', duration: 8 },
  { size: 120, x: '85%', y: '15%', duration: 10 },
  { size: 60, x: '75%', y: '70%', duration: 7 },
  { size: 100, x: '20%', y: '75%', duration: 9 },
  { size: 40, x: '50%', y: '30%', duration: 6 },
];

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--color-background)]">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 via-[var(--color-secondary)]/10 to-[var(--color-primary)]/5" />
      
      {floatingShapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[var(--color-accent)]/10"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}
      
      <motion.div 
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, var(--color-accent) 0%, transparent 50%),
                           radial-gradient(circle at 70% 60%, var(--color-secondary) 0%, transparent 40%)`,
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)] via-transparent to-[var(--color-background)] z-10" />
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/hero/hero-bg.jpg)' }} />
      <div className="absolute inset-0 bg-[var(--color-background)]/70 z-10" />
      
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[var(--color-text)] font-serif leading-tight mb-6"
        >
          {heroContent.headline}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-lg sm:text-xl text-[var(--color-textMuted)] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {heroContent.subheadline}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
        >
          <Button onClick={() => scrollToSection('products')} variant="primary" size="lg">
            {heroContent.ctaLabel}
          </Button>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <button onClick={() => scrollToSection('products')} className="w-10 h-16 flex flex-col items-center justify-center rounded-full border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-all duration-300 group" aria-label="Scroll to collections">
          <div className="w-1 h-3 bg-[var(--color-textMuted)] rounded-full animate-scroll group-hover:bg-[var(--color-accent)] transition-colors" />
        </button>
      </motion.div>
      <style jsx global>{`
        @keyframes scroll { 0%, 100% { transform: translateY(0); opacity: 1; } 50% { transform: translateY(6px); opacity: 0.5; } }
        .animate-scroll { animation: scroll 1.5s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
