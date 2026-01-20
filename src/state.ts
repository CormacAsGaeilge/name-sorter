import { GameState } from "./types";
import { INITIAL_FREEZE_THRESHOLD, ROWS, COLS } from "./constants";

// Helper to avoid 'Array(n).fill' issues in Lua
const createZeroArray = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) arr.push(0);
  return arr;
};

export const gameState: GameState = {
  grid: [],
  boldMask: Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => false),
  ),
  intersections: Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => false),
  ),
  detectedNames: [],
  particles: [],
  mode: "column",
  cursor: { x: 0, y: 0 },
  visualCursor: { x: 0, y: 0 },
  rowOffsets: createZeroArray(ROWS),
  colOffsets: createZeroArray(COLS),
  score: 0,
  crankAccumulator: 0,
  freezeTimer: 0,
  freezeThreshold: INITIAL_FREEZE_THRESHOLD,
  gameOver: false,
  started: false,
  // Optimizations
  gridDirty: true,
  lastInteractionTime: 0,
  fps: 0,
  dt: 0,
};
