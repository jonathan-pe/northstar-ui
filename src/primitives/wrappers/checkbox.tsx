import * as React from 'react'

import { Checkbox as BaseCheckbox } from '@/components/ui/checkbox'

type CheckboxElement = React.ElementRef<typeof BaseCheckbox>
type CheckboxProps = React.ComponentPropsWithoutRef<typeof BaseCheckbox>

const Checkbox: React.ForwardRefExoticComponent<
  CheckboxProps & React.RefAttributes<CheckboxElement>
> = React.forwardRef<CheckboxElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return <BaseCheckbox ref={ref} className={className} {...props} />
  },
)

Checkbox.displayName = 'Checkbox'

export { Checkbox }
