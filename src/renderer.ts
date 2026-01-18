import {
  PlaydateColor,
  PlaydateDrawMode,
  PlaydateFontVariant,
} from "@crankscript/core";
import { gameState } from "./state";
import {
  ROWS,
  COLS,
  CELL_WIDTH,
  CELL_HEIGHT,
  GRID_OFFSET_X,
  GRID_OFFSET_Y,
  FROZEN_CELL,
} from "./constants";
import { NameInstance } from "./types";

// Global visual state for animation
let animationTick = 0;

// Helper: Draw a capsule around a found name
const drawCapsule = (name: NameInstance) => {
  // 1. Calculate Bounds
  const xs = name.cells.map((c) => c.x);
  const ys = name.cells.map((c) => c.y);
  const minCol = Math.min(...xs);
  const maxCol = Math.max(...xs);
  const minRow = Math.min(...ys);
  const maxRow = Math.max(...ys);

  // Convert to Pixel Coordinates
  const x = GRID_OFFSET_X + minCol * CELL_WIDTH;
  const y = GRID_OFFSET_Y + minRow * CELL_HEIGHT;

  // Width/Height based on span
  const padding = 2;
  const width = (maxCol - minCol + 1) * CELL_WIDTH - padding * 2;
  const height = (maxRow - minRow + 1) * CELL_HEIGHT - padding * 2;

  const drawX = x + padding;
  const drawY = y + padding;

  // 2. Draw Capsule
  playdate.graphics.setColor(PlaydateColor.Black);
  playdate.graphics.setLineWidth(2);
  playdate.graphics.drawRoundRect(drawX, drawY, width, height, 10);
  playdate.graphics.setLineWidth(1);
};

// Helper: Draw an animated caret (arrow)
const drawAnimatedCaret = (
  cx: number,
  cy: number,
  direction: "up" | "down" | "left" | "right",
) => {
  const size = 6;
  const bounce = Math.sin(animationTick * 0.15) * 3; // Smooth float

  playdate.graphics.setColor(PlaydateColor.Black);
  playdate.graphics.setLineWidth(2);

  let bx = cx;
  let by = cy;

  // Apply Bounce
  if (direction === "left" || direction === "right") bx += bounce;
  else by += bounce;

  // Draw Arrowhead
  if (direction === "right") {
    playdate.graphics.drawLine(bx, by - size, bx + size, by);
    playdate.graphics.drawLine(bx + size, by, bx, by + size);
  } else if (direction === "left") {
    playdate.graphics.drawLine(bx, by - size, bx - size, by);
    playdate.graphics.drawLine(bx - size, by, bx, by + size);
  } else if (direction === "down") {
    playdate.graphics.drawLine(bx - size, by, bx, by + size);
    playdate.graphics.drawLine(bx, by + size, bx + size, by);
  } else if (direction === "up") {
    playdate.graphics.drawLine(bx - size, by, bx, by - size);
    playdate.graphics.drawLine(bx, by - size, bx + size, by);
  }

  playdate.graphics.setLineWidth(1);
};

