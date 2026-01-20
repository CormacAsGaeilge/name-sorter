// web/controls.ts

// Map for configuration
const KEY_MAP = {
  // D-PAD (Using standard Arrow Keys)
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",

  // ACTION BUTTONS (Map these to whatever your shim.ts expects)
  // Common defaults: A='a', B='b' or 's'
  a: "a",
  b: "b",

  // MENU
  menu: "m",
};

// Helper to trigger key events
const triggerKey = (key: string, type: "keydown" | "keyup") => {
  const event = new KeyboardEvent(type, {
    key: key,
    code: key,
    bubbles: true,
    cancelable: true,
  });
  window.dispatchEvent(event);
};

export const initControls = () => {
  // 1. Setup D-Pad
  const dpad = document.querySelector(".d-pad");
  if (dpad) {
    // Simple 4-way click detection based on click position relative to center
    const handleDPad = (e: PointerEvent, isDown: boolean) => {
      e.preventDefault(); // Prevent scrolling/selection
      const rect = dpad.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const type = isDown ? "keydown" : "keyup";

      // Determine direction based on angle/quadrant
      // Deadzone in middle
      if (Math.abs(x) < 15 && Math.abs(y) < 15) return;

      if (Math.abs(x) > Math.abs(y)) {
        // Horizontal
        triggerKey(x > 0 ? KEY_MAP.right : KEY_MAP.left, type);
      } else {
        // Vertical
        triggerKey(y > 0 ? KEY_MAP.down : KEY_MAP.up, type);
      }
    };

    dpad.addEventListener("pointerdown", (e) =>
      handleDPad(e as PointerEvent, true),
    );
    dpad.addEventListener("pointerup", (e) =>
      handleDPad(e as PointerEvent, false),
    );
    dpad.addEventListener("pointerleave", (e) =>
      handleDPad(e as PointerEvent, false),
    );
  }

  // 2. Setup Buttons (A / B / Menu)
  const bindButton = (selector: string, key: string) => {
    const btn = document.querySelector(selector);
    if (!btn) return;

    btn.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      btn.classList.add("pressed"); // For CSS styling
      triggerKey(key, "keydown");
    });

    const release = (e: Event) => {
      e.preventDefault();
      btn.classList.remove("pressed");
      triggerKey(key, "keyup");
    };

    btn.addEventListener("pointerup", release);
    btn.addEventListener("pointerleave", release);
  };

  bindButton(".btn-a", KEY_MAP.a);
  bindButton(".btn-b", KEY_MAP.b);
  bindButton(".btn-menu", KEY_MAP.menu);

  // 3. Setup Crank (Simple Click/Drag simulation)
  // This is tricky without a rotary UI, but we can make clicking it toggle a "cranked" event
  // or use the scroll wheel logic if your shim supports it.
  const crank = document.querySelector(".crank-handle");
  if (crank) {
    crank.addEventListener("pointerdown", () => {
      // Simulate a crank turn (e.g., equivalent to turning right)
      // Adjust the key based on your Shim's crank bindings (often '.' or '>')
      triggerKey(".", "keydown");
    });
    crank.addEventListener("pointerup", () => {
      triggerKey(".", "keyup");
    });
  }
};
