import {
  PlaydateColor,
  PlaydateDrawMode,
  PlaydateFontVariant,
} from "@crankscript/core";
import { gameState } from "../state";
import { ElementsRenderer } from "./elements";
import { UIRenderer } from "./ui";
import { GridRenderer } from "./grid";
import {
  GRID_OFFSET_X,
  GRID_OFFSET_Y,
  COLS,
  ROWS,
  CELL_WIDTH,
  CELL_HEIGHT,
} from "../constants";

export const drawGame = () => {
  playdate.graphics.clear(PlaydateColor.White);
  playdate.graphics.setColor(PlaydateColor.Black);
  playdate.graphics.setImageDrawMode(PlaydateDrawMode.FillBlack);
  playdate.graphics.setFont(
    playdate.graphics.getSystemFont(PlaydateFontVariant.Normal),
  );

  if (!gameState.started) {
    UIRenderer.drawStartScreen();
    return;
  }

  UIRenderer.drawHUD();

  for (const name of gameState.detectedNames) {
    ElementsRenderer.drawCapsule(
      name.drawX,
      name.drawY,
      name.drawW,
      name.drawH,
    );
  }

  // --- CHANGED: Use visualCursor for smooth caret movement ---
  const { visualCursor } = gameState;

  if (gameState.mode === "row" || gameState.mode === "name") {
    // Carets follow Y smoothly
    const cy = GRID_OFFSET_Y + visualCursor.y * CELL_HEIGHT + CELL_HEIGHT / 2;
    ElementsRenderer.drawAnimatedCaret(GRID_OFFSET_X - 15, cy, "right");
    ElementsRenderer.drawAnimatedCaret(
      GRID_OFFSET_X + COLS * CELL_WIDTH + 15,
      cy,
      "left",
    );
  }
  if (gameState.mode === "column" || gameState.mode === "name") {
    // Carets follow X smoothly
    const cx = GRID_OFFSET_X + visualCursor.x * CELL_WIDTH + CELL_WIDTH / 2;
    ElementsRenderer.drawAnimatedCaret(cx, GRID_OFFSET_Y - 8, "down");
    ElementsRenderer.drawAnimatedCaret(
      cx,
      GRID_OFFSET_Y + ROWS * CELL_HEIGHT + 8,
      "up",
    );
  }
  // -----------------------------------------------------------

  GridRenderer.drawGrid();

  playdate.graphics.setColor(PlaydateColor.Black);
  for (const p of gameState.particles) {
    playdate.graphics.fillRect(p.x, p.y, p.size, p.size);
  }
};
