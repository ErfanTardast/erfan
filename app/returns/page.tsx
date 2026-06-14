import { Header } from '@/components/shop/Header';
import { Footer } from '@/components/shop/Footer';
import Link from 'next/link';
import { CheckCircle2, PackageOpen, RefreshCcw, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'بازگشت و ضمانت کیفیت — Darya Rice',
  description: 'شرایط بازگشت کالا، ضمانت اصالت و روند رسیدگی به سفارش‌های دریا رایس.',
};

const GUARANTEES = [
  { icon: ShieldCheck, title: 'تضمین اصالت', text: 'محصول ارسالی باید دقیقاً مطابق نام، وزن و نوع ثبت‌شده در سفارش باشد.' },
  { icon: RefreshCcw, title: '۷ روز کاری فرصت بررسی', text: 'برای سفارش‌های اینترنتی، درخواست بازگشت تا ۷ روز کاری پس از تحویل قابل ثبت است.' },
  { icon: PackageOpen, title: 'سلامت بسته', text: 'در صورت آسیب‌دیدگی بسته در مسیر ارسال، موضوع را با عکس بسته و برچسب ارسال ثبت کنید.' },
  { icon: CheckCircle2, title: 'رسیدگی انسانی', text: 'هر درخواست توسط پشتیبانی بررسی می‌شود؛ هدف ما حل مسئله است، نه فرسوده کردن مشتری.' },
];

const RULES = [
  'کالا باید استفاده‌نشده، تمیز و تا حد امکان در بسته‌بندی اصلی باشد.',
  'در صورت اشتباه در ارسال یا آسیب‌دیدگی، هزینه بازگشت با دریا رایس است.',
  'در درخواست انصراف بدون ایراد کالا، هزینه بازپس‌فرستادن بر عهده مشتری است.',
  'پس از دریافت و بررسی کالا، بازگشت وجه یا جایگزینی محصول هماهنگ می‌شود.',
];

export default function ReturnsPage() {
  return (
    <>
      <Header />
      <main className="bg-[var(--cream)] min-h-screen">
        <section className="max-w-[1100px] mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-[760px] mb-14">
            <span className="block h-px w-14 bg-[var(--terra)] mb-5" />
            <p className="text-[var(--olive)] text-[10px] tracking-[0.22em] mb-3">
              — ضمانت کیفیت · Returns —
            </p>
            <h1 className="text-[var(--ink)] font-light leading-tight" style={{ fontSize: 'clamp(34px,5vw,58px)' }}>
              اگر محصول مطابق انتظار نبود، تنها نمی‌مانید.
            </h1>
            <p className="text-[var(--muted)] text-[15px] leading-loose mt-5 max-w-[640px]">
              برنج کالایی اعتمادمحور است. ما اصالت، وزن و سلامت بسته را تضمین می‌کنیم و درخواست‌های بازگشت را شفاف و انسانی بررسی می‌کنیم.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {GUARANTEES.map((item) => (
              <article key={item.title} className="border border-[var(--line)] bg-[var(--paper)] p-6">
                <div className="w-11 h-11 rounded-full bg-[var(--olive)]/12 flex items-center justify-center mb-5">
                  <item.icon className="w-5 h-5 text-[var(--olive)]" />
                </div>
                <h2 className="text-[var(--ink)] text-[16px] font-medium mb-3">{item.title}</h2>
                <p className="text-[var(--muted)] text-[13px] leading-loose">{item.text}</p>
              </article>
            ))}
          </div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16">
            <section className="border border-[var(--line)] bg-[var(--paper)] p-6 md:p-8">
              <p className="latin text-[34px] text-[var(--ink)]/20 leading-none mb-2">Policy</p>
              <h2 className="text-[var(--ink)] text-[22px] font-light mb-8">شرایط اصلی بازگشت</h2>
              <div className="space-y-5">
                {RULES.map((rule, index) => (
                  <div key={rule} className="flex gap-4">
                    <span className="latin text-[22px] text-[var(--terra)]/70 leading-none">{String(index + 1).padStart(2, '0')}</span>
                    <p className="text-[var(--muted)] text-[14px] leading-loose">{rule}</p>
                  </div>
                ))}
              </div>
            </section>

            <aside className="border-t border-[var(--line)] pt-8">
              <h2 className="text-[var(--ink)] text-[22px] font-light mb-4">ثبت درخواست</h2>
              <p className="text-[var(--muted)] text-[14px] leading-loose mb-6">
                شماره سفارش، شماره تماس و در صورت وجود تصویر بسته یا محصول را ارسال کنید تا پشتیبانی بررسی را شروع کند.
              </p>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link href="/contact" className="bg-[var(--ink)] text-[var(--cream)] px-7 py-3 text-[12px] tracking-[0.08em] text-center hover:bg-[var(--terra)] transition-colors">
                  ثبت درخواست بازگشت
                </Link>
                <Link href="/terms" className="border border-[var(--ink)] text-[var(--ink)] px-7 py-3 text-[12px] tracking-[0.08em] text-center hover:bg-[var(--ink)] hover:text-[var(--cream)] transition-colors">
                  شرایط فروش
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
