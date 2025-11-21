import Image from 'next/image';

interface HeroProps {
  tagline: string;
}

export default function Hero({ tagline }: HeroProps) {
  // Split tagline to put "Paris" on its own line for desktop
  const parisIndex = tagline.toLowerCase().lastIndexOf('paris');
  const hasParis = parisIndex !== -1;
  const beforeParis = hasParis ? tagline.slice(0, parisIndex).trim() : tagline;
  const parisText = hasParis ? tagline.slice(parisIndex) : '';

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image - Mobile */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/images/studio/covermain.jpg"
          alt="Studio Larbre"
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>
      {/* Background Image - Desktop */}
      <div className="absolute inset-0 hidden md:block">
        <Image
          src="/images/studio/main_studio.jpg"
          alt="Studio Larbre"
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-8 md:px-16">
        <div className="text-center max-w-7xl">
          {/* Mobile: single line */}
          <h1 className="md:hidden text-5xl font-medium text-white leading-[1.1] tracking-tight animate-fade-in" style={{ fontFamily: 'var(--font-degular-display, var(--font-geist-sans))' }}>
            {tagline}
          </h1>
          {/* Desktop: Paris on separate line */}
          <h1 className="hidden md:block text-7xl lg:text-[7rem] xl:text-[8rem] font-medium text-white leading-[1.1] tracking-tight animate-fade-in" style={{ fontFamily: 'var(--font-degular-display, var(--font-geist-sans))' }}>
            {hasParis ? (
              <>
                {beforeParis}
                <br />
                {parisText}
              </>
            ) : tagline}
          </h1>
          <div className="flex justify-center mt-12 md:mt-16">
            <div className="h-px w-16 md:w-20 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
        </div>
      </div>

      {/* Minimal scroll indicator */}
      <div className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2">
        <div className="w-px h-20 md:h-24 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
