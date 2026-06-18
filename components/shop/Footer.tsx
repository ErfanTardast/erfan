'use client';
import { useState } from 'react';
import { Instagram, Send } from 'lucide-react';
import Link from 'next/link';

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
  { label: 'تماس با ما', href: '/contact' },
  { label: 'حریم خصوصی', href: '/privacy' },
  { label: 'شرایط فروش', href: '/terms' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setDone(true);
  };

  return (
    <footer className="bg-rice border-t border-line">
      <div className="site-shell py-12 md:py-16">
        <div className="grid lg:grid-cols-[1.35fr_0.75fr_0.75fr_1fr] gap-10 lg:gap-12">
          <div>
            <Link href="/" className="inline-flex items-end gap-3">
              <span className="latin text-[42px] leading-none text-ink">Keyvan</span>
              <span className="text-[24px] font-semibold text-cypress leading-none">کیوان</span>
            </Link>
            <p className="body-copy text-muted max-w-[360px] mt-5 leading-8">
              فروشگاه تخصصی برنج ایرانی با تمرکز بر منشأ روشن، انتخاب دقیق و تجربه خرید ساده.
            </p>
            <div className="flex gap-3 mt-7">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 border border-line bg-paper inline-flex items-center justify-center hover:border-ink transition-colors"
                aria-label="اینستاگرام کیوان"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/keyvanrice"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 border border-line bg-paper inline-flex items-center justify-center hover:border-ink transition-colors"
                aria-label="تلگرام کیوان"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <p className="section-eyebrow text-cypress mb-5">فروشگاه</p>
            <ul className="space-y-3 text-[14px] text-muted">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-ink transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="section-eyebrow text-cypress mb-5">راهنما</p>
            <ul className="space-y-3 text-[14px] text-muted">
              {helpLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-ink transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="harvest-card bg-paper p-5">
            <p className="section-eyebrow text-cypress mb-4">خبرنامه برداشت</p>
            <p className="small-copy text-muted leading-7 mb-5">
              پیشنهادهای فصلی، راهنمای پخت و موجودی‌های محدود کیوان را دریافت کنید.
            </p>
            {done ? (
              <p className="text-[13px] text-cypress">عضویت شما ثبت شد.</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <label className="sr-only" htmlFor="footer-email">ایمیل</label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="ایمیل شما"
                  className="min-h-11 flex-1 border border-line bg-rice px-3 text-[13px] outline-none focus:border-ink"
                />
                <button type="submit" className="cta-ink px-4 text-[12px]">
                  ثبت
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-line mt-12 pt-5 flex flex-col md:flex-row justify-between gap-3 text-[12px] text-muted">
          <span>© ۱۴۰۳ کیوان. تمام حقوق محفوظ است.</span>
          <span className="latin">Persian rice, selected with care.</span>
        </div>
      </div>
    </footer>
  );
}
