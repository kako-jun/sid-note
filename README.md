# sid-note

sid-note is a bass fingering viewer that shows lines more concretely than TAB.

## Local development

`sid-note` depends on the prebuilt WASM package from sibling repo `sid-fret`.

```bash
git clone git@github.com:kako-jun/sid-note.git
git clone git@github.com:kako-jun/sid-fret.git

cd sid-note
npm ci
npm run dev
```

## Cloudflare Pages build

During the WASM migration, keep two URLs alive:

- `sid-note.llll-ll.com` = stable
- `beta.sid-note.llll-ll.com` or `sid-note-next.llll-ll.com` = WASM / reboot preview

For GitHub-linked Cloudflare Pages, use this build command:

```bash
./scripts/cloudflare-build.sh
```

The script follows the same idea as `orber`:

- install Rust toolchain if missing
- install `wasm-pack` if missing
- clone `sid-fret` when the sibling repo does not exist
- build the WASM package on the fly
- run `npm ci` and `npm run build`

### Suggested Pages setup

- Stable project:
  - Production branch: `main`
  - Custom domain: `sid-note.llll-ll.com`
- Beta project:
  - Production branch: `develop` or `beta`
  - Custom domain: `beta.sid-note.llll-ll.com`
- Build command: `./scripts/cloudflare-build.sh`
- Build output directory: `out`
- Framework preset: none (custom)

If you want to pin another sid-fret revision, change `sid-fret.ref` or set
`SID_FRET_REF` in Cloudflare Pages environment variables.
