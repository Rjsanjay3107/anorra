"use client";

import { motion } from 'framer-motion';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { useUIStore } from '@/stores/uiStore';
import { Button } from '@/components/ui';

export function Products() {
  const { openProductModal, activeCategory } = useUIStore();

  const filteredProducts = activeCategory ? products.filter(p => p.category === activeCategory) : products;

  return (
    <section id="products" className="py-16 lg:py-24 bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--color-text)] font-serif mb-4">Our Collections</h2>
          <p className="text-[var(--color-secondary)] text-lg max-w-2xl mx-auto">Thoughtfully designed products for hospitality, wellness, and mindful gifting</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-[var(--color-background)] border-2 border-[var(--color-border)] rounded-lg overflow-hidden hover:border-[var(--color-secondary)] hover:shadow-lg transition-all duration-500"
            >
              <div className="relative aspect-square overflow-hidden bg-[var(--color-secondary)]/10">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${encodeURI(product.images[0]?.src) || '/images/products/placeholder.jpg'})` }} />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button onClick={() => openProductModal(product as any)} variant="secondary" size="sm">Quick View</Button>
                </div>
              </div>
              <div className="p-5">
                <div className="text-xs text-[var(--color-secondary)] uppercase tracking-wider mb-2">{categories.find(c => c.id === product.category)?.title || product.category}</div>
                <h3 className="text-lg font-medium text-[var(--color-text)] font-serif mb-2 group-hover:text-[var(--color-secondary)] transition-colors">{product.name}</h3>
                <p className="text-[var(--color-secondary)] text-sm mb-4 line-clamp-2">{product.shortDescription}</p>
                <Button onClick={() => openProductModal(product as any)} variant="secondary" size="sm" className="w-full">Enquire</Button>
              </div>
            </motion.div>
          ))}
        </div>
        {filteredProducts.length === 0 && <div className="text-center py-12"><p className="text-[var(--color-secondary)]">No products found in this category.</p></div>}
      </div>
    </section>
  );
}
