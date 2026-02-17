"use client";

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { categories } from '@/data/categories';
import { scrollToSection } from '@/lib/utils';
import { useUIStore } from '@/stores/uiStore';

const categoryIcons: Record<string, ReactNode> = {
  architecture: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  interiors: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  industrial: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  bespoke: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>,
};

export function Categories() {
  const { activeCategory, setActiveCategory } = useUIStore();

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
    // Small delay to allow category filtering to apply
    setTimeout(() => {
      scrollToSection('products');
    }, 100);
  };

  return (
    <section id="categories" className="py-10 bg-gradient-to-r from-[#0D0D0D] via-[#111111] to-[#0D0D0D] border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C9A962]/3 via-transparent to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-px h-8 bg-[#C9A962]/50"></div>
            <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">Browse by</span>
            <span className="text-lg font-semibold text-white font-serif">Category</span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => handleCategoryClick(category.id)}
              className={`group relative p-5 rounded-xl border transition-all duration-300 ${
                activeCategory === category.id ? 'bg-[#C9A962] border-[#C9A962] shadow-lg shadow-[#C9A962]/20' : 'bg-white/5 border-white/10 hover:border-[#C9A962]/50 hover:bg-white/10'
              }`}
            >
              <div className={`flex flex-col items-center gap-3 ${activeCategory === category.id ? 'text-[#0D0D0D]' : 'text-gray-300 group-hover:text-white'}`}>
                <div className={`p-3 rounded-full transition-all duration-300 ${activeCategory === category.id ? 'bg-[#0D0D0D]/10' : 'bg-white/5 group-hover:bg-[#C9A962]/10'}`}>
                  {categoryIcons[category.id] || categoryIcons.bespoke}
                </div>
                <span className="text-sm font-medium text-center">{category.title}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
