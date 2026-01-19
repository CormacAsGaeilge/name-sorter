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

// --- STATIC MEMORY BUFFERS ---
let INTERSECTION_COUNTS: number[] | null = null;
let ROW_USAGE: number[] | null = null;
let COL_USAGE: number[] | null = null;
let NAME_BUCKETS: string[][] | null = null;

const createZeroArray = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) arr.push(0);
  return arr;
};

const clearBuffer = (buf: number[]) => {
  for (let i = 0; i < buf.length; i++) buf[i] = 0;
};

// Init Buckets
const initBuckets = () => {
  if (NAME_BUCKETS) return;
  NAME_BUCKETS = [];
  for (let i = 0; i < 26; i++) NAME_BUCKETS.push([]);

  for (const name of NAMES_TO_FIND) {
    if (!name || name.length === 0) continue;
    const code = name.charCodeAt(0);
    let index = -1;
    if (code >= 65 && code <= 90) index = code - 65;
    else if (code >= 97 && code <= 122) index = code - 97;

    if (index >= 0) NAME_BUCKETS[index].push(name);
  }

  if (!INTERSECTION_COUNTS) INTERSECTION_COUNTS = createZeroArray(ROWS * COLS);
  if (!ROW_USAGE) ROW_USAGE = createZeroArray(COLS);
  if (!COL_USAGE) COL_USAGE = createZeroArray(ROWS);
};

const doNamesIntersect = (a: NameInstance, b: NameInstance) => {
  if (a.isRow === b.isRow) {
    if (a.isRow) {
      if (a.r !== b.r) return false;
      return a.c < b.c + b.len && a.c + a.len > b.c;
    } else {
      if (a.c !== b.c) return false;
      return a.r < b.r + b.len && a.r + a.len > b.r;
    }
  }
  const row = a.isRow ? a : b;
  const col = a.isRow ? b : a;
  const colX = col.c;
  const rowY = row.r;
  return (
    colX >= row.c &&
    colX < row.c + row.len &&
    rowY >= col.r &&
    rowY < col.r + col.len
  );
};

