import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Button, Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/primitives'

describe('Sheet primitive', () => {
  it('opens from trigger', () => {
    render(
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open sheet</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>Sheet title</SheetTitle>
        </SheetContent>
      </Sheet>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Open sheet' }))
    expect(screen.getByText('Sheet title')).toBeInTheDocument()
  })
})
