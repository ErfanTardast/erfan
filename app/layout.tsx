import type { Metadata, Viewport } from 'next';
import { Vazirmatn, Fraunces } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import { organizationJsonLd } from '@/lib/catalog/structured-data';

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://keyvanrice.ir'),
  title: {
    default: 'Keyvan Rice — برنج‌های ممتاز ایرانی',
    template: '%s | Keyvan Rice',
  },
  description:
    'از مزارع سبز شمال ایران تا سفره شما — تجربه‌ای از طبیعت اصیل ایران در هر دانه برنج.',
  keywords: ['برنج', 'طارم هاشمی', 'برنج ایرانی', 'کیوان', 'persian rice'],
  openGraph: {
    title: 'Keyvan Rice',
    description: 'برنج‌های اصیل ایرانی، از مزارع شمال تا سفره شما',
    locale: 'fa_IR',
    type: 'website',
    images: [
      {
        url: '/images/keyvan/hero-keyvan.webp',
        width: 1200,
        height: 630,
        alt: 'برنج ایرانی کیوان',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Keyvan Rice',
    description: 'برنج‌های اصیل ایرانی، از مزارع شمال تا سفره شما',
    images: ['/images/keyvan/hero-keyvan.webp'],
  },
};

export const viewport: Viewport = {
  themeColor: '#1d251d',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organization = organizationJsonLd();

  return (
    <html lang="fa" dir="rtl" className={`${vazir.variable} ${fraunces.variable}`}>
      <body className="overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, '\\u003c') }}
        />
        {children}
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          toastOptions={{ duration: 3200 }}
        />
      </body>
    </html>
  );
}
