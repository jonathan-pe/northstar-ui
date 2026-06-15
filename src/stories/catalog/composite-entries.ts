import type { CatalogCompositeEntry } from './types.ts'

export const COMPOSITE_CATALOG_ENTRIES: readonly CatalogCompositeEntry[] = [
  {
    "id": "login-card",
    "title": "LoginCard",
    "category": "composite",
    "source": "src/composites/LoginCard.tsx",
    "story": "src/stories/LoginCard.stories.tsx",
    "exports": [
      "LoginCard"
    ],
    "props": [
      "title",
      "subtitle",
      "emailLabel",
      "passwordLabel",
      "submitLabel",
      "defaultEmail",
      "defaultPassword",
      "onSubmit",
      "className"
    ],
    "importExample": "import { LoginCard } from \"northstar-ui/composites\"",
    "summary": "Opinionated email/password sign-in form using Northstar Input and Button.",
    "whenToUse": [
      "Auth demos, internal tools, quick login scaffolding."
    ],
    "composition": "Pass onSubmit to receive { email, password }; customize labels via props.",
    "tags": [
      "auth",
      "form"
    ]
  },
  {
    "id": "app-sidebar",
    "title": "AppSidebar",
    "category": "composite",
    "source": "src/composites/AppSidebar.tsx",
    "story": "src/stories/AppSidebar.stories.tsx",
    "exports": [
      "AppSidebar"
    ],
    "types": [
      "AppSidebarItem",
      "AppSidebarProps"
    ],
    "importExample": "import { AppSidebar, type AppSidebarItem } from \"northstar-ui/composites\"",
    "summary": "Simple vertical nav list with active item styling using Button variants.",
    "whenToUse": [
      "Marketing or app side navigation prototypes; not the full Sidebar primitive shell."
    ],
    "composition": "Provide items with id/label; control activeId and onSelect for routing integration.",
    "tags": [
      "navigation",
      "layout"
    ]
  }
]
