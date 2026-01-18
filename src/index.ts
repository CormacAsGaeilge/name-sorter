import { gameState } from "./state";
import { createInitialGrid } from "./grid";
import { inputHandler } from "./input";
import { GameLogic } from "./logic";
import { drawGame } from "./renderer";

// 1. Initialize Game State
gameState.grid = createInitialGrid();
GameLogic.recalculateBoldMask();

// 2. Register Input Handler
// Cast to any to bypass strict checks if needed, or PlaydateInputHandler if types allow
playdate.inputHandlers.push(inputHandler as any);

// 3. Main Game Loop
playdate.update = () => {
  // Update Logic (Time-based events)
  GameLogic.updateFreeze();

  // Render the Frame
  drawGame();
};
