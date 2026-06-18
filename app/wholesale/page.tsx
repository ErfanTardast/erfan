'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Building2, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Footer } from '@/components/shop/Footer';
import { Header } from '@/components/shop/Header';
import { wholesaleFormSchema, type WholesaleFormInput } from '@/schemas/forms';

const fieldClass =
  'w-full min-h-11 border border-line bg-rice px-4 py-3 text-[13px] outline-none transition-colors focus:border-ink';

export default function WholesalePage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WholesaleFormInput>({
    resolver: zodResolver(wholesaleFormSchema),
    defaultValues: {
      businessName: '',
      contactName: '',
      phone: '',
      email: '',
      monthlyVolumeKg: 100,
      message: '',
    },
  });

  const submit = (values: WholesaleFormInput) => {
    const subject = encodeURIComponent(`درخواست همکاری عمده - ${values.businessName}`);
    const body = encodeURIComponent(
      [
        `نام مجموعه: ${values.businessName}`,
        `نام تماس: ${values.contactName}`,
        `موبایل: ${values.phone}`,
        `ایمیل: ${values.email || '-'}`,
        `حجم ماهانه: ${values.monthlyVolumeKg} کیلوگرم`,
        `توضیحات: ${values.message || '-'}`,
      ].join('\n')
    );
    window.location.href = `mailto:sales@keyvanrice.ir?subject=${subject}&body=${body}`;
    toast.success('درخواست آماده ارسال شد');
    reset();
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-rice field-pattern">
        <section className="site-shell py-12 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <span className="mb-5 block h-px w-12 bg-[var(--terra)]" />
              <p className="section-eyebrow mb-3 text-cypress">همکاری تجاری</p>
              <h1 className="title-lg text-ink">خرید عمده برنج کیوان</h1>
              <p className="body-copy mt-5 max-w-[480px] leading-[2] text-muted">
                برای رستوران، فروشگاه، سازمان یا سفارش‌های مستمر، مشخصات مجموعه و حجم تقریبی مصرف را ثبت کنید.
              </p>
              <div className="mt-8 flex items-center gap-3 border-t border-line pt-6 text-[13px] text-muted">
                <Building2 className="h-5 w-5 shrink-0 text-cypress" />
                پاسخ‌گویی فروش سازمانی در روزهای کاری
              </div>
            </div>

            <form onSubmit={handleSubmit(submit)} className="harvest-card grid gap-4 bg-paper p-5 md:grid-cols-2 md:p-8" noValidate>
              <Field label="نام مجموعه" error={errors.businessName?.message}>
                <input className={fieldClass} {...register('businessName')} />
              </Field>
              <Field label="نام مسئول تماس" error={errors.contactName?.message}>
                <input className={fieldClass} {...register('contactName')} />
              </Field>
              <Field label="شماره موبایل" error={errors.phone?.message}>
                <input dir="ltr" inputMode="tel" className={fieldClass} placeholder="09123456789" {...register('phone')} />
              </Field>
              <Field label="ایمیل" error={errors.email?.message}>
                <input dir="ltr" type="email" className={fieldClass} {...register('email')} />
              </Field>
              <Field label="مصرف ماهانه تقریبی (کیلوگرم)" error={errors.monthlyVolumeKg?.message}>
                <input type="number" min="1" className={fieldClass} {...register('monthlyVolumeKg')} />
              </Field>
              <div className="md:col-span-2">
                <Field label="توضیحات" error={errors.message?.message}>
                  <textarea rows={5} className={fieldClass} {...register('message')} />
                </Field>
              </div>
              <button type="submit" className="cta-ink inline-flex min-h-11 items-center justify-center gap-2 px-6 text-[13px] md:col-span-2">
                <Send className="h-4 w-4" />
                آماده‌سازی درخواست
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] text-muted">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-[11px] text-[var(--terra)]">{error}</span>}
    </label>
  );
}
