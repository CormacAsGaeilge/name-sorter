import { gameState } from "../state";
import { MatchingLogic } from "./matching";
import { ROWS, COLS, FROZEN_CELL, CELL_WIDTH, CELL_HEIGHT } from "../constants";
import { randomChar } from "../grid";
import { SoundManager } from "../sound"; // <--- IMPORT

export const Controls = {
  handleLeft: () => {
    SoundManager.playMove(); // <--- TRIGGER SOUND
    if (gameState.mode === "column") {
      gameState.cursor.x = (gameState.cursor.x - 1 + COLS) % COLS;
    } else if (gameState.mode === "row") {
      // ... (Rest of function logic remains identical)
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
    SoundManager.playMove(); // <--- TRIGGER SOUND
    if (gameState.mode === "column") {
      gameState.cursor.x = (gameState.cursor.x + 1) % COLS;
    } else if (gameState.mode === "row") {
      // ... (Rest of function logic remains identical)
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
    SoundManager.playMove(); // <--- TRIGGER SOUND
    if (gameState.mode === "column") {
      // ... (Rest of function logic remains identical)
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
    SoundManager.playMove(); // <--- TRIGGER SOUND
    if (gameState.mode === "column") {
      // ... (Rest of function logic remains identical)
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
    SoundManager.playModeSwitch(); // <--- TRIGGER SOUND
    if (gameState.mode === "column") gameState.mode = "row";
    else if (gameState.mode === "row") gameState.mode = "column";
    else gameState.mode = "column";
  },

  processCrank: (change: number) => {
    // Crank sound is tricky; usually handled by a looping sample.
    // For now, we can play a click every 45 degrees or so if desired,
    // but often silence is golden for the crank unless it's "ratcheting".
    gameState.crankAccumulator += change;
    if (Math.abs(gameState.crankAccumulator) >= 360) {
      if (gameState.crankAccumulator > 0) gameState.crankAccumulator -= 360;
      else gameState.crankAccumulator += 360;

      // ... (Rest of crank logic)
      const { mode, cursor, grid } = gameState;
      if (mode === "row") {
        // ...
      } else if (mode === "column") {
        // ...
      }
      MatchingLogic.markDirty();
      SoundManager.playMove(); // <--- Sound on successful crank rotation
    }
  },
};
