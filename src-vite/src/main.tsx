import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";

import { layoutRouter } from './Layout.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={layoutRouter} />
    </StrictMode>,
)
