import type { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'hospitality',
    title: 'Hospitality & HoReCa',
    slug: 'hospitality',
    description: 'Amenity kits, serveware, trays, and table rituals',
    image: {
      src: '/images/categories/hospitality.jpg',
      alt: 'Hospitality & HoReCa',
      width: 800,
      height: 600,
    },
  },
  {
    id: 'wellbeing',
    title: 'Wellbeing & Ritual',
    slug: 'wellbeing',
    description: 'Wind-down, comfort, gratitude, and arrival kits',
    image: {
      src: '/images/categories/wellbeing.jpg',
      alt: 'Wellbeing & Ritual',
      width: 800,
      height: 600,
    },
  },
  {
    id: 'gifting',
    title: 'Gifting',
    slug: 'gifting',
    description: 'Care-forward, experience-led gifting',
    image: {
      src: '/images/categories/gifting.jpg',
      alt: 'Gifting',
      width: 800,
      height: 600,
    },
  },
  {
    id: 'bespoke',
    title: 'Bespoke',
    slug: 'bespoke',
    description: 'Custom solutions tailored to your vision',
    image: {
      src: '/images/categories/bespoke.jpg',
      alt: 'Bespoke',
      width: 800,
      height: 600,
    },
  },
];
