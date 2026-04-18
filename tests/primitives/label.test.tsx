import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Input, Label } from '@/primitives'

describe('Label primitive', () => {
  it('associates label with input', () => {
    render(
      <>
        <Label htmlFor="email-id">Email</Label>
        <Input id="email-id" />
      </>,
    )
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })
})
