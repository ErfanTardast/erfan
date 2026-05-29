import { Header } from '@/components/shop/Header';

export const metadata = { title: 'تماس با ما — Darya Rice' };

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="bg-[var(--cream)] min-h-screen">
        <div className="max-w-[700px] mx-auto px-6 md:px-12 py-20 md:py-28">
          <p className="text-[var(--olive)] text-[10px] tracking-[0.24em] mb-6">— تماس با ما —</p>
          <h1 className="text-[var(--ink)] font-light mb-8" style={{ fontSize: 'clamp(32px,5vw,56px)' }}>
            در تماس باشید
          </h1>
          <div className="space-y-6 text-[15px]">
            {[
              { label: 'ایمیل', value: 'info@daryarice.ir' },
              { label: 'تلفن', value: '۰۲۱-۱۲۳۴-۵۶۷۸' },
              { label: 'آدرس', value: 'تهران، ایران' },
              { label: 'ساعات پاسخگویی', value: 'شنبه تا پنج‌شنبه، ۹ تا ۱۸' },
            ].map((item) => (
              <div key={item.label} className="flex gap-6 border-b border-[var(--line)] pb-5">
                <span className="text-[var(--muted)] text-[11px] tracking-[0.14em] w-32 shrink-0 pt-0.5">{item.label}</span>
                <span className="text-[var(--ink)]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
