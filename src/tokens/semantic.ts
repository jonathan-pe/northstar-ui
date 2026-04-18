import { themeCssVars, type ThemeId } from './css-theme.generated'

/**
 * Runtime token model. Color values come from CSS (`:root`, `.dark`, `.theme-*`) via
 * `pnpm generate:tokens` → `css-theme.generated.ts`. Edit CSS and the contract; then regenerate.
 *
 * `space` and `radius` are layout scales not yet mirrored as CSS custom properties.
 */
export const semanticTokens = {
  themes: Object.fromEntries(
    (Object.keys(themeCssVars) as ThemeId[]).map((id) => [
      id,
      { cssVars: themeCssVars[id] },
    ]),
  ) as Record<ThemeId, { cssVars: (typeof themeCssVars)[ThemeId] }>,
  space: {
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    6: 24,
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 10,
    xl: 12,
    pill: 9999,
  },
} as const

export type SemanticTokens = typeof semanticTokens
