export const getScalePitches = (scale: string) => {
  const scaleMap: { [key: string]: string[] } = {
    C: ["C", "D", "E", "F", "G", "A", "B"],
    Cm: ["C", "D", "E♭", "F", "G", "A♭", "B♭"],
    "C＃": ["C＃", "D＃", "E＃", "F＃", "G＃", "A＃", "B＃"],
    "C＃m": ["C＃", "D＃", "E", "F＃", "G＃", "A", "B"],
    "C♭": ["C♭", "D♭", "E♭", "F♭", "G♭", "A♭", "B♭"],
    "C♭m": ["C♭", "D♭", "E♭♭", "F♭", "G♭", "A♭♭", "B♭♭"],
    D: ["D", "E", "F＃", "G", "A", "B", "C＃"],
    Dm: ["D", "E", "F", "G", "A", "B♭", "C"],
    "D＃": ["D＃", "E＃", "F＃＃", "G＃", "A＃", "B＃", "C＃＃"],
    "D＃m": ["D＃", "E＃", "F＃", "G＃", "A＃", "B", "C＃"],
    "D♭": ["D♭", "E♭", "F", "G♭", "A♭", "B♭", "C"],
    "D♭m": ["D♭", "E♭", "F♭", "G♭", "A♭", "B♭♭", "C♭"],
    E: ["E", "F＃", "G＃", "A", "B", "C＃", "D＃"],
    Em: ["E", "F＃", "G", "A", "B", "C", "D"],
    "E＃": ["E＃", "F＃＃", "G＃＃", "A＃", "B＃", "C＃＃", "D＃＃"],
    "E＃m": ["E＃", "F＃＃", "G＃", "A＃", "B＃", "C＃", "D＃"],
    "E♭": ["E♭", "F", "G", "A♭", "B♭", "C", "D"],
    "E♭m": ["E♭", "F", "G♭", "A♭", "B♭", "C♭", "D♭"],
    F: ["F", "G", "A", "B♭", "C", "D", "E"],
    Fm: ["F", "G", "A♭", "B♭", "C", "D♭", "E♭"],
    "F＃": ["F＃", "G＃", "A＃", "B", "C＃", "D＃", "E＃"],
    "F＃m": ["F＃", "G＃", "A", "B", "C＃", "D", "E"],
    "F♭": ["F♭", "G♭", "A♭", "B♭♭", "C♭", "D♭", "E♭"],
    "F♭m": ["F♭", "G♭", "A♭♭", "B♭♭", "C♭", "D♭♭", "E♭♭"],
    G: ["G", "A", "B", "C", "D", "E", "F＃"],
    Gm: ["G", "A", "B♭", "C", "D", "E♭", "F"],
    "G＃": ["G＃", "A＃", "B＃", "C＃", "D＃", "E＃", "F＃＃"],
    "G＃m": ["G＃", "A＃", "B", "C＃", "D＃", "E", "F＃"],
    "G♭": ["G♭", "A♭", "B♭", "C♭", "D♭", "E♭", "F"],
    "G♭m": ["G♭", "A♭", "B♭♭", "C♭", "D♭", "E♭♭", "F♭"],
    A: ["A", "B", "C＃", "D", "E", "F＃", "G＃"],
    Am: ["A", "B", "C", "D", "E", "F", "G"],
    "A＃": ["A＃", "B＃", "C＃＃", "D＃", "E＃", "F＃＃", "G＃＃"],
    "A＃m": ["A＃", "B＃", "C＃", "D＃", "E＃", "F＃", "G＃"],
    "A♭": ["A♭", "B♭", "C", "D♭", "E♭", "F", "G"],
    "A♭m": ["A♭", "B♭", "C♭", "D♭", "E♭", "F♭", "G♭"],
    B: ["B", "C＃", "D＃", "E", "F＃", "G＃", "A＃"],
    Bm: ["B", "C＃", "D", "E", "F＃", "G", "A"],
    "B＃": ["B＃", "C＃＃", "D＃＃", "E＃", "F＃＃", "G＃＃", "A＃＃"],
    "B＃m": ["B＃", "C＃＃", "D＃", "E＃", "F＃＃", "G＃", "A＃"],
    "B♭": ["B♭", "C", "D", "E♭", "F", "G", "A"],
    "B♭m": ["B♭", "C", "D♭", "E♭", "F", "G♭", "A♭"],
  };

  return scaleMap[scale] || [];
};

