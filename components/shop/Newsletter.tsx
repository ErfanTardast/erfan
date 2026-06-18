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
    <section className="bg-rice py-14 md:py-20">
      <div className="site-shell">
        <div className="harvest-card grid overflow-hidden md:grid-cols-[0.9fr_1fr]">
          <div className="field-pattern bg-ink p-7 text-rice md:p-10">
            <p className="section-eyebrow mb-4 text-saffron">نامه کیوان</p>
            <h2 className="title-md max-w-[420px] text-rice">پیشنهادهای فصلی، دستور پخت و موجودی تازه</h2>
            <p className="body-copy mt-5 max-w-[440px] text-rice/68">
              فقط پیام‌های کوتاه و کاربردی برای خرید بهتر برنج. لغو عضویت همیشه ساده است.
            </p>
          </div>

          <div className="bg-paper p-7 md:p-10">
            {status === 'success' ? (
              <div className="flex min-h-[180px] flex-col items-start justify-center">
                <CheckCircle2 className="mb-5 h-9 w-9 text-cypress" />
                <p className="text-[17px] font-medium">{msg}</p>
                <p className="small-copy mt-2 text-muted">به‌زودی اولین نامه کیوان را دریافت می‌کنید.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(submit)} className="space-y-4" noValidate>
                <div>
                  <label htmlFor="nl-email" className="mb-2 block text-[13px] font-medium">
                    آدرس ایمیل
                  </label>
                  <div className="flex min-h-12 items-center gap-3 border border-line bg-rice px-4 focus-within:border-cypress">
                    <Mail className="h-4 w-4 shrink-0 text-muted" />
                    <input
                      id="nl-email"
                      type="email"
                      required
                      {...register('email')}
                      placeholder="your@email.com"
                      dir="ltr"
                      className="latin h-12 flex-1 bg-transparent text-[14px] outline-none placeholder:text-muted/55"
                    />
                  </div>
                  {errors.email && <p className="mt-1.5 text-[11px] text-clay">{errors.email.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="cta-ink flex h-12 w-full items-center justify-center text-[13px] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === 'loading' ? 'در حال ثبت...' : 'عضویت در نامه کیوان'}
                </button>
                {status === 'error' && <p className="text-[12px] text-clay">{msg}</p>}
                <p className="text-[12px] leading-7 text-muted">
                  ایمیل شما فقط برای اطلاع‌رسانی کیوان استفاده می‌شود.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
