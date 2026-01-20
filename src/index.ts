import { gameState } from "./state";
import { createInitialGrid } from "./grid";
import { inputHandler } from "./input";
import { GameLogic } from "./logic/index";
import { drawGame } from "./renderer/index";
import {
  TICK_RATE_MS,
  MAX_ACCUMULATOR_MS,
  CURSOR_LERP_SPEED,
  ROWS,
  COLS,
} from "./constants";

// 1. Initialize Game State
gameState.grid = createInitialGrid();
GameLogic.recalculateBoldMask();

// 2. Register Input Handler
playdate.inputHandlers.push(inputHandler as any);

// Time tracking variables
let lastTime = playdate.getCurrentTimeMilliseconds();
let accumulator = 0;
let framesThisSecond = 0;
let lastFpsTime = lastTime;

// 3. Main Game Loop
playdate.update = () => {
  const currentTime = playdate.getCurrentTimeMilliseconds();
  const dt = currentTime - lastTime;
  lastTime = currentTime;

  framesThisSecond++;
  if (currentTime - lastFpsTime >= 1000) {
    gameState.fps = framesThisSecond;
    framesThisSecond = 0;
    lastFpsTime = currentTime;
  }
  if (dt > 0) gameState.dt = dt;
  const lerpFactor = Math.min(1, CURSOR_LERP_SPEED * dt);

  // 1. Cursor Animation
  gameState.visualCursor.x +=
    (gameState.cursor.x - gameState.visualCursor.x) * lerpFactor;
  gameState.visualCursor.y +=
    (gameState.cursor.y - gameState.visualCursor.y) * lerpFactor;
  if (Math.abs(gameState.cursor.x - gameState.visualCursor.x) < 0.01)
    gameState.visualCursor.x = gameState.cursor.x;
  if (Math.abs(gameState.cursor.y - gameState.visualCursor.y) < 0.01)
    gameState.visualCursor.y = gameState.cursor.y;

  // 2. Row/Column Slide Animation (Decay to 0)
  // Using a slightly faster LERP for the letters (x1.5) so they feel snappy
  const slideFactor = Math.min(1, lerpFactor * 1.5);

  for (let r = 0; r < ROWS; r++) {
    if (Math.abs(gameState.rowOffsets[r]) > 0.5) {
      gameState.rowOffsets[r] += (0 - gameState.rowOffsets[r]) * slideFactor;
    } else {
      gameState.rowOffsets[r] = 0;
    }
  }

  for (let c = 0; c < COLS; c++) {
    if (Math.abs(gameState.colOffsets[c]) > 0.5) {
      gameState.colOffsets[c] += (0 - gameState.colOffsets[c]) * slideFactor;
    } else {
      gameState.colOffsets[c] = 0;
    }
  }

  accumulator += dt;
  if (accumulator > MAX_ACCUMULATOR_MS) accumulator = MAX_ACCUMULATOR_MS;

  while (accumulator >= TICK_RATE_MS) {
    if (gameState.started) {
      GameLogic.updateFreeze();
      GameLogic.tick();
    }
    accumulator -= TICK_RATE_MS;
  }

  drawGame();
};
