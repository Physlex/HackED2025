/**
 * This page renders a line chart representing interactions with the dualsense ps5
 * controller.
 */

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const HOST_NAME = "localhost";
const PORT = 8765;

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
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/"> Home</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {" "}
          <Link to="/Page2">Page 2 </Link>{" "}
        </MenuItem>
      </Menu>
    </div>
  );
}

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const options = {
  responsive: true,
  plugins: {
    legend: { display: true },
  },
  scales: {
    y: {
      min: -0.2,
      max: 1.2,
    },
  },
  animation: {
    duration: 0,
  },
};

type ChartData = {
  labels: number[];
  datasets: {
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
};

export default function Page1() {
  const [timestamp, setTimestamp] = useState<number>(0);
  // const [_y, _setY] = useState<number>(0); // unnecessary?
  const [button_circle, set_button_circle] = useState<number>(0);
  const [button_triangle, set_button_triangle] = useState<number>(0);
  const [button_cross, set_button_cross] = useState<number>(0);
  const [button_square, set_button_square] = useState<number>(0);
  const [joystick_left_x, set_joystick_left_x] = useState<number>(0);
  const [joystick_left_y, set_joystick_left_y] = useState<number>(0);
  const [joystick_right_x, set_joystick_right_x] = useState<number>(0);
  const [joystick_right_y, set_joystick_right_y] = useState<number>(0);
  const [trigger_L1, set_trigger_L1] = useState<number>(0);
  const [trigger_L2, set_trigger_L2] = useState<number>(0);
  const [trigger_R1, set_trigger_R1] = useState<number>(0);
  const [trigger_R2, set_trigger_R2] = useState<number>(0);

  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        data: [],
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.3)",
      },
      {
        data: [],
        borderColor: "orange",
        backgroundColor: "rgba(0, 0, 255, 0.3)",
      },
      {
        data: [],
        borderColor: "green",
        backgroundColor: "rgba(0, 0, 255, 0.3)",
      },
      {
        data: [],
        borderColor: "red",
        backgroundColor: "rgba(0, 0, 255, 0.3)",
      },
      {
        data: [],
        borderColor: "black",
        backgroundColor: "rgba(0, 0, 255, 0.3)",
      },
      {
        data: [],
        borderColor: "yellow",
        backgroundColor: "rgba(0, 0, 255, 0.3)",
      },
      {
        data: [],
        borderColor: "purple",
        backgroundColor: "rgba(0, 0, 255, 0.3)",
      },
      {
        data: [],
        borderColor: "pink",
        backgroundColor: "rgba(0, 0, 255, 0.3)",
      },
      {
        data: [],
        borderColor: "brown",
        backgroundColor: "rgba(0, 0, 255, 0.3)",
      },
      {
        data: [],
        borderColor: "navy",
        backgroundColor: "rgba(0, 0, 255, 0.3)",
      },
      {
        data: [],
        borderColor: "vermilion",
        backgroundColor: "rgba(0, 0, 255, 0.3)",
      },
      {
        data: [],
        borderColor: "gray",
        backgroundColor: "rgba(0, 0, 255, 0.3)",
      },
    ],
  });

  // Connect to websocket
  useEffect(() => {
    const socket = new WebSocket(`ws://${HOST_NAME}:${PORT}`);

    // Update timestamp and y when a value is received from socket
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setTimestamp(data.timestamp);
      // setY(data.value);
      set_button_triangle(data.button_triangle);
      set_button_circle(data.button_circle);
      set_button_cross(data.button_cross);
      set_button_square(data.button_square);
      set_joystick_left_x(data.joystick_left_x);
      set_joystick_left_y(data.joystick_left_y);
      set_joystick_right_x(data.joystick_right_x);
      set_joystick_right_y(data.joystick_right_y);
      set_trigger_L1(data.trigger_L1);
      set_trigger_L2(data.trigger_L2);
      set_trigger_R1(data.trigger_R1);
      set_trigger_R2(data.trigger_R2);
    };

    return () => socket.close();
  }, []);

  // Update data
  useEffect(() => {
    setChartData((prevData) => {
      const newLabels = [...prevData.labels, timestamp];
      const data_button_triangle = [
        ...prevData.datasets[0].data,
        button_triangle,
      ];
      const data_button_circle = [...prevData.datasets[1].data, button_circle];
      const data_button_cross = [...prevData.datasets[2].data, button_cross];
      const data_button_square = [...prevData.datasets[3].data, button_square];
      const data_joystick_left_x = [
        ...prevData.datasets[4].data,
        joystick_left_x,
      ];
      const data_joystick_left_y = [
        ...prevData.datasets[5].data,
        joystick_left_y,
      ];
      const data_joystick_right_x = [
        ...prevData.datasets[6].data,
        joystick_right_x,
      ];
      const data_joystick_right_y = [
        ...prevData.datasets[7].data,
        joystick_right_y,
      ];
      const data_trigger_L1 = [...prevData.datasets[8].data, trigger_L1];
      const data_trigger_L2 = [...prevData.datasets[9].data, trigger_L2];
      const data_trigger_R1 = [...prevData.datasets[10].data, trigger_R1];
      const data_trigger_R2 = [...prevData.datasets[11].data, trigger_R2];

      if (newLabels.length >= 10) {
        newLabels.shift();
        data_button_triangle.shift();
        data_button_circle.shift();
        data_button_cross.shift();
        data_button_square.shift();
        data_joystick_left_x.shift();
        data_joystick_left_y.shift();
        data_joystick_right_x.shift();
        data_joystick_right_y.shift();
        data_trigger_L1.shift();
        data_trigger_L2.shift();
        data_trigger_R1.shift();
        data_trigger_R2.shift();
      }

      return {
        ...prevData,
        labels: newLabels,
        datasets: [
          {
            ...prevData.datasets[0],
            data: data_button_triangle,
          },
          {
            ...prevData.datasets[1],
            data: data_button_circle,
          },
          {
            ...prevData.datasets[2],
            data: data_button_cross,
          },
          {
            ...prevData.datasets[3],
            data: data_button_square,
          },
          {
            ...prevData.datasets[4],
            data: data_joystick_left_x,
          },
          {
            ...prevData.datasets[5],
            data: data_joystick_left_y,
          },
          {
            ...prevData.datasets[6],
            data: data_joystick_right_x,
          },
          {
            ...prevData.datasets[7],
            data: data_joystick_right_y,
          },
          {
            ...prevData.datasets[8],
            data: data_trigger_L1,
          },
          {
            ...prevData.datasets[9],
            data: data_trigger_L2,
          },
          {
            ...prevData.datasets[10],
            data: data_trigger_R1,
          },
          {
            ...prevData.datasets[11],
            data: data_trigger_R2,
          },
        ],
      };
    });
  }, [timestamp]);

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
}
