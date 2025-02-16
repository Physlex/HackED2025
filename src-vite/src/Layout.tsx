/**
 * This module defines the layout for the rest of the application.
 */


import { JSX } from 'react';

import {
    Route,
    Outlet,
    createBrowserRouter,
    createRoutesFromElements
} from 'react-router-dom';
import  Home  from './pages/Home';
import  Page1  from './pages/Page1';
import Page2 from './pages/Page2';

/**
 * Layout for the application.
 */
export default function Layout(): JSX.Element {
    return (
        <div id="app">
            <Outlet />
        </div>
    );
}

// Browser router to be used in the application
export const layoutRouter = createBrowserRouter(createRoutesFromElements(
    <Route element={<Layout />} >
        <Route path="/" element={<Home />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
    </Route>
),
{
    future: {
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_relativeSplatPath: true,
        v7_skipActionErrorRevalidation: true,
    },
});
