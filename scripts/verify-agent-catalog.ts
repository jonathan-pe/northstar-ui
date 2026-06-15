import { readFileSync, readdirSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { isDeepStrictEqual } from 'node:util'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function listWrapperIds(): string[] {
  const dir = join(root, 'src', 'primitives', 'wrappers')
  return readdirSync(dir)
    .filter((f) => f.endsWith('.tsx'))
    .map((f) => basename(f, '.tsx'))
}

function pascalToKebab(componentName: string): string {
  return componentName.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase()
}

function listCompositeStemIds(): string[] {
  const dir = join(root, 'src', 'composites')
  return readdirSync(dir)
    .filter((f) => f.endsWith('.tsx'))
    .map((f) => pascalToKebab(basename(f, '.tsx')))
}

const { buildNorthstarCatalog } = await import('../src/stories/catalog/build-catalog.ts')

const built = buildNorthstarCatalog()
const catalogPrimitiveIds = new Set(built.primitives.map((p) => p.id))
const catalogCompositeIds = new Set(built.composites.map((c) => c.id))

const wrapperIds = listWrapperIds()
const compositeStems = listCompositeStemIds()

const missingPrimitives = wrapperIds.filter((id) => !catalogPrimitiveIds.has(id))
const extraPrimitives = [...catalogPrimitiveIds].filter((id) => {
  if (id === 'direction') return false
  return !wrapperIds.includes(id)
})

const missingComposites = compositeStems.filter((id) => !catalogCompositeIds.has(id))

if (missingPrimitives.length || extraPrimitives.length || missingComposites.length) {
  const lines: string[] = ['Storybook catalog entries are out of sync with sources.']
  if (missingPrimitives.length) {
    lines.push(`Missing catalog entries for wrappers: ${missingPrimitives.join(', ')}`)
  }
  if (extraPrimitives.length) {
    lines.push(`Catalog primitive ids without wrapper sources: ${extraPrimitives.join(', ')}`)
  }
  if (missingComposites.length) {
    lines.push(`Missing catalog entries for composites: ${missingComposites.join(', ')}`)
  }
  console.error(lines.join('\n'))
  process.exit(1)
}

const jsonPath = join(root, 'docs', 'agent', 'northstar-catalog.json')
const onDisk = JSON.parse(readFileSync(jsonPath, 'utf8')) as object

if (!isDeepStrictEqual(built, onDisk)) {
  console.error(
    [
      'docs/agent/northstar-catalog.json does not match src/stories/catalog/*.ts.',
      'Run: pnpm generate:agent-catalog',
    ].join('\n'),
  )
  process.exit(1)
}

console.log(
  `Agent catalog OK: ${wrapperIds.length} wrappers, direction entry, ${compositeStems.length} composites; JSON matches TS source.`,
)
