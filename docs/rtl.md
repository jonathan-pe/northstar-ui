# RTL Support

This library is initialized with shadcn RTL support and includes runtime wiring for direction-aware rendering.

## What shadcn `--rtl` handles

- Sets `"rtl": true` in `components.json`.
- Generates new shadcn components with RTL-aware defaults.

## What consumers still need

RTL support is not complete with `components.json` alone. Consuming apps should set runtime direction and language.

### App shell setup

- Set `dir` and `lang` on the root HTML element for the active locale.
- Wrap app content with `DirectionProvider` from `src/components/ui/direction.tsx`.

Example:

```tsx
<DirectionProvider direction="rtl">
  <App />
</DirectionProvider>
```

### Fonts

Include a font that supports your RTL script(s). This project includes:

- `@fontsource-variable/noto-sans-arabic`

`src/index.css` configures font fallback:

- `'Montserrat Variable'`
- `'Noto Sans Arabic Variable'`

### Storybook verification

Storybook includes a `Direction` toolbar control (`LTR` / `RTL`) that:

- updates `document.documentElement` `dir` and `lang`
- wraps stories in `DirectionProvider`

Use this to validate primitive and composite behavior in both directions.

## Direction-safe styling guidance

- Prefer logical spacing/alignment utilities and avoid hardcoded physical direction assumptions.
- Test overlays and positioned UI (dialogs, popovers, tooltips) in both directions.
- Verify directional iconography where mirroring is expected.
