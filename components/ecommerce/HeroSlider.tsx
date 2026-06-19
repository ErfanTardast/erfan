'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '@/lib/ecom-data';

function GearDecoration({ color }: { color: string }) {
  return (
    <svg
      className="absolute end-0 bottom-0 h-full w-auto opacity-[0.06]"
      viewBox="0 0 420 380"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Large gear */}
      <circle cx="280" cy="190" r="140" fill="none" stroke={color} strokeWidth="30" />
      <circle cx="280" cy="190" r="80" fill="none" stroke={color} strokeWidth="16" />
      <circle cx="280" cy="190" r="28" fill={color} opacity="0.6" />
      {Array.from({ length: 10 }).map((_, j) => {
        const a = (j * Math.PI * 2) / 10;
        return (
          <line
            key={j}
            x1={280 + Math.cos(a) * 88}
            y1={190 + Math.sin(a) * 88}
            x2={280 + Math.cos(a) * 152}
            y2={190 + Math.sin(a) * 152}
            stroke={color}
            strokeWidth="24"
            strokeLinecap="round"
          />
        );
      })}
      {/* Small gear */}
      <circle cx="100" cy="100" r="60" fill="none" stroke={color} strokeWidth="18" />
      <circle cx="100" cy="100" r="28" fill="none" stroke={color} strokeWidth="10" />
      <circle cx="100" cy="100" r="12" fill={color} opacity="0.5" />
      {Array.from({ length: 7 }).map((_, j) => {
        const a = (j * Math.PI * 2) / 7;
        return (
          <line
            key={j}
            x1={100 + Math.cos(a) * 35}
            y1={100 + Math.sin(a) * 35}
            x2={100 + Math.cos(a) * 65}
            y2={100 + Math.sin(a) * 65}
            stroke={color}
            strokeWidth="16"
            strokeLinecap="round"
          />
        );
      })}
      {/* Belt connecting them */}
      <path
        d="M142 72 Q190 30 252 82"
        fill="none"
        stroke={color}
        strokeWidth="18"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M142 128 Q190 170 252 130"
        fill="none"
        stroke={color}
        strokeWidth="18"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

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
      style={{ height: 'clamp(200px, 38vw, 460px)' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === active ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{ background: `linear-gradient(135deg, ${slide.bgFrom} 0%, ${slide.bgTo} 100%)` }}
          aria-hidden={i !== active}
        >
          {/* Radial accent glow */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `radial-gradient(ellipse at 85% 50%, ${slide.accentColor} 0%, transparent 55%)`,
            }}
          />

          <GearDecoration color={slide.accentColor} />

          {/* Dot pattern overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" aria-hidden>
            <defs>
              <pattern id={`hero-dot-${i}`} width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#hero-dot-${i})`} />
          </svg>

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-12 relative z-10">
              <span
                className="inline-block text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full mb-3 sm:mb-4 tracking-wide"
                style={{ backgroundColor: slide.accentColor + '30', color: slide.accentColor, border: `1px solid ${slide.accentColor}50` }}
              >
                {slide.label}
              </span>
              <h2 className="text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-2 sm:mb-3 max-w-lg drop-shadow-sm">
                {slide.title}
              </h2>
              <p className="text-white/75 text-xs sm:text-sm md:text-[15px] mb-5 sm:mb-7 max-w-md leading-relaxed">
                {slide.subtitle}
              </p>
              <button
                className="inline-flex items-center gap-2 font-bold text-xs sm:text-sm px-5 sm:px-7 py-2.5 sm:py-3 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-xl shadow-md"
                style={{ backgroundColor: slide.accentColor, color: slide.bgFrom }}
              >
                {slide.cta}
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Prev arrow (start = right in RTL) */}
      <button
        onClick={prev}
        className="absolute start-3 sm:start-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 border border-white/20"
        aria-label="اسلاید قبلی"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Next arrow */}
      <button
        onClick={next}
        className="absolute end-3 sm:end-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 border border-white/20"
        aria-label="اسلاید بعدی"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`rounded-full transition-all duration-300 ${
              i === active ? 'bg-white w-6 sm:w-8 h-2' : 'bg-white/45 hover:bg-white/65 w-2 h-2'
            }`}
            aria-label={`اسلاید ${i + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute top-3 start-3 z-20 text-white/60 text-[10px] font-mono tabular-nums select-none">
        {active + 1} / {HERO_SLIDES.length}
      </div>
    </div>
  );
}
