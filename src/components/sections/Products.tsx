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
    <section id="products" className="py-16 lg:py-24 bg-gradient-to-br from-[#1A1A1A] via-[#222222] to-[#1A1A1A] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#C9A962]/5 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNDOEE5NjIiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iNSIgY3k9IjUiIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-serif mb-4">Featured Products</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Discover our premium selection of architectural and industrial solutions</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-[#0D0D0D] rounded-xl overflow-hidden hover:shadow-xl hover:shadow-[#C9A962]/5 transition-all duration-500"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-800">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${product.images[0]?.src || '/images/products/placeholder.jpg'})` }} />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <Button onClick={() => openProductModal(product as any)} variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-[#0D0D0D]">Quick View</Button>
                </div>
              </div>
              <div className="p-5">
                <div className="text-xs text-[#C9A962] uppercase tracking-wider mb-2">{categories.find(c => c.id === product.category)?.title || product.category}</div>
                <h3 className="text-lg font-semibold text-white font-serif mb-2 group-hover:text-[#C9A962] transition-colors">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.shortDescription}</p>
                <Button onClick={() => openProductModal(product as any)} variant="outline" size="sm" className="w-full">Enquire Now</Button>
              </div>
            </motion.div>
          ))}
        </div>
        {filteredProducts.length === 0 && <div className="text-center py-12"><p className="text-gray-400">No products found in this category.</p></div>}
      </div>
    </section>
  );
}
