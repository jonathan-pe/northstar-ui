import { semanticTokens } from '@/tokens/semantic'

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

export const lightThemeCssVars = toCssCustomProperties(
  'ns',
  semanticTokens.themes.light,
)
export const darkThemeCssVars = toCssCustomProperties(
  'ns',
  semanticTokens.themes.dark,
)
