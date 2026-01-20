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
          if (c === gameState.cursor.x && r === gameState.cursor.y) {
            playdate.graphics.setColor(PlaydateColor.White);
            playdate.graphics.setLineWidth(2);
            playdate.graphics.drawRect(
              cellX + 4,
              cellY + 4,
              CELL_WIDTH - 8,
              CELL_HEIGHT - 8,
            );
            playdate.graphics.setLineWidth(1);
            playdate.graphics.setColor(PlaydateColor.Black);
          }
        } else {
          if (c === gameState.cursor.x && r === gameState.cursor.y) {
            playdate.graphics.setLineWidth(2);
            playdate.graphics.drawRect(
              cellX + 1,
              cellY + 1,
              CELL_WIDTH - 2,
              CELL_HEIGHT - 2,
            );
            playdate.graphics.setLineWidth(1);
          }
          playdate.graphics.drawText(char, cellX + textOffsetX, drawY);
        }
      }
    }
  },
};
