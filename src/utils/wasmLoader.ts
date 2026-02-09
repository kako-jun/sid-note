// sid-fret WASM ローダー
// 非同期で初期化し、初期化完了後に各関数を利用可能にする

import initWasm, {
  // pitch / note
  compare_pitch,
  fret_offset,
  get_line,
  get_key_position,
  get_root_note,
  value_text,
  // chord
  get_chord_positions,
  get_chord_positions_with_tuning,
  get_interval,
  get_chord_name_aliases,
  // scale
  get_scale_note_names,
  get_scale_diatonic_chords,
  get_scale_diatonic_chords_with_7th,
  scale_text,
  // harmony
  get_functional_harmony,
  functional_harmony_text,
  functional_harmony_info,
  roman_numeral_harmony_info,
  roman_numeral_7th_harmony_info,
  get_chord_tone_label,
  analyze_progression,
  // cadence
  cadence_text,
  cadence_text_extended,
  functional_area,
  // interval
  semitone_distance,
  interval_name,
  detect_inversion,
  // chromatic
  is_chromatic_note,
} from "sid-fret";

let initialized = false;

export async function initSidFret(): Promise<void> {
  if (initialized) return;
  await initWasm();
  initialized = true;
}

export function isSidFretReady(): boolean {
  return initialized;
}

// Re-export all functions
export {
  // pitch / note
  compare_pitch as comparePitch,
  fret_offset as getFretOffset,
  get_line as getLine,
  get_key_position as getKeyPosition,
  get_root_note as getRootNote,
  value_text as valueText,
  // chord
  get_chord_positions as getChordPositions,
  get_chord_positions_with_tuning as getChordPositionsWithTuning,
  get_interval as getInterval,
  get_chord_name_aliases as getChordNameAliases,
  // scale
  get_scale_note_names as getScaleNoteNames,
  get_scale_diatonic_chords as getScaleDiatonicChords,
  get_scale_diatonic_chords_with_7th as getScaleDiatonicChordsWith7th,
  scale_text as scaleText,
  // harmony
  get_functional_harmony as getFunctionalHarmony,
  functional_harmony_text as functionalHarmonyText,
  functional_harmony_info as functionalHarmonyInfo,
  roman_numeral_harmony_info as romanNumeralHarmonyInfo,
  roman_numeral_7th_harmony_info as romanNumeral7thHarmonyInfo,
  get_chord_tone_label as getChordToneLabel,
  analyze_progression as analyzeProgression,
  // cadence
  cadence_text as cadenceText,
  cadence_text_extended as cadenceTextExtended,
  functional_area as functionalArea,
  // interval
  semitone_distance as semitoneDistance,
  interval_name as intervalName,
  detect_inversion as detectInversion,
  // chromatic
  is_chromatic_note as isChromaticNote,
};
