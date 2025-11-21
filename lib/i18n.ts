export const languages = {
  fr: { name: 'Français', code: 'fr' },
  en: { name: 'English', code: 'en' },
};

export const defaultLanguage = 'fr';

export function getLanguageFromLocale(locale: string | undefined): 'fr' | 'en' {
  if (locale === 'en') return 'en';
  return 'fr';
}
