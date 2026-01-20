import { gameState } from "./state";
import { createInitialGrid } from "./grid";
import { inputHandler } from "./input";
import { GameLogic } from "./logic";
import { drawGame } from "./renderer";
import { TICK_RATE_MS, MAX_ACCUMULATOR_MS } from "./constants";

gameState.grid = createInitialGrid();
GameLogic.recalculateBoldMask();

playdate.inputHandlers.push(inputHandler as any);

let lastTime = playdate.getCurrentTimeMilliseconds();
let accumulator = 0;

playdate.update = () => {
  const currentTime = playdate.getCurrentTimeMilliseconds();
  const dt = currentTime - lastTime;
  lastTime = currentTime;

  accumulator += dt;

  if (accumulator > MAX_ACCUMULATOR_MS) {
    accumulator = MAX_ACCUMULATOR_MS;
  }

  while (accumulator >= TICK_RATE_MS) {
    if (gameState.started) {
      GameLogic.updateFreeze();
      GameLogic.tick();
    }
    accumulator -= TICK_RATE_MS;
  }

  drawGame();
};
