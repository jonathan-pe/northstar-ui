import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

import { themeCssVars, type ThemeId } from '@/tokens/css-theme.generated'
import {
  DEFAULT_THEME_CSS_PATHS,
  discoverThemeContract,
  mergeThemesFromContract,
} from '../../scripts/parse-theme-css'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '../..')

describe('Theme tokens: generated TS matches merged CSS (discovered themes)', () => {
  const sources = DEFAULT_THEME_CSS_PATHS.map((rel) =>
    readFileSync(path.join(root, rel), 'utf8'),
  )
  const contract = discoverThemeContract(sources)

  it('themeCssVars matches parser output for every discovered theme', () => {
    const resolved = mergeThemesFromContract(sources, contract)

    for (const t of contract.themes) {
      const fromParser = resolved[t.id]
      const fromGenerated = themeCssVars[t.id as ThemeId]

      for (const [key, value] of fromParser) {
        expect(fromGenerated[key as keyof typeof fromGenerated], `${t.id} ${key}`).toBe(
          value,
        )
      }
      for (const key of Object.keys(fromGenerated) as Array<
        keyof typeof fromGenerated
      >) {
        expect(fromParser.get(key), `${t.id} ${String(key)}`).toBe(
          fromGenerated[key],
        )
      }
    }
  })
})
