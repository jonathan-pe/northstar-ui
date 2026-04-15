import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DirectionProvider } from '@/components/ui/direction'
import { applyDocumentDirection, normalizeDirection } from '@/lib/direction'

const htmlDirection = normalizeDirection(document.documentElement.getAttribute('dir'))
applyDocumentDirection(htmlDirection)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DirectionProvider direction={htmlDirection}>
      <App />
    </DirectionProvider>
  </StrictMode>,
)
