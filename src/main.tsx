import ReactDOM from 'react-dom/client'
import './index.css'

import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom'
import './index.css'
import App from "./App.tsx";
import RealComponent from "./Components/RealComponent.tsx";
import React from 'react';
import RedirectComponent from "./Components/RedirectComponent.tsx";
import SearchNavBar from "./Components/SearchNavBar.tsx";

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
            <SearchNavBar path={[]} filter={undefined} changeFilter={undefined} executeSearch={undefined}/>
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
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
