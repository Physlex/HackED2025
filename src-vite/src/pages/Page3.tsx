import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { CircleCanvas } from "./Page2";

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

type Data = {
    "timestamp": boolean;
    "button_triangle": boolean;
    "button_circle": boolean;
    "button_cross": boolean;
    "button_square": boolean;
    "joystick_left_x": boolean;
    "joystick_left_y": boolean;
    "joystick_right_x": boolean;
    "joystick_right_y": boolean;
    "trigger_L1": boolean;
    "trigger_L2": boolean;
    "trigger_R1": boolean;
    "trigger_R2": boolean;
    "up_dpad": boolean;
    "down_dpad": boolean;
    "left_dpad": boolean;
    "right_dpad": boolean;
}

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

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8765");

        socket.onmessage = (event) => {
            const data: Data = JSON.parse(event.data);
            
            setPressed((prev) => ({ ...prev, "triangle": data.button_triangle  }));
            setPressed((prev) => ({ ...prev, "square": data.button_square  }));
            setPressed((prev) => ({ ...prev, "O": data.button_circle  }));
            setPressed((prev) => ({ ...prev, "X": data.button_cross  }));
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
        <div  style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "500px" }}>
        
            
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
            {/* Trigger Buttons */}
            <Box display="flex" justifyContent="center" width="80%">
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing="25%"
                    justifyItems="center"
                    justifyContent="space-between"
                    width="100%"
                >
                    {["L2", "R2", "L1", "L2"].map((btn) => (
                        <Grid item key={btn}>
                            <Box
                                sx={{ ...buttonStyle, width: 80, height: 40, borderRadius: "8px" }}
                            >
                                {btn}
                                <MotionOverlay active={pressed[btn as keyof typeof pressed]} />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Main Controller Layout */}
            <Grid container spacing={6} justifyContent="center" mt={4}>
                {/* Left Side - D-Pad */}
                <Grid item>
                    <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={1} width="auto">
                        <Box />
                        <Box sx={buttonStyle} >
                            U
                            <MotionOverlay active={pressed.U} />
                        </Box>
                        <Box />
                        <Box sx={buttonStyle} >
                            L
                            <MotionOverlay active={pressed.L} />
                        </Box>
                        <Box />
                        <Box sx={buttonStyle} >
                            R
                            <MotionOverlay active={pressed.R} />
                        </Box>
                        <Box />
                        <Box sx={buttonStyle} >
                            D
                            <MotionOverlay active={pressed.D} />
                        </Box>
                        <Box />
                    </Box>
                </Grid>

                <Grid item>
                    <CircleCanvas
                        canvasWidth={100}
                        canvasHeight={100}
                        outlineRadius={0.9}
                        joystickRadius={0.2}
                        translation={[0.0, 0.0]}
                        points={50}
                        lineWidth={4}
                        />
                </Grid>

                <Grid item>
                    <CircleCanvas
                        canvasWidth={100}
                        canvasHeight={100}
                        outlineRadius={0.9}
                        joystickRadius={0.2}
                        translation={[0.0, 0.0]}
                        points={50}
                        lineWidth={4}
                        />
                </Grid>

                <Grid item>
                    <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={1} width="auto">
                        <Box />
                        <Box sx={buttonStyle} >
                            △
                            <MotionOverlay active={pressed["triangle"]} />
                        </Box>
                        <Box />
                        <Box sx={buttonStyle} >
                            ▢
                            <MotionOverlay active={pressed["O"]} />
                        </Box>
                        <Box />
                        <Box sx={buttonStyle} >
                            O
                            <MotionOverlay active={pressed["O"]} />
                        </Box>
                        <Box />
                        <Box sx={buttonStyle} >
                            X
                            <MotionOverlay active={pressed["X"]} />
                        </Box>
                        <Box />
                    </Box>
                </Grid>
            </Grid>
        </Box>
        </div>
    );
    
}