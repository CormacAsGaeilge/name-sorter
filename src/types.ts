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

export interface NameInstance {
  text: string;
  r: number;
  c: number;
  isRow: boolean; // true = Horizontal, false = Vertical
  len: number;
  drawX: number;
  drawY: number;
  drawW: number;
  drawH: number;
  // Logic Cache (Bloom Filter)
  mask: number;
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
  started: boolean;
  gridDirty: boolean;
  lastInteractionTime: number;
}
