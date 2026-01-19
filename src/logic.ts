import { gameState } from "./state";
import {
  ROWS,
  COLS,
  NAMES_TO_FIND,
  FROZEN_CELL,
  INITIAL_FREEZE_THRESHOLD,
  MIN_FREEZE_THRESHOLD,
  FREEZE_DECREMENT,
  GRID_OFFSET_X,
  GRID_OFFSET_Y,
  CELL_WIDTH,
  CELL_HEIGHT,
} from "./constants";
import { randomChar, shuffleArray, createInitialGrid } from "./grid";
import { NameInstance } from "./types";

// Helper: TSTL-safe zero-filled array creator
// Must be defined BEFORE the constants below use it.
const createZeroArray = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(0);
  }
  return arr;
};

// Static reuse buffers to prevent GC churn
// FIX: Use helper instead of new Array()
const ROW_USAGE = createZeroArray(COLS);
const COL_USAGE = createZeroArray(ROWS);

// Helper: Clear a buffer fast
const clearBuffer = (buf: number[]) => {
  for (let i = 0; i < buf.length; i++) buf[i] = 0;
};

// Helper: Check if two names intersect (Math-based, O(1))
const doNamesIntersect = (a: NameInstance, b: NameInstance) => {
  // 1. Parallel names (Row/Row or Col/Col) - Check 1D overlap
  if (a.isRow === b.isRow) {
    if (a.isRow) {
      // Both Rows
      if (a.r !== b.r) return false; // Different rows
      return a.c < b.c + b.len && a.c + a.len > b.c;
    } else {
      // Both Cols
      if (a.c !== b.c) return false; // Different cols
      return a.r < b.r + b.len && a.r + a.len > b.r;
    }
  }

  // 2. Perpendicular names (Row/Col) - Check intersection point
  const row = a.isRow ? a : b;
  const col = a.isRow ? b : a;

  const colX = col.c;
  const rowY = row.r;

  const colWithinRowSpan = colX >= row.c && colX < row.c + row.len;
  const rowWithinColSpan = rowY >= col.r && rowY < col.r + col.len;

  return colWithinRowSpan && rowWithinColSpan;
};

