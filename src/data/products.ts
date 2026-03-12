const categoryImages: Record<string, string> = {
  'amenity-kits': '/AmenityKits.jpeg',
  'serveware-tableware': '/Serveware&Tableware.jpeg',
  'spa-wellness': '/Spa&Wellness.jpeg',
  'guest-delight-gifting': '/GuestDelightGifting.jpeg',
  'restaurant-accessories': '/RestaurantAccessories.jpeg',
  'bar-accessories': '/BarAccessories.jpeg',
  'corporate-stationery': '/CorporateStationery.svg',
};

export const products = [
  {
    id: 'pro-001',
    name: 'Amenity Kits',
    slug: 'amenity-kits',
    category: 'amenity-kits',
    shortDescription: 'Thoughtful rituals for the modern traveller.',
    description: 'Custom-developed, hotel-grade essentials designed to elevate guest comfort through sensorial experiences. Our formulations are clean-label, focusing on gentle care and subtle, nature-inspired fragrances.',
    features: [
      'Skin-friendly, non-harsh formulations (Sulphate & Paraben free)',
      'Premium matte-finish, tactile packaging for a quiet, luxury feel',
      'Standardized 30ml, 35ml, and 50ml variants for 4★ and 5★ hospitality standards'
    ],
    images: [{ src: categoryImages['amenity-kits'], alt: 'Amenity Kits', width: 800, height: 800 }],
    specifications: { 'Min Order': '50 units', 'Lead Time': '2-3 weeks', 'Sizes': '30ml, 35ml, 50ml' },
    featured: true,
  },
  {
    id: 'pro-002',
    name: 'Serveware & Tableware',
    slug: 'serveware-tableware',
    category: 'serveware-tableware',
    shortDescription: 'Elevated dining rituals rooted in nature.',
    description: 'Elegant bamboo and indigenous-material serveware crafted for modern hospitality environments. We focus on "ease over excess," ensuring every piece adds a calm, tactile layer to the dining experience.',
    features: [
      'Crafted from durable, restaurant-grade sustainable materials',
      'Modern, minimal design language that favors quiet warmth over decoration',
      'Ideal for premium hotels, cafés, and destination restaurants'
    ],
    images: [{ src: categoryImages['serveware-tableware'], alt: 'Serveware & Tableware', width: 800, height: 800 }],
    specifications: { 'Material': 'Bamboo & Indigenous Materials', 'Min Order': '25 units', 'Design Style': 'Modern Minimal' },
    featured: true,
  },
  {
    id: 'pro-003',
    name: 'Spa & Wellness',
    slug: 'spa-wellness',
    category: 'spa-wellness',
    shortDescription: 'Place-based wellbeing for deep restoration.',
    description: 'Sustainable spa products and rituals designed to help guests slow down and feel better. Beyond functionality, our wellness range focuses on "care over clutter" through aromatherapy and traceable materials.',
    features: [
      'Aromatherapy-based profiles like Thai Jasmine and English Lavender',
      'Planet-positive systems with low-impact, traceable sourcing',
      'Premium essentials tailored for luxury resorts and wellness centers'
    ],
    images: [{ src: categoryImages['spa-wellness'], alt: 'Spa & Wellness', width: 800, height: 800 }],
    specifications: { 'Min Order': '30 units', 'Packaging': 'Reusable box', 'Scents': 'Thai Jasmine, English Lavender' },
    featured: true,
  },
  {
    id: 'pro-004',
    name: 'Guest Delight & Gifting',
    slug: 'guest-delight-gifting',
    category: 'guest-delight-gifting',
    shortDescription: 'Care-forward gifting that leaves a lasting impression.',
    description: 'Curated hospitality gift sets that combine quiet elegance with intentionality. We design experience-led gifts-from arrival kits to wind-down boxes, that prioritize the feeling of the recipient.',
    features: [
      'Bespoke, non-flashy packaging designed for memorable unboxing',
      'Personalized branding options for corporate and VIP guest gifting',
      'Experience-led collections (e.g., Gratitude or Arrival kits)'
    ],
    images: [{ src: categoryImages['guest-delight-gifting'], alt: 'Guest Delight & Gifting', width: 800, height: 800 }],
    specifications: { 'Min Order': '20 units', 'Lead Time': '1-2 weeks', 'Customization': 'Personalized Branding Available' },
    featured: true,
  },
  {
    id: 'pro-005',
    name: 'Restaurant & Bar Accessories',
    slug: 'restaurant-bar-accessories',
    category: 'restaurant-accessories',
    shortDescription: 'Refined essentials for sophisticated service environments.',
    description: 'Sustainably crafted accessories designed for seamless drink preparation and elegant table presentation. These professional-grade tools blend functional durability with our signature quiet, earthy aesthetic.',
    features: [
      'Professional-grade bar tools and durable, modern dining accessories',
      'Custom branding options to align with your establishment\'s identity',
      'Sustainably sourced materials built for the rigors of high-frequency use'
    ],
    images: [{ src: categoryImages['restaurant-accessories'], alt: 'Restaurant & Bar Accessories', width: 800, height: 800 }],
    specifications: { 'Min Order': '25 units', 'Customization': 'Available', 'Material': 'Sustainable Sources' },
    featured: true,
  },
  {
    id: 'pro-006',
    name: 'Corporate Stationery',
    slug: 'corporate-stationery',
    category: 'corporate-stationery',
    shortDescription: 'Minimalist design for professional ease.',
    description: 'Elegant, customized stationery solutions that reflect a brand\'s commitment to quality and sustainability. We provide professional designs that focus on "thoughtful design over decoration".',
    features: [
      'Premium quality, responsibly sourced paper and materials',
      'Custom logo printing and bespoke branding for corporate identity',
      'Clean, minimal aesthetics suitable for events, offices, and executive gifting'
    ],
    images: [{ src: categoryImages['corporate-stationery'], alt: 'Corporate Stationery', width: 800, height: 800 }],
    specifications: { 'Min Order': '100 units', 'Lead Time': '2 weeks', 'Material': 'Responsibly Sourced Paper' },
    featured: true,
  },
];
