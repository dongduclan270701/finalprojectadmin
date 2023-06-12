import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const Index = () => {
    const labels = ['Mem 1', 'Mem 2', 'Mem 3', 'Mem 4', 'Mem 5', 'Mem 6', 'Mem 7', 'Mem 8', 'Mem 9', 'Mem 10', 'Mem 11'];
    const data = {
        labels,
        datasets: [
            {
                label: 'USD',
                data: labels.map(() => Math.floor(Math.random() * 1001)),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)'
                ],
            }
        ],
    }
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Salary employee/ Month',
            }
        },
    };
    return (
        <Bar options={options} data={data} />
    );
}

export default Index;
