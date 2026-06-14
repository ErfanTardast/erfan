'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PageTransitionTrigger } from '@/components/ui/PageTransition';
import { EASE } from '@/lib/motion';

export function EditorialBanner() {
  return (
    <div className="sm:col-span-2 xl:col-span-3 my-2">
      <div className="relative min-h-[520px] overflow-hidden grain-overlay">
        <motion.img
          src="https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=1700&q=80"
          alt="مزارع برنج"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1.0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.8, ease: EASE }}
        />
        <div className="absolute inset-0 editorial-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />

        {/* Year badge - top right */}
        <div className="absolute top-6 left-6">
          <span className="text-[9px] tracking-[0.2em] text-white/50 border border-white/20 px-3 py-1.5">
            از ۱۳۸۷
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative p-8 md:p-14 text-white flex flex-col justify-center min-h-[520px] max-w-[700px]"
        >
          <p className="section-eyebrow text-white/60 mb-5">— داستان ما —</p>
          <h2 className="title-lg leading-tight max-w-[520px]">
            از زمین تا سفره،<br />یک مسیر عاشقانه
          </h2>
          <p className="body-copy text-white/80 max-w-[460px] mt-6 leading-[2.1]">
            هر کیسه برنج کیوان، سفری است از مزارع سبز رشت تا آشپزخانه شما. کشاورزانی که نسل‌ها با دست‌های خود، بهترین دانه‌ها را برای ما می‌کارند.
          </p>

          <div className="flex items-center gap-5 mt-8">
            <PageTransitionTrigger>
              {(navigate) => (
                <button
                  onClick={() => navigate('/shop')}
                  className="bg-white text-ink px-7 py-3.5 text-[12px] tracking-[0.1em] hover:bg-cream transition-colors"
                >
                  کشف کلکسیون
                </button>
              )}
            </PageTransitionTrigger>
            <Link href="/about" className="text-white/70 hover:text-white text-[12px] tracking-wider transition-colors flex items-center gap-2">
              <span>داستان مزارع</span>
              <span>←</span>
            </Link>
          </div>
        </motion.div>

        {/* Bottom right stat */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute bottom-6 left-8 md:left-14 text-white/50 text-[10px] tracking-[0.2em]"
        >
          گیلان · مازندران · گلستان
        </motion.div>
      </div>
    </div>
  );
}
