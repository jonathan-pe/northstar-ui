import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarProvider,
} from '@/primitives'

describe('Sidebar primitive', () => {
  it('renders sidebar content within provider', () => {
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent />
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    )
    expect(screen.getByText('Navigation')).toBeInTheDocument()
  })
})
