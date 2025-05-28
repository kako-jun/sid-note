import { getChordPositions } from "@/utils/chordUtil";

/**
 * Utility to play notes using the Web Audio API.
 * 全ての音名（♭・＃含む）に対応し、周波数を定義。
 */

const noteFrequencies: { [key: string]: number } = {
  //   C1: 32.7,
  //   "C＃1": 34.65,
  //   "D♭1": 34.65,
  //   D1: 36.71,
  //   "D＃1": 38.89,
  //   "E♭1": 38.89,
  E1: 41.2,
  "E＃1": 43.65,
  "F♭1": 41.2,
  F1: 43.65,
  "F＃1": 46.25,
  "G♭1": 46.25,
  G1: 49.0,
  "G＃1": 51.91,
  "A♭1": 51.91,
  A1: 55.0,
  "A＃1": 58.27,
  "B♭1": 58.27,
  B1: 61.74,
  "B＃1": 65.41,
  "C♭2": 61.74,
  C2: 65.41,
  "C＃2": 69.3,
  "D♭2": 69.3,
  D2: 73.42,
  "D＃2": 77.78,
  "E♭2": 77.78,
  E2: 82.41,
  "E＃2": 87.31,
  "F♭2": 82.41,
  F2: 87.31,
  "F＃2": 92.5,
  "G♭2": 92.5,
  G2: 98.0,
  "G＃2": 103.83,
  "A♭2": 103.83,
  A2: 110.0,
  "A＃2": 116.54,
  "B♭2": 116.54,
  B2: 123.47,
  "B＃2": 130.81,
  "C♭3": 123.47,
  C3: 130.81,
  "C＃3": 138.59,
  "D♭3": 138.59,
  D3: 146.83,
  "D＃3": 155.56,
  "E♭3": 155.56,
  E3: 164.81,
  "E＃3": 174.61,
  "F♭3": 164.81,
  F3: 174.61,
  "F＃3": 185.0,
  "G♭3": 185.0,
  G3: 196.0,
  "G＃3": 207.65,
  "A♭3": 207.65,
  A3: 220.0,
  "A＃3": 233.08,
  "B♭3": 233.08,
  B3: 246.94,
  "B＃3": 261.63,
  "C♭4": 246.94,
  C4: 261.63,
  "C＃4": 277.18,
  "D♭4": 277.18,
  D4: 293.66,
  "D＃4": 311.13,
  "E♭4": 311.13,
  E4: 329.63,
  "E＃4": 349.23,
  "F♭4": 329.63,
  F4: 349.23,
  "F＃4": 369.99,
  "G♭4": 369.99,
  G4: 392.0,
  "G#4": 415.3,
  Ab4: 415.3,
  A4: 440.0,
  "A#4": 466.2,
  Bb4: 466.2,
  B4: 493.9,
};

/**
 * 指定した音名の周波数を取得
 */
export function getNoteFrequency(note: string): number | null {
  return noteFrequencies[note] || null;
}

// AudioContextをグローバルで1つだけ生成し使い回す
let audioContext: AudioContext | null = null;
function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }

  return audioContext;
}

/**
 * Web Audio APIで音を鳴らす
 */
export function playNoteSound(note: string, duration: number = 1): void {
  // スラッシュ区切り対応しつつ、getNoteFrequencyの呼び出しを1回だけにまとめる
  let noteToPlay = note;
  if (note.includes("/")) {
    noteToPlay = note.split("/").find((n) => getNoteFrequency(n) !== null) ?? note;
  }

  const frequency = getNoteFrequency(noteToPlay);
  if (frequency === null) {
    console.error(`Invalid note: ${note}`);
    return;
  }

  const ctx = getAudioContext();

  // --- SFCベース風：ビリビリ音と丸みのある音をミックス ---
  // 1. ビリビリ成分（sawtooth）
  const oscSaw = ctx.createOscillator();
  oscSaw.type = "sawtooth";
  oscSaw.frequency.setValueAtTime(frequency, ctx.currentTime);
  const gainSaw = ctx.createGain();
  gainSaw.gain.setValueAtTime(0, ctx.currentTime);
  gainSaw.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.02);
  gainSaw.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
  oscSaw.connect(gainSaw);

  // 2. 丸み成分（triangle+ローパス）
  const oscTri = ctx.createOscillator();
  oscTri.type = "triangle";
  oscTri.frequency.setValueAtTime(frequency, ctx.currentTime);
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(800, ctx.currentTime);
  const gainTri = ctx.createGain();
  gainTri.gain.setValueAtTime(0, ctx.currentTime);
  gainTri.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.02);
  gainTri.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
  oscTri.connect(filter);
  filter.connect(gainTri);

  // ミックスして出力
  gainSaw.connect(ctx.destination);
  gainTri.connect(ctx.destination);

  oscSaw.start();
  oscTri.start();
  oscSaw.stop(ctx.currentTime + duration);
  oscTri.stop(ctx.currentTime + duration);
}

export const playChord = (chord: string) => {
  const positions = getChordPositions(chord);

  // pitchの重複を除外し、3で終わるものだけ再生
  const uniquePitches = Array.from(new Set(positions.map((position) => position.pitch))).filter((pitch) =>
    pitch.endsWith("3")
  );
  uniquePitches.forEach((pitch) => {
    playNoteSound(pitch, 1.5);
  });
};
