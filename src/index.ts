import { gameState } from "./state";
import { createInitialGrid } from "./grid";
import { inputHandler } from "./input";
import { GameLogic } from "./logic";
import { drawGame } from "./renderer";

gameState.grid = createInitialGrid();
GameLogic.recalculateBoldMask();

playdate.inputHandlers.push(inputHandler as any);

playdate.update = () => {
  if (gameState.started) {
    GameLogic.updateFreeze();
    GameLogic.updateParticles();
    GameLogic.tick();
  }
  drawGame();
};
