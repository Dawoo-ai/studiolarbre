import fs from 'fs';
import path from 'path';

export type Locale = 'fr' | 'en';

export interface Translations {
  nav: {
    studios: string;
    references: string;
    about: string;
    contact: string;
    menu: string;
    close: string;
  };
  hero: {
    tagline: string;
  };
  about: {
    title: string;
    intro: string;
    description: string;
    features: {
      title: string;
      mixing: string;
      recording: string;
      atmos: string;
      mastering: string;
    };
  };
  references: {
    title: string;
    subtitle: string;
  };
  contact: {
    title: string;
    cta: string;
  };
}

export async function getTranslations(locale: Locale): Promise<Translations> {
  const filePath = path.join(process.cwd(), 'public', 'locales', locale, 'common.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}
