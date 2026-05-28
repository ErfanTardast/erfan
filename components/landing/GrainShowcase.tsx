'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

type Grain = {
  id: string;
  name: string;
  latin: string;
  region: string;
  aroma: string;
  best: string;
  length: string;
  image: string;
  hue: string;
};

const GRAINS: Grain[] = [
  {
    id: 'tarom',
    name: 'طارم هاشمی',
    latin: 'Tarom Hashemi',
    region: 'گیلان · رشت',
    aroma: 'عطر بهشتی، شدید',
    best: 'پلوهای مجلسی',
    length: '۷ میلی‌متر',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=85',
    hue: '#a89971',
  },
  {
    id: 'domsiah',
    name: 'دمسیاه',
    latin: 'Domsiah',
    region: 'گیلان · فومن',
    aroma: 'عطر ملایم، عمیق',
    best: 'سفره‌های خاص',
    length: '۸ میلی‌متر',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=85',
    hue: '#7a7062',
  },
  {
    id: 'shirudi',
    name: 'شیرودی',
    latin: 'Shirudi',
    region: 'مازندران',
    aroma: 'عطر ملایم',
    best: 'کته و چلو روزانه',
    length: '۶ میلی‌متر',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=900&q=85',
    hue: '#bdb094',
  },
];

export function GrainShowcase() {
  const [active, setActive] = useState<Grain>(GRAINS[0]);

  return (
    <section className="bg-cream py-28 md:py-40 overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <p className="section-eyebrow text-olive mb-4">— کلکسیون —</p>
            <h2 className="title-lg !text-[clamp(36px,6.5vw,80px)] !leading-[1.05] max-w-[700px]">
              سه دانه، سه قصه، سه طعم
            </h2>
          </div>
          <p className="body-copy text-muted max-w-[420px] leading-loose">
            هر یک از این انواع، شخصیت و عطر خاص خود را دارد. روی هر کارت برای جزئیات کلیک کنید.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 items-start">
          {/* Cards */}
          <div className="space-y-4">
            {GRAINS.map((g, i) => {
              const isActive = active.id === g.id;
              return (
                <motion.button
                  key={g.id}
                  onClick={() => setActive(g)}
                  className="w-full text-right group relative overflow-hidden border border-line bg-paper transition-colors"
                  style={{ borderColor: isActive ? '#1d251d' : undefined }}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-stretch">
                    <div className="relative w-32 md:w-44 aspect-square overflow-hidden shrink-0">
                      <motion.img
                        src={g.image}
                        alt={g.name}
                        className="w-full h-full object-cover"
                        animate={{ scale: isActive ? 1.1 : 1 }}
                        transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
                      />
                      <div className="absolute inset-0" style={{ background: g.hue, mixBlendMode: 'multiply', opacity: isActive ? 0 : 0.25 }} />
                    </div>
                    <div className="flex-1 p-5 md:p-7 flex flex-col justify-between">
                      <div>
                        <p className="section-eyebrow text-olive">{String(i + 1).padStart(2, '0')} / 03</p>
                        <h3 className="title-md mt-2 md:mt-3">{g.name}</h3>
                        <p className="latin text-muted text-[13px] tracking-wide mt-1">{g.latin}</p>
                      </div>
                      <div className="hidden md:flex items-end justify-between mt-4">
                        <p className="small-copy text-muted">{g.region}</p>
                        <motion.span
                          animate={{ x: isActive ? -6 : 0 }}
                          className="text-[20px] text-ink"
                        >
                          →
                        </motion.span>
                      </div>
                    </div>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="grain-active-bar"
                      className="absolute bottom-0 right-0 left-0 h-px bg-ink"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
              className="lg:sticky lg:top-24 bg-ink text-cream p-8 md:p-12"
            >
              <p className="section-eyebrow text-olive2 mb-6">— درباره این دانه —</p>
              <h3 className="latin text-[clamp(36px,5vw,72px)] leading-[0.95] tracking-tighter font-medium">
                {active.latin}
              </h3>
              <p className="title-md mt-3 text-cream/90">{active.name}</p>

              <dl className="mt-10 space-y-5 border-t border-cream/20 pt-8">
                <Row label="منطقه کشت" value={active.region} />
                <Row label="پروفایل عطر" value={active.aroma} />
                <Row label="طول دانه" value={active.length} />
                <Row label="بهترین برای" value={active.best} />
              </dl>
              <a
                href="/shop"
                className="mt-10 w-full flex items-center justify-center gap-3 border border-cream/40 hover:border-cream hover:bg-cream/10 transition-all py-4 text-[13px] tracking-wider"
              >
                <span>مشاهده در فروشگاه</span>
                <span>←</span>
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline gap-6 border-b border-cream/15 pb-4">
      <dt className="text-[11px] tracking-[0.22em] text-cream/55 uppercase">{label}</dt>
      <dd className="text-[15px] text-cream">{value}</dd>
    </div>
  );
}
