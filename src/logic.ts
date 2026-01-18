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
import { NameInstance, Point } from "./types";

// Helper: Check if two names intersect (share any cell)
const doNamesIntersect = (a: NameInstance, b: NameInstance) => {
  for (const cellA of a.cells) {
    for (const cellB of b.cells) {
      if (cellA.x === cellB.x && cellA.y === cellB.y) return true;
    }
  }
  return false;
};

export const GameLogic = {
  recalculateBoldMask: () => {
    // 1. Reset State
    gameState.detectedNames = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        gameState.boldMask[r][c] = false;
      }
    }

    // 2. Scan Rows for Names
    for (let r = 0; r < ROWS; r++) {
      const rowStr = gameState.grid[r].join("");
      NAMES_TO_FIND.forEach((name) => {
        let startIndex = 0;
        while ((startIndex = rowStr.indexOf(name, startIndex)) > -1) {
          // Create Name Instance
          const instance: NameInstance = {
            text: name,
            cells: [],
            id: `R-${r}-${startIndex}-${name}`,
          };

          // Mark cells
          for (let i = 0; i < name.length; i++) {
            const c = startIndex + i;
            instance.cells.push({ x: c, y: r });
            gameState.boldMask[r][c] = true; // Update visual mask
          }
          gameState.detectedNames.push(instance);
          startIndex += 1;
        }
      });
    }

    // 3. Scan Columns for Names
    for (let c = 0; c < COLS; c++) {
      const colStr = gameState.grid.map((row) => row[c]).join("");
      NAMES_TO_FIND.forEach((name) => {
        let startIndex = 0;
        while ((startIndex = colStr.indexOf(name, startIndex)) > -1) {
          const instance: NameInstance = {
            text: name,
            cells: [],
            id: `C-${c}-${startIndex}-${name}`,
          };

          for (let i = 0; i < name.length; i++) {
            const r = startIndex + i;
            instance.cells.push({ x: c, y: r });
            gameState.boldMask[r][c] = true;
          }
          gameState.detectedNames.push(instance);
          startIndex += 1;
        }
      });
    }
  },

  checkNameMatch: () => {
    const { mode, cursor } = gameState;

    // Auto-switch mode
    if (mode !== "name") {
      gameState.mode = "name";
      return;
    }

    // 1. Find names directly under the cursor
    const directMatches = gameState.detectedNames.filter((n) =>
      n.cells.some((c) => c.x === cursor.x && c.y === cursor.y),
    );

    if (directMatches.length === 0) return; // No name here

    // 2. Chain Reaction: Find all connected names
    const chain = new Set<NameInstance>(directMatches);
    const queue = [...directMatches];

    while (queue.length > 0) {
      const current = queue.pop()!;

      // Check all other names to see if they touch 'current'
      for (const candidate of gameState.detectedNames) {
        if (!chain.has(candidate)) {
          if (doNamesIntersect(current, candidate)) {
            chain.add(candidate);
            queue.push(candidate); // Add to queue to find its neighbors too
          }
        }
      }
    }

    // 3. Apply Scoring and Scrambling
    const cellsToScramble = new Set<string>(); // Use string "x,y" to deduplicate
    let chainScore = 0;

    chain.forEach((name) => {
      // Score Formula: Length * 100
      chainScore += name.text.length * 100;

      // Mark cells for scrambling
      name.cells.forEach((c) => cellsToScramble.add(`${c.x},${c.y}`));
    });

    // Add bonus for chain length (e.g. 50pts per extra name)
    if (chain.size > 1) {
      chainScore += (chain.size - 1) * 50;
    }

    gameState.score += chainScore;

    // 4. Scramble the specific cells
    cellsToScramble.forEach((key) => {
      const [xStr, yStr] = key.split(",");
      const x = parseInt(xStr);
      const y = parseInt(yStr);
      // Don't overwrite frozen cells
      if (gameState.grid[y][x] !== FROZEN_CELL) {
        gameState.grid[y][x] = randomChar();
      }
    });

    // 5. Refresh
    GameLogic.recalculateBoldMask();
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
