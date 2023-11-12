import ReactDOM from 'react-dom/client'
import './index.css'


import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import App from "./App.tsx";
import RealComponent from "./Components/RealComponent.tsx";
import React from 'react';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>
    },
    {
        path: '/components/:componentid',
        element: <RealComponent/>,
    },
    {
        path: '/:filterText',
        element: <App/>
    }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
