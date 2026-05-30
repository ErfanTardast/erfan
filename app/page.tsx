'use client';
import dynamic from 'next/dynamic';
import { LandingHero } from '@/components/home/LandingHero';
import { FeaturedProducts } from '@/components/landing/FeaturedProducts';
import { CollectionsStrip } from '@/components/home/CollectionsStrip';
import { TrustBar } from '@/components/shop/TrustBar';
import { Footer } from '@/components/shop/Footer';

const CartDrawer = dynamic(() => import('@/components/shop/CartDrawer').then(m => ({ default: m.CartDrawer })), { ssr: false });
const QuickViewModal = dynamic(() => import('@/components/shop/QuickViewModal').then(m => ({ default: m.QuickViewModal })), { ssr: false });
const Toast = dynamic(() => import('@/components/shop/Toast').then(m => ({ default: m.Toast })), { ssr: false });

export default function HomePage() {
  return (
    <>
      <main>
        <LandingHero />
        <FeaturedProducts />
        <CollectionsStrip />
        <TrustBar />
      </main>
      <Footer />

      {/* Overlays */}
      <CartDrawer />
      <QuickViewModal />
      <Toast />
    </>
  );
}
