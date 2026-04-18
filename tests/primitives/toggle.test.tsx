import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Toggle } from '@/primitives'

describe('Toggle primitive', () => {
  it('toggles pressed state', () => {
    render(<Toggle aria-label="bold">Bold</Toggle>)
    const toggle = screen.getByRole('button', { name: 'bold' })
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('data-state', 'on')
  })
})
