import { Header } from '@/components/shop/Header';
import { Footer } from '@/components/shop/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'پرسش‌های متداول — Darya Rice',
  description: 'پاسخ پرسش‌های رایج درباره خرید، ارسال، نگهداری و پخت برنج‌های دریا رایس.',
};

const FAQ = [
  {
    q: 'کدام برنج برای مهمانی مناسب‌تر است؟',
    a: 'طارم هاشمی ممتاز و دمسیاه شمالی انتخاب‌های مجلسی‌تر هستند؛ عطر قوی‌تر، قدکشیدن بهتر و بافت جداجدا دارند.',
  },
  {
    q: 'برای مصرف روزانه چه گزینه‌ای پیشنهاد می‌کنید؟',
    a: 'شیرودی اصیل و فجر معطر برای مصرف روزانه اقتصادی‌ترند و پخت آسان‌تری دارند.',
  },
  {
    q: 'ارسال چقدر طول می‌کشد؟',
    a: 'تهران معمولاً ۱ تا ۲ روز کاری و شهرستان‌ها معمولاً ۳ تا ۷ روز کاری. سفارش‌های بالای ۵۰۰٬۰۰۰ تومان ارسال رایگان دارند.',
  },
  {
    q: 'آیا امکان بازگشت کالا وجود دارد؟',
    a: 'بله. برای سفارش اینترنتی تا ۷ روز کاری پس از تحویل امکان ثبت درخواست بازگشت وجود دارد، به شرط رعایت شرایط سلامت و بسته‌بندی کالا.',
  },
  {
    q: 'برنج را چطور نگهداری کنم؟',
    a: 'در جای خشک، خنک و دور از نور مستقیم نگهداری کنید. پس از باز کردن بسته، ظرف دربسته یا کیسه پارچه‌ای تمیز بهترین گزینه است.',
  },
  {
    q: 'چطور سفارش را پیگیری کنم؟',
    a: 'پس از آماده‌سازی سفارش، کد پیگیری برای ارسال‌های شهرستان ثبت می‌شود. برای پیگیری سریع‌تر از صفحه تماس شماره سفارش را ارسال کنید.',
  },
];

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="bg-[var(--cream)] min-h-screen">
        <section className="max-w-[960px] mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-[700px] mb-14">
            <span className="block h-px w-14 bg-[var(--terra)] mb-5" />
            <p className="text-[var(--olive)] text-[10px] tracking-[0.22em] mb-3">
              — راهنمای خرید · FAQ —
            </p>
            <h1 className="text-[var(--ink)] font-light leading-tight" style={{ fontSize: 'clamp(34px,5vw,58px)' }}>
              پرسش‌های متداول
            </h1>
            <p className="text-[var(--muted)] text-[15px] leading-loose mt-5 max-w-[620px]">
              پاسخ‌های کوتاه و کاربردی درباره انتخاب برنج، ارسال، بازگشت و نگهداری محصول.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ.map((item, index) => (
              <article key={item.q} className="border border-[var(--line)] bg-[var(--paper)] p-6 md:p-7">
                <div className="flex gap-5 items-start">
                  <span className="latin text-[24px] text-[var(--terra)]/70 leading-none pt-1">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h2 className="text-[var(--ink)] text-[17px] font-medium mb-3">{item.q}</h2>
                    <p className="text-[var(--muted)] text-[14px] leading-loose">{item.a}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 border-t border-[var(--line)] pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p className="latin text-[28px] text-[var(--ink)]/20 leading-none mb-2">Need help?</p>
              <p className="text-[var(--ink)] text-[15px]">پاسخ خود را پیدا نکردید؟ پشتیبانی در کنار شماست.</p>
            </div>
            <Link href="/contact" className="bg-[var(--ink)] text-[var(--cream)] px-7 py-3 text-[12px] tracking-[0.08em] text-center hover:bg-[var(--terra)] transition-colors">
              تماس با پشتیبانی
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
