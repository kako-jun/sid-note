# sid-note

A bass guitar fingering viewer that bridges the gap between TAB notation and music theory.

## Features

- **Fretboard visualization** -- see exactly which string and fret to press for each note
- **Music theory integration** -- displays intervals (root, 3rd, 5th, 7th), diatonic functions, and cadences alongside fingering
- **Picking direction** -- shows right-hand string and stroke direction per note
- **Multiple position candidates** -- automatically calculates alternative fingerings
- **Circle of fifths** -- interactive key relationship display
- **Diatonic chord table** -- functional harmony at a glance
- **Keyboard & staff views** -- pitch displayed on piano keys and standard notation

## How it differs from TAB

| | TAB | sid-note |
|---|---|---|
| Fret position | Yes | Yes |
| Music theory context | No | Yes (chords, scales, harmony) |
| Pitch display | No (inferred from fret) | Yes |
| Picking info | No | Yes |
| Position candidates | Manual | Auto-calculated |

## Getting Started

```bash
git clone https://github.com/kako-jun/sid-note.git
cd sid-note
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

### Running tests

```bash
# TypeScript tests
npm test

# Rust music theory engine tests
cd rust-music && cargo test
```

## Tech Stack

| Technology | Role |
|---|---|
| Next.js 15 | Framework |
| React 19 + TypeScript 5 | UI |
| Tailwind CSS 4 | Styling |
| Rust + WebAssembly | Music theory engine (migration in progress) |
| Zod | YAML schema validation |

## Architecture

The app is split into three layers:

1. **UI Layer** -- React components (Keyboard, Staff, CircleOfFifths, DiatonicChordTable)
2. **Music Theory Layer** -- Note, Chord, Scale, Harmony analysis (TypeScript, being ported to Rust/WASM)
3. **Instrument Layer** -- Bass fretboard position calculation and fingering pattern generation

Track data is stored as YAML files validated with Zod schemas.

## Status

- TypeScript implementation: fully functional and deployed
- Rust/WASM port: all 26 music theory functions ported with 80% test coverage
- WASM integration into Next.js: planned (Phase 4)

## License

MIT
