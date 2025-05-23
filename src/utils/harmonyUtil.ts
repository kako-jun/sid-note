import { getInterval } from "@/utils/chordUtil";
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

export const functionalHarmonyIcon = (degree: number) => {
  switch (degree) {
    case 1:
      return { icon: "😊", desc: "Tonic (主音): 安心・落ち着き" };
    case 2:
      return { icon: "🤔", desc: "Supertonic (上主音): 期待・問い" };
    case 3:
      return { icon: "😌", desc: "Mediant (中音): 穏やか・中間" };
    case 4:
      return { icon: "🌱", desc: "Subdominant (下属音): 広がり・始まり" };
    case 5:
      return { icon: "⚡", desc: "Dominant (属音): 緊張・推進" };
    case 6:
      return { icon: "🥲", desc: "Submediant (下中音): 儚さ・哀愁" };
    case 7:
      return { icon: "😳", desc: "Leading Tone (導音): 不安・未解決" };
    default:
      return { icon: "", desc: "" };
  }
};

export const getChordToneLabel = (scale: string, chord: string, targetPitch: string) => {
  const interval = getInterval(chord, targetPitch);
  if (interval === "1") {
    const chordFunction = getFunctionalHarmony(scale, chord);
    switch (chordFunction) {
      case 1:
        return "Tonic Note";
      case 2:
        return "Supertonic Note";
      case 3:
        return "Mediant Note";
      case 4:
        return "Subdominant Note";
      case 5:
        return "Dominant Note";
      case 6:
        return "Submediant Note";
      case 7:
        return "Leading Tone Note";
    }
  }

  return "";
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
