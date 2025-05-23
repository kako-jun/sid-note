// コード・ポジション関連ユーティリティ
export const getRootNote = (chord: string): string => {
  const rootNoteRegex = /^[A-G](♭|＃)?/;
  const match = chord.match(rootNoteRegex);
  return match ? match[0] : "";
};

export const getFrets = (
  m3: boolean,
  sus4: boolean,
  dim5: boolean,
  maj7: boolean,
  m7: boolean,
  aug7: boolean = false
) => {
  const frets: { interval: string; fret: number }[] = [];
  frets.push({ interval: "1", fret: 0 });
  if (sus4) {
    frets.push({ interval: "4", fret: 5 });
  } else if (m3) {
    frets.push({ interval: "♭3", fret: 3 });
  } else {
    frets.push({ interval: "3", fret: 4 });
  }
  if (aug7) {
    frets.push({ interval: "＃5", fret: 8 });
  } else if (dim5) {
    frets.push({ interval: "♭5", fret: 6 });
  } else {
    frets.push({ interval: "5", fret: 7 });
  }
  if (aug7) {
    frets.push({ interval: "♭7", fret: 10 });
  } else if (maj7) {
    frets.push({ interval: "7", fret: 11 });
  } else if (m7) {
    frets.push({ interval: "♭7", fret: 10 });
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
  return fretOffsets[root] || 0;
};

export const pitchMap: { [key: string]: string[] } = {
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

export const getPitches = (root: string, frets: { interval: string; fret: number }[], offset: number) => {
  const rootIndex =
    pitchMap[root]?.findIndex((pitchText) => {
      const pitches = pitchText.split("/");
      return pitches.includes(root);
    }) || 0;

  return frets.map(({ interval, fret }) => {
    const pitchIndex = (rootIndex + fret) % 12;
    return { interval, fret: fret + offset, pitch: pitchMap[root][pitchIndex] };
  });
};

export const convertFretsToPositions = (frets: { fret: number; interval: string; pitch: string }[]) => {
  const positions = frets.flatMap(({ fret, interval, pitch }) => {
    const possiblePositions = [];
    if (fret >= 15 && fret <= 39) {
      possiblePositions.push({
        string: 1,
        fret: (fret - 15) % 25,
        pitch,
        interval,
      });
    }
    if (fret >= 10 && fret <= 34) {
      possiblePositions.push({
        string: 2,
        fret: (fret - 10) % 25,
        pitch,
        interval,
      });
    }
    if (fret >= 5 && fret <= 29) {
      possiblePositions.push({
        string: 3,
        fret: (fret - 5) % 25,
        pitch,
        interval,
      });
    }
    if (fret >= 0 && fret <= 24) {
      possiblePositions.push({
        string: 4,
        fret,
        pitch,
        interval,
      });
    }
    return possiblePositions;
  });
  return positions;
};

export const getChordPositions = (chord: string) => {
  // 特別なコード判定
  const isAllKeys = chord === "ALL_KEYS";
  const isWhiteKeys = chord === "WHITE_KEYS";

  const root = getRootNote(chord);

  // パワーコード（5thコード）判定を追加
  const isPowerChord = /5(?![0-9])/i.test(chord);
  // オクターブユニゾン（8度）判定を追加
  const isOctaveUnison = /8(?![0-9])/i.test(chord);
  // 7度のaugや+や#と混同しない5度増（aug5, +5, #5）判定
  const aug5 =
    !isPowerChord && !isOctaveUnison && /(aug(?![0-9])|\+5|＃5)/i.test(chord) && !/(aug|\+|＃).*7/i.test(chord);
  // 7度のaugや+や#（aug7, +7, #7）判定
  const aug7 = /(aug|\+|＃).*7/i.test(chord);
  const m3 = !isPowerChord && !isOctaveUnison && chord.includes("m") && !/(dim|-5)/i.test(chord) && !aug7 && !aug5;
  const sus4 = !isPowerChord && !isOctaveUnison && chord.includes("sus4");
  // dim5判定に正規表現を使用
  const dim5 = !isPowerChord && !isOctaveUnison && /(dim|-5)/i.test(chord) && !aug7 && !aug5;
  // maj7判定を拡張（maj7, M7, △7 など）
  const maj7 = !isPowerChord && !isOctaveUnison && /(maj7|M7|△7)/i.test(chord);
  const m7 = !isPowerChord && !isOctaveUnison && chord.includes("7") && !maj7 && !aug7;

  // 特別なコード分岐
  let frets;
  if (isAllKeys) {
    frets = [
      { interval: "1", fret: 0 },
      { interval: "♭2", fret: 1 },
      { interval: "2", fret: 2 },
      { interval: "♭3", fret: 3 },
      { interval: "3", fret: 4 },
      { interval: "4", fret: 5 },
      { interval: "♭5", fret: 6 },
      { interval: "5", fret: 7 },
      { interval: "＃5", fret: 8 },
      { interval: "6", fret: 9 },
      { interval: "♭7", fret: 10 },
      { interval: "7", fret: 11 },
    ];
  } else if (isWhiteKeys) {
    frets = [
      { interval: "1", fret: 0 },
      { interval: "2", fret: 2 },
      { interval: "3", fret: 4 },
      { interval: "4", fret: 5 },
      { interval: "5", fret: 7 },
      { interval: "6", fret: 9 },
      { interval: "7", fret: 11 },
    ];
  } else if (isPowerChord) {
    frets = [
      { interval: "1", fret: 0 },
      { interval: "5", fret: 7 },
    ];
  } else if (isOctaveUnison) {
    frets = [
      { interval: "1", fret: 0 },
      { interval: "8", fret: 12 },
    ];
  } else if (aug5) {
    // 5度増コードは1度と#5のみ
    frets = [
      { interval: "1", fret: 0 },
      { interval: "＃5", fret: 8 },
    ];
  } else {
    frets = getFrets(m3, sus4, dim5, maj7, m7, aug7);
  }

  // ルートは特別コード時はC固定
  const useRoot = isAllKeys || isWhiteKeys ? "C" : root;
  const offset = getFretOffset(useRoot);
  const fretsWithPitch = getPitches(useRoot, frets, offset - 12);
  const octaveFrets = fretsWithPitch.flatMap((fret) => {
    return [
      {
        fret: fret.fret,
        interval: fret.interval,
        pitch: `${fret.pitch}1`,
      },
      {
        fret: fret.fret + 12,
        interval: fret.interval,
        pitch: `${fret.pitch}2`,
      },
      {
        fret: fret.fret + 24,
        interval: fret.interval,
        pitch: `${fret.pitch}3`,
      },
      {
        fret: fret.fret + 36,
        interval: fret.interval,
        pitch: `${fret.pitch}4`,
      },
    ].filter((f) => f.fret >= 0 && f.fret <= 39);
  });
  const chordPositions = convertFretsToPositions(octaveFrets);
  return chordPositions;
};

export const getInterval = (chord: string, targetPitch: string) => {
  const targetName = targetPitch.replace(/\d+$/, "");
  const root = getRootNote(chord);
  const pitches = pitchMap[root];
  const index = pitches.findIndex((pitch) => {
    const names = pitch.split("/").map((p) => p.replace(/\d+$/, ""));
    return names.includes(targetName);
  });
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
  const interval = intervalMap[index] || "";
  return interval;
};
