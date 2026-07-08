export const SEASON_CONFIG = {
  openMonth:  7,                      // July — season start
  closeMonth: 9,                      // September — season end
  forceOpen:  null as boolean | null, // null = auto by month, true/false = manual override
} as const;

export function isSeasonOpen(): boolean {
  if (SEASON_CONFIG.forceOpen !== null) return SEASON_CONFIG.forceOpen;
  // UTC, not local time — the server (UTC) and the viewer's browser (any timezone)
  // must compute the same month, or SSR/CSR would disagree near a month boundary
  // and React would flag a hydration mismatch.
  const month = new Date().getUTCMonth() + 1; // 1–12
  return month >= SEASON_CONFIG.openMonth && month <= SEASON_CONFIG.closeMonth;
}
