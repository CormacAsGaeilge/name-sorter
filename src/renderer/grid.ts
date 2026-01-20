import { PlaydateColor } from "@crankscript/core";
import { gameState } from "../state";
import {
  ROWS,
  COLS,
  CELL_WIDTH,
  CELL_HEIGHT,
  GRID_OFFSET_X,
  GRID_OFFSET_Y,
  FROZEN_CELL,
} from "../constants";

// Helper to draw a dashed rectangle manually
// This works on both Simulator and Web without special API support
const drawDashedRect = (x: number, y: number, w: number, h: number) => {
  playdate.graphics.setLineWidth(3); // Thicker lines

  const dashLen = 5;
  const gapLen = 3;
  const step = dashLen + gapLen;

  // Draw Top & Bottom
  for (let i = 0; i < w; i += step) {
    const segW = Math.min(dashLen, w - i);
    // Top Line
    playdate.graphics.drawLine(x + i, y, x + i + segW, y);
    // Bottom Line
    playdate.graphics.drawLine(x + i, y + h, x + i + segW, y + h);
  }

  // Draw Left & Right
  for (let i = 0; i < h; i += step) {
    const segH = Math.min(dashLen, h - i);
    // Left Line
    playdate.graphics.drawLine(x, y + i, x, y + i + segH);
    // Right Line
    playdate.graphics.drawLine(x + w, y + i, x + w, y + i + segH);
  }

  playdate.graphics.setLineWidth(1); // Reset
};

export const GridRenderer = {
  drawGrid: () => {
    const textOffsetX = Math.floor((CELL_WIDTH - 12) / 2);
    const textOffsetY = Math.floor((CELL_HEIGHT - 14) / 2);

    // 1. Draw Grid Content
    for (let r = 0; r < ROWS; r++) {
      const cellY = GRID_OFFSET_Y + r * CELL_HEIGHT;
      const drawY = cellY + textOffsetY;
      const rowData = gameState.grid[r];

      for (let c = 0; c < COLS; c++) {
        const char = rowData[c];
        const cellX = GRID_OFFSET_X + c * CELL_WIDTH;

        if (char === FROZEN_CELL) {
          playdate.graphics.fillRect(
            cellX + 2,
            cellY + 2,
            CELL_WIDTH - 4,
            CELL_HEIGHT - 4,
          );
        } else {
          playdate.graphics.drawText(char, cellX + textOffsetX, drawY);
        }
      }
    }

    // 2. Draw Selection Highlights
    const { mode, cursor } = gameState;

    if (mode === "row") {
      drawDashedRect(
        GRID_OFFSET_X,
        GRID_OFFSET_Y + cursor.y * CELL_HEIGHT,
        COLS * CELL_WIDTH,
        CELL_HEIGHT,
      );
    } else if (mode === "column") {
      drawDashedRect(
        GRID_OFFSET_X + cursor.x * CELL_WIDTH,
        GRID_OFFSET_Y,
        CELL_WIDTH,
        ROWS * CELL_HEIGHT,
      );
    } else if (mode === "name") {
      // Solid Box for single cell
      const char = gameState.grid[cursor.y][cursor.x];

      playdate.graphics.setLineWidth(3);
      if (char === FROZEN_CELL) playdate.graphics.setColor(PlaydateColor.White);

      playdate.graphics.drawRect(
        GRID_OFFSET_X + cursor.x * CELL_WIDTH,
        GRID_OFFSET_Y + cursor.y * CELL_HEIGHT,
        CELL_WIDTH,
        CELL_HEIGHT,
      );

      if (char === FROZEN_CELL) playdate.graphics.setColor(PlaydateColor.Black);
      playdate.graphics.setLineWidth(1);
    }
  },
};
