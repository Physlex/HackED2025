import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import * as React from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';



export function BasicMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                area-haspopup="true"
                area-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                Dashboard
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}> <Link to="/ConstantRunningGraphOverTime">Graph 1 </Link> </MenuItem>
                <MenuItem onClick={handleClose}><Link to="/page2"> Page 2</Link></MenuItem>
            </Menu>

        </div>
    );
}



function ButtonUsage() {
    const [count, setCount] = useState(0);

    const click = () => {
        //alert("Thank you for giving me a purpose and clicking me!");
        setCount(count + 1);
    };
    return (
        <Button
            onClick={click}
            variant="contained"
            color="primary"
            sx={{ marginTop: "20px" }}
        >
            Click me. (I've been clicked {count} times.)
        </Button>
    );
}

export default function Home() {
    return (
        <div className="Home bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex flex-col items-center text-white p-8">


            {/* Welcome Message */}
            <motion.h1
                className="text-4xl font-bold text-center mt-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                Welcome to Our Awesome Website & Cool Data Tracker
            </motion.h1>
            <BasicMenu />

            {/* Card Layout */}
            <motion.div
                className="bg-white p-6 rounded-xl shadow-xl text-gray-800 mt-10 w-full max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <h2 className="text-xl font-semibold">Your Data Hub</h2>
                <p className="text-sm text-gray-600 mb-4">
                    *Insert graph here*
                </p>

                {/* Button */}
                <div className="flex justify-center">
                    <ButtonUsage />
                </div>
            </motion.div>
        </div>
    );
}