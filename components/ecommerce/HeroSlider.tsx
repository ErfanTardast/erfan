'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '@/lib/ecom-data';

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => setActive((p) => (p + 1) % HERO_SLIDES.length), []);
  const prev = useCallback(() => setActive((p) => (p - 1 + HERO_SLIDES.length) % HERO_SLIDES.length), []);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next, isPaused]);

  return (
    <div
      className="relative overflow-hidden rounded-lg md:rounded-xl mt-3 md:mt-4"
      style={{ height: 'clamp(220px, 40vw, 480px)' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === active ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{
            background: `linear-gradient(135deg, ${slide.bgFrom} 0%, ${slide.bgTo} 100%)`,
          }}
          aria-hidden={i !== active}
        >
          {/* Geometric decoration */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 80%, ${slide.accentColor} 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${slide.accentColor} 0%, transparent 40%)`,
            }}
          />
          {/* Abstract gear shape */}
          <svg
            className="absolute end-0 bottom-0 opacity-5 h-full w-auto"
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="200" cy="200" r="160" fill="none" stroke="white" strokeWidth="40" />
            <circle cx="200" cy="200" r="80" fill="none" stroke="white" strokeWidth="20" />
            <circle cx="200" cy="200" r="40" fill="white" />
            {Array.from({ length: 8 }).map((_, j) => {
              const angle = (j * Math.PI * 2) / 8;
              const x1 = 200 + Math.cos(angle) * 100;
              const y1 = 200 + Math.sin(angle) * 100;
              const x2 = 200 + Math.cos(angle) * 180;
              const y2 = 200 + Math.sin(angle) * 180;
              return <line key={j} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="24" strokeLinecap="round" />;
            })}
          </svg>

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-12 relative z-10">
              <span
                className="inline-block text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full mb-3 sm:mb-4"
                style={{ backgroundColor: slide.accentColor, color: slide.bgFrom }}
              >
                {slide.label}
              </span>
              <h2 className="text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-snug mb-2 sm:mb-3 max-w-xl">
                {slide.title}
              </h2>
              <p className="text-white/70 text-xs sm:text-sm md:text-base mb-4 sm:mb-6 max-w-md leading-relaxed">
                {slide.subtitle}
              </p>
              <button
                className="inline-flex items-center gap-2 text-white font-semibold text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-3 rounded-lg border-2 border-white/30 hover:bg-white hover:text-gray-900 transition-all duration-200"
                style={{ backgroundColor: slide.accentColor + '33' }}
              >
                {slide.cta}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Arrow — previous (end side in RTL = left side visually) */}
      <button
        onClick={prev}
        className="absolute start-3 sm:start-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
        aria-label="اسلاید قبلی"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Arrow — next */}
      <button
        onClick={next}
        className="absolute end-3 sm:end-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
        aria-label="اسلاید بعدی"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`rounded-full transition-all duration-300 ${
              i === active
                ? 'bg-white w-6 h-2'
                : 'bg-white/50 hover:bg-white/70 w-2 h-2'
            }`}
            aria-label={`اسلاید ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
