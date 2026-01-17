import {
  PlaydateColor,
  PlaydateDrawMode,
  PlaydateFontVariant,
} from "@crankscript/core";

const helloString = "Hello from CORMAC WHITE";
const [width, height] = playdate.graphics.getTextSize(helloString);
// --- Constants ---
const ROWS = 5;
const COLS = 10;
const NAMES_TO_FIND = ["ALICE", "BOB", "PLAY", "DATE", "GAME"];
const CELL_WIDTH = 30;
const CELL_HEIGHT = 30;
const GRID_OFFSET_X = 50;
const GRID_OFFSET_Y = 60;

// --- State Definitions ---
type Mode = "column" | "row" | "name";

let grid: string[][] = [];
let mode: Mode = "column";
// let cursor = { x: 0, y: 0 };
let score = 0;

playdate.update = () => {
  playdate.graphics.clear(PlaydateColor.Black);
  playdate.graphics.setFont(
    playdate.graphics.getSystemFont(PlaydateFontVariant.Bold),
  );
  playdate.graphics.setImageDrawMode(PlaydateDrawMode.FillWhite);
  playdate.graphics.drawText(
    helloString,
    (400 - width) / 2,
    (240 - height) / 2,
  );
};
