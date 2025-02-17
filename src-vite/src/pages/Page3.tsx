import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { motion } from "framer-motion";
//import { s } from "framer-motion/client";

// Base styles
const buttonStyle = {
    width: 50,
    height: 50,
    borderRadius: "50%",
    border: "4px solid #4F46E5",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    cursor: "pointer",
    overflow: "hidden",
};

/* const joystickStyle = {
    width: 80,
    height: 80,
    borderRadius: "50%",
    border: "4px solid #4F46E5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
};*/

// Button overlay animation
const MotionOverlay = ({ active }: { active: boolean }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "#4F46E5",
            top: 0,
            left: 0,
        }}
    />
);

export default function GameController() {
    const [pressed, setPressed] = useState({
        L2: false, L1: false, R2: false, R1: false,
        U: false, L: false, R: false, D: false,
        triangle: false, "square": false, "O": false, "X": false,
    });

    const handlePress = (btn: keyof typeof pressed) => {
        setPressed((prev) => ({ ...prev, [btn]: !prev[btn] }));
    };

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8765");

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            
            setPressed((prev) => ({ ...prev, "triangle": data.button_triangle  }));
            setPressed((prev) => ({ ...prev, "square": data.button_square  }));
            setPressed((prev) => ({ ...prev, "O": data.button_circle  }));
            setPressed((prev) => ({ ...prev, "X": data.button_X  }));
            setPressed((prev) => ({ ...prev, "L2": data.trigger_L2  }));
            setPressed((prev) => ({ ...prev, "L1": data.trigger_L1  }));
            setPressed((prev) => ({ ...prev, "R2": data.trigger_R2  }));
            setPressed((prev) => ({ ...prev, "R1": data.trigger_R1  }));
            setPressed((prev) => ({ ...prev, "U": data.up_dpad  }));
            setPressed((prev) => ({ ...prev, "L": data.left_dpad  }));
            setPressed((prev) => ({ ...prev, "R": data.right_dpad  }));   
            setPressed((prev) => ({ ...prev, "D": data.down_dpad  }));

        };
    }, []);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
            {/* Trigger Buttons */}
            <Grid container spacing={3} justifyContent="space-between" width={400}>
                {["L2", "L1", "R2", "R1"].map((btn) => (
                    <Grid item key={btn}>
                        <Box
                            sx={{ ...buttonStyle, width: 80, height: 40, borderRadius: "8px" }}
                            onClick={() => handlePress(btn as keyof typeof pressed)}
                        >
                            {btn}
                            <MotionOverlay active={pressed[btn as keyof typeof pressed]} />
                        </Box>
                    </Grid>
                ))}
            </Grid>

            {/* Main Controller Layout */}
            <Grid container spacing={6} justifyContent="center" mt={4}>
                {/* Left Side - D-Pad */}
                <Grid item>
                    <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={1} width="auto">
                        <Box />
                        <Box sx={buttonStyle} onClick={() => handlePress("U")}>
                            U
                            <MotionOverlay active={pressed.U} />
                        </Box>
                        <Box />
                        <Box sx={buttonStyle} onClick={() => handlePress("L")}>
                            L
                            <MotionOverlay active={pressed.L} />
                        </Box>
                        <Box />
                        <Box sx={buttonStyle} onClick={() => handlePress("R")}>
                            R
                            <MotionOverlay active={pressed.R} />
                        </Box>
                        <Box />
                        <Box sx={buttonStyle} onClick={() => handlePress("D")}>
                            D
                            <MotionOverlay active={pressed.D} />
                        </Box>
                        <Box />
                    </Box>
                </Grid>

                {/* Left Joystick */}
                {/*
                <Grid item>
                    <motion.div
                        drag
                        dragConstraints={{ left: -10, right: 10, top: -10, bottom: 10 }}
                        whileTap={{ scale: 0.9 }}
                        style={joystickStyle as React.CSSProperties}
                    >
                        <Box sx={{ width: 50, height: 50, borderRadius: "50%", backgroundColor: "#4F46E5" }}>
                            L
                        </Box>
                    </motion.div>
                </Grid>
                 */}
                
                {/* Right Joystick 


                <Grid item>
                    <motion.div
                        drag
                        dragConstraints={{ left: -10, right: 10, top: -10, bottom: 10 }}
                        whileTap={{ scale: 0.9 }}
                        style={joystickStyle as React.CSSProperties}
                    >
                        <Box sx={{ width: 50, height: 50, borderRadius: "50%", backgroundColor: "#4F46E5" }}>
                            R
                        </Box>
                    </motion.div>
                </Grid>

                            */}
                {/* Right Side - Action Buttons */}
                <Grid item>
                    <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={1} width="auto">
                        <Box />
                        <Box sx={buttonStyle} onClick={() => handlePress("triangle")}>
                            △
                            <MotionOverlay active={pressed["triangle"]} />
                        </Box>
                        <Box />
                        <Box sx={buttonStyle} onClick={() => handlePress("square")}>
                            ▢
                            <MotionOverlay active={pressed["O"]} />
                        </Box>
                        <Box />
                        <Box sx={buttonStyle} onClick={() => handlePress("O")}>
                            O
                            <MotionOverlay active={pressed["O"]} />
                        </Box>
                        <Box />
                        <Box sx={buttonStyle} onClick={() => handlePress("X")}>
                            X
                            <MotionOverlay active={pressed["X"]} />
                        </Box>
                        <Box />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}