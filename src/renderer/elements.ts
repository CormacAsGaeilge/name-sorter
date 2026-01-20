import { PlaydateColor } from "@crankscript/core";
import {
  CARET_SPEED_DIVISOR,
  CARET_BOUNCE_AMPLITUDE,
  CARET_SIZE,
} from "../constants";

export const ElementsRenderer = {
  drawCapsule: (drawX: number, drawY: number, w: number, h: number) => {
    playdate.graphics.setColor(PlaydateColor.Black);
    playdate.graphics.setLineWidth(2);
    playdate.graphics.drawRoundRect(drawX, drawY, w, h, 10);
    playdate.graphics.setLineWidth(1);
  },

  drawAnimatedCaret: (
    cx: number,
    cy: number,
    direction: "up" | "down" | "left" | "right",
  ) => {
    // Use constants for animation logic
    const tick = playdate.getCurrentTimeMilliseconds() / CARET_SPEED_DIVISOR;
    const bounce = Math.sin(tick) * CARET_BOUNCE_AMPLITUDE;
    const size = CARET_SIZE;

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
  },
};
