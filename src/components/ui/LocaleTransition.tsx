'use client';

import { useEffect } from 'react';
import { revealScreen } from '@/lib/transitionBus';

// Triggers curtain reveal after new locale content has mounted.
// revealScreen() is a no-op if no cover happened (guard in transitionBus).
export default function LocaleTransition({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    revealScreen();
  }, []);

  return <>{children}</>;
}
