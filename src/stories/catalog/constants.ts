import type { CatalogTokens } from './types.ts'

export const CATALOG_VERSION = 1

export const CATALOG_PACKAGE_NAME = 'northstar-ui'

export const CATALOG_PEER_DEPENDENCIES: Record<string, string> = {
  react: '^19.0.0',
  'react-dom': '^19.0.0',
  tailwindcss: '^4.0.0',
}

export const CATALOG_IMPORTS: Record<string, string> = {
  root: 'northstar-ui',
  primitives: 'northstar-ui/primitives',
  composites: 'northstar-ui/composites',
  tokens: 'northstar-ui/tokens',
}

export const CATALOG_SETUP_NOTES: readonly string[] = [
  'Import app CSS: use northstar-ui/theme.css (or northstar-ui/styles.css) plus @source for northstar-ui/dist/**/*.js in your Tailwind v4 entry (see README).',
  'Use DirectionProvider from northstar-ui/primitives for RTL/LTR (see docs/rtl.md).',
  'Prefer primitives and composites over importing src/components/ui directly; wrappers are the stable API.',
]

export const CATALOG_TOKENS: CatalogTokens = {
  importExample:
    'import { semanticTokens, themeCssVars, toCssCustomProperties } from "northstar-ui/tokens"',
  summary:
    'Semantic scales and CSS variable maps for theming; themeCssVars is generated from CSS (pnpm generate:tokens).',
  exports: [
    {
      name: 'semanticTokens',
      notes: 'Manual space/radius composition atop generated theme maps.',
    },
    {
      name: 'themeCssVars',
      notes: 'Generated palette tokens from theme.css + overrides.css.',
    },
    {
      name: 'lightThemeCssVars',
      nameDark: 'darkThemeCssVars',
      notes: 'Per-theme accessors from web-tailwind.',
    },
    {
      name: 'getThemeCssVars',
      notes: 'Resolve vars for a ThemeId.',
    },
    {
      name: 'toCssCustomProperties',
      notes: 'Serialize token objects to inline style-ready CSS variables.',
    },
  ],
  docs: ['src/tokens/README.md', 'docs/ai-context.md'],
}
