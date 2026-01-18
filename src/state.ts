import { GameState } from "./types";
import { INITIAL_FREEZE_THRESHOLD } from "./constants";

export const gameState: GameState = {
  grid: [],
  mode: "column",
  cursor: { x: 0, y: 0 },
  score: 0,
  crankAccumulator: 0,
  freezeTimer: 0,
  freezeThreshold: INITIAL_FREEZE_THRESHOLD,
  gameOver: false,
};
