'use client';
import { motion } from 'framer-motion';

export function EditorialBanner() {
  return (
    <div className="sm:col-span-2 xl:col-span-3 my-2">
      <div className="relative min-h-[460px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1468078809804-4c7b3e60a478?auto=format&fit=crop&w=1700&q=80"
          alt="مزارع برنج"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 editorial-overlay" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
          className="relative p-8 md:p-14 text-white flex flex-col justify-center min-h-[460px] max-w-[680px]"
        >
          <p className="section-eyebrow text-white/70 mb-5">داستان ما</p>
          <h2 className="title-lg leading-tight">
            از زمین تا سفره،<br />یک مسیر عاشقانه
          </h2>
          <p className="body-copy text-white/85 max-w-[480px] mt-6 leading-loose">
            هر کیسه برنج دریا، سفری است از مزارع سبز رشت تا آشپزخانه شما. کشاورزانی که نسل‌ها با دست‌های خود، بهترین دانه‌ها را برای ما می‌کارند.
          </p>
          <button className="bg-white text-ink px-7 py-3.5 mt-8 text-[12px] tracking-[0.1em] self-start hover:bg-paper transition-colors">
            بیشتر بدانید
          </button>
        </motion.div>
      </div>
    </div>
  );
}
