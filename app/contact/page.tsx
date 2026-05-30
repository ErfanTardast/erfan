'use client';
import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Instagram, Send, Check } from 'lucide-react';
import { Header } from '@/components/shop/Header';
import { Footer } from '@/components/shop/Footer';

const INFO = [
  { icon: Mail, label: 'ایمیل', value: 'info@daryarice.ir', href: 'mailto:info@daryarice.ir' },
  { icon: Phone, label: 'تلفن', value: '۰۲۱-۱۲۳۴-۵۶۷۸', href: 'tel:+982112345678' },
  { icon: MapPin, label: 'آدرس', value: 'تهران، خیابان ولیعصر، پلاک ۱۲۳' },
  { icon: Clock, label: 'ساعات پاسخگویی', value: 'شنبه تا پنج‌شنبه، ۹ تا ۱۸' },
];

const SUBJECTS = ['سوال درباره محصول', 'پیگیری سفارش', 'همکاری و عمده‌فروشی', 'سایر موارد'];

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `نام: ${name}%0Dایمیل: ${email}%0D%0D${message}`;
    window.location.href = `mailto:info@daryarice.ir?subject=${encodeURIComponent(subject)}&body=${body}`;
    setSent(true);
  };

  const cls = 'w-full border border-[var(--line)] bg-transparent px-4 py-3.5 text-[13px] outline-none focus:border-[var(--ink)] transition-colors placeholder-[var(--muted)]/50';

  return (
    <>
      <Header />
      <main className="bg-[var(--cream)] min-h-screen">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-[var(--olive)] text-[10px] tracking-[0.24em] mb-5 text-center">— تماس با ما —</p>
          <h1 className="text-[var(--ink)] font-light text-center mb-4" style={{ fontSize: 'clamp(32px,5vw,56px)' }}>
            در تماس باشید
          </h1>
          <p className="text-[var(--muted)] text-[14px] text-center max-w-[460px] mx-auto mb-16 leading-loose">
            سوال، پیشنهاد یا درخواست همکاری دارید؟ خوشحال می‌شویم از شما بشنویم.
          </p>

          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20">
            {/* Info */}
            <div>
              <div className="space-y-7">
                {INFO.map((it) => (
                  <div key={it.label} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--olive)]/12 flex items-center justify-center shrink-0">
                      <it.icon className="w-4 h-4 text-[var(--olive)]" />
                    </div>
                    <div>
                      <p className="text-[var(--muted)] text-[11px] tracking-[0.12em] mb-1">{it.label}</p>
                      {it.href ? (
                        <a href={it.href} className="text-[var(--ink)] text-[14px] hover:text-[var(--olive)] transition-colors">{it.value}</a>
                      ) : (
                        <p className="text-[var(--ink)] text-[14px]">{it.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-[var(--line)]">
                <p className="text-[var(--muted)] text-[11px] tracking-[0.12em] mb-4">ما را دنبال کنید</p>
                <div className="flex gap-3">
                  <a href="https://instagram.com/daryarice" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-[var(--line)] flex items-center justify-center hover:border-[var(--ink)] hover:text-[var(--olive)] transition-colors" aria-label="اینستاگرام">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="https://t.me/daryarice" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-[var(--line)] flex items-center justify-center hover:border-[var(--ink)] hover:text-[var(--olive)] transition-colors text-[11px]" aria-label="تلگرام">
                    تلگ
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-[var(--paper)] border border-[var(--line)] p-7 md:p-9">
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 rounded-full bg-[var(--olive)]/15 flex items-center justify-center mx-auto mb-5">
                    <Check className="w-6 h-6 text-[var(--olive)]" />
                  </div>
                  <h2 className="text-[var(--ink)] text-[20px] font-medium mb-3">برنامه ایمیل شما باز شد</h2>
                  <p className="text-[var(--muted)] text-[13px] leading-loose max-w-[320px] mx-auto">
                    پیام شما آماده‌ی ارسال است. اگر باز نشد، می‌توانید مستقیماً به
                    <span dir="ltr" className="mx-1">info@daryarice.ir</span>
                    ایمیل بزنید.
                  </p>
                  <button onClick={() => setSent(false)} className="mt-6 text-[12px] text-[var(--olive)] hover:text-[var(--ink)] transition-colors">
                    ارسال پیام دیگر
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] tracking-[0.18em] text-[var(--muted)] mb-2">نام شما</label>
                      <input className={cls} value={name} onChange={(e) => setName(e.target.value)} required placeholder="نام و نام خانوادگی" />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.18em] text-[var(--muted)] mb-2">ایمیل</label>
                      <input type="email" className={cls} value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.18em] text-[var(--muted)] mb-2">موضوع</label>
                    <select className={cls} value={subject} onChange={(e) => setSubject(e.target.value)}>
                      {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.18em] text-[var(--muted)] mb-2">پیام</label>
                    <textarea className={`${cls} resize-none`} rows={5} value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="پیام خود را بنویسید…" />
                  </div>
                  <button type="submit" className="w-full bg-[var(--ink)] text-[var(--cream)] py-4 text-[13px] tracking-[0.1em] hover:bg-[var(--deep)] transition-colors flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    ارسال پیام
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
