// クロマチックノート判定
// nextNoteが存在し、かつ前後が半音（クロマチック）でつながっている場合true
import { NoteType } from "@/schemas/trackSchema";

export function isChromaticNote(note: NoteType, nextNote: NoteType | null): boolean {
  if (!note.pitch || !nextNote?.pitch) return false;
  // ピッチ名を絶対的な半音インデックスに変換
  const getAbsolutePitchIndex = (p: string) => {
    // 例: C＃4, D♭3 など
    const match = p.match(/^([A-G][＃♭]?)(\d+)$/);
    if (!match) return null;
    const name = match[1];
    const octave = parseInt(match[2], 10);
    // 12音階配列
    const chromatic = ["C", "C＃/D♭", "D", "D＃/E♭", "E", "F", "F＃/G♭", "G", "G＃/A♭", "A", "A＃/B♭", "B"];
    // nameが含まれるインデックスを探す
    const idx = chromatic.findIndex((x) => x.split("/").includes(name));
    if (idx === -1) return null;
    return octave * 12 + idx;
  };
  const i1 = getAbsolutePitchIndex(note.pitch);
  const i2 = getAbsolutePitchIndex(nextNote.pitch);
  if (i1 === null || i2 === null) return false;
  // 隣り合う半音かどうか
  return Math.abs(i1 - i2) === 1;
}
