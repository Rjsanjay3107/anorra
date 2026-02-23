"use client";

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { categories } from '@/data/categories';
import { scrollToSection } from '@/lib/utils';
import { useUIStore } from '@/stores/uiStore';

const categoryIcons: Record<string, ReactNode> = {
  hospitality: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  wellbeing: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
  gifting: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>,
  bespoke: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>,
};

export function Categories() {
  const { activeCategory, setActiveCategory } = useUIStore();

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
    setTimeout(() => scrollToSection('products'), 100);
  };

  return (
    <section id="categories" className="py-8 bg-[var(--color-background)] border-y border-[var(--color-secondary)]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-[var(--color-secondary)] uppercase tracking-widest">Explore</span>
            <span className="text-lg font-semibold text-[var(--color-text)] font-serif">Collections</span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => handleCategoryClick(category.id)}
              className={`group relative p-4 rounded-lg border-2 transition-all duration-300 ${
                activeCategory === category.id 
                  ? 'bg-[var(--color-secondary)] border-[var(--color-secondary)]' 
                  : 'bg-[var(--color-background)] border-[var(--color-secondary)]/30 hover:border-[var(--color-secondary)]'
              }`}
            >
              <div className={`flex flex-col items-center gap-2 ${activeCategory === category.id ? 'text-[var(--color-light)]' : 'text-[var(--color-secondary)] group-hover:text-[var(--color-primary)]'}`}>
                <div className={`p-2 rounded-full transition-all duration-300 ${activeCategory === category.id ? 'bg-[var(--color-light)]/20' : 'bg-[var(--color-secondary)]/10 group-hover:bg-[var(--color-secondary)]/20'}`}>
                  {categoryIcons[category.id] || categoryIcons.bespoke}
                </div>
                <span className="text-xs font-medium text-center">{category.title}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
