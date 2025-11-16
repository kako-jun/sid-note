# sid-note-music

音楽理論ライブラリ（Rust + WASM）

sid-noteアプリケーションの音楽理論機能をRustで実装し、WASMとしてNext.jsから利用可能にします。

## 機能

- **Note（音符）**: 五線譜位置計算、ピッチ比較、音価テキスト変換
- **Chord（コード）**: ルート音抽出、フレット位置計算、インターバル判定
- **Scale（スケール）**: 構成音取得、ダイアトニックコード生成（トライアド・7th）
- **Harmony（和声）**: 機能和声分析、カデンツ判定、ローマ数字表記
- **Utils（ユーティリティ）**: クロマチック判定、コード名別表記

## ビルド

### 前提条件
```bash
# wasm-packをインストール
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
```

### WASMビルド
```bash
cd rust-music
wasm-pack build --target web --out-dir pkg
```

### テスト実行
```bash
cargo test
```

## Next.jsからの使用

```typescript
import init, {
  get_chord_positions,
  get_functional_harmony,
  cadence_text
} from '@/rust-music/pkg';

// 初期化
await init();

// 使用例
const positions = get_chord_positions("Cmaj7");
const degree = get_functional_harmony("C", "Em"); // 3
const cadence = cadence_text(5, 1); // "Perfect Cadence"
```

## 元のTypeScript実装との対応

| TypeScript | Rust |
|------------|------|
| `noteUtil.ts` | `src/core/note.rs` |
| `chordUtil.ts` | `src/chord/*.rs` |
| `scaleUtil.ts` | `src/scale/diatonic.rs` |
| `harmonyUtil.ts` | `src/harmony/*.rs` |
| `chromaticUtil.ts` | `src/utils/chromatic.rs` |
| `chordNameAlias.ts` | `src/utils/chord_alias.rs` |

## ライセンス

MIT
