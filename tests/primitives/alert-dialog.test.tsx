import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from '@/primitives'

describe('AlertDialog primitive', () => {
  it('opens content from trigger', () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Open alert</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Confirm</AlertDialogTitle>
          <AlertDialogDescription>Are you sure?</AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Open alert' }))
    expect(screen.getByText('Confirm')).toBeInTheDocument()
  })
})
