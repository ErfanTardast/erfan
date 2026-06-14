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
  title: 'Keyvan Rice — برنج‌های ممتاز ایرانی',
  description:
    'از مزارع سبز شمال ایران تا سفره شما — تجربه‌ای از طبیعت اصیل ایران در هر دانه برنج.',
  keywords: ['برنج', 'طارم هاشمی', 'برنج ایرانی', 'کیوان', 'persian rice'],
  openGraph: {
    title: 'Keyvan Rice',
    description: 'برنج‌های اصیل ایرانی، از مزارع شمال تا سفره شما',
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
