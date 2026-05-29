'use client';
import { Marquee } from '@/components/ui/Marquee';

export function MarqueeWall() {
  return (
    <section className="bg-ink text-cream overflow-hidden border-y border-cream/10 relative grain-overlay">
      <div className="py-10 md:py-14 border-b border-cream/10">
        <Marquee
          speed="slow"
          items={[
            <span key="1" className="latin font-medium text-[clamp(56px,11vw,180px)] leading-none tracking-tighter">
              DARYA RICE
            </span>,
            <span key="2" className="text-[clamp(40px,8vw,140px)] leading-none font-light text-olive2">
              برنج اصیل ایرانی
            </span>,
            <span key="3" className="latin font-medium text-[clamp(56px,11vw,180px)] leading-none tracking-tighter text-cream/30">
              از شمال ایران
            </span>,
            <span key="4" className="text-[clamp(40px,8vw,140px)] leading-none font-light">
              تا سفره شما
            </span>,
          ]}
          separator={<span className="mx-10 md:mx-16 inline-block w-2 h-2 rounded-full bg-gold/60" />}
        />
      </div>
      <div className="py-7 md:py-9">
        <Marquee
          speed="normal"
          items={[
            <span key="1" className="text-[12px] tracking-[0.3em] text-cream/50">طارم هاشمی</span>,
            <span key="2" className="text-[12px] tracking-[0.3em] text-cream/50">دمسیاه اصیل</span>,
            <span key="3" className="text-[12px] tracking-[0.3em] text-cream/50">شیرودی مازندران</span>,
            <span key="4" className="text-[12px] tracking-[0.3em] text-cream/50">علی‌کاظمی گیلان</span>,
            <span key="5" className="text-[12px] tracking-[0.3em] text-cream/50">لنگرودی ممتاز</span>,
            <span key="6" className="text-[12px] tracking-[0.3em] text-gold/70 latin">۱۰۰٪ اصیل</span>,
            <span key="7" className="text-[12px] tracking-[0.3em] text-cream/50">کشت سنتی</span>,
            <span key="8" className="text-[12px] tracking-[0.3em] text-cream/50">بدون افزودنی</span>,
            <span key="9" className="text-[12px] tracking-[0.3em] text-cream/50">ارسال رایگان</span>,
          ]}
          separator={<span className="mx-8 text-cream/20">·</span>}
        />
      </div>
    </section>
  );
}
