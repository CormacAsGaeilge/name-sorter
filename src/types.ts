export type Mode = "column" | "row" | "name";

export interface Point {
  x: number;
  y: number;
}

export interface NameInstance {
  text: string;
  cells: Point[];
  id: string;
}

export interface GameState {
  grid: string[][];
  boldMask: boolean[][];
  detectedNames: NameInstance[];
  mode: Mode;
  cursor: Point;
  score: number;
  crankAccumulator: number;
  freezeTimer: number;
  freezeThreshold: number;
  gameOver: boolean;
}
