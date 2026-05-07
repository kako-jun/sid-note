#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SID_FRET_DIR="${ROOT_DIR}/../sid-fret"
SID_FRET_REPO="${SID_FRET_REPO:-https://github.com/kako-jun/sid-fret.git}"
SID_FRET_REF="${SID_FRET_REF:-$(cat "${ROOT_DIR}/sid-fret.ref")}"

echo "[sid-note] root: ${ROOT_DIR}"
echo "[sid-note] sid-fret ref: ${SID_FRET_REF}"

ensure_rust() {
  if command -v rustup >/dev/null 2>&1; then
    return
  fi
  unset RUSTUP_VERSION
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain stable
  # shellcheck disable=SC1090
  . "$HOME/.cargo/env"
  rustup target add wasm32-unknown-unknown
}

ensure_wasm_pack() {
  # shellcheck disable=SC1090
  . "$HOME/.cargo/env" 2>/dev/null || true
  if command -v wasm-pack >/dev/null 2>&1; then
    return
  fi
  cargo install wasm-pack --locked
}

if [ -d "${SID_FRET_DIR}/.git" ]; then
  echo "[sid-note] using existing sibling repo: ${SID_FRET_DIR}"
else
  echo "[sid-note] cloning sid-fret into sibling directory"
  rm -rf "${SID_FRET_DIR}"
  git clone --depth 1 "${SID_FRET_REPO}" "${SID_FRET_DIR}"
  git -C "${SID_FRET_DIR}" fetch --depth 1 origin "${SID_FRET_REF}"
  git -C "${SID_FRET_DIR}" -c advice.detachedHead=false checkout "${SID_FRET_REF}"
fi

ensure_rust
ensure_wasm_pack

if [ ! -f "${SID_FRET_DIR}/pkg/package.json" ]; then
  echo "[sid-note] building sid-fret wasm package"
  (
    cd "${SID_FRET_DIR}"
    # shellcheck disable=SC1090
    . "$HOME/.cargo/env" 2>/dev/null || true
    npm run build:wasm
  )
fi

cd "${ROOT_DIR}"
npm ci
npm run build
