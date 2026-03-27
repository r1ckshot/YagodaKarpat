// Pub/sub for the two-phase page-transition curtain.
// Phase 1 (cover):  curtain sweeps IN  — awaited before router.replace
// Phase 2 (reveal): curtain sweeps OUT — triggered by the NEW page on mount
// This guarantees the curtain hides only after the new content is ready.

type CoverHandler  = () => Promise<void>;
type RevealHandler = () => void;

let _cover:         CoverHandler  | null = null;
let _reveal:        RevealHandler | null = null;
let _pendingReveal: boolean              = false;  // set by cover, consumed by reveal

export const registerCoverHandler  = (fn: CoverHandler)  => { _cover  = fn; };
export const registerRevealHandler = (fn: RevealHandler) => { _reveal = fn; };

export const coverScreen = (): Promise<void> => {
  _pendingReveal = true;
  return _cover?.() ?? Promise.resolve();
};

export const revealScreen = (): void => {
  if (!_pendingReveal) return;   // no cover happened — do nothing
  _pendingReveal = false;
  _reveal?.();
};
