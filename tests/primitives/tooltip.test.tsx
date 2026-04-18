import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/primitives'

describe('Tooltip primitive', () => {
  it('renders tooltip trigger', () => {
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button>Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>More information</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    )

    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument()
  })
})
