export type CatalogPrimitiveEntry = {
  id: string
  title: string
  category: string
  source: string
  story: string
  exports: string[]
  importExample: string
  summary: string
  whenToUse: string[]
  composition: string
  tags: string[]
}

export type CatalogCompositeEntry = {
  id: string
  title: string
  category: string
  source: string
  story: string
  exports: string[]
  importExample: string
  summary: string
  whenToUse: string[]
  composition: string
  tags: string[]
  props?: string[]
  types?: string[]
}

export type CatalogTokenExport = {
  name: string
  notes: string
  nameDark?: string
}

export type CatalogTokens = {
  importExample: string
  summary: string
  exports: CatalogTokenExport[]
  docs: string[]
}

export type NorthstarCatalog = {
  catalogVersion: number
  package: string
  peerDependencies: Record<string, string>
  imports: Record<string, string>
  setupNotes: string[]
  primitives: CatalogPrimitiveEntry[]
  composites: CatalogCompositeEntry[]
  tokens: CatalogTokens
}
