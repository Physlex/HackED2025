
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
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
                <MenuItem onClick={handleClose}><Link to="/"> Home</Link></MenuItem>
                <MenuItem onClick={handleClose}> <Link to="/Page2">Page 2 </Link> </MenuItem>
            </Menu>

        </div>
    );
}


function ButtonUsage() {
    const click = () => {
        alert("Page 1 :):):):):):):):):):)");
    }
    return <Button onClick={click}>Hello </Button>;
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
            max: 1.2
        }
    },
    animation: {
        duration: 0
    }
};

type ChartData = {
    labels: number[];
    datasets: {
        data: number[];
        borderColor: string;
        backgroundColor: string;
    }[]
};

export default function ConstantRunningGraphOverTime() {
    const [timestamp, setTimestamp] = useState<number>(0);
    const [y, setY] = useState<number>(0);

    const [chartData, setChartData] = useState<ChartData>({
        labels: [],
        datasets: [
            {
                data: [],
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.3)'
            },
            {
                data: [],
                borderColor: 'orange',
                backgroundColor: 'rgba(0, 0, 255, 0.3)'
            },
        ]
    });
    
    // Update data on message
    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8765");

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setTimestamp(data.timestamp);
            setY(data.value);
        };

        return () => socket.close();
    }, []);

    // Update data
    useEffect(() => {
        setChartData((prevData) => {
            const newLabels = [...prevData.labels, timestamp];
            const newData1 = [...prevData.datasets[0].data, y];
            const newData2 = [...prevData.datasets[1].data, y];


            if (newLabels.length >= 100) {
                newLabels.shift();
                newData1.shift();
                newData2.shift();
            } 


            return {
                ...prevData,
                labels: newLabels,
                datasets: [
                    {
                        ...prevData.datasets[0],
                        data: newData1
                    },
                    {
                        ...prevData.datasets[1],
                        data: newData2
                    },
                ]
            };
        });
    }, [timestamp]);

    return (
        <div>

            <BasicMenu />   
            <ButtonUsage />


            <Line data={chartData} options={options} />
        </div>
    );
}


