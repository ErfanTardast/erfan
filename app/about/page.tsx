import { Header } from '@/components/shop/Header';
import Link from 'next/link';

export const metadata = { title: 'داستان ما — Darya Rice' };

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-[var(--cream)] min-h-screen">
        <div className="max-w-[800px] mx-auto px-6 md:px-12 py-20 md:py-28">
          <p className="text-[var(--olive)] text-[10px] tracking-[0.24em] mb-6">— داستان ما —</p>
          <h1 className="text-[var(--ink)] font-light mb-8" style={{ fontSize: 'clamp(32px,5vw,56px)' }}>
            از خاک شمال ایران
          </h1>
          <div className="space-y-5 text-[var(--muted)] text-[15px] leading-loose max-w-[620px]">
            <p>از ۱۳۸۷ با کشاورزان نسل‌های شمال ایران کار می‌کنیم تا بهترین دانه‌ها، بدون واسطه، به دست شما برسد.</p>
            <p>مزارع ما در گیلان، مازندران و گلستان قرار دارند — جایی که آب و هوای مطبوع و خاک حاصل‌خیز شمال، بهترین شرایط را برای رشد برنج فراهم می‌کنند.</p>
            <p>هر دانه با دقت برداشت، پاک‌سازی و بسته‌بندی می‌شود. تضمین می‌کنیم که هیچ افزودنی یا مواد مصنوعی در محصولات ما وجود ندارد.</p>
          </div>
          <div className="mt-12">
            <Link href="/shop" className="inline-flex items-center gap-2 bg-[var(--ink)] text-[var(--cream)] text-[12px] tracking-[0.1em] px-7 py-3.5 hover:bg-[var(--deep)] transition-colors">
              مشاهده محصولات
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
