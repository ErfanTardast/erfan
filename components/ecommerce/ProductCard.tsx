'use client';

import { ShoppingCart, Star } from 'lucide-react';
import { fmtPrice, toFa } from '@/lib/format';
import type { BeltProduct } from '@/lib/ecom-data';

interface ProductCardProps {
  product: BeltProduct;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" dir="ltr">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 flex-shrink-0 ${
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

export function ProductCard({ product }: ProductCardProps) {
  const {
    brand,
    title,
    rating,
    reviewCount,
    discountPercent,
    hasInstallment,
    stockCount,
    price,
    originalPrice,
    isNew,
    bgFrom,
    bgTo,
  } = product;

  return (
    <article className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col group w-full">
      {/* Image area */}
      <div
        className="relative aspect-[4/3] flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${bgFrom}, ${bgTo})` }}
      >
        {/* Decorative belt shape */}
        <svg viewBox="0 0 120 80" className="w-24 h-16 sm:w-28 sm:h-20 opacity-25" aria-hidden>
          <rect x="10" y="30" width="100" height="20" rx="10" fill="none" stroke="#374151" strokeWidth="5" />
          <rect x="10" y="30" width="100" height="20" rx="10" fill="none" stroke="#374151" strokeWidth="2" strokeDasharray="6 4" />
          <circle cx="20" cy="40" r="15" fill="none" stroke="#374151" strokeWidth="4" />
          <circle cx="100" cy="40" r="15" fill="none" stroke="#374151" strokeWidth="4" />
          <circle cx="20" cy="40" r="6" fill="#374151" />
          <circle cx="100" cy="40" r="6" fill="#374151" />
        </svg>

        {/* Brand label */}
        <span className="absolute top-2 end-2 bg-white/90 backdrop-blur-sm text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
          {brand}
        </span>

        {/* Discount badge */}
        {discountPercent && (
          <span className="absolute top-2 start-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md leading-none">
            %{toFa(discountPercent)}
          </span>
        )}

        {/* New badge */}
        {isNew && !discountPercent && (
          <span className="absolute top-2 start-2 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md leading-none">
            جدید
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-2.5 sm:p-3 gap-1.5 sm:gap-2">
        {/* Title */}
        <h3 className="text-[11px] sm:text-xs md:text-[13px] font-semibold text-gray-800 leading-snug line-clamp-2 min-h-[2.5em]">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <StarRating rating={rating} />
          <span className="text-[9px] sm:text-[10px] text-gray-500">
            {toFa(rating.toFixed(1))} ({toFa(reviewCount)} تجربه)
          </span>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1">
          {hasInstallment && (
            <span className="inline-flex items-center text-[9px] sm:text-[10px] bg-blue-50 text-blue-700 border border-blue-100 rounded px-1.5 py-0.5 font-medium">
              خرید در ۴ قسط
            </span>
          )}
          {stockCount !== undefined && stockCount <= 5 && (
            <span className="inline-flex items-center text-[9px] sm:text-[10px] bg-amber-50 text-amber-700 border border-amber-100 rounded px-1.5 py-0.5 font-medium">
              فقط {toFa(stockCount)} عدد باقی
            </span>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price */}
        <div className="space-y-0.5">
          {originalPrice && (
            <div className="flex items-center gap-1.5">
              {discountPercent && (
                <span className="text-[9px] sm:text-[10px] bg-red-600 text-white rounded px-1 py-0.5 font-bold leading-none">
                  %{toFa(discountPercent)}
                </span>
              )}
              <span className="text-[10px] sm:text-[11px] text-gray-400 line-through">
                {toFa(originalPrice.toLocaleString('en-US'))}
              </span>
            </div>
          )}
          <p className="text-[12px] sm:text-[13px] md:text-sm font-bold text-gray-900">
            {fmtPrice(price)}
          </p>
        </div>

        {/* Add to cart */}
        <button
          className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-[10px] sm:text-xs font-semibold py-2 sm:py-2.5 rounded-lg transition-colors duration-150 flex items-center justify-center gap-1.5 mt-1 group-hover:shadow-md"
          aria-label={`افزودن ${title} به سبد خرید`}
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          افزودن به سبد خرید
        </button>
      </div>
    </article>
  );
}
