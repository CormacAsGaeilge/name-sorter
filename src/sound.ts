let moveSynth: any = null;
let explosionSynth: any = null;
let modeSynth: any = null;

export const SoundManager = {
  playMove: () => {
    if (!moveSynth) {
      const synthNew = (playdate.sound.synth as any).new as (
        this: void,
        type: any,
      ) => any;
      moveSynth = synthNew(playdate.sound.kWaveSquare);
      moveSynth.setADSR(0, 0.1, 0, 0);
      moveSynth.setVolume(0.3);
    }

    moveSynth.playNote(523.25);
  },

  playExplosion: () => {
    if (!explosionSynth) {
      const synthNew = (playdate.sound.synth as any).new as (
        this: void,
        type: any,
      ) => any;
      explosionSynth = synthNew(playdate.sound.kWaveNoise);
      explosionSynth.setADSR(0, 0.3, 0, 0);
      explosionSynth.setVolume(0.4);
    }
    explosionSynth.playNote(60);
  },

  playModeSwitch: () => {
    if (!modeSynth) {
      const synthNew = (playdate.sound.synth as any).new as (
        this: void,
        type: any,
      ) => any;
      modeSynth = synthNew(playdate.sound.kWaveTriangle);
      modeSynth.setADSR(0, 0.15, 0, 0);
      modeSynth.setVolume(0.3);
    }
    modeSynth.playNote(440);
  },
};
