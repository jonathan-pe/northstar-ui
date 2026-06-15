---
name: northstar-ui
description: >-
  Uses the northstar-ui React design system (northstar-ui/primitives, composites, tokens) with correct imports, composition patterns, RTL, and theming. Triggers when the user works in this repository, mentions northstar-ui, shadcn primitives exported from northstar-ui, or asks to build UI with Northstar components.
---

# Northstar UI (agent skill)

## Before writing UI

1. Use the catalog data under `src/stories/catalog/` (generated copy: `docs/agent/northstar-catalog.json`), or the Northstar MCP tools if configured. Each entry includes `importExample`, `exports`, `summary`, `whenToUse`, `composition`, `source`, and `story`. Storybook docs use the same source via `catalogStoryDocs()`.
2. Prefer **stable imports**:
   - `northstar-ui/primitives` for building blocks (including `DirectionProvider`).
   - `northstar-ui/composites` for `LoginCard` and `AppSidebar`.
   - `northstar-ui/tokens` for theme CSS vars and semantic scales.
3. Do **not** customize behavior by editing `src/components/ui/*` in this repo; extend in `src/primitives/wrappers/*` or composites instead.
4. For RTL, follow `docs/rtl.md` and ensure direction provider + document `dir`/`lang` are coherent.

## Architecture reminders

- Wrappers in `src/primitives/wrappers/*` are the **public API** surface for primitives.
- Global theme variables are generated into `src/tokens/css-theme.generated.ts` via `pnpm generate:tokens`.
- Storybook stories under `src/stories/**` are the living usage examples; mirror patterns there when unsure.

## When choosing components

- Use the catalog `category` and `tags` fields to find overlays vs controls vs layout.
- Prefer **Alert Dialog** for irreversible confirmations; use **Dialog** for general modal tasks.
- **Sheet** for slide-overs; **Sidebar** for app-chrome navigation shells.
- **Form** + react-hook-form for validated forms; pair **Label** with inputs.

## Verification

After changing catalog entries in `src/stories/catalog/`, run `pnpm generate:agent-catalog` and `pnpm verify:agent-catalog` so `docs/agent/northstar-catalog.json` and wrapper filenames stay aligned.
