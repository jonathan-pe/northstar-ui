import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Progress } from '@/primitives'

describe('Progress primitive', () => {
  it('renders as progressbar', () => {
    render(<Progress value={40} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })
})
