import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { POPULAR_BRANDS } from '@/lib/ecom-data';

export function PopularBrands() {
  return (
    <section className="py-6 sm:py-8">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <div className="flex items-center gap-2.5">
            <span className="w-1 h-5 sm:h-6 bg-red-600 rounded-full block" />
            <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900">برندهای پربازدید</h2>
          </div>
          <Link
            href="#"
            className="flex items-center gap-1 text-red-600 hover:text-red-700 text-[11px] sm:text-xs font-medium transition-colors"
          >
            همه برندها
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Brand grid */}
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-2 sm:gap-3">
          {POPULAR_BRANDS.map((brand) => (
            <Link
              key={brand.id}
              href="#"
              className="group flex flex-col items-center gap-2 sm:gap-2.5 p-2 sm:p-3 bg-white border border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-md transition-all duration-200"
              aria-label={`مشاهده برند ${brand.name}`}
            >
              {/* Logo placeholder */}
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center font-black text-sm sm:text-base md:text-lg tracking-tight group-hover:scale-105 transition-transform duration-200 border-2"
                style={{
                  backgroundColor: brand.bgColor,
                  color: brand.textColor,
                  borderColor: brand.borderColor + '80',
                }}
              >
                {brand.initial}
              </div>

              {/* Name */}
              <div className="text-center">
                <p className="text-[9px] sm:text-[10px] font-semibold text-gray-700 leading-tight group-hover:text-red-600 transition-colors">
                  {brand.nameEn}
                </p>
                <p className="text-[8px] sm:text-[9px] text-gray-400 mt-0.5 leading-tight">
                  {brand.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
