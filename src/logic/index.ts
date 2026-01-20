import { GameLifecycle } from "./game";
import { MatchingLogic } from "./matching";
import { Controls } from "./controls";
import { ParticleSystem } from "./particles";

export const GameLogic = {
  ...GameLifecycle,
  ...MatchingLogic,
  ...Controls,
  ...ParticleSystem,
};
