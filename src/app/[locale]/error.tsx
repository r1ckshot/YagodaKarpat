'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import StatusScreen from '@/components/ui/StatusScreen';

// Error boundary for the [locale] segment — Next.js requires this to be a client
// component. Sits inside NextIntlClientProvider, so translations are available.
export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('errorPage');
  const locale = useLocale();

  useEffect(() => {
    console.error(error);
  }, [error]);

  // Fixed overlay above the navbar (z-50): the transparent-at-top navbar is
  // unreadable on cream, and its section anchors point at sections that don't
  // exist on the error screen — so present it standalone, like the 404 page.
  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-cream">
      <StatusScreen
        title={t('title')}
        text={t('text')}
        action={
          <div className="flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={reset}
              className="cursor-pointer rounded-full bg-forest px-8 py-3 font-body text-[clamp(1rem,0.95rem_+_0.3vw,1.125rem)] text-cream transition-colors hover:bg-berry"
            >
              {t('retry')}
            </button>
            <Link
              href={`/${locale}`}
              className="font-body text-[clamp(1rem,0.95rem_+_0.3vw,1.125rem)] text-forest underline underline-offset-4 decoration-forest/40 transition-colors hover:text-berry hover:decoration-berry/40"
            >
              {t('home')}
            </Link>
          </div>
        }
      />
    </div>
  );
}
