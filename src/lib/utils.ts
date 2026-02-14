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
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

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
