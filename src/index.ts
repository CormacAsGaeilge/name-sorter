import {
  PlaydateColor,
  PlaydateDrawMode,
  PlaydateFontVariant,
} from "@crankscript/core";
import nameList from "./names";

// --- Constants ---
const ROWS = 5;
const COLS = 10;
const NAMES_TO_FIND = nameList;
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
let chaosCounter = 0;

// --- Helper Functions ---
const randomChar = () =>
  String.fromCharCode(65 + Math.floor(Math.random() * 26));

const initGrid = () => {
  grid = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => randomChar()),
  );
};

// Initialize the game
initGrid();

// --- Input Handling ---
// We define the handler to modify our global state variables directly
const inputHandler = {
  BButtonDown: () => {
    if (mode === "column") mode = "row";
    else if (mode === "row") mode = "column";
    else mode = "column"; // Default back to column from name mode
  },
  AButtonDown: () => {
    if (mode === "column" || mode === "row") {
      mode = "name"; // Switch to Name Selector
    } else if (mode === "name") {
      // Check logic
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
        // Scramble Logic
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
  leftButtonDown: () => {
    if (mode === "column") {
      cursor.x = (cursor.x - 1 + COLS) % COLS;
    } else if (mode === "row") {
      // Shift Row Left
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
      // Shift Row Right
      const last = grid[cursor.y].pop();
      if (last) grid[cursor.y].unshift(last);
    } else {
      cursor.x = (cursor.x + 1) % COLS;
    }
  },
  upButtonDown: () => {
    if (mode === "column") {
      // Shift Column Up
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
      // Shift Column Down
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

playdate.update = () => {
  playdate.graphics.clear(PlaydateColor.White);
  playdate.graphics.setFont(
    playdate.graphics.getSystemFont(PlaydateFontVariant.Bold),
  );
  // Chaos Mechanic: Every 360 frames (approx 12-18 seconds), change one random letter
  chaosCounter++;
  if (chaosCounter > 60) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    grid[r][c] = randomChar();
    chaosCounter = 0; // Reset timer
  }
  // Draw UI
  playdate.graphics.drawText(`Score: ${score}`, 10, 10);
  playdate.graphics.drawText(`Mode: ${mode.toUpperCase()}`, 10, 30);

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
        // Draw a black box background for the highlight
        playdate.graphics.setColor(PlaydateColor.Black);
        playdate.graphics.fillRect(x - 2, y - 2, 20, 20); // adjust size slightly for text

        // Draw white text on top
        playdate.graphics.setImageDrawMode(PlaydateDrawMode.FillWhite);
      } else {
        // Normal black text
        playdate.graphics.setImageDrawMode(PlaydateDrawMode.FillBlack);
      }

      playdate.graphics.drawText(char, x, y);
    }
  }
};
