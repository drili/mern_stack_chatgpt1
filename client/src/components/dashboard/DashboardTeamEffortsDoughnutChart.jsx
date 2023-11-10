import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

const DashboardTeamEffortsDoughnutChart = ({ data }) => {
    ChartJS.register(ArcElement, Tooltip, Legend);

    const chartData = {
        labels: ['Client Time', 'Intern Time', 'Rest Time'],
        datasets: [
            {
                data: [data.clientTime, data.internTime, data.restTime],
                backgroundColor: ['#f43f5e', '#fbbf24', 'black'],
                hoverBackgroundColor: ['#9f1239', '#fbd75e', 'black'],
            },
        ],
    };

    const options = {
        legend: {
            display: false,
            position: 'right',
        },
        plugins: {
            legend: {
                display: false,
                position: 'right'
            }
        }
    };


    return <Doughnut data={chartData} options={options} />;
}

export default DashboardTeamEffortsDoughnutChart