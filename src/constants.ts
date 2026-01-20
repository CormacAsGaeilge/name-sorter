import { names } from "./names";

export const ROWS = 5;
export const COLS = 10;
export const NAMES_TO_FIND = names;
export const CELL_WIDTH = 30;
export const CELL_HEIGHT = 30;
export const GRID_OFFSET_X = 50;
export const GRID_OFFSET_Y = 60;
export const FROZEN_CELL = "#";
export const INITIAL_FREEZE_THRESHOLD = 100 * 30;
export const MIN_FREEZE_THRESHOLD = 30 * 5;
export const FREEZE_DECREMENT = 30 * 2;

// Game Loop
export const TICK_RATE_MS = 33;
export const MAX_ACCUMULATOR_MS = 250;

// --- NEW ANIMATION CONSTANTS ---
export const CARET_SPEED_DIVISOR = 200; // Higher = Slower
export const CARET_BOUNCE_AMPLITUDE = 3; // Pixels to move back and forth
export const CARET_SIZE = 6; // Size of the arrow head in pixels