export const GameLogic = {
  spawnExplosion: (c: number, r: number) => {
    const centerX = GRID_OFFSET_X + c * CELL_WIDTH + CELL_WIDTH / 2;
    const centerY = GRID_OFFSET_Y + r * CELL_HEIGHT + CELL_HEIGHT / 2;

    const count = 8 + Math.floor(Math.random() * 4);
    for (let i = 0; i < count; i++) {
      gameState.particles.push({
        x: centerX,
        y: centerY,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        size: 1 + Math.floor(Math.random() * 3),
        life: 15 + Math.floor(Math.random() * 15),
      });
    }
  },

  updateParticles: () => {
    for (let i = gameState.particles.length - 1; i >= 0; i--) {
      const p = gameState.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      p.vy += 0.2;
      if (p.life <= 0) {
        gameState.particles.splice(i, 1);
      }
    }
  },

  recalculateBoldMask: () => {
    gameState.detectedNames = [];

    // Fast Clear State
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        gameState.boldMask[r][c] = false;
        gameState.intersections[r][c] = false;
      }
    }

    const allMatches: NameInstance[] = [];

    // --- SCAN ROWS ---
    for (let r = 0; r < ROWS; r++) {
      const rowStr = gameState.grid[r].join("");
      const rowMatches: NameInstance[] = [];

      for (const name of NAMES_TO_FIND) {
        if (name.length === 0) continue;
        let startIndex = 0;
        while ((startIndex = rowStr.indexOf(name, startIndex)) > -1) {
          rowMatches.push({
            text: name,
            r: r,
            c: startIndex,
            isRow: true,
            len: name.length,
          });
          startIndex += 1;
        }
      }

      // Filter (Max 1 overlap)
      if (rowMatches.length > 0) {
        rowMatches.sort((a, b) => b.len - a.len);
        clearBuffer(ROW_USAGE);

        for (const m of rowMatches) {
          let fits = true;
          // Check usage
          for (let i = 0; i < m.len; i++) {
            if (ROW_USAGE[m.c + i] >= 2) {
              fits = false;
              break;
            }
          }
          if (fits) {
            for (let i = 0; i < m.len; i++) ROW_USAGE[m.c + i]++;
            allMatches.push(m);
          }
        }
      }
    }

    // --- SCAN COLS ---
    for (let c = 0; c < COLS; c++) {
      let colStr = "";
      for (let r = 0; r < ROWS; r++) colStr += gameState.grid[r][c];

      const colMatches: NameInstance[] = [];

      for (const name of NAMES_TO_FIND) {
        if (name.length === 0) continue;
        let startIndex = 0;
        while ((startIndex = colStr.indexOf(name, startIndex)) > -1) {
          colMatches.push({
            text: name,
            r: startIndex,
            c: c,
            isRow: false, // Vertical
            len: name.length,
          });
          startIndex += 1;
        }
      }

      // Filter
      if (colMatches.length > 0) {
        colMatches.sort((a, b) => b.len - a.len);
        clearBuffer(COL_USAGE);

        for (const m of colMatches) {
          let fits = true;
          for (let i = 0; i < m.len; i++) {
            if (COL_USAGE[m.r + i] >= 2) {
              fits = false;
              break;
            }
          }
          if (fits) {
            for (let i = 0; i < m.len; i++) COL_USAGE[m.r + i]++;
            allMatches.push(m);
          }
        }
      }
    }

    gameState.detectedNames = allMatches;

    // --- UPDATE MASKS (Optimization: Direct Loop) ---
    // FIX: Use helper here too
    const intersectionCounts = createZeroArray(ROWS * COLS);

    for (const name of allMatches) {
      if (name.isRow) {
        for (let i = 0; i < name.len; i++) {
          const r = name.r;
          const c = name.c + i;
          gameState.boldMask[r][c] = true;
          intersectionCounts[r * COLS + c]++;
        }
      } else {
        for (let i = 0; i < name.len; i++) {
          const r = name.r + i;
          const c = name.c;
          gameState.boldMask[r][c] = true;
          intersectionCounts[r * COLS + c]++;
        }
      }
    }

    // Apply Intersections
    for (let i = 0; i < intersectionCounts.length; i++) {
      if (intersectionCounts[i] > 1) {
        const r = Math.floor(i / COLS);
        const c = i % COLS;
        gameState.intersections[r][c] = true;
      }
    }
  },

  checkNameMatch: () => {
    const { mode, cursor } = gameState;
    if (mode !== "name") {
      gameState.mode = "name";
      return;
    }

    // Find match at cursor
    const startMatch = gameState.detectedNames.find((n) => {
      if (n.isRow) {
        return n.r === cursor.y && cursor.x >= n.c && cursor.x < n.c + n.len;
      } else {
        return n.c === cursor.x && cursor.y >= n.r && cursor.y < n.r + n.len;
      }
    });

    if (!startMatch) return;

    // Chain Reaction
    const chain = new Set<NameInstance>();
    const queue = [startMatch];
    chain.add(startMatch);

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

    // Scoring & Removal
    let chainScore = 0;
    const cellsToClear = new Set<string>(); // "r,c" string

    chain.forEach((name) => {
      chainScore += name.len * 100;
      if (name.isRow) {
        for (let i = 0; i < name.len; i++)
          cellsToClear.add(`${name.r},${name.c + i}`);
      } else {
        for (let i = 0; i < name.len; i++)
          cellsToClear.add(`${name.r + i},${name.c}`);
      }
    });

    if (chain.size > 1) chainScore += (chain.size - 1) * 50;

    gameState.score += chainScore;
    gameState.freezeTimer = Math.floor(gameState.freezeTimer * 0.5);

    cellsToClear.forEach((key) => {
      const [rStr, cStr] = key.split(",");
      const r = parseInt(rStr);
      const c = parseInt(cStr);
      if (gameState.grid[r][c] !== FROZEN_CELL) {
        GameLogic.spawnExplosion(c, r);
        gameState.grid[r][c] = randomChar();
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
    gameState.particles = [];
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
        GameLogic.spawnExplosion(randomSpot.c, randomSpot.r);
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
