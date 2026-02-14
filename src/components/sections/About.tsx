"use client";

import { motion } from 'framer-motion';
import { aboutContent } from '@/data/content';

export function About() {
  return (
    <section id="about" className="py-16 lg:py-24 bg-gradient-to-tr from-[#0D0D0D] via-[#151515] to-[#0D0D0D] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#C9A962]/8 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNDOEE5NjIiIGZpbGwtb3BhY2l0eT0iMC4wMSI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-serif mb-8">About Anorra</h2>
            <div className="space-y-6">
              <div><h3 className="text-xl font-semibold text-[#C9A962] mb-3 font-serif">Our Story</h3><p className="text-gray-300 leading-relaxed">{aboutContent.brandStory}</p></div>
              <div><h3 className="text-xl font-semibold text-[#C9A962] mb-3 font-serif">UK-Based Excellence</h3><p className="text-gray-300 leading-relaxed">{aboutContent.ukPositioning}</p></div>
              <div><h3 className="text-xl font-semibold text-[#C9A962] mb-3 font-serif">Craftsmanship</h3><p className="text-gray-300 leading-relaxed">{aboutContent.craftsmanship}</p></div>
              <div><h3 className="text-xl font-semibold text-[#C9A962] mb-3 font-serif">Vision 2026</h3><p className="text-gray-300 leading-relaxed">{aboutContent.vision2026}</p></div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/about/about-main.jpg)' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#C9A962] p-6 rounded-xl max-w-xs hidden lg:block">
              <div className="text-4xl font-bold text-[#0D0D0D] font-serif">15+</div>
              <div className="text-[#0D0D0D]/80 text-sm">Years of Excellence</div>
            </div>
            <div className="absolute -top-6 -right-6 bg-[#1A1A1A] border border-white/10 p-6 rounded-xl max-w-xs hidden lg:block">
              <div className="text-4xl font-bold text-white font-serif">500+</div>
              <div className="text-gray-400 text-sm">Projects Completed</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
