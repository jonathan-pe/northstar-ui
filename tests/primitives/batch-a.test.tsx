import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Button, Checkbox, Input, Textarea } from '@/primitives'

describe('batch A primitives', () => {
  it('renders button and invokes click handler', () => {
    let clicks = 0
    render(<Button onClick={() => clicks++}>Submit</Button>)

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))
    expect(clicks).toBe(1)
  })

  it('renders input and accepts user text', () => {
    render(<Input aria-label="email" />)
    const input = screen.getByLabelText('email')

    fireEvent.change(input, { target: { value: 'user@example.com' } })
    expect(input).toHaveValue('user@example.com')
  })

  it('renders textarea and accepts content', () => {
    render(<Textarea aria-label="notes" />)
    const textarea = screen.getByLabelText('notes')

    fireEvent.change(textarea, { target: { value: 'Direction-safe text' } })
    expect(textarea).toHaveValue('Direction-safe text')
  })

  it('supports checkbox checked state', () => {
    render(<Checkbox aria-label="terms" />)
    const checkbox = screen.getByRole('checkbox', { name: 'terms' })

    fireEvent.click(checkbox)
    expect(checkbox).toHaveAttribute('data-state', 'checked')
  })
})
