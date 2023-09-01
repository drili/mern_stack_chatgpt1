import React, { useState, useEffect } from 'react'

const getCurrentSprint = () => {
    const [activeSprint, setActiveSprint] = useState({ month: '', year: '' })

    useEffect(() => {
        const currentDate = new Date()
        const currentMonth = currentDate.toLocaleString('en-US', { month: 'long' })
        const currentYear = currentDate.getFullYear().toString()

        setActiveSprint({
            sprintMonth: currentMonth,
            sprintYear: currentYear,
        })
    }, [])

    return activeSprint
}

export default getCurrentSprint
