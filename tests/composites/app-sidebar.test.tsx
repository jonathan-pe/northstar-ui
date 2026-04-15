import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AppSidebar } from '@/composites/AppSidebar'

describe('AppSidebar', () => {
  it('calls onSelect when a nav item is clicked', () => {
    let selected: string | undefined

    render(
      <AppSidebar
        items={[
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'settings', label: 'Settings' },
        ]}
        onSelect={(id) => {
          selected = id
        }}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Settings' }))
    expect(selected).toBe('settings')
  })
})
