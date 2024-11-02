import React from 'react';
import Home from './components/Home'; 
import Authentication, { AuthenticationMode } from './components/Authentication';
import ErrorPage from './components/ErrorPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <Home />
    );
}

export default App;
