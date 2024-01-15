import ReactDOM from 'react-dom/client'
import './index.css'
import {Provider} from "react-redux";

import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom'
import './index.css'
import App from "./App.tsx";
import RealComponent from "./Components/RealComponent.tsx";
import React from 'react';
import RedirectComponent from "./Components/RedirectComponent.tsx";
import {store} from "./store";
import NavBar from "./Components/NavBar.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element:
            <>
                <NavBar></NavBar>
                <App/>
            </>
    },
    {
        path: '/DatacenterCreator',
        element: <RedirectComponent></RedirectComponent>
    },
    {
        path: '/DatacenterCreator',
        element: <>
            <NavBar></NavBar>
            <App/>
        </>
    },
    {
        path: '/components',
        element: <RedirectComponent></RedirectComponent>
    },
    {
        path: '/components/:componentid',
        element: <>
            <>
                <NavBar></NavBar>
                <RealComponent/>
            </>
        </>,
    },
    {
        path: '/?filterText=:filterText',
        element:
            <>
                <NavBar></NavBar>
                <App/>
            </>
    },
])


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>,
)
