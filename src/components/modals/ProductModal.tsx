"use client";

import { useState } from 'react';
import { Modal, ModalHeader, ModalContent, Button } from '@/components/ui';
import { useUIStore } from '@/stores/uiStore';
import { scrollToSection } from '@/lib/utils';

export function ProductModal() {
  const { isProductModalOpen, selectedProduct, closeProductModal } = useUIStore();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleEnquire = () => {
    closeProductModal();
    setTimeout(() => scrollToSection('contact'), 300);
  };

  if (!selectedProduct) return null;

  return (
    <Modal isOpen={isProductModalOpen} onClose={closeProductModal} size="xl">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative bg-gray-900 aspect-square md:aspect-auto">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${selectedProduct.images[selectedImageIndex]?.src || '/images/products/placeholder.jpg'})` }} />
          {selectedProduct.images.length > 1 && (
            <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto">
              {selectedProduct.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImageIndex(i)} className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${i === selectedImageIndex ? 'border-[#C9A962]' : 'border-white/20 opacity-60 hover:opacity-100'}`}>
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${img.src})` }} />
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <ModalHeader onClose={closeProductModal}>{selectedProduct.name}</ModalHeader>
          <ModalContent>
            <div className="text-xs text-[#C9A962] uppercase tracking-wider mb-2">{selectedProduct.category}</div>
            <p className="text-gray-300 mb-6 leading-relaxed">{selectedProduct.description}</p>
            {selectedProduct.features && selectedProduct.features.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-white mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {selectedProduct.features.map((f, i) => <li key={i} className="flex items-start gap-2 text-gray-400 text-sm"><svg className="w-4 h-4 text-[#C9A962] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{f}</li>)}
                </ul>
              </div>
            )}
            <Button onClick={handleEnquire} variant="primary" className="w-full">Request a Quote</Button>
          </ModalContent>
        </div>
      </div>
    </Modal>
  );
}
