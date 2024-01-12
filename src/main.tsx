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
import {store} from "./store/store.ts";
import {Authorization} from "./Components/Authorization.tsx";
import {Registration} from "./Components/Registration.tsx";
import NavBar from "./Components/NavBar.tsx";
import {Creation} from "./Components/Creation.tsx";
import {CreationHistory} from "./Components/CreationHistory.tsx";
import {ComponentForm} from "./Components/ComponentForm.tsx";
import Breadcrumbs from "./Components/Breadcrumbs/Breadcrumbs.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element:
            <>
                <NavBar></NavBar>
                <Breadcrumbs></Breadcrumbs>
                <App/>
            </>
    },
    {
        path: '/creation',
        element:
            <>
                <NavBar></NavBar>
                <Breadcrumbs></Breadcrumbs>
                <Creation/>
            </>
    },
    {
        path: '/creationHistory/:creationid',
        element:
            <>
                <NavBar></NavBar>
                <Breadcrumbs></Breadcrumbs>
                <Creation/>
            </>
    },
    {
        path: '/creationHistory',
        element:
            <>
                <NavBar></NavBar>
                <Breadcrumbs></Breadcrumbs>
                <CreationHistory/>
            </>
    },
    {
        path: '/creationHistory/:creationid',
        element:
            <>
                <NavBar></NavBar>
                <Breadcrumbs></Breadcrumbs>
                <Creation/>
            </>
    },
    {
        path: 'DatacenterCreator',
        element:
            <>
                <RedirectComponent></RedirectComponent>
            </>
    }
    ,
    {
        path: '/components',
        element:
            <>
                <RedirectComponent></RedirectComponent>
            </>
    },
    {
        path: '/componentForm',
        element:
            <>
                <NavBar></NavBar>
                <Breadcrumbs></Breadcrumbs>
                <ComponentForm></ComponentForm>
            </>
    },
    {
        path: '/componentForm/:componentid',
        element:
            <>
                <NavBar></NavBar>
                <Breadcrumbs></Breadcrumbs>
                <ComponentForm></ComponentForm>
            </>
    },
    {
        path: '/components/:componentid',
        element:
            <>
                <RealComponent/>
            </>,
    }
    ,
    {
        path: '/?filterText=:filterText',
        element:
            <>
                <NavBar/>
                <Breadcrumbs></Breadcrumbs>
                <App/>
            </>
    }
    ,
    {
        path: '/auth',
        element:
            <>
                <NavBar></NavBar>
                <Breadcrumbs></Breadcrumbs>
                <Authorization></Authorization>
            </>
    }
    ,
    {
        path: '/register',
        element:
            <>
                <NavBar></NavBar>
                <Breadcrumbs></Breadcrumbs>
                <Registration></Registration>
            </>
    }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>,
)
