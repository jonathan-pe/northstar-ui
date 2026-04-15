import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    primitives: 'src/primitives.ts',
    composites: 'src/composites.ts',
    tokens: 'src/tokens.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  tsconfig: 'tsconfig.build.json',
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'tailwindcss'],
})
