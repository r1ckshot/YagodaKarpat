import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import LocaleTransition from '@/components/ui/LocaleTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const BASE_URL = 'https://ягодакарпат.укр';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  const isUk = locale === 'uk';

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        uk: `${BASE_URL}/uk`,
        en: `${BASE_URL}/en`,
      },
    },
    openGraph: {
      type: 'website',
      locale: isUk ? 'uk_UA' : 'en_US',
      alternateLocale: isUk ? 'en_US' : 'uk_UA',
      title: t('title'),
      description: t('description'),
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
      title: t('title'),
      description: t('description'),
      images: ['/images/og-image.jpg'],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'uk' | 'en')) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar />
      <LocaleTransition>
        {children}
      </LocaleTransition>
      <Footer />
    </NextIntlClientProvider>
  );
}
