import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Button } from '@/primitives'

describe('Button primitive', () => {
  it('invokes click handler', () => {
    let clicks = 0
    render(<Button onClick={() => clicks++}>Submit</Button>)

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))
    expect(clicks).toBe(1)
  })

  it('applies wrapper destructive accessibility classes', () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByRole('button', { name: 'Delete' })
    expect(button.className).toContain('border-destructive/40')
  })

  it('applies wrapper dark link contrast classes', () => {
    render(<Button variant="link">Learn more</Button>)
    const button = screen.getByRole('button', { name: 'Learn more' })
    expect(button.className).toContain('dark:text-primary-foreground')
  })

  it('asChild merges into child element (anchor)', () => {
    render(
      <Button variant="outline" asChild>
        <a href="https://example.com">Go</a>
      </Button>,
    )
    const link = screen.getByRole('link', { name: 'Go' })
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link.className).toContain('border')
  })
})
