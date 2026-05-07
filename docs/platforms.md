# 動作環境とデプロイ

## ブラウザ

モダンブラウザであれば動作する。
Canvas API を使用しているため、IE などのレガシーブラウザは非対応。

Windows 環境では線の太さを自動調整する処理が含まれている（`navigator.userAgent` で判定）。

## ローカル開発

```bash
npm install
npm run dev
```

`http://localhost:3000` で開発サーバーが起動する。

テストの実行：

```bash
# TypeScript テスト（Jest）
npm test

# Rust テスト
cd rust-music && cargo test
```

## Cloudflare Pages

Next.js の静的エクスポートまたは Edge Runtime を使って Cloudflare Pages にデプロイできる。

`next.config.ts` で設定を確認すること。

## Docker

`Dockerfile` と `compose.yaml` が同梱されている。

```bash
# イメージのビルドと起動
docker compose up --build
```

コンテナ内で Next.js の本番ビルドが実行される。

## WASM ビルド（Phase 4 以降）

Rust 製の音楽理論ライブラリを WASM としてビルドするには `wasm-pack` が必要：

```bash
# wasm-pack のインストール
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

# WASM ビルド
cd rust-music
wasm-pack build --target web --out-dir pkg
```

ビルド後の `pkg/` ディレクトリを Next.js から参照する形で統合する予定。
