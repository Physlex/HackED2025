import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { layoutRouter } from './Layout.tsx';

// Define a theme with global styles

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary:{
        main: '#ff5252'
      }
      
    },
});
  


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
        <RouterProvider router={layoutRouter} />
        </ThemeProvider>
    </StrictMode>,
)
