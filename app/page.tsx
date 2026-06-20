import { HomeFooter } from '@/components/home/HomeFooter';
import { HomeHeader } from '@/components/home/HomeHeader';
import { LandingHero } from '@/components/home/LandingHero';

export default function HomePage() {
  return (
    <>
      <HomeHeader />
      <main>
        <LandingHero />
      </main>
      <HomeFooter />
    </>
  );
}
