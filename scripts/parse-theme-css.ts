/**
 * Parse CSS custom property blocks for theme token generation and tests.
 *
 * Themes are discovered from CSS (no JSON contract):
 * - `light` ← `:root` and, if present, `.theme-light`
 * - `dark` ← `.dark` and, if present, `.theme-dark` (inherits missing vars from resolved `light`)
 * - any other `.theme-{name}` block → theme id `{name}`, inherits from `light`
 */

/** Remove block comments so example vars in documentation do not override real tokens. */
export function stripCssComments(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, '')
}

export function parseDeclarations(block: string): Map<string, string> {
  const map = new Map<string, string>()
  for (const match of block.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) {
    map.set(`--${match[1]}`, match[2].trim())
  }
  return map
}

function escapeRegExp(selector: string): string {
  return selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Extract inner text of every `{ ... }` block for this exact selector (no nested rules).
 */
export function extractAllBlocks(css: string, selector: string): string[] {
  const re = new RegExp(
    `${escapeRegExp(selector)}\\s*\\{([^}]*)\\}`,
    'g',
  )
  const out: string[] = []
  let m: RegExpExecArray | null
  while ((m = re.exec(css)) !== null) {
    out.push(m[1])
  }
  return out
}

/** Relative paths from repo root; same list is used by the generator and tests. */
export const DEFAULT_THEME_CSS_PATHS = [
  'src/index.css',
  'src/styles/overrides.css',
] as const

/** e.g. `.theme-playful {` → `theme-playful` */
const THEME_BLOCK_CLASS_RE = /\.(theme-[a-z][a-z0-9-]*)\s*\{/gi

export function findThemeBlockClassNames(mergedCss: string): string[] {
  const seen = new Set<string>()
  let m: RegExpExecArray | null
  THEME_BLOCK_CLASS_RE.lastIndex = 0
  while ((m = THEME_BLOCK_CLASS_RE.exec(mergedCss)) !== null) {
    seen.add(m[1])
  }
  return [...seen].sort()
}

export type ThemeContract = {
  themes: Array<{
    id: string
    selectors: string[]
    inheritsFrom: string | null
  }>
}

/**
 * Build the theme list by scanning merged CSS for `.theme-*` blocks plus shadcn defaults
 * (`:root` / `.dark`).
 */
export function discoverThemeContract(cssSources: string[]): ThemeContract {
  const merged = cssSources.map(stripCssComments).join('\n')
  const themeClasses = findThemeBlockClassNames(merged)

  const lightSelectors = [':root']
  if (themeClasses.includes('theme-light')) {
    lightSelectors.push('.theme-light')
  }

  const darkSelectors = ['.dark']
  if (themeClasses.includes('theme-dark')) {
    darkSelectors.push('.theme-dark')
  }

  const themes: ThemeContract['themes'] = [
    { id: 'light', selectors: lightSelectors, inheritsFrom: null },
    { id: 'dark', selectors: darkSelectors, inheritsFrom: 'light' },
  ]

  for (const className of themeClasses) {
    if (className === 'theme-light' || className === 'theme-dark') {
      continue
    }
    const id = className.slice('theme-'.length)
    if (id === 'light' || id === 'dark') {
      throw new Error(
        `Theme discovery: ".${className}" maps to id "${id}", which is reserved. Rename the class (e.g. theme-${id}-brand).`,
      )
    }
    themes.push({
      id,
      selectors: [`.${className}`],
      inheritsFrom: 'light',
    })
  }

  return { themes }
}

function validateContract(contract: ThemeContract): void {
  const ids = new Set<string>()
  const index = new Map<string, number>()
  for (let i = 0; i < contract.themes.length; i++) {
    const t = contract.themes[i]
    if (!t.id) throw new Error('Theme contract: missing theme id')
    if (ids.has(t.id)) {
      throw new Error(`Theme contract: duplicate theme id "${t.id}"`)
    }
    ids.add(t.id)
    index.set(t.id, i)
    if (!t.selectors?.length) {
      throw new Error(`Theme contract: theme "${t.id}" has no selectors`)
    }
  }

  for (const t of contract.themes) {
    if (t.inheritsFrom === null) continue
    const pi = index.get(t.inheritsFrom)
    if (pi === undefined) {
      throw new Error(
        `Theme contract: theme "${t.id}" inheritsFrom unknown id "${t.inheritsFrom}"`,
      )
    }
    const ti = index.get(t.id)!
    if (pi >= ti) {
      throw new Error(
        `Theme contract: theme "${t.id}" must be listed after "${t.inheritsFrom}" so inheritance can be resolved`,
      )
    }
  }
}

/**
 * Merge custom properties from CSS files in order (later files override earlier for the same theme).
 * Within a theme, selectors are applied in array order.
 * Then apply `inheritsFrom` in contract order (missing keys copied from the parent theme’s resolved map).
 */
export function mergeThemesFromContract(
  cssSources: string[],
  contract: ThemeContract,
): Record<string, Map<string, string>> {
  validateContract(contract)

  const stripped = cssSources.map((raw) => stripCssComments(raw))

  const rawMaps: Record<string, Map<string, string>> = {}
  for (const t of contract.themes) {
    rawMaps[t.id] = new Map<string, string>()
  }

  for (const css of stripped) {
    for (const t of contract.themes) {
      for (const selector of t.selectors) {
        for (const block of extractAllBlocks(css, selector)) {
          for (const [k, v] of parseDeclarations(block)) {
            rawMaps[t.id].set(k, v)
          }
        }
      }
    }
  }

  const resolved: Record<string, Map<string, string>> = {}

  for (const t of contract.themes) {
    const m = new Map(rawMaps[t.id])
    if (t.inheritsFrom !== null) {
      const parent = resolved[t.inheritsFrom]
      if (!parent) {
        throw new Error(
          `Theme contract: internal error resolving inheritsFrom for "${t.id}"`,
        )
      }
      for (const [k, v] of parent) {
        if (!m.has(k)) {
          m.set(k, v)
        }
      }
    }
    resolved[t.id] = m
  }

  return resolved
}
