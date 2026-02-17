import { clsx } from 'clsx';

export function cn(...inputs: Parameters<typeof clsx>) {
  return clsx(inputs);
}

export function formatPhone(phone: string): string {
  return phone.replace(/\s+/g, '');
}

export function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerHeight = window.innerWidth >= 1024 ? 96 : 80; // lg:h-20 (80px) vs h-16 (64px) + padding
    const extraPadding = 40; // Extra space to show more content
    const totalOffset = headerHeight + extraPadding;
    
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - totalOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
}

export function scrollToTop(): void {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
