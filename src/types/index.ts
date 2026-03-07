export interface ImageSource {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  description?: string;
  image: ImageSource;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  features: string[];
  images: ImageSource[];
  specifications?: Record<string, string>;
  featured: boolean;
}

export interface NavItem {
  label: string;
  sectionId: string;
}

export interface ContactInfo {
  phone: string;
  whatsapp?: string;
  email: string;
  address: string;
}

export interface SocialLink {
  platform: 'linkedin' | 'instagram' | 'twitter' | 'facebook';
  url: string;
  label: string;
}

export interface QuickLink {
  label: string;
  modalId: 'privacy' | 'terms' | 'faq';
}

export interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
  honeypot: string;
}