export const getScaleCodes = (scale: string) => {
  const scaleCodeMap: { [key: string]: string[] } = {
    C: ["C", "Dm", "Em", "F", "G", "Am", "Bdim"],
    Cm: ["Cm", "Ddim", "E♭", "Fm", "Gm", "A♭", "B♭"],
    "C＃": ["C＃", "D＃m", "Fm", "F＃", "G＃", "A＃m", "Cdim"],
    "C＃m": ["C＃m", "D＃dim", "E", "F＃m", "G＃m", "A", "B"],
    "C♭": ["C♭", "D♭m", "E♭m", "F♭", "G♭", "A♭m", "B♭dim"],
    "C♭m": ["C♭m", "D♭dim", "E♭♭", "F♭m", "G♭m", "A♭♭", "B♭♭"],
    D: ["D", "Em", "F＃m", "G", "A", "Bm", "C＃dim"],
    Dm: ["Dm", "Edim", "F", "Gm", "Am", "B♭", "C"],
    "D＃": ["D＃", "Fm", "Gm", "G＃", "A＃", "Cm", "Ddim"],
    "D＃m": ["D＃m", "Fdim", "F＃", "G＃m", "A＃m", "B", "C＃"],
    "D♭": ["D♭", "E♭m", "Fm", "G♭", "A♭", "B♭m", "Cdim"],
    "D♭m": ["D♭m", "E♭dim", "F♭", "G♭m", "A♭m", "B♭♭", "C♭"],
    E: ["E", "F＃m", "G＃m", "A", "B", "C＃m", "D＃dim"],
    Em: ["Em", "F＃dim", "G", "Am", "Bm", "C", "D"],
    "E＃": ["E＃", "F＃＃m", "G＃＃m", "A＃", "B＃", "C＃＃m", "D＃＃dim"],
    "E＃m": ["E＃m", "F＃＃dim", "G＃", "A＃m", "B＃m", "C＃", "D＃"],
    "E♭": ["E♭", "Fm", "Gm", "A♭", "B♭", "Cm", "Ddim"],
    "E♭m": ["E♭m", "Fdim", "G♭", "A♭m", "B♭m", "C♭", "D♭"],
    F: ["F", "Gm", "Am", "B♭", "C", "Dm", "Edim"],
    Fm: ["Fm", "Gdim", "A♭", "B♭m", "Cm", "D♭", "E♭"],
    "F＃": ["F＃", "G＃m", "A＃m", "B", "C＃", "D＃m", "E＃dim"],
    "F＃m": ["F＃m", "G＃dim", "A", "Bm", "C＃m", "D", "E"],
    "F♭": ["F♭", "G♭m", "A♭m", "B♭♭", "C♭", "D♭m", "E♭dim"],
    "F♭m": ["F♭m", "G♭dim", "A♭♭", "B♭♭m", "C♭m", "D♭♭", "E♭♭"],
    G: ["G", "Am", "Bm", "C", "D", "Em", "F＃dim"],
    Gm: ["Gm", "Adim", "B♭", "Cm", "Dm", "E♭", "F"],
    "G＃": ["G＃", "A＃m", "Cm", "C＃", "D＃", "Fm", "Gdim"],
    "G＃m": ["G＃m", "A＃dim", "B", "C＃m", "D＃m", "E", "F＃"],
    "G♭": ["G♭", "A♭m", "B♭m", "C♭", "D♭", "E♭m", "Fdim"],
    "G♭m": ["G♭m", "A♭dim", "B♭♭", "C♭m", "D♭m", "E♭♭", "F♭"],
    A: ["A", "Bm", "C＃m", "D", "E", "F＃m", "G＃dim"],
    Am: ["Am", "Bdim", "C", "Dm", "Em", "F", "G"],
    "A＃": ["A＃", "Cm", "Dm", "D＃", "F", "Gm", "Adim"],
    "A＃m": ["A＃m", "Cdim", "C＃", "D＃m", "Fm", "F＃", "G＃"],
    "A♭": ["A♭", "B♭m", "Cm", "D♭", "E♭", "Fm", "Gdim"],
    "A♭m": ["A♭m", "B♭dim", "C♭", "D♭m", "E♭m", "F♭", "G♭"],
    B: ["B", "C＃m", "D＃m", "E", "F＃", "G＃m", "A＃dim"],
    Bm: ["Bm", "C＃dim", "D", "Em", "F＃m", "G", "A"],
    "B＃": ["B＃", "C＃＃m", "D＃＃m", "E＃", "F＃＃", "G＃＃m", "A＃＃dim"],
    "B＃m": ["B＃m", "C＃＃dim", "D＃", "E＃m", "F＃＃m", "G＃", "A＃"],
    "B♭": ["B♭", "Cm", "Dm", "E♭", "F", "Gm", "Adim"],
    "B♭m": ["B♭m", "Cdim", "D♭", "E♭m", "Fm", "G♭", "A♭"],
  };

  return scaleCodeMap[scale] || [];
};

