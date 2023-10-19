import React, { useState } from 'react'
import PageHeading from '../components/PageHeading'
import SprintOverviewFilters from '../components/sprintoverview/SprintOverviewFilters'
import DefaultAccordion from '../components/sprintoverview/Accordion'

const SprintOverview = () => {
    const [selectedSprint, setSelectedSprint] = useState("")

    const handleSprintChange = (selectedValue, selectedSprint) => {
        setSelectedSprint(selectedValue)
    }

    return (
        <div id="SprintOverviewPage">
            <PageHeading
                heading="Sprint Overview"
                subHeading={`An overview of your sprint`}
                suffix="Toggle between persons & customers, and filter by sprint."
            />

            <SprintOverviewFilters
                onSelectedSprint={handleSprintChange}
            ></SprintOverviewFilters>

            <section id="sprintOverviewFields" className='flex flex-col gap-4'>
                {/* // TODO: Iterate fields
                    SEE: https://cdn.dribbble.com/userupload/5436969/file/original-909df9bc5700b070aa88233b85601a7c.png?resize=1024x768
                    SEE: https://dribbble.com/shots/19338145-SaaS-Analytics-Dashboard */}
                <DefaultAccordion
                    content={`lorem30`}
                    taskId={1}
                />
                <DefaultAccordion
                    content={`lorem30 kajdka kwdhawkh dkja lækdawld jalwkdj lawjdkl `}
                    taskId={2}
                />
            </section>
            
        </div>
    )
}

export default SprintOverview