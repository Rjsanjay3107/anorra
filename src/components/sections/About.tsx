"use client";

import { motion } from 'framer-motion';
import { aboutContent } from '@/data/content';

export function About() {
  return (
    <section id="about" className="py-16 lg:py-24 bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--color-text)] font-serif mb-8">About ANORRA</h2>
            <div className="space-y-6">
              <div><h3 className="text-lg font-medium text-[var(--color-accent)] mb-2 font-serif">We design how people feel</h3><p className="text-[var(--color-textMuted)] leading-relaxed">{aboutContent.brandStory}</p></div>
              <div><h3 className="text-lg font-medium text-[var(--color-accent)] mb-2 font-serif">Rooted in India, designed for the world</h3><p className="text-[var(--color-textMuted)] leading-relaxed">{aboutContent.ukPositioning}</p></div>
              <div><h3 className="text-lg font-medium text-[var(--color-accent)] mb-2 font-serif">Sensorial Design</h3><p className="text-[var(--color-textMuted)] leading-relaxed">{aboutContent.craftsmanship}</p></div>
              <div><h3 className="text-lg font-medium text-[var(--color-accent)] mb-2 font-serif">Sustainability as a given</h3><p className="text-[var(--color-textMuted)] leading-relaxed">{aboutContent.vision2026}</p></div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/about/about-main.jpg)' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
