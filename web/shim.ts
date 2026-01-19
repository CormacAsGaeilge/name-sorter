// Define global Playdate types
declare global {
  interface Window {
    playdate: any;
  }
}

// 1. Setup Canvas in the Wrapper
const canvas = document.createElement("canvas");
canvas.width = 400;
canvas.height = 240;
canvas.style.imageRendering = "pixelated";
canvas.style.width = "100%";
canvas.style.height = "100%";

// Find wrapper or fallback to body
const wrapper = document.getElementById("game-wrapper") || document.body;
wrapper.appendChild(canvas);

const ctx = canvas.getContext("2d")!;
ctx.font = "12px monospace";
ctx.textBaseline = "top";

// --- INPUT STATE ---
const inputState = {
  current: {} as Record<string, boolean>,
  pressed: {} as Record<string, boolean>,
};

let mockCrankChange = 0;

// --- KEYBOARD HANDLERS ---
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
    if (!inputState.current[btn]) inputState.pressed[btn] = true;
    inputState.current[btn] = true;
  }
  if (e.key === "," || e.key === "<") mockCrankChange = -15;
  if (e.key === "." || e.key === ">") mockCrankChange = 15;
});

window.addEventListener("keyup", (e) => {
  const btn = KEY_MAP[e.key];
  if (btn) inputState.current[btn] = false;
});

// --- TOUCH/MOUSE HANDLERS ---
const bindButton = (id: string, btnName: string) => {
  const el = document.getElementById(id);
  if (!el) return;

  const press = (e: Event) => {
    e.preventDefault(); // Stop mouse emulation
    if (!inputState.current[btnName]) inputState.pressed[btnName] = true;
    inputState.current[btnName] = true;
  };

  const release = (e: Event) => {
    e.preventDefault();
    inputState.current[btnName] = false;
  };

  el.addEventListener("mousedown", press);
  el.addEventListener("touchstart", press);
  el.addEventListener("mouseup", release);
  el.addEventListener("touchend", release);
  el.addEventListener("mouseleave", release); // Handle sliding finger off
};

const bindCrank = (id: string, amount: number) => {
  const el = document.getElementById(id);
  if (!el) return;

  const turn = (e: Event) => {
    e.preventDefault();
    mockCrankChange = amount;
  };

  // Crank only moves while holding/tapping
  // We'll just apply one tick per tap or rapid fire while holding
  // For simplicity: tap = move once.
  // Better UX: Interval while holding.

  let interval: any;
  const start = (e: Event) => {
    e.preventDefault();
    mockCrankChange = amount; // Immediate
    interval = setInterval(() => {
      mockCrankChange = amount;
    }, 100);
  };
  const stop = (e: Event) => {
    e.preventDefault();
    clearInterval(interval);
  };

  el.addEventListener("mousedown", start);
  el.addEventListener("touchstart", start);
  el.addEventListener("mouseup", stop);
  el.addEventListener("touchend", stop);
  el.addEventListener("mouseleave", stop);
};

// Bind UI
bindButton("btn-up", "up");
bindButton("btn-down", "down");
bindButton("btn-left", "left");
bindButton("btn-right", "right");
bindButton("btn-a", "A");
bindButton("btn-b", "B");

bindCrank("btn-crank-left", -45); // Faster crank on mobile for better feel
bindCrank("btn-crank-right", 45);

// --- THE SHIM ---
export const playdateShim = {
  graphics: {
    clear: (color: number) => {
      ctx.fillStyle = color === 1 ? "#FFFFFF" : "#000000";
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
      if (ctx.roundRect) {
        ctx.roundRect(x, y, w, h, r);
      } else {
        ctx.rect(x, y, w, h); // Fallback for old browsers
      }
      ctx.stroke();
    },
    drawText: (text: string, x: number, y: number) => {
      ctx.fillText(text, x, y);
    },
    getTextSize: (text: string) => {
      const m = ctx.measureText(text);
      return [m.width, 14];
    },
    setImageDrawMode: (mode: number) => {},
    setFont: (font: any) => {
      if (font === "bold") ctx.font = "bold 14px monospace";
      else ctx.font = "14px monospace";
    },
    getSystemFont: (variant: string) => variant,
    setLineWidth: (w: number) => (ctx.lineWidth = w),
  },
  inputHandlers: {
    push: (handler: any) => {
      window.playdate._activeHandler = handler;
    },
  },
  _activeHandler: null as any,
  update: () => {},
};

// Mock Constants
window.playdate = playdateShim;

// --- GAME LOOP ---
function loop() {
  if (window.playdate._activeHandler) {
    const h = window.playdate._activeHandler;

    // Check Pressed (One-shot)
    if (inputState.pressed["A"] && h.AButtonDown) h.AButtonDown();
    if (inputState.pressed["B"] && h.BButtonDown) h.BButtonDown();
    if (inputState.pressed["up"] && h.upButtonDown) h.upButtonDown();
    if (inputState.pressed["down"] && h.downButtonDown) h.downButtonDown();
    if (inputState.pressed["left"] && h.leftButtonDown) h.leftButtonDown();
    if (inputState.pressed["right"] && h.rightButtonDown) h.rightButtonDown();

    // Handle Crank
    if (mockCrankChange !== 0 && h.cranked) {
      h.cranked(mockCrankChange, mockCrankChange);
      mockCrankChange = 0;
    }
  }

  // Clear "Pressed" state but keep "Current" state
  inputState.pressed = {};

  if (window.playdate.update) {
    window.playdate.update();
  }
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
