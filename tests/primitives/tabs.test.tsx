import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/primitives'

describe('Tabs primitive', () => {
  it('renders with default active tab', () => {
    render(
      <Tabs defaultValue="one">
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one">Content One</TabsContent>
        <TabsContent value="two">Content Two</TabsContent>
      </Tabs>,
    )

    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute(
      'data-state',
      'active',
    )
    expect(screen.getByText('Content One')).toBeInTheDocument()
  })
})
