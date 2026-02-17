export const navItems = [
  { label: 'Collections', sectionId: 'products' },
  { label: 'About', sectionId: 'about' },
  { label: 'Contact', sectionId: 'contact' },
];

export const brochureCta = {
  label: 'Download Catalog',
  href: '/brochure/anorra-brochure.pdf',
};

export const contactInfo = {
  phone: '+91 98765 43210',
  email: 'hello@anorra.in',
  address: 'Anorra\nIndia',
};

export const socialLinks = [
  { platform: 'instagram' as const, url: 'https://instagram.com/anorra', label: 'Instagram' },
  { platform: 'linkedin' as const, url: 'https://linkedin.com/company/anorra', label: 'LinkedIn' },
];

export const quickLinks = [
  { label: 'FAQs', modalId: 'faq' as const },
  { label: 'Privacy Policy', modalId: 'privacy' as const },
  { label: 'Terms & Conditions', modalId: 'terms' as const },
];

export const heroContent = {
  headline: 'Calm over chaos',
  subheadline: 'Experience-led lifestyle products designed for hospitality, wellness, and mindful gifting',
  ctaLabel: 'Explore Collections',
};

export const aboutContent = {
  brandStory: `ANORRA is a design-led, sustainable living brand that creates calm, thoughtful experiences across hospitality, HoReCa, wellness, and gifting. We don't sell products — we design how people arrive, eat, pause, and feel.`,
  ukPositioning: `Rooted in India, designed for the world. We build from local materials, crafts, and rituals, and elevate them to global standards.`,
  craftsmanship: `We design for the senses — how things look, feel, and sound. Every product creates a calm, tactile, and intentional experience, not just serve a function.`,
  vision2026: `Sustainability is not a claim — it is a system. From sourcing to packaging, every element is traceable, low-impact, and responsibly made.`,
};

export const queryFormSubjects = [
  'Product Inquiry',
  'Bulk Orders / HoReCa',
  'Corporate Gifting',
  'Partnership',
  'General Enquiry',
];
