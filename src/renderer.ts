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
} from "./constants";

export const drawGame = () => {
  // 1. Clear Screen
  playdate.graphics.clear(PlaydateColor.White);

  // 2. Calculate Bold Mask (Derived State for visuals)
  // We calculate this every frame to ensure highlights are always accurate
  const boldMask = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => false),
  );

  // Check Rows
  for (let r = 0; r < ROWS; r++) {
    const rowStr = gameState.grid[r].join("");
    NAMES_TO_FIND.forEach((name) => {
      let startIndex = 0;
      while ((startIndex = rowStr.indexOf(name, startIndex)) > -1) {
        for (let i = 0; i < name.length; i++) {
          boldMask[r][startIndex + i] = true;
        }
        startIndex += 1;
      }
    });
  }

  // Check Columns
  for (let c = 0; c < COLS; c++) {
    const colStr = gameState.grid.map((row) => row[c]).join("");
    NAMES_TO_FIND.forEach((name) => {
      let startIndex = 0;
      while ((startIndex = colStr.indexOf(name, startIndex)) > -1) {
        for (let i = 0; i < name.length; i++) {
          boldMask[startIndex + i][c] = true;
        }
        startIndex += 1;
      }
    });
  }

  // 3. Draw UI
  playdate.graphics.drawText(`Score: ${gameState.score}`, 10, 10);
  playdate.graphics.drawText(`Mode: ${gameState.mode.toUpperCase()}`, 10, 30);

  if (Math.abs(gameState.crankAccumulator) > 10) {
    playdate.graphics.drawText(
      `Crank: ${Math.floor(Math.abs(gameState.crankAccumulator))}`,
      200,
      10,
    );
  }

  // 4. Draw Grid
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const char = gameState.grid[r][c];
      const x = GRID_OFFSET_X + c * CELL_WIDTH;
      const y = GRID_OFFSET_Y + r * CELL_HEIGHT;

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

      // Draw Background
      if (isHighlighted) {
        playdate.graphics.setColor(PlaydateColor.Black);
        playdate.graphics.fillRect(x - 2, y - 2, 20, 20);
        playdate.graphics.setImageDrawMode(PlaydateDrawMode.FillWhite);
      } else {
        playdate.graphics.setImageDrawMode(PlaydateDrawMode.FillBlack);
      }

      // Set Font Weight based on mask
      if (boldMask[r][c]) {
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
};
