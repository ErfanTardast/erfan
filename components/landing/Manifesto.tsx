'use client';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { toFa } from '@/lib/format';

const STATS = [
  { value: 120, suffix: 'سال', label: 'پیشینه' },
  { value: 3, suffix: 'نسل', label: 'کشاورزی' },
  { value: 8, suffix: 'نوع', label: 'برنج اصیل' },
  { value: 100, suffix: '٪', label: 'ایرانی' },
];

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return <span ref={ref}>{toFa(val)}</span>;
}

export function Manifesto() {
  const sentence = 'هر دانه — یک قصه. هر قصه — یک سفر از خاک شمال تا سفره شما.';
  const words = sentence.split(' ');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="bg-[#0f160f] text-cream py-32 md:py-44 overflow-hidden relative grain-overlay">
      <div className="max-w-[1300px] mx-auto px-5 md:px-10 lg:px-16">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="section-eyebrow text-olive2 mb-10 text-center"
        >
          — مانیفست —
        </motion.p>

        <div ref={ref} className="text-center max-w-[1100px] mx-auto">
          <p className="title-xl !text-[clamp(28px,5.2vw,76px)] !leading-[1.18] !font-light !tracking-tight">
            {words.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom" style={{ marginInlineEnd: '0.25em' }}>
                <motion.span
                  initial={{ y: '110%', opacity: 0 }}
                  animate={inView ? { y: '0%', opacity: 1 } : {}}
                  transition={{ duration: 0.9, delay: i * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
                  className="inline-block"
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </p>
        </div>

        <div className="mt-24 md:mt-32 grid grid-cols-2 md:grid-cols-4 gap-y-10">
          {STATS.map((s) => (
            <div key={s.label} className="text-center border-l border-cream/15 first:border-l-0 px-4">
              <p className="text-[44px] md:text-[64px] leading-none font-medium tracking-tighter text-cream">
                <Counter to={s.value} />
                <span className="text-[20px] md:text-[28px] text-olive2 mr-1">{s.suffix}</span>
              </p>
              <p className="text-[11px] tracking-[0.18em] text-cream/60 mt-3">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
