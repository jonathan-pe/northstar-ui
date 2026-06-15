import { COMPOSITE_CATALOG_ENTRIES } from './composite-entries.ts'
import {
  CATALOG_IMPORTS,
  CATALOG_PACKAGE_NAME,
  CATALOG_PEER_DEPENDENCIES,
  CATALOG_SETUP_NOTES,
  CATALOG_TOKENS,
  CATALOG_VERSION,
} from './constants.ts'
import { PRIMITIVE_CATALOG_ENTRIES } from './primitive-entries.ts'
import type { CatalogCompositeEntry, CatalogPrimitiveEntry, NorthstarCatalog } from './types.ts'

export function buildNorthstarCatalog(): NorthstarCatalog {
  return {
    catalogVersion: CATALOG_VERSION,
    package: CATALOG_PACKAGE_NAME,
    peerDependencies: { ...CATALOG_PEER_DEPENDENCIES },
    imports: { ...CATALOG_IMPORTS },
    setupNotes: [...CATALOG_SETUP_NOTES],
    primitives: PRIMITIVE_CATALOG_ENTRIES.map((p) => ({ ...p })),
    composites: COMPOSITE_CATALOG_ENTRIES.map((c) => ({ ...c })),
    tokens: {
      ...CATALOG_TOKENS,
      exports: CATALOG_TOKENS.exports.map((e) => ({ ...e })),
      docs: [...CATALOG_TOKENS.docs],
    },
  }
}

export function getPrimitiveCatalogEntry(id: string): CatalogPrimitiveEntry | undefined {
  return PRIMITIVE_CATALOG_ENTRIES.find((e) => e.id === id)
}

export function getCompositeCatalogEntry(id: string): CatalogCompositeEntry | undefined {
  return COMPOSITE_CATALOG_ENTRIES.find((e) => e.id === id)
}

export function getCatalogEntryById(
  id: string,
): CatalogPrimitiveEntry | CatalogCompositeEntry | undefined {
  return getPrimitiveCatalogEntry(id) ?? getCompositeCatalogEntry(id)
}
