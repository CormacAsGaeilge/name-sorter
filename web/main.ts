import "./shim"; // Loads the fake Playdate environment
import "../src/index"; // Loads your actual game code
import { initControls } from "./controls";

window.addEventListener("load", () => {
  const canvas = document.querySelector("canvas");
  const container = document.getElementById("game-container");
  if (canvas && container && canvas.parentNode !== container) {
    container.appendChild(canvas);
  }
});

window.addEventListener("load", () => {
  initControls();
});
