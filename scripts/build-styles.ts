import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, 'dist')

const themeCss = readFileSync(path.join(root, 'src/styles/theme.css'), 'utf8')
const overridesCss = readFileSync(path.join(root, 'src/styles/overrides.css'), 'utf8')

const themeWithOverrides = `${themeCss.trimEnd()}\n\n${overridesCss.trimEnd()}\n`

writeFileSync(path.join(distDir, 'theme.css'), themeWithOverrides, 'utf8')
writeFileSync(
  path.join(distDir, 'styles.css'),
  `@import "tailwindcss";\n\n${themeWithOverrides}`,
  'utf8',
)

console.log('Wrote dist/theme.css and dist/styles.css')
