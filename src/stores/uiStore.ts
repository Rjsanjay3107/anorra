import { create } from 'zustand';
import type { Product } from '@/types';

interface UIState {
  isProductModalOpen: boolean;
  selectedProduct: Product | null;
  isPrivacyModalOpen: boolean;
  isTermsModalOpen: boolean;
  isFaqModalOpen: boolean;
  isMobileMenuOpen: boolean;
  isFormSubmitting: boolean;
  formSubmitStatus: 'idle' | 'success' | 'error';
  isScrolled: boolean;
  activeCategory: string | null;
  
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
  openPrivacyModal: () => void;
  closePrivacyModal: () => void;
  openTermsModal: () => void;
  closeTermsModal: () => void;
  openFaqModal: () => void;
  closeFaqModal: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  setFormSubmitting: (isSubmitting: boolean) => void;
  setFormSubmitStatus: (status: 'idle' | 'success' | 'error') => void;
  setScrolled: (isScrolled: boolean) => void;
  setActiveCategory: (category: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isProductModalOpen: false,
  selectedProduct: null,
  isPrivacyModalOpen: false,
  isTermsModalOpen: false,
  isFaqModalOpen: false,
  isMobileMenuOpen: false,
  isFormSubmitting: false,
  formSubmitStatus: 'idle',
  isScrolled: false,
  activeCategory: null,
  
  openProductModal: (product) => set({ 
    isProductModalOpen: true, 
    selectedProduct: product 
  }),
  closeProductModal: () => set({ 
    isProductModalOpen: false, 
    selectedProduct: null 
  }),
  openPrivacyModal: () => set({ isPrivacyModalOpen: true }),
  closePrivacyModal: () => set({ isPrivacyModalOpen: false }),
  openTermsModal: () => set({ isTermsModalOpen: true }),
  closeTermsModal: () => set({ isTermsModalOpen: false }),
  openFaqModal: () => set({ isFaqModalOpen: true }),
  closeFaqModal: () => set({ isFaqModalOpen: false }),
  toggleMobileMenu: () => set((state) => ({ 
    isMobileMenuOpen: !state.isMobileMenuOpen 
  })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  setFormSubmitting: (isFormSubmitting) => set({ isFormSubmitting }),
  setFormSubmitStatus: (formSubmitStatus) => set({ formSubmitStatus }),
  setScrolled: (isScrolled) => set({ isScrolled }),
  setActiveCategory: (activeCategory) => set({ activeCategory }),
}));
