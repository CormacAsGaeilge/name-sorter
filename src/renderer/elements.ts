import { PlaydateColor } from "@crankscript/core";

let animationTick = 0;

export const ElementsRenderer = {
  updateTick: () => {
    animationTick++;
  },

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
  },
};
