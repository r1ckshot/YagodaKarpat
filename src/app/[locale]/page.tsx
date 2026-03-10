import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function HomePage() {
  const t = useTranslations('hero');

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold text-dark">
          Ягода Карпат
        </h1>
        <p className="mt-4 font-body text-lg text-berry">{t('tagline')}</p>
      </div>
    </main>
  );
}

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomePage />;
}
