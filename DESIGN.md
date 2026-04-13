# DESIGN.md — sid-note (Bass Fingering Notation Web App)

## 1. Visual Theme

A dark-only web application for bass fingering notation with a gritty, textured aesthetic. Pure black backgrounds, cyan accent glow, canvas-based music notation (fretboard, keyboard, staff), and grunge texture overlays. The interface feels like a well-worn practice notebook — slightly rough around the edges but deeply functional. Wavy clip-path edges and corner graphics add character without sacrificing usability.

## 2. Color Palette

| Token | Value | Usage |
|---|---|---|
| `body-bg` | `#000000` | Body background |
| `root-bg` | `#0a0a0a` | Root container background |
| `text` | `#ededed` | Primary text |
| `accent` | `rgba(0,200,255,1)` | Cyan — interactive elements, highlights, glow |
| `accent-glow` | `rgba(0,200,255,0.5)` | Cyan glow for shadows |
| `root-note` | `khaki` | Root note indicators |
| `border` | `#444444` | Primary borders |
| `border-subtle` | `#333333` | Secondary/subtle borders |
| `popup-bg` | `#222222` | Popup/tooltip backgrounds |
| `scrollbar-thumb` | `#444444` | Custom scrollbar thumb |
| `footer-bg` | `#000000` | Fixed footer background |

## 3. Typography

| Role | Font | Size | Usage |
|---|---|---|---|
| Canvas notation | `Arial, Verdana, sans-serif` | Varies | Fretboard labels, note names, staff text |
| Page layout | `"Shippori Mincho", serif` | 14–18px | Headings, descriptions, UI text |
| Code / values | Monospace fallback | 13px | Technical values, MIDI data |

Shippori Mincho (Google Fonts) gives the layout a literary, slightly vintage Japanese serif feel. Canvas elements use Arial/Verdana for maximum clarity at small sizes on the rendered notation.

## 4. Component Stylings

### Canvas-Based Notation
- Fretboard: horizontal strings, vertical frets, note indicators
- Piano keyboard: standard layout with black/white keys
- Staff: five lines with note heads and accidentals
- All rendered via Canvas 2D context, not DOM elements
- Text on canvas uses Arial/Verdana for clarity

### Next Note Glow
- Color: `rgba(0,200,255,1)` (cyan)
- Box-shadow / canvas shadow: `0 0 10px rgba(0,200,255,0.8)` with 10px blur
- Applied to the next note to play — guides the user's eye

### Grunge Texture Overlays
- Format: `.webp` images
- Blend mode: `multiply`
- Opacity range: `0.05` to `0.3` depending on section
- Applied as background-image or pseudo-element overlay
- Never blocks interactive content

### CornerBox
- Uses `corner.webp` graphics positioned at each corner
- Decorative frame element for major sections
- Background-position: corners, background-repeat: no-repeat

### Popups
- Background: `#222222`
- Border-radius: `6px`
- Border: 1px solid `#444`
- Padding: 12–16px

### ClipPath Wavy Edges
- `clip-path: polygon(...)` with irregular vertices
- Applied to section containers for organic, torn-paper edges
- Coordinates hand-crafted per section

### Section Containers
- `box-shadow: inset 0 0 40px rgba(0,0,0,0.5)` — deep inner shadow
- Creates a vignette effect on content sections
- Background: `#0a0a0a`

### Fixed Footer
- Background: `#000000`
- Position: fixed bottom
- Border-top: 1px solid `#333`
- Contains playback controls

### Custom Scrollbar
- Width: `8px`
- Track: transparent
- Thumb: `#444444`
- Thumb hover: `#555555`
- Border-radius: 4px on thumb

## 5. Layout Principles

- Single-column flow with stacked notation views (fretboard, keyboard, staff)
- Canvas elements are the primary content — sized to show full range
- UI controls surround the canvas areas
- Fixed footer for persistent playback controls
- Sections separated by grunge-textured dividers or clip-path edges
- No max-width constraint — notation benefits from horizontal space

## 6. Depth & Elevation

| Level | Treatment | Usage |
|---|---|---|
| Background | `#000` body, `#0a0a0a` root | Deepest layer |
| Sections | Inset shadow 40px, grunge overlay | Content areas |
| Canvases | Slightly elevated via border or glow | Notation displays |
| Popups | `#222` bg, 6px radius, border | Tooltips, settings |
| Footer | Fixed, `#000`, border-top | Always on top |

Depth comes from inset shadows (vignette) and texture overlays rather than elevated drop shadows. The cyan glow on the next note is the brightest visual element.

## 7. Do's and Don'ts

**Do:**
- Use pure black (`#000`) for body, `#0a0a0a` for content containers
- Apply cyan `rgba(0,200,255)` for all interactive highlights and the next-note glow
- Use grunge texture overlays with `multiply` blend at low opacity (0.05–0.3)
- Render notation on Canvas 2D, not as DOM elements
- Use Shippori Mincho for page layout text
- Use Arial/Verdana for canvas-rendered text
- Keep the footer fixed at the bottom

**Don't:**
- Use light themes or white backgrounds
- Apply grunge overlays at opacity above 0.3 (they obscure content)
- Use sans-serif for page layout text (Shippori Mincho is the identity font)
- Place interactive elements behind grunge overlays without `pointer-events: none`
- Use colors other than cyan for accent/glow
- Add border-radius to section containers (clip-path handles organic shapes)

## 8. Responsive Behavior

| Context | Behavior |
|---|---|
| Desktop | Full-width notation canvases, side-by-side controls where applicable |
| Tablet | Canvases scale to viewport width, controls stack |
| Mobile | Single-column, canvases scale down, touch-friendly control sizes |

- Canvas elements resize proportionally to viewport width
- Fixed footer remains on all screen sizes
- Grunge overlays may be simplified or removed on small screens for performance
- Clip-path polygons may simplify on narrow viewports

## 9. Agent Prompt Guide

When building new features for sid-note:

- **Backgrounds**: `#000` (body/footer), `#0a0a0a` (sections), `#222` (popups)
- **Text**: `#ededed` in Shippori Mincho for layout, Arial/Verdana on canvas
- **Accent**: `rgba(0,200,255)` cyan for all interactive/highlight/glow elements
- **Next note glow**: `0 0 10px rgba(0,200,255,0.8)` — 10px blur, full cyan
- **Root notes**: `khaki` color
- **Borders**: `#444` primary, `#333` subtle
- **Popups**: `#222` bg, 6px radius, `#444` border
- **Textures**: `.webp` grunge overlays, `mix-blend-mode: multiply`, opacity 0.05–0.3
- **Corners**: Use `corner.webp` for CornerBox decorative frames
- **Sections**: `box-shadow: inset 0 0 40px rgba(0,0,0,0.5)` vignette
- **Edges**: `clip-path: polygon(...)` for wavy/organic section boundaries
- **Scrollbar**: 8px wide, `#444` thumb
- **Footer**: Fixed, black, border-top `#333`
