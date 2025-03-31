
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'
import './index.css'

// Create root with null check to prevent potential errors
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const root = createRoot(rootElement);

// Wrap App in StrictMode for better development experience
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
