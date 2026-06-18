'use client';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { toFa } from '@/lib/format';
import { cn } from '@/lib/cn';

type ProductGalleryProps = {
  images: string[];
  title: string;
  badge?: string;
  isNew?: boolean;
};

export function ProductGallery({ images, title, badge, isNew }: ProductGalleryProps) {
  const [viewportRef, emblaApi] = useEmblaCarousel({ direction: 'rtl', loop: images.length > 1 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateSelected = useCallback(() => {
    if (emblaApi) setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    updateSelected();
    emblaApi.on('select', updateSelected);
    emblaApi.on('reInit', updateSelected);
    return () => {
      emblaApi.off('select', updateSelected);
      emblaApi.off('reInit', updateSelected);
    };
  }, [emblaApi, updateSelected]);

  return (
    <div>
      <div ref={viewportRef} className="overflow-hidden bg-sand">
        <div className="flex touch-pan-y">
          {images.map((src, index) => (
            <div key={`${src}-${index}`} className="relative min-w-0 flex-[0_0_100%] aspect-[4/5]">
              <Image
                src={src}
                alt={index === 0 ? title : `${title}، تصویر ${toFa(index + 1)}`}
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        {badge && (
          <span className="absolute top-4 right-4 bg-ink/85 text-cream px-2.5 py-1.5 text-[9px] tracking-[0.16em]">
            {badge}
          </span>
        )}
        {isNew && (
          <span className="absolute top-4 left-4 bg-gold text-white px-2.5 py-1.5 text-[9px] tracking-[0.16em]">
            جدید
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 mt-3 overflow-x-auto pb-1">
          {images.map((src, index) => (
            <button
              key={`${src}-thumb-${index}`}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              className={cn(
                'relative w-[68px] h-[68px] overflow-hidden bg-sand shrink-0 border-2 transition-colors',
                selectedIndex === index ? 'border-ink' : 'border-transparent hover:border-line'
              )}
              aria-label={`تصویر ${toFa(index + 1)}`}
              aria-current={selectedIndex === index}
            >
              <Image src={src} alt="" fill sizes="68px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
