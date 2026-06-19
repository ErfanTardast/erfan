import { Play, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { VIDEO_ITEMS } from '@/lib/ecom-data';

export function VideoStories() {
  return (
    <section className="bg-white border-t border-b border-gray-100 py-5 sm:py-6">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-1 h-5 bg-red-600 rounded-full block" />
            <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900">ویدیوهای کوتاه</h2>
          </div>
          <Link
            href="#"
            className="flex items-center gap-1 text-red-600 hover:text-red-700 text-[11px] sm:text-xs font-medium transition-colors"
          >
            مشاهده بیشتر
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Video scroll strip */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1" style={{ scrollSnapType: 'x mandatory' }}>
          {VIDEO_ITEMS.map((item) => (
            <button
              key={item.id}
              className="flex-shrink-0 flex flex-col gap-2 group"
              style={{ scrollSnapAlign: 'start', width: 'clamp(120px, 22vw, 168px)' }}
              aria-label={`پخش ویدیو: ${item.title}`}
            >
              {/* Thumbnail */}
              <div
                className="relative rounded-xl overflow-hidden"
                style={{
                  aspectRatio: '9/16',
                  background: `linear-gradient(160deg, ${item.bgFrom}, ${item.bgTo})`,
                }}
              >
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-white transition-all duration-200">
                    <Play className="w-4 h-4 text-gray-800 ms-0.5 fill-current" />
                  </div>
                </div>

                {/* Duration badge */}
                <div className="absolute bottom-2 start-2 bg-black/50 backdrop-blur-sm text-white text-[9px] px-1.5 py-0.5 rounded font-medium">
                  {item.duration}
                </div>

                {/* Decoration */}
                <div className="absolute inset-0 opacity-20">
                  <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden>
                    <circle cx="50" cy="50" r="30" fill="none" stroke="#374151" strokeWidth="6" />
                    <circle cx="50" cy="50" r="15" fill="none" stroke="#374151" strokeWidth="3" />
                    {Array.from({ length: 6 }).map((_, i) => {
                      const a = (i * Math.PI * 2) / 6;
                      return (
                        <line
                          key={i}
                          x1={50 + Math.cos(a) * 18}
                          y1={50 + Math.sin(a) * 18}
                          x2={50 + Math.cos(a) * 32}
                          y2={50 + Math.sin(a) * 32}
                          stroke="#374151"
                          strokeWidth="5"
                          strokeLinecap="round"
                        />
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Title */}
              <p className="text-[10px] sm:text-[11px] text-gray-700 text-start leading-snug line-clamp-2 px-0.5 group-hover:text-red-600 transition-colors">
                {item.title}
              </p>
            </button>
          ))}
        </div>

        {/* Story type selector */}
        <div className="flex items-center gap-2 mt-5 overflow-x-auto scrollbar-hide pb-1">
          <p className="text-[11px] text-gray-400 flex-shrink-0 hidden sm:block">سفر تعاملی:</p>
          {['استوری دایره‌ای', 'استوری ثابت', 'گشت‌وگذار', 'همه'].map((label, i) => (
            <button
              key={label}
              className={`flex-shrink-0 text-[11px] sm:text-xs px-3 py-1.5 rounded-full border transition-colors ${
                i === 3
                  ? 'bg-red-600 text-white border-red-600'
                  : 'border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
