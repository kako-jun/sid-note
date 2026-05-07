# sid-note

A bass guitar fingering viewer that shows lines more concretely than TAB.

## Features

- Fretboard visualization
- Music theory integration
- Multiple fingering candidates
- Circle of fifths / harmony views
- Rust/WASM migration in progress

## Local development

`sid-note` depends on sibling repo `sid-fret`.

```bash
git clone git@github.com:kako-jun/sid-note.git
git clone git@github.com:kako-jun/sid-fret.git

cd sid-note
npm ci
npm run dev
```

## Tests

```bash
npm test
cd rust-music && cargo test
```

## Cloudflare Pages build

`main` is the new WASM / reboot version. Keep the old site only as a comparison URL.

Use this build command for GitHub-linked Cloudflare Pages:

```bash
npm run build:cloudflare
```

The build follows the same pattern as `orber`:

- install Rust toolchain if missing
- install `wasm-pack` if missing
- clone `sid-fret` when the sibling repo does not exist
- build the WASM package on the fly
- run `npm ci` and `npm run build`

### Suggested Pages setup

- Production branch: `main`
- Build command: `npm run build:cloudflare`
- Build output directory: `out`
- Framework preset: none (custom)

Optional comparison site:

- Branch: `legacy-pre-wasm-main`
- Domain: `legacy.sid-note.llll-ll.com`

If you want to pin another `sid-fret` revision, change `sid-fret.ref` or set
`SID_FRET_REF` in Cloudflare Pages environment variables.

## License

MIT
