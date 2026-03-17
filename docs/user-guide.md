# 使い方ガイド

## トラックの作成

トラックは YAML ファイルとして `public/` 以下に配置する。
`track.schema.json` に従ってデータを記述する。

**基本構造:**
```yaml
title: "曲名"
artist: "アーティスト名"
album: "アルバム名"
year: 2024
key: "Am"
timeSignature: "4/4"
bpm: 120
sections:
  - name: "イントロ"
    chordSegments:
      - chord: "Am"
        notes:
          - ...
```

**必須フィールド:**
- `title`, `artist`, `album`, `year` — 楽曲の基本情報
- `key` — 調（例: `C`, `Am`, `G＃`, `B♭m`）
- `timeSignature` — 拍子（`2/4` / `3/4` / `4/4`）
- `bpm` — テンポ
- `sections` — セクション（イントロ・Aメロ・サビなど）の配列

## ノート入力

各ノートは `NoteSchema` に従って記述する。

**音符の記述例:**
```yaml
notes:
  - pitch: "A2"
    value: "quarter"
    lefts:
      - finger: 2
        string: 1
        fret: 5
        type: "press"
        pitch: "A2"
        interval: "1"
    right:
      string: 1
      stroke: "down"
      muteStrings: []
```

**音価の種類:**
| 値 | 意味 |
|----|------|
| `whole` | 全音符 |
| `half` | 二分音符 |
| `quarter` | 四分音符 |
| `8th` | 八分音符 |
| `16th` | 十六分音符 |
| `dotted_*` | 付点（例: `dotted_quarter`） |
| `triplet_*` | 三連符（例: `triplet_8th`） |

**ピッチの書き方:**
- アルファベット + 臨時記号 + オクターブ番号（例: `C＃3`, `B♭2`）
- シャープは全角 `＃`、フラットは半角 `♭` を使う
- 対応範囲: E1〜G4

## 表示の見方

**鍵盤ビュー（Keyboard）:**
- 横軸がピッチ（E1 左端〜G4 右端）
- 現在の音符を白い円で表示
- 次の音符をシアンの発光円で表示

**五線譜ビュー（Staff）:**
- 縦軸がピッチ（下から上に音が高くなる）
- ベース音域（低音部譜表相当）を3段に分けて表示
- 臨時記号（＃・♭）は円の左側に表示

**五度圏ビュー（CircleOfFifths）:**
- 外円がメジャーキー、内円がマイナーキー
- 現在のキーを白い円でハイライト

**ダイアトニックコード表（DiatonicChordTable）:**
- 現在のキーに対するⅠ〜Ⅶのコードを一覧表示
- 現在演奏中のコードがハイライトされる

## 再生

開発サーバーを起動してブラウザで確認する：

```bash
npm run dev
```

`http://localhost:3000` を開くと楽曲一覧が表示される。
楽曲を選択するとセクション・コード・ノートを順に表示できる。

## エクスポート

現時点では明示的なエクスポート機能はない。
五度圏の画像は `getCircleOfFifthsImage(scale)` を呼ぶことでデータ URL（PNG）として取得できる。
