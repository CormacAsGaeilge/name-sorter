import { gameState } from "../state";
import {
  ROWS,
  COLS,
  CELL_WIDTH,
  CELL_HEIGHT,
  GRID_OFFSET_X,
  GRID_OFFSET_Y,
} from "../constants";

export const UIRenderer = {
  drawStartScreen: () => {
    playdate.graphics.drawText(`*NAME SORTER*`, 145, 60);
    playdate.graphics.drawText(`Press A to Start`, 135, 100);

    const instructionsY = 140;
    const lineHeight = 20;
    const leftX = 50;

    playdate.graphics.drawText(`Controls:`, leftX, instructionsY);
    playdate.graphics.drawText(
      `D-Pad: Move Cursor / Shift Row`,
      leftX,
      instructionsY + lineHeight,
    );
    playdate.graphics.drawText(
      `A: Claim Name`,
      leftX,
      instructionsY + lineHeight * 2,
    );
    playdate.graphics.drawText(
      `B: Switch Mode (Row/Column)`,
      leftX,
      instructionsY + lineHeight * 3,
    );
    playdate.graphics.drawText(
      `Crank: Shuffle Line`,
      leftX,
      instructionsY + lineHeight * 4,
    );
  },

  drawHUD: () => {
    // --- DEBUG DISPLAY ---
    // const debugStr = `FPS: ${Math.floor(gameState.fps)}  dt: ${gameState.dt}ms`;
    // playdate.graphics.drawText(debugStr, 240, 220); // Bottom Right corner
    // ---------------------
    if (gameState.gameOver) {
      playdate.graphics.drawText(`GAME OVER`, 150, 100);
      playdate.graphics.drawText(`Final Score: ${gameState.score}`, 140, 130);
      playdate.graphics.drawText(`Press A to Restart`, 130, 160);
      return;
    }

    playdate.graphics.drawText(`Score: ${gameState.score}`, 10, 10);
    playdate.graphics.drawText(`Mode: ${gameState.mode.toUpperCase()}`, 10, 30);

    const legendX = 260;
    playdate.graphics.drawText(`A: Claim Name`, legendX, 10);
    playdate.graphics.drawText(`B: Switch Mode`, legendX, 30);

    // Progress Bar
    const barX = GRID_OFFSET_X;
    const barY = GRID_OFFSET_Y + ROWS * CELL_HEIGHT + 25;
    const barWidth = COLS * CELL_WIDTH;
    const barHeight = 4;
    playdate.graphics.drawRect(barX, barY, barWidth, barHeight);
    const fillPercent = gameState.freezeTimer / gameState.freezeThreshold;
    const fillWidth = Math.floor(barWidth * fillPercent);
    if (fillWidth > 0)
      playdate.graphics.fillRect(barX, barY, fillWidth, barHeight);
  },
};
