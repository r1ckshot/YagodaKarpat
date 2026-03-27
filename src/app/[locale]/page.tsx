import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import VarietiesSection from '@/components/sections/VarietiesSection';
import ProcessSection from '@/components/sections/ProcessSection';
import GallerySection from '@/components/sections/GallerySection';
import ContactSection from '@/components/sections/ContactSection';

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
      <main>
        <HeroSection />
        <AboutSection />
        <VarietiesSection />
        <ProcessSection />
        <GallerySection />
        <ContactSection />
      </main>
    </>
  );
}
