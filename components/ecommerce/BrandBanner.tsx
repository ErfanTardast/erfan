import { ArrowLeft } from 'lucide-react';
import type { BrandBannerData } from '@/lib/ecom-data';

interface BrandBannerProps extends BrandBannerData {}

function SprocketSVG({ color }: { color: string }) {
  const teeth = Array.from({ length: 9 }).map((_, i) => {
    const a = (i * Math.PI * 2) / 9;
    return {
      x1: 64 + Math.cos(a) * 42,
      y1: 64 + Math.sin(a) * 42,
      x2: 64 + Math.cos(a) * 56,
      y2: 64 + Math.sin(a) * 56,
    };
  });
  return (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden>
      <circle cx="64" cy="64" r="50" stroke={color} strokeWidth="10" opacity="0.35" />
      <circle cx="64" cy="64" r="30" fill={color} opacity="0.12" />
      <circle cx="64" cy="64" r="14" fill={color} opacity="0.3" />
      {teeth.map((t, i) => (
        <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={color} strokeWidth="12" strokeLinecap="round" opacity="0.3" />
      ))}
    </svg>
  );
}

export function BrandBanner({
  brandName,
  brandNameEn,
  tagline,
  description,
  ctaText,
  bgFrom,
  bgTo,
  textColor,
  accentColor,
  shape,
}: BrandBannerProps) {
  return (
    <div
      className="relative overflow-hidden rounded-xl"
      style={{ background: `linear-gradient(135deg, ${bgFrom} 0%, ${bgTo} 100%)` }}
    >
      {/* Dot grid texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035]" aria-hidden>
        <defs>
          <pattern id={`bb-dot-${brandNameEn}`} width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill={textColor} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#bb-dot-${brandNameEn})`} />
      </svg>

      {/* Radial glow */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            shape === 'right'
              ? `radial-gradient(ellipse at 90% 50%, ${accentColor} 0%, transparent 65%)`
              : shape === 'left'
              ? `radial-gradient(ellipse at 10% 50%, ${accentColor} 0%, transparent 65%)`
              : `radial-gradient(ellipse at 50% 50%, ${accentColor} 0%, transparent 70%)`,
        }}
      />

      {/* Sprocket decorations */}
      <div className="absolute -end-8 -top-8 w-36 h-36 md:w-48 md:h-48 opacity-50">
        <SprocketSVG color={accentColor} />
      </div>
      <div className="absolute -start-6 -bottom-6 w-24 h-24 opacity-30">
        <SprocketSVG color={accentColor} />
      </div>

      <div className="relative z-10 flex items-center gap-4 sm:gap-6 px-5 sm:px-8 md:px-10 py-5 sm:py-7 md:py-9">
        {/* Brand initial badge */}
        <div className="hidden sm:flex flex-shrink-0 w-14 h-14 md:w-[72px] md:h-[72px] rounded-2xl items-center justify-center font-black text-lg md:text-2xl tracking-tight border-2"
          style={{ color: accentColor, borderColor: accentColor + '50', backgroundColor: accentColor + '15' }}>
          {brandNameEn?.slice(0, 3) ?? brandName.slice(0, 2)}
        </div>

        {/* Text content */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1" style={{ color: accentColor }}>
            {tagline}
          </p>
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black leading-none mb-1.5 sm:mb-2" style={{ color: textColor }}>
            {brandNameEn ?? brandName}
          </h3>
          <p className="text-[11px] sm:text-xs md:text-sm leading-relaxed max-w-sm opacity-75" style={{ color: textColor }}>
            {description}
          </p>
        </div>

        {/* CTA */}
        <button
          className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 hover:scale-105 hover:shadow-xl shadow-md whitespace-nowrap"
          style={{ backgroundColor: accentColor, color: bgFrom }}
        >
          {ctaText}
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
