'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft, Timer } from 'lucide-react';
import Link from 'next/link';
import { ProductCard } from './ProductCard';
import { CountdownTimer } from './CountdownTimer';
import type { BeltProduct } from '@/lib/ecom-data';

interface ProductSectionProps {
  title: string;
  products: BeltProduct[];
  badge?: string;
  moreHref?: string;
  showCountdown?: boolean;
}

export function ProductSection({
  title,
  products,
  badge,
  moreHref = '#',
  showCountdown = false,
}: ProductSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'prev' | 'next') => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    el.scrollBy({ left: dir === 'next' ? el.clientWidth * 0.65 : -el.clientWidth * 0.65, behavior: 'smooth' });
  };

  return (
    <section className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">

      {/* ── Section header ─────────────────────────────────────── */}
      {showCountdown ? (
        // Discount header — red gradient bar with countdown
        <div
          className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-3.5"
          style={{ background: 'linear-gradient(90deg, #dc2626 0%, #b91c1c 100%)' }}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <Timer className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
            <h2 className="text-sm sm:text-base font-bold text-white">{title}</h2>
            {badge && (
              <span className="hidden sm:inline text-[10px] bg-white/20 text-white border border-white/30 px-2 py-0.5 rounded-full font-medium">
                {badge}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <CountdownTimer />
            <Link
              href={moreHref}
              className="hidden sm:flex items-center gap-1 text-white/80 hover:text-white text-xs font-medium transition-colors"
            >
              مشاهده بیشتر
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        // Standard header
        <div className="flex items-center justify-between px-4 sm:px-5 pt-4 sm:pt-5 pb-3 sm:pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <span className="w-1 h-5 sm:h-6 bg-red-600 rounded-full block flex-shrink-0" />
            <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900">{title}</h2>
            {badge && (
              <span className="hidden sm:inline text-[10px] sm:text-xs bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full font-medium">
                {badge}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('prev')}
              className="hidden md:flex w-7 h-7 items-center justify-center border border-gray-200 rounded-full text-gray-500 hover:text-red-600 hover:border-red-300 transition-colors"
              aria-label="محصولات قبلی"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('next')}
              className="hidden md:flex w-7 h-7 items-center justify-center border border-gray-200 rounded-full text-gray-500 hover:text-red-600 hover:border-red-300 transition-colors"
              aria-label="محصولات بعدی"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <Link
              href={moreHref}
              className="flex items-center gap-1 text-red-600 hover:text-red-700 text-[11px] sm:text-xs font-medium transition-colors"
            >
              مشاهده بیشتر
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* ── Product scroll row ──────────────────────────────────── */}
      <div className="relative">
        {/* Desktop scroll arrows for countdown variant */}
        {showCountdown && (
          <>
            <button
              onClick={() => scroll('prev')}
              className="hidden md:flex absolute start-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-md rounded-full items-center justify-center text-gray-600 hover:text-red-600 transition-colors border border-gray-100"
              aria-label="محصولات قبلی"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('next')}
              className="hidden md:flex absolute end-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-md rounded-full items-center justify-center text-gray-600 hover:text-red-600 transition-colors border border-gray-100"
              aria-label="محصولات بعدی"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </>
        )}

        <div
          ref={scrollRef}
          className="flex gap-2.5 sm:gap-3 overflow-x-auto scrollbar-hide p-3 sm:p-4 scroll-smooth"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0"
              style={{ scrollSnapAlign: 'start', width: 'clamp(150px, 28vw, 224px)' }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile "مشاهده بیشتر" for countdown variant */}
      {showCountdown && (
        <div className="sm:hidden flex justify-center pb-3">
          <Link
            href={moreHref}
            className="flex items-center gap-1 text-red-600 text-xs font-medium"
          >
            مشاهده همه تخفیف‌ها
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </section>
  );
}
