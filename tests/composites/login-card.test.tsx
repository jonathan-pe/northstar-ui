import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { LoginCard } from '@/composites/LoginCard'

describe('LoginCard', () => {
  it('submits entered credentials', () => {
    let payload: { email: string; password: string } | undefined

    render(
      <LoginCard
        onSubmit={(data) => {
          payload = data
        }}
      />,
    )

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'user@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'Secret123' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }))

    expect(payload).toEqual({
      email: 'user@example.com',
      password: 'Secret123',
    })
  })
})
