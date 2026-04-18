# Tokens

## Source of truth

**Theme colors** are defined in CSS only:

1. `src/index.css` — shadcn/Tailwind-aligned global styles  
2. `src/styles/overrides.css` — project overrides (merged after `index.css`; later rules win)

Run **`pnpm generate:tokens`** (also runs automatically before **`pnpm build:lib`**) to regenerate:

- `src/tokens/css-theme.generated.ts` — `themeCssVars` with `--background`, `--primary`, etc.

Do not edit `css-theme.generated.ts` by hand.

## How themes are discovered (no JSON)

The generator scans the merged CSS (same files as above) and builds theme maps **by convention**:

| Theme id | CSS blocks merged into this theme |
|----------|-----------------------------------|
| `light` | `:root`, and `.theme-light` if present |
| `dark` | `.dark`, and `.theme-dark` if present (missing vars inherit from resolved `light`, like the cascade) |
| *custom* | Any other **`.theme-{name}`** block → theme id **`{name}`**, inherits from `light` |

Examples:

- `.theme-playful { ... }` → `themeCssVars.playful`
- Use **only** `.theme-*` blocks for extra palettes so they are picked up; avoid unrelated classes like `.theme-sidebar` unless you intend a full alternate theme named `sidebar`.

## TypeScript API

- **`themeCssVars`** — merged values per discovered theme id, keyed like `var(--background)`.
- **`ThemeId`** — union of keys on `themeCssVars`.
- **`semanticTokens.themes`** — `{ cssVars }` per `ThemeId`, plus manual **`space`** / **`radius`** scales in `semantic.ts`.
- **`lightThemeCssVars` / `darkThemeCssVars`** — shortcuts for the default shadcn themes.
- **`getThemeCssVars(id)`** — lookup any discovered theme.
- **`toCssCustomProperties(prefix, nestedObject)`** — flatten nested objects to `--{prefix}-…` for custom `--ns-*` maps.

## Versioning

- Additive CSS variables / new `.theme-*` themes: **minor**
- Renamed/removed public theme ids or keys: **major**
- Regenerated output with no contract change: **patch**

## CI

`tests/tokens/theme-parity.test.ts` asserts that discovery + merge matches the committed `css-theme.generated.ts`. After editing CSS, run `pnpm generate:tokens` and commit the updated generated file.
