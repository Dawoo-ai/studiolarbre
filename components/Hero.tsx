import Image from 'next/image';

interface HeroProps {
  tagline: string;
}

export default function Hero({ tagline }: HeroProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/studio/covermain.jpg"
          alt="Studio L'Arbre"
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
          <h1 className="text-5xl font-medium text-white md:text-7xl lg:text-[7rem] xl:text-[8rem] leading-[1.1] tracking-tight animate-fade-in" style={{ fontFamily: 'var(--font-degular-display, var(--font-geist-sans))' }}>
            {tagline}
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
