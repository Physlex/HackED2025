import { Button } from "@mui/material";
import { Link } from "react-router-dom";


import { motion } from "framer-motion";


function ButtonUsage() {
    const click = () => {
        alert("Thank you for giving me a purpose and clicking me!");
    };
    return (
        <Button 
            onClick={click} 
            variant="contained" 
            color="primary"
            sx={{ marginTop: "20px" }}
        >
            Click Me
        </Button>
    );
}

export default function Home() {
    return (
        <div className="Home bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex flex-col items-center text-white p-8">

            
            {/* Navbar */}
            <motion.nav 
                className="bg-gray-900 p-4 rounded-xl shadow-lg flex justify-center gap-6 w-full max-w-lg"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Link to="/page1" className="text-white hover:text-blue-300 transition">Page 1</Link>
                <Link to="/page2" className="text-white hover:text-blue-300 transition">Page 2</Link>
            </motion.nav>

            {/* Welcome Message */}
            <motion.h1 
                className="text-4xl font-bold text-center mt-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                Welcome to Our Awesome Website & Cool Data Tracker
            </motion.h1>

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