export const drawGame = () => {
  // Increment Animation Frame
  animationTick++;

  // 1. RESET GRAPHICS
  playdate.graphics.clear(PlaydateColor.White);
  playdate.graphics.setColor(PlaydateColor.Black);
  playdate.graphics.setImageDrawMode(PlaydateDrawMode.FillBlack);

  // --- GAME OVER ---
  if (gameState.gameOver) {
    playdate.graphics.drawText(`GAME OVER`, 150, 100);
    playdate.graphics.drawText(`Final Score: ${gameState.score}`, 140, 130);
    playdate.graphics.drawText(`Press A to Restart`, 130, 160);
    return;
  }

  // --- HUD ---
  playdate.graphics.drawText(`Score: ${gameState.score}`, 10, 10);
  playdate.graphics.drawText(`Mode: ${gameState.mode.toUpperCase()}`, 10, 30);

  // --- PROGRESS BAR ---
  // Moved down to +25 to avoid overlapping with the bottom caret
  const barX = GRID_OFFSET_X;
  const barY = GRID_OFFSET_Y + ROWS * CELL_HEIGHT + 25;
  const barWidth = COLS * CELL_WIDTH;
  const barHeight = 4;
  playdate.graphics.drawRect(barX, barY, barWidth, barHeight);

  const fillPercent = gameState.freezeTimer / gameState.freezeThreshold;
  const fillWidth = Math.floor(barWidth * fillPercent);
  if (fillWidth > 0) {
    playdate.graphics.fillRect(barX, barY, fillWidth, barHeight);
  }

  // --- LAYER 1: CAPSULES (Draw BELOW text) ---
  gameState.detectedNames.forEach((name) => {
    drawCapsule(name);
  });

  // --- LAYER 2: SELECTION INDICATORS (CARETS) ---
  if (gameState.mode === "row" || gameState.mode === "name") {
    const cy =
      GRID_OFFSET_Y + gameState.cursor.y * CELL_HEIGHT + CELL_HEIGHT / 2;
    // Side Carets (kept at 15px distance, looks good)
    drawAnimatedCaret(GRID_OFFSET_X - 15, cy, "right");
    drawAnimatedCaret(GRID_OFFSET_X + COLS * CELL_WIDTH + 15, cy, "left");
  }

  if (gameState.mode === "column" || gameState.mode === "name") {
    const cx = GRID_OFFSET_X + gameState.cursor.x * CELL_WIDTH + CELL_WIDTH / 2;

    // Top Caret: Moved from -15 to -8 to avoid "Mode" text
    drawAnimatedCaret(cx, GRID_OFFSET_Y - 8, "down");

    // Bottom Caret: Moved from +15 to +8 to stay tight to grid (Bar is now at +25)
    drawAnimatedCaret(cx, GRID_OFFSET_Y + ROWS * CELL_HEIGHT + 8, "up");
  }

  // --- LAYER 3: GRID CONTENT ---
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const char = gameState.grid[r][c];
      const cellX = GRID_OFFSET_X + c * CELL_WIDTH;
      const cellY = GRID_OFFSET_Y + r * CELL_HEIGHT;
      const isCursor = c === gameState.cursor.x && r === gameState.cursor.y;

      if (char === FROZEN_CELL) {
        // --- FROZEN BLOCK ---
        playdate.graphics.setColor(PlaydateColor.Black);
        playdate.graphics.fillRect(
          cellX + 2,
          cellY + 2,
          CELL_WIDTH - 4,
          CELL_HEIGHT - 4,
        );

        if (isCursor) {
          playdate.graphics.setColor(PlaydateColor.White);
          playdate.graphics.setLineWidth(2);
          playdate.graphics.drawRect(
            cellX + 4,
            cellY + 4,
            CELL_WIDTH - 8,
            CELL_HEIGHT - 8,
          );
          playdate.graphics.setLineWidth(1);
        }
      } else {
        // --- TEXT CELL ---
        playdate.graphics.setImageDrawMode(PlaydateDrawMode.FillBlack);
        playdate.graphics.setFont(
          playdate.graphics.getSystemFont(PlaydateFontVariant.Normal),
        );

        // Cursor Logic
        if (isCursor) {
          playdate.graphics.setLineWidth(2);
          playdate.graphics.setColor(PlaydateColor.Black);
          playdate.graphics.drawRect(
            cellX + 1,
            cellY + 1,
            CELL_WIDTH - 2,
            CELL_HEIGHT - 2,
          );
          playdate.graphics.setLineWidth(1);
        }

        // Centering Logic
        const [textW, textH] = playdate.graphics.getTextSize(char);
        const textX = cellX + (CELL_WIDTH - textW) / 2;
        const textY = cellY + (CELL_HEIGHT - textH) / 2;

        playdate.graphics.drawText(char, textX, textY);
      }
    }
  }
};
