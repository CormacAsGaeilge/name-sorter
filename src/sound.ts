// src/sound.ts

export const SoundManager = {
  // 1. Movement Blip (Square Wave)
  playMove: () => {
    const synthNew = (playdate.sound.synth as any).new as (
      this: void,
      type: any,
    ) => any;
    const synth = synthNew(playdate.sound.kWaveSquare);
    synth.setADSR(0, 0.1, 0, 0);
    synth.setVolume(0.3);
    synth.playNote(523.25, 0.1);
  },

  // 2. Explosion/Match (Noise)
  playExplosion: () => {
    // Noise wave creates a "static" crash sound

    const synthNew = (playdate.sound.synth as any).new as (
      this: void,
      type: any,
    ) => any;
    const synth = synthNew(playdate.sound.kWaveNoise);

    // Envelope: Attack(0s), Decay(0.3s), Sustain(0), Release(0)
    // Longer tail for the explosion
    synth.setADSR(0, 0.3, 0, 0);
    synth.setVolume(0.4);

    // Pitch doesn't matter much for noise, but lower 'notes' sound heavier
    synth.playNote(60, 0.3);
  },

  // 3. Mode Switch (Triangle Wave)
  playModeSwitch: () => {
    const synthNew = (playdate.sound.synth as any).new as (
      this: void,
      type: any,
    ) => any;
    const synth = synthNew(playdate.sound.kWaveTriangle);
    synth.setADSR(0, 0.15, 0, 0);
    synth.setVolume(0.3);
    synth.playNote(440, 0.15); // A4
  },
};
