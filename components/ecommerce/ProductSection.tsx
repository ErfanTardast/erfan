'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ProductCard } from './ProductCard';
import type { BeltProduct } from '@/lib/ecom-data';

interface ProductSectionProps {
  title: string;
  products: BeltProduct[];
  badge?: string;
  moreHref?: string;
  showDiscount?: boolean;
}

export function ProductSection({
  title,
  products,
  badge,
  moreHref = '#',
}: ProductSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'prev' | 'next') => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({ left: dir === 'next' ? amount : -amount, behavior: 'smooth' });
  };

  return (
    <section className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
      {/* Section header */}
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
          {/* Scroll arrows — hidden on mobile since touch scroll works */}
          <button
            onClick={() => scroll('prev')}
            className="hidden md:flex w-7 h-7 sm:w-8 sm:h-8 items-center justify-center border border-gray-200 rounded-full text-gray-500 hover:text-red-600 hover:border-red-300 transition-colors"
            aria-label="قبلی"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('next')}
            className="hidden md:flex w-7 h-7 sm:w-8 sm:h-8 items-center justify-center border border-gray-200 rounded-full text-gray-500 hover:text-red-600 hover:border-red-300 transition-colors"
            aria-label="بعدی"
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

      {/* Product scroll row */}
      <div
        ref={scrollRef}
        className="flex gap-2.5 sm:gap-3 overflow-x-auto scrollbar-hide p-3 sm:p-4 scroll-smooth"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0"
            style={{
              scrollSnapAlign: 'start',
              width: 'clamp(148px, 30vw, 220px)',
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
