// Shared animation constants — easings used across sections

export const EASING: Record<string, [number, number, number, number]> = {
  standard: [0.4,  0,    0.2,  1],
  enter:    [0,    0,    0.2,  1],
  exit:     [0.4,  0,    1,    1],
  bounce:   [0.34, 1.56, 0.64, 1],
  smooth:   [0.25, 0.1,  0.25, 1],  // soft ease — for blur/wave reveals
};

export const THRESHOLD = 0.2;
