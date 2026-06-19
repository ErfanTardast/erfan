import type { BrandBannerData } from '@/lib/ecom-data';

interface BrandBannerProps extends BrandBannerData {}

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
      {/* Decorative shapes */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            shape === 'left'
              ? `radial-gradient(ellipse at 10% 50%, ${accentColor} 0%, transparent 60%)`
              : shape === 'right'
              ? `radial-gradient(ellipse at 90% 50%, ${accentColor} 0%, transparent 60%)`
              : `radial-gradient(ellipse at 50% 50%, ${accentColor} 0%, transparent 70%)`,
        }}
      />

      {/* Geometric circles */}
      <div
        className="absolute end-0 top-0 w-48 h-48 md:w-64 md:h-64 rounded-full opacity-[0.06] -translate-y-1/4 translate-x-1/4"
        style={{ backgroundColor: accentColor }}
      />
      <div
        className="absolute start-4 bottom-0 w-32 h-32 rounded-full opacity-[0.04] translate-y-1/4"
        style={{ backgroundColor: accentColor }}
      />

      <div className="relative z-10 flex items-center justify-between px-5 sm:px-8 md:px-10 py-5 sm:py-6 md:py-8 gap-4">
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
            <span
              className="text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-70"
              style={{ color: accentColor }}
            >
              {tagline}
            </span>
          </div>
          <h3
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black leading-none mb-1.5 sm:mb-2"
            style={{ color: textColor }}
          >
            {brandNameEn ?? brandName}
          </h3>
          <p
            className="text-[11px] sm:text-xs md:text-sm leading-relaxed max-w-md opacity-80"
            style={{ color: textColor }}
          >
            {description}
          </p>
        </div>

        {/* Brand initial badge */}
        <div className="hidden sm:flex flex-shrink-0">
          <div
            className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center font-black text-lg md:text-2xl tracking-tight border-2 opacity-80"
            style={{ color: textColor, borderColor: accentColor + '60' }}
          >
            {brandNameEn?.slice(0, 2) ?? brandName.slice(0, 2)}
          </div>
        </div>

        {/* CTA */}
        <button
          className="flex-shrink-0 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 hover:scale-105 hover:shadow-lg whitespace-nowrap"
          style={{
            backgroundColor: accentColor,
            color: bgFrom,
          }}
        >
          {ctaText}
        </button>
      </div>
    </div>
  );
}
