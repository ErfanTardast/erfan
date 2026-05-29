import { LandingHero } from '@/components/home/LandingHero';
import { LandingBrand } from '@/components/home/LandingBrand';

export default function HomePage() {
  return (
    <main>
      <LandingHero />
      <LandingBrand />
      <footer className="bg-[var(--ink)] text-[var(--cream)]/40 py-4 text-center text-[10px] tracking-[0.2em]">
        © ۱۴۰۳ دریا رایس
      </footer>
    </main>
  );
}
