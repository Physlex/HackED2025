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

import { Page1 } from './pages';

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
        <Route path="/" element={<Page1 />} />
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
