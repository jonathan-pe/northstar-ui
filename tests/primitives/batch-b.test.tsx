import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Toaster,
} from '@/primitives'

describe('batch B primitives', () => {
  it('toggles switch state', () => {
    render(<Switch aria-label="switch" />)
    const control = screen.getByRole('switch', { name: 'switch' })

    fireEvent.click(control)
    expect(control).toHaveAttribute('data-state', 'checked')
  })

  it('renders select trigger and placeholder', () => {
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

  it('renders tabs with default active state', () => {
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

  it('renders toaster provider', () => {
    render(<Toaster />)
    expect(document.body).toBeInTheDocument()
  })
})
