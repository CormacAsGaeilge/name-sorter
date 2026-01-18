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
  // 1. RESET GRAPHICS STATE (Fixes Bug #1: UI Disappearing)
  playdate.graphics.clear(PlaydateColor.White);
  playdate.graphics.setColor(PlaydateColor.Black);
  playdate.graphics.setImageDrawMode(PlaydateDrawMode.FillBlack);

  // --- GAME OVER SCREEN ---
  if (gameState.gameOver) {
    playdate.graphics.drawText(`GAME OVER`, 150, 100);
    playdate.graphics.drawText(`Final Score: ${gameState.score}`, 140, 130);
    playdate.graphics.drawText(`Press A to Restart`, 130, 160);
    return;
  }

  // --- HUD ---
  playdate.graphics.drawText(`Score: ${gameState.score}`, 10, 10);
  playdate.graphics.drawText(`Mode: ${gameState.mode.toUpperCase()}`, 10, 30);

  // --- PROGRESS BAR ---
  const barX = GRID_OFFSET_X;
  const barY = GRID_OFFSET_Y + ROWS * CELL_HEIGHT + 10;
  const barWidth = COLS * CELL_WIDTH;
  const barHeight = 5;

  playdate.graphics.drawRect(barX, barY, barWidth, barHeight);

  const fillPercent = gameState.freezeTimer / gameState.freezeThreshold;
  const fillWidth = Math.floor(barWidth * fillPercent);
  if (fillWidth > 0) {
    playdate.graphics.fillRect(barX, barY, fillWidth, barHeight);
  }

  // --- GRID DRAWING ---
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const char = gameState.grid[r][c];
      const cellX = GRID_OFFSET_X + c * CELL_WIDTH;
      const cellY = GRID_OFFSET_Y + r * CELL_HEIGHT;

      // Determine Highlight State
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

      if (char === FROZEN_CELL) {
        // --- FROZEN BLOCK RENDER ---
        playdate.graphics.setColor(PlaydateColor.Black);
        // Draw a box padded by 2px on all sides (Centered)
        playdate.graphics.fillRect(
          cellX + 2,
          cellY + 2,
          CELL_WIDTH - 4,
          CELL_HEIGHT - 4,
        );

        // If cursor is here, draw a white border so we can see selection
        if (isHighlighted) {
          playdate.graphics.setColor(PlaydateColor.White);
          playdate.graphics.drawRect(
            cellX + 4,
            cellY + 4,
            CELL_WIDTH - 8,
            CELL_HEIGHT - 8,
          );
        }
      } else {
        // --- TEXT RENDER ---

        // Draw Highlight Background (Centered)
        if (isHighlighted) {
          playdate.graphics.setColor(PlaydateColor.Black);
          // Draw box with 2px padding inside the cell
          playdate.graphics.fillRect(
            cellX + 2,
            cellY + 2,
            CELL_WIDTH - 4,
            CELL_HEIGHT - 4,
          );
          playdate.graphics.setImageDrawMode(PlaydateDrawMode.FillWhite);
        } else {
          playdate.graphics.setImageDrawMode(PlaydateDrawMode.FillBlack);
        }

        // Set Font
        if (gameState.boldMask[r][c]) {
          playdate.graphics.setFont(
            playdate.graphics.getSystemFont(PlaydateFontVariant.Bold),
          );
        } else {
          playdate.graphics.setFont(
            playdate.graphics.getSystemFont(PlaydateFontVariant.Normal),
          );
        }

        // CENTERING LOGIC (Fixes Bug #2: Off-center text)
        const [textW, textH] = playdate.graphics.getTextSize(char);
        const textX = cellX + (CELL_WIDTH - textW) / 2;
        const textY = cellY + (CELL_HEIGHT - textH) / 2;

        playdate.graphics.drawText(char, textX, textY);
      }
    }
  }
};
