'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export function LandingHero() {
  return (
    <section className="relative h-[100svh] min-h-[600px] overflow-hidden">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=1600&q=80"
        alt=""
        fetchPriority="high"
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Warm earthy overlay — terracotta-tinted, not cold black */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(28,22,14,0.72) 0%, rgba(44,30,18,0.58) 100%)' }} />

      {/* Top minimal nav */}
      <div className="absolute top-0 inset-x-0 flex items-center justify-between px-6 md:px-12 py-6">
        <span className="latin text-[var(--cream)] text-[18px] tracking-[0.18em] font-medium">DARYA</span>
        <Link
          href="/shop"
          className="text-[var(--cream)]/70 text-[11px] tracking-[0.2em] hover:text-[var(--cream)] transition-colors"
        >
          فروشگاه
        </Link>
      </div>

      {/* Center content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[var(--cream)]/55 text-[11px] tracking-[0.3em] mb-6"
        >
          برنج اصیل ایرانی · از ۱۳۸۷
        </motion.p>

        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay: 0.05 }}
            className="latin font-medium leading-none tracking-tighter text-[var(--cream)]"
            style={{ fontSize: 'clamp(72px, 16vw, 200px)' }}
          >
            Darya
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-[var(--cream)]/65 text-[14px] leading-loose mb-10 max-w-[340px]"
        >
          از مزارع سبز شمال ایران تا سفره شما
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 bg-[var(--cream)] text-[var(--ink)] text-[13px] tracking-[0.1em] px-8 py-4 hover:bg-[var(--sand)] transition-colors duration-200"
          >
            ورود به فروشگاه
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* Bottom scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 inset-x-0 flex justify-center"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[var(--cream)] text-[9px] tracking-[0.3em]">پایین بکشید</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 bg-[var(--cream)]/30"
          />
        </div>
      </motion.div>
    </section>
  );
}
