import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Switch } from '@/primitives'

describe('Switch primitive', () => {
  it('toggles checked state', () => {
    render(<Switch aria-label="switch" />)
    const control = screen.getByRole('switch', { name: 'switch' })

    fireEvent.click(control)
    expect(control).toHaveAttribute('data-state', 'checked')
  })
})
