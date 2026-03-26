import type { MetadataRoute } from 'next';

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
