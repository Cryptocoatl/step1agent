import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Ensure all global styles are loaded
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
