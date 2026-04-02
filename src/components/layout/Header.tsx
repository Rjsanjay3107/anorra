"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui';
import { navItems, brochureCta } from '@/data/content';
import { useUIStore } from '@/stores/uiStore';
import { scrollToSection } from '@/lib/utils';

const downloadCatalog = () => {
  const link = document.createElement('a');
  link.href = brochureCta.href;
  link.download = 'Anorra Serveware Catalog.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [logoVisible, setLogoVisible] = useState(true);
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // initialize based on current position
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    closeMobileMenu();
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-[60] transition-transform duration-300 ${ (scrolled || isMobileMenuOpen) ? 'translate-y-0' : '-translate-y-full' } ${isMobileMenuOpen ? 'bg-[var(--color-light)]/95' : 'bg-[var(--color-light)]/95 backdrop-blur-md border-b border-[var(--color-border)]' }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          <Link href="/" className="flex items-center gap-2" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>
            {logoVisible ? (
              <img src="/logo.png" alt="ANORRA" onError={() => setLogoVisible(false)} style={{ height: '64px', objectFit: 'contain' }} />
            ) : (
              <span className="text-xl font-normal text-[var(--color-primary)] font-serif tracking-wide">ANORRA</span>
            )}
          </Link>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navItems.map((item) => (
              <button key={item.sectionId} onClick={() => handleNavClick(item.sectionId)} className="text-sm font-medium text-[var(--color-textMuted)] hover:text-[var(--color-primary)] transition-colors">
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button onClick={downloadCatalog} variant="primary" size="sm">{brochureCta.label}</Button>
          </div>

          <button className="lg:hidden p-2 text-[var(--color-textMuted)] hover:text-[var(--color-primary)] transition-colors" onClick={toggleMobileMenu} aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="lg:hidden bg-[var(--color-light)] border-t border-[var(--color-border)]">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <button key={item.sectionId} onClick={() => handleNavClick(item.sectionId)} className="block w-full text-left py-3 text-base font-medium text-[var(--color-textMuted)] hover:text-[var(--color-primary)] transition-colors">
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-[var(--color-border)]">
                <Button onClick={downloadCatalog} variant="primary" className="w-full">{brochureCta.label}</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
