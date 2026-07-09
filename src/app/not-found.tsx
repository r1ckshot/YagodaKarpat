import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import StatusScreen from '@/components/ui/StatusScreen';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: routing.defaultLocale, namespace: 'notFound' });
  return { title: `${t('title')} — Ягода Карпат` };
}

// Single bilingual 404 at the root — it sits outside the [locale] segment, so it
// catches both invalid locales (/de) and unknown paths within a locale (/uk/junk).
// No locale context here, hence explicit locales for both translation calls.
export default async function NotFound() {
  const tUk = await getTranslations({ locale: routing.defaultLocale, namespace: 'notFound' });
  const tEn = await getTranslations({ locale: 'en', namespace: 'notFound' });

  return (
    <StatusScreen
      badge="404"
      title={tUk('title')}
      textEn={tEn('title')}
      action={
        <Link
          href={`/${routing.defaultLocale}`}
          className="inline-flex items-center rounded-full bg-forest px-8 py-3 font-body text-[clamp(1rem,0.95rem_+_0.3vw,1.125rem)] text-cream transition-colors hover:bg-berry"
        >
          {tUk('cta')}
          <span aria-hidden="true" className="mx-3 inline-block w-px self-stretch bg-cream/45" />
          <span lang="en">{tEn('cta')}</span>
        </Link>
      }
    />
  );
}
