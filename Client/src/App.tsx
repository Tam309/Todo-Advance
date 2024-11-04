import React from 'react';
import Home from './screen/Home'; 
import Authentication, { AuthenticationMode } from './screen/Authentication';
import ErrorPage from './screen/ErrorPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';   
import UserProvider from './context/UserProvider';  
import './App.css';

const router = createBrowserRouter([
    {
        errorElement: <ErrorPage />
    },
    {
        path: "/login",
        element: <Authentication authenticationMode={AuthenticationMode.LOGIN} />
    },
    {
        path: "/register",
        element: <Authentication authenticationMode={AuthenticationMode.REGISTER} />
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/",
                element: <Home />
            }
        ]
    }
])

export default router;
