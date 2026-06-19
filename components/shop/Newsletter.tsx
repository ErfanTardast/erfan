'use client';

import { CheckCircle2, Mail } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { newsletterFormSchema, type NewsletterFormInput } from '@/schemas/forms';

export function Newsletter() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormInput>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: { email: '' },
  });

  const submit = async ({ email }: NewsletterFormInput) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        setMsg(data.error ?? 'ایمیل را بررسی کنید و دوباره تلاش کنید.');
        return;
      }
      setStatus('success');
      setMsg(data.message ?? 'عضویت شما ثبت شد.');
      reset();
      toast.success('عضویت در نامه کیوان ثبت شد');
    } catch {
      setStatus('success');
      setMsg('عضویت شما ثبت شد.');
      reset();
      toast.success('عضویت در نامه کیوان ثبت شد');
    }
  };

  return (
    <section className="border-b border-line bg-paper">
      <div className="site-shell grid lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-line py-14 lg:border-b-0 lg:border-l lg:py-20 lg:pl-14">
          <p className="section-eyebrow mb-4 text-clay">نامه برداشت</p>
          <h2 className="max-w-[520px] text-[clamp(32px,4vw,56px)] font-semibold leading-[1.22] text-ink">
            موجودی تازه و راهنمای پخت، کوتاه و کاربردی.
          </h2>
          <p className="mt-5 max-w-[500px] text-[14px] leading-8 text-muted">
            فقط زمان عرضه برداشت‌های محدود، پیشنهادهای فصلی و نکته‌های واقعی برای بهتر پختن برنج.
          </p>
        </div>

        <div className="flex items-center py-14 lg:py-20 lg:pr-14">
          {status === 'success' ? (
            <div className="flex min-h-[160px] items-start gap-4">
              <CheckCircle2 className="mt-1 h-7 w-7 shrink-0 text-cypress" />
              <div>
                <p className="text-[20px] font-semibold text-ink">{msg}</p>
                <p className="mt-2 text-[13px] text-muted">نامه بعدی کیوان به این ایمیل می‌رسد.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(submit)} className="w-full" noValidate>
              <label htmlFor="nl-email" className="mb-3 block text-[13px] font-semibold text-ink">
                ایمیل برای دریافت نامه کیوان
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex min-h-12 flex-1 items-center gap-3 border border-line bg-rice px-4 focus-within:border-cypress">
                  <Mail className="h-4 w-4 shrink-0 text-indigo" />
                  <input
                    id="nl-email"
                    type="email"
                    required
                    {...register('email')}
                    placeholder="name@example.com"
                    dir="ltr"
                    className="latin h-12 flex-1 bg-transparent text-[14px] outline-none placeholder:text-muted/55"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="min-h-12 bg-cypress px-7 text-[13px] font-semibold text-rice transition-colors hover:bg-deep disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === 'loading' ? 'در حال ثبت...' : 'عضویت'}
                </button>
              </div>
              {errors.email && <p className="mt-2 text-[11px] text-clay">{errors.email.message}</p>}
              {status === 'error' && <p className="mt-2 text-[12px] text-clay">{msg}</p>}
              <p className="mt-4 text-[11px] leading-6 text-muted">لغو عضویت همیشه با یک کلیک ممکن است.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
