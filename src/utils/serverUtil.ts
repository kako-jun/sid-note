// サーバーコンポーネント用ユーティリティ（ビルド時に実行される）
// WASMはサーバーサイドで使えないため、純TypeScriptで実装

const pitchMap: { [key: string]: string[] } = {
  "C♭": ["B", "C", "C＃/D♭", "D", "D＃/E♭", "E", "F", "F＃/G♭", "G", "G＃/A♭", "A", "A＃/B♭"],
  C: ["C", "C＃/D♭", "D", "D＃/E♭", "E", "F", "F＃/G♭", "G", "G＃/A♭", "A", "A＃/B♭", "B"],
  "C＃": ["C＃/D♭", "D", "D＃/E♭", "E", "F", "F＃/G♭", "G", "G＃/A♭", "A", "A＃/B♭", "B", "C"],
  "D♭": ["C＃/D♭", "D", "D＃/E♭", "E", "F", "F＃/G♭", "G", "G＃/A♭", "A", "A＃/B♭", "B", "C"],
  D: ["D", "D＃/E♭", "E", "F", "F＃/G♭", "G", "G＃/A♭", "A", "A＃/B♭", "B", "C", "C＃/D♭"],
  "D＃": ["D＃/E♭", "E", "F", "F＃/G♭", "G", "G＃/A♭", "A", "A＃/B♭", "B", "C", "C＃/D♭", "D"],
  "E♭": ["D＃/E♭", "E", "F", "F＃/G♭", "G", "G＃/A♭", "A", "A＃/B♭", "B", "C", "C＃/D♭", "D"],
  E: ["E", "F", "F＃/G♭", "G", "G＃/A♭", "A", "A＃/B♭", "B", "C", "C＃/D♭", "D", "D＃/E♭"],
  "E＃": ["F", "F＃/G♭", "G", "G＃/A♭", "A", "A＃/B♭", "B", "C", "C＃/D♭", "D", "D＃/E♭", "E"],
  "F♭": ["E", "F", "F＃/G♭", "G", "G＃/A♭", "A", "A＃/B♭", "B", "C", "C＃/D♭", "D", "D＃/E♭"],
  F: ["F", "F＃/G♭", "G", "G＃/A♭", "A", "A＃/B♭", "B", "C", "C＃/D♭", "D", "D＃/E♭", "E"],
  "F＃": ["F＃/G♭", "G", "G＃/A♭", "A", "A＃/B♭", "B", "C", "C＃/D♭", "D", "D＃/E♭", "E", "F"],
  "G♭": ["F＃/G♭", "G", "G＃/A♭", "A", "A＃/B♭", "B", "C", "C＃/D♭", "D", "D＃/E♭", "E", "F"],
  G: ["G", "G＃/A♭", "A", "A＃/B♭", "B", "C", "C＃/D♭", "D", "D＃/E♭", "E", "F", "F＃/G♭"],
  "G＃": ["G＃/A♭", "A", "A＃/B♭", "B", "C", "C＃/D♭", "D", "D＃/E♭", "E", "F", "F＃/G♭", "G"],
  "A♭": ["G＃/A♭", "A", "A＃/B♭", "B", "C", "C＃/D♭", "D", "D＃/E♭", "E", "F", "F＃/G♭", "G"],
  A: ["A", "A＃/B♭", "B", "C", "C＃/D♭", "D", "D＃/E♭", "E", "F", "F＃/G♭", "G", "G＃/A♭"],
  "A＃": ["A＃/B♭", "B", "C", "C＃/D♭", "D", "D＃/E♭", "E", "F", "F＃/G♭", "G", "G＃/A♭", "A"],
  "B♭": ["A＃/B♭", "B", "C", "C＃/D♭", "D", "D＃/E♭", "E", "F", "F＃/G♭", "G", "G＃/A♭", "A"],
  B: ["B", "C", "C＃/D♭", "D", "D＃/E♭", "E", "F", "F＃/G♭", "G", "G＃/A♭", "A", "A＃/B♭"],
  "B＃": ["C", "C＃/D♭", "D", "D＃/E♭", "E", "F", "F＃/G♭", "G", "G＃/A♭", "A", "A＃/B♭", "B"],
};

const intervalMap: { [key: number]: string } = {
  0: "1",
  1: "♭2",
  2: "2",
  3: "♭3",
  4: "3",
  5: "4",
  6: "＃4/♭5",
  7: "5",
  8: "＃5",
  9: "6",
  10: "♭7",
  11: "7",
};

export const getRootNote = (chord: string): string => {
  const rootNoteRegex = /^[A-G](♭|＃)?/;
  const match = chord.match(rootNoteRegex);
  return match ? match[0] : "";
};

export const getInterval = (chord: string, targetPitch: string): string => {
  const targetName = targetPitch.replace(/\d+$/, "");
  const root = getRootNote(chord);
  const pitches = pitchMap[root];
  if (!pitches) return "";
  const index = pitches.findIndex((pitch) => {
    const names = pitch.split("/").map((p) => p.replace(/\d+$/, ""));
    return names.includes(targetName);
  });
  return intervalMap[index] || "";
};
