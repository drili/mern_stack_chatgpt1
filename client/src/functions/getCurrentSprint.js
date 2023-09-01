import React, { useState, useEffect } from 'react'
import axios from 'axios'

const getCurrentSprint = () => {
    const [activeSprint, setActiveSprint] = useState({ month: '', year: '' })

    const currentDate = new Date()
    const currentMonth = currentDate.toLocaleString('en-US', { month: 'long' })
    const currentYear = currentDate.getFullYear().toString()

    const fetchSprintData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/sprints/fetch-sprint-by-month-year/${currentMonth}/${currentYear}`)

            setActiveSprint({
                sprintMonth: currentMonth,
                sprintYear: currentYear,
                sprintId: response.data[0]._id
            })
        } catch (error) {
            console.error("Error fetching sprints by month & year", error)
        }
    }

    useEffect(() => {
        fetchSprintData()
    }, [])

    return activeSprint
}

export default getCurrentSprint
