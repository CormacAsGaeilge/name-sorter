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

// Helper: Calculate overlap count between two instances (assumed same row/col)
const calculateOverlap = (a: NameInstance, b: NameInstance) => {
  let overlap = 0;
  for (const cellA of a.cells) {
    for (const cellB of b.cells) {
      if (cellA.x === cellB.x && cellA.y === cellB.y) overlap++;
    }
  }
  return overlap;
};

// Helper: Filter matches based on the "Max 1 Char Overlap" Rule
const filterMatches = (matches: NameInstance[]) => {
  // Sort by length DESC (Longer words take priority)
  matches.sort((a, b) => b.text.length - a.text.length);

  const accepted: NameInstance[] = [];

  for (const candidate of matches) {
    let rejected = false;
    for (const existing of accepted) {
      const overlap = calculateOverlap(candidate, existing);
      // RULE: If overlap > 1, reject the shorter one (candidate)
      if (overlap > 1) {
        rejected = true;
        break;
      }
    }
    if (!rejected) {
      accepted.push(candidate);
    }
  }
  return accepted;
};

export const GameLogic = {
  recalculateBoldMask: () => {
    // 1. Reset State
    gameState.detectedNames = [];
    const cellCounts = Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => 0),
    );

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        gameState.boldMask[r][c] = false;
        gameState.intersections[r][c] = false;
      }
    }

    const allMatches: NameInstance[] = [];

    // 2. Scan Rows
    for (let r = 0; r < ROWS; r++) {
      const rowStr = gameState.grid[r].join("");
      const rowMatches: NameInstance[] = [];

      NAMES_TO_FIND.forEach((name) => {
        let startIndex = 0;
        while ((startIndex = rowStr.indexOf(name, startIndex)) > -1) {
          const instance: NameInstance = {
            text: name,
            cells: [],
            id: `R-${r}-${startIndex}-${name}`,
          };
          for (let i = 0; i < name.length; i++) {
            instance.cells.push({ x: startIndex + i, y: r });
          }
          rowMatches.push(instance);
          startIndex += 1;
        }
      });

      // Apply Filter Rule per row
      allMatches.push(...filterMatches(rowMatches));
    }

    // 3. Scan Columns
    for (let c = 0; c < COLS; c++) {
      const colStr = gameState.grid.map((row) => row[c]).join("");
      const colMatches: NameInstance[] = [];

      NAMES_TO_FIND.forEach((name) => {
        let startIndex = 0;
        while ((startIndex = colStr.indexOf(name, startIndex)) > -1) {
          const instance: NameInstance = {
            text: name,
            cells: [],
            id: `C-${c}-${startIndex}-${name}`,
          };
          for (let i = 0; i < name.length; i++) {
            instance.cells.push({ x: c, y: startIndex + i });
          }
          colMatches.push(instance);
          startIndex += 1;
        }
      });

      // Apply Filter Rule per column
      allMatches.push(...filterMatches(colMatches));
    }

    // 4. Update State based on filtered matches
    gameState.detectedNames = allMatches;

    allMatches.forEach((name) => {
      name.cells.forEach((cell) => {
        gameState.boldMask[cell.y][cell.x] = true;
        cellCounts[cell.y][cell.x]++;
      });
    });

    // 5. Identify Intersections (Cells used by > 1 valid name)
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (cellCounts[r][c] > 1) {
          gameState.intersections[r][c] = true;
        }
      }
    }
  },

  checkNameMatch: () => {
    const { mode, cursor } = gameState;

    if (mode !== "name") {
      gameState.mode = "name";
      return;
    }

    // Find names directly under the cursor
    const directMatches = gameState.detectedNames.filter((n) =>
      n.cells.some((c) => c.x === cursor.x && c.y === cursor.y),
    );

    if (directMatches.length === 0) return;

    // Chain Reaction Logic
    const chain = new Set<NameInstance>(directMatches);
    const queue = [...directMatches];

    while (queue.length > 0) {
      const current = queue.pop()!;
      for (const candidate of gameState.detectedNames) {
        if (!chain.has(candidate)) {
          if (doNamesIntersect(current, candidate)) {
            chain.add(candidate);
            queue.push(candidate);
          }
        }
      }
    }

    // Scoring
    const cellsToScramble = new Set<string>();
    let chainScore = 0;

    chain.forEach((name) => {
      chainScore += name.text.length * 100;
      name.cells.forEach((c) => cellsToScramble.add(`${c.x},${c.y}`));
    });

    if (chain.size > 1) chainScore += (chain.size - 1) * 50;

    gameState.score += chainScore;

    cellsToScramble.forEach((key) => {
      const [xStr, yStr] = key.split(",");
      const x = parseInt(xStr);
      const y = parseInt(yStr);
      if (gameState.grid[y][x] !== FROZEN_CELL) {
        gameState.grid[y][x] = randomChar();
      }
    });

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
          if (gameState.grid[r][c] !== FROZEN_CELL) validSpots.push({ r, c });
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
