import type { Meta, StoryObj } from '@storybook/react-vite'

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/primitives'
import { catalogStoryDocs } from '@/stories/catalog'

const meta = {
  title: 'Primitives/InputOTP',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    ...catalogStoryDocs('input-otp'),
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const SixDigit: Story = {
  render: () => (
    <InputOTP maxLength={6} aria-label="Verification code">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
}
