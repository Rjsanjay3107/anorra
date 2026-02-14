import type { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'architecture',
    title: 'Architectural Solutions',
    slug: 'architectural',
    description: 'Bespoke architectural elements crafted for modern spaces',
    image: {
      src: '/images/categories/architectural.jpg',
      alt: 'Architectural solutions',
      width: 800,
      height: 600,
    },
  },
  {
    id: 'interiors',
    title: 'Premium Interiors',
    slug: 'interiors',
    description: 'Luxurious interior fittings for discerning spaces',
    image: {
      src: '/images/categories/interiors.jpg',
      alt: 'Premium interiors',
      width: 800,
      height: 600,
    },
  },
  {
    id: 'industrial',
    title: 'Industrial Components',
    slug: 'industrial',
    description: 'Precision-engineered components for industrial applications',
    image: {
      src: '/images/categories/industrial.jpg',
      alt: 'Industrial components',
      width: 800,
      height: 600,
    },
  },
  {
    id: 'bespoke',
    title: 'Bespoke Manufacturing',
    slug: 'bespoke',
    description: 'Custom solutions tailored to your specifications',
    image: {
      src: '/images/categories/bespoke.jpg',
      alt: 'Bespoke manufacturing',
      width: 800,
      height: 600,
    },
  },
];
