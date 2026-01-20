// Define global Playdate types
declare global {
  interface Window {
    playdate: any;
  }
}

// 1. Setup Canvas
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

// Crank State
let crankPosition = 0;
let pendingCrankDelta = 0; // Accumulates between frames
let frameCrankDelta = 0; // Snapshot for the current frame

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
  // Crank Keys (< and >)
  if (e.key === "," || e.key === "<") pendingCrankDelta -= 15;
  if (e.key === "." || e.key === ">") pendingCrankDelta += 15;
});

window.addEventListener("keyup", (e) => {
  const btn = KEY_MAP[e.key];
  if (btn) inputState.current[btn] = false;
});

// --- TOUCH/MOUSE HANDLERS ---
// Helper to bind a UI button to a game input
const bindButton = (id: string, btnName: string) => {
  const el = document.getElementById(id);
  if (!el) return;

  const press = (e: Event) => {
    if (e.cancelable) e.preventDefault();
    if (!inputState.current[btnName]) inputState.pressed[btnName] = true;
    inputState.current[btnName] = true;
  };

  const release = (e: Event) => {
    if (e.cancelable) e.preventDefault();
    inputState.current[btnName] = false;
  };

  el.addEventListener("mousedown", press);
  el.addEventListener("touchstart", press);
  el.addEventListener("mouseup", release);
  el.addEventListener("touchend", release);
  el.addEventListener("mouseleave", release);
};

// Helper to bind a UI button to the Crank
const bindCrank = (id: string, amount: number) => {
  const el = document.getElementById(id);
  if (!el) return;

  let interval: any;

  const tick = () => {
    pendingCrankDelta += amount;
    crankPosition = (crankPosition + amount) % 360;
    if (crankPosition < 0) crankPosition += 360;
  };

  const start = (e: Event) => {
    if (e.cancelable) e.preventDefault();
    tick(); // Immediate movement
    // Repeat while holding
    clearInterval(interval);
    interval = setInterval(tick, 100);
  };

  const stop = (e: Event) => {
    if (e.cancelable) e.preventDefault();
    clearInterval(interval);
  };

  el.addEventListener("mousedown", start);
  el.addEventListener("touchstart", start);
  el.addEventListener("mouseup", stop);
  el.addEventListener("touchend", stop);
  el.addEventListener("mouseleave", stop);
};

// Bind HTML UI Buttons (Ensure these IDs exist in index.html)
bindButton("btn-up", "up");
bindButton("btn-down", "down");
bindButton("btn-left", "left");
bindButton("btn-right", "right");
bindButton("btn-a", "A");
bindButton("btn-b", "B");

bindCrank("btn-crank-left", -30);
bindCrank("btn-crank-right", 30);

// --- AUDIO CONTEXT ---
const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
const audioCtx = new AudioContext();

