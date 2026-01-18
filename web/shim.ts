// Define global Playdate types if missing
declare global {
  interface Window {
    playdate: any;
  }
}

const canvas = document.createElement("canvas");
canvas.width = 400;
canvas.height = 240;
canvas.style.imageRendering = "pixelated"; // Retro look
canvas.style.width = "800px"; // 2x Scale
canvas.style.height = "480px";
canvas.style.border = "10px solid #333";
canvas.style.background = "#FFFFFF";
document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";
document.body.style.height = "100vh";
document.body.style.background = "#222";
document.body.style.margin = "0";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d")!;
ctx.font = "12px monospace"; // Fallback font
ctx.textBaseline = "top";

// --- INPUT STATE ---
const inputState = {
  current: {} as Record<string, boolean>,
  pressed: {} as Record<string, boolean>,
};

// Map Keys to Playdate Buttons
const KEY_MAP: Record<string, string> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  z: "A",
  x: "B",
};

window.addEventListener("keydown", (e) => {
  const btn = KEY_MAP[e.key];
  if (btn) {
    inputState.current[btn] = true;
    inputState.pressed[btn] = true;
  }
  // Crank Logic (Comma/Period)
  if (e.key === "," || e.key === "<") mockCrankChange = -15;
  if (e.key === "." || e.key === ">") mockCrankChange = 15;
});

window.addEventListener("keyup", (e) => {
  const btn = KEY_MAP[e.key];
  if (btn) inputState.current[btn] = false;
});

let mockCrankChange = 0;

// --- THE SHIM ---
export const playdateShim = {
  graphics: {
    clear: (color: number) => {
      ctx.fillStyle = color === 1 ? "#FFFFFF" : "#000000"; // 1=White, 0=Black
      ctx.fillRect(0, 0, 400, 240);
    },
    setColor: (color: number) => {
      ctx.fillStyle = color === 0 ? "#000000" : "#FFFFFF";
      ctx.strokeStyle = color === 0 ? "#000000" : "#FFFFFF";
    },
    fillRect: (x: number, y: number, w: number, h: number) =>
      ctx.fillRect(x, y, w, h),
    drawRect: (x: number, y: number, w: number, h: number) =>
      ctx.strokeRect(x, y, w, h),
    drawLine: (x1: number, y1: number, x2: number, y2: number) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    },
    drawRoundRect: (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
      ctx.stroke();
    },
    drawText: (text: string, x: number, y: number) => {
      ctx.fillText(text, x, y);
    },
    getTextSize: (text: string) => {
      const m = ctx.measureText(text);
      return [m.width, 14]; // Approx height
    },
    setImageDrawMode: (mode: number) => {
      // Simplified: Inverted mode handled loosely by setColor logic above
    },
    setFont: (font: any) => {
      // Web fallback: Bold or Normal
      if (font === "bold") ctx.font = "bold 14px monospace";
      else ctx.font = "14px monospace";
    },
    getSystemFont: (variant: string) => variant, // Pass string through
    setLineWidth: (w: number) => (ctx.lineWidth = w),
  },
  inputHandlers: {
    push: (handler: any) => {
      window.playdate._activeHandler = handler;
    },
  },
  // Internal use
  _activeHandler: null as any,
  update: () => {}, // Will be overwritten by game
};

// --- MOCK CONSTANTS ---
// We need to inject these so the game code can use PlaydateColor.Black etc.
// We cheat by attaching them to the window object or ensuring the game imports them.
// Since your game imports from @crankscript/core, we need to alias that in Vite (Step 4).

// Initialize Global
window.playdate = playdateShim;

// --- GAME LOOP ---
function loop() {
  // 1. Handle Inputs
  if (window.playdate._activeHandler) {
    const h = window.playdate._activeHandler;
    if (inputState.pressed["A"] && h.AButtonDown) h.AButtonDown();
    if (inputState.pressed["B"] && h.BButtonDown) h.BButtonDown();
    if (inputState.pressed["up"] && h.upButtonDown) h.upButtonDown();
    if (inputState.pressed["down"] && h.downButtonDown) h.downButtonDown();
    if (inputState.pressed["left"] && h.leftButtonDown) h.leftButtonDown();
    if (inputState.pressed["right"] && h.rightButtonDown) h.rightButtonDown();

    if (mockCrankChange !== 0 && h.cranked) {
      h.cranked(mockCrankChange, mockCrankChange);
      mockCrankChange = 0;
    }
  }
  inputState.pressed = {}; // Reset one-shot presses

  // 2. Run Game Update
  if (window.playdate.update) {
    window.playdate.update();
  }

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
