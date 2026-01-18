export type Mode = "column" | "row" | "name";

export interface Point {
  x: number;
  y: number;
}

export interface GameState {
  grid: string[][];
  boldMask: boolean[][];
  mode: Mode;
  cursor: Point;
  score: number;
  crankAccumulator: number;
  freezeTimer: number;
  freezeThreshold: number; // How long until the next freeze?
  gameOver: boolean;
}
