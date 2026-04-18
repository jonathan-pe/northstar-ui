import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from '@/primitives'

import { StorySection } from './shared'

const meta = {
  title: 'Primitives/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Avatar primitives from `@/primitives`, including grouped avatars and status badges.',
      },
    },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const FallbackAndImage: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="mx-auto max-w-3xl space-y-8 p-8">
      <StorySection title="Fallback">
        <Avatar>
          <AvatarFallback>JP</AvatarFallback>
        </Avatar>
      </StorySection>
      <StorySection title="Image with status">
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/64?img=11" alt="User avatar" />
          <AvatarFallback>UA</AvatarFallback>
          <AvatarBadge className="bg-emerald-500" />
        </Avatar>
      </StorySection>
    </div>
  ),
}

export const Grouped: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/64?img=12" alt="A" />
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/64?img=13" alt="B" />
        <AvatarFallback>B</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/64?img=14" alt="C" />
        <AvatarFallback>C</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+4</AvatarGroupCount>
    </AvatarGroup>
  ),
}
