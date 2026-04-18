import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

import { semanticTokens } from '@/tokens/semantic'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const indexCssPath = path.join(__dirname, '../../src/index.css')

function parseCssVars(block: string): Map<string, string> {
  const map = new Map<string, string>()
  for (const match of block.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) {
    map.set(`--${match[1]}`, match[2].trim())
  }
  return map
}

function extractFirstBlock(css: string, selector: ':root' | '.dark'): string {
  const pattern =
    selector === ':root' ? /:root\s*\{([\s\S]*?)\}/ : /\.dark\s*\{([\s\S]*?)\}/
  const m = css.match(pattern)
  if (!m?.[1]) {
    throw new Error(`Could not find ${selector} block in index.css`)
  }
  return m[1]
}

describe('Theme parity: semantic tokens vs src/index.css', () => {
  const css = readFileSync(indexCssPath, 'utf8')
  const lightVars = parseCssVars(extractFirstBlock(css, ':root'))
  const darkVars = parseCssVars(extractFirstBlock(css, '.dark'))

  const light: [string, string][] = [
    ['--background', semanticTokens.themes.light.color.bg.page],
    ['--foreground', semanticTokens.themes.light.color.text.primary],
    ['--card', semanticTokens.themes.light.color.bg.surface],
    ['--popover', semanticTokens.themes.light.color.bg.surface],
    ['--primary', semanticTokens.themes.light.color.accent.primary],
    ['--primary-foreground', semanticTokens.themes.light.color.accent.primaryForeground],
    ['--secondary', semanticTokens.themes.light.color.accent.secondary],
    ['--secondary-foreground', semanticTokens.themes.light.color.accent.secondaryForeground],
    ['--muted-foreground', semanticTokens.themes.light.color.text.muted],
    ['--border', semanticTokens.themes.light.color.border.default],
  ]

  const dark: [string, string][] = [
    ['--background', semanticTokens.themes.dark.color.bg.page],
    ['--foreground', semanticTokens.themes.dark.color.text.primary],
    ['--card', semanticTokens.themes.dark.color.bg.surface],
    ['--popover', semanticTokens.themes.dark.color.bg.surface],
    ['--primary', semanticTokens.themes.dark.color.accent.primary],
    ['--primary-foreground', semanticTokens.themes.dark.color.accent.primaryForeground],
    ['--secondary', semanticTokens.themes.dark.color.accent.secondary],
    ['--secondary-foreground', semanticTokens.themes.dark.color.accent.secondaryForeground],
    ['--muted-foreground', semanticTokens.themes.dark.color.text.muted],
    ['--border', semanticTokens.themes.dark.color.border.default],
  ]

  it('light :root CSS variables match semanticTokens.themes.light', () => {
    for (const [name, expected] of light) {
      expect(lightVars.get(name), `${name} missing in :root`).toBe(expected)
    }
  })

  it('dark .dark CSS variables match semanticTokens.themes.dark', () => {
    for (const [name, expected] of dark) {
      expect(darkVars.get(name), `${name} missing in .dark`).toBe(expected)
    }
  })
})
