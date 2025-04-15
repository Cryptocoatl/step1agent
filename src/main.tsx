
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { SupabaseAuthProvider } from './providers/SupabaseAuthProvider'

// Ensure all global styles are loaded
import './styles/globals.css'

// Make sure we're mounting to an existing element
const rootElement = document.getElementById('root');

// Add a check to make sure the element exists
if (!rootElement) {
  throw new Error('Root element not found. Make sure there is a div with id "root" in your HTML.');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <SupabaseAuthProvider>
      <App />
    </SupabaseAuthProvider>
  </React.StrictMode>
)
