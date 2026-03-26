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

/** Total delay (seconds) for Hero/Navbar animations to wait on first page load. */
export const SPLASH_DURATION_OFFSET = 5.0;
