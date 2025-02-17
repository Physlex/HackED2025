/**
 * This page renders a controller, for the user to visually *see* interaction occur with
 * the dualsense.
 */

import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material"; // TODO: Transition to Grid2?
import { motion } from "framer-motion";
import { CircleCanvas } from "./Page2";
import BatteryGauge from "react-battery-gauge";

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

type ControllerState = {
  timestamp: boolean;
  button_triangle_pressed: boolean;
  button_circle_pressed: boolean;
  button_cross_pressed: boolean;
  button_square_pressed: boolean;
  joystick_left_x: number;
  joystick_left_y: number;
  joystick_right_x: number;
  joystick_right_y: number;
  pitch: number;
  yaw: number;
  roll: number;
  trigger_L1_pressed: boolean;
  trigger_L2_pressed: boolean;
  trigger_R1_pressed: boolean;
  trigger_R2_pressed: boolean;
  up_dpad_pressed: boolean;
  down_dpad_pressed: boolean;
  left_dpad_pressed: boolean;
  right_dpad_pressed: boolean;
  battery_level: number;
  battery_state: string;
  button_L3_pressed: boolean;
  button_R3_pressed: boolean;
};

// Button overlay animation
const MotionOverlay = ({ active }: { active: boolean }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: active ? 1 : 0 }}
    transition={{ duration: 0 }}
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
  const [batteryPercentage, setBatteryPercentage] = useState<number>(100);
  // const [batteryState, setBatteryState] = useState<string>("");

  const [joystickLeftX, setJoystickLeftX] = useState<number>(0);
  const [joystickLeftY, setJoystickLeftY] = useState<number>(0);
  const [joystickRightX, setJoystickRightX] = useState<number>(0);
  const [joystickRightY, setJoystickRightY] = useState<number>(0);

  const [pressed, setPressed] = useState({
    L2: false,
    L1: false,
    R2: false,
    R1: false,
    L3: false,
    R3: false,

    U: false,
    L: false,
    D: false,
    R: false,

    triangle: false,
    square: false,
    O: false,
    X: false,
  });

  const [rotation, setRot] = useState({
    pitch: 0,
    maxPitch: 1,
    yaw: 0,
    maxYaw: 1,
    roll: 0,
    maxRoll: 1,
  });

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8765");

    socket.onmessage = (event) => {
      const data: ControllerState = JSON.parse(event.data);

      // Joystick
      setJoystickLeftX(data.joystick_left_x / 128);
      setJoystickLeftY(-data.joystick_left_y / 128);
      setJoystickRightX(data.joystick_right_x / 128);
      setJoystickRightY(-data.joystick_right_y / 128);
      

      // Battery
      setBatteryPercentage(data.battery_level);

      setPressed((prev) => ({
        ...prev,
        triangle: data.button_triangle_pressed,
        square: data.button_square_pressed,
        O: data.button_circle_pressed,
        X: data.button_cross_pressed,

        L2: data.trigger_L2_pressed,
        L1: data.trigger_L1_pressed,
        R2: data.trigger_R2_pressed,
        R1: data.trigger_R1_pressed,
        L3: data.button_L3_pressed,
        R3: data.button_R3_pressed,

        U: data.up_dpad_pressed,
        L: data.left_dpad_pressed,
        R: data.right_dpad_pressed,
        D: data.down_dpad_pressed,
      }));

      setRot({
        ...rotation,
        pitch: data.pitch / 17180,
        maxPitch: Math.max(rotation.maxPitch, data.pitch),
        yaw: data.yaw / 17180,
        maxYaw: Math.max(rotation.maxYaw, data.yaw),
        roll: data.roll / 17180,
        maxRoll: Math.max(rotation.maxRoll, data.roll),
      });
    };
  }, [rotation]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
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
              {["L2", "R2", "L1", "R1"].map((btn) => (
                <Grid item key={btn}>
                  <Box
                    sx={{
                      ...buttonStyle,
                      width: 80,
                      height: 40,
                      borderRadius: "8px",
                    }}
                  >
                    {btn}
                    <MotionOverlay
                      active={pressed[btn as keyof typeof pressed]}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Main Controller Layout */}
          <Grid container spacing={6} justifyContent="center" mt={4}>
            {/* Left Side - D-Pad */}
            <Grid item>
              <Box
                display="grid"
                gridTemplateColumns="repeat(3, 1fr)"
                gap={1}
                width="auto"
              >
                <Box />
                <Box sx={buttonStyle}>
                  U
                  <MotionOverlay active={pressed.U} />
                </Box>
                <Box />
                <Box sx={buttonStyle}>
                  L
                  <MotionOverlay active={pressed.L} />
                </Box>
                <Box />
                <Box sx={buttonStyle}>
                  R
                  <MotionOverlay active={pressed.R} />
                </Box>
                <Box />
                <Box sx={buttonStyle}>
                  D
                  <MotionOverlay active={pressed.D} />
                </Box>
                <Box />
              </Box>
            </Grid>

            <Grid item>
              <CircleCanvas
                canvasWidth={150}
                canvasHeight={150}
                outlineRadius={0.7}
                joystickRadius={0.2}
                translation={[joystickLeftX, joystickLeftY]}
                points={50}
                lineWidth={4}
                pressed={pressed.L3}
              />
            </Grid>

            <Grid item>
              <CircleCanvas
                canvasWidth={150}
                canvasHeight={150}
                outlineRadius={0.7}
                joystickRadius={0.2}
                translation={[joystickRightX, joystickRightY]}
                points={50}
                lineWidth={4}
                pressed={pressed.R3}
              />
            </Grid>

            <Grid item>
              <Box
                display="grid"
                gridTemplateColumns="repeat(3, 1fr)"
                gap={1}
                width="auto"
              >
                <Box />
                <Box sx={buttonStyle}>
                  △
                  <MotionOverlay active={pressed["triangle"]} />
                </Box>
                <Box />
                <Box sx={buttonStyle}>
                  ▢
                  <MotionOverlay active={pressed["square"]} />
                </Box>
                <Box />
                <Box sx={buttonStyle}>
                  O
                  <MotionOverlay active={pressed["O"]} />
                </Box>
                <Box />
                <Box sx={buttonStyle}>
                  X
                  <MotionOverlay active={pressed["X"]} />
                </Box>
                <Box />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
      <BatteryGauge value={batteryPercentage} size={200} padding={10} />

      {/* This renders the tilt information */}
      {/* <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <TiltCanvas
          pitch={rotation.pitch}
          yaw={rotation.yaw}
          roll={rotation.roll}
        />
      </Box> */}
    </>
  );
}
