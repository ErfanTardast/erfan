'use client';
import { Marquee } from '@/components/ui/Marquee';

export function MarqueeWall() {
  return (
    <section className="bg-ink text-cream py-16 md:py-24 overflow-hidden border-y border-cream/10">
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
            FROM EARTH
          </span>,
          <span key="4" className="text-[clamp(40px,8vw,140px)] leading-none font-light">
            تا سفره شما
          </span>,
        ]}
        separator={<span className="mx-10 md:mx-16 inline-block w-2 h-2 rounded-full bg-cream/40" />}
      />
    </section>
  );
}
