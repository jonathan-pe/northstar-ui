import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, 'dist')

const requiredMarkers = [':root', '--primary:', '@theme inline', '@layer base']

function verifyFile(relPath: string, mustIncludeTailwindImport: boolean): void {
  const filePath = path.join(distDir, relPath)
  let content: string
  try {
    content = readFileSync(filePath, 'utf8')
  } catch {
    throw new Error(`Missing published style artifact: dist/${relPath}. Run pnpm build:lib.`)
  }

  for (const marker of requiredMarkers) {
    if (!content.includes(marker)) {
      throw new Error(`dist/${relPath} is missing expected marker: ${marker}`)
    }
  }

  const hasTailwindImport = content.includes('@import "tailwindcss"')
  if (mustIncludeTailwindImport && !hasTailwindImport) {
    throw new Error(`dist/${relPath} must include @import "tailwindcss"`)
  }
  if (!mustIncludeTailwindImport && hasTailwindImport) {
    throw new Error(`dist/${relPath} must not include @import "tailwindcss"`)
  }
}

verifyFile('theme.css', false)
verifyFile('styles.css', true)

console.log('Style artifacts verified: dist/theme.css, dist/styles.css')
