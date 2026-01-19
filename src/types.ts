export type Mode = "column" | "row" | "name";

export interface Point {
  x: number;
  y: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
}

// OPTIMIZED: No 'cells' array, no 'id' string. Just raw data.
export interface NameInstance {
  text: string;
  r: number; // Start Row
  c: number; // Start Col
  isRow: boolean; // true = Horizontal, false = Vertical
  len: number; // Cached length
}

export interface GameState {
  grid: string[][];
  boldMask: boolean[][];
  intersections: boolean[][];
  detectedNames: NameInstance[];
  particles: Particle[];
  mode: Mode;
  cursor: Point;
  score: number;
  crankAccumulator: number;
  freezeTimer: number;
  freezeThreshold: number;
  gameOver: boolean;
  gridDirty: boolean;
}
