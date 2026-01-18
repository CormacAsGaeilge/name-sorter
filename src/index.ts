import { PlaydateColor, PlaydateDrawMode } from "@crankscript/core";
import {
  ROWS,
  COLS,
  NAMES_TO_FIND,
  CELL_WIDTH,
  CELL_HEIGHT,
  GRID_OFFSET_X,
  GRID_OFFSET_Y,
} from "./constants";

// NEW IMPORTS
import { gameState } from "./state";

// --- Helper Functions ---
const randomChar = () =>
  String.fromCharCode(65 + Math.floor(Math.random() * 26));

const initGrid = () => {
  // Update state directly
  gameState.grid = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => randomChar()),
  );
};

const shuffleArray = (array: string[]) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// Initialize the game
initGrid();

// --- Input Handling ---
const inputHandler = {
  BButtonDown: () => {
    // Access state via gameState
    if (gameState.mode === "column") gameState.mode = "row";
    else if (gameState.mode === "row") gameState.mode = "column";
    else gameState.mode = "column";
  },
  AButtonDown: () => {
    const { mode, grid, cursor } = gameState; // Destructure for cleaner reading

    if (mode === "column" || mode === "row") {
      gameState.mode = "name";
    } else if (mode === "name") {
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
        // Force mode reset if successful to keep game flowing
        gameState.mode = "column";
      }
    }
  },
  cranked: (change: number, acceleratedChange: number) => {
    gameState.crankAccumulator += change;

    if (Math.abs(gameState.crankAccumulator) >= 360) {
      // Logic for 360 rotation...
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
  leftButtonDown: () => {
    if (gameState.mode === "column") {
      gameState.cursor.x = (gameState.cursor.x - 1 + COLS) % COLS;
    } else if (gameState.mode === "row") {
      const first = gameState.grid[gameState.cursor.y].shift();
      if (first) gameState.grid[gameState.cursor.y].push(first);
    } else {
      gameState.cursor.x = (gameState.cursor.x - 1 + COLS) % COLS;
    }
  },
  rightButtonDown: () => {
    if (gameState.mode === "column") {
      gameState.cursor.x = (gameState.cursor.x + 1) % COLS;
    } else if (gameState.mode === "row") {
      const last = gameState.grid[gameState.cursor.y].pop();
      if (last) gameState.grid[gameState.cursor.y].unshift(last);
    } else {
      gameState.cursor.x = (gameState.cursor.x + 1) % COLS;
    }
  },
  upButtonDown: () => {
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
  downButtonDown: () => {
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

playdate.inputHandlers.push(inputHandler as any);

// --- Main Render Loop ---
playdate.update = () => {
  playdate.graphics.clear(PlaydateColor.White);

  gameState.chaosCounter++;
  if (gameState.chaosCounter > 300) {
    for (let c = 0; c < COLS; c++) {
      gameState.grid[ROWS - 1][c] = randomChar();
    }
    gameState.chaosCounter = 0;
  }

  // Draw UI
  playdate.graphics.drawText(`Score: ${gameState.score}`, 10, 10);
  playdate.graphics.drawText(`Mode: ${gameState.mode.toUpperCase()}`, 10, 30);

  if (Math.abs(gameState.crankAccumulator) > 10) {
    playdate.graphics.drawText(
      `Crank: ${Math.floor(Math.abs(gameState.crankAccumulator))}`,
      200,
      10,
    );
  }

  // Draw Grid
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

      if (isHighlighted) {
        playdate.graphics.setColor(PlaydateColor.Black);
        playdate.graphics.fillRect(x - 2, y - 2, 20, 20);
        playdate.graphics.setImageDrawMode(PlaydateDrawMode.FillWhite);
      } else {
        playdate.graphics.setImageDrawMode(PlaydateDrawMode.FillBlack);
      }

      playdate.graphics.drawText(char, x, y);
    }
  }
};
