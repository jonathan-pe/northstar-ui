import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/primitives'

describe('Table primitive', () => {
  it('renders tabular structure', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Row A</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    )
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Row A')).toBeInTheDocument()
  })
})
