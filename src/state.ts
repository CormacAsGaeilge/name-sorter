import { GameState } from "./types";
import { INITIAL_FREEZE_THRESHOLD, ROWS, COLS } from "./constants";

export const gameState: GameState = {
  grid: [],
  boldMask: Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => false),
  ),
  intersections: Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => false),
  ),
  detectedNames: [],
  mode: "column",
  cursor: { x: 0, y: 0 },
  score: 0,
  crankAccumulator: 0,
  freezeTimer: 0,
  freezeThreshold: INITIAL_FREEZE_THRESHOLD,
  gameOver: false,
};
