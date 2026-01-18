import { gameState } from "./state";
import {
  ROWS,
  COLS,
  NAMES_TO_FIND,
  FROZEN_CELL,
  INITIAL_FREEZE_THRESHOLD,
  MIN_FREEZE_THRESHOLD,
  FREEZE_DECREMENT,
} from "./constants";
import { randomChar, shuffleArray, createInitialGrid } from "./grid";

export const GameLogic = {
  recalculateBoldMask: () => {
    // Reset mask
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        gameState.boldMask[r][c] = false;
      }
    }

    // Check Rows
    for (let r = 0; r < ROWS; r++) {
      const rowStr = gameState.grid[r].join("");
      NAMES_TO_FIND.forEach((name) => {
        let startIndex = 0;
        while ((startIndex = rowStr.indexOf(name, startIndex)) > -1) {
          for (let i = 0; i < name.length; i++) {
            gameState.boldMask[r][startIndex + i] = true;
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
            gameState.boldMask[startIndex + i][c] = true;
          }
          startIndex += 1;
        }
      });
    }
  },

  resetGame: () => {
    gameState.grid = createInitialGrid();
    gameState.score = 0;
    gameState.gameOver = false;
    gameState.freezeTimer = 0;
    gameState.freezeThreshold = INITIAL_FREEZE_THRESHOLD;
    gameState.cursor = { x: 0, y: 0 };
    GameLogic.recalculateBoldMask();
  },

  updateFreeze: () => {
    if (gameState.gameOver) return;

    gameState.freezeTimer++;
    if (gameState.freezeTimer >= gameState.freezeThreshold) {
      gameState.freezeTimer = 0;
      gameState.freezeThreshold = Math.max(
        MIN_FREEZE_THRESHOLD,
        gameState.freezeThreshold - FREEZE_DECREMENT,
      );

      const validSpots: { r: number; c: number }[] = [];
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (gameState.grid[r][c] !== FROZEN_CELL) {
            validSpots.push({ r, c });
          }
        }
      }

      if (validSpots.length > 0) {
        const randomSpot =
          validSpots[Math.floor(Math.random() * validSpots.length)];
        gameState.grid[randomSpot.r][randomSpot.c] = FROZEN_CELL;
        GameLogic.recalculateBoldMask();

        if (validSpots.length === 1) gameState.gameOver = true;
      } else {
        gameState.gameOver = true;
      }
    }
  },

  checkNameMatch: () => {
    const { mode, grid, cursor } = gameState;

    // If not in Name mode, switch to it
    if (mode === "column" || mode === "row") {
      gameState.mode = "name";
      return;
    }

    // Execute Match Logic
    if (mode === "name") {
      const rowStr = grid[cursor.y].join("");
      const colStr = grid.map((row) => row[cursor.x]).join("");

      let foundRow = false;
      let foundCol = false;

      NAMES_TO_FIND.forEach((name) => {
        if (rowStr.includes(name)) foundRow = true;
        if (colStr.includes(name)) foundCol = true;
      });

      if (foundRow || foundCol) {
        gameState.score += 100;
        if (foundRow) {
          grid[cursor.y] = Array.from({ length: COLS }, () => randomChar());
        }
        if (foundCol) {
          for (let r = 0; r < ROWS; r++) {
            grid[r][cursor.x] = randomChar();
          }
        }
        // FIX: Do NOT switch back to 'column'. Stay in 'name'.
        // gameState.mode = 'column';  <-- REMOVED THIS LINE

        GameLogic.recalculateBoldMask();
      }
    }
  },

  processCrank: (change: number) => {
    gameState.crankAccumulator += change;
    if (Math.abs(gameState.crankAccumulator) >= 360) {
      if (gameState.crankAccumulator > 0) gameState.crankAccumulator -= 360;
      else gameState.crankAccumulator += 360;

      const { mode, cursor, grid } = gameState;
      if (mode === "row") {
        grid[cursor.y] = shuffleArray(grid[cursor.y]);
      } else if (mode === "column") {
        const col = grid.map((row) => row[cursor.x]);
        const shuffledCol = shuffleArray(col);
        for (let r = 0; r < ROWS; r++) {
          grid[r][cursor.x] = shuffledCol[r];
        }
      }
      GameLogic.recalculateBoldMask();
    }
  },

  handleLeft: () => {
    if (gameState.mode === "column") {
      gameState.cursor.x = (gameState.cursor.x - 1 + COLS) % COLS;
    } else if (gameState.mode === "row") {
      const first = gameState.grid[gameState.cursor.y].shift();
      if (first) gameState.grid[gameState.cursor.y].push(first);
      GameLogic.recalculateBoldMask();
    } else {
      gameState.cursor.x = (gameState.cursor.x - 1 + COLS) % COLS;
    }
  },

  handleRight: () => {
    if (gameState.mode === "column") {
      gameState.cursor.x = (gameState.cursor.x + 1) % COLS;
    } else if (gameState.mode === "row") {
      const last = gameState.grid[gameState.cursor.y].pop();
      if (last) gameState.grid[gameState.cursor.y].unshift(last);
      GameLogic.recalculateBoldMask();
    } else {
      gameState.cursor.x = (gameState.cursor.x + 1) % COLS;
    }
  },

  handleUp: () => {
    if (gameState.mode === "column") {
      const topChar = gameState.grid[0][gameState.cursor.x];
      for (let r = 0; r < ROWS - 1; r++) {
        gameState.grid[r][gameState.cursor.x] =
          gameState.grid[r + 1][gameState.cursor.x];
      }
      gameState.grid[ROWS - 1][gameState.cursor.x] = topChar;
      GameLogic.recalculateBoldMask();
    } else {
      gameState.cursor.y = (gameState.cursor.y - 1 + ROWS) % ROWS;
    }
  },

  handleDown: () => {
    if (gameState.mode === "column") {
      const bottomChar = gameState.grid[ROWS - 1][gameState.cursor.x];
      for (let r = ROWS - 1; r > 0; r--) {
        gameState.grid[r][gameState.cursor.x] =
          gameState.grid[r - 1][gameState.cursor.x];
      }
      gameState.grid[0][gameState.cursor.x] = bottomChar;
      GameLogic.recalculateBoldMask();
    } else {
      gameState.cursor.y = (gameState.cursor.y + 1) % ROWS;
    }
  },

  toggleMode: () => {
    if (gameState.mode === "column") gameState.mode = "row";
    else if (gameState.mode === "row") gameState.mode = "column";
    else gameState.mode = "column";
  },
};
