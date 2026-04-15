import * as React from 'react'

import { Checkbox as BaseCheckbox } from '@/components/ui/checkbox'

type CheckboxProps = React.ComponentProps<typeof BaseCheckbox>

const Checkbox = React.forwardRef<
  React.ElementRef<typeof BaseCheckbox>,
  CheckboxProps
>(({ className, ...props }, ref) => {
  return <BaseCheckbox ref={ref} className={className} {...props} />
})

Checkbox.displayName = 'Checkbox'

export { Checkbox }
