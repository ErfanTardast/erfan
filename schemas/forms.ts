import { z } from 'zod';

const optionalEmail = z.union([z.literal(''), z.string().trim().email('ایمیل معتبر وارد کنید')]);
const iranMobile = /^09\d{9}$/;
const optionalPostal = z.union([z.literal(''), z.string().trim().regex(/^\d{10}$/, 'کد پستی باید ۱۰ رقم باشد')]);

export const checkoutFormSchema = z.object({
  name: z.string().trim().min(2, 'نام و نام خانوادگی را وارد کنید'),
  phone: z.string().trim().regex(iranMobile, 'شماره موبایل معتبر وارد کنید'),
  email: optionalEmail,
  province: z.string().trim().min(2, 'استان را وارد کنید'),
  city: z.string().trim().min(2, 'شهر را وارد کنید'),
  address: z.string().trim().min(10, 'آدرس کامل را وارد کنید').max(280),
  postal: optionalPostal,
  payMethod: z.enum(['card', 'cod', 'transfer']),
});

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'نام را وارد کنید'),
  email: z.string().trim().email('ایمیل معتبر وارد کنید'),
  subject: z.string().trim().min(2),
  message: z.string().trim().min(10, 'پیام باید حداقل ۱۰ کاراکتر باشد').max(2000),
});

export const wholesaleFormSchema = z.object({
  businessName: z.string().trim().min(2),
  contactName: z.string().trim().min(2),
  phone: z.string().trim().regex(iranMobile),
  email: optionalEmail,
  monthlyVolumeKg: z.coerce.number().int().positive(),
  message: z.string().trim().max(2000).optional(),
});

export const newsletterFormSchema = z.object({
  email: z.string().trim().email('ایمیل معتبر وارد کنید'),
});

export type CheckoutFormInput = z.infer<typeof checkoutFormSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type WholesaleFormInput = z.infer<typeof wholesaleFormSchema>;
export type NewsletterFormInput = z.infer<typeof newsletterFormSchema>;
