import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Textarea } from '@/primitives'

describe('Textarea primitive', () => {
  it('accepts content', () => {
    render(<Textarea aria-label="notes" />)
    const textarea = screen.getByLabelText('notes')

    fireEvent.change(textarea, { target: { value: 'Direction-safe text' } })
    expect(textarea).toHaveValue('Direction-safe text')
  })
})
