import { gameState } from "./state";
import { createInitialGrid } from "./grid";
import { inputHandler } from "./input";
import { GameLogic } from "./logic/index";
import { drawGame } from "./renderer/index";
import {
  TICK_RATE_MS,
  MAX_ACCUMULATOR_MS,
  CURSOR_LERP_SPEED,
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

  // --- NEW: Smooth Cursor Animation (Time-based LERP) ---
  // Formula: current = current + (target - current) * (1 - exp(-speed * dt))
  // Simplified for short dt: current += (target - current) * (speed * dt)

  const lerpFactor = Math.min(1, CURSOR_LERP_SPEED * dt);

  gameState.visualCursor.x +=
    (gameState.cursor.x - gameState.visualCursor.x) * lerpFactor;
  gameState.visualCursor.y +=
    (gameState.cursor.y - gameState.visualCursor.y) * lerpFactor;

  // Snap if very close (prevents micro-jitter)
  if (Math.abs(gameState.cursor.x - gameState.visualCursor.x) < 0.01)
    gameState.visualCursor.x = gameState.cursor.x;
  if (Math.abs(gameState.cursor.y - gameState.visualCursor.y) < 0.01)
    gameState.visualCursor.y = gameState.cursor.y;
  // -----------------------------------------------------

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
