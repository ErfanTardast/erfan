import { Header } from '@/components/shop/Header';
import { Footer } from '@/components/shop/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Sprout, Hand, ShieldCheck, Heart } from 'lucide-react';
import { assetPath } from '@/lib/asset-path';

export const metadata = { title: 'داستان ما — Keyvan Rice' };

const STATS = [
  { value: '۱۸', label: 'سال فعالیت' },
  { value: '۱', label: 'منطقه اصلی کشت' },
  { value: '۸', label: 'انتخاب برای مصرف متفاوت' },
  { value: 'شفاف', label: 'مشخصات پیش از خرید' },
];

const VALUES = [
  { icon: Sprout, title: 'منشأ مشخص', text: 'رقم برنج، منطقه کشت و سال برداشت در معرفی هر محصول ثبت می‌شود.' },
  { icon: Hand, title: 'انتخاب دقیق', text: 'هر محموله از نظر عطر، یکدستی دانه و نتیجه پخت بررسی می‌شود.' },
  { icon: ShieldCheck, title: 'معرفی شفاف', text: 'وزن، قیمت کامل بسته، کاربرد پیشنهادی و شیوه پخت پیش از خرید روشن است.' },
  { icon: Heart, title: 'پشتیبانی پاسخ‌گو', text: 'برای انتخاب محصول، شیوه پخت و پیگیری سفارش می‌توانید مستقیم با کیوان در تماس باشید.' },
];

const TIMELINE = [
  { year: '۱۳۸۷', title: 'آغاز کیوان', text: 'فعالیت کیوان با تمرکز بر انتخاب و عرضه برنج ایرانی از آمل آغاز شد.' },
  { year: '۱۳۹۵', title: 'شفافیت منشأ', text: 'اطلاعات نوع برنج و منطقه کشت به بخش ثابت معرفی محصولات تبدیل شد.' },
  { year: '۱۴۰۳', title: 'فروشگاه آنلاین', text: 'خرید مستقیم محصولات کیوان برای مشتریان سراسر ایران فراهم شد.' },
  { year: '۱۴۰۵', title: 'تجربه خرید تازه', text: 'فروشگاه با قیمت‌گذاری شفاف، انتخاب سریع و اطلاعات دقیق‌تر محصول بازطراحی شد.' },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-[var(--cream)]">
        {/* Hero */}
        <section className="relative h-[58vh] min-h-[420px] overflow-hidden">
          <Image
            src={assetPath('/images/keyvan/about-quality.webp')}
            alt="بررسی کیفیت دانه‌های برنج کیوان پیش از بسته‌بندی"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />
          <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-12 text-center md:pb-16">
            <p className="text-[var(--cream)]/60 text-[11px] tracking-[0.3em] mb-5">— داستان ما —</p>
            <h1 className="text-[var(--cream)] font-light leading-tight" style={{ fontSize: 'clamp(36px,6vw,72px)' }}>
              کیوان؛ انتخاب دقیق برنج ایرانی
            </h1>
            <p className="text-[var(--cream)]/70 text-[14px] md:text-[16px] mt-5 max-w-[480px] leading-loose">
              از شالیزارهای آمل تا بسته‌بندی نهایی، هر محصول با معیار مشخص انتخاب و معرفی می‌شود.
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="max-w-[760px] mx-auto px-6 md:px-12 py-20 md:py-28 text-center">
          <p className="text-[var(--ink)] text-[18px] md:text-[22px] font-light leading-[2.1]">
            کیوان از سال ۱۳۸۷ بر انتخاب و عرضه برنج ایرانی از شالیزارهای آمل تمرکز دارد.
            هر محموله بر اساس عطر، یکدستی دانه و نتیجه پخت بررسی می‌شود و با مشخصات روشن رقم،
            سال برداشت، وزن و کاربرد پیشنهادی در اختیار خریدار قرار می‌گیرد.
          </p>
        </section>

        {/* Stats */}
        <section className="border-y border-[var(--line)] bg-[var(--paper)]">
          <div className="max-w-[1100px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4">
            {STATS.map((s, i) => (
              <div key={s.label} className={`text-center py-10 ${i < STATS.length - 1 ? 'md:border-l border-[var(--line)]' : ''} ${i < 2 ? 'border-b md:border-b-0 border-[var(--line)]' : ''}`}>
                <p className="text-[var(--ink)] font-light" style={{ fontSize: 'clamp(32px,4vw,48px)' }}>{s.value}</p>
                <p className="text-[var(--muted)] text-[12px] tracking-[0.12em] mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="max-w-[1100px] mx-auto px-6 md:px-12 py-20 md:py-28">
          <p className="text-[var(--olive)] text-[10px] tracking-[0.24em] mb-3 text-center">— ارزش‌های ما —</p>
          <h2 className="text-[var(--ink)] font-light text-center mb-14" style={{ fontSize: 'clamp(28px,4vw,44px)' }}>
            چه چیزی کیوان را متفاوت می‌کند
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((v) => (
              <div key={v.title} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--olive)]/12 flex items-center justify-center mx-auto mb-5">
                  <v.icon className="w-5 h-5 text-[var(--olive)]" />
                </div>
                <h3 className="text-[var(--ink)] text-[16px] font-medium mb-3">{v.title}</h3>
                <p className="text-[var(--muted)] text-[13px] leading-[2]">{v.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-[var(--paper)] border-y border-[var(--line)]">
          <div className="max-w-[820px] mx-auto px-6 md:px-12 py-20 md:py-28">
            <p className="text-[var(--olive)] text-[10px] tracking-[0.24em] mb-3 text-center">— مسیر کیوان —</p>
            <h2 className="text-[var(--ink)] font-light text-center mb-14" style={{ fontSize: 'clamp(28px,4vw,44px)' }}>
              مسیر رشد کیوان
            </h2>
            <div className="space-y-0">
              {TIMELINE.map((t, i) => (
                <div key={t.year} className={`flex gap-6 md:gap-10 ${i < TIMELINE.length - 1 ? 'pb-10' : ''}`}>
                  <div className="shrink-0 text-left">
                    <span className="latin text-[var(--olive)] text-[22px] md:text-[28px] font-medium">{t.year}</span>
                  </div>
                  <div className={`relative pr-6 md:pr-10 ${i < TIMELINE.length - 1 ? 'border-r-2 border-[var(--line)]' : 'border-r-2 border-transparent'}`}>
                    <span className="absolute right-[-7px] top-1.5 w-3 h-3 rounded-full bg-[var(--olive)]" />
                    <h3 className="text-[var(--ink)] text-[17px] font-medium mb-2">{t.title}</h3>
                    <p className="text-[var(--muted)] text-[13px] leading-[2] max-w-[440px]">{t.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-[760px] mx-auto px-6 md:px-12 py-20 md:py-28 text-center">
          <h2 className="text-[var(--ink)] font-light mb-6" style={{ fontSize: 'clamp(28px,4vw,44px)' }}>
            برنج مناسب مصرف خود را دقیق‌تر انتخاب کنید
          </h2>
          <p className="text-[var(--muted)] text-[15px] leading-loose mb-9 max-w-[480px] mx-auto">
            محصولات را بر اساس عطر، نوع پخت و کاربرد مقایسه کنید و پیش از سفارش، قیمت کامل هر بسته را ببینید.
          </p>
          <Link href="/shop" className="inline-flex items-center gap-2 bg-[var(--ink)] text-[var(--cream)] text-[13px] tracking-[0.1em] px-9 py-4 hover:bg-[var(--deep)] transition-colors">
            مقایسه و خرید محصولات
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
