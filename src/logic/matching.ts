import { gameState } from "../state";
import {
  ROWS,
  COLS,
  NAMES_TO_FIND,
  GRID_OFFSET_X,
  GRID_OFFSET_Y,
  CELL_WIDTH,
  CELL_HEIGHT,
} from "../constants";
import { NameInstance } from "../types";

// Static Buffers
let INTERSECTION_COUNTS: number[] | null = null;
let ROW_USAGE: number[] | null = null;
let COL_USAGE: number[] | null = null;
let NAME_BUCKETS: string[][] | null = null;
let NAME_MASKS: number[] | null = null;

const createZeroArray = (len: number) => Array(len).fill(0);
const clearBuffer = (buf: number[]) => buf.fill(0);

const getCharMask = (str: string) => {
  let mask = 0;
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    let bit = -1;
    if (code >= 65 && code <= 90) bit = code - 65;
    else if (code >= 97 && code <= 122) bit = code - 97;
    if (bit >= 0) mask |= 1 << bit;
  }
  return mask;
};

const initBuffers = () => {
  if (NAME_BUCKETS) return;
  NAME_BUCKETS = Array.from({ length: 26 }, () => []);
  NAME_MASKS = [];

  for (const name of NAMES_TO_FIND) {
    if (!name) {
      NAME_MASKS.push(0);
      continue;
    }
    const code = name.charCodeAt(0);
    let index = -1;
    if (code >= 65 && code <= 90) index = code - 65;
    else if (code >= 97 && code <= 122) index = code - 97;
    if (index >= 0) NAME_BUCKETS[index].push(name);
    NAME_MASKS.push(getCharMask(name));
  }

  if (!INTERSECTION_COUNTS) INTERSECTION_COUNTS = createZeroArray(ROWS * COLS);
  if (!ROW_USAGE) ROW_USAGE = createZeroArray(COLS);
  if (!COL_USAGE) COL_USAGE = createZeroArray(ROWS);
};

export const MatchingLogic = {
  markDirty: () => {
    gameState.gridDirty = true;
    gameState.lastInteractionTime = playdate.getCurrentTimeMilliseconds();
    gameState.detectedNames = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        gameState.boldMask[r][c] = false;
        gameState.intersections[r][c] = false;
      }
    }
  },

  recalculateBoldMask: () => {
    initBuffers();
    const buckets = NAME_BUCKETS!;
    const intersectionCounts = INTERSECTION_COUNTS!;
    const rowUsage = ROW_USAGE!;
    const colUsage = COL_USAGE!;

    gameState.detectedNames = [];
    clearBuffer(intersectionCounts);

    const allMatches: NameInstance[] = [];
    const padding = 2;

    // --- SCAN ROWS ---
    for (let r = 0; r < ROWS; r++) {
      const rowStr = gameState.grid[r].join("");
      const rowMask = getCharMask(rowStr);
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
            const nMask = getCharMask(name);
            if ((rowMask & nMask) !== nMask) continue;

            let startIndex = 0;
            while ((startIndex = rowStr.indexOf(name, startIndex)) > -1) {
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
                mask: nMask,
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
      const colMask = getCharMask(colStr);
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
            const nMask = getCharMask(name);
            if ((colMask & nMask) !== nMask) continue;

            let startIndex = 0;
            while ((startIndex = colStr.indexOf(name, startIndex)) > -1) {
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
                mask: nMask,
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

  doNamesIntersect: (a: NameInstance, b: NameInstance) => {
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
  },
};
