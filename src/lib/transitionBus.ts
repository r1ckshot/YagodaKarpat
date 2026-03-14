// Pub/sub for the two-phase page-transition curtain.
// Phase 1 (cover):  curtain sweeps IN  — awaited before router.replace
// Phase 2 (reveal): curtain sweeps OUT — called after router.replace (fire-and-forget)
// This ensures locale content mounts while the curtain covers the screen.

type CoverHandler  = () => Promise<void>;
type RevealHandler = () => void;

let _cover:  CoverHandler  | null = null;
let _reveal: RevealHandler | null = null;

export const registerCoverHandler  = (fn: CoverHandler)  => { _cover  = fn; };
export const registerRevealHandler = (fn: RevealHandler) => { _reveal = fn; };

export const coverScreen  = (): Promise<void> => _cover?.()  ?? Promise.resolve();
export const revealScreen = (): void          => { _reveal?.(); };
