import { gameState } from "./state";
import { ROWS, COLS, NAMES_TO_FIND } from "./constants"; //
import { randomChar, shuffleArray } from "./grid";

export const GameLogic = {
  toggleMode: () => {
    if (gameState.mode === "column") gameState.mode = "row";
    else if (gameState.mode === "row") gameState.mode = "column";
    else gameState.mode = "column";
  },

  checkNameMatch: () => {
    const { mode, grid, cursor } = gameState;

    if (mode === "column" || mode === "row") {
      gameState.mode = "name";
      return;
    }

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
        gameState.mode = "column";
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
    }
  },

  updateChaos: () => {
    gameState.chaosCounter++;
    if (gameState.chaosCounter > 300) {
      for (let c = 0; c < COLS; c++) {
        gameState.grid[ROWS - 1][c] = randomChar();
      }
      gameState.chaosCounter = 0;
    }
  },

  // Navigation Logic
  handleLeft: () => {
    if (gameState.mode === "column") {
      gameState.cursor.x = (gameState.cursor.x - 1 + COLS) % COLS;
    } else if (gameState.mode === "row") {
      const first = gameState.grid[gameState.cursor.y].shift();
      if (first) gameState.grid[gameState.cursor.y].push(first);
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
    } else {
      gameState.cursor.y = (gameState.cursor.y + 1) % ROWS;
    }
  },
};
