import type { Metadata, Viewport } from 'next';
import { Vazirmatn, Fraunces } from 'next/font/google';
import './globals.css';
import { LenisProvider } from '@/components/ui/LenisProvider';

const vazir = Vazirmatn({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-vazir',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-fraunces',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'فروشگاه اینترنتی تسمه سقا — خرید تسمه صنعتی و ابزار اندازه‌گیری',
  description:
    'خرید آنلاین انواع تسمه تایم، تسمه دینام، تسمه صنعتی و ابزار اندازه‌گیری از برندهای معتبر Optibelt، SKF، Fluke، Testo. ضمانت اصالت، ارسال سریع.',
  keywords: ['تسمه تایم', 'تسمه صنعتی', 'ابزار اندازه‌گیری', 'تسمه سقا', 'Optibelt', 'SKF'],
  openGraph: {
    title: 'فروشگاه اینترنتی تسمه سقا',
    description: 'خرید تسمه صنعتی و ابزار اندازه‌گیری با ضمانت اصالت کالا',
    locale: 'fa_IR',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#1d251d',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={`${vazir.variable} ${fraunces.variable}`}>
      <body className="overflow-x-hidden">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
