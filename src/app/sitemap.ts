import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const BASE_URL = 'https://ягодакарпат.укр';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      alternates: {
        languages: {
          uk: `${BASE_URL}/uk`,
          en: `${BASE_URL}/en`,
        },
      },
    },
  ];
}
