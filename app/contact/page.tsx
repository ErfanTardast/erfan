'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Mail, PackageCheck, MapPin, Clock, Instagram, Send, Check } from 'lucide-react';
import { Header } from '@/components/shop/Header';
import { Footer } from '@/components/shop/Footer';
import { contactFormSchema, type ContactFormInput } from '@/schemas/forms';

const INFO = [
  { icon: Mail, label: 'ایمیل', value: 'info@keyvanrice.ir', href: 'mailto:info@keyvanrice.ir' },
  { icon: PackageCheck, label: 'پیگیری سفارش', value: 'از طریق حساب کاربری و ایمیل سفارش' },
  { icon: MapPin, label: 'محدوده ارسال', value: 'ارسال قابل پیگیری به سراسر ایران' },
  { icon: Clock, label: 'ساعات پاسخگویی', value: 'شنبه تا پنج‌شنبه، ۹ تا ۱۸' },
];

const SUBJECTS = ['سوال درباره محصول', 'پیگیری سفارش', 'همکاری و عمده‌فروشی', 'سایر موارد'];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', email: '', subject: SUBJECTS[0], message: '' },
  });

  const submit = (values: ContactFormInput) => {
    const body = encodeURIComponent(`نام: ${values.name}\nایمیل: ${values.email}\n\n${values.message}`);
    window.location.href = `mailto:info@keyvanrice.ir?subject=${encodeURIComponent(values.subject)}&body=${body}`;
    setSent(true);
    toast.success('پیام آماده ارسال است');
  };

  const cls = 'w-full border border-[var(--line)] bg-transparent px-4 py-3.5 text-[13px] outline-none focus:border-[var(--ink)] transition-colors placeholder-[var(--muted)]/50';

  return (
    <>
      <Header />
      <main className="bg-[var(--cream)] min-h-screen">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-[var(--olive)] text-[10px] tracking-[0.24em] mb-5 text-center">— تماس با ما —</p>
          <h1 className="text-[var(--ink)] font-light text-center mb-4" style={{ fontSize: 'clamp(32px,5vw,56px)' }}>
            برای انتخاب و پیگیری، با کیوان در تماس باشید
          </h1>
          <p className="text-[var(--muted)] text-[14px] text-center max-w-[460px] mx-auto mb-16 leading-loose">
            درباره انتخاب برنج، شیوه پخت، وضعیت سفارش یا خرید عمده پرسشی دارید؟ پیام شما مستقیم به تیم کیوان می‌رسد.
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
                  <a href="https://instagram.com/keyvanrice" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-[var(--line)] flex items-center justify-center hover:border-[var(--ink)] hover:text-[var(--olive)] transition-colors" aria-label="اینستاگرام">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="https://t.me/keyvanrice" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-[var(--line)] flex items-center justify-center hover:border-[var(--ink)] hover:text-[var(--olive)] transition-colors text-[11px]" aria-label="تلگرام">
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
                    <span dir="ltr" className="mx-1">info@keyvanrice.ir</span>
                    ایمیل بزنید.
                  </p>
                  <button onClick={() => { setSent(false); reset(); }} className="mt-6 text-[12px] text-[var(--olive)] hover:text-[var(--ink)] transition-colors">
                    ارسال پیام دیگر
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(submit)} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] tracking-[0.18em] text-[var(--muted)] mb-2">نام شما</label>
                      <input className={cls} {...register('name')} placeholder="نام و نام خانوادگی" />
                      {errors.name && <p className="mt-1.5 text-[11px] text-[var(--terra)]">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.18em] text-[var(--muted)] mb-2">ایمیل</label>
                      <input type="email" className={cls} {...register('email')} placeholder="you@example.com" />
                      {errors.email && <p className="mt-1.5 text-[11px] text-[var(--terra)]">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.18em] text-[var(--muted)] mb-2">موضوع</label>
                    <select className={cls} {...register('subject')}>
                      {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.18em] text-[var(--muted)] mb-2">پیام</label>
                    <textarea className={`${cls} resize-none`} rows={5} {...register('message')} placeholder="پیام خود را بنویسید…" />
                    {errors.message && <p className="mt-1.5 text-[11px] text-[var(--terra)]">{errors.message.message}</p>}
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
