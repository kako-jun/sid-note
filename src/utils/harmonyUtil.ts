import { getScaleDiatonicChords } from "./scaleUtil";

// 機能和声・カデンツ関連ユーティリティ
export const getFunctionalHarmony = (scale: string, chord: string) => {
  const chords = getScaleDiatonicChords(scale);
  const index = chords.indexOf(chord);
  if (index >= 0) {
    return index + 1;
  }
  return 0;
};

export const functionalHarmonyText = (interval: number) => {
  switch (interval) {
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
    return "Perfect Cadence";
  } else if (prevFunctionalHarmony === 4 && functionalHarmony === 1) {
    return "Plagal Cadence";
  } else if (prevFunctionalHarmony === 5 && functionalHarmony === 6) {
    return "Deceptive Cadence";
  } else if (functionalHarmony === 5) {
    return "Half Cadence";
  } else if (functionalHarmony === 7) {
    return "Phrygian Cadence";
  }
  return "";
};
