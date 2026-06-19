'use client';

import { useState } from 'react';
import { Phone, ChevronDown, Instagram, Send, Shield, Lock, Truck, Headphones, CreditCard } from 'lucide-react';
import Link from 'next/link';

const FOOTER_COLS = [
  {
    title: 'دسترسی سریع',
    links: [
      'درباره ما',
      'اهداف و تعهدات ما',
      'تسمه سقا در یک نگاه',
      'سوالات متداول',
      'تماس با ما',
      'بلاگ',
    ],
  },
  {
    title: 'پیش از خرید',
    links: [
      'راهنمای خرید از تسمه سقا',
      'خرید سازمانی',
      'راهنمای خرید اقساطی',
      'روش‌های خرید از تسمه سقا',
      'ضمانت هفت‌روزه تسمه سقا',
      'شیوه‌ها و هزینه ارسال',
    ],
  },
  {
    title: 'پس از خرید',
    links: [
      'رهگیری سفارش',
      'رویه‌های بازگرداندن کالا',
      'راهنمای مرجوعی در سایت',
    ],
  },
  {
    title: 'قوانین و مقررات',
    links: [
      'حریم خصوصی کاربران',
      'از زبان مشتریان تسمه سقا',
      'چرا تسمه سقا؟',
    ],
  },
];

function FooterCol({ title, links }: { title: string; links: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-800 md:border-none last:border-none">
      <button
        className="md:cursor-default w-full flex items-center justify-between py-3 md:py-0 md:mb-4 text-start"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm sm:text-base font-bold text-white">{title}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 md:hidden transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <ul
        className={`space-y-2 overflow-hidden transition-all duration-300 md:block ${
          open ? 'max-h-96 pb-3' : 'max-h-0 md:max-h-none'
        }`}
      >
        {links.map((link) => (
          <li key={link}>
            <Link
              href="#"
              className="text-[12px] sm:text-[13px] text-gray-400 hover:text-white transition-colors leading-relaxed"
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function EcomFooter() {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-gray-900 text-white">
      {/* Trust badges row */}
      <div className="border-b border-gray-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 sm:gap-3 w-full">
            {[
              { label: 'ضمانت اصالت کالا', Icon: Shield, color: 'text-green-400' },
              { label: 'پرداخت امن', Icon: Lock, color: 'text-blue-400' },
              { label: 'ارسال سریع', Icon: Truck, color: 'text-orange-400' },
              { label: 'پشتیبانی ۲۴ ساعته', Icon: Headphones, color: 'text-purple-400' },
              { label: 'خرید اقساطی', Icon: CreditCard, color: 'text-red-400' },
            ].map(({ label, Icon, color }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className={`w-4 h-4 flex-shrink-0 ${color}`} />
                <span className="text-[11px] sm:text-xs text-gray-300 whitespace-nowrap">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
        <div className="grid md:grid-cols-[1.5fr_repeat(4,1fr)] gap-6 md:gap-8">
          {/* Brand column */}
          <div>
            <div className="mb-4 sm:mb-5">
              <span className="text-red-500 font-black text-xl sm:text-2xl block leading-none">تسمه سقا</span>
              <span className="text-gray-500 text-[10px]">فروشگاه اینترنتی تجهیزات صنعتی</span>
            </div>

            {/* Contact */}
            <div className="space-y-2 sm:space-y-3 mb-5 sm:mb-6">
              <h4 className="text-[11px] sm:text-xs font-bold text-gray-300 uppercase tracking-wider">
                ارتباط با ما
              </h4>
              <a
                href="tel:02161930000"
                className="flex items-center gap-2 text-[12px] sm:text-[13px] text-gray-400 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                ۰۲۱-۶۱۹۳۰۰۰۰
              </a>
              <a
                href="tel:02191000100"
                className="flex items-center gap-2 text-[12px] sm:text-[13px] text-gray-400 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                ۰۲۱-۹۱۰۰۰۱۰۰
              </a>
              <p className="text-[10px] sm:text-[11px] text-gray-500">
                ۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم
              </p>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-[11px] sm:text-xs font-bold text-gray-300 mb-2 sm:mb-3">
                خبرنامه
              </h4>
              <p className="text-[10px] sm:text-[11px] text-gray-500 mb-2 leading-relaxed">
                با ثبت ایمیل، از جدیدترین تخفیف‌ها باخبر شوید
              </p>
              <div className="flex gap-1.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ایمیل شما"
                  className="flex-1 min-w-0 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                  dir="ltr"
                />
                <button className="flex-shrink-0 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors flex items-center gap-1">
                  <Send className="w-3.5 h-3.5" />
                  ثبت
                </button>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-2 mt-4 sm:mt-5">
              {[
                { icon: Instagram, label: 'اینستاگرام' },
                { icon: Send, label: 'تلگرام' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <FooterCol key={col.title} title={col.title} links={col.links} />
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-start">
          <p className="text-[10px] sm:text-[11px] text-gray-500 leading-relaxed">
            © ۱۴۰۵ تمام حقوق این وب‌سایت برای فروشگاه آنلاین تسمه سقا محفوظ است.
          </p>
          <p className="text-[10px] sm:text-[11px] text-gray-600">
            قدرت گرفته توسط{' '}
            <span className="text-gray-500 font-medium">XCommerce</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
