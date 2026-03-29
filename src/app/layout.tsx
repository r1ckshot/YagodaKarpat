import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Nunito } from 'next/font/google';
import { LazyMotion, domAnimation } from 'framer-motion';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import PageTransition from '@/components/ui/PageTransition';
import IntroSplash from '@/components/sections/IntroSplash';
import ScrollToTop from '@/components/ui/ScrollToTop';

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-heading',
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-body',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://ягодакарпат.укр'),
  title: {
    default: 'Ягода Карпат',
    template: '%s | Ягода Карпат',
  },
  description: 'Лохинове господарство в серці Прикарпаття.',
  keywords: [
    'лохина',
    'ягода карпат',
    'лохина прикарпаття',
    'купити лохину',
    'blueberry ukraine',
    'ягодакарпат',
  ],
  authors: [{ name: 'Ягода Карпат' }],
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    alternateLocale: 'en_US',
    title: 'Файна Лохина з Прикарпаття',
    description: 'Лохина з Прикарпаття — три сорти, три місяці сезону',
    siteName: 'Ягода Карпат',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1424,
        height: 752,
        alt: 'Ягода Карпат — лохинове господарство',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" className={`${playfair.variable} ${nunito.variable}`}>
      <head>
        {/* Preload logo layers used in IntroSplash — visible before React hydrates */}
        <link rel="preload" as="image" href="/images/logo/mountains.png" fetchPriority="high" />
        <link rel="preload" as="image" href="/images/logo/blueberry.png" />
        <link rel="preload" as="image" href="/images/logo/title.png" />
        <link rel="preload" as="image" href="/images/logo/bottom-wave.png" />
        <link rel="preload" as="image" href="/images/logo/bottom-title.png" />
        {/* Preload hero poster matching device orientation */}
        <link rel="preload" as="image" href="/images/hero-poster-portrait.jpg" media="(orientation: portrait)" fetchPriority="high" />
        <link rel="preload" as="image" href="/images/hero-poster-landscape.jpg" media="(orientation: landscape)" fetchPriority="high" />
      </head>
      <body>
        <LazyMotion features={domAnimation}>
          {/* Both live in root layout — never remount on locale change */}
          <IntroSplash />
          <PageTransition />
          <ScrollToTop />
          {children}
        </LazyMotion>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
