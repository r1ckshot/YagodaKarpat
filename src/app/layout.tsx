import type { Metadata } from 'next';
import { Playfair_Display, Nunito } from 'next/font/google';
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
  icons: {
    icon: '/images/logo/blueberry.png',
    apple: '/images/logo/blueberry.png',
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
      <body>
        {/* Both live in root layout — never remount on locale change */}
        <IntroSplash />
        <PageTransition />
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
