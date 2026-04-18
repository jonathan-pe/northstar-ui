import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/primitives'

describe('Select primitive', () => {
  it('renders trigger and placeholder', () => {
    render(
      <Select>
        <SelectTrigger aria-label="select">
          <SelectValue placeholder="Pick one" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Option A</SelectItem>
          <SelectItem value="b">Option B</SelectItem>
        </SelectContent>
      </Select>,
    )

    expect(screen.getByRole('combobox', { name: 'select' })).toBeInTheDocument()
    expect(screen.getByText('Pick one')).toBeInTheDocument()
  })

  it('opens listbox and selects an option', async () => {
    const user = userEvent.setup()
    render(
      <Select>
        <SelectTrigger aria-label="select">
          <SelectValue placeholder="Pick one" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Option A</SelectItem>
          <SelectItem value="b">Option B</SelectItem>
        </SelectContent>
      </Select>,
    )

    const trigger = screen.getByRole('combobox', { name: 'select' })
    await user.click(trigger)
    await user.click(await screen.findByRole('option', { name: 'Option B' }))
    await waitFor(() => {
      expect(trigger).toHaveTextContent('Option B')
    })
  })
})
