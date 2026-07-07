// Persists "splash already shown" in sessionStorage so locale switches
// (which trigger a full page reload) don't replay the 5-second splash.
// sessionStorage clears when the tab is closed, so the splash still plays
// on the first visit in every new tab.

const SPLASH_KEY = 'yk_splash_shown';

const hasWindow = typeof window !== 'undefined';

function splashAlreadyShown(): boolean {
  if (!hasWindow) return false;
  return sessionStorage.getItem(SPLASH_KEY) === '1';
}

/** True only on the very first load of this browser tab. */
export const isSplashPending = () => !splashAlreadyShown();

/** Called by IntroSplash when it starts — marks splash as shown for this tab session. */
export const consumeSplash = () => {
  if (hasWindow) sessionStorage.setItem(SPLASH_KEY, '1');
};

// ── Splash timeline — single source of truth ──────────────────────────────
// "Blueberry" text (the last element) finishes rising at 3.55 + 0.6 = 4.15s;
// +0.15s breathing room before the exit fade begins.
export const SPLASH_DURATION_MS = 4300;

/** Opacity fade-out duration (seconds) when the splash exits. */
export const SPLASH_EXIT_DURATION = 0.5;

/** Total delay (seconds) for Hero/Navbar animations to wait on first page load —
 *  derived from splash duration + exit fade + a small breathing buffer. */
export const SPLASH_DURATION_OFFSET = SPLASH_DURATION_MS / 1000 + SPLASH_EXIT_DURATION + 0.2;
