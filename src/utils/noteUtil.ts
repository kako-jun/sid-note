// 音高・五線譜関連ユーティリティ
export const getLine = (pitch: string) => {
  switch (pitch) {
    case "E1":
      return 0;
    case "E＃1":
      return 1;
    case "F♭1":
      return 0;
    case "F1":
      return 1;
    case "F＃1":
      return 1.5;
    case "G♭1":
      return 1.5;
    case "G1":
      return 2;
    case "G＃1":
      return 2.5;
    case "A♭1":
      return 2.5;
    case "A1":
      return 3;
    case "A＃1":
      return 3.5;
    case "B♭1":
      return 3.5;
    case "B1":
      return 4;
    case "B＃1":
      return 5;
    case "C♭2":
      return 4;
    case "C2":
      return 5;
    case "C＃2":
      return 5.5;
    case "D♭2":
      return 5.5;
    case "D2":
      return 6;
    case "D＃2":
      return 6.5;
    case "E♭2":
      return 6.5;
    case "E2":
      return 7;
    case "E＃2":
      return 8;
    case "F♭2":
      return 7;
    case "F2":
      return 8;
    case "F＃2":
      return 8.5;
    case "G♭2":
      return 8.5;
    case "G2":
      return 9;
    case "G＃2":
      return 9.5;
    case "A♭2":
      return 9.5;
    case "A2":
      return 10;
    case "A＃2":
      return 10.5;
    case "B♭2":
      return 10.5;
    case "B2":
      return 11;
    case "B＃2":
      return 12;
    case "C♭3":
      return 11;
    case "C3":
      return 12;
    case "C＃3":
      return 12.5;
    case "D♭3":
      return 12.5;
    case "D3":
      return 13;
    case "D＃3":
      return 13.5;
    case "E♭3":
      return 13.5;
    case "E3":
      return 14;
    case "E＃3":
      return 15;
    case "F♭3":
      return 14;
    case "F3":
      return 15;
    case "F＃3":
      return 15.5;
    case "G♭3":
      return 15.5;
    case "G3":
      return 16;
    case "G＃3":
      return 16.5;
    case "A♭3":
      return 16.5;
    case "A3":
      return 17;
    case "A＃3":
      return 17.5;
    case "B♭3":
      return 17.5;
    case "B3":
      return 18;
    case "B＃3":
      return 19;
    case "C♭4":
      return 18;
    case "C4":
      return 19;
    case "C＃4":
      return 19.5;
    case "D♭4":
      return 19.5;
    case "D4":
      return 20;
    case "D＃4":
      return 20.5;
    case "E♭4":
      return 20.5;
    case "E4":
      return 21;
    case "E＃4":
      return 22;
    case "F♭4":
      return 21;
    case "F4":
      return 22;
    case "F＃4":
      return 22.5;
    case "G♭4":
      return 22.5;
    case "G4":
      return 23;
    default:
      return null;
  }
};

export const getKeyPosition = (scale: string) => {
  const majorKeys = ["C", "G", "D", "A", "E", "B", "F＃", "D♭", "A♭", "E♭", "B♭", "F"];
  const minorKeys = ["Am", "Em", "Bm", "F＃m", "C＃m", "G＃m", "D＃m", "B♭m", "Fm", "Cm", "Gm", "Dm"];

  const majorIndex = majorKeys.indexOf(scale);
  const minorIndex = minorKeys.indexOf(scale);

  if (majorIndex !== -1) {
    return {
      circle: "outer",
      index: majorIndex,
    };
  } else if (minorIndex !== -1) {
    return {
      circle: "inner",
      index: minorIndex,
    };
  }

  return {
    circle: "none",
    index: -1,
  };
};

// 絶対的な半音インデックスを取得（異名同音を同一視するため）
const getAbsolutePitchIndex = (pitch: string): number | null => {
  const match = pitch.match(/^([A-G][＃♭]?)(\d+)$/);
  if (!match) return null;
  const name = match[1];
  const octave = parseInt(match[2], 10);
  const chromatic = ["C", "C＃/D♭", "D", "D＃/E♭", "E", "F", "F＃/G♭", "G", "G＃/A♭", "A", "A＃/B♭", "B"];
  const idx = chromatic.findIndex((x) => x.split("/").includes(name));
  if (idx === -1) return null;
  return octave * 12 + idx;
};

export const comparePitch = (pitch1: string, pitch2: string): boolean => {
  // 半音インデックスで比較することで異名同音（C＃2 = D♭2）を正しく同一視する
  const i1 = getAbsolutePitchIndex(pitch1);
  const i2 = getAbsolutePitchIndex(pitch2);
  if (i1 === null || i2 === null) return false;
  return i1 === i2;
};

export const valueText = (value: string) => {
  switch (value) {
    case "whole":
      return "Whole Note";
    case "dotted_whole":
      return "Dotted Whole Note";
    case "half":
      return "Half Note";
    case "dotted_half":
      return "Dotted Half Note";
    case "quarter":
      return "Quarter Note";
    case "dotted_quarter":
      return "Dotted Quarter Note";
    case "8th":
      return "8th Note";
    case "dotted_8th":
      return "Dotted 8th Note";
    case "16th":
      return "16th Note";
    case "dotted_16th":
      return "Dotted 16th Note";
    case "triplet_quarter":
      return "Quarter Triplet";
    case "triplet_8th":
      return "8th Triplet";
    case "triplet_16th":
      return "16th Triplet";
  }

  return "";
};
