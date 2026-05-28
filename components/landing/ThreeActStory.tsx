'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

type Act = {
  num: string;
  bg: string;
  fa: string;
  en: string;
  copy: string;
  image: string;
};

const ACTS: Act[] = [
  {
    num: '01',
    bg: '#1d251d',
    fa: 'از زمین',
    en: 'EARTH',
    copy: 'مزارع سبز رشت، آمل و فومن — جایی که هر کشاورز، نسل پدرش را در ادب کشت برنج زنده می‌کند.',
    image: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=1200&q=85',
  },
  {
    num: '02',
    bg: '#0f160f',
    fa: 'تا دانه',
    en: 'GRAIN',
    copy: 'دانه‌هایی که زیر آفتاب طلایی شمال شکل گرفتند — کشیده، شفاف، عطردار. هر دانه، گواهی از مزرعه است.',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1200&q=85',
  },
  {
    num: '03',
    bg: '#181f18',
    fa: 'تا سفره',
    en: 'TABLE',
    copy: 'پلویی که در دیگ‌های مسی دم می‌کشد، ته‌دیگی که طلایی می‌شود — و خاطره‌ای که سال‌ها در ذهن می‌ماند.',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=85',
  },
];

function ActScene({ act, idx }: { act: Act; idx: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.0, 1.15]);
  const wordX = useTransform(scrollYProgress, [0, 1], idx % 2 === 0 ? ['-20%', '15%'] : ['20%', '-15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.4]);

  return (
    <section
      ref={ref}
      className="relative grain-overlay h-[100svh] min-h-[640px] overflow-hidden flex items-center"
      style={{ background: act.bg }}
    >
      <motion.div className="absolute inset-0" style={{ y: imgY, scale: imgScale }}>
        <img src={act.image} alt={act.fa} className="w-full h-full object-cover opacity-60" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

      {/* Giant background word */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{ x: wordX }}
      >
        <span className="latin font-medium text-[clamp(180px,38vw,540px)] leading-none tracking-tighter text-cream/[0.06] whitespace-nowrap">
          {act.en}
        </span>
      </motion.div>

      <motion.div
        className="relative max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16 text-cream w-full"
        style={{ opacity }}
      >
        <div className="flex items-end gap-6 mb-6">
          <span className="latin text-[64px] md:text-[120px] leading-none text-olive2 font-medium">{act.num}</span>
          <span className="text-[11px] tracking-[0.2em] text-cream/60 mb-4">فصل</span>
        </div>
        <h2 className="title-xl !text-[clamp(48px,9vw,140px)] !leading-[0.95] !tracking-tight max-w-[720px]">
          {act.fa}
        </h2>
        <div className="mt-8 max-w-[440px] flex gap-4">
          <span className="w-12 h-px bg-cream/40 mt-3 shrink-0" />
          <p className="body-copy text-cream/80 leading-loose">{act.copy}</p>
        </div>
      </motion.div>
    </section>
  );
}

export function ThreeActStory() {
  return (
    <>
      {ACTS.map((a, i) => (
        <ActScene key={a.num} act={a} idx={i} />
      ))}
    </>
  );
}
