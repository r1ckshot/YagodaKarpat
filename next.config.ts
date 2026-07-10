import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    // AVIF first (20-30% smaller), WebP fallback for browsers without AVIF support
    formats: ['image/avif', 'image/webp'],
  },
  // Baseline security headers — Vercel doesn't set these by default.
  // No CSP on purpose: inline scripts (anti-flicker, JSON-LD) + Vercel Analytics
  // would need a nonce setup that's disproportionate for a static showcase site.
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
