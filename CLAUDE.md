# sid-note

## デザイン

UI の生成・修正時は `DESIGN.md` に定義されたデザインシステムに従うこと。
定義外の色・フォント・スペーシングを勝手に使わない。

## WASM / Cloudflare Pages

- `main` は新しい WASM / リブート版として扱う
- 旧版は比較用ブランチ / URL に逃がす
- Cloudflare Pages 用ビルドは `npm run build:cloudflare`
- `sid-fret` は sibling repo から取得し、必要なら build 時に `wasm-pack` で生成する
