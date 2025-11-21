'use client';

import { useRouter, usePathname } from 'next/navigation';
import { languages } from '@/lib/i18n';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = pathname.startsWith('/en') ? 'en' : 'fr';

  const switchLanguage = (locale: string) => {
    if (locale === currentLocale) return;

    // Remove current locale from pathname if it exists
    let newPathname = pathname.replace(/^\/(fr|en)/, '');

    // Add new locale (except for default 'fr' which can be omitted)
    if (locale !== 'fr') {
      newPathname = `/${locale}${newPathname || '/'}`;
    } else {
      newPathname = newPathname || '/';
    }

    router.push(newPathname);
  };

  return (
    <div className="flex items-center gap-1">
      {Object.entries(languages).map(([code, { name }]) => (
        <button
          key={code}
          onClick={() => switchLanguage(code)}
          className={`px-3 py-1.5 text-xs font-light tracking-wider transition-all duration-300 ${
            currentLocale === code
              ? 'text-white'
              : 'text-white/40 hover:text-white/70'
          }`}
          aria-label={`Switch to ${name}`}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
