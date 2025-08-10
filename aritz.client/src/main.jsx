import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { SessionProvider } from './context/SessionContext'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <SessionProvider>
                <App />
            </SessionProvider>
        </BrowserRouter>
  </StrictMode>,
)
