'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, MapPin, PackageCheck, Truck } from 'lucide-react';
import { EASE } from '@/lib/motion';

const PROOFS = [
  { icon: MapPin, label: 'آمل، برداشت ۱۴۰۳' },
  { icon: PackageCheck, label: 'تست عطر و پخت' },
  { icon: Truck, label: 'ارسال قابل پیگیری' },
];

export function LandingHero() {
  return (
    <section className="relative isolate min-h-[690px] overflow-hidden bg-deep text-rice lg:min-h-[calc(100svh-76px)] lg:max-h-[860px]">
      <Image
        src="/images/keyvan/hero-ledger.webp"
        alt="بسته برنج ممتاز کیوان در کنار کاسه مسی برنج ایرانی"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-[38%_center] md:object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,26,21,0.04)_0%,rgba(11,26,21,0.14)_34%,rgba(11,26,21,0.88)_72%,rgba(11,26,21,0.96)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-deep/75 to-transparent" />

      <div className="site-shell relative z-10 flex min-h-[690px] items-center py-16 lg:min-h-[calc(100svh-76px)] lg:max-h-[860px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mr-auto w-full max-w-[650px] lg:mr-0 lg:pr-5"
        >
          <div className="mb-7 flex items-center gap-4">
            <span className="h-px w-12 bg-saffron" />
            <p className="section-eyebrow text-rice/75">دفتر برداشت کیوان · آمل، مازندران</p>
          </div>

          <h1 className="max-w-[650px] text-[clamp(48px,7.5vw,104px)] font-semibold leading-[1.02] text-rice">
            برنجی که
            <span className="block text-saffron">منشأ دارد.</span>
          </h1>

          <p className="mt-6 max-w-[530px] text-[16px] leading-8 text-rice/76 md:text-[18px] md:leading-9">
            طارم، دمسیاه و برنج‌های منتخب شمال؛ با منطقه کشت، سال برداشت و قیمت کامل بسته، پیش از خرید.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#featured-products" className="inline-flex min-h-12 items-center justify-center gap-3 bg-saffron px-7 text-[14px] font-semibold text-deep transition-colors hover:bg-rice">
              انتخاب برنج
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link href="/product/tarom-hashemi-premium" className="inline-flex min-h-12 items-center justify-center border border-rice/35 bg-deep/25 px-7 text-[14px] text-rice backdrop-blur-sm transition-colors hover:border-rice hover:bg-deep/45">
              طارم هاشمی ممتاز
            </Link>
          </div>

          <div className="mt-9 grid gap-3 border-t border-rice/18 pt-5 sm:grid-cols-3">
            {PROOFS.map((proof) => (
              <div key={proof.label} className="flex items-center gap-2 text-[12px] text-rice/72">
                <proof.icon className="h-4 w-4 shrink-0 text-saffron" />
                <span>{proof.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
        className="absolute bottom-6 left-5 z-10 hidden items-center gap-4 border-l-2 border-saffron bg-paper/94 px-5 py-4 text-ink shadow-[0_16px_50px_rgba(11,26,21,0.2)] backdrop-blur-sm md:flex"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cypress text-rice">
          <Check className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[12px] text-cypress">قیمت شفاف بسته ۵ کیلویی</p>
          <p className="mt-1 text-[18px] font-semibold">۹۲۵٬۰۰۰ تومان</p>
        </div>
      </motion.div>
    </section>
  );
}
