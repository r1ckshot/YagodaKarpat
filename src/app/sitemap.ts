import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export const dynamic = 'force-static';

const BASE_URL = 'https://ягодакарпат.укр';

// List the final canonical locale URLs, not the bare root (it only 307-redirects
// to /uk). x-default points at the default locale directly, not at the redirect.
const LANGUAGES = {
  uk: `${BASE_URL}/uk`,
  en: `${BASE_URL}/en`,
  'x-default': `${BASE_URL}/${routing.defaultLocale}`,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: new Date(),
    alternates: {
      languages: LANGUAGES,
    },
  }));
}
