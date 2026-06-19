'use client';

import { useState } from 'react';
import { Instagram, Leaf, Send } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { newsletterFormSchema, type NewsletterFormInput } from '@/schemas/forms';

const shopLinks = [
  { label: 'همه محصولات', href: '/shop' },
  { label: 'طارم هاشمی', href: '/category/tarom' },
  { label: 'دمسیاه شمالی', href: '/category/domsiah' },
  { label: 'کیوان ممتاز', href: '/brand/keyvan-premium' },
  { label: 'ارگانیک', href: '/brand/keyvan-organic' },
];

const helpLinks = [
  { label: 'ارسال و تحویل', href: '/shipping' },
  { label: 'بازگشت و ضمانت', href: '/returns' },
  { label: 'پرسش‌های متداول', href: '/faq' },
  { label: 'خرید عمده', href: '/wholesale' },
  { label: 'تماس با ما', href: '/contact' },
  { label: 'حریم خصوصی', href: '/privacy' },
  { label: 'شرایط فروش', href: '/terms' },
];

export function Footer() {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormInput>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: { email: '' },
  });

  const submitNewsletter = (_values: NewsletterFormInput) => {
    setDone(true);
    reset();
    toast.success('عضویت در خبرنامه ثبت شد');
  };

  return (
    <footer className="bg-deep text-rice">
      <div className="tile-rule h-2 w-full" />
      <div className="site-shell py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.7fr_0.8fr_1.05fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3" aria-label="صفحه اصلی کیوان">
              <span className="flex h-12 w-12 items-center justify-center border border-rice/22 text-saffron">
                <Leaf className="h-5 w-5" />
              </span>
              <span>
                <span className="latin block text-[42px] leading-none">Keyvan</span>
                <span className="mt-1 block text-[11px] text-rice/52">برنج اصیل ایرانی</span>
              </span>
            </Link>
            <p className="mt-6 max-w-[380px] text-[14px] leading-8 text-rice/58">
              فروشگاه تخصصی برنج ایرانی با اطلاعات روشن منشأ، کاربرد و قیمت کامل بسته.
            </p>
            <div className="mt-7 flex gap-3">
              <a href="https://instagram.com/keyvanrice" target="_blank" rel="noopener noreferrer" className="inline-flex h-11 w-11 items-center justify-center border border-rice/18 text-rice/70 transition-colors hover:border-saffron hover:text-saffron" aria-label="اینستاگرام کیوان">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://t.me/keyvanrice" target="_blank" rel="noopener noreferrer" className="inline-flex h-11 w-11 items-center justify-center border border-rice/18 text-rice/70 transition-colors hover:border-saffron hover:text-saffron" aria-label="تلگرام کیوان">
                <Send className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <p className="section-eyebrow mb-5 text-saffron">فروشگاه</p>
            <ul className="space-y-3 text-[13px] text-rice/58">
              {shopLinks.map((link) => <li key={link.href}><Link href={link.href} className="transition-colors hover:text-rice">{link.label}</Link></li>)}
            </ul>
          </div>

          <div>
            <p className="section-eyebrow mb-5 text-saffron">راهنما</p>
            <ul className="space-y-3 text-[13px] text-rice/58">
              {helpLinks.map((link) => <li key={link.href}><Link href={link.href} className="transition-colors hover:text-rice">{link.label}</Link></li>)}
            </ul>
          </div>

          <div className="border-t border-rice/18 pt-6 lg:border-r lg:border-t-0 lg:pr-8 lg:pt-0">
            <p className="section-eyebrow mb-4 text-saffron">خبرنامه برداشت</p>
            <p className="mb-5 text-[12px] leading-7 text-rice/52">موجودی محدود و راهنمای پخت را دریافت کنید.</p>
            {done ? (
              <p className="text-[13px] text-saffron">عضویت شما ثبت شد.</p>
            ) : (
              <form onSubmit={handleSubmit(submitNewsletter)} className="flex" noValidate>
                <label className="sr-only" htmlFor="footer-email">ایمیل</label>
                <input id="footer-email" type="email" required {...register('email')} placeholder="ایمیل شما" className="min-h-11 min-w-0 flex-1 border border-rice/20 bg-rice/8 px-3 text-[13px] text-rice outline-none placeholder:text-rice/35 focus:border-saffron" />
                <button type="submit" className="min-h-11 bg-saffron px-4 text-[12px] font-semibold text-deep">ثبت</button>
                {errors.email && <span className="sr-only">{errors.email.message}</span>}
              </form>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-rice/14 pt-5 text-[11px] text-rice/38 md:flex-row">
          <span>© ۱۴۰۵ کیوان. تمام حقوق محفوظ است.</span>
          <span className="latin">Persian rice, documented by origin.</span>
        </div>
      </div>
    </footer>
  );
}
