'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE } from '@/lib/motion';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMsg(data.message ?? 'به خانواده کیوان خوش آمدید');
        setEmail('');
      } else {
        setStatus('error');
        setMsg(data.error ?? 'مشکلی پیش آمد');
      }
    } catch {
      setStatus('success');
      setMsg('به خانواده کیوان خوش آمدید');
      setEmail('');
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#1a2a1a] text-cream grain-overlay">
      {/* Background texture image */}
      <div className="absolute inset-0 opacity-[0.12]">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=60"
          alt=""
          aria-hidden
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a2a1a]/60 to-[#1a2a1a]" />

      <div className="relative max-w-[1500px] mx-auto px-5 md:px-8 lg:px-12 py-24 md:py-32">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-center">
          {/* Left: editorial copy */}
          <div>
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
              className="block h-px w-16 bg-[var(--terra)] mb-6 origin-right"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="section-eyebrow text-olive2 mb-5"
            >
              — مجله کیوان —
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
              className="title-lg !text-[clamp(28px,4vw,52px)] max-w-[460px]"
            >
              داستان‌هایی از مزرعه تا سفره
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="latin italic text-cream/45 text-[18px] md:text-[22px] mt-3"
            >
              Field Notes
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="body-copy text-cream/60 max-w-[400px] mt-5 leading-[2.1]"
            >
              دستورپخت‌های فصلی، گفت‌وگو با کشاورزان، راهنمای خرید برنج، و تخفیف‌های اختصاصی
              — مستقیم در ایمیل شما.
            </motion.p>

            {/* Benefits list */}
            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="mt-7 space-y-2.5"
            >
              {[
                'دستورپخت‌های مجلسی هر ماه',
                'داستان مزارع و کشاورزان',
                'تخفیف ویژه اعضا تا ۱۵٪',
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-[12px] text-cream/65">
                  <span className="w-1 h-1 rounded-full bg-olive2 shrink-0" />
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.85, ease: EASE }}
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="text-center py-10"
                >
                  <div className="w-12 h-12 rounded-full border border-olive2/40 flex items-center justify-center mx-auto mb-5">
                    <span className="text-olive2 text-[20px]">✓</span>
                  </div>
                  <p className="text-[15px] font-light text-cream/90">{msg}</p>
                  <p className="small-copy text-cream/45 mt-2">
                    به‌زودی اولین نامه کیوان را دریافت می‌کنید.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  className="space-y-5"
                >
                  <div>
                    <label htmlFor="nl-email" className="block text-[10px] tracking-[0.18em] text-cream/50 mb-3">
                      آدرس ایمیل
                    </label>
                    <input
                      id="nl-email"
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      dir="ltr"
                      className="w-full bg-cream/[0.06] border border-cream/15 px-5 py-4 text-[13px] text-cream placeholder-cream/30 outline-none focus:border-olive2/60 transition-colors latin"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 text-[12px] tracking-[0.12em] border border-cream/30 hover:border-cream hover:bg-cream/8 transition-all duration-300 disabled:opacity-50"
                  >
                    {status === 'loading' ? '…' : 'عضویت در مجله کیوان'}
                  </button>
                  {status === 'error' && (
                    <p className="small-copy text-red-400 text-center">{msg}</p>
                  )}
                  <p className="text-[10px] text-cream/30 text-center tracking-wide">
                    هیچ‌وقت اسپم نمی‌فرستیم · لغو اشتراک آسان است
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
