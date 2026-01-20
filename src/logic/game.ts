import { gameState } from "../state";
import {
  INITIAL_FREEZE_THRESHOLD,
  MIN_FREEZE_THRESHOLD,
  FREEZE_DECREMENT,
  FROZEN_CELL,
  ROWS,
  COLS,
} from "../constants";
import { createInitialGrid, randomChar } from "../grid";
import { MatchingLogic } from "./matching";
import { ParticleSystem } from "./particles";
import { NameInstance } from "../types";

export const GameLifecycle = {
  startGame: () => {
    gameState.started = true;
    GameLifecycle.resetGame();
  },

  resetGame: () => {
    gameState.grid = createInitialGrid();
    gameState.score = 0;
    gameState.gameOver = false;
    gameState.started = true;
    gameState.freezeTimer = 0;
    gameState.freezeThreshold = INITIAL_FREEZE_THRESHOLD;
    gameState.cursor = { x: 0, y: 0 };
    gameState.particles = [];
    MatchingLogic.markDirty();
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
        ParticleSystem.spawnExplosion(randomSpot.c, randomSpot.r);
        MatchingLogic.markDirty();
        if (validSpots.length === 1) gameState.gameOver = true;
      } else {
        gameState.gameOver = true;
      }
    }
  },

  checkNameMatch: () => {
    if (gameState.gridDirty) MatchingLogic.recalculateBoldMask();

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
          if (MatchingLogic.doNamesIntersect(current, candidate)) {
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
        ParticleSystem.spawnExplosion(c, r);
        gameState.grid[r][c] = randomChar();
      }
    });

    MatchingLogic.markDirty();
    MatchingLogic.recalculateBoldMask();
  },

  tick: () => {
    ParticleSystem.updateParticles();
    const DEBOUNCE_DELAY = 150;
    if (gameState.gridDirty) {
      const now = playdate.getCurrentTimeMilliseconds();
      if (now - gameState.lastInteractionTime > DEBOUNCE_DELAY) {
        MatchingLogic.recalculateBoldMask();
      }
    }
  },
};