export const getLine = (pitch: string) => {
  switch (pitch) {
    case "E1":
      return 0;
    case "E1＃":
      return 1;
    case "F1♭":
      return 0;
    case "F1":
      return 1;
    case "F1＃":
      return 1.5;
    case "G1♭":
      return 1.5;
    case "G1":
      return 2;
    case "G1＃":
      return 2.5;
    case "A1♭":
      return 2.5;
    case "A1":
      return 3;
    case "A1＃":
      return 3.5;
    case "B1♭":
      return 3.5;
    case "B1":
      return 4;
    case "B1＃":
      return 5;
    case "C2♭":
      return 4;
    case "C2":
      return 5;
    case "C2＃":
      return 5.5;
    case "D2♭":
      return 5.5;
    case "D2":
      return 6;
    case "D2＃":
      return 6.5;
    case "E2♭":
      return 6.5;
    case "E2":
      return 7;
    case "E2＃":
      return 8;
    case "F2♭":
      return 7;
    case "F2":
      return 8;
    case "F2＃":
      return 8.5;
    case "G2♭":
      return 8.5;
    case "G2":
      return 9;
    case "G2＃":
      return 9.5;
    case "A2♭":
      return 9.5;
    case "A2":
      return 10;
    case "A2＃":
      return 10.5;
    case "B2♭":
      return 10.5;
    case "B2":
      return 11;
    case "B2＃":
      return 12;
    case "C3♭":
      return 11;
    case "C3":
      return 12;
    case "C3＃":
      return 12.5;
    case "D3♭":
      return 12.5;
    case "D3":
      return 13;
    case "D3＃":
      return 13.5;
    case "E3♭":
      return 13.5;
    case "E3":
      return 14;
    case "E3＃":
      return 15;
    case "F3♭":
      return 14;
    case "F3":
      return 15;
    case "F3＃":
      return 15.5;
    case "G3♭":
      return 15.5;
    case "G3":
      return 16;
    case "G3＃":
      return 16.5;
    case "A3♭":
      return 16.5;
    case "A3":
      return 17;
    case "A3＃":
      return 17.5;
    case "B3♭":
      return 17.5;
    case "B3":
      return 18;
    case "B3＃":
      return 19;
    case "C4♭":
      return 18;
    case "C4":
      return 19;
    case "C4＃":
      return 19.5;
    case "D4♭":
      return 19.5;
    case "D4":
      return 20;
    case "D4＃":
      return 20.5;
    case "E4♭":
      return 20.5;
    case "E4":
      return 21;
    case "E4＃":
      return 22;
    case "F4♭":
      return 21;
    case "F4":
      return 22;
    case "F4＃":
      return 22.5;
    case "G4♭":
      return 22.5;
    case "G4":
      return 23;
    default:
      return 0;
  }
};

export const getRootNote = (code: string): string => {
  const rootNoteRegex = /^[A-G](♭|＃)?/; // 音名、♭/＃、オクターブ番号を含む正規表現
  const match = code.match(rootNoteRegex);
  return match ? match[0] : ""; // マッチした場合はルート音を返し、なければ空文字を返す
};

