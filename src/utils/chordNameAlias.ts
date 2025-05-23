// コード名の別表記を返すユーティリティ
// 例: CM7 → ["CM7", "Cmaj7", "C△7"]
export function getChordNameAliases(chord: string): string[] {
  // ルート音部分とタイプ部分に分割
  const rootMatch = chord.match(/^[A-G](#|＃|b|♭)?/);
  if (!rootMatch) return [chord];
  const root = rootMatch[0];
  const type = chord.slice(root.length);

  // 代表的なコードタイプの別表記マップ
  const typeAliasMap: { [key: string]: string[] } = {
    "": ["", "maj", "△"],
    maj7: ["maj7", "M7", "△7"],
    m7: ["m7", "-7"],
    "7": ["7"],
    m: ["m", "-"],
    dim: ["dim", "o"],
    aug: ["aug", "+"],
    sus4: ["sus4", "sus"],
    add9: ["add9"],
    "6": ["6"],
    "9": ["9"],
    m_maj7: ["m(maj7)", "mM7", "-M7"],
    m6: ["m6", "-6"],
    m9: ["m9", "-9"],
    M9: ["M9", "maj9", "△9"],
    m_maj9: ["m(maj9)", "mM9", "-M9"],
    sus2: ["sus2"],
    "5": ["5"],
    "8": ["8"],
  };

  // type部分がどれに該当するか判定
  for (const [key, aliases] of Object.entries(typeAliasMap)) {
    if (type === key) {
      return aliases.map((a) => root + a);
    }
  }
  // マッチしなければそのまま
  return [chord];
}
