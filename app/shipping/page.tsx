import { Header } from '@/components/shop/Header';
import { Footer } from '@/components/shop/Footer';
import Link from 'next/link';
import { Clock3, MapPin, PackageCheck, Truck } from 'lucide-react';

export const metadata = {
  title: 'ارسال و تحویل — Darya Rice',
  description: 'زمان‌بندی ارسال، هزینه تحویل، بسته‌بندی و پیگیری سفارش‌های دریا رایس.',
};

const METHODS = [
  {
    icon: Truck,
    title: 'ارسال تهران',
    text: 'تحویل سفارش‌های تهران معمولاً ۱ تا ۲ روز کاری پس از تأیید سفارش انجام می‌شود.',
  },
  {
    icon: MapPin,
    title: 'ارسال شهرستان',
    text: 'سفارش‌های سراسر ایران با پست یا باربری منتخب ارسال می‌شوند؛ زمان معمول ۳ تا ۷ روز کاری است.',
  },
  {
    icon: PackageCheck,
    title: 'بسته‌بندی مقاوم',
    text: 'کیسه‌ها پیش از ارسال کنترل وزن و سلامت می‌شوند و در بسته‌بندی محافظ قرار می‌گیرند.',
  },
  {
    icon: Clock3,
    title: 'پردازش سفارش',
    text: 'سفارش‌های ثبت‌شده تا ساعت ۱۴ همان روز وارد مرحله آماده‌سازی می‌شوند.',
  },
];

const STEPS = [
  'ثبت سفارش و دریافت پیامک تأیید',
  'کنترل موجودی، وزن و سلامت بسته',
  'تحویل به پیک، پست یا باربری',
  'ارسال کد پیگیری برای سفارش‌های شهرستان',
];

export default function ShippingPage() {
  return (
    <>
      <Header />
      <main className="bg-[var(--cream)] min-h-screen">
        <section className="max-w-[1100px] mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-[720px] mb-14">
            <span className="block h-px w-14 bg-[var(--terra)] mb-5" />
            <p className="text-[var(--olive)] text-[10px] tracking-[0.22em] mb-3">
              — ارسال و تحویل · Shipping —
            </p>
            <h1 className="text-[var(--ink)] font-light leading-tight" style={{ fontSize: 'clamp(34px,5vw,58px)' }}>
              سفارش شما چطور به دستتان می‌رسد؟
            </h1>
            <p className="text-[var(--muted)] text-[15px] leading-loose mt-5 max-w-[620px]">
              دریا رایس سفارش‌ها را با بسته‌بندی مقاوم، کنترل نهایی وزن و کیفیت، و مسیر ارسال مناسب شهر شما آماده می‌کند.
              ارسال سفارش‌های بالای ۵۰۰٬۰۰۰ تومان رایگان است.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {METHODS.map((item) => (
              <article key={item.title} className="border border-[var(--line)] bg-[var(--paper)] p-6">
                <div className="w-11 h-11 rounded-full bg-[var(--olive)]/12 flex items-center justify-center mb-5">
                  <item.icon className="w-5 h-5 text-[var(--olive)]" />
                </div>
                <h2 className="text-[var(--ink)] text-[16px] font-medium mb-3">{item.title}</h2>
                <p className="text-[var(--muted)] text-[13px] leading-loose">{item.text}</p>
              </article>
            ))}
          </div>

          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
            <aside className="border-t border-[var(--line)] pt-8">
              <p className="latin text-[34px] text-[var(--ink)]/20 leading-none mb-2">Delivery</p>
              <h2 className="text-[var(--ink)] text-[22px] font-light mb-4">هزینه ارسال</h2>
              <div className="space-y-4 text-[14px] leading-loose text-[var(--muted)]">
                <p>سفارش‌های بالای ۵۰۰٬۰۰۰ تومان: <span className="text-[var(--olive)] font-medium">رایگان</span></p>
                <p>سفارش‌های کمتر از این مبلغ: هزینه ارسال در مرحله پرداخت محاسبه می‌شود.</p>
                <p>برای خرید عمده یا ارسال چند آدرسی، از صفحه تماس با ما هماهنگ کنید.</p>
              </div>
            </aside>

            <section className="border border-[var(--line)] bg-[var(--paper)] p-6 md:p-8">
              <h2 className="text-[var(--ink)] text-[22px] font-light mb-8">مراحل ارسال</h2>
              <div className="space-y-6">
                {STEPS.map((step, index) => (
                  <div key={step} className="flex gap-4">
                    <span className="latin text-[24px] text-[var(--terra)]/70 leading-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="text-[var(--ink)] text-[14px] leading-loose pt-1">{step}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/shop" className="bg-[var(--ink)] text-[var(--cream)] px-7 py-3 text-[12px] tracking-[0.08em] hover:bg-[var(--terra)] transition-colors">
                  خرید محصولات
                </Link>
                <Link href="/contact" className="border border-[var(--ink)] text-[var(--ink)] px-7 py-3 text-[12px] tracking-[0.08em] hover:bg-[var(--ink)] hover:text-[var(--cream)] transition-colors">
                  پیگیری سفارش
                </Link>
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