export const getFrets = (m3: boolean, sus4: boolean, dim5: boolean, M7: boolean, m7: boolean) => {
  const frets: { degree: string; fret: number }[] = [];

  // ルート音は度数1として追加
  frets.push({ degree: "1", fret: 0 });

  if (sus4) {
    frets.push({ degree: "4", fret: 5 }); // sus4の場合は第4音（5フレット分）を追加
  } else if (m3) {
    frets.push({ degree: "3m", fret: 3 }); // マイナーの場合は第3音（3フレット分）を追加
  } else {
    frets.push({ degree: "3", fret: 4 }); // メジャーの場合は第3音（4フレット分）を追加
  }

  if (dim5) {
    frets.push({ degree: "5dim", fret: 6 }); // 減5度の場合は6フレット分
  } else {
    frets.push({ degree: "5", fret: 7 }); // 完全5度の場合は7フレット分
  }

  if (M7) {
    frets.push({ degree: "7", fret: 11 }); // メジャー7度の場合は11フレット分
  } else if (m7) {
    frets.push({ degree: "7m", fret: 10 }); // マイナー7度の場合は10フレット分
  }

  return frets;
};

export const getFretOffset = (root: string) => {
  const fretOffsets: { [key: string]: number } = {
    E: 0,
    "E＃": 1,
    "F♭": 0,
    F: 1,
    "F＃": 2,
    "G♭": 2,
    G: 3,
    "G＃": 4,
    "A♭": 4,
    A: 5,
    "A＃": 6,
    "B♭": 6,
    B: 7,
    "B＃": 8,
    "C♭": 7,
    C: 8,
    "C＃": 9,
    "D♭": 9,
    D: 10,
    "D＃": 11,
    "E♭": 11,
  };

  return fretOffsets[root] || 0; // オフセットを返す
};

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

export const getPitches = (root: string, frets: { degree: string; fret: number }[]) => {
  const rootIndex =
    pitchMap[root]?.findIndex((pitchText) => {
      const pitches = pitchText.split("/");
      return pitches.includes(root);
    }) || 0;

  return frets.map(({ degree, fret }) => {
    const pitchIndex = (rootIndex + fret) % 12;
    return { degree, fret, pitch: pitchMap[root][pitchIndex] };
  });
};

export const convertFretsToPositions = (frets: { fret: number; degree: string; pitch: string }[]) => {
  const positions = frets.flatMap(({ fret, degree, pitch }) => {
    const possiblePositions = [];

    // 1弦
    if (fret >= 15 && fret <= 39) {
      possiblePositions.push({
        string: 1,
        fret: (fret - 15) % 24,
        pitch,
        degree,
      });
    }

    // 2弦
    if (fret >= 10 && fret <= 34) {
      possiblePositions.push({
        string: 2,
        fret: (fret - 10) % 24,
        pitch,
        degree,
      });
    }

    // 3弦
    if (fret >= 5 && fret <= 29) {
      possiblePositions.push({
        string: 3,
        fret: (fret - 5) % 24,
        pitch,
        degree,
      });
    }

    // 4弦
    if (fret >= 0 && fret <= 24) {
      possiblePositions.push({
        string: 4,
        fret,
        pitch,
        degree,
      });
    }

    return possiblePositions;
  });

  return positions;
};

export const getCodePositions = (code: string) => {
  const root = getRootNote(code); // ルート音を取得
  const m3 = code.includes("m") && !code.includes("dim"); // "m"が含まれるが"dim"は含まれない場合
  const sus4 = code.includes("sus4"); // "sus4"が含まれる場合
  const dim5 = code.includes("dim"); // "dim"が含まれる場合
  const M7 = code.includes("M7"); // "M7"が含まれる場合
  const m7 = code.includes("7") && !code.includes("M7"); // "7"が含まれるが"M7"は含まれない場合

  // m3, sus4, dim5, M7, m7のフラグを元に、度数の配列を取得
  const frets = getFrets(m3, sus4, dim5, M7, m7);
  const offset = getFretOffset(root); // ルート音のオフセットを取得

  const fretsWithPitch = getPitches(root, frets);

  // 各フレットにoffsetを足し、12, 24, 36を加えた値も含め、39を超える場合は除外
  const octaveFrets = fretsWithPitch.flatMap((fret) => {
    return [
      {
        fret: fret.fret + offset,
        degree: fret.degree,
        pitch: ["E", "E＃", "G♭", "G", "G＃"].includes(fret.pitch) ? `${fret.pitch}2` : `${fret.pitch}3`,
      },
      {
        fret: fret.fret + 12 + offset,
        degree: fret.degree,
        pitch: ["E", "E＃", "G♭", "G", "G＃"].includes(fret.pitch) ? `${fret.pitch}3` : `${fret.pitch}4`,
      },
      {
        fret: fret.fret + 24 + offset,
        degree: fret.degree,
        pitch: ["E", "E＃", "G♭", "G", "G＃"].includes(fret.pitch) ? `${fret.pitch}4` : `${fret.pitch}5`,
      },
      {
        fret: fret.fret + 36 + offset,
        degree: fret.degree,
        pitch: ["E", "E＃", "G♭", "G", "G＃"].includes(fret.pitch) ? `${fret.pitch}5` : `${fret.pitch}6`,
      },
    ].filter((f) => f.fret <= 39);
  });

  const codePositions = convertFretsToPositions(octaveFrets);
  return codePositions;
};

