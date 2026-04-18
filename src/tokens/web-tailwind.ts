import { themeCssVars, type ThemeId } from './css-theme.generated'

type FlatTokenMap = Record<string, string>

function flatten(
  value: unknown,
  path: string[],
  out: FlatTokenMap,
): FlatTokenMap {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    for (const [key, nested] of Object.entries(
      value as Record<string, unknown>,
    )) {
      flatten(nested, [...path, key], out)
    }
    return out
  }

  out[path.join('-')] = String(value)
  return out
}

/** Flatten a nested token object into `--{prefix}-{a-b-c}` custom property names. */
export function toCssCustomProperties(
  prefix: string,
  object: Record<string, unknown>,
): FlatTokenMap {
  const flat = flatten(object, [], {})
  const entries = Object.entries(flat).map(([key, value]) => [
    `--${prefix}-${key}`,
    value,
  ])
  return Object.fromEntries(entries)
}

/** Shadcn-aligned maps for the default light/dark themes (same keys as `var(--background)`, etc.). */
export const lightThemeCssVars = themeCssVars.light
export const darkThemeCssVars = themeCssVars.dark

/** Resolved CSS custom properties for any theme id discovered from CSS (see `discoverThemeContract`). */
export function getThemeCssVars(id: ThemeId): (typeof themeCssVars)[ThemeId] {
  return themeCssVars[id]
}
