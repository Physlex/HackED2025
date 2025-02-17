import { useState } from 'react'
import {
    AppBar, Toolbar, IconButton, Typography, Box,
    Button, Drawer, List, ListItem, ListItemButton, ListItemText
} from "@mui/material";
import { Menu as MenuIcon, Brightness4, Brightness7, Home, BarChart, Info } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { motion } from 'framer-motion';


/** 
 * Navigation Bar Component 
 */
export default function Navbar({ toggleTheme, darkMode }: { toggleTheme: () => void; darkMode: boolean }) {
    const theme = useTheme();
    //const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileOpen, setMobileOpen] = useState(false);

    // Handle menu clicks


    // Toggle mobile drawer
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // Define navigation links
    const navItems = [
        { label: "Home", path: "/", icon: <Home /> },
        { label: "Page 1", path: "/Page1", icon: <BarChart /> },
        { label: "Page 2", path: "/Page2", icon: <Info /> },
        { label: "Page 3", path: "/Page3", icon: <Info /> },
    ];

    return (
        <>
            {/* Animated Navbar */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <AppBar position="sticky" sx={{ backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }}>
                    <Toolbar sx={{ justifyContent: "space-between" }}>
                        {/* Logo / Title */}
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                <Button component={Link} to="/" sx={{ color: "inherit", fontWeight: "bold", fontSize: "1.2rem" }}>
                                    My Dashboard
                                </Button>
                            </motion.div>
                        </Typography>

                        {/* Desktop Navigation Links */}
                        <Box sx={{ display: { xs: "none", md: "block" } }}>
                            {navItems.map((item) => (
                                <motion.div key={item.label} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                    <Button component={Link} to={item.path} sx={{ color: "inherit", mx: 1 }}>
                                        {item.icon} {item.label}
                                    </Button>
                                </motion.div>
                            ))}
                        </Box>

                        {/* Mobile Menu Icon */}
                        <Box sx={{ display: { xs: "block", md: "none" } }}>
                            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                                <IconButton color="inherit" onClick={handleDrawerToggle}>
                                    <MenuIcon />
                                </IconButton>
                            </motion.div>
                        </Box>

                        {/* Dark Mode Toggle */}
                        <motion.div whileHover={{ rotate: 180, scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                            <IconButton onClick={toggleTheme} color="inherit">
                                {darkMode ? <Brightness7 /> : <Brightness4 />}
                            </IconButton>
                        </motion.div>
                    </Toolbar>
                </AppBar>
            </motion.div>

            {/* Mobile Navigation Drawer (Slide-in Animation) */}
            <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <List>
                        {navItems.map((item) => (
                            <ListItem key={item.label} disablePadding>
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                    <ListItemButton component={Link} to={item.path} onClick={handleDrawerToggle}>
                                        {item.icon} <ListItemText primary={item.label} sx={{ ml: 1 }} />
                                    </ListItemButton>
                                </motion.div>
                            </ListItem>
                        ))}
                    </List>
                </motion.div>
            </Drawer>
        </>
    );
}