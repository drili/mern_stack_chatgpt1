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
console.log({labels})

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

const DashboardWeeklyChart = ({ fetchTimeRegistrations }) => {
    const filteredRegistrationsByDate = {};

    labels.forEach((date) => {
        filteredRegistrationsByDate[date] = fetchTimeRegistrations.filter((registration) => {
            return registration.currentTime === date;
        });
    });

    const totalRegisteredTimeArray = []
    for (const key in filteredRegistrationsByDate) {
        const registrations = filteredRegistrationsByDate[key]
        const totalRegisteredTime = registrations.reduce((total, registration) => {
            return total + registration.timeRegistered
        }, 0)

        totalRegisteredTimeArray.push(totalRegisteredTime)
    }
    
    const totalRegisteredTimeArraySliced = totalRegisteredTimeArray.slice(0, 5)

    const data = {
        labels,
        datasets: [
            {
                label: 'Hours registered',
                data: totalRegisteredTimeArraySliced,
                backgroundColor: '#646cff',
            },
            {
                label: 'Recommended hours',
                data: [8.5, 8.5, 8.5, 8.5, 8.5],
                backgroundColor: '#64748b',
            },
        ],
    }

    return (
        <div>
            <Bar options={options} data={data} />
        </div>
    )
}

export default DashboardWeeklyChart
