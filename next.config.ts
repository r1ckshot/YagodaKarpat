import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    // AVIF first (20-30% smaller), WebP fallback for browsers without AVIF support
    formats: ['image/avif', 'image/webp'],
  },
};

export default withNextIntl(nextConfig);
