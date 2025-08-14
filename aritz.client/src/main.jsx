import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { SessionProvider } from './context/SessionContext'
import { CartProvider } from './context/CartContext'
import { CheckoutProvider } from './context/CheckoutContext'
import { initMercadoPago } from '@mercadopago/sdk-react'
initMercadoPago('TEST-aa2427a9-e156-4f55-b4c0-d9c5e9b5774c');

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <SessionProvider>
                <CartProvider>
                    <CheckoutProvider>
                        <App />
                    </CheckoutProvider>
                </CartProvider>
            </SessionProvider>
        </BrowserRouter>
  </StrictMode>
)
