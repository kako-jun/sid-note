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
  const isPowerChord = /^[A-G](♭|＃)?5$/.test(chord);
  const isOctaveUnison = /8(?![0-9])/.test(chord);

  let frets;
  let useRoot;

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
    useRoot = "C";
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
    useRoot = "C";
  } else if (isPowerChord) {
    frets = [
      { interval: "1", fret: 0 },
      { interval: "5", fret: 7 },
    ];
    useRoot = getRootNote(chord);
  } else if (isOctaveUnison) {
    frets = [
      { interval: "1", fret: 0 },
      { interval: "8", fret: 12 },
    ];
    useRoot = getRootNote(chord);
  } else {
    // 通常コードの判定
    // デフォルト構成音（メジャートライアド）
    let baseFrets = [
      { interval: "1", fret: 0 },
      { interval: "3", fret: 4 },
      { interval: "5", fret: 7 },
    ];

    // 7thの種類を先に判定
    const has7th = /7/.test(chord);
    const isMaj7 = /(maj7|M7|△7)/.test(chord);
    const isAug7 = /(aug7|\+7|＃7)$/.test(chord);
    const isM7 = has7th && !isMaj7 && !isAug7;

    // 3rd/5thの判定フラグ
    const isSus4 = /sus4/.test(chord);
    const isMinor = /^(?:[A-G](?:♭|＃)?)(m|min)(?!aj|dim)/.test(chord);
    const isAug = /(aug(?![0-9])|\+5|＃5)/.test(chord);
    const isDim = /(♭5|-5|b5)/.test(chord) || /dim/.test(chord);

    // baseFretsを一括で編集
    baseFrets = baseFrets.map((f) => {
      if (f.interval === "3") {
        if (isSus4) return { ...f, interval: "4", fret: 5 };
        if (isMinor || isDim) return { ...f, interval: "♭3", fret: 3 };
        return f;
      }

      if (f.interval === "5") {
        if (isAug) return { ...f, interval: "＃5", fret: 8 };
        if (isDim) return { ...f, interval: "♭5", fret: 6 };
        return f;
      }

      return f;
    });

    // 7th
    if (isAug7) {
      baseFrets.push({ interval: "＃5", fret: 8 });
      baseFrets.push({ interval: "♭7", fret: 10 });
    } else if (isMaj7) {
      baseFrets.push({ interval: "7", fret: 11 });
    } else if (isM7) {
      baseFrets.push({ interval: "♭7", fret: 10 });
    }

    frets = baseFrets;
    useRoot = getRootNote(chord);
  }

  const offset = getFretOffset(useRoot);
  const fretsWithPitch = getPitches(useRoot, frets, offset - 12);

  // オクターブ番号をCで切り替える
  let currentOctave = 0;
  const octaveFrets = fretsWithPitch
    .map((fret) => {
      const pitchName = fret.pitch.replace(/\d+$/, "");
      if (pitchName.startsWith("C") || pitchName.startsWith("D")) {
        currentOctave = 1;
      }

      return [
        {
          fret: fret.fret,
          interval: fret.interval,
          pitch: `${pitchName}${currentOctave}`,
        },
        {
          fret: fret.fret + 12,
          interval: fret.interval,
          pitch: `${pitchName}${currentOctave + 1}`,
        },
        {
          fret: fret.fret + 24,
          interval: fret.interval,
          pitch: `${pitchName}${currentOctave + 2}`,
        },
        {
          fret: fret.fret + 36,
          interval: fret.interval,
          pitch: `${pitchName}${currentOctave + 3}`,
        },
      ].filter((f) => f.fret >= 0 && f.fret <= 39);
    })
    .flat();
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
