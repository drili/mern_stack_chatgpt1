import React, { useEffect, useState } from 'react'
import PageHeading from '../components/PageHeading'
import SprintOverviewFilters from '../components/sprintoverview/SprintOverviewFilters'
import DefaultAccordion from '../components/sprintoverview/Accordion'
import axios from 'axios'

const SprintOverview = () => {
    const [selectedSprint, setSelectedSprint] = useState("")
    const [activeUsers, setActiveUsers] = useState([])

    const handleSprintChange = (selectedValue, selectedSprint) => {
        setSelectedSprint(selectedValue)
    }
    
    const fetchActiveUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/users/fetch-active-users`)
            if (response.status == 200) {
                setActiveUsers(response.data)
            }

        } catch (error) {
            console.error('Failed to fetch active users', error)
        }
    }

    useEffect(() => {
        fetchActiveUsers()
    }, [])

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
                {activeUsers &&
                    activeUsers
                        .slice()
                        .sort((a, b) => a.username.localeCompare(b.username))
                        .map((userObj) => (
                            <DefaultAccordion key={userObj._id} userObject={userObj} />
                        ))
                }
            </section>
            
        </div>
    )
}

export default SprintOverview