export const GameLogic = {
  spawnExplosion: (c: number, r: number) => {
    const centerX = GRID_OFFSET_X + c * CELL_WIDTH + CELL_WIDTH / 2;
    const centerY = GRID_OFFSET_Y + r * CELL_HEIGHT + CELL_HEIGHT / 2;
    const count = 5 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
      gameState.particles.push({
        x: centerX,
        y: centerY,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        size: 1 + Math.floor(Math.random() * 2),
        life: 10 + Math.floor(Math.random() * 10),
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
      if (p.life <= 0) gameState.particles.splice(i, 1);
    }
  },

  recalculateBoldMask: () => {
    if (!gameState.gridDirty) return;

    initBuckets();
    const buckets = NAME_BUCKETS!;
    const intersectionCounts = INTERSECTION_COUNTS!;
    const rowUsage = ROW_USAGE!;
    const colUsage = COL_USAGE!;

    gameState.detectedNames = [];
    clearBuffer(intersectionCounts);

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        gameState.boldMask[r][c] = false;
        gameState.intersections[r][c] = false;
      }
    }

    const allMatches: NameInstance[] = [];
    const padding = 2; // Pre-calc padding

    // --- SCAN ROWS ---
    for (let r = 0; r < ROWS; r++) {
      const rowStr = gameState.grid[r].join("");
      const rowMatches: NameInstance[] = [];

      const checkedBuckets = new Set<number>();
      for (let i = 0; i < rowStr.length; i++) {
        const code = rowStr.charCodeAt(i);
        let idx = -1;
        if (code >= 65 && code <= 90) idx = code - 65;

        if (idx >= 0 && !checkedBuckets.has(idx)) {
          checkedBuckets.add(idx);
          const bucket = buckets[idx];
          for (const name of bucket) {
            let startIndex = 0;
            while ((startIndex = rowStr.indexOf(name, startIndex)) > -1) {
              // OPTIMIZATION: Calculate render Rect HERE
              rowMatches.push({
                text: name,
                r: r,
                c: startIndex,
                isRow: true,
                len: name.length,
                drawX: GRID_OFFSET_X + startIndex * CELL_WIDTH + padding,
                drawY: GRID_OFFSET_Y + r * CELL_HEIGHT + padding,
                drawW: name.length * CELL_WIDTH - padding * 2,
                drawH: CELL_HEIGHT - padding * 2,
              });
              startIndex += 1;
            }
          }
        }
      }

      if (rowMatches.length > 0) {
        rowMatches.sort((a, b) => b.len - a.len);
        clearBuffer(rowUsage);
        for (const m of rowMatches) {
          let fits = true;
          for (let i = 0; i < m.len; i++) {
            if (rowUsage[m.c + i] >= 2) {
              fits = false;
              break;
            }
          }
          if (fits) {
            for (let i = 0; i < m.len; i++) rowUsage[m.c + i]++;
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
      const checkedBuckets = new Set<number>();

      for (let i = 0; i < colStr.length; i++) {
        const code = colStr.charCodeAt(i);
        let idx = -1;
        if (code >= 65 && code <= 90) idx = code - 65;

        if (idx >= 0 && !checkedBuckets.has(idx)) {
          checkedBuckets.add(idx);
          const bucket = buckets[idx];
          for (const name of bucket) {
            let startIndex = 0;
            while ((startIndex = colStr.indexOf(name, startIndex)) > -1) {
              // OPTIMIZATION: Calculate render Rect HERE
              colMatches.push({
                text: name,
                r: startIndex,
                c: c,
                isRow: false,
                len: name.length,
                drawX: GRID_OFFSET_X + c * CELL_WIDTH + padding,
                drawY: GRID_OFFSET_Y + startIndex * CELL_HEIGHT + padding,
                drawW: CELL_WIDTH - padding * 2,
                drawH: name.length * CELL_HEIGHT - padding * 2,
              });
              startIndex += 1;
            }
          }
        }
      }

      if (colMatches.length > 0) {
        colMatches.sort((a, b) => b.len - a.len);
        clearBuffer(colUsage);
        for (const m of colMatches) {
          let fits = true;
          for (let i = 0; i < m.len; i++) {
            if (colUsage[m.r + i] >= 2) {
              fits = false;
              break;
            }
          }
          if (fits) {
            for (let i = 0; i < m.len; i++) colUsage[m.r + i]++;
            allMatches.push(m);
          }
        }
      }
    }

    gameState.detectedNames = allMatches;

    // Update Visual Masks
    for (const name of allMatches) {
      if (name.isRow) {
        for (let i = 0; i < name.len; i++) {
          gameState.boldMask[name.r][name.c + i] = true;
          intersectionCounts[name.r * COLS + (name.c + i)]++;
        }
      } else {
        for (let i = 0; i < name.len; i++) {
          gameState.boldMask[name.r + i][name.c] = true;
          intersectionCounts[(name.r + i) * COLS + name.c]++;
        }
      }
    }

    for (let i = 0; i < intersectionCounts.length; i++) {
      if (intersectionCounts[i] > 1) {
        const r = Math.floor(i / COLS);
        const c = i % COLS;
        gameState.intersections[r][c] = true;
      }
    }

    gameState.gridDirty = false;
  },

  checkNameMatch: () => {
    const { mode, cursor } = gameState;
    if (mode !== "name") {
      gameState.mode = "name";
      return;
    }

    const startMatch = gameState.detectedNames.find((n) => {
      if (n.isRow)
        return n.r === cursor.y && cursor.x >= n.c && cursor.x < n.c + n.len;
      else return n.c === cursor.x && cursor.y >= n.r && cursor.y < n.r + n.len;
    });

    if (!startMatch) return;

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

    let chainScore = 0;
    const cellsToClear = new Set<string>();

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

    gameState.gridDirty = true;
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
    gameState.gridDirty = true;
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

        gameState.gridDirty = true;
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
      gameState.gridDirty = true;
      GameLogic.recalculateBoldMask();
    }
  },

  handleLeft: () => {
    if (gameState.mode === "column") {
      gameState.cursor.x = (gameState.cursor.x - 1 + COLS) % COLS;
    } else if (gameState.mode === "row") {
      const first = gameState.grid[gameState.cursor.y].shift();
      if (first) gameState.grid[gameState.cursor.y].push(first);
      gameState.gridDirty = true;
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
      gameState.gridDirty = true;
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
      gameState.gridDirty = true;
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
      gameState.gridDirty = true;
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
