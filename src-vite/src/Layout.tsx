/**
 * This module defines the layout for the rest of the application.
 */

import { JSX, useState } from "react";
import {
  Route,
  Outlet,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Import Pages
import Home from "./pages/Home";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";

// Import Navbar Component
import Navbar from "./components/Navbar";

// Import Custom Themes
import { lightTheme, darkTheme } from "./theme/theme";

/**
 * Layout for the application.
 */
export default function Layout(): JSX.Element {
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar toggleTheme={() => setDarkMode(!darkMode)} darkMode={darkMode} />
      <Outlet /> {/* Renders the current page */}
    </ThemeProvider>
  );
}

// Define Application Routes
export const layoutRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/page1" element={<Page1 />} />
      <Route path="/page2" element={<Page2 />} />
      <Route path="/page3" element={<Page3 />} />
    </Route>,
  ),
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);
