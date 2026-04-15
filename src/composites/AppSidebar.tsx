import { Button } from '@/primitives'
import { cn } from '@/lib/utils'

export interface AppSidebarItem {
  id: string
  label: string
}

export interface AppSidebarProps {
  title?: string
  items: AppSidebarItem[]
  activeId?: string
  onSelect?: (id: string) => void
  className?: string
}

export function AppSidebar({
  title = 'Navigation',
  items,
  activeId,
  onSelect,
  className,
}: AppSidebarProps) {
  return (
    <aside
      aria-label="app sidebar"
      className={cn(
        'w-full max-w-xs rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm',
        className,
      )}
    >
      <h2 className="mb-3 text-sm font-semibold text-muted-foreground">{title}</h2>
      <nav className="flex flex-col gap-2">
        {items.map((item) => {
          const isActive = item.id === activeId
          return (
            <Button
              key={item.id}
              variant={isActive ? 'secondary' : 'ghost'}
              className="justify-start"
              onClick={() => onSelect?.(item.id)}
            >
              {item.label}
            </Button>
          )
        })}
      </nav>
    </aside>
  )
}
