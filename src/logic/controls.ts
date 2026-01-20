import { gameState } from "../state";
import { MatchingLogic } from "./matching";
import { ROWS, COLS, FROZEN_CELL, CELL_WIDTH, CELL_HEIGHT } from "../constants";
import { randomChar } from "../grid";
import { SoundManager } from "../sound";

export const Controls = {
  handleLeft: () => {
    SoundManager.playMove();
    if (gameState.mode === "column") {
      gameState.cursor.x = (gameState.cursor.x - 1 + COLS) % COLS;
    } else if (gameState.mode === "row") {
      const row = gameState.cursor.y;
      const first = gameState.grid[row].shift();
      if (first) gameState.grid[row].push(first);
      gameState.rowOffsets[row] = CELL_WIDTH;
      MatchingLogic.markDirty();
    } else {
      gameState.cursor.x = (gameState.cursor.x - 1 + COLS) % COLS;
    }
  },

  handleRight: () => {
    SoundManager.playMove();
    if (gameState.mode === "column") {
      gameState.cursor.x = (gameState.cursor.x + 1) % COLS;
    } else if (gameState.mode === "row") {
      const row = gameState.cursor.y;
      const last = gameState.grid[row].pop();
      if (last) gameState.grid[row].unshift(last);
      gameState.rowOffsets[row] = -CELL_WIDTH;
      MatchingLogic.markDirty();
    } else {
      gameState.cursor.x = (gameState.cursor.x + 1) % COLS;
    }
  },

  handleUp: () => {
    SoundManager.playMove();
    if (gameState.mode === "column") {
      const col = gameState.cursor.x;
      const topChar = gameState.grid[0][col];
      for (let r = 0; r < ROWS - 1; r++) {
        gameState.grid[r][col] = gameState.grid[r + 1][col];
      }
      gameState.grid[ROWS - 1][col] = topChar;
      gameState.colOffsets[col] = CELL_HEIGHT;
      MatchingLogic.markDirty();
    } else {
      gameState.cursor.y = (gameState.cursor.y - 1 + ROWS) % ROWS;
    }
  },

  handleDown: () => {
    SoundManager.playMove();
    if (gameState.mode === "column") {
      const col = gameState.cursor.x;
      const bottomChar = gameState.grid[ROWS - 1][col];
      for (let r = ROWS - 1; r > 0; r--) {
        gameState.grid[r][col] = gameState.grid[r - 1][col];
      }
      gameState.grid[0][col] = bottomChar;
      gameState.colOffsets[col] = -CELL_HEIGHT;
      MatchingLogic.markDirty();
    } else {
      gameState.cursor.y = (gameState.cursor.y + 1) % ROWS;
    }
  },

  toggleMode: () => {
    SoundManager.playModeSwitch();
    if (gameState.mode === "column") gameState.mode = "row";
    else if (gameState.mode === "row") gameState.mode = "column";
    else gameState.mode = "column";
  },

  processCrank: (change: number) => {
    gameState.crankAccumulator += change;
    if (Math.abs(gameState.crankAccumulator) >= 360) {
      if (gameState.crankAccumulator > 0) gameState.crankAccumulator -= 360;
      else gameState.crankAccumulator += 360;

      const { mode, cursor, grid } = gameState;
      if (mode === "row") {
        for (let c = 0; c < COLS; c++) {
          if (grid[cursor.y][c] !== FROZEN_CELL) {
            grid[cursor.y][c] = randomChar();
          }
        }
      } else if (mode === "column") {
        for (let r = 0; r < ROWS; r++) {
          if (grid[r][cursor.x] !== FROZEN_CELL) {
            grid[r][cursor.x] = randomChar();
          }
        }
      }
      MatchingLogic.markDirty();
      SoundManager.playMove();
    }
  },
};
