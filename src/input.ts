import { GameLogic } from "./logic";

export const inputHandler = {
  BButtonDown: () => GameLogic.toggleMode(),
  AButtonDown: () => GameLogic.checkNameMatch(),

  // Directional Inputs
  leftButtonDown: () => GameLogic.handleLeft(),
  rightButtonDown: () => GameLogic.handleRight(),
  upButtonDown: () => GameLogic.handleUp(),
  downButtonDown: () => GameLogic.handleDown(),

  // Crank
  cranked: (change: number, acceleratedChange: number) => {
    GameLogic.processCrank(change);
  },
};
