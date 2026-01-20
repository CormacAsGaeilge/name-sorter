import { gameState } from "../state";
import {
  GRID_OFFSET_X,
  GRID_OFFSET_Y,
  CELL_WIDTH,
  CELL_HEIGHT,
} from "../constants";

export const ParticleSystem = {
  spawnExplosion: (c: number, r: number) => {
    const centerX = GRID_OFFSET_X + c * CELL_WIDTH + CELL_WIDTH / 2;
    const centerY = GRID_OFFSET_Y + r * CELL_HEIGHT + CELL_HEIGHT / 2;
    const count = 5 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
      gameState.particles.push({
        x: centerX,
        y: centerY,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        size: 1 + Math.floor(Math.random() * 2),
        life: 10 + Math.floor(Math.random() * 10),
      });
    }
  },

  updateParticles: () => {
    for (let i = gameState.particles.length - 1; i >= 0; i--) {
      const p = gameState.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      p.vy += 0.2;
      if (p.life <= 0) gameState.particles.splice(i, 1);
    }
  },
};
