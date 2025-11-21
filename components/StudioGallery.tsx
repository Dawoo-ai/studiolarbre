'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function StudioGallery() {
  const studioPhotos = [
    '/images/studio/door.jpg',
    '/images/studio/walllight.jpg',
    '/images/studio/wall2.jpg',
    '/images/studio/wall3.jpg',
    '/images/studio/main_studio.jpg',
    '/images/studio/1P1A0988.jpg',
    '/images/studio/1P1A1075.jpg',
  ];

  const [shuffledPhotos, setShuffledPhotos] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Shuffle all photos on mount
    const shuffled = [...studioPhotos].sort(() => Math.random() - 0.5);
    setShuffledPhotos(shuffled);
  }, []);

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollLeft = container.clientWidth * index;
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const index = Math.round(container.scrollLeft / container.clientWidth);
      setCurrentIndex(index);
    }
  };

  return (
    <section className="pb-32 md:pb-40 bg-black">
      <div className="container mx-auto px-8 md:px-20 lg:px-32 max-w-[1800px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 lg:gap-24">
          {/* Video */}
          <div className="group relative aspect-[3/4] overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.02] grayscale-[30%] group-hover:grayscale-0"
            >
              <source src="/video/videostudio.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-700" />
          </div>

          {/* Horizontal Scroll Carousel */}
          <div className="relative">
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto overflow-y-hidden aspect-[3/4] snap-x snap-mandatory scrollbar-hide"
              style={{
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {shuffledPhotos.map((photo, index) => (
                <div
                  key={index}
                  className="group relative flex-shrink-0 w-full snap-center snap-always"
                >
                  <Image
                    src={photo}
                    alt="Studio L'Arbre"
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-[1.02] grayscale-[30%] group-hover:grayscale-0"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={95}
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-700 pointer-events-none" />
                </div>
              ))}
            </div>

            {/* Dot Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {shuffledPhotos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'bg-white w-6'
                      : 'bg-white/30 hover:bg-white/50 w-1.5'
                  }`}
                  aria-label={`Go to photo ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
