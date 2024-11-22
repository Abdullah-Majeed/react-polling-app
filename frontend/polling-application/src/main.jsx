import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContextProvider from '../src/context/AuthContext'
import PollContextProvider from './context/PollContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <PollContextProvider>
        <App />
      </PollContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
