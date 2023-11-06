import React from 'react'
import PageHeading from '../../components/PageHeading'
import TimeRegOverviewFilter from '../../components/admin/TimeRegOverviewFilter'

const TimeRegistrationsOverview = () => {
    return (
        <div id='TimeRegistrationsOverview'>
            <PageHeading 
                heading="Time Registrations Overview"
                subHeading={`An overview of time registrations pr. user`}
                suffix="Select the different filter options to filter the table."
            />

            <TimeRegOverviewFilter/>
        </div>
    )
}

export default TimeRegistrationsOverview