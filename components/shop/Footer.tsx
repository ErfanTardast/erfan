'use client';
import { useState } from 'react';
import { Instagram } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <footer className="bg-ink text-white">
      {/* Main footer grid */}
      <div className="max-w-[1500px] mx-auto px-5 md:px-8 lg:px-12 pt-16 md:pt-20 pb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-[1.6fr_0.8fr_0.8fr_1.4fr] gap-12 lg:gap-10">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <p className="latin text-[32px] tracking-tighter font-medium leading-none">Keyvan</p>
              <span className="text-[26px] font-semibold leading-none text-[#9ba595]">کیوان</span>
            </div>
            <span className="block h-px w-12 bg-[var(--terra)] mb-4" />
            <p className="text-[13px] text-[#6d7a67] mb-2 tracking-[0.08em]">برنج‌خانه‌ی شمال · از ۱۳۸۷</p>
            <p className="small-copy text-[#9ba595] mt-4 max-w-[300px] leading-[2]">
              از مزارع سرسبز شمال ایران، با عشق به سفره شما می‌آوریم. هر دانه، روایتی از خاک و آفتاب و دست‌های کشاورز.
            </p>
            <div className="flex gap-3 mt-7">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[#3a4a3a] flex items-center justify-center hover:border-[#6a8a6a] hover:text-[#9ba595] transition-all duration-300"
                aria-label="اینستاگرام"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://t.me/keyvanrice"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[#3a4a3a] flex items-center justify-center hover:border-[#6a8a6a] hover:text-[#9ba595] transition-all duration-300 text-[11px] font-medium"
                aria-label="تلگرام"
              >
                تلگ
              </a>
            </div>
          </div>

          {/* Shop column */}
          <div>
            <p className="section-eyebrow text-[#596355] mb-6">فروشگاه</p>
            <ul className="space-y-3 text-[13px] text-[#bdc5b7]">
              {[
                { label: 'همه محصولات', href: '/shop' },
                { label: 'طارم هاشمی', href: '/shop?type=tarom' },
                { label: 'دمسیاه شمالی', href: '/shop?type=domsiah' },
                { label: 'محصولات ارگانیک', href: '/shop?organic=true' },
                { label: 'بسته‌بندی هدیه', href: '/shop?collection=chef-choice' },
                { label: 'فروش ویژه', href: '/shop?premium=true' },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors duration-200 cursor-pointer">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info column */}
          <div>
            <p className="section-eyebrow text-[#596355] mb-6">اطلاعات</p>
            <ul className="space-y-3 text-[13px] text-[#bdc5b7]">
              <li><Link href="/about" className="hover:text-white transition-colors duration-200 cursor-pointer">درباره کیوان</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors duration-200 cursor-pointer">داستان مزارع</Link></li>
              <li><Link href="/recipes" className="hover:text-white transition-colors duration-200 cursor-pointer">مجله کیوان</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors duration-200 cursor-pointer">تماس با ما</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors duration-200 cursor-pointer">ارسال و تحویل</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors duration-200 cursor-pointer">بازگشت و ضمانت</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors duration-200 cursor-pointer">پرسش‌های متداول</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors duration-200 cursor-pointer">حریم خصوصی</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors duration-200 cursor-pointer">شرایط فروش</Link></li>
            </ul>
          </div>

          {/* Newsletter column */}
          <div>
            <p className="section-eyebrow text-[#596355] mb-6">خبرنامه کیوان</p>
            <p className="small-copy text-[#8e9789] leading-relaxed mb-5">
              دستورپخت فصلی، داستان کشاورزان، و تخفیف‌های ویژه — مستقیم در ایمیل شما.
            </p>
            {done ? (
              <p className="text-[13px] text-[#7a9a7a] tracking-wide">✓ به خانواده کیوان خوش آمدید</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="ایمیل شما"
                  className="w-full bg-transparent border-b border-[#3a4a3a] pb-2.5 text-[13px] text-white placeholder-[#4a5a4a] outline-none focus:border-[#6a8a6a] transition-colors"
                />
                <button
                  type="submit"
                  className="text-[11px] tracking-[0.14em] text-[#7a9a6a] hover:text-white transition-colors"
                >
                  عضویت ←
                </button>
              </form>
            )}

            {/* Certifications */}
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="text-[8px] tracking-[0.14em] border border-[#2e3e2e] px-2.5 py-1.5 text-[#596355]">
                ارگانیک تأیید شده
              </span>
              <span className="text-[8px] tracking-[0.14em] border border-[#2e3e2e] px-2.5 py-1.5 text-[#596355]">
                ارسال سراسری
              </span>
              <span className="text-[8px] tracking-[0.14em] border border-[#2e3e2e] px-2.5 py-1.5 text-[#596355]">
                پرداخت امن
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#243024] mt-14 pt-6 flex flex-col md:flex-row justify-between gap-3 text-[10px] text-[#4a5a48]">
          <span>© ۱۴۰۳ کیوان — تمام حقوق محفوظ است</span>
          <div className="flex items-center gap-4">
            <span>ساخته شده با محبت در ایران</span>
            <span>·</span>
            <span className="latin">From Gilan, for the world</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
