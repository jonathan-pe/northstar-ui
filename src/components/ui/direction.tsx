/**
 * **DirectionProvider** / **useDirection** — re-exported from `northstar-ui/primitives`.
 * Sets Radix direction context for RTL/LTR; pair with `dir`/`lang` on the document (`docs/rtl.md`); catalog id `direction`.
 */
import * as React from "react"
import { Direction } from "radix-ui"

function DirectionProvider({
  dir,
  direction,
  children,
}: Omit<React.ComponentProps<typeof Direction.DirectionProvider>, "dir"> & {
  dir?: React.ComponentProps<typeof Direction.DirectionProvider>["dir"]
  direction?: React.ComponentProps<typeof Direction.DirectionProvider>["dir"]
}) {
  const resolvedDirection = direction ?? dir ?? "ltr"

  return (
    <Direction.DirectionProvider dir={resolvedDirection}>
      {children}
    </Direction.DirectionProvider>
  )
}

const useDirection = Direction.useDirection

export { DirectionProvider, useDirection }
