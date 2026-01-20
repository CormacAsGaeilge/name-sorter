import { gameState } from "./state";
import { createInitialGrid } from "./grid";
import { inputHandler } from "./input";
import { GameLogic } from "./logic/index";
import { drawGame } from "./renderer/index";
import { TICK_RATE_MS, MAX_ACCUMULATOR_MS } from "./constants";

// 1. Initialize Game State
gameState.grid = createInitialGrid();
GameLogic.recalculateBoldMask();

// 2. Register Input Handler
playdate.inputHandlers.push(inputHandler as any);

// Time tracking variables
let lastTime = playdate.getCurrentTimeMilliseconds();
let accumulator = 0;

// FPS Counting variables
let framesThisSecond = 0;
let lastFpsTime = lastTime;

// 3. Main Game Loop
playdate.update = () => {
  const currentTime = playdate.getCurrentTimeMilliseconds();
  const dt = currentTime - lastTime;
  lastTime = currentTime;

  // --- IMPROVED DEBUG LOGIC ---
  framesThisSecond++;
  if (currentTime - lastFpsTime >= 1000) {
    gameState.fps = framesThisSecond;
    framesThisSecond = 0;
    lastFpsTime = currentTime;
  }
  // Only update displayed dt if we actually had a frame step > 0
  if (dt > 0) {
    gameState.dt = dt;
  }
  // ---------------------------

  // Add elapsed time to the "tank"
  accumulator += dt;

  // Cap the accumulator
  if (accumulator > MAX_ACCUMULATOR_MS) {
    accumulator = MAX_ACCUMULATOR_MS;
  }

  // Consume time in fixed chunks
  while (accumulator >= TICK_RATE_MS) {
    if (gameState.started) {
      GameLogic.updateFreeze();
      GameLogic.tick();
    }
    accumulator -= TICK_RATE_MS;
  }

  // Render the Frame
  drawGame();
};
