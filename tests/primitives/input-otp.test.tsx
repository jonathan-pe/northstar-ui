import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/primitives'

describe('InputOTP primitive', () => {
  it('renders otp inputs', () => {
    render(
      <InputOTP maxLength={4}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>,
    )

    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
})
