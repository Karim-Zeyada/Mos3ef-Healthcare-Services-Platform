import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext.jsx';
import { SearchProvider } from './Context/SearchContext.jsx';
import { HospitalProvider } from './Context/HospitalContext.jsx';
import { CompareProvider } from './Context/CompareContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CompareProvider>
    <HospitalProvider>
    <AuthProvider>
      <SearchProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
      </SearchProvider>
    </AuthProvider>
    </HospitalProvider>
    </CompareProvider>
  </StrictMode>,
)
