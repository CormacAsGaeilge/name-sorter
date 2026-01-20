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

let animationTick = 0;

const drawCapsule = (drawX: number, drawY: number, w: number, h: number) => {
  playdate.graphics.setColor(PlaydateColor.Black);
  playdate.graphics.setLineWidth(2);
  playdate.graphics.drawRoundRect(drawX, drawY, w, h, 10);
  playdate.graphics.setLineWidth(1);
};

const drawAnimatedCaret = (
  cx: number,
  cy: number,
  direction: "up" | "down" | "left" | "right",
) => {
  const size = 6;
  const bounce = Math.sin(animationTick * 0.15) * 3;
  playdate.graphics.setColor(PlaydateColor.Black);
  playdate.graphics.setLineWidth(2);
  let bx = cx,
    by = cy;
  if (direction === "left" || direction === "right") bx += bounce;
  else by += bounce;
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

const drawStartScreen = () => {
  playdate.graphics.drawText(`*NAME SORTER*`, 145, 60);

  playdate.graphics.drawText(`Press A to Start`, 135, 100);

  const instructionsY = 140;
  const lineHeight = 20;
  const leftX = 50;

  playdate.graphics.drawText(`Controls:`, leftX, instructionsY);
  playdate.graphics.drawText(
    `D-Pad: Move Cursor / Shift Row`,
    leftX,
    instructionsY + lineHeight,
  );
  playdate.graphics.drawText(
    `A: Claim Name`,
    leftX,
    instructionsY + lineHeight * 2,
  );
  playdate.graphics.drawText(
    `B: Switch Mode (Row/Column)`,
    leftX,
    instructionsY + lineHeight * 3,
  );
  playdate.graphics.drawText(
    `Crank: Shuffle Line`,
    leftX,
    instructionsY + lineHeight * 4,
  );
};

export const drawGame = () => {
  animationTick++;
  playdate.graphics.clear(PlaydateColor.White);

  // Setup globals once (Safe Optimization)
  playdate.graphics.setColor(PlaydateColor.Black);
  playdate.graphics.setImageDrawMode(PlaydateDrawMode.FillBlack);
  playdate.graphics.setFont(
    playdate.graphics.getSystemFont(PlaydateFontVariant.Normal),
  );

  // --- START SCREEN CHECK ---
  if (!gameState.started) {
    drawStartScreen();
    return;
  }

  // --- HUD ---
  if (gameState.gameOver) {
    playdate.graphics.drawText(`GAME OVER`, 150, 100);
    playdate.graphics.drawText(`Final Score: ${gameState.score}`, 140, 130);
    playdate.graphics.drawText(`Press A to Restart`, 130, 160);
    return;
  }

  playdate.graphics.drawText(`Score: ${gameState.score}`, 10, 10);
  playdate.graphics.drawText(`Mode: ${gameState.mode.toUpperCase()}`, 10, 30);

  const legendX = 260;
  playdate.graphics.drawText(`A: Claim Name`, legendX, 10);
  playdate.graphics.drawText(`B: Switch Mode`, legendX, 30);

  // Progress Bar
  const barX = GRID_OFFSET_X;
  const barY = GRID_OFFSET_Y + ROWS * CELL_HEIGHT + 25;
  const barWidth = COLS * CELL_WIDTH;
  const barHeight = 4;
  playdate.graphics.drawRect(barX, barY, barWidth, barHeight);
  const fillPercent = gameState.freezeTimer / gameState.freezeThreshold;
  const fillWidth = Math.floor(barWidth * fillPercent);
  if (fillWidth > 0)
    playdate.graphics.fillRect(barX, barY, fillWidth, barHeight);

  // Capsules
  for (const name of gameState.detectedNames) {
    drawCapsule(name.drawX, name.drawY, name.drawW, name.drawH);
  }

  // Carets
  if (gameState.mode === "row" || gameState.mode === "name") {
    const cy =
      GRID_OFFSET_Y + gameState.cursor.y * CELL_HEIGHT + CELL_HEIGHT / 2;
    drawAnimatedCaret(GRID_OFFSET_X - 15, cy, "right");
    drawAnimatedCaret(GRID_OFFSET_X + COLS * CELL_WIDTH + 15, cy, "left");
  }
  if (gameState.mode === "column" || gameState.mode === "name") {
    const cx = GRID_OFFSET_X + gameState.cursor.x * CELL_WIDTH + CELL_WIDTH / 2;
    drawAnimatedCaret(cx, GRID_OFFSET_Y - 8, "down");
    drawAnimatedCaret(cx, GRID_OFFSET_Y + ROWS * CELL_HEIGHT + 8, "up");
  }

  // --- GRID RENDER ---
  const textOffsetX = Math.floor((CELL_WIDTH - 12) / 2);
  const textOffsetY = Math.floor((CELL_HEIGHT - 14) / 2);

  for (let r = 0; r < ROWS; r++) {
    const cellY = GRID_OFFSET_Y + r * CELL_HEIGHT;
    const drawY = cellY + textOffsetY;
    const rowData = gameState.grid[r];

    for (let c = 0; c < COLS; c++) {
      const char = rowData[c];
      const cellX = GRID_OFFSET_X + c * CELL_WIDTH;

      if (char === FROZEN_CELL) {
        playdate.graphics.fillRect(
          cellX + 2,
          cellY + 2,
          CELL_WIDTH - 4,
          CELL_HEIGHT - 4,
        );
        if (c === gameState.cursor.x && r === gameState.cursor.y) {
          playdate.graphics.setColor(PlaydateColor.White);
          playdate.graphics.setLineWidth(2);
          playdate.graphics.drawRect(
            cellX + 4,
            cellY + 4,
            CELL_WIDTH - 8,
            CELL_HEIGHT - 8,
          );
          playdate.graphics.setLineWidth(1);
          playdate.graphics.setColor(PlaydateColor.Black);
        }
      } else {
        if (c === gameState.cursor.x && r === gameState.cursor.y) {
          playdate.graphics.setLineWidth(2);
          playdate.graphics.drawRect(
            cellX + 1,
            cellY + 1,
            CELL_WIDTH - 2,
            CELL_HEIGHT - 2,
          );
          playdate.graphics.setLineWidth(1);
        }

        // REVERTED: Using standard drawText
        playdate.graphics.drawText(char, cellX + textOffsetX, drawY);
      }
    }
  }

  // Particles
  playdate.graphics.setColor(PlaydateColor.Black);
  for (const p of gameState.particles) {
    playdate.graphics.fillRect(p.x, p.y, p.size, p.size);
  }
};
