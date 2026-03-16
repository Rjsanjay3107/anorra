"use client";

import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '@/data/categories';
import { scrollToSection } from '@/lib/utils';
import { useUIStore } from '@/stores/uiStore';

const categoryIcons: Record<string, ReactNode> = {
  hospitality: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
  ),
  wellbeing: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
  ),
  gifting: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/></svg>
  ),
  bespoke: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/></svg>
  ),
  'amenity-kits': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
  ),
  'serveware-tableware': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0l.265-.265.265.265zm6 0a.375.375 0 11-.53 0l.265-.265.265.265z"/></svg>
  ),
  'spa-wellness': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48zM12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1.001A3.75 3.75 0 0012 18z"/></svg>
  ),
  'guest-delight-gifting': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 8H12m0-2.625V8m0-2.625A2.625 2.625 0 1114.625 8H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"/></svg>
  ),
  'restaurant-accessories': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"/></svg>
  ),
  'bar-accessories': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"/></svg>
  ),
  'corporate-stationery': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>
  ),
};

const categoryBgImages: Record<string, string> = {
  'amenity-kits': '/collection_bg/Amenity%20Kits.png',
  'serveware-tableware': '/collection_bg/Serveware%20&%20Tableware.png',
  'spa-wellness': '/collection_bg/Spa%20&%20Wellness.png',
  'guest-delight-gifting': '/collection_bg/Guest%20Delight%20&%20Gifting.png',
  'restaurant-accessories': '/collection_bg/Bar%20Accessories.png',
  'corporate-stationery': '/collection_bg/Corporate%20Stationery.png',
};

export function Categories() {
  const { activeCategory, setActiveCategory } = useUIStore();
  const [showFullscreen, setShowFullscreen] = useState(false);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
    setTimeout(() => scrollToSection('products'), 100);
  };

  const handleFullscreenClick = () => {
    setShowFullscreen(true);
  };

  const handleFullscreenCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
    setShowFullscreen(false);
    setTimeout(() => scrollToSection('products'), 100);
  };

  return (
    <>
      <section id="categories" className="py-8 bg-[var(--color-background)] border-y border-[var(--color-secondary)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-widest">Explore Collections</span>
            <button 
              onClick={handleFullscreenClick}
              className="text-lg font-semibold text-[var(--color-text)] font-serif hover:text-[var(--color-secondary)] transition-colors hidden"
            >
              Collections
            </button>
          </div>
          <div className="relative">
            {/* Left scroll indicator */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[var(--color-background)] to-transparent z-10 pointer-events-none hidden md:block" />
            {/* Right scroll indicator */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[var(--color-background)] to-transparent z-10 pointer-events-none hidden md:block" />
            
            <div className="flex overflow-x-auto gap-3 pb-4 snap-x snap-mandatory hide-scrollbar px-4 md:px-6 lg:px-8 scrollbar-thin scrollbar-thumb-[var(--color-secondary)]/30 scrollbar-track-transparent">
              {categories.slice(4).map((category, index) => (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`flex-shrink-0 px-5 py-6 rounded-2xl border transition-all duration-300 snap-start w-[200px] md:w-[220px] lg:w-[240px] flex flex-col items-center relative overflow-hidden !bg-cover !bg-center hover:scale-105 transform ${
                    activeCategory === category.id 
                      ? 'border-[var(--color-secondary)] shadow-lg' 
                      : 'border-[var(--color-border)] hover:border-[var(--color-secondary)] hover:shadow-md'
                  }`}
                  style={{ backgroundImage: `url('${categoryBgImages[category.id]}')`, zIndex: 1 }}
                >
                  <div className="absolute inset-0 bg-black/30" style={{ zIndex: 2 }} />
                  <div className={`relative w-14 h-14 rounded-full flex items-center justify-center mb-3`} style={{ zIndex: 3 }}>
                    <span className="w-5 h-5 text-white">
                      {categoryIcons[category.id]}
                    </span>
                  </div>
                  <span className="relative text-xs font-medium whitespace-nowrap text-center leading-tight text-white" style={{ zIndex: 3 }}>{category.title}</span>
                </motion.button>
              ))}
            </div>
            
            {/* Scroll hint for mobile */}
            <div className="flex justify-center mt-2 md:hidden">
              <div className="flex gap-1">
                {[...Array(categories.slice(4).length)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      i === 0 ? 'bg-[var(--color-secondary)]' : 'bg-[var(--color-border)]'
                    }`} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[var(--color-background)] overflow-y-auto"
          >
            <div className="min-h-screen flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
                <h2 className="text-2xl font-serif text-[var(--color-text)]">All Collections</h2>
                <button
                  onClick={() => setShowFullscreen(false)}
                  className="p-2 rounded-full hover:bg-[var(--color-card)] transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
                {categories.slice(4).map((category, index) => (
                  <motion.button
                    key={category.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => handleFullscreenCategorySelect(category.id)}
                    className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center w-[200px] md:w-[220px] ${
                      activeCategory === category.id 
                        ? 'bg-[var(--color-secondary)] border-[var(--color-secondary)]' 
                        : 'bg-[var(--color-card)] border-[var(--color-border)] hover:border-[var(--color-secondary)] hover:shadow-md'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${
                      activeCategory === category.id ? 'bg-[var(--color-light)]/20' : 'bg-[var(--color-secondary)]/10'
                    }`}>
                      <span className={`w-7 h-7 ${activeCategory === category.id ? 'text-[var(--color-light)]' : 'text-[var(--color-secondary)]'}`}>
                        {categoryIcons[category.id]}
                      </span>
                    </div>
                    <span className={`text-xs font-medium text-center leading-tight ${activeCategory === category.id ? 'text-[var(--color-light)]' : 'text-[var(--color-text)]'}`}>{category.title}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
