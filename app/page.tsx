import { Splash } from '@/components/landing/Splash';
import { Hero } from '@/components/landing/Hero';
import { Manifesto } from '@/components/landing/Manifesto';
import { ThreeActStory } from '@/components/landing/ThreeActStory';
import { GrainShowcase } from '@/components/landing/GrainShowcase';
import { MarqueeWall } from '@/components/landing/MarqueeWall';
import { CTAEnter } from '@/components/landing/CTAEnter';
import { MiniFooter } from '@/components/landing/MiniFooter';
import { CustomCursor } from '@/components/ui/CustomCursor';

export default function LandingPage() {
  return (
    <main className="landing-cursor-host bg-ink">
      <CustomCursor />
      <Splash />
      <Hero />
      <Manifesto />
      <ThreeActStory />
      <GrainShowcase />
      <MarqueeWall />
      <CTAEnter />
      <MiniFooter />
    </main>
  );
}
