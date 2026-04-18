import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Toaster } from '@/primitives'

describe('Toast primitive', () => {
  it('renders toaster provider', () => {
    render(<Toaster />)
    expect(document.body).toBeInTheDocument()
  })
})
