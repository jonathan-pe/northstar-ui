export const semanticTokens = {
  themes: {
    light: {
      color: {
        bg: {
          page: 'oklch(1 0 0)',
          surface: 'oklch(1 0 0)',
          elevated: 'oklch(0.985 0 0)',
        },
        text: {
          primary: 'oklch(0.145 0 0)',
          muted: 'oklch(0.556 0 0)',
          inverse: 'oklch(0.985 0 0)',
        },
        border: {
          default: 'oklch(0.922 0 0)',
          strong: 'oklch(0.708 0 0)',
        },
        accent: {
          primary: 'oklch(0.527 0.154 150.069)',
          primaryForeground: 'oklch(0.982 0.018 155.826)',
          secondary: 'oklch(0.967 0.001 286.375)',
          secondaryForeground: 'oklch(0.21 0.006 285.885)',
        },
      },
    },
    dark: {
      color: {
        bg: {
          page: 'oklch(0.145 0 0)',
          surface: 'oklch(0.205 0 0)',
          elevated: 'oklch(0.269 0 0)',
        },
        text: {
          primary: 'oklch(0.985 0 0)',
          muted: 'oklch(0.708 0 0)',
          inverse: 'oklch(0.145 0 0)',
        },
        border: {
          default: 'oklch(1 0 0 / 10%)',
          strong: 'oklch(0.556 0 0)',
        },
        accent: {
          primary: 'oklch(0.448 0.119 151.328)',
          primaryForeground: 'oklch(0.982 0.018 155.826)',
          secondary: 'oklch(0.274 0.006 286.033)',
          secondaryForeground: 'oklch(0.985 0 0)',
        },
      },
    },
  },
  space: {
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    6: 24,
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 10,
    xl: 12,
    pill: 9999,
  },
} as const

export type SemanticTokens = typeof semanticTokens
