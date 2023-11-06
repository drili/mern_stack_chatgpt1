import React, { useEffect, useState } from 'react'
import PageHeading from '../../components/PageHeading'
import TimeRegOverviewFilter from '../../components/admin/TimeRegOverviewFilter'

const TimeRegistrationsOverview = () => {
    const [selectedSprint, setSelectedSprint] = useState("")
    const [activeUsers, setActiveUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const handleSprintChange = (selectedValue, selectedSprint) => {
        setSelectedSprint(selectedSprint)
        setIsLoading(true)
    }

    return (
        <div id='TimeRegistrationsOverview'>
            <PageHeading 
                heading="Time Registrations Overview"
                subHeading={`An overview of time registrations pr. user`}
                suffix="Select the different filter options to filter the table."
            />

            <TimeRegOverviewFilter
                onSelectedSprint={handleSprintChange}
            />
        </div>
    )
}

export default TimeRegistrationsOverview