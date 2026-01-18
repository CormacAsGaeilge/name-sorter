export type Mode = "column" | "row" | "name";

export interface Point {
  x: number;
  y: number;
}

export interface GameState {
  grid: string[][];
  mode: Mode;
  cursor: Point;
  score: number;
  crankAccumulator: number;
  chaosCounter: number;
}
