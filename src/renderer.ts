import {
  PlaydateColor,
  PlaydateDrawMode,
  PlaydateFontVariant,
} from "@crankscript/core";
import { gameState } from "./state";
import {
  ROWS,
  COLS,
  CELL_WIDTH,
  CELL_HEIGHT,
  GRID_OFFSET_X,
  GRID_OFFSET_Y,
  NAMES_TO_FIND,
  FROZEN_CELL,
} from "./constants";

export const drawGame = () => {
  playdate.graphics.clear(PlaydateColor.White);

  // --- GAME OVER SCREEN ---
  if (gameState.gameOver) {
    playdate.graphics.drawText(`GAME OVER`, 150, 100);
    playdate.graphics.drawText(`Final Score: ${gameState.score}`, 140, 130);
    playdate.graphics.drawText(`Press A to Restart`, 130, 160);
    return; // Stop drawing the rest
  }

  // --- HUD ---
  playdate.graphics.drawText(`Score: ${gameState.score}`, 10, 10);
  playdate.graphics.drawText(`Mode: ${gameState.mode.toUpperCase()}`, 10, 30);

  // --- PROGRESS BAR ---
  // Draw below the grid
  const barX = GRID_OFFSET_X;
  const barY = GRID_OFFSET_Y + ROWS * CELL_HEIGHT + 10;
  const barWidth = COLS * CELL_WIDTH;
  const barHeight = 5;

  // Background Frame
  playdate.graphics.drawRect(barX, barY, barWidth, barHeight);

  // Fill (percentage of timer)
  const fillPercent = gameState.freezeTimer / gameState.freezeThreshold;
  const fillWidth = Math.floor(barWidth * fillPercent);
  if (fillWidth > 0) {
    playdate.graphics.fillRect(barX, barY, fillWidth, barHeight);
  }

  // --- GRID DRAWING ---
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const char = gameState.grid[r][c];
      const x = GRID_OFFSET_X + c * CELL_WIDTH;
      const y = GRID_OFFSET_Y + r * CELL_HEIGHT;

      // Highlight Logic
      let isHighlighted = false;
      if (gameState.mode === "column" && c === gameState.cursor.x)
        isHighlighted = true;
      if (gameState.mode === "row" && r === gameState.cursor.y)
        isHighlighted = true;
      if (
        gameState.mode === "name" &&
        r === gameState.cursor.y &&
        c === gameState.cursor.x
      )
        isHighlighted = true;

      // DRAWING LOGIC
      if (char === FROZEN_CELL) {
        // 1. FROZEN BLOCK
        playdate.graphics.setColor(PlaydateColor.Black);
        // Draw full black square
        playdate.graphics.fillRect(
          x + 2,
          y + 2,
          CELL_WIDTH - 4,
          CELL_HEIGHT - 4,
        );

        // If cursor is here, we invert it so you can see selection
        if (isHighlighted) {
          playdate.graphics.setColor(PlaydateColor.White);
          playdate.graphics.drawRect(x, y, CELL_WIDTH, CELL_HEIGHT); // Selection Border
        }
      } else {
        // 2. NORMAL LETTER
        if (isHighlighted) {
          playdate.graphics.setColor(PlaydateColor.Black);
          playdate.graphics.fillRect(x - 2, y - 2, 20, 20);
          playdate.graphics.setImageDrawMode(PlaydateDrawMode.FillWhite);
        } else {
          playdate.graphics.setImageDrawMode(PlaydateDrawMode.FillBlack);
        }

        if (gameState.boldMask[r][c]) {
          playdate.graphics.setFont(
            playdate.graphics.getSystemFont(PlaydateFontVariant.Bold),
          );
        } else {
          playdate.graphics.setFont(
            playdate.graphics.getSystemFont(PlaydateFontVariant.Normal),
          );
        }
        playdate.graphics.drawText(char, x, y);
      }
    }
  }
};
