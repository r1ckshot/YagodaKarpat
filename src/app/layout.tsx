import type { Metadata } from 'next';
import { Playfair_Display, Nunito } from 'next/font/google';
import './globals.css';

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
  title: {
    default: 'Ягода Карпат — лохина з Прикарпаття',
    template: '%s | Ягода Карпат',
  },
  description:
    "Понад Лохинове господарство в серці Прикарпаття. Три сорти — Дюк, Чандлер, Еліот. Липень, серпень, вересень.",
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
    title: 'Ягода Карпат',
    description: 'Лохина з Прикарпаття — три сорти, три місяці сезону',
    siteName: 'Ягода Карпат',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
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
      <body>{children}</body>
    </html>
  );
}
