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

// (Keep drawDashedRect helper exactly as is)
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

    // --- NEW: CLIP START ---
    // Mask the area so sliding letters don't bleed out
    const gridW = COLS * CELL_WIDTH;
    const gridH = ROWS * CELL_HEIGHT;

    // Cast to any to bypass potential missing type definitions
    playdate.graphics.setClipRect(GRID_OFFSET_X, GRID_OFFSET_Y, gridW, gridH);

    // 1. Draw Grid Content
    for (let r = 0; r < ROWS; r++) {
      const rowOffset = gameState.rowOffsets[r];
      const cellY = GRID_OFFSET_Y + r * CELL_HEIGHT;
      const rowData = gameState.grid[r];

      for (let c = 0; c < COLS; c++) {
        const char = rowData[c];
        const colOffset = gameState.colOffsets[c];

        const cellX = GRID_OFFSET_X + c * CELL_WIDTH + rowOffset;
        const finalY = cellY + colOffset;

        const drawCell = (dx: number, dy: number) => {
          if (char === FROZEN_CELL) {
            playdate.graphics.fillRect(
              dx + 2,
              dy + 2,
              CELL_WIDTH - 4,
              CELL_HEIGHT - 4,
            );
          } else {
            playdate.graphics.drawText(
              char,
              dx + textOffsetX,
              dy + textOffsetY,
            );
          }
        };

        drawCell(cellX, finalY);

        // Wrapping Logic
        if (rowOffset < 0 && c === 0) {
          drawCell(cellX + COLS * CELL_WIDTH, finalY);
        }
        if (rowOffset > 0 && c === COLS - 1) {
          drawCell(cellX - COLS * CELL_WIDTH, finalY);
        }
        if (colOffset < 0 && r === 0) {
          drawCell(cellX, finalY + ROWS * CELL_HEIGHT);
        }
        if (colOffset > 0 && r === ROWS - 1) {
          drawCell(cellX, finalY - ROWS * CELL_HEIGHT);
        }
      }
    }

    // --- NEW: CLIP END ---
    (playdate.graphics as any).clearClipRect();

    // 2. Draw Selection Highlights (Unclipped, so thick borders are visible)
    const { mode, visualCursor, cursor } = gameState;

    if (mode === "row") {
      drawDashedRect(
        GRID_OFFSET_X,
        GRID_OFFSET_Y + visualCursor.y * CELL_HEIGHT,
        COLS * CELL_WIDTH,
        CELL_HEIGHT,
      );
    } else if (mode === "column") {
      drawDashedRect(
        GRID_OFFSET_X + visualCursor.x * CELL_WIDTH,
        GRID_OFFSET_Y,
        CELL_WIDTH,
        ROWS * CELL_HEIGHT,
      );
    } else if (mode === "name") {
      const char = gameState.grid[cursor.y][cursor.x];

      playdate.graphics.setLineWidth(3);
      if (char === FROZEN_CELL) playdate.graphics.setColor(PlaydateColor.White);

      playdate.graphics.drawRect(
        GRID_OFFSET_X + visualCursor.x * CELL_WIDTH,
        GRID_OFFSET_Y + visualCursor.y * CELL_HEIGHT,
        CELL_WIDTH,
        CELL_HEIGHT,
      );

      if (char === FROZEN_CELL) playdate.graphics.setColor(PlaydateColor.Black);
      playdate.graphics.setLineWidth(1);
    }
  },
};
