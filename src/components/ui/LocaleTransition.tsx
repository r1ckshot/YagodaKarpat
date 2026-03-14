'use client';

// Page transitions are now handled by PageTransition (curtain sweep).
// This wrapper is kept for potential future use but passes children through.
export default function LocaleTransition({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
