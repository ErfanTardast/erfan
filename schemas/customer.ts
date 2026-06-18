import { z } from 'zod';

const iranMobile = /^09\d{9}$/;
const postalCode = /^\d{10}$/;

export const customerSchema = z.object({
  name: z.string().trim().min(2, 'نام را کامل وارد کنید'),
  email: z.string().trim().email('ایمیل معتبر وارد کنید'),
  phone: z.string().trim().regex(iranMobile, 'شماره موبایل معتبر وارد کنید'),
});

export const addressSchema = z.object({
  title: z.string().trim().min(1, 'عنوان آدرس را وارد کنید'),
  recipient: z.string().trim().min(2, 'نام گیرنده را وارد کنید'),
  phone: z.string().trim().regex(iranMobile, 'شماره موبایل معتبر وارد کنید'),
  province: z.string().trim().min(2, 'استان را وارد کنید'),
  city: z.string().trim().min(2, 'شهر را وارد کنید'),
  line: z.string().trim().min(10, 'آدرس کامل را وارد کنید').max(280),
  postal: z.union([z.literal(''), z.string().trim().regex(postalCode, 'کد پستی باید ۱۰ رقم باشد')]),
});

export type CustomerInput = z.infer<typeof customerSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
