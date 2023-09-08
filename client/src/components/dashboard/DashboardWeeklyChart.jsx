import React, { useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import getCurrentWeekDates from '../../functions/getCurrentWeekDates'
import axios from 'axios'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const labels = getCurrentWeekDates();

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
            position: 'top',
        },
        title: {
            display: false,
            text: 'Chart.js Bar Chart',
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
        },
        y: {
            grid: {
                display: false,
            },
        },
    },
}

export const data = {
    labels,
    datasets: [
        {
            label: 'Hours registered',
            data: [4, 6, 8.5, 5, 9],
            backgroundColor: '#646cff',
        },
        {
            label: 'Recommended hours',
            data: [8.5, 8.5, 8.5, 8.5, 8.5],
            backgroundColor: '#64748b',
        },
    ],
}

const DashboardWeeklyChart = ({ fetchTimeRegistrations }) => {
    return (
        <div>
            <Bar options={options} data={data} />
        </div>
    )
}

export default DashboardWeeklyChart
