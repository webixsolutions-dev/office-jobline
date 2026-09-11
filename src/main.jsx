import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './style/index.css'
import './style/tokens.css'
import App from './App.jsx'
import { AuthProvider } from './lib/auth/AuthContext'
import { SavedJobsProvider } from './lib/SavedJobsContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SavedJobsProvider>
          <App />
        </SavedJobsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)

