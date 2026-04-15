export type UiDirection = 'ltr' | 'rtl'

export function normalizeDirection(value: string | null | undefined): UiDirection {
  return value === 'rtl' ? 'rtl' : 'ltr'
}

export function applyDocumentDirection(direction: UiDirection): void {
  document.documentElement.setAttribute('dir', direction)
  document.documentElement.setAttribute('lang', direction === 'rtl' ? 'ar' : 'en')
}
