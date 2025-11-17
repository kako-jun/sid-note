# sid-note TODOリスト

最終更新: 2025-11-16

## 🎯 現在のフェーズ: Phase 3完了、Phase 4準備中

---

## ✅ 完了タスク

### Phase 1: Rustプロジェクトセットアップ
- [x] rust-music/ディレクトリ作成
- [x] Cargo.toml設定（WASM bindings）
- [x] モジュール構成設計
- [x] .gitignore設定
- [x] README.md作成

### Phase 2: 音楽理論関数の移植
- [x] noteUtil.ts → core/note.rs (4関数)
  - [x] get_line()
  - [x] get_key_position()
  - [x] compare_pitch()
  - [x] value_text()
- [x] chordUtil.ts → chord/*.rs (8関数)
  - [x] get_root_note()
  - [x] get_fret_offset()
  - [x] get_frets()
  - [x] get_pitch_map()
  - [x] get_pitches()
  - [x] convert_frets_to_positions()
  - [x] get_chord_positions()
  - [x] get_interval()
- [x] scaleUtil.ts → scale/diatonic.rs (4関数)
  - [x] get_scale_note_names()
  - [x] get_scale_diatonic_chords()
  - [x] get_scale_diatonic_chords_with_7th()
  - [x] scale_text()
- [x] harmonyUtil.ts → harmony/*.rs (7関数)
  - [x] get_functional_harmony()
  - [x] functional_harmony_text()
  - [x] functional_harmony_info()
  - [x] roman_numeral_harmony_info()
  - [x] roman_numeral_7th_harmony_info()
  - [x] get_chord_tone_label()
  - [x] cadence_text()
- [x] chromaticUtil.ts → utils/chromatic.rs (2関数)
  - [x] is_chromatic_note()
  - [x] get_absolute_pitch_index()
- [x] chordNameAlias.ts → utils/chord_alias.rs (1関数)
  - [x] get_chord_name_aliases()

### Phase 3: テスト・検証
- [x] Rustユニットテスト作成（21個）
- [x] TypeScriptテスト作成（34個）
- [x] デグレチェック実施
- [x] バグ発見と記録
- [x] Jest設定（jest.config.js）
- [x] すべてのコンパイルエラー解決

### ドキュメント整備
- [x] MUSIC_THEORY_FUNCTIONS.md（機能チェックリスト）
- [x] .claude/music-theory-wasm-rust-progress.md（進捗記録）
- [x] .claude/CLAUDE.md（設計ドキュメント）
- [x] .claude/TODO.md（このファイル）
- [x] rust-music/README.md

### Git管理
- [x] ブランチ作成: claude/music-theory-wasm-rust-01JDZ19CjBzUhUibMkvErrJj
- [x] 初回コミット: Rustライブラリ追加
- [x] 2回目コミット: 進捗ドキュメント追加
- [x] 3回目コミット: TypeScriptテスト追加
- [x] リモートへプッシュ

---

## 🔄 進行中タスク

現在進行中のタスクはありません。

---

## 📋 保留中タスク

### Phase 4: WASM統合（優先度: 高）

#### 4.1 WASMビルド環境構築
- [ ] wasm-packインストール確認
  ```bash
  curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
  ```
- [ ] WASMビルド実行
  ```bash
  cd rust-music
  wasm-pack build --target web --out-dir pkg
  ```
- [ ] ビルド成果物の確認（pkg/ディレクトリ）
- [ ] TypeScript型定義の確認

#### 4.2 Next.js統合
- [ ] WASM初期化コードの作成
  - [ ] `src/lib/wasm-init.ts` 作成
  - [ ] 初期化エラーハンドリング
- [ ] 1つのコンポーネントでテスト統合
  - [ ] `Keyboard.tsx`でWASM関数呼び出し
  - [ ] パフォーマンス測定
- [ ] 段階的な移行計画
  - [ ] フェーズごとに置き換える関数を決定
  - [ ] ロールバック計画

#### 4.3 互換性確保
- [ ] TypeScript関数とWASM関数の型互換性確認
- [ ] エラーハンドリングの統一
- [ ] デバッグ用のフォールバック実装

---

## 🐛 バグ修正

### 高優先度
- [ ] **Bug #1**: `comparePitch()` の異名同音判定
  - **場所**: `src/utils/noteUtil.ts:174-195`
  - **症状**: C＃2とD♭2が異なると判定される
  - **原因**: 文字列比較のみ、半音インデックスで比較していない
  - **対応方針**:
    - Option A: TypeScript実装を修正（Rustと同じロジックに）
    - Option B: Rustのみ正しく動作、TypeScriptは非推奨化
    - **決定待ち**

### 中優先度
なし

### 低優先度
なし

---

## 🧪 テストカバレッジ向上

### TypeScriptテスト拡充
- [ ] Reactコンポーネントのテスト
  - [ ] Keyboard.tsx
  - [ ] Staff.tsx
  - [ ] CircleOfFifths.tsx
- [ ] 統合テスト
  - [ ] YAMLデータ読み込み
  - [ ] ルーティング

### Rustテスト拡充
- [ ] エッジケーステスト追加
  - [ ] 特殊なコード名（aug, dim, sus）
  - [ ] 異名同音のすべてのパターン
- [ ] プロパティベーステスト導入
  - [ ] `proptest` クレート導入検討

---

## 📚 ドキュメント整備

### ユーザー向けドキュメント
- [ ] README.mdの拡充
  - [ ] スクリーンショット追加
  - [ ] 使い方ガイド
  - [ ] FAQセクション
- [ ] オンラインドキュメントサイト
  - [ ] GitHubPages or Vercel
  - [ ] 音楽理論の解説ページ

### 開発者向けドキュメント
- [ ] コントリビューションガイド
- [ ] アーキテクチャ図の作成
- [ ] API仕様書（Rust関数のドキュメント）

---

## ⚡ パフォーマンス最適化

### 測定
- [ ] ベンチマーク環境構築
- [ ] TypeScript実装とWASM実装の比較
- [ ] ボトルネック特定

### 最適化
- [ ] WASMバンドルサイズ削減
  - [ ] `wee_alloc`の導入検討
  - [ ] 不要な機能の削除
- [ ] 計算の並列化
  - [ ] `rayon`クレートの検討（WASMでは制限あり）
- [ ] キャッシング戦略
  - [ ] よく使われるコードのポジション事前計算
  - [ ] LocalStorageへのキャッシュ

---

## 🎨 UI/UX改善

### デザイン
- [ ] レスポンシブデザインの改善
- [ ] ダークモード対応
- [ ] アクセシビリティ向上（ARIA属性）

### 機能追加
- [ ] キーボードショートカット
- [ ] コード進行のプレイバック機能
- [ ] MIDIファイルインポート

---

## 🔧 技術的負債の解消

### 高優先度
- [ ] TypeScript型安全性の向上
  - [ ] YAMLデータのZodスキーマ検証強化
  - [ ] `any`型の排除
- [ ] エラーハンドリングの統一
  - [ ] カスタムエラー型の導入
  - [ ] エラーバウンダリの実装

### 中優先度
- [ ] 依存関係の更新
  - [ ] `npm audit fix`実行
  - [ ] セキュリティ脆弱性の解消
- [ ] コードスメルの解消
  - [ ] 巨大な関数の分割
  - [ ] 重複コードの削除

---

## 🚀 機能追加

### 楽器対応拡張
- [ ] ギター対応（6弦）
- [ ] ウクレレ対応（4弦）
- [ ] 5弦ベース対応
- [ ] カスタムチューニング対応

### 音楽理論機能
- [ ] モードスケール対応（Dorian, Phrygian, etc.）
- [ ] コードスケール理論
- [ ] テンションノートの表示
- [ ] 代理コードの提案

### データ管理
- [ ] ユーザー登録・認証
- [ ] 楽曲データのクラウド保存
- [ ] 楽曲の共有機能

---

## 📦 ライブラリ分離

### 準備
- [ ] ライセンス確認（MITライセンス適用済み）
- [ ] バージョニング戦略（Semantic Versioning）
- [ ] CHANGELOG.mdの作成

### 実施
- [ ] `git subtree split`でrust-musicを分離
- [ ] 独立リポジトリの作成
- [ ] NPMパッケージ化
  - [ ] package.jsonの作成
  - [ ] npmレジストリへの公開

### CI/CD
- [ ] GitHub Actionsの設定
  - [ ] Rustテスト自動実行
  - [ ] WASMビルド自動化
  - [ ] NPM自動公開

---

## 🎓 学習・調査タスク

- [ ] WebAssembly最適化手法の調査
- [ ] Rust並列処理の学習（`rayon`, `tokio`）
- [ ] Web Audio APIとの統合可能性
- [ ] 既存音楽理論ライブラリとの統合可能性
  - [ ] rust-music-theoryの評価
  - [ ] kordライブラリの評価

---

## 📅 マイルストーン

### v0.2.0（WASM統合完了）
**目標日**: 未定
- [x] Rust実装完了
- [x] テスト作成
- [ ] WASM統合
- [ ] パフォーマンス検証

### v0.3.0（機能拡張）
**目標日**: 未定
- [ ] モードスケール対応
- [ ] テンションノート表示
- [ ] ドキュメント整備

### v1.0.0（安定版）
**目標日**: 未定
- [ ] すべての機能テスト済み
- [ ] ドキュメント完備
- [ ] パフォーマンス最適化完了
- [ ] セキュリティ監査済み

---

## 🔍 レビュー待ちタスク

### ユーザー判断が必要
1. **Bug #1の対応方針**
   - TypeScript実装を修正するか？
   - それともWASMに完全移行するか？

2. **Phase 4の開始タイミング**
   - 今すぐWASM統合を始めるか？
   - 他の優先タスクがあるか？

3. **ライブラリ分離のタイミング**
   - いつ独立リポジトリにするか？
   - モノレポのまま管理するか？

---

## 📝 メモ・アイデア

- **パフォーマンステスト**: 1000個のコードポジション計算でTS vs WASMベンチマーク
- **キャッシング**: `get_chord_positions("C")` の結果をメモ化
- **プラグインシステム**: 将来的にサードパーティが楽器定義を追加できる仕組み
- **Progressive Web App**: オフラインでも使える
- **教育機能**: 音楽理論の学習モード追加

---

**このTODOリストの管理方法:**
- タスク完了時: `- [ ]` → `- [x]`
- 新規タスク追加: 該当セクションに追記
- 優先度変更: セクション間で移動
- 定期レビュー: 週次で見直し
