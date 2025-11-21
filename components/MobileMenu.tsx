'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';

interface MobileMenuProps {
  locale: string;
  translations: {
    nav: {
      studios: string;
      references: string;
      about: string;
      contact: string;
      menu: string;
      close: string;
    };
  };
}

export default function MobileMenu({ locale, translations }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const baseUrl = locale === 'fr' ? '' : `/${locale}`;

  const navItems = [
    { href: `${baseUrl}/#references`, label: translations.nav.references },
    { href: `${baseUrl}/#contact`, label: translations.nav.contact },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden z-50 relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
        aria-label={isOpen ? translations.nav.close : translations.nav.menu}
      >
        <span
          className={`w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <span
          className={`w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        />
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/98 backdrop-blur-2xl z-40 md:hidden transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-12">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-3xl font-extralight text-white/80 hover:text-white transition-all duration-300 tracking-wide uppercase"
              style={{
                transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                transform: isOpen ? 'translateY(0)' : 'translateY(-20px)',
                opacity: isOpen ? 1 : 0
              }}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-12">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </>
  );
}
