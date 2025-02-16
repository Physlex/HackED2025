import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {lightTheme,darkTheme} from "./theme/theme"; // Import the custom theme
import { layoutRouter } from "./Layout";
import { Brightness7, Brightness4 } from "@mui/icons-material";
import { IconButton } from "@mui/material";



function App(){
  const [darkMode,setDarkMode] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;
  return(
    <ThemeProvider theme={theme}>
      <CssBaseline/> 
        <IconButton
        onClick={() => setDarkMode(!darkMode)}
        color="inherit"
        sx={{position: "absolute",top: 10, right: 10}}
        >
        {darkMode ? <Brightness7/> : <Brightness4/>}  
        </IconButton>
        <RouterProvider router={layoutRouter}/>

    </ThemeProvider>
);
  }

// Render App with ThemeProvider
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App/>
  </StrictMode>
);