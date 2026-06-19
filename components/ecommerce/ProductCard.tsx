'use client';

import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { fmtPrice, toFa } from '@/lib/format';
import type { BeltProduct } from '@/lib/ecom-data';

// ── Industrial belt drive illustration ────────────────────────────────────────

function BeltIllustration() {
  const bigTeeth = Array.from({ length: 8 }).map((_, i) => {
    const a = (i * Math.PI * 2) / 8 - Math.PI / 8;
    return {
      x1: 54 + Math.cos(a) * 36, y1: 80 + Math.sin(a) * 36,
      x2: 54 + Math.cos(a) * 45, y2: 80 + Math.sin(a) * 45,
    };
  });
  const smallTeeth = Array.from({ length: 6 }).map((_, i) => {
    const a = (i * Math.PI * 2) / 6;
    return {
      x1: 150 + Math.cos(a) * 23, y1: 80 + Math.sin(a) * 23,
      x2: 150 + Math.cos(a) * 30, y2: 80 + Math.sin(a) * 30,
    };
  });

  // Quadratic bezier teeth marks along top strand
  // P0=(54,38), P1=(102,26), P2=(150,52)
  const beltTeeth = Array.from({ length: 7 }).map((_, i) => {
    const t = (i + 0.5) / 7;
    const x = (1 - t) * (1 - t) * 54 + 2 * t * (1 - t) * 102 + t * t * 150;
    const y = (1 - t) * (1 - t) * 38 + 2 * t * (1 - t) * 26 + t * t * 52;
    const dx = 2 * (1 - t) * (102 - 54) + 2 * t * (150 - 102);
    const dy = 2 * (1 - t) * (26 - 38) + 2 * t * (52 - 26);
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const nx = (-dy / len) * 5;
    const ny = (dx / len) * 5;
    return { x1: x - nx, y1: y - ny, x2: x + nx, y2: y + ny };
  });

  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[72%] h-[72%]"
      aria-hidden
    >
      {/* Large left sprocket */}
      <circle cx="54" cy="80" r="42" stroke="#1e293b" strokeWidth="4.5" opacity="0.5" />
      <circle cx="54" cy="80" r="30" fill="#1e293b" opacity="0.2" />
      <circle cx="54" cy="80" r="11" fill="#334155" opacity="0.4" />
      {bigTeeth.map((t, i) => (
        <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
          stroke="#1e293b" strokeWidth="7" strokeLinecap="round" opacity="0.5" />
      ))}

      {/* Small right sprocket */}
      <circle cx="150" cy="80" r="28" stroke="#1e293b" strokeWidth="3.5" opacity="0.5" />
      <circle cx="150" cy="80" r="18" fill="#1e293b" opacity="0.2" />
      <circle cx="150" cy="80" r="7" fill="#334155" opacity="0.4" />
      {smallTeeth.map((t, i) => (
        <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
          stroke="#1e293b" strokeWidth="5.5" strokeLinecap="round" opacity="0.5" />
      ))}

      {/* Top belt strand */}
      <path d="M54 38 Q102 26 150 52" stroke="#1e293b" strokeWidth="12"
        strokeLinecap="round" opacity="0.42" />
      {/* Belt teeth marks */}
      {beltTeeth.map((t, i) => (
        <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
          stroke="#f8fafc" strokeWidth="2.5" opacity="0.55" />
      ))}

      {/* Bottom belt strand */}
      <path d="M54 122 Q102 134 150 108" stroke="#1e293b" strokeWidth="12"
        strokeLinecap="round" opacity="0.42" />
    </svg>
  );
}

