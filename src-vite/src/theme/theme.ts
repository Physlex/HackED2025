import { createTheme } from "@mui/material/styles";

// Light Theme
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#4F46E5" },
    secondary: { main: "#FF5252" },
    background: { default: "#F5F5F5", paper: "#FFFFFF" },
    text: { primary: "#333333" },
  },
});

// Dark Theme
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90CAF9" },
    secondary: { main: "#F48FB1" },
    background: { default: "#121212", paper: "#1E1E1E" },
    text: { primary: "#FFFFFF" },
  },
});