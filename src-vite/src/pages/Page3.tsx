import { useState } from "react";
import { Box, Grid } from "@mui/material";
import { motion } from "framer-motion";

const buttonStyle = {
    width: 50,
    height: 50,
    borderRadius: "50%",
    backgroundColor: "#E0C8FF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    cursor: "pointer",
};

const triggerStyle = {
    width: 80,
    height: 40,
    backgroundColor: "#E0C8FF",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    cursor: "pointer",
};

const joystickStyle = {
    width: 80,
    height: 80,
    borderRadius: "50%",
    border: "4px solid #E0C8FF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

export default function GameController() {
    const [pressed, setPressed] = useState<{ [key: string]: boolean }>({});

    const handlePress = (btn: string) => {
        setPressed((prev) => ({ ...prev, [btn]: true }));
        setTimeout(() => setPressed((prev) => ({ ...prev, [btn]: false })), 200);
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
            {/* Trigger Buttons */}
            <Grid container spacing={3} justifyContent="space-between" width={400}>
                <Grid item>
                    <motion.div
                        whileTap={{ scale: 0.9 }}
                        style={{ ...triggerStyle, backgroundColor: pressed.L2 ? "#B48CF3" : "#E0C8FF" }}
                        onClick={() => handlePress("L2")}
                    >
                        L2
                    </motion.div>
                    <motion.div
                        whileTap={{ scale: 0.9 }}
                        style={{ ...triggerStyle, backgroundColor: pressed.L1 ? "#B48CF3" : "#E0C8FF", marginTop: 10 }}
                        onClick={() => handlePress("L1")}
                    >
                        L1
                    </motion.div>
                </Grid>

                <Grid item>
                    <motion.div
                        whileTap={{ scale: 0.9 }}
                        style={{ ...triggerStyle, backgroundColor: pressed.R2 ? "#B48CF3" : "#E0C8FF" }}
                        onClick={() => handlePress("R2")}
                    >
                        R2
                    </motion.div>
                    <motion.div
                        whileTap={{ scale: 0.9 }}
                        style={{ ...triggerStyle, backgroundColor: pressed.R1 ? "#B48CF3" : "#E0C8FF", marginTop: 10 }}
                        onClick={() => handlePress("R1")}
                    >
                        R1
                    </motion.div>
                </Grid>
            </Grid>

            {/* Main Controller Layout */}
            <Grid container spacing={6} justifyContent="center" mt={4}>
                {/* Left Side - D-Pad */}
                <Grid item>
                    <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                        <motion.div whileTap={{ scale: 0.9 }} style={buttonStyle} onClick={() => handlePress("U")}>
                            U
                        </motion.div>
                        <Box display="flex" gap={1}>
                            <motion.div whileTap={{ scale: 0.9 }} style={buttonStyle} onClick={() => handlePress("L")}>
                                L
                            </motion.div>
                            <motion.div whileTap={{ scale: 0.9 }} style={buttonStyle} onClick={() => handlePress("R")}>
                                R
                            </motion.div>
                        </Box>
                        <motion.div whileTap={{ scale: 0.9 }} style={buttonStyle} onClick={() => handlePress("D")}>
                            D
                        </motion.div>
                    </Box>
                </Grid>

                {/* Left Joystick */}
                <Grid item>
                    <motion.div
                        drag
                        dragConstraints={{ left: -10, right: 10, top: -10, bottom: 10 }}
                        style={{ ...joystickStyle }}
                    >
                        <Box sx={{ width: 50, height: 50, borderRadius: "50%", backgroundColor: "#E0C8FF" }}>
                            L
                        </Box>
                    </motion.div>
                </Grid>

                {/* Right Joystick */}
                <Grid item>
                    <motion.div
                        drag
                        dragConstraints={{ left: -10, right: 10, top: -10, bottom: 10 }}
                        style={{ ...joystickStyle }}
                    >
                        <Box sx={{ width: 50, height: 50, borderRadius: "50%", backgroundColor: "#E0C8FF" }}>
                            R
                        </Box>
                    </motion.div>
                </Grid>

                {/* Right Side - Action Buttons */}
                <Grid item>
                    <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                        <motion.div whileTap={{ scale: 0.9 }} style={buttonStyle} onClick={() => handlePress("△")}>
                            △
                        </motion.div>
                        <Box display="flex" gap={1}>
                            <motion.div whileTap={{ scale: 0.9 }} style={buttonStyle} onClick={() => handlePress("▢")}>
                                ▢
                            </motion.div>
                            <motion.div whileTap={{ scale: 0.9 }} style={buttonStyle} onClick={() => handlePress("O")}>
                                O
                            </motion.div>
                        </Box>
                        <motion.div whileTap={{ scale: 0.9 }} style={buttonStyle} onClick={() => handlePress("X")}>
                            X
                        </motion.div>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}