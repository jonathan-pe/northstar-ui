import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DirectionProvider } from '@/components/ui/direction'

const htmlDirection =
  document.documentElement.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DirectionProvider direction={htmlDirection}>
      <App />
    </DirectionProvider>
  </StrictMode>,
)