export const getInterval = (code: string, targetPitch: string) => {
  const targetName = targetPitch.replace(/\d+$/, ""); // 数字を削除

  const root = getRootNote(code);
  const pitches = pitchMap[root];
  const index = pitches.findIndex((pitch) => {
    const names = pitch.split("/").map((p) => p.replace(/\d+$/, "")); // 数字を削除
    return names.includes(targetName);
  });

  const intervalMap: { [key: number]: string } = {
    0: "1",
    1: "2m",
    2: "2",
    3: "3m",
    4: "3",
    5: "4",
    6: "4＃",
    7: "5",
    8: "6m",
    9: "6",
    10: "7m",
    11: "7",
  };

  const interval = intervalMap[index] || "";
  return interval;
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

export const scaleText = (scale: string) => {
  const scaleMap: { [key: string]: string } = {
    C: "C Major",
    Cm: "C Minor",
    "C＃": "C＃ Major",
    "C＃m": "C＃ Minor",
    "C♭": "C♭ Major",
    "C♭m": "C♭ Minor",
    D: "D Major",
    Dm: "D Minor",
    "D＃": "D＃ Major",
    "D＃m": "D＃ Minor",
    "D♭": "D♭ Major",
    "D♭m": "D♭ Minor",
    E: "E Major",
    Em: "E Minor",
    "E＃": "E＃ Major",
    "E＃m": "E＃ Minor",
    "E♭": "E♭ Major",
    "E♭m": "E♭ Minor",
    F: "F Major",
    Fm: "F Minor",
    "F＃": "F＃ Major",
    "F＃m": "F＃ Minor",
    "F♭": "F♭ Major",
    "F♭m": "F♭ Minor",
    G: "G Major",
    Gm: "G Minor",
    "G＃": "G＃ Major",
    "G＃m": "G＃ Minor",
    "G♭": "G♭ Major",
    "G♭m": "G♭ Minor",
    A: "A Major",
    Am: "A Minor",
    "A＃": "A＃ Major",
    "A＃m": "A＃ Minor",
    "A♭": "A♭ Major",
    "A♭m": "A♭ Minor",
    B: "B Major",
    Bm: "B Minor",
    "B＃": "B＃ Major",
    "B＃m": "B＃ Minor",
    "B♭": "B♭ Major",
    "B♭m": "B♭ Minor",
  };

  return `${scaleMap[scale]} Scale` || scale;
};

export const functionalHarmonyText = (degree: number) => {
  switch (degree) {
    case 1:
      return `Ⅰ Tonic`;
    case 2:
      return `Ⅱ Supertonic`;
    case 3:
      return `Ⅲ Mediant`;
    case 4:
      return `Ⅳ Subdominant`;
    case 5:
      return `Ⅴ Dominant`;
    case 6:
      return `Ⅵ Submediant`;
    case 7:
      return `Ⅶ Leading Tone`;
    default:
      return "";
  }
};

export const cadenceText = (prevFunctionalHarmony: number, functionalHarmony: number) => {
  if (prevFunctionalHarmony === 5 && functionalHarmony === 1) {
    return "Perfect Cadence"; // 完全終止
  } else if (prevFunctionalHarmony === 4 && functionalHarmony === 1) {
    return "Plagal Cadence"; // 変格終止
  } else if (prevFunctionalHarmony === 5 && functionalHarmony === 6) {
    return "Deceptive Cadence"; // 偽終止
  } else if (functionalHarmony === 5) {
    return "Half Cadence"; // 半終止
  } else if (functionalHarmony === 7) {
    return "Phrygian Cadence"; // フリギア終止（主にマイナーキー）
  }

  return ""; // 該当なし
};
