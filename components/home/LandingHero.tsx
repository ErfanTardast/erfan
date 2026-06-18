'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Wheat, Truck } from 'lucide-react';
import { EASE } from '@/lib/motion';

const facts = [
  { label: 'برداشت', value: '۱۴۰۳' },
  { label: 'گونه', value: '۸ نوع' },
  { label: 'ارسال', value: 'سراسری' },
];

export function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-rice field-pattern">
      <div className="site-shell grid lg:grid-cols-[1.02fr_0.98fr] gap-10 lg:gap-14 items-center min-h-[calc(100svh-76px)] py-10 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 border border-line bg-paper px-3 py-2 text-[12px] text-cypress mb-6">
            <Wheat className="w-4 h-4" />
            برنج اصیل شمال، انتخاب‌شده برای پخت روزانه و مهمانی
          </div>

          <h1 className="text-[clamp(46px,8vw,112px)] leading-[1.02] font-semibold text-ink max-w-[760px]">
            کیوان؛
            <span className="block text-cypress">برنجی که روی سفره می‌درخشد</span>
          </h1>

          <p className="body-copy text-muted max-w-[540px] mt-6 leading-[2.05]">
            از مزارع گیلان و مازندران تا خانه شما؛ برنج‌های کیوان با منشأ روشن، عطر واقعی و بسته‌بندی تمیز برای خرید مطمئن آماده‌اند.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link href="/shop" className="cta-ink inline-flex items-center justify-center gap-3 px-8 py-3.5 text-[14px]">
              ورود به فروشگاه
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link href="/use-case/guest-table" className="cta-outline inline-flex items-center justify-center px-8 py-3.5 text-[14px]">
              انتخاب برای مهمانی
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-[520px] mt-10">
            {facts.map((fact) => (
              <div key={fact.label} className="border border-line bg-paper/80 px-4 py-3">
                <p className="text-[11px] text-muted">{fact.label}</p>
                <p className="text-[18px] text-ink font-semibold mt-1">{fact.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.08, duration: 0.7, ease: EASE }}
          className="relative min-h-[480px] md:min-h-[620px]"
        >
          <div className="absolute inset-y-0 left-0 w-[58%] overflow-hidden border border-line bg-sand">
            <img
              src="https://images.unsplash.com/photo-1634376413866-d89f8b489a05?auto=format&fit=crop&w=1100&q=82"
              alt="مزارع برنج فومن گیلان"
              fetchPriority="high"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-[12%] right-0 w-[58%] aspect-[4/5] overflow-hidden border border-line bg-paper shadow-[0_24px_90px_rgba(23,33,26,0.18)]">
            <img
              src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=82"
              alt="دانه‌های برنج کیوان"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-6 right-6 left-6 md:left-auto md:w-[360px] harvest-card p-5">
            <p className="section-eyebrow text-cypress mb-3">دفتر برداشت کیوان</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-olive mt-0.5 shrink-0" />
                <p className="text-[13px] leading-7 text-muted">هر محصول با نوع برنج، منطقه کشت و سال برداشت مشخص عرضه می‌شود.</p>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-olive mt-0.5 shrink-0" />
                <p className="text-[13px] leading-7 text-muted">ارسال تمیز و قابل پیگیری برای سفارش‌های خانگی و هدیه.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