// ── Star rating ───────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" dir="ltr">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 ${
            i < Math.floor(rating)
              ? 'fill-amber-400 text-amber-400'
              : i < rating
              ? 'fill-amber-200 text-amber-300'
              : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface ProductCardProps {
  product: BeltProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { brand, title, rating, reviewCount, discountPercent, hasInstallment,
    stockCount, price, originalPrice, isNew, bgFrom, bgTo } = product;

  return (
    <article className="ec-card bg-white rounded-xl border border-gray-100 overflow-hidden flex flex-col group">

      {/* ── Image area ─────────────────────────────────────────── */}
      <div
        className="relative aspect-square flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(145deg, ${bgFrom} 0%, ${bgTo} 100%)` }}
      >
        {/* Dot grid texture */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" aria-hidden>
          <defs>
            <pattern id={`dot-${product.id}`} width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="#1e293b" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#dot-${product.id})`} />
        </svg>

        <BeltIllustration />

        {/* Discount badge — round */}
        {discountPercent && (
          <div className="absolute top-2 start-2 bg-red-600 text-white rounded-full w-9 h-9 sm:w-10 sm:h-10 flex flex-col items-center justify-center shadow-md">
            <span className="text-[10px] sm:text-[11px] font-black leading-none">
              {toFa(discountPercent)}٪
            </span>
          </div>
        )}

        {/* New badge */}
        {isNew && !discountPercent && (
          <div className="absolute top-2 start-2 bg-emerald-600 text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            جدید
          </div>
        )}

        {/* Brand chip */}
        <div className="absolute top-2 end-2 bg-white/90 backdrop-blur-sm text-gray-700 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm border border-white/60 max-w-[70px] truncate">
          {brand}
        </div>
      </div>

      {/* ── Card body ──────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-2.5 sm:p-3 gap-1.5">

        {/* Title */}
        <h3 className="text-[11px] sm:text-[12px] md:text-[13px] font-semibold text-gray-800 leading-snug line-clamp-2 min-h-[2.6em]">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <StarRating rating={rating} />
          <span className="text-[9px] sm:text-[10px] text-gray-500 leading-none">
            {toFa(rating.toFixed(1))}
            <span className="text-gray-300 mx-0.5">|</span>
            {toFa(reviewCount)} نظر
          </span>
        </div>

        {/* Urgency & installment badges */}
        <div className="flex flex-col gap-1">
          {hasInstallment && (
            <span className="inline-flex items-center w-fit text-[9px] sm:text-[10px] bg-blue-50 text-blue-700 border border-blue-100 rounded-full px-2 py-0.5 font-semibold">
              خرید در ۴ قسط بدون بهره
            </span>
          )}
          {stockCount !== undefined && stockCount <= 5 && (
            <span className="inline-flex items-center w-fit text-[9px] sm:text-[10px] bg-amber-50 text-amber-700 border border-amber-100 rounded-full px-2 py-0.5 font-semibold">
              فقط {toFa(stockCount)} عدد در انبار
            </span>
          )}
        </div>

        {/* Push price to bottom */}
        <div className="flex-1" />

        {/* Price block */}
        <div className="space-y-0.5 pt-1 border-t border-gray-50">
          {originalPrice && (
            <div className="flex items-center gap-1.5">
              {discountPercent && (
                <span className="text-[9px] sm:text-[10px] bg-red-100 text-red-700 rounded px-1 py-0.5 font-bold leading-none flex-shrink-0">
                  {toFa(discountPercent)}٪
                </span>
              )}
              <span className="text-[10px] sm:text-[11px] text-gray-400 line-through leading-none">
                {toFa(originalPrice.toLocaleString('en-US'))}
              </span>
            </div>
          )}
          <p className="text-[13px] sm:text-sm md:text-[15px] font-bold text-gray-900 leading-tight tabular-nums">
            {fmtPrice(price)}
          </p>
        </div>

        {/* Add to cart */}
        <button
          className="w-full bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white text-[10px] sm:text-[11px] font-bold py-2 sm:py-2.5 rounded-lg transition-all duration-150 flex items-center justify-center gap-1.5 mt-1"
          aria-label={`افزودن ${title} به سبد خرید`}
        >
          <ShoppingCart className="w-3.5 h-3.5 flex-shrink-0" />
          افزودن به سبد خرید
        </button>
      </div>
    </article>
  );
}
