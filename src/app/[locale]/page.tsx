import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import IntroSplash from '@/components/sections/IntroSplash';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import VarietiesSection from '@/components/sections/VarietiesSection';
import ProcessSection from '@/components/sections/ProcessSection';
import SeasonSection from '@/components/sections/SeasonSection';
import GallerySection from '@/components/sections/GallerySection';
import ContactSection from '@/components/sections/ContactSection';
import ScrollToTop from '@/components/ui/ScrollToTop';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <IntroSplash />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <VarietiesSection />
        <ProcessSection />
        <SeasonSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
