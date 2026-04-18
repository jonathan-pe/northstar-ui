import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Checkbox } from '@/primitives'

describe('Checkbox primitive', () => {
  it('toggles checked state', () => {
    render(<Checkbox aria-label="terms" />)
    const checkbox = screen.getByRole('checkbox', { name: 'terms' })

    fireEvent.click(checkbox)
    expect(checkbox).toHaveAttribute('data-state', 'checked')
  })
})
