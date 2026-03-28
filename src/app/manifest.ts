import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ягода Карпат',
    short_name: 'Ягода Карпат',
    description: 'Лохинове господарство в серці Прикарпаття',
    start_url: '/',
    display: 'standalone',
    background_color: '#F8F5F0',
    theme_color: '#008549',
    icons: [
      {
        src: '/images/logo/blueberry.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
