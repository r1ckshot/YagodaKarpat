'use client';

import { useEffect } from 'react';

// The root layout sits above the [locale] segment (deliberately — splash and
// curtain transition must survive locale changes), so it can't know the locale
// without opting the whole tree into dynamic rendering. It renders the default
// locale statically; this syncs the real one after hydration and on locale switch.
export default function HtmlLang({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
