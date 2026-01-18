import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: "./web", // <--- CHANGED: Serve files from the 'web' folder
  base: "./", // Ensure relative paths for easy hosting
  build: {
    outDir: "../dist-web", // <--- CHANGED: Output build files back to project root
    emptyOutDir: true,
    rollupOptions: {
      input: {
        app: "./web/index.html", // Explicit input (optional given root change, but good safety)
      },
    },
  },
  resolve: {
    alias: {
      // Map the Playdate library to our mock shim
      "@crankscript/core": path.resolve(__dirname, "web/mock-core.ts"),
    },
  },
});
