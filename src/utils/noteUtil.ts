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

export const comparePitch = (pitch1: string, pitch2: string): boolean => {
  // ピッチを音名部分とオクターブ部分に分割
  const parse = (p: string) => {
    const match = p.match(/^([A-G][♭＃]?)(?:\/(.+?))?(\d)$/);
    if (!match) return null;
    const main = match[1];
    const alt = match[2] || null;
    const octave = match[3];
    // スラッシュ区切りなら両方返す
    if (alt) {
      return { names: [main, alt], octave };
    } else {
      return { names: [main], octave };
    }
  };
  const p1 = parse(pitch1);
  const p2 = parse(pitch2);
  if (!p1 || !p2) return false;
  if (p1.octave !== p2.octave) return false;
  // どちらかの音名が一致すればOK
  return p1.names.some((n1) => p2.names.includes(n1));
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
