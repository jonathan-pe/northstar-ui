import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))

async function main(): Promise<void> {
  const { buildNorthstarCatalog } = await import('../src/stories/catalog/build-catalog.ts')
  const catalog = buildNorthstarCatalog()
  const outPath = join(root, '..', 'docs', 'agent', 'northstar-catalog.json')
  writeFileSync(outPath, `${JSON.stringify(catalog, null, 2)}\n`, 'utf8')
  console.log(`Wrote ${outPath}`)
}

await main()
