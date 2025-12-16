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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Shuffle all photos on mount
    const shuffled = [...studioPhotos].sort(() => Math.random() - 0.5);
    setShuffledPhotos(shuffled);
  }, []);

  useEffect(() => {
    // Check if desktop
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    return () => {
      window.removeEventListener('resize', checkDesktop);
    };
  }, []);

  // Desktop: Enable horizontal scroll with mouse wheel and trackpad
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth >= 768) {
        e.preventDefault();
        // Support both vertical scroll (mouse wheel) and horizontal swipe (trackpad)
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        container.scrollLeft += delta * 0.5;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [shuffledPhotos]);

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

  // Video autoplay: play video when scrolled into view
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay was prevented
            });
          } else {
            if (!isDesktop) {
              video.pause();
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [isDesktop]);

  return (
    <section className="pb-32 md:pb-40 bg-black">
      <div className="container mx-auto px-8 max-w-[1600px]">
        <div className="flex flex-col gap-12 md:gap-20 lg:gap-24 md:items-center">
          {/* Video */}
          <div className="group relative w-full aspect-[9/16] md:w-[450px] overflow-hidden">
            <video
              ref={videoRef}
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
          <div className="relative w-full aspect-[9/16] md:w-[450px]">
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto overflow-y-hidden h-full snap-x snap-mandatory scrollbar-hide hover:cursor-grab active:cursor-grabbing"
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
