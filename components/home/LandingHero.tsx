'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { EASE } from '@/lib/motion';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.12 } },
};
const rise = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};
const line = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1, ease: EASE } },
};

export function LandingHero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden grain-overlay bg-[#14100a]">
      {/* Background image — slow ken-burns */}
      <img
        src="https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=1600&q=80"
        alt=""
        fetchPriority="high"
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover kenburns opacity-95"
      />
      {/* Warm earthy wash */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(168deg, rgba(20,16,10,0.80) 0%, rgba(40,28,16,0.44) 52%, rgba(18,13,7,0.84) 100%)' }}
      />
      {/* Cinematic vignette */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 58% 42%, transparent 36%, rgba(10,7,4,0.62) 100%)' }}
      />

      {/* Editorial inset frame */}
      <div className="pointer-events-none absolute inset-3 md:inset-6 border border-[var(--cream)]/15 z-10" />

      {/* Top bar */}
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-7 md:px-16 py-7 md:py-10">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="latin text-[var(--cream)] text-[15px] md:text-[17px] tracking-[0.34em]"
        >
          KEYVAN
        </motion.span>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <Link
            href="/shop"
            className="group flex items-center gap-2.5 text-[var(--cream)]/75 text-[10px] md:text-[11px] tracking-[0.3em] hover:text-[var(--cream)] transition-colors"
          >
            فروشگاه
            <span className="w-5 h-px bg-current inline-block transition-all duration-300 group-hover:w-9" />
          </Link>
        </motion.div>
      </div>

      {/* Vertical Latin spine — far edge (RTL start side) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="hidden md:block absolute right-12 top-1/2 -translate-y-1/2 z-20"
      >
        <span
          className="latin text-[var(--cream)]/45 text-[10px] tracking-[0.44em] whitespace-nowrap"
          style={{ writingMode: 'vertical-rl' }}
        >
          PERSIAN RICE HOUSE — GILAN
        </span>
      </motion.div>

      {/* Center editorial composition */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6"
      >
        {/* terra accent line */}
        <motion.span variants={line} className="block h-px w-16 md:w-20 bg-[var(--terra)] mb-7 origin-center" />

        {/* eyebrow */}
        <motion.p variants={rise} className="text-[var(--cream)]/70 text-[10px] md:text-[11px] tracking-[0.22em] md:tracking-[0.32em] mb-5 md:mb-7 px-4">
          برنج اصیل شمال ایران · از ۱۳۸۷
        </motion.p>

        {/* Balanced bilingual lockup — کیوان (Vazirmatn) + Keyvan (Fraunces), equal size.
            Stacks on mobile, side-by-side with a hairline divider on desktop. */}
        <motion.div variants={rise} className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-9 mb-8 md:mb-9">
          <h1
            className="text-[var(--cream)] font-semibold leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(58px, 13vw, 124px)' }}
          >
            کیوان
          </h1>
          <span className="hidden md:block w-px self-stretch bg-[var(--cream)]/30 my-1.5" aria-hidden />
          <span
            className="latin text-[var(--cream)]/85 leading-[0.9]"
            style={{ fontSize: 'clamp(58px, 13vw, 124px)' }}
          >
            Keyvan
          </span>
        </motion.div>

        {/* tagline */}
        <motion.p variants={rise} className="text-[var(--cream)]/70 text-[13px] md:text-[15px] leading-loose max-w-[360px] mb-9 md:mb-11">
          از مزارع سبز شمال ایران، دانه‌به‌دانه تا سفره‌ی شما
        </motion.p>

        {/* CTA */}
        <motion.div variants={rise}>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-3 bg-[var(--cream)] text-[var(--ink)] text-[12px] md:text-[13px] tracking-[0.18em] px-9 py-4 hover:bg-[var(--terra)] hover:text-[var(--cream)] transition-colors duration-300"
          >
            ورود به فروشگاه
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1.5" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Editorial corner index (RTL: end side) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="hidden sm:block absolute bottom-9 left-8 md:left-16 z-20"
      >
        <p className="text-[var(--cream)]/45 text-[10px] tracking-[0.22em] leading-[2.1]">
          طارم · دمسیاه · شیرودی
          <br />
          ۸ گونه‌ی ممتاز
        </p>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-9 inset-x-0 z-20 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-9 bg-[var(--cream)]/35"
        />
      </motion.div>
    </section>
  );
}
