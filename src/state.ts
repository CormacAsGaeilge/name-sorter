import { GameState } from "./types";

export const gameState: GameState = {
  grid: [],
  mode: "column",
  cursor: { x: 0, y: 0 },
  score: 0,
  crankAccumulator: 0,
  chaosCounter: 0,
};
