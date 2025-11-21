'use client';

import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';

interface NavigationProps {
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

export default function Navigation({ locale, translations }: NavigationProps) {
  const baseUrl = locale === 'fr' ? '' : `/${locale}`;

  const navItems = [
    { href: `${baseUrl}/#references`, label: translations.nav.references },
    { href: `${baseUrl}/#contact`, label: translations.nav.contact },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full bg-black/60 backdrop-blur-xl border-b border-white/5">
      <div className="container mx-auto flex items-center justify-between px-6 py-5 md:px-12">
        {/* Logo */}
        <Link href={baseUrl || '/'} className="text-lg md:text-xl font-extralight text-white tracking-widest uppercase">
          Larbre
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-light text-white/70 hover:text-white transition-all duration-300 tracking-wider uppercase"
            >
              {item.label}
            </Link>
          ))}
          <div className="ml-4">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu locale={locale} translations={translations} />
      </div>
    </nav>
  );
}
