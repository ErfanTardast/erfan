'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { PRODUCTS, type Product } from '@/lib/products';
import { PageTransitionTrigger } from '@/components/ui/PageTransition';
import { EASE } from '@/lib/motion';

const SHOWCASE_IDS = ['1', '3', '2'];
const COLLECTION_LABELS: Record<string, string> = {
  'chef-choice': 'انتخاب سرآشپز',
  'rare-harvest': 'نادر',
  'limited-seasonal': 'محدود',
  'aged-reserve': 'ذخیره',
};

const REGION_DISPLAY: Record<string, string> = {
  gilan: 'گیلان',
  mazandaran: 'مازندران',
  golestan: 'گلستان',
};

export function GrainShowcase() {
  const items = SHOWCASE_IDS.map(id => PRODUCTS.find(p => p.id === id)!).filter(Boolean);
  const [active, setActive] = useState<Product>(items[0]);

  return (
    <section className="bg-cream py-28 md:py-40 overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="section-eyebrow text-olive mb-4"
            >
              — کلکسیون منتخب —
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
              className="title-lg !text-[clamp(36px,6.5vw,80px)] !leading-[1.05] max-w-[700px]"
            >
              سه دانه، سه قصه، سه طعم
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="body-copy text-muted max-w-[380px] leading-loose"
          >
            هر یک از این انواع، شخصیت و عطر خاص خود را دارد. روی هر کارت برای کشف عمیق‌تر کلیک کنید.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 items-start">
          {/* Selector cards */}
          <div className="space-y-4">
            {items.map((p, i) => {
              const isActive = active.id === p.id;
              return (
                <motion.button
                  key={p.id}
                  onClick={() => setActive(p)}
                  className="w-full text-right group relative overflow-hidden border border-line bg-paper transition-all duration-500"
                  style={{ borderColor: isActive ? 'var(--ink)' : undefined }}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  aria-pressed={isActive}
                >
                  <div className="flex items-stretch">
                    {/* Image */}
                    <div className="relative w-32 md:w-44 aspect-square overflow-hidden shrink-0">
                      <motion.img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover"
                        animate={{ scale: isActive ? 1.08 : 1 }}
                        transition={{ duration: 0.9, ease: EASE }}
                      />
                      <div
                        className="absolute inset-0 bg-ink transition-opacity duration-500"
                        style={{ opacity: isActive ? 0 : 0.22 }}
                      />
                      {/* Collection badge */}
                      {p.collection && (
                        <div className="absolute bottom-2 right-2">
                          <span className="text-[8px] tracking-[0.12em] bg-ink/70 text-cream/90 px-1.5 py-0.5 backdrop-blur-sm">
                            {COLLECTION_LABELS[p.collection]}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5 md:p-7 flex flex-col justify-between">
                      <div>
                        <p className="section-eyebrow text-olive">
                          {String(i + 1).padStart(2, '0')} / 03
                        </p>
                        <h3 className="title-md mt-2 md:mt-3">{p.title}</h3>
                        <p className="small-copy text-muted mt-1.5">{p.kicker}</p>
                      </div>
                      <div className="hidden md:flex items-end justify-between mt-4">
                        <p className="small-copy text-muted">{REGION_DISPLAY[p.region]}</p>
                        <motion.span
                          animate={{ x: isActive ? -6 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-[18px] text-ink/60"
                        >
                          ←
                        </motion.span>
                      </div>
                    </div>
                  </div>

                  {/* Active indicator bar */}
                  {isActive && (
                    <motion.div
                      layoutId="grain-active-bar"
                      className="absolute bottom-0 right-0 left-0 h-[2px] bg-ink"
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
              transition={{ duration: 0.45, ease: EASE }}
              className="lg:sticky lg:top-24 bg-ink text-cream overflow-hidden"
            >
              {/* Hero image strip */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={active.image}
                  alt={active.title}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                <div className="absolute bottom-4 right-6">
                  {active.harvestYear && (
                    <span className="text-[10px] tracking-[0.2em] text-olive2">
                      برداشت {active.harvestYear}
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-10 space-y-6">
                <div>
                  <p className="section-eyebrow text-olive2 mb-3">— درباره این دانه —</p>
                  <h3 className="title-md text-cream leading-snug">{active.title}</h3>
                  {active.aromaProfile && (
                    <p className="small-copy text-cream/60 italic mt-2 leading-relaxed">
                      {active.aromaProfile}
                    </p>
                  )}
                </div>

                {/* Flavor notes */}
                {active.flavorNotes && (
                  <div>
                    <p className="text-[9px] tracking-[0.22em] text-cream/45 mb-2.5">پروفایل طعم</p>
                    <div className="flex flex-wrap gap-2">
                      {active.flavorNotes.map((note, i) => (
                        <span
                          key={i}
                          className="text-[11px] border border-cream/20 px-3 py-1.5 text-cream/80"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Origin story */}
                {active.originStory && (
                  <div>
                    <p className="text-[9px] tracking-[0.22em] text-cream/45 mb-2">داستان منشأ</p>
                    <p className="small-copy text-cream/65 leading-relaxed italic line-clamp-3">
                      {active.originStory}
                    </p>
                  </div>
                )}

                {/* Cooking tip callout */}
                {active.cookingTip && (
                  <div className="bg-[#243020] border-r-2 border-olive p-4">
                    <p className="text-[9px] tracking-[0.22em] text-olive2 mb-1.5">راز پخت</p>
                    <p className="small-copy text-cream/70 leading-relaxed">{active.cookingTip}</p>
                  </div>
                )}

                {/* Pairings */}
                {active.pairings && (
                  <p className="text-[11px] text-cream/50">
                    مناسب برای:{' '}
                    <span className="text-cream/75">{active.pairings.join(' · ')}</span>
                  </p>
                )}

                {/* CTA */}
                <PageTransitionTrigger>
                  {(navigate) => (
                    <button
                      onClick={() => navigate('/shop')}
                      className="w-full flex items-center justify-center gap-3 border border-cream/30 hover:border-cream hover:bg-cream/8 transition-all py-4 text-[13px] tracking-wider mt-2"
                    >
                      <span>مشاهده در فروشگاه</span>
                      <span>←</span>
                    </button>
                  )}
                </PageTransitionTrigger>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
