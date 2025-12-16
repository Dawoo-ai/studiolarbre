'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import './CoverFlow.css';

interface Artist {
  id: number;
  name: string;
  image: string;
}

interface CoverFlowProps {
  title: string;
  subtitle?: string;
}

export default function CoverFlow({ title, subtitle }: CoverFlowProps) {
  const artists: Artist[] = [
    { id: 1, name: 'Vacra', image: '/images/artist/vacra.jpeg' },
    { id: 2, name: '1D1R', image: '/images/artist/1D1R.jpg' },
    { id: 3, name: 'Arca M', image: '/images/artist/acramM.jpeg' },
    { id: 4, name: 'Gisèle', image: '/images/artist/gisel.jpeg' },
    { id: 5, name: 'Nash', image: '/images/artist/nash.jpg' },
    { id: 6, name: 'Louga', image: '/images/artist/Louga.jpg' },
    { id: 7, name: 'Edmée', image: '/images/artist/Edmee.jpg' },
    { id: 8, name: 'Ero', image: '/images/artist/Ero -.jpg' },
    { id: 9, name: 'GSO', image: '/images/artist/GSO.jpg' },
    { id: 10, name: 'Holy Jacobs', image: '/images/artist/Holy Jacobs.jpg' },
    { id: 11, name: 'I2D', image: '/images/artist/I2D.jpg' },
    { id: 12, name: 'Jeebaby', image: '/images/artist/Jeebaby.jpg' },
    { id: 13, name: 'Labor', image: '/images/artist/Labor.jpg' },
    { id: 14, name: 'Laskad', image: '/images/artist/Laskad.png' },
    { id: 15, name: 'Mutha Madiba', image: '/images/artist/Mutha Madiba.jpg' },
    { id: 16, name: 'Noskro', image: '/images/artist/Noskro.jpg' },
    { id: 17, name: 'Oulmerie', image: '/images/artist/Oulmerie.jpg' },
    { id: 18, name: 'Pietra', image: '/images/artist/Pietra.jpg' },
    { id: 19, name: 'Quiterie', image: '/images/artist/Quiterie.jpg' },
    { id: 20, name: 'Wookiz', image: '/images/artist/Wookiz.jpg' },
  ];

  const listRef = useRef<HTMLUListElement>(null);
  const [supportsScrollTimeline, setSupportsScrollTimeline] = useState(true);
  const autoScrollRef = useRef<number | null>(null);
  const isDesktopRef = useRef(false);
  const [showArrows, setShowArrows] = useState(false);

  // Handle scroll navigation for mobile
  const scrollToNext = () => {
    if (!listRef.current) return;
    const list = listRef.current;
    const itemWidth = list.querySelector('.coverflow-item')?.clientWidth || 0;
    list.scrollBy({ left: itemWidth, behavior: 'smooth' });
  };

  const scrollToPrev = () => {
    if (!listRef.current) return;
    const list = listRef.current;
    const itemWidth = list.querySelector('.coverflow-item')?.clientWidth || 0;
    list.scrollBy({ left: -itemWidth, behavior: 'smooth' });
  };

  // Desktop: Enable horizontal scroll with mouse wheel and trackpad
  useEffect(() => {
    const checkDesktop = () => {
      isDesktopRef.current = window.innerWidth >= 768;
      setShowArrows(!isDesktopRef.current);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    const list = listRef.current;
    if (!list) return;

    // Desktop: Enable wheel scroll horizontally
    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth < 768) return; // Check window width directly
      e.preventDefault();
      // Support both vertical scroll (mouse wheel) and horizontal swipe (trackpad)
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      list.scrollLeft += delta;
    };

    list.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('resize', checkDesktop);
      list.removeEventListener('wheel', handleWheel);
    };
  }, []);

  useEffect(() => {
    // Check for CSS Scroll-Driven Animations support
    const hasSupport = CSS.supports('animation-timeline', 'scroll()');
    setSupportsScrollTimeline(hasSupport);

    if (hasSupport) return; // CSS handles everything

    // Fallback: Use IntersectionObserver for browsers without support
    const list = listRef.current;
    if (!list) return;

    const items = list.querySelectorAll('.coverflow-item');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const item = entry.target as HTMLElement;
          const ratio = entry.intersectionRatio;
          const rect = entry.boundingClientRect;
          const listRect = list.getBoundingClientRect();

          // Calculate position relative to center
          const itemCenter = rect.left + rect.width / 2;
          const listCenter = listRect.left + listRect.width / 2;
          const offset = (itemCenter - listCenter) / (listRect.width / 2);

          // Apply transforms based on position
          const wrapper = item.querySelector('.coverflow-image-wrapper') as HTMLElement;
          const reflection = item.querySelector('.coverflow-reflection') as HTMLElement;
          const caption = item.querySelector('.coverflow-caption') as HTMLElement;

          if (wrapper) {
            const rotateY = Math.max(-45, Math.min(45, offset * 45));
            const translateX = offset * 50;
            const scale = 1 - Math.abs(offset) * 0.2;
            const zIndex = Math.round(100 - Math.abs(offset) * 50);

            wrapper.style.transform = `translateX(${translateX}%) rotateY(${rotateY}deg) scale(${scale})`;
            item.style.zIndex = String(zIndex);

            if (reflection) {
              reflection.style.transform = `scaleY(-1) translateX(${translateX}%) rotateY(${rotateY}deg) scale(${scale})`;
            }
          }

          if (caption) {
            caption.style.opacity = String(Math.max(0, 1 - Math.abs(offset) * 2));
          }
        });
      },
      {
        root: list,
        threshold: Array.from({ length: 101 }, (_, i) => i / 100),
        rootMargin: '0px',
      }
    );

    items.forEach((item) => observer.observe(item));

    // Also update on scroll for smoother effect
    const handleScroll = () => {
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const listRect = list.getBoundingClientRect();
        const itemCenter = rect.left + rect.width / 2;
        const listCenter = listRect.left + listRect.width / 2;
        const offset = (itemCenter - listCenter) / (listRect.width / 3);

        const wrapper = item.querySelector('.coverflow-image-wrapper') as HTMLElement;
        const reflection = item.querySelector('.coverflow-reflection') as HTMLElement;
        const caption = item.querySelector('.coverflow-caption') as HTMLElement;

        if (wrapper) {
          const clampedOffset = Math.max(-1, Math.min(1, offset));
          const rotateY = clampedOffset * 45;
          const translateX = clampedOffset * 50;
          const scale = 1 - Math.abs(clampedOffset) * 0.15;
          const zIndex = Math.round(100 - Math.abs(clampedOffset) * 50);

          wrapper.style.transform = `translateX(${translateX}%) rotateY(${rotateY}deg) scale(${scale})`;
          (item as HTMLElement).style.zIndex = String(zIndex);

          if (reflection) {
            reflection.style.transform = `scaleY(-1) translateX(${translateX}%) rotateY(${rotateY}deg) scale(${scale})`;
          }
        }

        if (caption) {
          const opacity = Math.max(0, 1 - Math.abs(offset) * 1.5);
          caption.style.opacity = String(opacity);
        }
      });
    };

    list.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      observer.disconnect();
      list.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="references" className="min-h-screen flex flex-col justify-center py-24 md:py-32 bg-zinc-950 overflow-hidden">
      {/* Section Header */}
      <div className="container mx-auto px-8 md:px-20 lg:px-32 max-w-[1600px] mb-16 md:mb-24">
        <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight text-white tracking-tight leading-[0.95] mb-6">
          {title}
        </h2>
        {subtitle && (
          <p className="text-base md:text-lg lg:text-xl text-white/40 font-light leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Cover Flow Container */}
      <div className="coverflow-wrapper">
        {/* Mobile Navigation Arrows */}
        {showArrows && (
          <>
            <button
              onClick={scrollToPrev}
              className="md:hidden absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300"
              aria-label="Previous artist"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={scrollToNext}
              className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300"
              aria-label="Next artist"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
        <ul
          ref={listRef}
          className={`coverflow-list ${supportsScrollTimeline ? 'css-scroll-driven' : 'js-fallback'} hover:cursor-grab active:cursor-grabbing`}
        >
          {artists.map((artist) => (
            <li key={artist.id} className="coverflow-item">
              <figure className="coverflow-figure">
                <div className="coverflow-image-wrapper">
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    fill
                    className="coverflow-image"
                    sizes="(max-width: 768px) 250px, 320px"
                    draggable={false}
                    priority
                  />
                  {/* Shine overlay */}
                  <div className="coverflow-shine" />
                </div>
                {/* Reflection */}
                <div className="coverflow-reflection">
                  <Image
                    src={artist.image}
                    alt=""
                    fill
                    className="coverflow-image"
                    sizes="(max-width: 768px) 250px, 320px"
                    draggable={false}
                  />
                </div>
                <figcaption className="coverflow-caption">
                  {artist.name}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
