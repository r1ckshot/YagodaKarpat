// Module-level flag: true on fresh page load, false after splash ran once this JS session.
// Since JS modules are cached across client-side navigations (locale changes),
// this correctly prevents the splash from re-showing on soft navigation.
let _splashPending = typeof window !== 'undefined';

/** True only on fresh page load — false on locale change or after splash ran. */
export const isSplashPending = () => _splashPending;

/** Called by IntroSplash when it starts — prevents re-runs on locale changes. */
export const consumeSplash = () => { _splashPending = false; };

/** Total delay (seconds) for Hero/Navbar animations to wait on first page load. */
export const SPLASH_DURATION_OFFSET = 5.0;
