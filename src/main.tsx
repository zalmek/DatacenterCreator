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
        path: '/components/:componentid',
        element: <>
            <RealComponent/>
        </>,
    },
    {
        path: '/?filterText=:filterText',
        element: <App/>
    }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>,
)
