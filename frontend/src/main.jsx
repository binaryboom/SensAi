import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { neobrutalism } from '@clerk/themes'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Key")
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  {/* <StrictMode> */}
    <ClerkProvider appearance={{
        baseTheme: neobrutalism,
      }} publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <App />
    </ClerkProvider>
  {/* </StrictMode> */}
  </BrowserRouter>
)
