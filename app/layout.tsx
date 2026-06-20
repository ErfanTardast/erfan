import type { Metadata, Viewport } from 'next';
import { Vazirmatn, Fraunces } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import { organizationJsonLd } from '@/lib/catalog/structured-data';
import { absoluteAssetUrl } from '@/lib/asset-path';

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
    default: 'کیوان | برنج منتخب آمل با منشأ مشخص',
    template: '%s | Keyvan Rice',
  },
  description:
    'فروش برنج ایرانی منتخب آمل با اطلاعات روشن رقم، سال برداشت، نتیجه پخت و قیمت کامل هر بسته.',
  keywords: ['برنج آمل', 'برنج مازندران', 'طارم هاشمی', 'برنج ایرانی', 'کیوان', 'persian rice'],
  openGraph: {
    title: 'کیوان | برنج منتخب آمل',
    description: 'برنج ایرانی با منشأ مشخص، نتیجه پخت روشن و قیمت کامل هر بسته.',
    locale: 'fa_IR',
    type: 'website',
    images: [
      {
        url: absoluteAssetUrl('/images/keyvan/hero-amol-v2.webp'),
        width: 1200,
        height: 630,
        alt: 'برنج ایرانی منتخب کیوان از آمل',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'کیوان | برنج منتخب آمل',
    description: 'برنج ایرانی با منشأ مشخص، نتیجه پخت روشن و قیمت کامل هر بسته.',
    images: [absoluteAssetUrl('/images/keyvan/hero-amol-v2.webp')],
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
