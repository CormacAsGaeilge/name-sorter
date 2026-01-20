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

// (Keep your drawDashedRect helper here exactly as it was)
const drawDashedRect = (x: number, y: number, w: number, h: number) => {
  playdate.graphics.setLineWidth(3);
  const dashLen = 5;
  const gapLen = 3;
  const step = dashLen + gapLen;
  for (let i = 0; i < w; i += step) {
    const segW = Math.min(dashLen, w - i);
    playdate.graphics.drawLine(x + i, y, x + i + segW, y);
    playdate.graphics.drawLine(x + i, y + h, x + i + segW, y + h);
  }
  for (let i = 0; i < h; i += step) {
    const segH = Math.min(dashLen, h - i);
    playdate.graphics.drawLine(x, y + i, x, y + i + segH);
    playdate.graphics.drawLine(x + w, y + i, x + w, y + i + segH);
  }
  playdate.graphics.setLineWidth(1);
};

export const GridRenderer = {
  drawGrid: () => {
    const textOffsetX = Math.floor((CELL_WIDTH - 12) / 2);
    const textOffsetY = Math.floor((CELL_HEIGHT - 14) / 2);

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

    // --- CHANGED: Use visualCursor for smooth selection box ---
    const { mode, visualCursor, cursor } = gameState; // Use cursor for char lookup, visual for box

    if (mode === "row") {
      drawDashedRect(
        GRID_OFFSET_X,
        GRID_OFFSET_Y + visualCursor.y * CELL_HEIGHT, // Smooth Y
        COLS * CELL_WIDTH,
        CELL_HEIGHT,
      );
    } else if (mode === "column") {
      drawDashedRect(
        GRID_OFFSET_X + visualCursor.x * CELL_WIDTH, // Smooth X
        GRID_OFFSET_Y,
        CELL_WIDTH,
        ROWS * CELL_HEIGHT,
      );
    } else if (mode === "name") {
      const char = gameState.grid[cursor.y][cursor.x]; // Logic still uses Integer cursor

      playdate.graphics.setLineWidth(3);
      if (char === FROZEN_CELL) playdate.graphics.setColor(PlaydateColor.White);

      playdate.graphics.drawRect(
        GRID_OFFSET_X + visualCursor.x * CELL_WIDTH, // Smooth X
        GRID_OFFSET_Y + visualCursor.y * CELL_HEIGHT, // Smooth Y
        CELL_WIDTH,
        CELL_HEIGHT,
      );

      if (char === FROZEN_CELL) playdate.graphics.setColor(PlaydateColor.Black);
      playdate.graphics.setLineWidth(1);
    }
  },
};
