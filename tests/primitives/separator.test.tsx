import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Separator } from '@/primitives'

describe('Separator primitive', () => {
  it('renders the separator slot element', () => {
    const { container } = render(<Separator />)
    expect(container.querySelector('[data-slot="separator"]')).toBeInTheDocument()
  })
})
