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
import {Authorization} from "./Components/Authorization.tsx";
import {Registration} from "./Components/Registration.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>
    },
    {
        path: 'DatacenterCreator',
        element: <RedirectComponent></RedirectComponent>
    },
    {
        path: 'components',
        element: <RedirectComponent></RedirectComponent>
    },
    {
        path: '/components/:componentid',
        element: <>
            <RealComponent/>
        </>,
    },
    {
        path: '/?filterText=:filterText',
        element: <App/>
    },
    {
        path: '/auth',
        element: <Authorization></Authorization>
    },
    {
        path: '/register',
        element: <Registration></Registration>
    }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>,
)
