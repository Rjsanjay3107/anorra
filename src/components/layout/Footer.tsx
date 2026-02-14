"use client";

import { contactInfo, quickLinks, socialLinks } from '@/data/content';
import { useUIStore } from '@/stores/uiStore';
import { scrollToTop, formatPhone } from '@/lib/utils';

export function Footer() {
  const { openPrivacyModal, openTermsModal, openFaqModal } = useUIStore();

  const handleQuickLinkClick = (modalId: 'privacy' | 'terms' | 'faq') => {
    if (modalId === 'privacy') openPrivacyModal();
    else if (modalId === 'terms') openTermsModal();
    else if (modalId === 'faq') openFaqModal();
  };

  return (
    <footer className="bg-[#0D0D0D] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 font-serif">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href={`tel:${formatPhone(contactInfo.phone)}`} className="text-gray-400 hover:text-[#C9A962] transition-colors">
                  {contactInfo.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contactInfo.email}`} className="text-gray-400 hover:text-[#C9A962] transition-colors">
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <address className="text-gray-400 not-italic">
                  {contactInfo.address.split('\n').map((line, i) => (
                    <span key={i}>{line}{i < contactInfo.address.split('\n').length - 1 && <br />}</span>
                  ))}
                </address>
              </li>
            </ul>
          </div>

          <div className="md:text-center">
            <h3 className="text-lg font-semibold text-white mb-4 font-serif">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.modalId}>
                  <button onClick={() => handleQuickLinkClick(link.modalId)} className="text-gray-400 hover:text-[#C9A962] transition-colors">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:text-right">
            <h3 className="text-lg font-semibold text-white mb-4 font-serif">Follow Us</h3>
            <div className="flex gap-4 md:justify-end mb-6">
              {socialLinks.map((social) => (
                <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 text-gray-400 hover:bg-[#C9A962] hover:text-[#0D0D0D] transition-all duration-300" aria-label={social.label}>
                  {social.platform === 'linkedin' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>}
                  {social.platform === 'instagram' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>}
                  {social.platform === 'twitter' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>}
                </a>
              ))}
            </div>
            <button onClick={scrollToTop} className="inline-flex items-center gap-2 text-gray-400 hover:text-[#C9A962] transition-colors">
              <span>Back to Top</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            </button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Anorra Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
