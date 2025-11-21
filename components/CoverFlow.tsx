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
    { id: 1, name: '1D1R', image: '/images/artist/1D1R.jpg' },
    { id: 2, name: 'Vacra', image: '/images/artist/vacra.jpeg' },
    { id: 3, name: 'Arca M', image: '/images/artist/acramM.jpeg' },
    { id: 4, name: 'Gisèle', image: '/images/artist/gisel.jpeg' },
    { id: 5, name: 'Nash', image: '/images/artist/nash.jpg' },
  ];

  const listRef = useRef<HTMLUListElement>(null);
  const [supportsScrollTimeline, setSupportsScrollTimeline] = useState(true);
  const autoScrollRef = useRef<number | null>(null);
  const isDesktopRef = useRef(false);

  // Auto-scroll effect for desktop only
  useEffect(() => {
    const checkDesktop = () => {
      isDesktopRef.current = window.innerWidth >= 768;
      // Update auto-scrolling class based on desktop state
      if (listRef.current) {
        if (isDesktopRef.current) {
          listRef.current.classList.add('auto-scrolling');
        } else {
          listRef.current.classList.remove('auto-scrolling');
        }
      }
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    const list = listRef.current;
    if (!list) return;

    let scrollDirection = 1;
    let isPaused = false;

    const autoScroll = () => {
      if (!isDesktopRef.current || isPaused) {
        autoScrollRef.current = requestAnimationFrame(autoScroll);
        return;
      }

      const maxScroll = list.scrollWidth - list.clientWidth;
      const currentScroll = list.scrollLeft;

      // Reverse direction at edges
      if (currentScroll >= maxScroll - 1) {
        scrollDirection = -1;
      } else if (currentScroll <= 1) {
        scrollDirection = 1;
      }

      list.scrollLeft += scrollDirection * 0.8;
      autoScrollRef.current = requestAnimationFrame(autoScroll);
    };

    // Pause on hover/touch - re-enable snap for manual scrolling
    const handleMouseEnter = () => {
      isPaused = true;
      list.classList.remove('auto-scrolling');
    };
    const handleMouseLeave = () => {
      isPaused = false;
      if (isDesktopRef.current) {
        list.classList.add('auto-scrolling');
      }
    };
    const handleTouchStart = () => {
      isPaused = true;
      list.classList.remove('auto-scrolling');
    };
    const handleTouchEnd = () => {
      setTimeout(() => {
        isPaused = false;
        if (isDesktopRef.current) {
          list.classList.add('auto-scrolling');
        }
      }, 2000);
    };

    list.addEventListener('mouseenter', handleMouseEnter);
    list.addEventListener('mouseleave', handleMouseLeave);
    list.addEventListener('touchstart', handleTouchStart);
    list.addEventListener('touchend', handleTouchEnd);

    // Start auto-scroll with a small delay
    setTimeout(() => {
      autoScrollRef.current = requestAnimationFrame(autoScroll);
    }, 1000);

    return () => {
      window.removeEventListener('resize', checkDesktop);
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
      }
      list.removeEventListener('mouseenter', handleMouseEnter);
      list.removeEventListener('mouseleave', handleMouseLeave);
      list.removeEventListener('touchstart', handleTouchStart);
      list.removeEventListener('touchend', handleTouchEnd);
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
        <ul
          ref={listRef}
          className={`coverflow-list ${supportsScrollTimeline ? 'css-scroll-driven' : 'js-fallback'}`}
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
