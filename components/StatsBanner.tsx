'use client';

import { useEffect, useRef, useState } from 'react';

export default function StatsBanner() {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const targetCount = 300;
    const steps = 60;
    const increment = targetCount / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setCount(targetCount);
        clearInterval(timer);
      } else {
        setCount(Math.floor(increment * currentStep));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-20 md:py-24 bg-black border-y border-white/5">
      <div className="container mx-auto px-8 md:px-20 lg:px-32 max-w-[1600px]">
        <div className="flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight text-white tracking-tight">
              +{count}
            </div>
            <div className="text-xs md:text-sm text-white/40 font-light tracking-[0.25em] uppercase">
              artistes avec qui nous avons collaboré
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
