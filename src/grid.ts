import { ROWS, COLS } from "./constants";

export const randomChar = () =>
  String.fromCharCode(65 + Math.floor(Math.random() * 26));

export const createInitialGrid = (): string[][] => {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => randomChar()),
  );
};

export const shuffleArray = (array: string[]) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};
