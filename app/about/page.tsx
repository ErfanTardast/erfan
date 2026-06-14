import { Header } from '@/components/shop/Header';
import { Footer } from '@/components/shop/Footer';
import Link from 'next/link';
import { Sprout, Hand, ShieldCheck, Heart } from 'lucide-react';

export const metadata = { title: 'داستان ما — Keyvan Rice' };

const STATS = [
  { value: '۳۶', label: 'سال تجربه' },
  { value: '۳', label: 'استان شمالی' },
  { value: '۸', label: 'نوع برنج اصیل' },
  { value: '۱۲٬۰۰۰+', label: 'مشتری راضی' },
];

const VALUES = [
  { icon: Sprout, title: 'کشت اصیل', text: 'تنها بذرهای بومی شمال ایران، در خاکی که نسل‌ها برنج پرورده است.' },
  { icon: Hand, title: 'برداشت دستی', text: 'هر خوشه با دست و در زمان درست برداشت می‌شود — ماشین جای ظرافت کشاورز را نمی‌گیرد.' },
  { icon: ShieldCheck, title: 'تضمین اصالت', text: 'بدون اختلاط، بدون افزودنی. هر کیسه دقیقاً همان است که روی برچسب نوشته شده.' },
  { icon: Heart, title: 'بدون واسطه', text: 'مستقیم از کشاورز به سفره شما — قیمت منصفانه برای شما و کشاورز.' },
];

const TIMELINE = [
  { year: '۱۳۶۷', title: 'آغاز راه', text: 'پدربزرگ ما اولین کیسه‌های برنج طارم را از مزرعه‌ی خانوادگی در رشت به بازار برد.' },
  { year: '۱۳۸۷', title: 'نام کیوان', text: 'نسل دوم، برند کیوان را بنیان گذاشت تا برنج اصیل شمال را به سراسر ایران برساند.' },
  { year: '۱۳۹۸', title: 'کشت ارگانیک', text: 'اولین مزارع ارگانیک تأییدشده‌ی ما به بهره‌برداری رسید.' },
  { year: '۱۴۰۳', title: 'فروشگاه آنلاین', text: 'امروز، با ارسال مستقیم به سراسر کشور، کیوان را در خانه‌ی شما داریم.' },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-[var(--cream)]">
        {/* Hero */}
        <section className="relative h-[58vh] min-h-[420px] overflow-hidden grain-overlay">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80"
            alt="مزارع برنج شمال ایران"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(28,22,14,0.7), rgba(44,30,18,0.55))' }} />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <p className="text-[var(--cream)]/60 text-[11px] tracking-[0.3em] mb-5">— داستان ما —</p>
            <h1 className="text-[var(--cream)] font-light leading-tight" style={{ fontSize: 'clamp(36px,6vw,72px)' }}>
              از خاک شمال ایران
            </h1>
            <p className="text-[var(--cream)]/70 text-[14px] md:text-[16px] mt-5 max-w-[480px] leading-loose">
              سه نسل، یک باور: برنجی که شایسته‌ی سفره‌ی شماست.
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="max-w-[760px] mx-auto px-6 md:px-12 py-20 md:py-28 text-center">
          <p className="text-[var(--ink)] text-[18px] md:text-[22px] font-light leading-[2.1]">
            کیوان از سال ۱۳۶۷ با کشاورزان نسل‌های شمال ایران کار می‌کند تا بهترین دانه‌ها،
            بدون واسطه و بدون مصالحه روی کیفیت، به دست شما برسد. مزارع ما در گیلان، مازندران
            و گلستان قرار دارند — جایی که آب‌وهوای مطبوع و خاک حاصل‌خیز، بهترین برنج جهان را می‌پروراند.
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
              سه نسل، یک مسیر
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
            طعم اصالت را تجربه کنید
          </h2>
          <p className="text-[var(--muted)] text-[15px] leading-loose mb-9 max-w-[480px] mx-auto">
            هر دانه‌ی کیوان، روایتی از خاک و آفتاب و دست‌های کشاورز است. به جمع خانواده‌ی ما بپیوندید.
          </p>
          <Link href="/shop" className="inline-flex items-center gap-2 bg-[var(--ink)] text-[var(--cream)] text-[13px] tracking-[0.1em] px-9 py-4 hover:bg-[var(--deep)] transition-colors">
            مشاهده محصولات
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
