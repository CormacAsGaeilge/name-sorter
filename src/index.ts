import {
  PlaydateColor,
  PlaydateDrawMode,
  PlaydateFontVariant,
} from "@crankscript/core";

// Import from the names.ts file you created
import { names } from "./names";

// --- Constants ---
const ROWS = 5;
const COLS = 10;
const NAMES_TO_FIND = names.map((name) => name.toUpperCase());
const CELL_WIDTH = 30;
const CELL_HEIGHT = 30;
const GRID_OFFSET_X = 50;
const GRID_OFFSET_Y = 60;

// --- State Definitions ---
type Mode = "column" | "row" | "name";

let grid: string[][] = [];
let mode: Mode = "column";
let cursor = { x: 0, y: 0 };
let score = 0;

// New state for tracking crank rotation
let crankAccumulator = 0;
// Optional: Chaos counter if you want tiles to randomise over time
let chaosCounter = 0;

// --- Helper Functions ---
const randomChar = () =>
  String.fromCharCode(65 + Math.floor(Math.random() * 26));

const initGrid = () => {
  grid = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => randomChar()),
  );
};

// Helper to shuffle an array (Fisher-Yates algorithm)
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
    if (mode === "column") mode = "row";
    else if (mode === "row") mode = "column";
    else mode = "column";
  },
  AButtonDown: () => {
    if (mode === "column" || mode === "row") {
      mode = "name";
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
        score += 100;
        if (foundRow) {
          grid[cursor.y] = Array.from({ length: COLS }, () => randomChar());
        }
        if (foundCol) {
          for (let r = 0; r < ROWS; r++) {
            grid[r][cursor.x] = randomChar();
          }
        }
      }
    }
  },
  // --- NEW: Crank Handler ---
  cranked: (change: number, acceleratedChange: number) => {
    // 'change' is the angle in degrees moved since the last frame
    crankAccumulator += change;

    // Check if we have rotated 360 degrees (either direction)
    if (Math.abs(crankAccumulator) >= 360) {
      crankAccumulator = 0; // Reset the accumulator

      // Shuffle based on the current mode
      if (mode === "row") {
        // Shuffle the selected row
        grid[cursor.y] = shuffleArray(grid[cursor.y]);
      } else if (mode === "column") {
        // Shuffle the selected column
        const col = grid.map((row) => row[cursor.x]);
        const shuffledCol = shuffleArray(col);

        // Write the shuffled column back to the grid
        for (let r = 0; r < ROWS; r++) {
          grid[r][cursor.x] = shuffledCol[r];
        }
      }
    }
  },
  leftButtonDown: () => {
    if (mode === "column") {
      cursor.x = (cursor.x - 1 + COLS) % COLS;
    } else if (mode === "row") {
      const first = grid[cursor.y].shift();
      if (first) grid[cursor.y].push(first);
    } else {
      cursor.x = (cursor.x - 1 + COLS) % COLS;
    }
  },
  rightButtonDown: () => {
    if (mode === "column") {
      cursor.x = (cursor.x + 1) % COLS;
    } else if (mode === "row") {
      const last = grid[cursor.y].pop();
      if (last) grid[cursor.y].unshift(last);
    } else {
      cursor.x = (cursor.x + 1) % COLS;
    }
  },
  upButtonDown: () => {
    if (mode === "column") {
      const topChar = grid[0][cursor.x];
      for (let r = 0; r < ROWS - 1; r++) {
        grid[r][cursor.x] = grid[r + 1][cursor.x];
      }
      grid[ROWS - 1][cursor.x] = topChar;
    } else {
      cursor.y = (cursor.y - 1 + ROWS) % ROWS;
    }
  },
  downButtonDown: () => {
    if (mode === "column") {
      const bottomChar = grid[ROWS - 1][cursor.x];
      for (let r = ROWS - 1; r > 0; r--) {
        grid[r][cursor.x] = grid[r - 1][cursor.x];
      }
      grid[0][cursor.x] = bottomChar;
    } else {
      cursor.y = (cursor.y + 1) % ROWS;
    }
  },
};

// Register the inputs
playdate.inputHandlers.push(inputHandler as any);

// --- Main Render Loop ---
playdate.update = () => {
  playdate.graphics.clear(PlaydateColor.White);

  // Entropy Logic: Randomly flip a tile every ~2 seconds
  chaosCounter++;
  if (chaosCounter > 300) {
    // Loop through every column in the last row (ROWS - 1)
    for (let c = 0; c < COLS; c++) {
      grid[ROWS - 1][c] = randomChar();
    }
    chaosCounter = 0; // Reset timer
  }

  // Draw UI
  playdate.graphics.drawText(`Score: ${score}`, 10, 10);
  playdate.graphics.drawText(`Mode: ${mode.toUpperCase()}`, 10, 30);

  // Draw Crank Indicator if accumulation is happening
  if (Math.abs(crankAccumulator) > 10) {
    playdate.graphics.drawText(
      `Crank: ${Math.floor(Math.abs(crankAccumulator))}`,
      200,
      10,
    );
  }

  // Draw Grid
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const char = grid[r][c];
      const x = GRID_OFFSET_X + c * CELL_WIDTH;
      const y = GRID_OFFSET_Y + r * CELL_HEIGHT;

      // Determine if highlighted
      let isHighlighted = false;
      if (mode === "column" && c === cursor.x) isHighlighted = true;
      if (mode === "row" && r === cursor.y) isHighlighted = true;
      if (mode === "name" && r === cursor.y && c === cursor.x)
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
