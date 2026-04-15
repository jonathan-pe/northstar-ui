# Tokens

`northstar-ui` uses semantic-first tokens as the source of truth.

## Files

- `semantic.ts` - canonical semantic token model (`themes.light` and `themes.dark`)
- `web-tailwind.ts` - web mapping helpers for CSS custom properties

## Naming

Use semantic token keys (`color.bg.page`, `color.text.primary`, etc.) rather than raw palette names.

## Versioning

- Additive token keys: **minor**
- Renamed/removed public token keys: **major**
- Internal mapping fixes (without contract change): **patch**

## Web usage

Use `toCssCustomProperties()` when producing CSS variable maps from semantic tokens.

Example:

```ts
import { lightThemeCssVars } from '@/tokens/web-tailwind'
```
