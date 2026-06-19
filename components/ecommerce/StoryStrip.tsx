import { STORY_ITEMS } from '@/lib/ecom-data';

export function StoryStrip() {
  return (
    <section className="bg-white border-b border-gray-100 py-4 md:py-5">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex gap-3 sm:gap-4 md:gap-5 overflow-x-auto scrollbar-hide pb-1 md:justify-center md:flex-wrap">
          {STORY_ITEMS.map((item) => (
            <button
              key={item.id}
              className="flex-shrink-0 flex flex-col items-center gap-1.5 group"
              aria-label={item.label}
            >
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] rounded-full flex items-center justify-center text-xl sm:text-2xl transition-transform duration-200 group-hover:scale-105 border-2"
                style={{
                  backgroundColor: item.bgColor,
                  borderColor: item.borderColor,
                }}
              >
                {item.icon}
              </div>
              <span className="text-[10px] sm:text-[11px] text-gray-600 text-center leading-tight max-w-[64px] sm:max-w-[72px] group-hover:text-red-600 transition-colors line-clamp-2">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