// --- THE SHIM API ---
export const playdateShim = {
  // API: System
  getCurrentTimeMilliseconds: () => Date.now(),

  // API: Sound (New!)
  sound: {
    kWaveSquare: "square",
    kWaveSawtooth: "sawtooth",
    kWaveSine: "sine",
    kWaveTriangle: "triangle",
    kWaveNoise: "noise", // Custom handling for noise

    synth: {
      new: (waveform: string) => {
        return {
          waveform,
          attack: 0,
          decay: 0.1,
          sustain: 0,
          release: 0,
          volume: 0.5,

          setADSR: function (a: number, d: number, s: number, r: number) {
            this.attack = a;
            this.decay = d;
            this.sustain = s;
            this.release = r;
          },
          setVolume: function (v: number) {
            this.volume = v;
          },
          playNote: function (freq: number, duration: number) {
            if (audioCtx.state === "suspended") audioCtx.resume();

            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            const now = audioCtx.currentTime;

            // Handle Noise vs Oscillator
            if (this.waveform === "noise") {
              // Noise Buffer Logic
              const bufferSize = audioCtx.sampleRate * 2; // 2 seconds buffer
              const buffer = audioCtx.createBuffer(
                1,
                bufferSize,
                audioCtx.sampleRate,
              );
              const data = buffer.getChannelData(0);
              for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
              }
              const noise = audioCtx.createBufferSource();
              noise.buffer = buffer;
              noise.connect(gainNode);
              noise.start(now);
              noise.stop(now + this.attack + this.decay + this.release + 0.1);
              // Disconnect OSC since we use noise source
              osc.disconnect();
            } else {
              osc.type = this.waveform as any;
              osc.frequency.setValueAtTime(freq, now);
              osc.start(now);
              osc.stop(now + this.attack + this.decay + this.release + 0.1);
            }

            // Simple ADSR Envelope on Gain
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(
              this.volume,
              now + this.attack,
            );
            gainNode.gain.exponentialRampToValueAtTime(
              0.01,
              now + this.attack + this.decay,
            );
          },
        };
      },
    },
  },

  // API: Input
  isCrankDocked: () => false,
  getCrankChange: () => frameCrankDelta,
  getCrankPosition: () => crankPosition,

  // API: Graphics
  graphics: {
    clear: (color: number) => {
      ctx.fillStyle = color === 1 ? "#FFFFFF" : "#000000";
      ctx.fillRect(0, 0, 400, 240);
    },
    setColor: (color: number) => {
      ctx.fillStyle = color === 0 ? "#000000" : "#FFFFFF";
      ctx.strokeStyle = color === 0 ? "#000000" : "#FFFFFF";
    },
    setClipRect: (x: number, y: number, w: number, h: number) => {
      ctx.save(); // Save the current state (no clip)
      ctx.beginPath();
      ctx.rect(x, y, w, h);
      ctx.clip(); // Restrict drawing to this rect
    },
    clearClipRect: () => {
      ctx.restore(); // Restore the state (remove clip)
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
      if (ctx.roundRect) ctx.roundRect(x, y, w, h, r);
      else ctx.rect(x, y, w, h);
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
    setLineStyle: (style: number) => {
      // 0 = Solid, 1 = Dashed (Playdate constants)
      if (style === 1) {
        ctx.setLineDash([4, 4]);
      } else {
        ctx.setLineDash([]);
      }
    },
  },
  // API: Handlers
  inputHandlers: {
    push: (handler: any) => {
      window.playdate._activeHandler = handler;
    },
  },
  _activeHandler: null as any,
  update: () => {},
};

// Initialize Global
window.playdate = playdateShim;

// --- GAME LOOP ---
function loop() {
  // 1. Snapshot Inputs for this Frame
  frameCrankDelta = pendingCrankDelta;
  pendingCrankDelta = 0; // Reset accumulator

  // 2. Handle Inputs (Callbacks)
  if (window.playdate._activeHandler) {
    const h = window.playdate._activeHandler;

    // Button Presses (One-shot)
    if (inputState.pressed["A"] && h.AButtonDown) h.AButtonDown();
    if (inputState.pressed["B"] && h.BButtonDown) h.BButtonDown();
    if (inputState.pressed["up"] && h.upButtonDown) h.upButtonDown();
    if (inputState.pressed["down"] && h.downButtonDown) h.downButtonDown();
    if (inputState.pressed["left"] && h.leftButtonDown) h.leftButtonDown();
    if (inputState.pressed["right"] && h.rightButtonDown) h.rightButtonDown();

    // Crank Movement
    if (frameCrankDelta !== 0 && h.cranked) {
      h.cranked(frameCrankDelta, frameCrankDelta);
    }
  }

  // Clear "Pressed" state (One-shot)
  inputState.pressed = {};

  // 3. Run Game Update
  if (window.playdate.update) {
    window.playdate.update();
  }

  requestAnimationFrame(loop);
}

// Start the loop
requestAnimationFrame(loop);
