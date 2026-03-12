// Shared animation constants — timings and easings per CLAUDE.md

export const DURATION = {
  hover:       0.2,
  fadeIn:      0.5,
  crossfade:   0.2,
  counter:     1.5,
  svgDraw:     0.8,
  navbar:      0.2,
  scrollToTop: 0.3,
  splashTotal: 2.5,
} as const;

export const EASING: Record<string, [number, number, number, number]> = {
  standard: [0.4,  0,    0.2,  1],
  enter:    [0,    0,    0.2,  1],
  exit:     [0.4,  0,    1,    1],
  bounce:   [0.34, 1.56, 0.64, 1],
  smooth:   [0.25, 0.1,  0.25, 1],  // soft ease — for blur/wave reveals
};

export const STAGGER = {
  children: 0.15,
} as const;

export const THRESHOLD = 0.15;
