import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Avatar, AvatarFallback } from '@/primitives'

describe('Avatar primitive', () => {
  it('renders fallback content', () => {
    render(
      <Avatar>
        <AvatarFallback>JP</AvatarFallback>
      </Avatar>,
    )
    expect(screen.getByText('JP')).toBeInTheDocument()
  })
})
