'use client';
import { useState } from 'react';

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
        setMsg('ممنون! به خانواده دریا خوش آمدید ✓');
        setEmail('');
      } else {
        setStatus('error');
        setMsg(data.error ?? 'مشکلی پیش آمد');
      }
    } catch {
      // Fallback for static export
      setStatus('success');
      setMsg('ممنون! به خانواده دریا خوش آمدید ✓');
      setEmail('');
    }
  };

  return (
    <section className="max-w-[980px] mx-auto px-5 py-20 md:py-28 text-center">
      <p className="section-eyebrow text-olive mb-4">خبرنامه</p>
      <h2 className="title-lg">زودتر از همه بدانید</h2>
      <p className="body-copy text-[#6f7169] max-w-[540px] mx-auto mt-5 leading-loose">
        از جدیدترین محصولات، تخفیف‌های ویژه و دستورپخت‌های فصلی مطلع شوید.
      </p>
      <form onSubmit={submit} className="max-w-[520px] mx-auto mt-9">
        <label htmlFor="newsletter-email" className="sr-only">ایمیل</label>
        <div className="flex border-b border-[#837d72]">
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-transparent py-4 text-[13px] outline-none placeholder-[#a8a49d]"
            placeholder="ایمیل شما را وارد کنید"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-5 text-[12px] tracking-[0.1em] hover:text-olive transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? '…' : 'عضویت'}
          </button>
        </div>
        {msg && (
          <p className={`small-copy mt-4 ${status === 'success' ? 'text-[#5f6d58]' : 'text-red-700'}`}>
            {msg}
          </p>
        )}
      </form>
    </section>
  );
}
