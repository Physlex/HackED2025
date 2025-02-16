
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";



function ButtonUsage() {
    const click = () => {
        alert("Page 1");
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
            min: -1.2,
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

export default function Page1() {
    const [second, setSecond] = useState<number>(0);

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


    useEffect(() => {
        const interval = setInterval(() => {
            setChartData((prevData) => {
                const newLabels = [...prevData.labels, second];
                const newData1 = [...prevData.datasets[0].data, Math.random()];
                const newData2 = [...prevData.datasets[1].data, Math.random()];


    // Update data
    const updateData = () => {
        setChartData((prevData) => {
            const newLabels = [...prevData.labels, second];
            const newData1 = [...prevData.datasets[0].data, Math.random()*2 - 1];
            const newData2 = [...prevData.datasets[1].data, Math.random()*2 - 1];


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

        setSecond((prev) => prev + 1);
    };
    
    useEffect(() => {
        const interval = setInterval(() => {
            updateData();
        }, 10);

        return () => clearInterval(interval);
    }, [second]);

    return (
        <div>

            <nav>
                <Link to="/">Home </Link>
                <Link to="/Page2">Page2</Link>
            </nav>
            <ButtonUsage />


            <Line data={chartData} options={options} />
        </div>
    );
}


