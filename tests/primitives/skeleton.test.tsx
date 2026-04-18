import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Skeleton } from '@/primitives'

describe('Skeleton primitive', () => {
  it('renders with animation class', () => {
    const { container } = render(<Skeleton className="h-4 w-20" />)
    expect(container.firstElementChild).toHaveClass('animate-pulse')
  })
})
