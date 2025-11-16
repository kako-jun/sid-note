# 音楽理論機能の完全リスト（TypeScript → Rust移植用）

## 1. noteUtil.ts（音高・五線譜関連）
- [ ] `getLine(pitch: string): number | null` - 五線譜のライン番号を取得（E1〜G4）
- [ ] `getKeyPosition(scale: string): { circle: string; index: number }` - 五度圏での位置を取得
- [ ] `comparePitch(pitch1: string, pitch2: string): boolean` - ピッチの異名同音比較
- [ ] `valueText(value: string): string` - 音符の値を英語テキストに変換

## 2. chordUtil.ts（コード・ポジション関連）
- [ ] `getRootNote(chord: string): string` - コード名からルート音を抽出
- [ ] `getFrets(...): { interval: string; fret: number }[]` - フレット位置の配列を取得
- [ ] `getFretOffset(root: string): number` - ルート音のフレットオフセットを取得
- [ ] `pitchMap: { [key: string]: string[] }` - 全キーのピッチマップ（巨大な定数）
- [ ] `getPitches(root, frets, offset): { interval, fret, pitch }[]` - フレット→ピッチ変換
- [ ] `convertFretsToPositions(frets): Position[]` - フレット→弦ポジション変換
- [ ] `getChordPositions(chord: string): Position[]` - コード名→すべてのポジション取得
- [ ] `getInterval(chord: string, targetPitch: string): string` - インターバル記号を取得

## 3. scaleUtil.ts（スケール・ダイアトニックコード）
- [ ] `getScaleNoteNames(scale: string): string[]` - スケールの構成音を取得（全24キー）
- [ ] `getScaleDiatonicChords(scale: string): string[]` - ダイアトニックコード（トライアド）
- [ ] `getScaleDiatonicChordsWith7th(scale: string): string[]` - ダイアトニックコード（7th）
- [ ] `scaleText(scale: string): string` - スケール名の英語表記

## 4. harmonyUtil.ts（機能和声・カデンツ）
- [ ] `getFunctionalHarmony(scale: string, chord: string): number` - ディグリー番号を取得（1〜7）
- [ ] `functionalHarmonyText(degree: number): string` - ディグリーのテキスト表示
- [ ] `functionalHarmonyInfo(degree: number): { roman, desc }` - 音階度の情報
- [ ] `romanNumeralHarmonyInfo(degree: number): { roman, desc }` - 和音のローマ数字表記
- [ ] `romanNumeral7thHarmonyInfo(degree: number): { roman, desc }` - 7thコードのローマ数字表記
- [ ] `getChordToneLabel(scale, chord, targetPitch): string` - コードトーンのラベル
- [ ] `cadenceText(prevDegree, degree): string` - カデンツの種類を判定

## 5. chromaticUtil.ts（クロマチック判定）
- [ ] `isChromaticNote(note, nextNote): boolean` - 半音進行の判定
- [ ] `getAbsolutePitchIndex(pitch: string): number | null` - 絶対的な半音インデックス

## 6. chordNameAlias.ts（コード名の別表記）
- [ ] `getChordNameAliases(chord: string): string[]` - コード名の別表記を取得

---

## UI専用（Rustに移植しない）
- ❌ `functionalHarmonyFilter.ts` - CSS filter値を返す（UIロジック）
- ❌ `objectUtil.ts` - toCamelCaseKeysDeep（汎用ユーティリティ）

## 移植優先度
1. **Phase 1（コア）**: chordUtil.ts, scaleUtil.ts
2. **Phase 2（理論）**: harmonyUtil.ts, noteUtil.ts
3. **Phase 3（拡張）**: chromaticUtil.ts, chordNameAlias.ts
