import { GameLogic } from "./logic";
import { gameState } from "./state";

export const inputHandler = {
  BButtonDown: () => {
    if (gameState.gameOver) return;
    GameLogic.toggleMode();
  },
  AButtonDown: () => {
    if (!gameState.started) {
      GameLogic.startGame();
      return;
    }

    if (gameState.gameOver) {
      GameLogic.resetGame();
    } else {
      GameLogic.checkNameMatch();
    }
  },

  leftButtonDown: () => {
    if (!gameState.gameOver) GameLogic.handleLeft();
  },
  rightButtonDown: () => {
    if (!gameState.gameOver) GameLogic.handleRight();
  },
  upButtonDown: () => {
    if (!gameState.gameOver) GameLogic.handleUp();
  },
  downButtonDown: () => {
    if (!gameState.gameOver) GameLogic.handleDown();
  },

  cranked: (change: number) => {
    if (!gameState.gameOver) GameLogic.processCrank(change);
  },
};
