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

export const functionalHarmonyInfo = (degree: number) => {
  switch (degree) {
    case 1:
      return { roman: "Ⅰ", desc: "Tonic (主音): 安心・落ち着き" };
    case 2:
      return { roman: "Ⅱ", desc: "Supertonic (上主音): 期待・問い" };
    case 3:
      return { roman: "Ⅲ", desc: "Mediant (中音): 穏やか・中間" };
    case 4:
      return { roman: "Ⅳ", desc: "Subdominant (下属音): 広がり・始まり" };
    case 5:
      return { roman: "Ⅴ", desc: "Dominant (属音): 緊張・推進" };
    case 6:
      return { roman: "Ⅵ", desc: "Submediant (下中音): 儚さ・哀愁" };
    case 7:
      return { roman: "Ⅶ", desc: "Leading Tone (導音): 不安・未解決" };
    default:
      return { roman: "", desc: "" };
  }
};

export const romanNumeralHarmonyInfo = (degree: number) => {
  switch (degree) {
    case 1:
      return { roman: "Ⅰ", desc: "Tonic (主和音・長三和音): 安心・落ち着き" };
    case 2:
      return { roman: "Ⅱm", desc: "Supertonic (上主和音・短三和音): 期待・問い" };
    case 3:
      return { roman: "Ⅲm", desc: "Mediant (中和音・短三和音): 穏やか・中間" };
    case 4:
      return { roman: "Ⅳ", desc: "Subdominant (下属和音・長三和音): 広がり・始まり" };
    case 5:
      return { roman: "Ⅴ", desc: "Dominant (属和音・長三和音): 緊張・推進" };
    case 6:
      return { roman: "Ⅵm", desc: "Submediant (下中和音・短三和音): 儚さ・哀愁" };
    case 7:
      return { roman: "Ⅶdim", desc: "Leading Tone (導和音・減三和音): 不安・未解決" };
    default:
      return { roman: "", desc: "" };
  }
};

export const romanNumeral7thHarmonyInfo = (degree: number) => {
  switch (degree) {
    case 1:
      return { roman: "ⅠM7", desc: "Tonic Seventh (主和音・長七の和音): 安心・落ち着き" };
    case 2:
      return { roman: "Ⅱm7", desc: "Supertonic Seventh (上主和音・短七の和音): 期待・問い" };
    case 3:
      return { roman: "Ⅲm7", desc: "Mediant Seventh (中和音・短七の和音): 穏やか・中間" };
    case 4:
      return { roman: "ⅣM7", desc: "Subdominant Seventh (下属和音・長七の和音): 広がり・始まり" };
    case 5:
      return { roman: "Ⅴ7", desc: "Dominant Seventh (属和音・属七の和音): 緊張・推進" };
    case 6:
      return { roman: "Ⅵm7", desc: "Submediant Seventh (下中和音・短七の和音): 儚さ・哀愁" };
    case 7:
      return { roman: "Ⅶm7♭5", desc: "Leading Tone Seventh (導和音・半減七の和音): 不安・未解決" };
    default:
      return { roman: "", desc: "" };
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
