import dynamic from 'next/dynamic';
import { Splash } from '@/components/landing/Splash';
import { Hero } from '@/components/landing/Hero';

// Below-fold sections — code-split to reduce initial bundle
const Manifesto = dynamic(() => import('@/components/landing/Manifesto').then((m) => ({ default: m.Manifesto })));
const ThreeActStory = dynamic(() => import('@/components/landing/ThreeActStory').then((m) => ({ default: m.ThreeActStory })));
const HarvestStory = dynamic(() => import('@/components/landing/HarvestStory').then((m) => ({ default: m.HarvestStory })));
const EditorialQuote = dynamic(() => import('@/components/landing/EditorialQuote').then((m) => ({ default: m.EditorialQuote })));
const GrainShowcase = dynamic(() => import('@/components/landing/GrainShowcase').then((m) => ({ default: m.GrainShowcase })));
const FeaturedProducts = dynamic(() => import('@/components/landing/FeaturedProducts').then((m) => ({ default: m.FeaturedProducts })));
const ChefSection = dynamic(() => import('@/components/landing/ChefSection').then((m) => ({ default: m.ChefSection })));
const MarqueeWall = dynamic(() => import('@/components/landing/MarqueeWall').then((m) => ({ default: m.MarqueeWall })));
const CTAEnter = dynamic(() => import('@/components/landing/CTAEnter').then((m) => ({ default: m.CTAEnter })));
const MiniFooter = dynamic(() => import('@/components/landing/MiniFooter').then((m) => ({ default: m.MiniFooter })));
const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor').then((m) => ({ default: m.CustomCursor })), { ssr: false });

export default function LandingPage() {
  return (
    <main className="landing-cursor-host bg-ink">
      <CustomCursor />
      <Splash />
      <Hero />
      <Manifesto />
      <ThreeActStory />
      <HarvestStory />
      <EditorialQuote />
      <GrainShowcase />
      <FeaturedProducts />
      <ChefSection />
      <MarqueeWall />
      <CTAEnter />
      <MiniFooter />
    </main>
  );
}
