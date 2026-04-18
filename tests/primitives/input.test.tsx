import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Input } from '@/primitives'

describe('Input primitive', () => {
  it('accepts typed text', () => {
    render(<Input aria-label="email" />)
    const input = screen.getByLabelText('email')

    fireEvent.change(input, { target: { value: 'user@example.com' } })
    expect(input).toHaveValue('user@example.com')
  })
})
