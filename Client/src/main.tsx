import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import UserProvider from './context/UserProvider.tsx'
import { RouterProvider } from 'react-router-dom'
import router from './App.tsx'
// import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />  
    </UserProvider>
  </StrictMode>,
)
