import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import StudioGallery from '@/components/StudioGallery';
import CoverFlow from '@/components/CoverFlow';
import StatsBanner from '@/components/StatsBanner';
import Contact from '@/components/Contact';
import { getTranslations } from '@/lib/getTranslations';

export default async function EnglishHome() {
  const translations = await getTranslations('en');

  return (
    <div className="min-h-screen bg-black">
      <Navigation locale="en" translations={translations} />
      <Hero tagline={translations.hero.tagline} />
      <div className="h-16 md:h-24 lg:h-32 bg-black" />
      <StudioGallery />
      <CoverFlow
        title={translations.references.title}
        subtitle={translations.references.subtitle}
      />
      <StatsBanner />
      <Contact translations={translations.contact} />
    </div>
  );
}

export const metadata = {
  title: 'Studio L\'Arbre - Recording Mixing and Atmos Studios in Paris',
  description: 'Professional recording studio in Paris offering high-fidelity recording, mixing, mastering, and Dolby Atmos services.',
};
